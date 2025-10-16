package com.p4.backend.client;

import com.p4.backend.util.ULIDGeneratorService;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import com.p4.backend.config.ULIDConfig;

import java.util.regex.Pattern;

/**
 * A standalone utility to test ULID generation and validation
 * This can be used both locally and potentially against production endpoints
 */
public class ULIDTester {
    
    private static final Pattern ULID_PATTERN = Pattern.compile("^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$");

    public static void main(String[] args) {
        // Create a minimal Spring context to get the ULID generator
        ConfigurableApplicationContext context = SpringApplication.run(ULIDConfig.class, args);
        ULIDGeneratorService ulidService = context.getBean(ULIDGeneratorService.class);
        
        System.out.println("=== ULID Generator Service Test ===");
        
        // Test 1: Generate multiple ULIDs and verify format
        System.out.println("\n1. Testing ULID format and generation:");
        for (int i = 0; i < 5; i++) {
            String ulid = ulidService.generateULID();
            boolean isValid = ulidService.isValidULID(ulid);
            System.out.printf("ULID: %s | Length: %d | Valid: %b%n", 
                            ulid, ulid.length(), isValid);
        }
        
        // Test 2: Verify sortability
        System.out.println("\n2. Testing ULID sortability:");
        String ulid1 = ulidService.generateULID();
        try {
            Thread.sleep(2); // Ensure different timestamp
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        String ulid2 = ulidService.generateULID();
        
        boolean isOrdered = ulid1.compareTo(ulid2) < 0;
        System.out.printf("ULID 1: %s%n", ulid1);
        System.out.printf("ULID 2: %s%n", ulid2);
        System.out.printf("Chronologically ordered: %b%n", isOrdered);
        
        // Test 3: Validate ULID format
        System.out.println("\n3. Testing ULID validation:");
        String[] testCases = {
            ulidService.generateULID(),           // Valid ULID
            "01ARZ3NDEKTSV4RRFFQ69G5FAV",       // Valid format example
            "01ARZ3NDEKTSV4RRFFQ69G5FA",        // Too short
            "01ARZ3NDEKTSV4RRFFQ69G5FAVV",      // Too long
            "01ARZ3NDEKTSV4RRFFQ69G5FAW",       // Contains invalid char 'W'
            null                                 // Null value
        };
        
        for (String testCase : testCases) {
            boolean isValid = ulidService.isValidULID(testCase);
            System.out.printf("Input: %s | Valid: %b%n", 
                            testCase == null ? "null" : testCase, isValid);
        }
        
        // Test 4: Timestamp extraction
        System.out.println("\n4. Testing timestamp extraction:");
        String ulid = ulidService.generateULID();
        long extractedTimestamp = ulidService.extractTimestamp(ulid);
        System.out.printf("ULID: %s | Extracted timestamp: %d | Current time: %d%n", 
                        ulid, extractedTimestamp, System.currentTimeMillis());
        
        // Test 5: Generate ULID from specific timestamp
        System.out.println("\n5. Testing ULID creation from timestamp:");
        long currentTimestamp = System.currentTimeMillis();
        String ulidFromTimestamp = ulidService.createULIDFromTimestamp(currentTimestamp);
        long extracted = ulidService.extractTimestamp(ulidFromTimestamp);
        System.out.printf("Original timestamp: %d | ULID: %s | Extracted: %d | Match: %b%n", 
                        currentTimestamp, ulidFromTimestamp, extracted, 
                        currentTimestamp == extracted);

        context.close();
    }
}