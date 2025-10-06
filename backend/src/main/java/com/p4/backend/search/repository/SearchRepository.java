package com.p4.backend.search.repository;

import com.p4.backend.catalog.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchRepository {
    // This interface would contain search-specific methods
    // However, since we're using the CatalogRepository for search,
    // we could create a separate interface if needed in the future
    // For now, we'll rely on the CatalogRepository for search functionality
}