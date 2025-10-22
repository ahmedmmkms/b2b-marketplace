package com.p4.backend.catalog.product.repository;

import com.p4.backend.catalog.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductModuleRepository extends JpaRepository<Product, String> {
    List<Product> findByIsActive(Boolean isActive);
    Optional<Product> findBySku(String sku);
    Optional<Product> findBySlug(String slug);
    List<Product> findByVendorId(String vendorId);
    List<Product> findByProductStatus(Product.ProductStatus productStatus);
}