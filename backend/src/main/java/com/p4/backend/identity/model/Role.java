package com.p4.backend.identity.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role extends Base {

    @NotBlank(message = "Role name is required")
    @Size(max = 100, message = "Role name cannot exceed 100 characters")
    @Column(name = "role_name", nullable = false, unique = true, length = 100)
    private String roleName;

    @Size(max = 255, message = "Description cannot exceed 255 characters")
    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "role_permissions",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<Permission> permissions = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        if (this.isActive == null) {
            this.isActive = true;
        }
        if (this.permissions == null) {
            this.permissions = new HashSet<>();
        }
        validateEntity();
    }

    @PreUpdate
    protected void onUpdate() {
        validateEntity();
    }

    private void validateEntity() {
        if (roleName == null || roleName.trim().isEmpty()) {
            throw new IllegalArgumentException("Role name is required");
        }
        if (roleName.length() > 100) {
            throw new IllegalArgumentException("Role name cannot exceed 100 characters");
        }
        if (description != null && description.length() > 255) {
            throw new IllegalArgumentException("Description cannot exceed 255 characters");
        }
    }

    public void addPermission(Permission permission) {
        if (permissions == null) {
            permissions = new HashSet<>();
        }
        permissions.add(permission);
    }

    public void removePermission(Permission permission) {
        if (permissions != null) {
            permissions.remove(permission);
        }
    }
}