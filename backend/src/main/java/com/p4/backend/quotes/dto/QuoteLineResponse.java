package com.p4.backend.quotes.dto;

import java.math.BigDecimal;

public class QuoteLineResponse {
    private String id;
    private String rfqLineId;
    private String productId;
    private String description;
    private BigDecimal quantity;
    private String uom;
    private BigDecimal unitPrice;
    private BigDecimal lineTotal;
    private BigDecimal moq;
    private Integer leadTimeDays;
    
    public QuoteLineResponse() {}
    
    public QuoteLineResponse(String id, String rfqLineId, String description, 
                             BigDecimal quantity, String uom, BigDecimal unitPrice, BigDecimal lineTotal) {
        this.id = id;
        this.rfqLineId = rfqLineId;
        this.description = description;
        this.quantity = quantity;
        this.uom = uom;
        this.unitPrice = unitPrice;
        this.lineTotal = lineTotal;
    }
    
    // Getters and setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
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
}