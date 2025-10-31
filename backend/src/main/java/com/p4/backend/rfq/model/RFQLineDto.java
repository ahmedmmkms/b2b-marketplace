package com.p4.backend.rfq.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class RFQLineDto {
    private String id;
    
    private String productId;
    
    @NotBlank
    private String description;
    
    @NotNull
    private BigDecimal quantity;
    
    @NotBlank
    private String uom;
    
    private BigDecimal targetPrice;
    
    public RFQLineDto() {}
    
    public RFQLineDto(String id, String description, BigDecimal quantity, String uom) {
        this.id = id;
        this.description = description;
        this.quantity = quantity;
        this.uom = uom;
    }
    
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
    
    public BigDecimal getTargetPrice() {
        return targetPrice;
    }
    
    public void setTargetPrice(BigDecimal targetPrice) {
        this.targetPrice = targetPrice;
    }
}