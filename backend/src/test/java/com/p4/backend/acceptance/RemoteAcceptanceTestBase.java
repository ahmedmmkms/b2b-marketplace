package com.p4.backend.acceptance;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertNotNull;

abstract class RemoteAcceptanceTestBase {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    protected static HttpClient httpClient;
    protected static URI apiBaseUrl;

    @BeforeAll
    static void beforeAll() {
        String base = System.getenv().getOrDefault(
            "API_URL_BASE",
            "https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net"
        );
        apiBaseUrl = URI.create(base.endsWith("/") ? base : base + "/");
        httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();
    }

    protected HttpResponse<String> get(String pathAndQuery) throws IOException, InterruptedException {
        URI uri = apiBaseUrl.resolve(pathAndQuery.startsWith("/") ? pathAndQuery.substring(1) : pathAndQuery);
        HttpRequest request = HttpRequest.newBuilder(uri)
            .header("Accept", "application/json")
            .GET()
            .build();
        return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    }

    protected JsonNode parseJson(String body) throws IOException {
        JsonNode node = OBJECT_MAPPER.readTree(body);
        assertNotNull(node, "Response JSON should not be null");
        return node;
    }
}
