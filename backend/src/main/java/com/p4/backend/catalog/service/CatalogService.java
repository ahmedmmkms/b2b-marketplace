package com.p4.backend.catalog.service;

import com.p4.backend.catalog.entity.Product;
import com.p4.backend.catalog.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatalogService {
    
    @Autowired
    private CatalogRepository catalogRepository;
    
    public List<Product> getAllProducts() {
        return catalogRepository.findAll();
    }
    
    public List<Product> getPublishedProducts() {
        return catalogRepository.findByStatus(Product.ProductStatus.PUBLISHED);
    }
    
    public Optional<Product> getProductById(String id) {
        return catalogRepository.findById(id);
    }
    
    public Product saveProduct(Product product) {
        return catalogRepository.save(product);
    }
    
    public void deleteProduct(String id) {
        catalogRepository.deleteById(id);
    }
    
    public List<Product> getProductsByVendor(String vendorId) {
        return catalogRepository.findByVendorId(vendorId);
    }
    
    public List<Product> getProductsByVendorAndStatus(String vendorId, Product.ProductStatus status) {
        return catalogRepository.findByVendorIdAndStatus(vendorId, status);
    }
    
    public List<Product> searchProducts(String query) {
        return catalogRepository.findByNameDescriptionOrSkuContaining(query);
    }
    
    // Full-text search using PostgreSQL FTS
    public Page<Product> searchProductsFts(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
        return catalogRepository.findByFullTextSearch(query, pageable);
    }
    
    // Full-text search without pagination (for internal use)
    public List<Product> searchProductsFts(String query) {
        return catalogRepository.findByFullTextSearch(query);
    }
    
    // Method for public catalog browsing (only published products) with pagination
    public Page<Product> getBrowsableProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
        return catalogRepository.findPublishedProducts(pageable);
    }
    
    // Method for public catalog browsing (only published products) without pagination
    public List<Product> getBrowsableProducts() {
        return catalogRepository.findByStatus(Product.ProductStatus.PUBLISHED);
    }
    
    // Method to check product availability
    public boolean isProductAvailable(String productId) {
        Optional<Product> productOpt = catalogRepository.findById(productId);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            return product.getStatus() == Product.ProductStatus.PUBLISHED && 
                   product.getInventoryStatus() == Product.InventoryStatus.IN_STOCK;
        }
        return false;
    }
}