package com.p4.backend.identity.repository;

import com.p4.backend.identity.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByRoleName(String roleName);
    boolean existsByRoleName(String roleName);
}