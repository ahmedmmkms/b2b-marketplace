package com.p4.backend.quotes.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;
import java.util.List;

public class QuoteCreate {
    @JsonProperty("vendorId")
    @NotNull
    private String vendorId;
    
    @NotBlank
    private String currency = "USD";
    
    private OffsetDateTime validUntil;
    
    private String notes;
    
    @NotNull
    private List<QuoteLineCreate> lines;
    
    public QuoteCreate() {}
    
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
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public List<QuoteLineCreate> getLines() {
        return lines;
    }
    
    public void setLines(List<QuoteLineCreate> lines) {
        this.lines = lines;
    }
}