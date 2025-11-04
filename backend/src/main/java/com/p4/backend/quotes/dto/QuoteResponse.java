package com.p4.backend.quotes.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

public class QuoteResponse {
    private String id;
    private String rfqId;
    private String vendorId;
    private String currency;
    private OffsetDateTime validUntil;
    private String status;
    private BigDecimal subtotal;
    private BigDecimal taxTotal;
    private BigDecimal grandTotal;
    private String notes;
    private List<QuoteLineResponse> lines;
    
    public QuoteResponse() {}
    
    public QuoteResponse(String id, String rfqId, String vendorId, String status) {
        this.id = id;
        this.rfqId = rfqId;
        this.vendorId = vendorId;
        this.status = status;
    }
    
    // Getters and setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
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
    
    public String getCurrency() {
        return currency;
    }
    
    public void setCurrency(String currency) {
        this.currency = currency;
    }
    
    public OffsetDateTime getValidUntil() {
        return validUntil;
    }
    
    public void setValidUntil(OffsetDateTime validUntil) {
        this.validUntil = validUntil;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
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
    
    public List<QuoteLineResponse> getLines() {
        return lines;
    }
    
    public void setLines(List<QuoteLineResponse> lines) {
        this.lines = lines;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
}