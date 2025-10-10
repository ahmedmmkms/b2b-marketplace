package com.p4.backend.loyalty.entity;

import com.p4.backend.shared.util.UlidUtil;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "loyalty_rewards")
public class LoyaltyReward {

    @Id
    @GenericGenerator(name = "ulid", type = UlidUtil.class)
    @GeneratedValue(generator = "ulid")
    @Column(name = "id", updatable = false, nullable = false)
    private String id;

    @Column(name = "reward_name", nullable = false)
    private String rewardName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "points_cost", nullable = false)
    private Integer pointsCost;

    @Column(name = "reward_type", nullable = false)
    private String rewardType; // DISCOUNT, GIFT, EXPERIENCE

    @Column(name = "reward_value", nullable = false)
    private String rewardValue; // Value of the reward (percentage, fixed amount, description)

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "max_uses_per_customer")
    private Integer maxUsesPerCustomer; // Max times a customer can use this reward

    @Column(name = "available_from")
    private LocalDate availableFrom;

    @Column(name = "available_until")
    private LocalDate availableUntil;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Default constructor for JPA
    public LoyaltyReward() {}

    // Constructor
    public LoyaltyReward(String rewardName, String description, Integer pointsCost, 
                        String rewardType, String rewardValue, Integer maxUsesPerCustomer, 
                        LocalDate availableFrom, LocalDate availableUntil) {
        this.id = UlidUtil.generateUlid();
        this.rewardName = rewardName;
        this.description = description;
        this.pointsCost = pointsCost;
        this.rewardType = rewardType;
        this.rewardValue = rewardValue;
        this.maxUsesPerCustomer = maxUsesPerCustomer;
        this.availableFrom = availableFrom;
        this.availableUntil = availableUntil;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRewardName() {
        return rewardName;
    }

    public void setRewardName(String rewardName) {
        this.rewardName = rewardName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPointsCost() {
        return pointsCost;
    }

    public void setPointsCost(Integer pointsCost) {
        this.pointsCost = pointsCost;
    }

    public String getRewardType() {
        return rewardType;
    }

    public void setRewardType(String rewardType) {
        this.rewardType = rewardType;
    }

    public String getRewardValue() {
        return rewardValue;
    }

    public void setRewardValue(String rewardValue) {
        this.rewardValue = rewardValue;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Integer getMaxUsesPerCustomer() {
        return maxUsesPerCustomer;
    }

    public void setMaxUsesPerCustomer(Integer maxUsesPerCustomer) {
        this.maxUsesPerCustomer = maxUsesPerCustomer;
    }

    public LocalDate getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(LocalDate availableFrom) {
        this.availableFrom = availableFrom;
    }

    public LocalDate getAvailableUntil() {
        return availableUntil;
    }

    public void setAvailableUntil(LocalDate availableUntil) {
        this.availableUntil = availableUntil;
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