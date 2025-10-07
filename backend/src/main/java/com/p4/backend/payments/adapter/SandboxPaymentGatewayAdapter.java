package com.p4.backend.payments.adapter;

import com.p4.backend.orders.entity.PaymentStatus;
import com.p4.backend.shared.util.UlidUtil;
import com.p4.backend.shared.vo.Money;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component("sandboxPaymentGateway")
public class SandboxPaymentGatewayAdapter implements PaymentGatewayAdapter {
    
    private final Random random = new Random();

    @Override
    public PaymentResult processPayment(String orderId, String paymentMethod, Money amount, String idempotencyKey) {
        // Simulate processing time
        try {
            Thread.sleep(500 + random.nextInt(1000)); // 0.5-1.5 seconds delay
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Generate a simulated payment gateway ID
        String paymentGatewayId = "sandbox_" + UlidUtil.generateUlid();
        
        // Simulate 95% success rate
        boolean success = random.nextDouble() < 0.95;
        
        String gatewayResponse = "{ \"orderId\": \"" + orderId + "\", \"paymentId\": \"" + paymentGatewayId + "\", \"status\": \"" + (success ? "success" : "failed") + "\", \"amount\": " + amount.getAmount() + " }";
        
        if (success) {
            return new PaymentResult.Builder()
                    .paymentId(paymentGatewayId)
                    .status(PaymentStatus.COMPLETED)
                    .gatewayResponse(gatewayResponse)
                    .amount(amount)
                    .build();
        } else {
            return new PaymentResult.Builder()
                    .paymentId(paymentGatewayId)
                    .status(PaymentStatus.FAILED)
                    .gatewayResponse(gatewayResponse)
                    .amount(amount)
                    .errorMessage("Simulated payment failure for testing")
                    .build();
        }
    }

    @Override
    public PaymentResult verifyPayment(String paymentId) {
        // Simulate verifying payment status with gateway
        PaymentStatus status = random.nextDouble() < 0.9 ? PaymentStatus.COMPLETED : 
                              random.nextDouble() < 0.5 ? PaymentStatus.PENDING : PaymentStatus.FAILED;
        
        String gatewayResponse = "{ \"paymentId\": \"" + paymentId + "\", \"status\": \"" + status + "\" }";
        
        return new PaymentResult.Builder()
                .paymentId(paymentId)
                .status(status)
                .gatewayResponse(gatewayResponse)
                .build();
    }

    @Override
    public boolean refundPayment(String paymentId, Money amount, String reason) {
        // Simulate refund processing
        boolean success = random.nextDouble() < 0.95; // 95% success rate
        return success;
    }

    @Override
    public boolean cancelPayment(String paymentId) {
        // Simulate payment cancellation
        boolean success = random.nextDouble() < 0.98; // 98% success rate
        return success;
    }
}