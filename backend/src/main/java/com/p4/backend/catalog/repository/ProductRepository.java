package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findByVendorId(String vendorId);
    
    // Find all active products
    List<Product> findByIsActiveTrue();
    
    // Method for browsing products with optional search, category, and pagination
    Page<Product> findByIsActiveTrue(Pageable pageable);
    
    @Query(value = "SELECT * FROM products p WHERE p.is_active = true " +
           "AND (:query IS NULL OR lower(p.name) ILIKE lower(CONCAT('%', :query, '%'))) " +
           "AND (:category IS NULL OR lower(p.category) = lower(:category))",
           countQuery = "SELECT COUNT(*) FROM products p WHERE p.is_active = true " +
           "AND (:query IS NULL OR lower(p.name) ILIKE lower(CONCAT('%', :query, '%'))) " +
           "AND (:category IS NULL OR lower(p.category) = lower(:category))",
           nativeQuery = true)
    Page<Product> findByIsActiveTrueWithFilters(
        @Param("query") String query,
        @Param("category") String category,
        Pageable pageable);
    
    // Check for duplicate vendor SKU combinations
    Optional<Product> findByVendorIdAndSku(String vendorId, String sku);
}