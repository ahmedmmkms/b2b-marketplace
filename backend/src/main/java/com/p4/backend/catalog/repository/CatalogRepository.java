package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.entity.CatalogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatalogRepository extends JpaRepository<CatalogEntity, String> {
    List<CatalogEntity> findByVendorId(String vendorId);
    List<CatalogEntity> findByNameContainingIgnoreCase(String name);
}