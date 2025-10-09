package com.p4.backend.invoicing.entity;

import com.p4.backend.shared.entity.BaseEntity;
import com.p4.backend.shared.vo.Money;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "credit_notes")
public class CreditNote extends BaseEntity {
    @Column(name = "credit_note_number", nullable = false, unique = true, length = 50)
    private String creditNoteNumber;

    @Column(name = "establishment_id", nullable = false)
    private String establishmentId;

    @Column(name = "invoice_id", nullable = false)
    private String invoiceId; // Reference to original invoice

    @Column(name = "customer_id", nullable = false)
    private String customerId;

    @Column(name = "vendor_id", nullable = false)
    private String vendorId;

    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    @Column(name = "currency", nullable = false, length = 3)
    private String currency = "USD";

    @Column(name = "subtotal_amount", nullable = false, precision = 19, scale = 4)
    private BigDecimal subtotalAmount = BigDecimal.ZERO;

    @Column(name = "tax_amount", nullable = false, precision = 19, scale = 4)
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @Column(name = "total_amount", nullable = false, precision = 19, scale = 4)
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CreditNoteStatus status = CreditNoteStatus.DRAFT;

    @Column(name = "reason", length = 100)
    private String reason; // Reason for credit note

    @Column(name = "notes", length = 1000)
    private String notes;

    // Relationships
    @OneToMany(mappedBy = "creditNote", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CreditNoteLine> creditNoteLines;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Invoice originalInvoice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "establishment_id", referencedColumnName = "id", insertable = false, updatable = false)
    private TaxRegistration taxRegistration;

    public enum CreditNoteStatus {
        DRAFT, ISSUED, CANCELLED
    }
    
    // Getters and Setters
    public String getCreditNoteNumber() {
        return creditNoteNumber;
    }

    public void setCreditNoteNumber(String creditNoteNumber) {
        this.creditNoteNumber = creditNoteNumber;
    }

    public String getEstablishmentId() {
        return establishmentId;
    }

    public void setEstablishmentId(String establishmentId) {
        this.establishmentId = establishmentId;
    }

    public String getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getSubtotalAmount() {
        return subtotalAmount;
    }

    public void setSubtotalAmount(BigDecimal subtotalAmount) {
        this.subtotalAmount = subtotalAmount;
    }

    public BigDecimal getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(BigDecimal taxAmount) {
        this.taxAmount = taxAmount;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public CreditNoteStatus getStatus() {
        return status;
    }

    public void setStatus(CreditNoteStatus status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<CreditNoteLine> getCreditNoteLines() {
        return creditNoteLines;
    }

    public void setCreditNoteLines(List<CreditNoteLine> creditNoteLines) {
        this.creditNoteLines = creditNoteLines;
    }

    public Invoice getOriginalInvoice() {
        return originalInvoice;
    }

    public void setOriginalInvoice(Invoice originalInvoice) {
        this.originalInvoice = originalInvoice;
    }

    public TaxRegistration getTaxRegistration() {
        return taxRegistration;
    }

    public void setTaxRegistration(TaxRegistration taxRegistration) {
        this.taxRegistration = taxRegistration;
    }
}