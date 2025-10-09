package com.p4.backend.invoicing.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "sequence_registries")
public class SequenceRegistry extends BaseEntity {
    @Column(name = "establishment_id", nullable = false)
    private String establishmentId;

    @Column(name = "sequence_name", nullable = false, length = 100)
    private String sequenceName; // e.g., INVOICE, CREDIT_NOTE

    @Column(name = "current_value", nullable = false)
    private Long currentValue = 0L;

    @Column(name = "prefix", length = 20)
    private String prefix; // Optional prefix for invoice numbers

    @Column(name = "suffix", length = 20)
    private String suffix; // Optional suffix for invoice numbers

    @Column(name = "format_pattern", length = 50, nullable = false)
    private String formatPattern = "SNNNNNNN"; // Default: prefix + 7 digits + suffix

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    // Relationship with TaxRegistration
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "establishment_id", referencedColumnName = "id", insertable = false, updatable = false)
    private TaxRegistration taxRegistration;
    
    // Getters and Setters
    public String getEstablishmentId() {
        return establishmentId;
    }

    public void setEstablishmentId(String establishmentId) {
        this.establishmentId = establishmentId;
    }

    public String getSequenceName() {
        return sequenceName;
    }

    public void setSequenceName(String sequenceName) {
        this.sequenceName = sequenceName;
    }

    public Long getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(Long currentValue) {
        this.currentValue = currentValue;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getFormatPattern() {
        return formatPattern;
    }

    public void setFormatPattern(String formatPattern) {
        this.formatPattern = formatPattern;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public TaxRegistration getTaxRegistration() {
        return taxRegistration;
    }

    public void setTaxRegistration(TaxRegistration taxRegistration) {
        this.taxRegistration = taxRegistration;
    }
}