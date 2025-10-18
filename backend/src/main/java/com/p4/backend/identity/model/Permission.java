package com.p4.backend.identity.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "permissions")
@Getter
@Setter
public class Permission extends Base {

    @NotBlank(message = "Permission name is required")
    @Size(max = 100, message = "Permission name cannot exceed 100 characters")
    @Column(name = "permission_name", nullable = false, unique = true, length = 100)
    private String permissionName;

    @Size(max = 255, message = "Description cannot exceed 255 characters")
    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @PrePersist
    protected void onCreate() {
        if (this.isActive == null) {
            this.isActive = true;
        }
        validateEntity();
    }

    @PreUpdate
    protected void onUpdate() {
        validateEntity();
    }

    private void validateEntity() {
        if (permissionName == null || permissionName.trim().isEmpty()) {
            throw new IllegalArgumentException("Permission name is required");
        }
        if (permissionName.length() > 100) {
            throw new IllegalArgumentException("Permission name cannot exceed 100 characters");
        }
        if (description != null && description.length() > 255) {
            throw new IllegalArgumentException("Description cannot exceed 255 characters");
        }
    }
}