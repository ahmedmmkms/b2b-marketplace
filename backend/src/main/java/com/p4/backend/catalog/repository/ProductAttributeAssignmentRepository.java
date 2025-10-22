package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.model.ProductAttributeAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductAttributeAssignmentRepository extends JpaRepository<ProductAttributeAssignment, String> {
    List<ProductAttributeAssignment> findByProductId(String productId);

    Optional<ProductAttributeAssignment> findByProductIdAndAttributeId(String productId, String attributeId);

    boolean existsByProductIdAndAttributeId(String productId, String attributeId);
}
