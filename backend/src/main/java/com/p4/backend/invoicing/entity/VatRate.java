package com.p4.backend.invoicing.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "vat_rates")
public class VatRate extends BaseEntity {
    @Column(name = "country_code", nullable = false, length = 3)
    private String countryCode;

    @Column(name = "tax_class", nullable = false, length = 50)
    private String taxClass; // e.g., STANDARD, REDUCED, EXEMPT

    @Column(name = "rate", nullable = false, precision = 5, scale = 4)
    private BigDecimal rate; // Up to 99.999% (precision for small rates)

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "effective_from", nullable = false)
    private LocalDate effectiveFrom;

    @Column(name = "effective_to")
    private LocalDate effectiveTo;

    // Ensure uniqueness for country, tax class, and effective date
    @Column(name = "country_code_tax_class_from", unique = true, nullable = false, insertable = false, updatable = false)
    private String uniqueConstraint; // Virtual column for composite unique constraint
    
    // Getters and Setters
    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getTaxClass() {
        return taxClass;
    }

    public void setTaxClass(String taxClass) {
        this.taxClass = taxClass;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getEffectiveFrom() {
        return effectiveFrom;
    }

    public void setEffectiveFrom(LocalDate effectiveFrom) {
        this.effectiveFrom = effectiveFrom;
    }

    public LocalDate getEffectiveTo() {
        return effectiveTo;
    }

    public void setEffectiveTo(LocalDate effectiveTo) {
        this.effectiveTo = effectiveTo;
    }
}