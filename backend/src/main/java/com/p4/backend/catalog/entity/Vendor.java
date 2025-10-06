package com.p4.backend.catalog.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vendor")
public class Vendor extends BaseEntity {
    
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "contact_person")
    private String contactPerson;
    
    @Column(name = "contact_email")
    private String contactEmail;
    
    @Column(name = "contact_phone")
    private String contactPhone;
    
    @Column(columnDefinition = "JSONB")
    private String address; // JSON string for flexible address structure
    
    @Column(name = "tax_number")
    private String taxNumber; // VAT/Tax registration number
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private VendorStatus status = VendorStatus.PENDING;
    
    @Column(name = "approval_date")
    private LocalDateTime approvalDate;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Vendor() {
        super();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Vendor(String name) {
        super();
        this.name = name;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }
    
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
    
    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public String getTaxNumber() { return taxNumber; }
    public void setTaxNumber(String taxNumber) { this.taxNumber = taxNumber; }
    
    public VendorStatus getStatus() { return status; }
    public void setStatus(VendorStatus status) { this.status = status; }
    
    public LocalDateTime getApprovalDate() { return approvalDate; }
    public void setApprovalDate(LocalDateTime approvalDate) { this.approvalDate = approvalDate; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Enums
    public enum VendorStatus {
        PENDING, ACTIVE, SUSPENDED, REJECTED
    }
}