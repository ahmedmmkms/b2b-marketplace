package com.p4.backend.acceptance;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.http.HttpResponse;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CatalogRemoteAcceptanceTest extends RemoteAcceptanceTestBase {

    @Test
    @DisplayName("Public catalog listing is reachable and returns paginated payload")
    void publicCatalogListingReturnsData() throws IOException, InterruptedException {
        HttpResponse<String> response = get("api/catalog?page=0&size=5");
        assertEquals(200, response.statusCode(), "Expected HTTP 200 from public catalog endpoint");
        assertThat(response.headers().firstValue("cache-control"))
            .describedAs("Catalog responses should advertise public caching")
            .isPresent();

        JsonNode root = parseJson(response.body());
        assertTrue(root.hasNonNull("content"), "Catalog response should contain a content key");
        assertTrue(root.get("content").isArray(), "Catalog content should be an array");
        assertTrue(root.hasNonNull("totalElements"), "Catalog payload should include totalElements");
        assertTrue(root.get("totalElements").asInt() >= 0, "Total elements should be non-negative");
    }

    @Test
    @DisplayName("Combined search responds with search metadata even when no results")
    void combinedSearchReturnsMetadata() throws IOException, InterruptedException {
        HttpResponse<String> response = get("api/catalog/search/combined?q=nonexistent-item-acceptance-test&size=3");
        assertEquals(200, response.statusCode(), "Combined search should succeed for arbitrary queries");

        JsonNode root = parseJson(response.body());
        assertTrue(root.has("query"), "Combined search should echo the query string");
        assertTrue(root.has("results"), "Combined search should include a results array");
        assertTrue(root.get("results").isArray(), "Results should be an array");
        assertTrue(root.has("totalElements"), "Combined search should report totalElements");
        assertTrue(root.has("totalPages"), "Combined search should report totalPages");
    }
}
