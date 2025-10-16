package com.p4.backend.util;

import com.github.f4b6a3.ulid.Ulid;
import com.github.f4b6a3.ulid.UlidCreator;
import org.springframework.stereotype.Service;

import java.util.function.Supplier;

/**
 * Service for generating ULIDs (Universally Unique Lexicographically Sortable Identifier)
 * ULIDs are 26-character identifiers that are unique, sortable, and URL-safe
 */
@Service
public class ULIDGeneratorService implements IULIDGenerator {

    private final Supplier<Ulid> ulidSupplier;

    public ULIDGeneratorService(Supplier<Ulid> ulidSupplier) {
        this.ulidSupplier = ulidSupplier;
    }

    /**
     * Generates a new ULID
     *
     * @return ULID as a string
     */
    @Override
    public String generateULID() {
        return ulidSupplier.get().toString();
    }

    /**
     * Generates a new ULID object
     *
     * @return ULID object
     */
    @Override
    public Ulid generateUlidObject() {
        return ulidSupplier.get();
    }

    /**
     * Validates if the given string is a valid ULID format
     *
     * @param ulidString the string to validate
     * @return true if valid ULID format, false otherwise
     */
    @Override
    public boolean isValidULID(String ulidString) {
        if (ulidString == null || ulidString.length() != 26) {
            return false;
        }
        
        try {
            Ulid.from(ulidString);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Creates a ULID from a given timestamp (for special use cases)
     *
     * @param timestamp the timestamp to use for ULID generation
     * @return ULID as a string
     */
    @Override
    public String createULIDFromTimestamp(long timestamp) {
        return UlidCreator.getUlidFromTimestamp(timestamp).toString();
    }

    /**
     * Gets the timestamp component of a ULID
     *
     * @param ulidString the ULID string to extract timestamp from
     * @return timestamp in milliseconds
     */
    @Override
    public long extractTimestamp(String ulidString) {
        return Ulid.from(ulidString).getTimestamp();
    }
}