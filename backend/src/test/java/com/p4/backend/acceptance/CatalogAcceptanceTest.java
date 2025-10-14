package com.p4.backend.acceptance;

import com.fasterxml.jackson.databind.JsonNode;
import com.p4.backend.catalog.entity.Product;
import com.p4.backend.catalog.entity.Vendor;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CatalogAcceptanceTest extends AcceptanceTestBase {

    @Test
    void publicCatalogListingReturnsOnlyPublishedProducts() throws Exception {
        Vendor vendor = createActiveVendor("Gulf Industrial Supplies");

        createPublishedProduct(
            vendor,
            "VALVE-001",
            "Industrial Valve",
            new BigDecimal("1250.00"),
            "High pressure industrial valve for oil & gas"
        );

        createPublishedProduct(
            vendor,
            "PUMP-002",
            "Precision Pump",
            new BigDecimal("2890.00"),
            "Chemical dosing pump with precise control"
        );

        Product draft = new Product("Prototype Widget", vendor.getId());
        draft.setSku("DRAFT-900");
        draft.setStatus(Product.ProductStatus.DRAFT);
        draft.setInventoryStatus(Product.InventoryStatus.IN_STOCK);
        draft.setBasePrice(new BigDecimal("999.00"));
        draft.setCurrency("USD");
        draft.setDescription("Internal draft item that should not be surfaced");
        draft.setShortDescription("Draft item");
        catalogRepository.save(draft);

        ResponseEntity<String> response = restTemplate.getForEntity("/api/catalog?page=0&size=20", String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        JsonNode root = objectMapper.readTree(response.getBody());
        JsonNode content = root.get("content");
        assertTrue(content.isArray(), "Catalog response should contain a content array");

        List<String> productNames = StreamSupport.stream(content.spliterator(), false)
            .map(node -> node.get("name").asText())
            .collect(Collectors.toList());

        assertThat(productNames).contains("Industrial Valve", "Precision Pump");
        assertThat(productNames).doesNotContain("Prototype Widget");
        assertThat(root.get("totalElements").asInt()).isEqualTo(2);
    }

    @Test
    void combinedSearchReturnsMatchingCatalogEntries() throws Exception {
        Vendor vendor = createActiveVendor("Precision Components MENA");

        createPublishedProduct(
            vendor,
            "PUMP-009",
            "Precision Metering Pump",
            new BigDecimal("3150.00"),
            "Precision pump engineered for corrosive fluids"
        );

        createPublishedProduct(
            vendor,
            "VALVE-555",
            "Cryogenic Valve",
            new BigDecimal("4150.00"),
            "Designed for extreme temperature operations"
        );

        ResponseEntity<String> response = restTemplate.getForEntity(
            "/api/catalog/search/combined?q=precision%20pump&page=0&size=10",
            String.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        JsonNode root = objectMapper.readTree(response.getBody());

        JsonNode results = root.get("results");
        assertTrue(results.isArray(), "Combined search should return a results array");
        assertEquals(1, results.size(), "Combined search should narrow down to the relevant product");

        JsonNode product = results.get(0);
        assertEquals("Precision Metering Pump", product.get("name").asText());
        assertEquals("PUMP-009", product.get("sku").asText());
        assertEquals("Precision pump engineered for corrosive fluids", product.get("description").asText());

        assertEquals(1, root.get("totalElements").asInt());
        assertEquals(1, root.get("totalPages").asInt());
        assertThat(root.get("hasNext").asBoolean()).isFalse();
        assertThat(root.get("hasPrevious").asBoolean()).isFalse();
    }
}
