package com.p4.backend.loyalty.entity;

import com.p4.backend.shared.util.UlidUtil;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "loyalty_transactions")
public class LoyaltyTransaction {

    @Id
    @GenericGenerator(name = "ulid", type = UlidUtil.class)
    @GeneratedValue(generator = "ulid")
    @Column(name = "id", updatable = false, nullable = false)
    private String id;

    @Column(name = "account_id", nullable = false)
    private String accountId;

    @Column(name = "program_id", nullable = false)
    private String programId;

    @Column(name = "transaction_type", nullable = false)
    private String transactionType; // EARN, BURN, EXPIRE, ADJUSTMENT

    @Column(name = "points_amount", nullable = false)
    private Integer pointsAmount; // Positive for earn, negative for burn/expired

    @Column(name = "reference_id")
    private String referenceId; // Reference to original transaction (order, etc.)

    @Column(name = "reference_type")
    private String referenceType; // Type of reference (ORDER, ADJUSTMENT, etc.)

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Default constructor for JPA
    public LoyaltyTransaction() {}

    // Constructor
    public LoyaltyTransaction(String accountId, String programId, String transactionType, 
                             Integer pointsAmount, String referenceId, String referenceType, 
                             LocalDate expiryDate, String description) {
        this.id = UlidUtil.generateUlid();
        this.accountId = accountId;
        this.programId = programId;
        this.transactionType = transactionType;
        this.pointsAmount = pointsAmount;
        this.referenceId = referenceId;
        this.referenceType = referenceType;
        this.expiryDate = expiryDate;
        this.description = description;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getProgramId() {
        return programId;
    }

    public void setProgramId(String programId) {
        this.programId = programId;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public Integer getPointsAmount() {
        return pointsAmount;
    }

    public void setPointsAmount(Integer pointsAmount) {
        this.pointsAmount = pointsAmount;
    }

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    public String getReferenceType() {
        return referenceType;
    }

    public void setReferenceType(String referenceType) {
        this.referenceType = referenceType;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}