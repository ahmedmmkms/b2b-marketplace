package com.p4.backend.catalog.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request payload for creating or updating vendor records.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VendorRequestDto {

    @NotBlank(message = "Business name is required")
    private String businessName;

    private String description;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;

    private String phone;

    /**
     * Address stored as JSON string to align with jsonb column.
     */
    @NotBlank(message = "Address is required")
    private String address;

    private String taxId;

    private String businessLicenseNo;

    private String registrationDate;

    private String approvalDate;

    private String vendorStatus;

    private Boolean kycVerified;

    private String kycVerifiedAt;

    private String kycVerifiedBy;
}
