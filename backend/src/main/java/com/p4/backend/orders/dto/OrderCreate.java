package com.p4.backend.orders.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public class OrderCreate {
    @JsonProperty("quoteId")
    @NotNull
    private String quoteId;
    
    public OrderCreate() {}
    
    public String getQuoteId() {
        return quoteId;
    }
    
    public void setQuoteId(String quoteId) {
        this.quoteId = quoteId;
    }
}