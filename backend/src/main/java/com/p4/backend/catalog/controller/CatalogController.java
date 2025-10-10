package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.entity.Product;
import com.p4.backend.catalog.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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
        
        // Generate an ETag based on the content and pagination info
        String etag = generateETag(products.getContent().toString() + page + size);
        
        return ResponseEntity.ok()
                .header("ETag", etag)
                .header("Cache-Control", "public, max-age=300") // Cache for 5 minutes
                .body(products);
    }
    
    // Admin/All products endpoint
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = catalogService.getAllProducts();
        
        // Generate an ETag based on the content
        String etag = generateETag(products.toString());
        
        return ResponseEntity.ok()
                .header("ETag", etag)
                .header("Cache-Control", "no-cache") // Don't cache admin endpoints
                .body(products);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Optional<Product> product = catalogService.getProductById(id);
        
        if (product.isPresent()) {
            Product productEntity = product.get();
            
            // Generate an ETag based on the product content and last modified
            String etag = generateETag(productEntity.getId() + productEntity.getUpdatedAt());
            
            return ResponseEntity.ok()
                    .header("ETag", etag)
                    .header("Cache-Control", "public, max-age=900") // Cache for 15 minutes
                    .body(productEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
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
    
    // Faceted search endpoint with advanced filtering
    @GetMapping("/search/faceted")
    public ResponseEntity<Page<Product>> facetedSearch(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String vendorId,
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) String inventoryStatus,
            @RequestParam(required = false) java.math.BigDecimal minPrice,
            @RequestParam(required = false) java.math.BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Product> results = catalogService.searchWithFacets(q, vendorId, categoryId, inventoryStatus, minPrice, maxPrice, page, size);
        
        // Generate an ETag based on the search parameters and results
        String etag = generateETag((q != null ? q : "") + 
                                 (vendorId != null ? vendorId : "") + 
                                 (categoryId != null ? categoryId : "") + 
                                 (inventoryStatus != null ? inventoryStatus : "") + 
                                 (minPrice != null ? minPrice.toString() : "") + 
                                 (maxPrice != null ? maxPrice.toString() : "") + 
                                 page + size + results.getContent().toString());
        
        return ResponseEntity.ok()
                .header("ETag", etag)
                .header("Cache-Control", "public, max-age=300") // Cache for 5 minutes
                .body(results);
    }
    
    // Get available facets for search
    @GetMapping("/facets")
    public ResponseEntity<Map<String, Object>> getFacets() {
        Map<String, Object> facets = Map.of(
            "categories", catalogService.getAvailableCategories(),
            "vendors", catalogService.getAvailableVendors()
        );
        
        // Generate an ETag for the facets data
        String etag = generateETag(facets.toString());
        
        return ResponseEntity.ok()
                .header("ETag", etag)
                .header("Cache-Control", "public, max-age=3600") // Cache for 1 hour
                .body(facets);
    }
    
    /**
     * Generate an ETag for the given content
     * @param content the content to generate ETag for
     * @return the generated ETag
     */
    private String generateETag(String content) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(content.getBytes("UTF-8"));
            StringBuilder hexString = new StringBuilder();
            
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            
            return "\"" + hexString.toString() + "\"";
        } catch (Exception e) {
            // If there's an error generating the ETag, return a simple hash
            return "\"" + content.hashCode() + "\"";
        }
    }
}