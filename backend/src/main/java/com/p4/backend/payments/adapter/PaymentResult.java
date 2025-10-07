package com.p4.backend.payments.adapter;

import com.p4.backend.orders.entity.PaymentStatus;
import com.p4.backend.shared.vo.Money;

public class PaymentResult {
    private final String paymentId;
    private final PaymentStatus status;
    private final String gatewayResponse;
    private final Money amount;
    private final String errorMessage;

    private PaymentResult(Builder builder) {
        this.paymentId = builder.paymentId;
        this.status = builder.status;
        this.gatewayResponse = builder.gatewayResponse;
        this.amount = builder.amount;
        this.errorMessage = builder.errorMessage;
    }

    public static class Builder {
        private String paymentId;
        private PaymentStatus status;
        private String gatewayResponse;
        private Money amount;
        private String errorMessage;

        public Builder paymentId(String paymentId) {
            this.paymentId = paymentId;
            return this;
        }

        public Builder status(PaymentStatus status) {
            this.status = status;
            return this;
        }

        public Builder gatewayResponse(String gatewayResponse) {
            this.gatewayResponse = gatewayResponse;
            return this;
        }

        public Builder amount(Money amount) {
            this.amount = amount;
            return this;
        }

        public Builder errorMessage(String errorMessage) {
            this.errorMessage = errorMessage;
            return this;
        }

        public PaymentResult build() {
            return new PaymentResult(this);
        }
    }

    // Getters
    public String getPaymentId() {
        return paymentId;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public String getGatewayResponse() {
        return gatewayResponse;
    }

    public Money getAmount() {
        return amount;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public boolean isSuccess() {
        return status == PaymentStatus.COMPLETED;
    }
}