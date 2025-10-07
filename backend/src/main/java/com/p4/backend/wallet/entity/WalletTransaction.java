package com.p4.backend.wallet.entity;

import com.p4.backend.shared.util.UlidUtil;
import com.p4.backend.shared.vo.Money;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "wallet_transactions")
public class WalletTransaction {

    @Id
    @org.hibernate.annotations.GenericGenerator(name = "ulid", type = UlidUtil.class)
    @GeneratedValue(generator = "ulid")
    @Column(name = "id", updatable = false, nullable = false)
    private String id;

    @Column(name = "wallet_id", nullable = false)
    private String walletId;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type", nullable = false)
    private TransactionType transactionType;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "amount", column = @Column(name = "amount_amount")),
            @AttributeOverride(name = "currency", column = @Column(name = "amount_currency"))
    })
    private Money amount;

    @Column(name = "description")
    private String description;

    @Column(name = "reference_id")  // Reference to the order, payment, or other entity
    private String referenceId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Default constructor for JPA
    public WalletTransaction() {}

    // Constructor
    public WalletTransaction(String walletId, TransactionType transactionType, Money amount, String description, String referenceId) {
        this.id = UlidUtil.generateUlid();
        this.walletId = walletId;
        this.transactionType = transactionType;
        this.amount = amount;
        this.description = description;
        this.referenceId = referenceId;
        this.createdAt = LocalDateTime.now();
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

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public Money getAmount() {
        return amount;
    }

    public void setAmount(Money amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public enum TransactionType {
        TOP_UP,      // Manual top-up by Ops
        DEBIT,       // Debit for order payment
        REFUND       // Refund back to wallet
    }
}