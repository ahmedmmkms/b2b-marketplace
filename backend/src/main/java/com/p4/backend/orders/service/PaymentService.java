package com.p4.backend.orders.service;

import com.p4.backend.catalog.repository.OrganizationRepository;
import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.orders.dto.PaymentResponse;
import com.p4.backend.orders.dto.WalletPaymentRequest;
import com.p4.backend.orders.model.Order;
import com.p4.backend.orders.model.Payment;
import com.p4.backend.orders.repository.OrderRepository;
import com.p4.backend.orders.repository.PaymentRepository;
import com.p4.backend.wallet.model.Wallet;
import com.p4.backend.wallet.model.WalletTransaction;
import com.p4.backend.wallet.repository.WalletRepository;
import com.p4.backend.wallet.repository.WalletTransactionRepository;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PaymentService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final WalletRepository walletRepository;
    private final WalletTransactionRepository walletTransactionRepository;
    private final OrganizationRepository organizationRepository;
    
    private final MeterRegistry meterRegistry;
    private final Counter paymentSuccessCounter;
    private final Counter paymentConflictCounter;
    private final Counter insufficientFundsCounter;
    private final Timer paymentServiceTimer;

    public PaymentService(PaymentRepository paymentRepository, 
                         OrderRepository orderRepository, 
                         WalletRepository walletRepository, 
                         WalletTransactionRepository walletTransactionRepository,
                         OrganizationRepository organizationRepository,
                         MeterRegistry meterRegistry) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.walletRepository = walletRepository;
        this.walletTransactionRepository = walletTransactionRepository;
        this.organizationRepository = organizationRepository;
        this.meterRegistry = meterRegistry;
        
        this.paymentSuccessCounter = Counter.builder("service_operations_total")
                .description("Total number of successful payment operations")
                .tag("service", "PaymentService")
                .tag("operation", "payOrderWithWallet")
                .tag("result", "success")
                .register(meterRegistry);
                
        this.paymentConflictCounter = Counter.builder("service_operations_total")
                .description("Total number of failed payment operations due to conflicts")
                .tag("service", "PaymentService")
                .tag("operation", "payOrderWithWallet")
                .tag("result", "conflict")
                .register(meterRegistry);
                
        this.insufficientFundsCounter = Counter.builder("service_operations_total")
                .description("Total number of failed payment operations due to insufficient funds")
                .tag("service", "PaymentService")
                .tag("operation", "payOrderWithWallet")
                .tag("result", "insufficient_funds")
                .register(meterRegistry);
                
        this.paymentServiceTimer = Timer.builder("service_operation_duration_seconds")
                .description("Service operation duration in seconds")
                .tag("service", "PaymentService")
                .register(meterRegistry);
    }

    @Transactional
    public PaymentResponse payOrderWithWallet(String orderId, WalletPaymentRequest request) {
        String correlationId = MDC.get("correlationId");
        Timer.Sample sample = Timer.start(meterRegistry);
        
        logger.info("Processing wallet payment for order: {}, idempotencyKey: {}, correlationId: {}", 
                   orderId, request.getIdempotencyKey(), correlationId);

        // Validate ULID format for order ID
        if (!ULIDGenerator.isValidULID(orderId)) {
            logger.warn("Invalid ULID format for orderId: {}, correlationId: {}", orderId, correlationId);
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "Order ID must be a valid ULID format"
            );
        }

        String idempotencyKey = request.getIdempotencyKey();
        if (idempotencyKey == null || idempotencyKey.trim().isEmpty()) {
            logger.warn("Missing idempotency key for order: {}, correlationId: {}", orderId, correlationId);
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/missing-idempotency-key",
                "Idempotency key required",
                "Idempotency key is required for wallet payments"
            );
        }

        // Check if this idempotency key has been used for the same order before (idempotency check)
        Payment existingPayment = paymentRepository.findByIdempotencyKey(idempotencyKey).orElse(null);
        if (existingPayment != null && existingPayment.getOrderId().equals(orderId)) {
            logger.info("Idempotency hit for order: {}, idempotencyKey: {}, correlationId: {}", 
                       orderId, idempotencyKey, correlationId);
            // Return the existing payment result for idempotency
            return convertToPaymentResponse(existingPayment);
        }

        // Get the order
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> {
                logger.warn("Order not found with id: {}, correlationId: {}", orderId, correlationId);
                return new ProblemDetailException(
                    HttpStatus.NOT_FOUND,
                    "https://api.example.com/errors/order-not-found",
                    "Order not found",
                    "Order with id '" + orderId + "' does not exist"
                );
            });

        // Validate order status - can only pay placed orders
        if (order.getStatus() != Order.Status.placed) {
            logger.warn("Invalid order status for payment: {} for order: {}, correlationId: {}", 
                       order.getStatus(), orderId, correlationId);
            paymentConflictCounter.increment();
            throw new ProblemDetailException(
                HttpStatus.CONFLICT,
                "https://api.example.com/errors/invalid-order-status",
                "Invalid order status",
                "Order must be in 'placed' status to be paid"
            );
        }

        // Get the buyer's wallet
        Wallet wallet = walletRepository.findByOrgId(order.getBuyerId())
            .orElseThrow(() -> {
                logger.warn("Wallet not found for buyerId: {}, orderId: {}, correlationId: {}", 
                           order.getBuyerId(), orderId, correlationId);
                return new ProblemDetailException(
                    HttpStatus.NOT_FOUND,
                    "https://api.example.com/errors/wallet-not-found",
                    "Wallet not found",
                    "No wallet found for buyer organization"
                );
            });

        // Check if wallet has sufficient balance
        if (wallet.getBalance().compareTo(order.getGrandTotal()) < 0) {
            logger.warn("Insufficient funds for payment: wallet balance: {}, order total: {}, correlationId: {}", 
                       wallet.getBalance(), order.getGrandTotal(), correlationId);
            insufficientFundsCounter.increment();
            throw new ProblemDetailException(
                HttpStatus.CONFLICT,
                "https://api.example.com/errors/insufficient-funds",
                "Insufficient funds",
                "Wallet balance is insufficient for payment. Required: " + order.getGrandTotal() + 
                ", Available: " + wallet.getBalance()
            );
        }

        // Create the payment (but don't persist yet until wallet transaction succeeds)
        Payment payment = new Payment();
        String paymentId = ULIDGenerator.generateULID();
        payment.setId(paymentId);
        payment.setOrderId(orderId);
        payment.setMethod(Payment.PaymentMethod.wallet);
        payment.setStatus(Payment.PaymentStatus.succeeded);
        payment.setAmount(order.getGrandTotal());
        payment.setCurrency(order.getCurrency());
        payment.setIdempotencyKey(idempotencyKey);

        // Create a wallet transaction for the debit
        WalletTransaction walletTransaction = new WalletTransaction(wallet, WalletTransaction.TransactionType.debit, order.getGrandTotal());
        walletTransaction.setReference(orderId); // Use order ID as reference
        walletTransaction.setCreatedAt(java.time.OffsetDateTime.now());

        // Update wallet balance
        wallet.setBalance(wallet.getBalance().subtract(order.getGrandTotal()));

        // Save entities in transaction
        Payment savedPayment = paymentRepository.save(payment);
        walletTransactionRepository.save(walletTransaction);
        walletRepository.save(wallet);

        // Update order status to confirmed
        order.setStatus(Order.Status.confirmed);
        orderRepository.save(order);
        
        sample.stop(paymentServiceTimer);
        paymentSuccessCounter.increment();

        logger.info("Successfully processed wallet payment for order: {}, paymentId: {}, correlationId: {}", 
                   orderId, paymentId, correlationId);

        return convertToPaymentResponse(savedPayment);
    }

    private PaymentResponse convertToPaymentResponse(Payment payment) {
        PaymentResponse response = new PaymentResponse();
        response.setId(payment.getId());
        response.setOrderId(payment.getOrderId());
        response.setMethod(payment.getMethod().name());
        response.setStatus(payment.getStatus().name());
        response.setAmount(payment.getAmount());
        response.setCurrency(payment.getCurrency());
        response.setIdempotencyKey(payment.getIdempotencyKey());
        return response;
    }
}