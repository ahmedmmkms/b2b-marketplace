package com.p4.backend.invoicing.dto;

import com.p4.backend.invoicing.entity.Invoice;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class InvoiceResponse {
    private String id;
    private String invoiceNumber;
    private String establishmentId;
    private String orderId;
    private String customerId;
    private String vendorId;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private String currency;
    private BigDecimal subtotalAmount;
    private BigDecimal taxAmount;
    private BigDecimal totalAmount;
    private Invoice.InvoiceStatus status;
    private String notes;
    private String poNumber;
    private String referenceInvoiceId;
    private List<InvoiceLineResponse> invoiceLines;
    
    public static class InvoiceLineResponse {
        private String id;
        private String productId;
        private String productName;
        private String description;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal lineTotal;
        private String taxClass;
        private BigDecimal taxRate;
        private BigDecimal taxAmount;
        
        // Getters and Setters for InvoiceLineResponse
        public String getId() {
            return id;
        }
        
        public void setId(String id) {
            this.id = id;
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
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
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
    
    public Invoice.InvoiceStatus getStatus() {
        return status;
    }
    
    public void setStatus(Invoice.InvoiceStatus status) {
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
    
    public List<InvoiceLineResponse> getInvoiceLines() {
        return invoiceLines;
    }
    
    public void setInvoiceLines(List<InvoiceLineResponse> invoiceLines) {
        this.invoiceLines = invoiceLines;
    }
}