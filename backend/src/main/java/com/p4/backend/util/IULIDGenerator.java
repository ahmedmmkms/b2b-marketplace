package com.p4.backend.util;

import com.github.f4b6a3.ulid.Ulid;

/**
 * Interface for ULID generation services
 * ULIDs are 26-character identifiers that are unique, sortable, and URL-safe
 */
public interface IULIDGenerator {
    
    /**
     * Generates a new ULID
     *
     * @return ULID as a string
     */
    String generateULID();
    
    /**
     * Generates a new ULID object
     *
     * @return ULID object
     */
    Ulid generateUlidObject();
    
    /**
     * Validates if the given string is a valid ULID format
     *
     * @param ulidString the string to validate
     * @return true if valid ULID format, false otherwise
     */
    boolean isValidULID(String ulidString);
    
    /**
     * Creates a ULID from a given timestamp (for special use cases)
     *
     * @param timestamp the timestamp to use for ULID generation
     * @return ULID as a string
     */
    String createULIDFromTimestamp(long timestamp);
    
    /**
     * Gets the timestamp component of a ULID
     *
     * @param ulidString the ULID string to extract timestamp from
     * @return timestamp in milliseconds
     */
    long extractTimestamp(String ulidString);
}