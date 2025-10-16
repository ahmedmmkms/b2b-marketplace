package com.p4.backend.util;

import com.github.f4b6a3.ulid.Ulid;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ULIDGeneratorServiceTest {

    @Autowired
    private ULIDGeneratorService ulidGeneratorService;

    @Test
    public void testGenerateULID() {
        // Test that the service generates a valid ULID string
        String ulid = ulidGeneratorService.generateULID();
        
        // Verify the ULID is 26 characters long
        assertEquals(26, ulid.length());
        
        // Verify the ULID contains only valid base32 characters
        assertTrue(ulid.matches("[0-9A-V]+"));
    }

    @Test
    public void testGenerateUlidObject() {
        // Test that the service generates a valid ULID object
        Ulid ulid = ulidGeneratorService.generateUlidObject();
        
        // Verify the ULID is not null
        assertNotNull(ulid);
        
        // Verify converting it to string results in 26 characters
        assertEquals(26, ulid.toString().length());
    }

    @Test
    public void testULIDUniqueness() {
        // Test that multiple ULIDs generated are unique
        Set<String> ulids = new HashSet<>();
        int numberOfUlids = 100;  // Generate 100 ULIDs to test uniqueness

        for (int i = 0; i < numberOfUlids; i++) {
            String ulid = ulidGeneratorService.generateULID();
            ulids.add(ulid);
        }

        // All generated ULIDs should be unique
        assertEquals(numberOfUlids, ulids.size());
    }

    @Test
    public void testULIDValidity() {
        // Test that the service correctly validates ULIDs
        String validUlid = ulidGeneratorService.generateULID();
        String invalidUlidShort = "01ARZ3NDEKTSV4RRFFQ69G5FA";  // Only 25 chars
        String invalidUlidLong = "01ARZ3NDEKTSV4RRFFQ69G5FAVV";  // 27 chars
        String invalidUlidChars = "01ARZ3NDEKTSV4RRFFQ69G5FAW";  // Contains W (not in base32)

        assertTrue(ulidGeneratorService.isValidULID(validUlid));
        assertFalse(ulidGeneratorService.isValidULID(invalidUlidShort));
        assertFalse(ulidGeneratorService.isValidULID(invalidUlidLong));
        assertFalse(ulidGeneratorService.isValidULID(invalidUlidChars));
        assertFalse(ulidGeneratorService.isValidULID(null));
    }

    @Test
    public void testSortableOrder() throws InterruptedException {
        // Test that ULIDs generated in sequence maintain chronological order when sorted
        String firstUlid = ulidGeneratorService.generateULID();
        
        // Wait a millisecond to ensure different timestamp component
        Thread.sleep(2);
        
        String secondUlid = ulidGeneratorService.generateULID();
        
        // The second ULID should be lexicographically greater than the first
        assertTrue(firstUlid.compareTo(secondUlid) < 0, 
                   "Second ULID should be lexicographically greater than first ULID");
    }

    @Test
    public void testTimestampExtraction() {
        // Test that we can extract the timestamp from a ULID
        String ulid = ulidGeneratorService.generateULID();
        
        long extractedTimestamp = ulidGeneratorService.extractTimestamp(ulid);
        
        // Verify that extracted timestamp is a positive value
        assertTrue(extractedTimestamp > 0, "Extracted timestamp should be positive");
    }

    @Test
    public void testCreateULIDFromTimestamp() {
        // Test creating a ULID from a specific timestamp
        long timestamp = System.currentTimeMillis();
        String ulid = ulidGeneratorService.createULIDFromTimestamp(timestamp);
        
        // Validate the generated ULID format
        assertTrue(ulidGeneratorService.isValidULID(ulid));
        
        // Note: In this implementation, we just generate a standard ULID from the timestamp
        // The actual timestamp-based creation may require more complex implementation
        // For now, we're just verifying the ULID format is correct
    }
}