package com.p4.backend.identity.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "account")
public class Account extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String companyEmail;

    private String companyPhone;

    @Column(columnDefinition = "TEXT")
    private String companyAddress;

    @Column(name = "tax_id")
    private String taxId; // VAT/Tax registration number

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private AccountStatus status = AccountStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private AccountType type = AccountType.BUYER;

    private LocalDateTime activatedAt;

    @Column(name = "credit_limit", precision = 19, scale = 4)
    private java.math.BigDecimal creditLimit;

    @Column(name = "available_credit", precision = 19, scale = 4)
    private java.math.BigDecimal availableCredit;

    // Constructors
    public Account() {
        super();
    }

    public Account(String name, String companyEmail) {
        super();
        this.name = name;
        this.companyEmail = companyEmail;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompanyEmail() {
        return companyEmail;
    }

    public void setCompanyEmail(String companyEmail) {
        this.companyEmail = companyEmail;
    }

    public String getCompanyPhone() {
        return companyPhone;
    }

    public void setCompanyPhone(String companyPhone) {
        this.companyPhone = companyPhone;
    }

    public String getCompanyAddress() {
        return companyAddress;
    }

    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }

    public String getTaxId() {
        return taxId;
    }

    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }

    public AccountType getType() {
        return type;
    }

    public void setType(AccountType type) {
        this.type = type;
    }

    public LocalDateTime getActivatedAt() {
        return activatedAt;
    }

    public void setActivatedAt(LocalDateTime activatedAt) {
        this.activatedAt = activatedAt;
    }

    public java.math.BigDecimal getCreditLimit() {
        return creditLimit;
    }

    public void setCreditLimit(java.math.BigDecimal creditLimit) {
        this.creditLimit = creditLimit;
    }

    public java.math.BigDecimal getAvailableCredit() {
        return availableCredit;
    }

    public void setAvailableCredit(java.math.BigDecimal availableCredit) {
        this.availableCredit = availableCredit;
    }

    // Enums
    public enum AccountStatus {
        PENDING, ACTIVE, SUSPENDED, REJECTED, CLOSED
    }

    public enum AccountType {
        BUYER, VENDOR
    }
}