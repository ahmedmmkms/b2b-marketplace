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
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final WalletRepository walletRepository;
    private final WalletTransactionRepository walletTransactionRepository;
    private final OrganizationRepository organizationRepository;

    public PaymentService(PaymentRepository paymentRepository, 
                         OrderRepository orderRepository, 
                         WalletRepository walletRepository, 
                         WalletTransactionRepository walletTransactionRepository,
                         OrganizationRepository organizationRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.walletRepository = walletRepository;
        this.walletTransactionRepository = walletTransactionRepository;
        this.organizationRepository = organizationRepository;
    }

    @Transactional
    public PaymentResponse payOrderWithWallet(String orderId, WalletPaymentRequest request) {
        // Validate ULID format for order ID
        if (!ULIDGenerator.isValidULID(orderId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "Order ID must be a valid ULID format"
            );
        }

        String idempotencyKey = request.getIdempotencyKey();
        if (idempotencyKey == null || idempotencyKey.trim().isEmpty()) {
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
            // Return the existing payment result for idempotency
            return convertToPaymentResponse(existingPayment);
        }

        // Get the order
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new ProblemDetailException(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/order-not-found",
                "Order not found",
                "Order with id '" + orderId + "' does not exist"
            ));

        // Validate order status - can only pay placed orders
        if (order.getStatus() != Order.Status.placed) {
            throw new ProblemDetailException(
                HttpStatus.CONFLICT,
                "https://api.example.com/errors/invalid-order-status",
                "Invalid order status",
                "Order must be in 'placed' status to be paid"
            );
        }

        // Get the buyer's wallet
        Wallet wallet = walletRepository.findByOrgId(order.getBuyerId())
            .orElseThrow(() -> new ProblemDetailException(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/wallet-not-found",
                "Wallet not found",
                "No wallet found for buyer organization"
            ));

        // Check if wallet has sufficient balance
        if (wallet.getBalance().compareTo(order.getGrandTotal()) < 0) {
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
        payment.setId(ULIDGenerator.generateULID());
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