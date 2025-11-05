package com.p4.backend.orders.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Objects;

@Entity
@Table(name = "orders")
public class Order {
    
    @Id
    @Column(name = "id", nullable = false, columnDefinition = "char(26)")
    private String id;
    
    @NotNull
    @Column(name = "buyer_id", nullable = false, columnDefinition = "char(26)")
    private String buyerId;
    
    @NotNull
    @Column(name = "quote_id", nullable = false, columnDefinition = "char(26)")
    private String quoteId;
    
    @NotNull
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status = Status.placed;
    
    @NotNull
    @Column(name = "currency", nullable = false, length = 3)
    private String currency = "USD";
    
    @NotNull
    @Column(name = "subtotal", nullable = false, precision = 18, scale = 4)
    private BigDecimal subtotal;
    
    @Column(name = "tax_total", precision = 18, scale = 4)
    private BigDecimal taxTotal = BigDecimal.ZERO;
    
    @NotNull
    @Column(name = "grand_total", nullable = false, precision = 18, scale = 4)
    private BigDecimal grandTotal;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    public enum Status {
        placed, confirmed, cancelled, fulfilled
    }

    // Default constructor for JPA
    public Order() {}

    // Constructor with required fields
    public Order(String id, String buyerId, String quoteId, BigDecimal subtotal, BigDecimal grandTotal) {
        this.id = id;
        this.buyerId = buyerId;
        this.quoteId = quoteId;
        this.subtotal = subtotal;
        this.grandTotal = grandTotal;
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

    public String getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
    }

    public String getQuoteId() {
        return quoteId;
    }

    public void setQuoteId(String quoteId) {
        this.quoteId = quoteId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public BigDecimal getTaxTotal() {
        return taxTotal;
    }

    public void setTaxTotal(BigDecimal taxTotal) {
        this.taxTotal = taxTotal;
    }

    public BigDecimal getGrandTotal() {
        return grandTotal;
    }

    public void setGrandTotal(BigDecimal grandTotal) {
        this.grandTotal = grandTotal;
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
        Order order = (Order) o;
        return Objects.equals(id, order.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}