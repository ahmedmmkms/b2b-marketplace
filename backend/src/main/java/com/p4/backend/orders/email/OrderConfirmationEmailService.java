package com.p4.backend.orders.email;

import com.p4.backend.orders.entity.Order;
import org.springframework.stereotype.Service;

/**
 * Email service for order confirmations with stub implementation.
 * In a real implementation, this would connect to an email service like SendGrid, AWS SES, etc.
 */
@Service
public class OrderConfirmationEmailService {

    /**
     * Sends an order confirmation email to the customer
     * @param order The order that was placed
     * @param recipientEmail The email address to send the confirmation to
     */
    public void sendOrderConfirmationEmail(Order order, String recipientEmail) {
        // In a real implementation, this would:
        // 1. Prepare the email content using a template
        // 2. Connect to an email service (SendGrid, AWS SES, etc.)
        // 3. Send the email
        
        // For now, this is just a stub implementation
        System.out.println("STUB: Sending order confirmation email to " + recipientEmail);
        System.out.println("STUB: Order ID: " + order.getId());
        System.out.println("STUB: PO Number: " + order.getPoNumber());
        System.out.println("STUB: Total Amount: " + order.getTotalAmount());
        
        // Log for debugging purposes
        logEmailEvent("ORDER_CONFIRMATION", order.getId(), recipientEmail, "SUCCESS");
    }

    /**
     * Sends a payment receipt email to the customer
     * @param order The order associated with the payment
     * @param recipientEmail The email address to send the receipt to
     */
    public void sendPaymentReceiptEmail(Order order, String recipientEmail) {
        // In a real implementation, this would:
        // 1. Prepare the receipt email content using a template
        // 2. Connect to an email service
        // 3. Send the email
        
        // For now, this is just a stub implementation
        System.out.println("STUB: Sending payment receipt email to " + recipientEmail);
        System.out.println("STUB: Order ID: " + order.getId());
        System.out.println("STUB: Payment status: COMPLETED");
        
        // Log for debugging purposes
        logEmailEvent("PAYMENT_RECEIPT", order.getId(), recipientEmail, "SUCCESS");
    }

    /**
     * Logs email events for tracking purposes (in a real implementation, this would go to a DB)
     */
    private void logEmailEvent(String eventType, String orderId, String recipient, String status) {
        System.out.printf("EMAIL_LOG: Type=%s, Order=%s, Recipient=%s, Status=%s, Timestamp=%s%n",
                eventType, orderId, recipient, status, java.time.LocalDateTime.now());
    }
}