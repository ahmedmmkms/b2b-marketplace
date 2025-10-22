package com.p4.backend.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Response payload for vendor records.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VendorResponseDto {

    private String id;
    private String businessName;
    private String description;
    private String email;
    private String phone;
    private String address;
    private String taxId;
    private String businessLicenseNo;
    private LocalDate registrationDate;
    private LocalDate approvalDate;
    private String vendorStatus;
    private Boolean kycVerified;
    private LocalDate kycVerifiedAt;
    private String kycVerifiedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
