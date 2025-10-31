package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.ProductCreate;
import com.p4.backend.catalog.service.ProductService;
import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    /**
     * Browse products with optional search, category filter, and pagination
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> browseProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer pageSize) {
        
        Page<Product> productPage = productService.browseProducts(q, category, page, pageSize);
        
        // Create response in the format specified by openapi.yaml
        Map<String, Object> response = new HashMap<>();
        response.put("items", productPage.getContent());
        response.put("page", page);
        response.put("pageSize", pageSize);
        response.put("total", productPage.getTotalElements());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Get a single product by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable String id) {
        // Validate ULID format before proceeding
        if (!ULIDGenerator.isValidULID(id)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST, 
                "https://api.example.com/errors/invalid-id", 
                "Invalid ID format", 
                "Product ID must be a valid ULID format"
            );
        }
        
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }
    
    /**
     * Create a new product
     */
    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductCreate productCreate) {
        Product product = productService.createProduct(productCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }
}