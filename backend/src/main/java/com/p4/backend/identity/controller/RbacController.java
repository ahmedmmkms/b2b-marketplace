package com.p4.backend.identity.controller;

import com.p4.backend.identity.model.Permission;
import com.p4.backend.identity.model.Role;
import com.p4.backend.identity.model.User;
import com.p4.backend.identity.service.RbacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/rbac")
public class RbacController {

    @Autowired
    private RbacService rbacService;

    // Create a new permission
    @PostMapping("/permissions")
    @PreAuthorize("hasAuthority('CREATE_PERMISSION')")
    public ResponseEntity<Permission> createPermission(@RequestBody CreatePermissionRequest request) {
        Permission permission = rbacService.createPermission(request.getPermissionName(), request.getDescription());
        return ResponseEntity.ok(permission);
    }

    // Get all permissions
    @GetMapping("/permissions")
    @PreAuthorize("hasAuthority('READ_PERMISSION')")
    public ResponseEntity<List<Permission>> getAllPermissions() {
        List<Permission> permissions = rbacService.getAllPermissions();
        return ResponseEntity.ok(permissions);
    }

    // Create a new role
    @PostMapping("/roles")
    @PreAuthorize("hasAuthority('CREATE_ROLE')")
    public ResponseEntity<Role> createRole(@RequestBody CreateRoleRequest request) {
        Role role = rbacService.createRole(
                request.getRoleName(),
                request.getDescription(),
                request.getPermissionIds()
        );
        return ResponseEntity.ok(role);
    }

    // Get all roles
    @GetMapping("/roles")
    @PreAuthorize("hasAuthority('READ_ROLE')")
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = rbacService.getAllRoles();
        return ResponseEntity.ok(roles);
    }

    // Get role by ID
    @GetMapping("/roles/{id}")
    @PreAuthorize("hasAuthority('READ_ROLE')")
    public ResponseEntity<Role> getRoleById(@PathVariable String id) {
        return rbacService.getRoleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Assign permissions to a role
    @PutMapping("/roles/{id}/permissions")
    @PreAuthorize("hasAuthority('UPDATE_ROLE')")
    public ResponseEntity<Role> assignPermissionsToRole(
            @PathVariable String id,
            @RequestBody Set<String> permissionIds) {
        Role updatedRole = rbacService.assignPermissionsToRole(id, permissionIds);
        return ResponseEntity.ok(updatedRole);
    }

    // Assign role to a user
    @PutMapping("/users/{userId}/roles/{roleId}")
    @PreAuthorize("hasAuthority('ASSIGN_ROLE')")
    public ResponseEntity<User> assignRoleToUser(
            @PathVariable String userId,
            @PathVariable String roleId) {
        User updatedUser = rbacService.assignRoleToUser(userId, roleId);
        return ResponseEntity.ok(updatedUser);
    }

    // Check if user has specific permission
    @GetMapping("/users/{userId}/has-permission/{permissionName}")
    @PreAuthorize("hasAuthority('READ_USER') or authentication.name == #userId")
    public ResponseEntity<Boolean> checkUserPermission(
            @PathVariable String userId,
            @PathVariable String permissionName) {
        boolean hasPermission = rbacService.hasPermission(userId, permissionName);
        return ResponseEntity.ok(hasPermission);
    }

    // Get user's permissions
    @GetMapping("/users/{userId}/permissions")
    @PreAuthorize("hasAuthority('READ_USER') or authentication.name == #userId")
    public ResponseEntity<Set<Permission>> getUserPermissions(
            @PathVariable String userId) {
        Set<Permission> permissions = rbacService.getUserPermissions(userId);
        return ResponseEntity.ok(permissions);
    }

    // Request body classes
    public static class CreatePermissionRequest {
        private String permissionName;
        private String description;

        public String getPermissionName() {
            return permissionName;
        }

        public void setPermissionName(String permissionName) {
            this.permissionName = permissionName;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    public static class CreateRoleRequest {
        private String roleName;
        private String description;
        private Set<String> permissionIds;

        public String getRoleName() {
            return roleName;
        }

        public void setRoleName(String roleName) {
            this.roleName = roleName;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Set<String> getPermissionIds() {
            return permissionIds;
        }

        public void setPermissionIds(Set<String> permissionIds) {
            this.permissionIds = permissionIds;
        }
    }
}