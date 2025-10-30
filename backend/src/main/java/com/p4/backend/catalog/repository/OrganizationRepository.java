package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, String> {
    Optional<Organization> findByName(String name);
    
    // Returns all organizations with a specific role
    List<Organization> findByRole(Organization.Role role);
    
    // Returns the first organization with a specific role (for cases where uniqueness is not guaranteed)
    @Query("SELECT o FROM Organization o WHERE o.role = :role AND o.isActive = true")
    List<Organization> findActiveByRole(@Param("role") Organization.Role role);
}