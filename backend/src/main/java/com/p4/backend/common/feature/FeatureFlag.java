package com.p4.backend.common.feature;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;

@Entity
@Table(name = "feature_flags")
public class FeatureFlag {
    
    @Id
    @Column(name = "key", nullable = false, length = 255)
    private String key;
    
    @NotNull
    @Column(name = "value", columnDefinition = "jsonb", nullable = false)
    private Object value;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    // Default constructor for JPA
    public FeatureFlag() {}

    // Constructor with required fields
    public FeatureFlag(String key, Object value) {
        this.key = key;
        this.value = value;
    }

    // Getters and setters
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}