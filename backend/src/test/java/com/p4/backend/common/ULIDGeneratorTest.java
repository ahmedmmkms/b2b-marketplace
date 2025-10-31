package com.p4.backend.common;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ULIDGeneratorTest {
    
    @Test
    public void testValidULIDGeneration() {
        String ulid = ULIDGenerator.generateULID();
        
        // Check that generated ULID is 26 characters long
        assertEquals(26, ulid.length());
        
        // Check that generated ULID is valid
        assertTrue(ULIDGenerator.isValidULID(ulid));
    }
    
    @Test
    public void testValidULIDValidation() {
        // Valid ULID format
        String validULID = "01G65Z755XXF4Y4Z01G65Z755X";
        assertTrue(ULIDGenerator.isValidULID(validULID));
    }
    
    @Test
    public void testInvalidULIDValidation() {
        // Too short
        assertFalse(ULIDGenerator.isValidULID("01G65Z755XXF4Y4Z01G65Z755"));
        
        // Too long
        assertFalse(ULIDGenerator.isValidULID("01G65Z755XXF4Y4Z01G65Z755XXF"));
        
        // Contains invalid character 'I'
        assertFalse(ULIDGenerator.isValidULID("01G65Z755XXF4Y4Z01G65Z755I"));
        
        // Contains invalid character 'L'
        assertFalse(ULIDGenerator.isValidULID("01G65Z755XXF4Y4Z01G65Z755L"));
        
        // Contains invalid character 'O'
        assertFalse(ULIDGenerator.isValidULID("01G65Z755XXF4Y4Z01G65Z755O"));
        
        // Null value
        assertFalse(ULIDGenerator.isValidULID(null));
        
        // Empty string
        assertFalse(ULIDGenerator.isValidULID(""));
    }
    
    @Test
    public void testConsistentValidation() {
        // Generate a ULID and verify it is valid according to validation method
        for (int i = 0; i < 100; i++) {
            String ulid = ULIDGenerator.generateULID();
            assertTrue(ULIDGenerator.isValidULID(ulid), 
                "Generated ULID should be valid: " + ulid);
        }
    }
}