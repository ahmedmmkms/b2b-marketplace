package com.p4.backend.catalog.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "vendors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vendor extends Base {

    @NotBlank(message = "Business name is required")
    @Column(name = "business_name", nullable = false)
    private String businessName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number is invalid")
    @Column(name = "phone")
    private String phone;

    @NotBlank(message = "Address is required")
    @Column(name = "address", nullable = false, columnDefinition = "jsonb")
    private String address;

    @Column(name = "tax_id")
    private String taxId;

    @Column(name = "business_license_no")
    private String businessLicenseNo;

    @Column(name = "registration_date")
    private LocalDate registrationDate;

    @Column(name = "approval_date")
    private LocalDate approvalDate;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "vendor_status", nullable = false)
    private VendorStatus vendorStatus = VendorStatus.PENDING;

    @Column(name = "kyc_verified")
    @Builder.Default
    private Boolean kycVerified = false;

    @Column(name = "kyc_verified_at")
    private LocalDate kycVerifiedAt;

    @Column(name = "kyc_verified_by")
    private String kycVerifiedBy;

    @PrePersist
    protected void onCreate() {
        if (this.registrationDate == null) {
            this.registrationDate = LocalDate.now();
        }
        if (this.vendorStatus == null) {
            this.vendorStatus = VendorStatus.PENDING;
        }
        if (this.kycVerified == null) {
            this.kycVerified = false;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        // Additional validation or updates can be performed here
    }

    public enum VendorStatus {
        PENDING,
        APPROVED,
        REJECTED,
        SUSPENDED,
        CLOSED
    }
}
