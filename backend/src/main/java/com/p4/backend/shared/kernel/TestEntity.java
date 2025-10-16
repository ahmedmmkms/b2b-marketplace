package com.p4.backend.shared.kernel;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

/**
 * Test entity to verify that the Base entity works properly
 */
@Entity
@Table(name = "test_entity")
@Getter
@Setter
public class TestEntity extends Base {
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "description")
    private String description;
    
    public TestEntity() {
        super();
    }
    
    public TestEntity(String name, String description) {
        super();
        this.name = name;
        this.description = description;
    }
}