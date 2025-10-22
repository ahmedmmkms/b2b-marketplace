package com.p4.backend.catalog.attribute.repository;

import com.p4.backend.catalog.attribute.model.ProductAttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAttributeValueModuleRepository extends JpaRepository<ProductAttributeValue, String> {
    List<ProductAttributeValue> findByProductAttributeId(String productAttributeId);
    List<ProductAttributeValue> findByIsDefault(Boolean isDefault);
}