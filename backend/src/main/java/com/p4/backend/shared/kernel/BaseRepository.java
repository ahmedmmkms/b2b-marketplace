package com.p4.backend.shared.kernel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * Base repository interface that all repositories should extend
 * Provides basic CRUD operations for entities extending Base class
 */
@NoRepositoryBean
public interface BaseRepository<T extends Base> extends JpaRepository<T, String> {
    // Common methods for all repositories can be added here if needed
}