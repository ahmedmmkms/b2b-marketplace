package com.p4.backend.loyalty.entity;

import com.p4.backend.shared.util.UlidUtil;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "credit_dunning_events")
public class CreditDunningEvent {

    @Id
    @GenericGenerator(name = "ulid", type = UlidUtil.class)
    @GeneratedValue(generator = "ulid")
    @Column(name = "id", updatable = false, nullable = false)
    private String id;

    @Column(name = "account_id", nullable = false)
    private String accountId;

    @Column(name = "limit_id", nullable = false)
    private String limitId;

    @Column(name = "event_type", nullable = false)
    private String eventType; // SOFT_LOCK, HARD_LOCK, OVER_LIMIT_NOTIFY

    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;

    @Column(name = "balance_at_event", nullable = false, precision = 19, scale = 4)
    private BigDecimal balanceAtEvent;

    @Column(name = "limit_amount", nullable = false, precision = 19, scale = 4)
    private BigDecimal limitAmount;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "resolved_by")
    private String resolvedBy;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @Column(name = "resolution_notes", columnDefinition = "TEXT")
    private String resolutionNotes;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Default constructor for JPA
    public CreditDunningEvent() {}

    // Constructor
    public CreditDunningEvent(String accountId, String limitId, String eventType, 
                              BigDecimal balanceAtEvent, BigDecimal limitAmount, String notes) {
        this.id = UlidUtil.generateUlid();
        this.accountId = accountId;
        this.limitId = limitId;
        this.eventType = eventType;
        this.eventDate = LocalDateTime.now();
        this.balanceAtEvent = balanceAtEvent;
        this.limitAmount = limitAmount;
        this.notes = notes;
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

    public String getLimitId() {
        return limitId;
    }

    public void setLimitId(String limitId) {
        this.limitId = limitId;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public BigDecimal getBalanceAtEvent() {
        return balanceAtEvent;
    }

    public void setBalanceAtEvent(BigDecimal balanceAtEvent) {
        this.balanceAtEvent = balanceAtEvent;
    }

    public BigDecimal getLimitAmount() {
        return limitAmount;
    }

    public void setLimitAmount(BigDecimal limitAmount) {
        this.limitAmount = limitAmount;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getResolvedBy() {
        return resolvedBy;
    }

    public void setResolvedBy(String resolvedBy) {
        this.resolvedBy = resolvedBy;
    }

    public LocalDateTime getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(LocalDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
    }

    public String getResolutionNotes() {
        return resolutionNotes;
    }

    public void setResolutionNotes(String resolutionNotes) {
        this.resolutionNotes = resolutionNotes;
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