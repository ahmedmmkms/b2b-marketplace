package com.p4.backend.acceptance;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.http.HttpResponse;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class HealthRemoteAcceptanceTest extends RemoteAcceptanceTestBase {

    @Test
    @DisplayName("Actuator health reports UP")
    void actuatorHealthEndpointIsReachable() throws IOException, InterruptedException {
        HttpResponse<String> response = get("actuator/health");
        assertEquals(200, response.statusCode(), "Health endpoint should return HTTP 200");
        JsonNode node = parseJson(response.body());
        assertEquals("UP", node.get("status").asText());
    }

    @Test
    @DisplayName("Actuator info endpoint responds with JSON object")
    void actuatorInfoEndpointIsExposed() throws IOException, InterruptedException {
        HttpResponse<String> response = get("actuator/info");
        assertEquals(200, response.statusCode(), "Info endpoint should return HTTP 200");

        JsonNode node = parseJson(response.body());
        assertTrue(node.isObject(), "Info payload should be a JSON object even if empty");
    }
}
