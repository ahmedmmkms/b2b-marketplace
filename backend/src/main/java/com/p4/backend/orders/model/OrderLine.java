package com.p4.backend.orders.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Objects;

@Entity
@Table(name = "order_lines")
public class OrderLine {
    
    @Id
    @Column(name = "id", nullable = false, columnDefinition = "char(26)")
    private String id;
    
    @NotNull
    @Column(name = "order_id", nullable = false, columnDefinition = "char(26)")
    private String orderId;
    
    @NotNull
    @Column(name = "quote_line_id", nullable = false, columnDefinition = "char(26)")
    private String quoteLineId;
    
    @NotNull
    @Column(name = "description", nullable = false)
    private String description;
    
    @NotNull
    @Column(name = "quantity", nullable = false, precision = 18, scale = 3)
    private BigDecimal quantity;
    
    @NotNull
    @Column(name = "uom", nullable = false)
    private String uom;
    
    @NotNull
    @Column(name = "unit_price", nullable = false, precision = 18, scale = 4)
    private BigDecimal unitPrice;
    
    @NotNull
    @Column(name = "line_total", nullable = false, precision = 18, scale = 4)
    private BigDecimal lineTotal;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    // Default constructor for JPA
    public OrderLine() {}

    // Constructor with required fields
    public OrderLine(String id, String orderId, String quoteLineId, String description, 
                     BigDecimal quantity, String uom, BigDecimal unitPrice, BigDecimal lineTotal) {
        this.id = id;
        this.orderId = orderId;
        this.quoteLineId = quoteLineId;
        this.description = description;
        this.quantity = quantity;
        this.uom = uom;
        this.unitPrice = unitPrice;
        this.lineTotal = lineTotal;
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

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getQuoteLineId() {
        return quoteLineId;
    }

    public void setQuoteLineId(String quoteLineId) {
        this.quoteLineId = quoteLineId;
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

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getLineTotal() {
        return lineTotal;
    }

    public void setLineTotal(BigDecimal lineTotal) {
        this.lineTotal = lineTotal;
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
        OrderLine orderLine = (OrderLine) o;
        return Objects.equals(id, orderLine.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}