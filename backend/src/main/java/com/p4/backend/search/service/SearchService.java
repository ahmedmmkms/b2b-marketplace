package com.p4.backend.search.service;

import com.p4.backend.catalog.entity.Product;
import com.p4.backend.catalog.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class SearchService {
    
    @Autowired
    private CatalogRepository catalogRepository;
    
    public Page<Product> searchProducts(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
        return catalogRepository.findByFullTextSearch(query, pageable);
    }
}