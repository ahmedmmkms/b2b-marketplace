package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.model.ProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, String> {
    boolean existsByName(String name);
}