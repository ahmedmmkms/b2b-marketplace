package com.p4.backend.loyalty.entity;

import com.p4.backend.shared.util.UlidUtil;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "loyalty_rules")
public class LoyaltyRule {

    @Id
    @GenericGenerator(name = "ulid", type = UlidUtil.class)
    @GeneratedValue(generator = "ulid")
    @Column(name = "id", updatable = false, nullable = false)
    private String id;

    @Column(name = "program_id", nullable = false)
    private String programId;

    @Column(name = "rule_name", nullable = false)
    private String ruleName;

    @Column(name = "rule_type", nullable = false)
    private String ruleType; // EARN, BURN, ELIGIBILITY

    @Column(name = "condition_expression", columnDefinition = "TEXT")
    private String conditionExpression;

    @Column(name = "priority")
    private Integer priority;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Default constructor for JPA
    public LoyaltyRule() {}

    // Constructor
    public LoyaltyRule(String programId, String ruleName, String ruleType, 
                       String conditionExpression, Integer priority) {
        this.id = UlidUtil.generateUlid();
        this.programId = programId;
        this.ruleName = ruleName;
        this.ruleType = ruleType;
        this.conditionExpression = conditionExpression;
        this.priority = priority != null ? priority : 0;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProgramId() {
        return programId;
    }

    public void setProgramId(String programId) {
        this.programId = programId;
    }

    public String getRuleName() {
        return ruleName;
    }

    public void setRuleName(String ruleName) {
        this.ruleName = ruleName;
    }

    public String getRuleType() {
        return ruleType;
    }

    public void setRuleType(String ruleType) {
        this.ruleType = ruleType;
    }

    public String getConditionExpression() {
        return conditionExpression;
    }

    public void setConditionExpression(String conditionExpression) {
        this.conditionExpression = conditionExpression;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
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