package com.p4.backend.invoicing.entity;

import com.p4.backend.shared.entity.BaseEntity;
import com.p4.backend.shared.vo.Money;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "credit_note_lines")
public class CreditNoteLine extends BaseEntity {
    @Column(name = "credit_note_id", nullable = false)
    private String creditNoteId;

    @Column(name = "invoice_line_id")
    private String invoiceLineId; // Reference to original invoice line (if applicable)

    @Column(name = "product_id")
    private String productId;

    @Column(name = "product_name", nullable = false, length = 255)
    private String productName;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "unit_price", nullable = false, precision = 19, scale = 4)
    private BigDecimal unitPrice;

    @Column(name = "line_total", nullable = false, precision = 19, scale = 4)
    private BigDecimal lineTotal;

    @Column(name = "tax_class", length = 50)
    private String taxClass;

    @Column(name = "tax_rate", precision = 5, scale = 4)
    private BigDecimal taxRate;

    @Column(name = "tax_amount", nullable = false, precision = 19, scale = 4)
    private BigDecimal taxAmount = BigDecimal.ZERO;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "credit_note_id", referencedColumnName = "id", insertable = false, updatable = false)
    private CreditNote creditNote;
    
    // Getters and Setters
    public String getCreditNoteId() {
        return creditNoteId;
    }

    public void setCreditNoteId(String creditNoteId) {
        this.creditNoteId = creditNoteId;
    }

    public String getInvoiceLineId() {
        return invoiceLineId;
    }

    public void setInvoiceLineId(String invoiceLineId) {
        this.invoiceLineId = invoiceLineId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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

    public String getTaxClass() {
        return taxClass;
    }

    public void setTaxClass(String taxClass) {
        this.taxClass = taxClass;
    }

    public BigDecimal getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(BigDecimal taxRate) {
        this.taxRate = taxRate;
    }

    public BigDecimal getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(BigDecimal taxAmount) {
        this.taxAmount = taxAmount;
    }

    public CreditNote getCreditNote() {
        return creditNote;
    }

    public void setCreditNote(CreditNote creditNote) {
        this.creditNote = creditNote;
    }
}