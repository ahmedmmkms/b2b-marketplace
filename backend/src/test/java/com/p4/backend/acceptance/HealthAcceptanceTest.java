package com.p4.backend.acceptance;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class HealthAcceptanceTest extends AcceptanceTestBase {

    @Test
    void actuatorHealthEndpointIsReachable() throws Exception {
        ResponseEntity<String> response = restTemplate.getForEntity("/actuator/health", String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        JsonNode node = objectMapper.readTree(response.getBody());
        assertEquals("UP", node.get("status").asText());
    }

    @Test
    void actuatorInfoEndpointIsExposed() throws Exception {
        ResponseEntity<String> response = restTemplate.getForEntity("/actuator/info", String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        JsonNode node = objectMapper.readTree(response.getBody());
        assertTrue(node.isObject(), "Actuator info should return a JSON object even if empty");
    }
}
