package com.p4.backend.common;

import java.security.SecureRandom;

public class ULIDGenerator {
    private static final String ALLOWED_CHARS = "0123456789ABCDEFGHJKMNP T VWXYZ".replace(" ", "");
    private static final int ULID_LENGTH = 26;
    private static final SecureRandom random = new SecureRandom();

    public static String generateULID() {
        char[] ulid = new char[ULID_LENGTH];
        
        // Generate timestamp part (first 10 characters)
        // Use time in milliseconds since Unix epoch
        long timestamp = System.currentTimeMillis();
        
        // Encode the timestamp in base (length of allowed characters)
        int base = ALLOWED_CHARS.length();
        for (int i = 9; i >= 0; i--) {
            ulid[i] = ALLOWED_CHARS.charAt((int) (timestamp % base));
            timestamp /= base;
        }
        
        // Generate random part (remaining 16 characters)
        for (int i = 10; i < ULID_LENGTH; i++) {
            ulid[i] = ALLOWED_CHARS.charAt(random.nextInt(ALLOWED_CHARS.length()));
        }
        
        return new String(ulid);
    }
    
    /**
     * Validates if a given string is a properly formatted ULID
     * @param value The string to validate
     * @return true if the string is a valid ULID, false otherwise
     */
    public static boolean isValidULID(String value) {
        if (value == null || value.length() != ULID_LENGTH) {
            return false;
        }
        
        for (int i = 0; i < ULID_LENGTH; i++) {
            char c = value.charAt(i);
            if (ALLOWED_CHARS.indexOf(c) == -1) {
                return false;
            }
        }
        
        return true;
    }
}