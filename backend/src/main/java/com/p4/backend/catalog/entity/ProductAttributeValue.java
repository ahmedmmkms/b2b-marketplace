package com.p4.backend.catalog.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_attribute_value")
public class ProductAttributeValue extends BaseEntity {
    
    @Column(name = "product_id", nullable = false)
    private String productId;
    
    @Column(name = "attribute_id", nullable = false)
    private String attributeId;
    
    @Column(name = "value_text", columnDefinition = "TEXT")
    private String valueText;
    
    @Column(name = "value_number", precision = 19, scale = 4)
    private BigDecimal valueNumber;
    
    @Column(name = "value_boolean")
    private Boolean valueBoolean;
    
    @Column(name = "value_date")
    private LocalDateTime valueDate;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public ProductAttributeValue() {
        super();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and setters
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    
    public String getAttributeId() { return attributeId; }
    public void setAttributeId(String attributeId) { this.attributeId = attributeId; }
    
    public String getValueText() { return valueText; }
    public void setValueText(String valueText) { this.valueText = valueText; }
    
    public BigDecimal getValueNumber() { return valueNumber; }
    public void setValueNumber(BigDecimal valueNumber) { this.valueNumber = valueNumber; }
    
    public Boolean getValueBoolean() { return valueBoolean; }
    public void setValueBoolean(Boolean valueBoolean) { this.valueBoolean = valueBoolean; }
    
    public LocalDateTime getValueDate() { return valueDate; }
    public void setValueDate(LocalDateTime valueDate) { this.valueDate = valueDate; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Helper methods to get the appropriate value based on attribute type
    public Object getValueByType(ProductAttribute.AttributeType type) {
        switch (type) {
            case TEXT:
                return valueText;
            case NUMBER:
                return valueNumber;
            case BOOLEAN:
                return valueBoolean;
            case DATE:
                return valueDate;
            case SELECT:
                return valueText;  // Select uses text field for value
            default:
                return null;
        }
    }
    
    public void setValueByType(ProductAttribute.AttributeType type, Object value) {
        switch (type) {
            case TEXT:
            case SELECT:
                if (value instanceof String) {
                    valueText = (String) value;
                }
                break;
            case NUMBER:
                if (value instanceof BigDecimal) {
                    valueNumber = (BigDecimal) value;
                } else if (value instanceof Number) {
                    valueNumber = BigDecimal.valueOf(((Number) value).doubleValue());
                }
                break;
            case BOOLEAN:
                if (value instanceof Boolean) {
                    valueBoolean = (Boolean) value;
                }
                break;
            case DATE:
                if (value instanceof LocalDateTime) {
                    valueDate = (LocalDateTime) value;
                }
                break;
        }
    }
}