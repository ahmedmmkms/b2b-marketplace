package com.p4.backend.common;

import java.security.SecureRandom;

public class ULIDGenerator {
    private static final String ALLOWED_CHARS = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // C, U, X, Z removed to avoid confusion
    private static final int ULID_LENGTH = 26;
    private static final SecureRandom random = new SecureRandom();

    public static String generateULID() {
        StringBuilder ulid = new StringBuilder(ULID_LENGTH);
        
        // Generate timestamp part (first 10 characters)
        long timestamp = System.currentTimeMillis();
        for (int i = 9; i >= 0; i--) {
            ulid.append(ALLOWED_CHARS.charAt((int) (timestamp % 32)));
            timestamp /= 32;
        }
        
        // Generate random part (remaining 16 characters)
        for (int i = 0; i < 16; i++) {
            ulid.append(ALLOWED_CHARS.charAt(random.nextInt(32)));
        }
        
        return ulid.reverse().toString();
    }
}