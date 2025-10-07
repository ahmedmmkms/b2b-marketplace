package com.p4.backend.payments.controller;

import com.p4.backend.orders.entity.Payment;
import com.p4.backend.payments.service.PaymentService;
import com.p4.backend.shared.config.FeatureFlagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/webhooks")
public class PaymentWebhookController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private FeatureFlagsService featureFlagsService;

    @PostMapping("/payment-status")
    public ResponseEntity<?> handlePaymentStatusUpdate(@RequestBody Map<String, Object> payload) {
        if (!featureFlagsService.isPaymentsGateway1Enabled()) {
            return ResponseEntity.badRequest().body("Payment gateway 1 is not enabled");
        }

        // Extract payment ID from the webhook payload
        String paymentGatewayId = (String) payload.get("paymentId");
        if (paymentGatewayId == null) {
            return ResponseEntity.badRequest().body("Missing paymentId in webhook payload");
        }

        // Find and update the payment status
        Optional<Payment> paymentOpt = paymentService.findByPaymentGatewayId(paymentGatewayId);
        if (paymentOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Payment not found for ID: " + paymentGatewayId);
        }

        // In a real implementation, we would parse the status from the payload and update accordingly
        // For now, just verify the payment status with the gateway again
        Optional<Payment> updatedPayment = paymentService.verifyPayment(paymentOpt.get().getId());
        
        if (updatedPayment.isPresent()) {
            return ResponseEntity.ok(updatedPayment.get());
        } else {
            return ResponseEntity.badRequest().body("Failed to update payment status");
        }
    }
}