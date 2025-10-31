package com.p4.backend.common;

import java.security.SecureRandom;

public class ULIDGenerator {
    private static final String ALLOWED_CHARS = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // C, U, X, Z removed to avoid confusion
    private static final int ULID_LENGTH = 26;
    private static final SecureRandom random = new SecureRandom();

    public static String generateULID() {
        char[] ulid = new char[ULID_LENGTH];
        
        // Generate timestamp part (first 10 characters)
        // Use time in milliseconds since Unix epoch
        long timestamp = System.currentTimeMillis();
        
        // Encode the timestamp in base 32 (right to left order)
        for (int i = 9; i >= 0; i--) {
            ulid[i] = ALLOWED_CHARS.charAt((int) (timestamp % 32));
            timestamp /= 32;
        }
        
        // Generate random part (remaining 16 characters)
        for (int i = 10; i < ULID_LENGTH; i++) {
            ulid[i] = ALLOWED_CHARS.charAt(random.nextInt(ALLOWED_CHARS.length()));
        }
        
        return new String(ulid);
    }
}