package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.model.ProductAttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAttributeValueRepository extends JpaRepository<ProductAttributeValue, String> {
    List<ProductAttributeValue> findByProductAttributeId(String productAttributeId);
    
    boolean existsByProductAttributeIdAndValue(String productAttributeId, String value);
}