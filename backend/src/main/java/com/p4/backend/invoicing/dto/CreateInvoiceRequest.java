package com.p4.backend.invoicing.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class CreateInvoiceRequest {
    private String orderId;
    private String customerId;
    private String vendorId;
    private String establishmentId;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private String currency = "USD";
    private String poNumber;
    private String notes;
    private List<InvoiceLineRequest> invoiceLines;
    
    public static class InvoiceLineRequest {
        private String productId;
        private String productName;
        private String description;
        private Integer quantity;
        private BigDecimal unitPrice;
        private String taxClass; // VAT tax class for this line item
        
        // Getters and Setters for InvoiceLineRequest
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
        
        public String getTaxClass() {
            return taxClass;
        }
        
        public void setTaxClass(String taxClass) {
            this.taxClass = taxClass;
        }
    }
    
    // Getters and Setters
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
    
    public String getEstablishmentId() {
        return establishmentId;
    }
    
    public void setEstablishmentId(String establishmentId) {
        this.establishmentId = establishmentId;
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
    
    public String getPoNumber() {
        return poNumber;
    }
    
    public void setPoNumber(String poNumber) {
        this.poNumber = poNumber;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public List<InvoiceLineRequest> getInvoiceLines() {
        return invoiceLines;
    }
    
    public void setInvoiceLines(List<InvoiceLineRequest> invoiceLines) {
        this.invoiceLines = invoiceLines;
    }
}