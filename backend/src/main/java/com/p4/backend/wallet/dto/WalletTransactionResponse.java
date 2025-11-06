package com.p4.backend.wallet.dto;

import com.p4.backend.wallet.model.WalletTransaction;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public class WalletTransactionResponse {
    private String id;
    private String walletId;
    private WalletTransaction.TransactionType type;
    private BigDecimal amount;
    private String reference;
    private OffsetDateTime createdAt;

    // Default constructor
    public WalletTransactionResponse() {}

    // Constructor from entity
    public WalletTransactionResponse(WalletTransaction transaction) {
        this.id = transaction.getId();
        this.walletId = transaction.getWallet().getId();
        this.type = transaction.getType();
        this.amount = transaction.getAmount();
        this.reference = transaction.getReference();
        this.createdAt = transaction.getCreatedAt();
    }

    // Constructor with all fields
    public WalletTransactionResponse(String id, String walletId, WalletTransaction.TransactionType type, 
                                   BigDecimal amount, String reference, OffsetDateTime createdAt) {
        this.id = id;
        this.walletId = walletId;
        this.type = type;
        this.amount = amount;
        this.reference = reference;
        this.createdAt = createdAt;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWalletId() {
        return walletId;
    }

    public void setWalletId(String walletId) {
        this.walletId = walletId;
    }

    public WalletTransaction.TransactionType getType() {
        return type;
    }

    public void setType(WalletTransaction.TransactionType type) {
        this.type = type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}