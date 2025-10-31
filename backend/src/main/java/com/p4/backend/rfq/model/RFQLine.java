package com.p4.backend.rfq.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Objects;

@Entity
@Table(name = "rfq_lines")
public class RFQLine {
    
    @Id
    @Column(name = "id", nullable = false, columnDefinition = "char(26)")
    private String id;
    
    @NotNull
    @Column(name = "rfq_id", nullable = false, columnDefinition = "char(26)")
    private String rfqId;
    
    @Column(name = "product_id", columnDefinition = "char(26)")
    private String productId;
    
    @NotNull
    @Column(name = "description", nullable = false)
    private String description;
    
    @NotNull
    @Column(name = "quantity", nullable = false, precision = 18, scale = 3)
    private BigDecimal quantity;
    
    @NotNull
    @Column(name = "uom", nullable = false)
    private String uom;
    
    @Column(name = "target_price", precision = 18, scale = 4)
    private BigDecimal targetPrice;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    // Default constructor for JPA
    public RFQLine() {}

    // Constructor with required fields
    public RFQLine(String id, String rfqId, String description, BigDecimal quantity, String uom) {
        this.id = id;
        this.rfqId = rfqId;
        this.description = description;
        this.quantity = quantity;
        this.uom = uom;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = OffsetDateTime.now();
        updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRfqId() {
        return rfqId;
    }

    public void setRfqId(String rfqId) {
        this.rfqId = rfqId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public BigDecimal getTargetPrice() {
        return targetPrice;
    }

    public void setTargetPrice(BigDecimal targetPrice) {
        this.targetPrice = targetPrice;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RFQLine rfqLine = (RFQLine) o;
        return Objects.equals(id, rfqLine.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}