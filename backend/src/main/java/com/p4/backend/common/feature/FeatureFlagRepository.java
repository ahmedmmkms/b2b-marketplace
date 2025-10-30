package com.p4.backend.common.feature;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeatureFlagRepository extends JpaRepository<FeatureFlag, String> {
    // JpaRepository provides basic CRUD operations including findAll()
    // No additional methods needed for read-only functionality
}