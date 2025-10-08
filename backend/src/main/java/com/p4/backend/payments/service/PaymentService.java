package com.p4.backend.payments.service;

import com.p4.backend.orders.entity.Order;
import com.p4.backend.orders.entity.OrderStatus;
import com.p4.backend.orders.entity.Payment;
import com.p4.backend.orders.entity.PaymentStatus;
import com.p4.backend.orders.repository.OrderRepository;
import com.p4.backend.orders.repository.PaymentRepository;
import com.p4.backend.orders.email.OrderConfirmationEmailService;
import com.p4.backend.payments.adapter.PaymentGatewayAdapter;
import com.p4.backend.payments.adapter.PaymentResult;
import com.p4.backend.shared.vo.Money;
import com.p4.backend.wallet.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private WalletService walletService;

    @Autowired
    @Qualifier("sandboxPaymentGateway")
    private PaymentGatewayAdapter paymentGateway;

    @Autowired
    private OrderConfirmationEmailService emailService;

    @Transactional
    public Optional<Payment> processPayment(String orderId, String paymentMethod, String idempotencyKey) {
        // Check if a payment with this idempotency key already exists
        Optional<Payment> existingPayment = paymentRepository.findByIdempotencyKey(idempotencyKey);
        if (existingPayment.isPresent()) {
            // Return existing payment (idempotency)
            return existingPayment;
        }

        // Fetch the order
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isEmpty()) {
            return Optional.empty();
        }

        Order order = orderOpt.get();

        Payment payment;
        if ("WALLET".equalsIgnoreCase(paymentMethod)) {
            // Handle wallet payment
            payment = processWalletPayment(order, idempotencyKey);
        } else {
            // Handle external payment gateway
            payment = processExternalPayment(order, paymentMethod, idempotencyKey);
        }

        if (payment != null) {
            Payment savedPayment = paymentRepository.save(payment);

            // Update the order status based on payment result
            if (payment.getStatus() == PaymentStatus.COMPLETED) {
                order.setStatus(com.p4.backend.orders.entity.OrderStatus.PLACED);
                order.setUpdatedAt(LocalDateTime.now());
                Order updatedOrder = orderRepository.save(order);
                
                // Send order confirmation and receipt emails
                sendConfirmationEmails(updatedOrder);
            }

            return Optional.of(savedPayment);
        }

        return Optional.empty();
    }

    private Payment processWalletPayment(Order order, String idempotencyKey) {
        // Attempt to debit the wallet for this order
        String buyerAccountId = order.getBuyerAccountId();
        String description = "Payment for Order " + order.getPoNumber();

        Optional<com.p4.backend.wallet.entity.Wallet> walletOpt = 
            walletService.debitWalletForOrder(buyerAccountId, order.getId(), order.getTotalAmount(), description);

        if (walletOpt.isPresent()) {
            // Wallet debit successful
            return new Payment(
                    order.getId(),
                    "WALLET",
                    "WALLET-" + order.getId(), // Use a wallet-specific ID format
                    order.getTotalAmount(),
                    idempotencyKey
            );
        } else {
            // Wallet debit failed (likely insufficient funds)
            Payment failedPayment = new Payment(
                    order.getId(),
                    "WALLET",
                    "WALLET-" + order.getId(),
                    order.getTotalAmount(),
                    idempotencyKey
            );
            failedPayment.setStatus(PaymentStatus.FAILED);
            return failedPayment;
        }
    }

    private Payment processExternalPayment(Order order, String paymentMethod, String idempotencyKey) {
        // Process payment through the gateway
        PaymentResult result = paymentGateway.processPayment(
                order.getId(),
                paymentMethod,
                order.getTotalAmount(),
                idempotencyKey
        );

        // Create the payment entity
        Payment payment = new Payment(
                order.getId(),
                paymentMethod,
                result.getPaymentId(),
                result.getAmount(),
                idempotencyKey
        );

        payment.setStatus(result.getStatus());
        payment.setGatewayResponse(result.getGatewayResponse());

        if (!result.isSuccess() && result.getErrorMessage() != null) {
            // Handle error case
            payment.setStatus(PaymentStatus.FAILED);
        }

        return payment;
    }

    @Transactional
    public Optional<Payment> verifyPayment(String paymentId) {
        Optional<Payment> paymentOpt = paymentRepository.findById(paymentId);
        if (paymentOpt.isEmpty()) {
            return Optional.empty();
        }

        Payment payment = paymentOpt.get();

        // Verify the payment status with the gateway (only for non-wallet payments)
        if (!"WALLET".equalsIgnoreCase(payment.getPaymentMethod())) {
            PaymentResult result = paymentGateway.verifyPayment(payment.getPaymentGatewayId());

            // Update the payment status if it has changed
            if (payment.getStatus() != result.getStatus()) {
                payment.setStatus(result.getStatus());
                payment.setGatewayResponse(result.getGatewayResponse());
                payment.setUpdatedAt(LocalDateTime.now());
                Payment updatedPayment = paymentRepository.save(payment);

                // If payment is now completed, update the order status
                if (result.getStatus() == PaymentStatus.COMPLETED) {
                    Optional<Order> orderOpt = orderRepository.findById(payment.getOrderId());
                    if (orderOpt.isPresent()) {
                        Order order = orderOpt.get();
                        if (order.getStatus() == com.p4.backend.orders.entity.OrderStatus.PENDING) {
                            order.setStatus(com.p4.backend.orders.entity.OrderStatus.PLACED);
                            order.setUpdatedAt(LocalDateTime.now());
                            orderRepository.save(order);
                        }
                    }
                }

                return Optional.of(updatedPayment);
            }
        }

        return paymentOpt;
    }

    public Optional<Payment> findByOrderId(String orderId) {
        return paymentRepository.findByOrderId(orderId);
    }

    public Optional<Payment> findByPaymentGatewayId(String paymentGatewayId) {
        return paymentRepository.findByPaymentGatewayId(paymentGatewayId);
    }
    
    /**
     * Sends confirmation emails after successful payment
     */
    private void sendConfirmationEmails(Order order) {
        // In a real implementation, we would fetch the customer's email from the account
        // For this stub implementation, we'll use a placeholder email
        String customerEmail = "customer-" + order.getBuyerAccountId() + "@example.com";
        
        // Send order confirmation email
        emailService.sendOrderConfirmationEmail(order, customerEmail);
        
        // Send payment receipt email
        emailService.sendPaymentReceiptEmail(order, customerEmail);
    }
}