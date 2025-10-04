package com.p4.backend.catalog.service;

import com.p4.backend.catalog.entity.CatalogEntity;
import com.p4.backend.catalog.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatalogService {
    
    @Autowired
    private CatalogRepository catalogRepository;
    
    public List<CatalogEntity> getAllProducts() {
        return catalogRepository.findAll();
    }
    
    public Optional<CatalogEntity> getProductById(String id) {
        return catalogRepository.findById(id);
    }
    
    public CatalogEntity saveProduct(CatalogEntity product) {
        return catalogRepository.save(product);
    }
    
    public void deleteProduct(String id) {
        catalogRepository.deleteById(id);
    }
    
    public List<CatalogEntity> getProductsByVendor(String vendorId) {
        return catalogRepository.findByVendorId(vendorId);
    }
    
    public List<CatalogEntity> searchProducts(String name) {
        return catalogRepository.findByNameContainingIgnoreCase(name);
    }
}