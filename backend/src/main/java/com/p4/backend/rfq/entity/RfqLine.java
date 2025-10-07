package com.p4.backend.rfq.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "rfq_line")
public class RfqLine extends BaseEntity {

    @Column(name = "rfq_id", nullable = false)
    private String rfqId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "product_description", columnDefinition = "TEXT")
    private String productDescription;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "unit_of_measure", length = 20)
    private String unitOfMeasure;

    @Column(name = "required_by_date")
    private java.time.LocalDateTime requiredByDate;

    @Column(name = "product_specifications", columnDefinition = "TEXT")
    private String productSpecifications;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    // Additional specifications that might be relevant for vendors
    @Column(name = "brand_preference")
    private String brandPreference;

    @Column(name = "quality_requirements", columnDefinition = "TEXT")
    private String qualityRequirements;

    // Constructors
    public RfqLine() {
        super();
    }

    public RfqLine(String rfqId, String productName, Integer quantity) {
        super();
        this.rfqId = rfqId;
        this.productName = productName;
        this.quantity = quantity;
    }

    // Getters and setters
    public String getRfqId() {
        return rfqId;
    }

    public void setRfqId(String rfqId) {
        this.rfqId = rfqId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getUnitOfMeasure() {
        return unitOfMeasure;
    }

    public void setUnitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }

    public java.time.LocalDateTime getRequiredByDate() {
        return requiredByDate;
    }

    public void setRequiredByDate(java.time.LocalDateTime requiredByDate) {
        this.requiredByDate = requiredByDate;
    }

    public String getProductSpecifications() {
        return productSpecifications;
    }

    public void setProductSpecifications(String productSpecifications) {
        this.productSpecifications = productSpecifications;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getBrandPreference() {
        return brandPreference;
    }

    public void setBrandPreference(String brandPreference) {
        this.brandPreference = brandPreference;
    }

    public String getQualityRequirements() {
        return qualityRequirements;
    }

    public void setQualityRequirements(String qualityRequirements) {
        this.qualityRequirements = qualityRequirements;
    }
}