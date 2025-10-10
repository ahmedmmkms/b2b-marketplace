package com.p4.backend.loyalty.entity;

import com.p4.backend.shared.util.UlidUtil;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "loyalty_programs")
public class LoyaltyProgram {

    @Id
    @GenericGenerator(name = "ulid", type = UlidUtil.class)
    @GeneratedValue(generator = "ulid")
    @Column(name = "id", updatable = false, nullable = false)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "earn_points_rate", nullable = false, precision = 5, scale = 4)
    private BigDecimal earnPointsRate;

    @Column(name = "minimum_spend_threshold", precision = 10, scale = 2)
    private BigDecimal minimumSpendThreshold;

    @Column(name = "maximum_points_per_transaction")
    private Integer maximumPointsPerTransaction;

    @Column(name = "expiration_days")
    private Integer expirationDays;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Default constructor for JPA
    public LoyaltyProgram() {}

    // Constructor
    public LoyaltyProgram(String name, String description, BigDecimal earnPointsRate, 
                         BigDecimal minimumSpendThreshold, Integer maximumPointsPerTransaction, 
                         Integer expirationDays) {
        this.id = UlidUtil.generateUlid();
        this.name = name;
        this.description = description;
        this.earnPointsRate = earnPointsRate;
        this.minimumSpendThreshold = minimumSpendThreshold;
        this.maximumPointsPerTransaction = maximumPointsPerTransaction;
        this.expirationDays = expirationDays;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public BigDecimal getEarnPointsRate() {
        return earnPointsRate;
    }

    public void setEarnPointsRate(BigDecimal earnPointsRate) {
        this.earnPointsRate = earnPointsRate;
    }

    public BigDecimal getMinimumSpendThreshold() {
        return minimumSpendThreshold;
    }

    public void setMinimumSpendThreshold(BigDecimal minimumSpendThreshold) {
        this.minimumSpendThreshold = minimumSpendThreshold;
    }

    public Integer getMaximumPointsPerTransaction() {
        return maximumPointsPerTransaction;
    }

    public void setMaximumPointsPerTransaction(Integer maximumPointsPerTransaction) {
        this.maximumPointsPerTransaction = maximumPointsPerTransaction;
    }

    public Integer getExpirationDays() {
        return expirationDays;
    }

    public void setExpirationDays(Integer expirationDays) {
        this.expirationDays = expirationDays;
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