package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String>, JpaSpecificationExecutor<Product> {
    Optional<Product> findBySku(String sku);

    Page<Product> findByIsActiveTrue(Pageable pageable);

    List<Product> findByVendorIdAndIsActiveTrue(String vendorId);
    
    Page<Product> findByVendorIdAndIsActiveTrue(String vendorId, Pageable pageable);

    Page<Product> findByVendorId(String vendorId, Pageable pageable);

    Page<Product> findByVendorIdAndProductStatus(String vendorId,
                                                 Product.ProductStatus status,
                                                 Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword% OR p.description LIKE %:keyword% OR p.sku LIKE %:keyword%")
    Page<Product> searchByNameOrDescriptionOrSku(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.vendor.id = :vendorId AND (p.name LIKE %:keyword% OR p.description LIKE %:keyword% OR p.sku LIKE %:keyword%)")
    Page<Product> searchByVendorIdAndNameOrDescriptionOrSku(@Param("vendorId") String vendorId, @Param("keyword") String keyword, Pageable pageable);

    // PostgreSQL Full-Text Search
    @Query(value = "SELECT * FROM products p WHERE p.is_active = true AND " +
           "to_tsvector('english', coalesce(p.name, '') || ' ' || coalesce(p.description, '') || ' ' || coalesce(p.sku, '')) " +
           "@@ plainto_tsquery('english', :keyword)", 
           countQuery = "SELECT count(*) FROM products p WHERE p.is_active = true AND " +
           "to_tsvector('english', coalesce(p.name, '') || ' ' || coalesce(p.description, '') || ' ' || coalesce(p.sku, '')) " +
           "@@ plainto_tsquery('english', :keyword)", 
           nativeQuery = true)
    Page<Product> searchFullText(@Param("keyword") String keyword, Pageable pageable);

    @Query(value = "SELECT * FROM products p WHERE p.vendor_id = :vendorId AND p.is_active = true AND " +
           "to_tsvector('english', coalesce(p.name, '') || ' ' || coalesce(p.description, '') || ' ' || coalesce(p.sku, '')) " +
           "@@ plainto_tsquery('english', :keyword)", 
           countQuery = "SELECT count(*) FROM products p WHERE p.vendor_id = :vendorId AND p.is_active = true AND " +
           "to_tsvector('english', coalesce(p.name, '') || ' ' || coalesce(p.description, '') || ' ' || coalesce(p.sku, '')) " +
           "@@ plainto_tsquery('english', :keyword)", 
           nativeQuery = true)
    Page<Product> searchByVendorIdAndFullText(@Param("vendorId") String vendorId, @Param("keyword") String keyword, Pageable pageable);

    boolean existsBySku(String sku);
}
