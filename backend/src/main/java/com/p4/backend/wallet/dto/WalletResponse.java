package com.p4.backend.wallet.dto;

import java.math.BigDecimal;

public class WalletResponse {
    private String id;
    private String orgId;
    private String currency;
    private BigDecimal balance;

    // Default constructor
    public WalletResponse() {}

    // Constructor with all fields
    public WalletResponse(String id, String orgId, String currency, BigDecimal balance) {
        this.id = id;
        this.orgId = orgId;
        this.currency = currency;
        this.balance = balance;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}