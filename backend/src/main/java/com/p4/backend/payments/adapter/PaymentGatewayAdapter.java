package com.p4.backend.payments.adapter;

import com.p4.backend.orders.entity.Payment;
import com.p4.backend.shared.vo.Money;

public interface PaymentGatewayAdapter {
    PaymentResult processPayment(String orderId, String paymentMethod, Money amount, String idempotencyKey);
    PaymentResult verifyPayment(String paymentId);
    boolean refundPayment(String paymentId, Money amount, String reason);
    boolean cancelPayment(String paymentId);
}
