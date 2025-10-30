package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, String> {
    Optional<Organization> findByName(String name);
    Optional<Organization> findByRole(Organization.Role role);
}