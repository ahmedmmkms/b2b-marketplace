package com.p4.backend.rfq.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "quote")
public class Quote extends BaseEntity {

    @Column(name = "rfq_id", nullable = false)
    private String rfqId;

    @Column(name = "vendor_id", nullable = false)
    private String vendorId;

    @Column(name = "quoted_by", nullable = false)
    private String quotedBy;

    @Column(name = "quote_number", unique = true, nullable = false)
    private String quoteNumber;

    @Column(name = "valid_until", nullable = false)
    private LocalDateTime validUntil;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private QuoteStatus status = QuoteStatus.DRAFT;

    @Column(name = "currency", length = 3, nullable = false)
    private String currency = "USD";

    @Column(name = "payment_terms")
    private String paymentTerms;

    @Column(name = "delivery_terms")
    private String deliveryTerms;

    @Column(name = "freight_included", nullable = false)
    private Boolean freightIncluded = false;

    @Column(name = "tax_included", nullable = false)
    private Boolean taxIncluded = false;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "total_amount", precision = 19, scale = 4)
    private BigDecimal totalAmount;

    @Column(name = "accepted_at")
    private LocalDateTime acceptedAt;

    @Column(name = "accepted_by")
    private String acceptedById;

    // Constructors
    public Quote() {
        super();
    }

    public Quote(String rfqId, String vendorId, String quotedBy, String quoteNumber, LocalDateTime validUntil) {
        super();
        this.rfqId = rfqId;
        this.vendorId = vendorId;
        this.quotedBy = quotedBy;
        this.quoteNumber = quoteNumber;
        this.validUntil = validUntil;
    }

    // Getters and setters
    public String getRfqId() {
        return rfqId;
    }

    public void setRfqId(String rfqId) {
        this.rfqId = rfqId;
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public String getQuotedBy() {
        return quotedBy;
    }

    public void setQuotedBy(String quotedBy) {
        this.quotedBy = quotedBy;
    }

    public String getQuoteNumber() {
        return quoteNumber;
    }

    public void setQuoteNumber(String quoteNumber) {
        this.quoteNumber = quoteNumber;
    }

    public LocalDateTime getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(LocalDateTime validUntil) {
        this.validUntil = validUntil;
    }

    public QuoteStatus getStatus() {
        return status;
    }

    public void setStatus(QuoteStatus status) {
        this.status = status;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getPaymentTerms() {
        return paymentTerms;
    }

    public void setPaymentTerms(String paymentTerms) {
        this.paymentTerms = paymentTerms;
    }

    public String getDeliveryTerms() {
        return deliveryTerms;
    }

    public void setDeliveryTerms(String deliveryTerms) {
        this.deliveryTerms = deliveryTerms;
    }

    public Boolean getFreightIncluded() {
        return freightIncluded;
    }

    public void setFreightIncluded(Boolean freightIncluded) {
        this.freightIncluded = freightIncluded;
    }

    public Boolean getTaxIncluded() {
        return taxIncluded;
    }

    public void setTaxIncluded(Boolean taxIncluded) {
        this.taxIncluded = taxIncluded;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getAcceptedAt() {
        return acceptedAt;
    }

    public void setAcceptedAt(LocalDateTime acceptedAt) {
        this.acceptedAt = acceptedAt;
    }

    public String getAcceptedById() {
        return acceptedById;
    }

    public void setAcceptedById(String acceptedById) {
        this.acceptedById = acceptedById;
    }

    // Enums
    public enum QuoteStatus {
        DRAFT, SUBMITTED, ACCEPTED, DECLINED, EXPIRED
    }
}