package com.p4.backend.catalog.attribute.repository;

import com.p4.backend.catalog.attribute.model.ProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAttributeModuleRepository extends JpaRepository<ProductAttribute, String> {
    List<ProductAttribute> findByIsSearchable(Boolean isSearchable);
    List<ProductAttribute> findByIsFilterable(Boolean isFilterable);
    List<ProductAttribute> findByAttributeType(ProductAttribute.AttributeType attributeType);
}