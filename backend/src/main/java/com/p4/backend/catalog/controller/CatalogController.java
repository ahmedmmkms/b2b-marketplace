package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.entity.Product;
import com.p4.backend.catalog.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {
    
    @Autowired
    private CatalogService catalogService;
    
    // Public browsing endpoint - only published products with pagination
    @GetMapping
    public ResponseEntity<Page<Product>> getBrowsableProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Product> products = catalogService.getBrowsableProducts(page, size);
        return ResponseEntity.ok(products);
    }
    
    // Admin/All products endpoint
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = catalogService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Optional<Product> product = catalogService.getProductById(id);
        return product.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = catalogService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {
        if (!catalogService.getProductById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        product.setId(id);
        Product updatedProduct = catalogService.saveProduct(product);
        return ResponseEntity.ok(updatedProduct);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        if (!catalogService.getProductById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        catalogService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<Product>> getProductsByVendor(@PathVariable String vendorId) {
        List<Product> products = catalogService.getProductsByVendor(vendorId);
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/vendor/{vendorId}/published")
    public ResponseEntity<List<Product>> getPublishedProductsByVendor(@PathVariable String vendorId) {
        List<Product> products = catalogService.getProductsByVendorAndStatus(vendorId, Product.ProductStatus.PUBLISHED);
        return ResponseEntity.ok(products);
    }
    
    // Legacy search endpoint (still available)
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String q) {
        List<Product> products = catalogService.searchProducts(q);
        return ResponseEntity.ok(products);
    }
    
    // Public FTS search endpoint with pagination
    @GetMapping("/search/fts")
    public ResponseEntity<Page<Product>> searchProductsFts(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Product> products = catalogService.searchProductsFts(q, page, size);
        return ResponseEntity.ok(products);
    }
    
    // Check product availability
    @GetMapping("/{id}/availability")
    public ResponseEntity<Boolean> checkProductAvailability(@PathVariable String id) {
        boolean isAvailable = catalogService.isProductAvailable(id);
        return ResponseEntity.ok(isAvailable);
    }
    
    // Public search endpoint that combines both approaches
    @GetMapping("/search/combined")
    public ResponseEntity<Map<String, Object>> combinedSearch(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Product> ftsResults = catalogService.searchProductsFts(q, page, size);
        
        return ResponseEntity.ok(Map.of(
            "query", q,
            "results", ftsResults.getContent(),
            "totalElements", ftsResults.getTotalElements(),
            "totalPages", ftsResults.getTotalPages(),
            "currentPage", ftsResults.getNumber(),
            "hasNext", ftsResults.hasNext(),
            "hasPrevious", ftsResults.hasPrevious()
        ));
    }
}