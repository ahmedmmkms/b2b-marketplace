package com.p4.backend.catalog.vendor.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "vendors")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vendor extends Base {
    @Column(name = "business_name", nullable = false)
    private String businessName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address", columnDefinition = "jsonb")
    private String address;

    @Column(name = "tax_id")
    private String taxId;

    @Enumerated(EnumType.STRING)
    @Column(name = "vendor_status", nullable = false)
    private VendorStatus vendorStatus;

    @Column(name = "approval_date")
    private LocalDate approvalDate;

    @Column(name = "business_license_no")
    private String businessLicenseNo;

    @Column(name = "registration_date")
    private LocalDate registrationDate;

    @Column(name = "kyc_verified", nullable = false)
    private Boolean kycVerified;

    @Column(name = "kyc_verified_at")
    private LocalDate kycVerifiedAt;

    @Column(name = "kyc_verified_by")
    private String kycVerifiedBy;

    public enum VendorStatus {
        PENDING, APPROVED, REJECTED, SUSPENDED, CLOSED
    }
}