package com.p4.backend.search.controller;

import com.p4.backend.catalog.entity.Product;
import com.p4.backend.search.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    
    @Autowired
    private SearchService searchService;
    
    @GetMapping("/products")
    public ResponseEntity<Page<Product>> searchProducts(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Page<Product> results = searchService.searchProducts(q, page, size);
        
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/products/extended")
    public ResponseEntity<Map<String, Object>> extendedSearch(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Page<Product> results = searchService.searchProducts(q, page, size);
        
        return ResponseEntity.ok(Map.of(
            "query", q,
            "results", results.getContent(),
            "totalElements", results.getTotalElements(),
            "totalPages", results.getTotalPages(),
            "currentPage", results.getNumber(),
            "hasNext", results.hasNext(),
            "hasPrevious", results.hasPrevious()
        ));
    }
}