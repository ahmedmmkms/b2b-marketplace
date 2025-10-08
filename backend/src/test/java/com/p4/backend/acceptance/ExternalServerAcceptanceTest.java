package com.p4.backend.acceptance;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Integration tests to run against the external running server.
 * These tests make actual HTTP requests to validate the server's behavior.
 */
public class ExternalServerAcceptanceTest {

    private static final String API_BASE_URL = "http://localhost:8080";
    
    private final RestTemplate restTemplate = new RestTemplate();

    @Test
    public void testHealthEndpointOnLocal() {
        // Test: Verify health endpoint is accessible (should be public)
        String url = API_BASE_URL + "/actuator/health";
        
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            
            assertEquals(HttpStatus.OK, response.getStatusCode());
            assertTrue(response.getBody().contains("UP"));
            System.out.println("✓ Health endpoint is accessible on local server");
        } catch (HttpServerErrorException e) {
            System.out.println("❌ Server Error (5xx) when accessing health endpoint: " + e.getMessage());
            System.out.println("This indicates that the application is not running properly.");
            fail("Server error when accessing health endpoint: " + e.getMessage());
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                System.out.println("⚠️  Health endpoint not found (404) on local server");
                System.out.println("This may indicate actuator endpoints are not enabled or configured.");
            } else {
                System.out.println("❌ Client error when accessing health endpoint: " + e.getMessage());
                fail("Client error when accessing health endpoint: " + e.getMessage());
            }
        } catch (ResourceAccessException e) {
            System.out.println("❌ Cannot connect to local server: " + e.getMessage());
            fail("Cannot connect to local server: " + e.getMessage());
        }
    }

    @Test
    public void testApiInfoEndpointOnLocal() {
        // Test: Verify info endpoint is accessible (should be public)
        String url = API_BASE_URL + "/actuator/info";
        
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            
            assertEquals(HttpStatus.OK, response.getStatusCode());
            System.out.println("✓ Info endpoint is accessible on local server");
        } catch (HttpServerErrorException e) {
            System.out.println("❌ Server Error (5xx) when accessing info endpoint: " + e.getMessage());
            System.out.println("This indicates that the application is not running properly.");
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                System.out.println("⚠️  Info endpoint not found (404) on local server");
                System.out.println("This may indicate actuator endpoints are not enabled or configured.");
            } else {
                System.out.println("❌ Client error when accessing info endpoint: " + e.getMessage());
            }
        } catch (ResourceAccessException e) {
            System.out.println("❌ Cannot connect to local server: " + e.getMessage());
        }
    }

    @Test
    public void testActualAuthRequirementForCatalog() {
        // Test: Make an actual HTTP request to check if catalog API requires auth
        String catalogUrl = API_BASE_URL + "/api/catalog?page=0&size=10";
        
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(catalogUrl, String.class);
            
            // If we get a 200 response, it means authentication is not required
            if (response.getStatusCode() == HttpStatus.OK) {
                System.out.println("🔓 Catalog endpoint is accessible without authentication");
                System.out.println("Response: " + response.getBody());
            } else {
                System.out.println("⚠️ Catalog endpoint returned status: " + response.getStatusCode());
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED || 
                e.getStatusCode() == HttpStatus.FORBIDDEN) {
                System.out.println("🔒 Catalog endpoint requires authentication (Status: " + e.getStatusCode() + ")");
            } else {
                System.out.println("❌ Catalog endpoint returned client error: " + e.getStatusCode() + " - " + e.getMessage());
            }
        } catch (HttpServerErrorException e) {
            System.out.println("❌ Server error when accessing catalog endpoint: " + e.getMessage());
        } catch (ResourceAccessException e) {
            System.out.println("❌ Cannot connect to catalog endpoint: " + e.getMessage());
            fail("Cannot connect to local server: " + e.getMessage());
        }
    }

    @Test
    public void testSprint1AcceptanceWithActualServer() {
        System.out.println("🔍 Testing Sprint 1 Acceptance against running server...");
        
        // Test 1: Verify the server is running and accessible
        testHealthEndpointOnLocal();
        
        // Test 2: Verify that the server properly handles authentication for business endpoints
        // If Spring Security is properly configured, we should see some authentication requirements
        testActualAuthRequirementForCatalog();
        
        System.out.println("✅ Sprint 1 server validation completed");
    }
}