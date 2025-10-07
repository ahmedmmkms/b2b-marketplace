package com.p4.backend.orders.entity;

import com.p4.backend.shared.vo.Money;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;

@Embeddable
public class TaxBreakdown {

    private String jurisdiction;

    private Double taxRate;  // e.g., 0.15 for 15%

    @Embedded
    private Money taxBase;

    @Embedded
    private Money taxAmount;

    // Default constructor for JPA
    public TaxBreakdown() {}

    // Constructor
    public TaxBreakdown(String jurisdiction, Double taxRate, Money taxBase, Money taxAmount) {
        this.jurisdiction = jurisdiction;
        this.taxRate = taxRate;
        this.taxBase = taxBase;
        this.taxAmount = taxAmount;
    }

    // Getters and setters
    public String getJurisdiction() {
        return jurisdiction;
    }

    public void setJurisdiction(String jurisdiction) {
        this.jurisdiction = jurisdiction;
    }

    public Double getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(Double taxRate) {
        this.taxRate = taxRate;
    }

    public Money getTaxBase() {
        return taxBase;
    }

    public void setTaxBase(Money taxBase) {
        this.taxBase = taxBase;
    }

    public Money getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(Money taxAmount) {
        this.taxAmount = taxAmount;
    }
}