package com.p4.backend.catalog.service;

import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Map;
import java.util.HashMap;
import java.util.List;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    /**
     * Browse products with optional search, category filter, and pagination
     * @param query Optional search query for product name
     * @param category Optional category filter
     * @param page Page number (1-based)
     * @param pageSize Number of items per page
     * @return Paginated list of products
     */
    public Page<Product> browseProducts(String query, String category, Integer page, Integer pageSize) {
        // Adjust page to be 0-based for Spring Data (page - 1)
        int pageNumber = (page != null && page > 0) ? page - 1 : 0;
        int size = (pageSize != null && pageSize > 0 && pageSize <= 100) ? pageSize : 20;
        
        // Create pageable object with sorting by name
        Pageable pageable = PageRequest.of(pageNumber, size, Sort.by("name"));
        
        // Perform the search with all filters (attributes not used in current implementation)
        return productRepository.findByIsActiveTrueWithFilters(
            StringUtils.hasText(query) ? query : null,
            StringUtils.hasText(category) ? category : null,
            pageable
        );
    }
}