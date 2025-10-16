package com.p4.backend.util;

import com.github.f4b6a3.ulid.UlidCreator;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;

/**
 * Hibernate ULID Generator that generates ULIDs for entity IDs
 */
public class ULIDGenerator implements IdentifierGenerator {
    
    public static final String ULID_GENERATOR = "ulid_generator";

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) {
        // Generate a ULID string and return it
        return UlidCreator.getUlid().toString();
    }
}