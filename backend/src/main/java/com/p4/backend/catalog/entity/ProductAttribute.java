package com.p4.backend.catalog.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_attribute")
public class ProductAttribute extends BaseEntity {
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "display_name", nullable = false)
    private String displayName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "attribute_type", nullable = false, length = 50)
    private AttributeType attributeType;
    
    @Column(name = "is_required")
    private Boolean isRequired = false;
    
    @Column(name = "is_searchable")
    private Boolean isSearchable = false;
    
    @Column(name = "is_filterable")
    private Boolean isFilterable = false;
    
    @Column(name = "validation_rules", columnDefinition = "JSONB")
    private String validationRules;  // JSON string for validation constraints
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public ProductAttribute() {
        super();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public ProductAttribute(String name, String displayName, AttributeType attributeType) {
        super();
        this.name = name;
        this.displayName = displayName;
        this.attributeType = attributeType;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    
    public AttributeType getAttributeType() { return attributeType; }
    public void setAttributeType(AttributeType attributeType) { this.attributeType = attributeType; }
    
    public Boolean getIsRequired() { return isRequired; }
    public void setIsRequired(Boolean required) { isRequired = required; }
    
    public Boolean getIsSearchable() { return isSearchable; }
    public void setIsSearchable(Boolean searchable) { isSearchable = searchable; }
    
    public Boolean getIsFilterable() { return isFilterable; }
    public void setIsFilterable(Boolean filterable) { isFilterable = filterable; }
    
    public String getValidationRules() { return validationRules; }
    public void setValidationRules(String validationRules) { this.validationRules = validationRules; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Enums
    public enum AttributeType {
        TEXT, NUMBER, BOOLEAN, DATE, SELECT
    }
}