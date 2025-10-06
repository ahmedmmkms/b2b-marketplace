package com.p4.backend.shared.vo;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.util.Objects;

public class TaxLine {
    private final String jurisdiction;
    private final BigDecimal rate;
    private final BigDecimal baseAmount;
    private final BigDecimal taxAmount;

    @JsonCreator
    public TaxLine(
            @JsonProperty("jurisdiction") String jurisdiction,
            @JsonProperty("rate") BigDecimal rate,
            @JsonProperty("baseAmount") BigDecimal baseAmount,
            @JsonProperty("taxAmount") BigDecimal taxAmount) {
        this.jurisdiction = jurisdiction;
        this.rate = rate;
        this.baseAmount = baseAmount;
        this.taxAmount = taxAmount;
    }

    public String getJurisdiction() {
        return jurisdiction;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public BigDecimal getBaseAmount() {
        return baseAmount;
    }

    public BigDecimal getTaxAmount() {
        return taxAmount;
    }

    public static TaxLine calculate(String jurisdiction, BigDecimal rate, BigDecimal baseAmount) {
        BigDecimal taxAmount = baseAmount.multiply(rate).setScale(2, BigDecimal.ROUND_HALF_UP);
        return new TaxLine(jurisdiction, rate, baseAmount, taxAmount);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaxLine taxLine = (TaxLine) o;
        return Objects.equals(jurisdiction, taxLine.jurisdiction) &&
                Objects.equals(rate, taxLine.rate) &&
                Objects.equals(baseAmount, taxLine.baseAmount) &&
                Objects.equals(taxAmount, taxLine.taxAmount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(jurisdiction, rate, baseAmount, taxAmount);
    }

    @Override
    public String toString() {
        return String.format("TaxLine{jurisdiction='%s', rate=%s, baseAmount=%s, taxAmount=%s}", 
                             jurisdiction, rate, baseAmount, taxAmount);
    }
}