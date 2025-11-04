package com.p4.backend.quotes.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class QuoteLineCreate {
    @JsonProperty("rfqLineId")
    @NotNull
    private String rfqLineId;
    
    @JsonProperty("productId")
    private String productId;
    
    @NotBlank
    private String description;
    
    @NotNull
    private BigDecimal quantity;
    
    @NotBlank
    private String uom;
    
    @NotNull
    private BigDecimal unitPrice;
    
    private BigDecimal moq;
    
    @JsonProperty("leadTimeDays")
    private Integer leadTimeDays;
    
    public QuoteLineCreate() {}
    
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