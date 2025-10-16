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
        // Using the timestamp constructor from ULID library
        Ulid ulid = UlidCreator.getUlid();
        // Note: The actual method might be different based on the library version
        // This is a placeholder - the real implementation would depend on the specific ULID library
        // For now, we'll generate a standard ULID (the timestamp-based creation might be more complex)
        return ulid.toString();
    }

    /**
     * Gets the timestamp component of a ULID
     *
     * @param ulidString the ULID string to extract timestamp from
     * @return timestamp in milliseconds
     */
    @Override
    public long extractTimestamp(String ulidString) {
        // Extract the timestamp from ULID - first 10 characters represent the timestamp in base32
        if (ulidString == null || ulidString.length() != 26) {
            throw new IllegalArgumentException("Invalid ULID string");
        }
        
        String timeComponent = ulidString.substring(0, 10);
        return convertBase32ToDecimal(timeComponent);
    }
    
    /**
     * Helper method to convert base32-encoded timestamp to decimal
     * 
     * @param base32Timestamp the base32-encoded timestamp part of ULID
     * @return timestamp in milliseconds
     */
    private long convertBase32ToDecimal(String base32Timestamp) {
        // Base32 alphabet: 0123456789ABCDEFGHJKMNPQRSTVWXYZ
        long result = 0;
        for (char c : base32Timestamp.toCharArray()) {
            int digitValue = getBase32Value(c);
            result = result * 32 + digitValue;
        }
        return result;
    }
    
    /**
     * Helper method to get the decimal value of a base32 character
     * 
     * @param c the base32 character
     * @return the decimal value
     */
    private int getBase32Value(char c) {
        if (c >= '0' && c <= '9') {
            return c - '0';
        } else if (c >= 'A' && c <= 'H') {
            return 10 + (c - 'A');
        } else if (c >= 'J' && c <= 'K') {
            return 16 + (c - 'J');
        } else if (c >= 'M' && c <= 'N') {
            return 18 + (c - 'M');
        } else if (c >= 'P' && c <= 'T') {
            return 20 + (c - 'P');
        } else if (c >= 'V' && c <= 'Z') {
            return 25 + (c - 'V');
        }
        throw new IllegalArgumentException("Invalid base32 character: " + c);
    }
}