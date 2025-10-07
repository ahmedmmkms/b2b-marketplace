package com.p4.backend.rfq.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "quote_line")
public class QuoteLine extends BaseEntity {

    @Column(name = "quote_id", nullable = false)
    private String quoteId;

    @Column(name = "rfq_line_id", nullable = false)
    private String rfqLineId;

    @Column(name = "unit_price", precision = 19, scale = 4, nullable = false)
    private BigDecimal unitPrice;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "line_total", precision = 19, scale = 4, nullable = false)
    private BigDecimal lineTotal;

    @Column(name = "uom", length = 20)
    private String unitOfMeasure;

    @Column(name = "delivery_date")
    private java.time.LocalDateTime deliveryDate;

    @Column(name = "moq", nullable = false)
    private Integer moq = 1;

    @Column(name = "lead_time_days")
    private Integer leadTimeDays;

    @Column(name = "product_specifications", columnDefinition = "TEXT")
    private String productSpecifications;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    // Constructors
    public QuoteLine() {
        super();
    }

    public QuoteLine(String quoteId, String rfqLineId, BigDecimal unitPrice, Integer quantity, BigDecimal lineTotal) {
        super();
        this.quoteId = quoteId;
        this.rfqLineId = rfqLineId;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.lineTotal = lineTotal;
    }

    // Getters and setters
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

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getLineTotal() {
        return lineTotal;
    }

    public void setLineTotal(BigDecimal lineTotal) {
        this.lineTotal = lineTotal;
    }

    public String getUnitOfMeasure() {
        return unitOfMeasure;
    }

    public void setUnitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }

    public java.time.LocalDateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(java.time.LocalDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public Integer getMoq() {
        return moq;
    }

    public void setMoq(Integer moq) {
        this.moq = moq;
    }

    public Integer getLeadTimeDays() {
        return leadTimeDays;
    }

    public void setLeadTimeDays(Integer leadTimeDays) {
        this.leadTimeDays = leadTimeDays;
    }

    public String getProductSpecifications() {
        return productSpecifications;
    }

    public void setProductSpecifications(String productSpecifications) {
        this.productSpecifications = productSpecifications;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}