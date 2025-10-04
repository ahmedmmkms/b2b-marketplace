package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.entity.CatalogEntity;
import com.p4.backend.catalog.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {
    
    @Autowired
    private CatalogService catalogService;
    
    @GetMapping
    public ResponseEntity<List<CatalogEntity>> getAllProducts() {
        List<CatalogEntity> products = catalogService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CatalogEntity> getProductById(@PathVariable String id) {
        Optional<CatalogEntity> product = catalogService.getProductById(id);
        return product.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<CatalogEntity> createProduct(@RequestBody CatalogEntity product) {
        CatalogEntity savedProduct = catalogService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CatalogEntity> updateProduct(@PathVariable String id, @RequestBody CatalogEntity product) {
        if (!catalogService.getProductById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        product.setId(id);
        CatalogEntity updatedProduct = catalogService.saveProduct(product);
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
    public ResponseEntity<List<CatalogEntity>> getProductsByVendor(@PathVariable String vendorId) {
        List<CatalogEntity> products = catalogService.getProductsByVendor(vendorId);
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<CatalogEntity>> searchProducts(@RequestParam String name) {
        List<CatalogEntity> products = catalogService.searchProducts(name);
        return ResponseEntity.ok(products);
    }
}