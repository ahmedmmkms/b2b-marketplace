package com.p4.backend.catalog.specification;

import com.p4.backend.catalog.model.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * Factory class for building catalog product specifications with optional filters.
 */
public final class ProductSpecifications {

    private ProductSpecifications() {
    }

    public static Specification<Product> build(String keyword,
                                               String vendorId,
                                               String categoryId,
                                               Product.ProductStatus status,
                                               Boolean isActive,
                                               BigDecimal minPrice,
                                               BigDecimal maxPrice) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (vendorId != null && !vendorId.isBlank()) {
                predicates.add(cb.equal(root.join("vendor").get("id"), vendorId));
            }

            if (categoryId != null && !categoryId.isBlank()) {
                predicates.add(cb.equal(root.get("categoryId"), categoryId));
            }

            if (status != null) {
                predicates.add(cb.equal(root.get("productStatus"), status));
            }

            if (isActive != null) {
                predicates.add(cb.equal(root.get("isActive"), isActive));
            }

            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price").get("amount"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price").get("amount"), maxPrice));
            }

            if (keyword != null && !keyword.isBlank()) {
                String pattern = "%" + keyword.trim().toLowerCase(Locale.US) + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), pattern),
                        cb.like(cb.lower(root.get("description")), pattern),
                        cb.like(cb.lower(root.get("sku")), pattern),
                        cb.like(cb.lower(root.get("brand")), pattern)
                ));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
