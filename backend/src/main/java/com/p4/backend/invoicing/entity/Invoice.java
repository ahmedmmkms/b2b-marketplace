package com.p4.backend.invoicing.entity;

import com.p4.backend.shared.entity.BaseEntity;
import com.p4.backend.shared.vo.Money;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "invoices")
public class Invoice extends BaseEntity {
    @Column(name = "invoice_number", nullable = false, unique = true, length = 50)
    private String invoiceNumber;

    @Column(name = "establishment_id", nullable = false)
    private String establishmentId;

    @Column(name = "order_id", nullable = false)
    private String orderId;

    @Column(name = "customer_id", nullable = false)
    private String customerId;

    @Column(name = "vendor_id", nullable = false)
    private String vendorId;

    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

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
    private InvoiceStatus status = InvoiceStatus.DRAFT;

    @Column(name = "notes", length = 1000)
    private String notes;

    @Column(name = "po_number", length = 50)
    private String poNumber; // Purchase order number

    @Column(name = "reference_invoice_id")
    private String referenceInvoiceId; // For credit notes referencing original invoice

    @Column(name = "pdf_location", length = 500)
    private String pdfLocation; // S3/R2 key where the PDF is stored

    // Relationships
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<InvoiceLine> invoiceLines;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reference_invoice_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Invoice referenceInvoice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "establishment_id", referencedColumnName = "id", insertable = false, updatable = false)
    private TaxRegistration taxRegistration;

    public enum InvoiceStatus {
        DRAFT, ISSUED, PAID, CANCELLED
    }
    
    // Getters and Setters
    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public String getEstablishmentId() {
        return establishmentId;
    }

    public void setEstablishmentId(String establishmentId) {
        this.establishmentId = establishmentId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
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

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
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

    public InvoiceStatus getStatus() {
        return status;
    }

    public void setStatus(InvoiceStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getPoNumber() {
        return poNumber;
    }

    public void setPoNumber(String poNumber) {
        this.poNumber = poNumber;
    }

    public String getReferenceInvoiceId() {
        return referenceInvoiceId;
    }

    public void setReferenceInvoiceId(String referenceInvoiceId) {
        this.referenceInvoiceId = referenceInvoiceId;
    }

    public String getPdfLocation() {
        return pdfLocation;
    }

    public void setPdfLocation(String pdfLocation) {
        this.pdfLocation = pdfLocation;
    }

    public List<InvoiceLine> getInvoiceLines() {
        return invoiceLines;
    }

    public void setInvoiceLines(List<InvoiceLine> invoiceLines) {
        this.invoiceLines = invoiceLines;
    }

    public Invoice getReferenceInvoice() {
        return referenceInvoice;
    }

    public void setReferenceInvoice(Invoice referenceInvoice) {
        this.referenceInvoice = referenceInvoice;
    }

    public TaxRegistration getTaxRegistration() {
        return taxRegistration;
    }

    public void setTaxRegistration(TaxRegistration taxRegistration) {
        this.taxRegistration = taxRegistration;
    }
}