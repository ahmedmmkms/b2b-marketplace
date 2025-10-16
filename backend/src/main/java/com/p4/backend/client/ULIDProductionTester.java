package com.p4.backend.client;

import com.p4.backend.util.ULIDGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 * A simple client to test ULID generation functionality against the production deployment
 * This would typically be used to verify ULID generation in the deployed environment
 */
@Component
public class ULIDProductionTester implements CommandLineRunner {

    @Autowired
    private ULIDGeneratorService ulidGeneratorService;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String apiUrl = "https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net";

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Testing ULID generation in production environment...");
        System.out.println("Base API URL: " + apiUrl);

        // Test local ULID generation (as a reference)
        System.out.println("\nLocal ULID generation test:");
        for (int i = 0; i < 3; i++) {
            String localUlid = ulidGeneratorService.generateULID();
            System.out.println("Generated ULID: " + localUlid + 
                             " | Valid: " + ulidGeneratorService.isValidULID(localUlid));
        }

        // In a real scenario, you would call the production API to test ULID generation
        // For example, creating an entity and verifying the returned ID
        testProductionULIDFunctionality();
    }

    private void testProductionULIDFunctionality() {
        System.out.println("\nProduction ULID functionality test:");
        System.out.println("Note: Actual API endpoints may not be available yet in early sprints.");
        System.out.println("The following is a template for how to test against production:");
        System.out.println();

        // Example API endpoint that might generate ULIDs (hypothetical)
        String exampleEndpoint = apiUrl + "/api/test/ulid-generation";
        System.out.println("Example endpoint: " + exampleEndpoint);
        System.out.println("Method: GET or POST (depending on implementation)");
        System.out.println("Expected response: Entity with ULID as ID field");
        System.out.println("Validation: ID should be 26 characters and match ULID format");
    }
}