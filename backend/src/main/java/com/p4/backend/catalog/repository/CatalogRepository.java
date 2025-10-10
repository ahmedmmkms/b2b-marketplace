package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatalogRepository extends JpaRepository<Product, String> {
    List<Product> findByVendorId(String vendorId);
    
    // Updated search method using full-text search
    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.sku) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> findByNameDescriptionOrSkuContaining(@Param("query") String query);
    
    // PostgreSQL Full-Text Search using to_tsvector and to_tsquery
    @Query(value = "SELECT * FROM product p WHERE " +
           "p.status = 'PUBLISHED' AND " +
           "to_tsvector('english', coalesce(p.name, '') || ' ' || coalesce(p.description, '') || ' ' || coalesce(p.sku, '')) " +
           "@@ plainto_tsquery('english', :query)",
           countQuery = "SELECT count(*) FROM product p WHERE " +
           "p.status = 'PUBLISHED' AND " +
           "to_tsvector('english', coalesce(p.name, '') || ' ' || coalesce(p.description, '') || ' ' || coalesce(p.sku, '')) " +
           "@@ plainto_tsquery('english', :query)",
           nativeQuery = true)
    Page<Product> findByFullTextSearch(@Param("query") String query, Pageable pageable);
    
    // Alternative FTS method without pagination
    @Query(value = "SELECT * FROM product p WHERE " +
           "p.status = 'PUBLISHED' AND " +
           "to_tsvector('english', coalesce(p.name, '') || ' ' || coalesce(p.description, '') || ' ' || coalesce(p.sku, '')) " +
           "@@ plainto_tsquery('english', :query)",
           nativeQuery = true)
    List<Product> findByFullTextSearch(@Param("query") String query);
    
    // Find products by status
    List<Product> findByStatus(Product.ProductStatus status);
    
    // Find products by category
    List<Product> findByCategoryId(String categoryId);
    
    // Find products by vendor and status
    List<Product> findByVendorIdAndStatus(String vendorId, Product.ProductStatus status);
    
    // Find published products only
    List<Product> findByStatusAndInventoryStatus(Product.ProductStatus status, 
                                                 Product.InventoryStatus inventoryStatus);
    
    // Find published products for public browsing
    @Query("SELECT p FROM Product p WHERE p.status = com.p4.backend.catalog.entity.Product$ProductStatus.PUBLISHED")
    Page<Product> findPublishedProducts(Pageable pageable);
    
    // Advanced search with faceted filtering
    @Query(value = "SELECT * FROM product p WHERE " +
           "(:query IS NULL OR " +
           "  to_tsvector('english', coalesce(p.name, '') || ' ' || coalesce(p.description, '') || ' ' || coalesce(p.sku, '')) " +
           "  @@ plainto_tsquery('english', :query)) AND " +
           "p.status = 'PUBLISHED' AND " +
           "(:vendorId IS NULL OR p.vendor_id = :vendorId) AND " +
           "(:categoryId IS NULL OR p.category_id = :categoryId) AND " +
           "(:inventoryStatus IS NULL OR p.inventory_status = :inventoryStatus) AND " +
           "(:minPrice IS NULL OR p.base_price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.base_price <= :maxPrice)",
           countQuery = "SELECT count(*) FROM product p WHERE " +
           "(:query IS NULL OR " +
           "  to_tsvector('english', coalesce(p.name, '') || ' ' || coalesce(p.description, '') || ' ' || coalesce(p.sku, '')) " +
           "  @@ plainto_tsquery('english', :query)) AND " +
           "p.status = 'PUBLISHED' AND " +
           "(:vendorId IS NULL OR p.vendor_id = :vendorId) AND " +
           "(:categoryId IS NULL OR p.category_id = :categoryId) AND " +
           "(:inventoryStatus IS NULL OR p.inventory_status = :inventoryStatus) AND " +
           "(:minPrice IS NULL OR p.base_price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.base_price <= :maxPrice)",
           nativeQuery = true)
    Page<Product> findByAdvancedSearch(
            @Param("query") String query,
            @Param("vendorId") String vendorId,
            @Param("categoryId") String categoryId,
            @Param("inventoryStatus") String inventoryStatus,
            @Param("minPrice") java.math.BigDecimal minPrice,
            @Param("maxPrice") java.math.BigDecimal maxPrice,
            Pageable pageable);
}