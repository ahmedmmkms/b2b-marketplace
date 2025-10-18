package com.p4.backend.identity.service;

import com.p4.backend.identity.model.Permission;
import com.p4.backend.identity.model.Role;
import com.p4.backend.identity.model.User;
import com.p4.backend.identity.repository.PermissionRepository;
import com.p4.backend.identity.repository.RoleRepository;
import com.p4.backend.identity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RbacService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserRepository userRepository;

    public Role createRole(String roleName, String description, Set<String> permissionIds) {
        // Check if role already exists
        if (roleRepository.existsByRoleName(roleName)) {
            throw new IllegalArgumentException("Role with name " + roleName + " already exists");
        }

        Role role = new Role();
        role.setRoleName(roleName);
        role.setDescription(description);
        role.setIsActive(true);

        // Add permissions to the role
        if (permissionIds != null && !permissionIds.isEmpty()) {
            Set<Permission> permissions = new HashSet<>();
            for (String permissionId : permissionIds) {
                Permission permission = permissionRepository.findById(permissionId)
                        .orElseThrow(() -> new IllegalArgumentException("Permission not found with ID: " + permissionId));
                permissions.add(permission);
            }
            role.setPermissions(permissions);
        }

        return roleRepository.save(role);
    }

    public Permission createPermission(String permissionName, String description) {
        // Check if permission already exists
        if (permissionRepository.existsByPermissionName(permissionName)) {
            throw new IllegalArgumentException("Permission with name " + permissionName + " already exists");
        }

        Permission permission = new Permission();
        permission.setPermissionName(permissionName);
        permission.setDescription(description);
        permission.setIsActive(true);

        return permissionRepository.save(permission);
    }

    public Role assignPermissionsToRole(String roleId, Set<String> permissionIds) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found with ID: " + roleId));

        Set<Permission> permissions = new HashSet<>();
        for (String permissionId : permissionIds) {
            Permission permission = permissionRepository.findById(permissionId)
                    .orElseThrow(() -> new IllegalArgumentException("Permission not found with ID: " + permissionId));
            permissions.add(permission);
        }

        role.setPermissions(permissions);
        return roleRepository.save(role);
    }

    public User assignRoleToUser(String userId, String roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found with ID: " + roleId));

        user.addRole(role);
        return userRepository.save(user);
    }

    public User removeRoleFromUser(String userId, String roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found with ID: " + roleId));

        user.removeRole(role);
        return userRepository.save(user);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    public Optional<Role> getRoleById(String roleId) {
        return roleRepository.findById(roleId);
    }

    public Optional<Permission> getPermissionById(String permissionId) {
        return permissionRepository.findById(permissionId);
    }

    public boolean hasPermission(String userId, String permissionName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        // Check if the user has the permission through any of their roles
        for (Role role : user.getRoles()) {
            if (!role.getIsActive()) continue; // Skip inactive roles

            for (Permission permission : role.getPermissions()) {
                if (permission.getPermissionName().equals(permissionName) && permission.getIsActive()) {
                    return true;
                }
            }
        }
        return false;
    }

    public Set<Permission> getUserPermissions(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        Set<Permission> permissions = new HashSet<>();
        for (Role role : user.getRoles()) {
            if (!role.getIsActive()) continue; // Skip inactive roles

            for (Permission permission : role.getPermissions()) {
                if (permission.getIsActive()) {
                    permissions.add(permission);
                }
            }
        }
        return permissions;
    }
}