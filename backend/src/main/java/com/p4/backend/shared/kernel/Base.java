package com.p4.backend.shared.kernel;

import com.p4.backend.util.ULIDGenerator;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Base entity with common fields (id, createdAt, updatedAt) that all entities should extend
 */
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
@Setter
public abstract class Base {
    
    @Id
    @GeneratedValue(generator = ULIDGenerator.ULID_GENERATOR)
    @GenericGenerator(name = ULIDGenerator.ULID_GENERATOR, type = ULIDGenerator.class)
    @Column(name = "id", updatable = false, nullable = false, unique = true, length = 26)
    private String id;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}