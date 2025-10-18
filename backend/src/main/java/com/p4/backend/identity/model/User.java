package com.p4.backend.identity.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User extends Base {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name cannot exceed 100 characters")
    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 100, message = "Last name cannot exceed 100 characters")
    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Size(max = 255, message = "Email cannot exceed 255 characters")
    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number is invalid")
    @Column(name = "phone", length = 20)
    private String phone;

    @Size(max = 100, message = "Job title cannot exceed 100 characters")
    @Column(name = "job_title", length = 100)
    private String jobTitle;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    // Authentication fields
    @NotBlank(message = "Password hash is required")
    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @NotBlank(message = "Salt is required")
    @Column(name = "salt", nullable = false, length = 255)
    private String salt;

    @Column(name = "failed_login_attempts")
    private Integer failedLoginAttempts = 0;

    @Column(name = "locked_until")
    private LocalDateTime lockedUntil;

    @PrePersist
    protected void onCreate() {
        if (this.isActive == null) {
            this.isActive = true;
        }
        if (this.failedLoginAttempts == null) {
            this.failedLoginAttempts = 0;
        }
        
        validateEntity();
    }

    @PreUpdate
    protected void onUpdate() {
        validateEntity();
    }

    private void validateEntity() {
        // Ensure account is not null
        if (account == null) {
            throw new IllegalArgumentException("Account must be set for user");
        }
        
        // Validate email format and length
        if (email != null && !email.trim().isEmpty()) {
            if (email.length() > 255) {
                throw new IllegalArgumentException("Email cannot exceed 255 characters");
            }
            // Additional email validation might be needed
        }
        
        // Validate phone format
        if (phone != null && !phone.trim().isEmpty()) {
            if (!phone.matches("^\\+?[1-9]\\d{1,14}$")) {
                throw new IllegalArgumentException("Phone number is invalid");
            }
        }
        
        // Validate first name
        if (firstName != null && firstName.trim().isEmpty()) {
            throw new IllegalArgumentException("First name is required");
        }
        if (firstName != null && firstName.length() > 100) {
            throw new IllegalArgumentException("First name cannot exceed 100 characters");
        }
        
        // Validate last name
        if (lastName != null && lastName.trim().isEmpty()) {
            throw new IllegalArgumentException("Last name is required");
        }
        if (lastName != null && lastName.length() > 100) {
            throw new IllegalArgumentException("Last name cannot exceed 100 characters");
        }
        
        // Validate that user cannot be active if locked
        if (isActive != null && !isActive && lockedUntil != null && lockedUntil.isAfter(LocalDateTime.now())) {
            throw new IllegalArgumentException("User cannot be inactive and have a future lock date");
        }
    }
}