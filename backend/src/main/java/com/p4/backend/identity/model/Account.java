package com.p4.backend.identity.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "accounts")
@Getter
@Setter
public class Account extends Base {

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Account type is required")
    @Column(name = "account_type", nullable = false)
    private AccountType accountType;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private AccountStatus status = AccountStatus.PENDING;

    // Only required for company accounts
    @Column(name = "company_name")
    private String companyName;

    @NotBlank(message = "Contact person is required")
    @Column(name = "contact_person", nullable = false)
    private String contactPerson;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number is invalid")
    @Column(name = "phone")
    private String phone;

    @Column(name = "tax_id")
    private String taxId;

    @Column(name = "registration_date")
    private LocalDate registrationDate;

    @Column(name = "kyc_verified")
    private Boolean kycVerified = false;

    @PrePersist
    protected void onCreate() {
        if (this.registrationDate == null) {
            this.registrationDate = LocalDate.now();
        }
        if (this.status == null) {
            this.status = AccountStatus.PENDING;
        }
        if (this.kycVerified == null) {
            this.kycVerified = false;
        }
        
        // Validate that company name is provided for company accounts
        validateCompanyAccount();
    }

    @PreUpdate
    protected void onUpdate() {
        // Validate that company name is provided for company accounts
        validateCompanyAccount();
    }

    private void validateCompanyAccount() {
        if (accountType == AccountType.COMPANY && (companyName == null || companyName.trim().isEmpty())) {
            throw new IllegalArgumentException("Company name is required for company accounts");
        }
        if (accountType == AccountType.INDIVIDUAL && companyName != null && !companyName.trim().isEmpty()) {
            throw new IllegalArgumentException("Company name should not be provided for individual accounts");
        }
    }

    public enum AccountType {
        INDIVIDUAL,
        COMPANY
    }

    public enum AccountStatus {
        PENDING,
        ACTIVE,
        INACTIVE,
        SUSPENDED,
        CLOSED
    }
}