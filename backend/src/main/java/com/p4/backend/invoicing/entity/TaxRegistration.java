package com.p4.backend.invoicing.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Entity
@Table(name = "tax_registrations")
public class TaxRegistration extends BaseEntity {
    @Column(name = "country_code", nullable = false, length = 3)
    private String countryCode;

    @Column(name = "tax_id", nullable = false, length = 50)
    private String taxId; // VAT/Tax registration number

    @Column(name = "establishment_name", nullable = false, length = 255)
    private String establishmentName;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "address", columnDefinition = "jsonb")
    private Map<String, Object> address; // Flexible address structure as JSON

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    // Getters and Setters
    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getTaxId() {
        return taxId;
    }

    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }

    public String getEstablishmentName() {
        return establishmentName;
    }

    public void setEstablishmentName(String establishmentName) {
        this.establishmentName = establishmentName;
    }

    public Map<String, Object> getAddress() {
        return address;
    }

    public void setAddress(Map<String, Object> address) {
        this.address = address;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}