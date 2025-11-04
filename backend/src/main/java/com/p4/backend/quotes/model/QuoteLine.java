package com.p4.backend.quotes.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Objects;

@Entity
@Table(name = "quote_lines")
public class QuoteLine {
    
    @Id
    @Column(name = "id", nullable = false, columnDefinition = "char(26)")
    private String id;
    
    @NotNull
    @Column(name = "quote_id", nullable = false, columnDefinition = "char(26)")
    private String quoteId;
    
    @NotNull
    @Column(name = "rfq_line_id", nullable = false, columnDefinition = "char(26)")
    private String rfqLineId;
    
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
    
    @NotNull
    @Column(name = "unit_price", nullable = false, precision = 18, scale = 4)
    private BigDecimal unitPrice;
    
    @NotNull
    @Column(name = "line_total", nullable = false, precision = 18, scale = 4)
    private BigDecimal lineTotal;
    
    @Column(name = "moq", precision = 18, scale = 3)
    private BigDecimal moq;
    
    @Column(name = "lead_time_days")
    private Integer leadTimeDays;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    // Default constructor for JPA
    public QuoteLine() {}

    // Constructor with required fields
    public QuoteLine(String id, String quoteId, String rfqLineId, String description, 
                     BigDecimal quantity, String uom, BigDecimal unitPrice, BigDecimal lineTotal) {
        this.id = id;
        this.quoteId = quoteId;
        this.rfqLineId = rfqLineId;
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

    public String getQuoteId() {
        return quoteId;
    }

    public void setQuoteId(String quoteId) {
        this.quoteId = quoteId;
    }

    public String getRfqLineId() {
        return rfqLineId;
    }

    public void setRfqLineId(String rfqLineId) {
        this.rfqLineId = rfqLineId;
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

    public BigDecimal getMoq() {
        return moq;
    }

    public void setMoq(BigDecimal moq) {
        this.moq = moq;
    }

    public Integer getLeadTimeDays() {
        return leadTimeDays;
    }

    public void setLeadTimeDays(Integer leadTimeDays) {
        this.leadTimeDays = leadTimeDays;
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
        QuoteLine quoteLine = (QuoteLine) o;
        return Objects.equals(id, quoteLine.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}