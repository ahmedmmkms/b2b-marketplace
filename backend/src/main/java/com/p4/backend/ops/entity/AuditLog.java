package com.p4.backend.ops.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_log")
public class AuditLog extends BaseEntity {

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "entity_type", nullable = false, length = 50)
    private String entityType; // e.g., RFQ, QUOTE, USER, ACCOUNT

    @Column(name = "entity_id", nullable = false)
    private String entityId; // ID of the entity being audited

    @Column(name = "action", nullable = false, length = 50)
    private String action; // e.g., CREATE, UPDATE, DELETE, ACCEPT, DECLINE

    @Column(name = "ip_address", length = 45) // Support both IPv4 and IPv6
    private String ipAddress;

    @Column(name = "user_agent", length = 500)
    private String userAgent;

    @Column(name = "details", columnDefinition = "TEXT")
    private String details; // Additional details about the action

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Constructors
    public AuditLog() {
        super();
        this.createdAt = LocalDateTime.now();
    }

    public AuditLog(String userId, String entityType, String entityId, String action) {
        super();
        this.userId = userId;
        this.entityType = entityType;
        this.entityId = entityId;
        this.action = action;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}