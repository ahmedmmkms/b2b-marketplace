package com.p4.backend.wallet.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;

import java.math.BigDecimal;

public class WalletTopupRequest {
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
    private BigDecimal amount;

    private String currency = "USD";

    // Default constructor
    public WalletTopupRequest() {}

    // Constructor with all fields
    public WalletTopupRequest(BigDecimal amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    // Getters and setters
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}