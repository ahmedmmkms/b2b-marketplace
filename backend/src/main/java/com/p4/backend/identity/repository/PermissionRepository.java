package com.p4.backend.identity.repository;

import com.p4.backend.identity.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {
    Optional<Permission> findByPermissionName(String permissionName);
    boolean existsByPermissionName(String permissionName);
}