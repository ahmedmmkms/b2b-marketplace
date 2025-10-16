package com.p4.backend.shared.kernel;

import org.springframework.stereotype.Repository;

/**
 * Repository for TestEntity to verify base repository functionality
 */
@Repository
public interface TestEntityRepository extends BaseRepository<TestEntity> {
    // Extends BaseRepository which provides all basic CRUD operations
}