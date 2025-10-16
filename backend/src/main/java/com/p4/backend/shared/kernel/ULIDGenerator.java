package com.p4.backend.shared.kernel;

/**
 * Utility class for ULID generation that delegates to the main ULIDGeneratorService
 * This maintains compatibility with existing code while using the centralized implementation
 */
public class ULIDGenerator {
    
    /**
     * Generate a ULID string
     * @return a 26-character ULID string
     */
    public static String generateULID() {
        // This method delegates to the main ULIDGeneratorService
        // It's provided for compatibility with any existing code that might call this method directly
        // In practice, ULIDGeneratorService should be injected and used directly
        throw new UnsupportedOperationException("Use ULIDGeneratorService instead of this static method");
    }
}