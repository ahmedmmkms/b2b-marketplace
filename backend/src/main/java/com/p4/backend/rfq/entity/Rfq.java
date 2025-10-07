package com.p4.backend.rfq.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "rfq")
public class Rfq extends BaseEntity {

    @Column(name = "account_id", nullable = false)
    private String accountId;

    @Column(name = "contact_person", nullable = false)
    private String contactPerson;

    @Column(name = "contact_email", nullable = false)
    private String contactEmail;

    @Column(name = "contact_phone")
    private String contactPhone;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "valid_until", nullable = false)
    private LocalDateTime validUntil;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RfqStatus status = RfqStatus.DRAFT;

    @Column(name = "expected_delivery_date")
    private LocalDateTime expectedDeliveryDate;

    @Column(name = "currency", length = 3, nullable = false)
    private String currency = "USD";

    @Column(name = "payment_terms")
    private String paymentTerms;

    @Column(name = "shipping_terms")
    private String shippingTerms;

    @Column(name = "tax_included", nullable = false)
    private Boolean taxIncluded = false;

    @Column(name = "created_by", nullable = false)
    private String createdById;

    // Constructors
    public Rfq() {
        super();
    }

    public Rfq(String accountId, String contactPerson, String contactEmail, LocalDateTime validUntil) {
        super();
        this.accountId = accountId;
        this.contactPerson = contactPerson;
        this.contactEmail = contactEmail;
        this.validUntil = validUntil;
    }

    // Getters and setters
    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(LocalDateTime validUntil) {
        this.validUntil = validUntil;
    }

    public RfqStatus getStatus() {
        return status;
    }

    public void setStatus(RfqStatus status) {
        this.status = status;
    }

    public LocalDateTime getExpectedDeliveryDate() {
        return expectedDeliveryDate;
    }

    public void setExpectedDeliveryDate(LocalDateTime expectedDeliveryDate) {
        this.expectedDeliveryDate = expectedDeliveryDate;
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

    public String getShippingTerms() {
        return shippingTerms;
    }

    public void setShippingTerms(String shippingTerms) {
        this.shippingTerms = shippingTerms;
    }

    public Boolean getTaxIncluded() {
        return taxIncluded;
    }

    public void setTaxIncluded(Boolean taxIncluded) {
        this.taxIncluded = taxIncluded;
    }

    public String getCreatedById() {
        return createdById;
    }

    public void setCreatedById(String createdById) {
        this.createdById = createdById;
    }

    // Enums
    public enum RfqStatus {
        DRAFT, PUBLISHED, CLOSED, CANCELLED
    }
}