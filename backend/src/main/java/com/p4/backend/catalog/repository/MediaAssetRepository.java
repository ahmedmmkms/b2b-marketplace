package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.model.MediaAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaAssetRepository extends JpaRepository<MediaAsset, String> {
    // Additional custom methods can be added here if needed
}