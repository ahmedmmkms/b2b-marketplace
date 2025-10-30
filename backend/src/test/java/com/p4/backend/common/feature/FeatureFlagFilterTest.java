package com.p4.backend.common.feature;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class FeatureFlagFilterTest {

    private FeatureFlagService featureFlagService;
    private FeatureFlagFilter featureFlagFilter;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        featureFlagService = org.mockito.Mockito.mock(FeatureFlagService.class);
        featureFlagFilter = new FeatureFlagFilter();
        // Use reflection or setter to inject the mocked service
        java.lang.reflect.Field serviceField;
        try {
            serviceField = FeatureFlagFilter.class.getDeclaredField("featureFlagService");
            serviceField.setAccessible(true);
            serviceField.set(featureFlagFilter, featureFlagService);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
        
        mockMvc = MockMvcBuilders.standaloneSetup()
                .addFilter(featureFlagFilter)
                .build();
    }

    @Test
    public void testCatalogBrowseEnabled() throws Exception {
        // Arrange
        when(featureFlagService.isCatalogPublicBrowseEnabled()).thenReturn(true);

        // Act & Assert
        mockMvc.perform(get("/products"))
                .andExpect(status().is(200)); // Status 200 means it passed through to the controller
    }

    @Test
    public void testCatalogBrowseDisabled() throws Exception {
        // Arrange
        when(featureFlagService.isCatalogPublicBrowseEnabled()).thenReturn(false);

        // Act & Assert
        mockMvc.perform(get("/products"))
                .andExpect(status().isForbidden())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.type").value("https://tools.ietf.org/html/rfc7231#section-6.5.3"))
                .andExpect(jsonPath("$.title").value("Feature Disabled"))
                .andExpect(jsonPath("$.status").value(403))
                .andExpect(jsonPath("$.detail").value("Catalog browsing is currently disabled"));
    }

    @Test
    public void testProductDetailEnabled() throws Exception {
        // Arrange
        when(featureFlagService.isCatalogPublicBrowseEnabled()).thenReturn(true);

        // Act & Assert
        mockMvc.perform(get("/products/123"))
                .andExpect(status().is(200)); // Status 200 means it passed through to the controller
    }

    @Test
    public void testProductDetailDisabled() throws Exception {
        // Arrange
        when(featureFlagService.isCatalogPublicBrowseEnabled()).thenReturn(false);

        // Act & Assert
        mockMvc.perform(get("/products/123"))
                .andExpect(status().isForbidden())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.type").value("https://tools.ietf.org/html/rfc7231#section-6.5.3"))
                .andExpect(jsonPath("$.title").value("Feature Disabled"))
                .andExpect(jsonPath("$.status").value(403))
                .andExpect(jsonPath("$.detail").value("Catalog browsing is currently disabled"));
    }

    @Test
    public void testSearchEnabled() throws Exception {
        // Arrange
        when(featureFlagService.isCatalogPublicBrowseEnabled()).thenReturn(true);
        when(featureFlagService.isSearchEnabled()).thenReturn(true);

        // Act & Assert - search query should be allowed
        mockMvc.perform(get("/products").param("q", "test"))
                .andExpect(status().is(200));
    }

    @Test
    public void testSearchDisabled() throws Exception {
        // Arrange
        when(featureFlagService.isCatalogPublicBrowseEnabled()).thenReturn(true);
        when(featureFlagService.isSearchEnabled()).thenReturn(false);

        // Act & Assert - search query should be forbidden when disabled
        mockMvc.perform(get("/products").param("q", "test"))
                .andExpect(status().isForbidden())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.type").value("https://tools.ietf.org/html/rfc7231#section-6.5.3"))
                .andExpect(jsonPath("$.title").value("Feature Disabled"))
                .andExpect(jsonPath("$.status").value(403))
                .andExpect(jsonPath("$.detail").value("Search functionality is currently disabled"));
    }

    @Test
    public void testSearchByCategoryDisabled() throws Exception {
        // Arrange
        when(featureFlagService.isCatalogPublicBrowseEnabled()).thenReturn(true);
        when(featureFlagService.isSearchEnabled()).thenReturn(false);

        // Act & Assert - category filtering should be forbidden when search is disabled
        mockMvc.perform(get("/products").param("category", "electronics"))
                .andExpect(status().isForbidden())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.type").value("https://tools.ietf.org/html/rfc7231#section-6.5.3"))
                .andExpect(jsonPath("$.title").value("Feature Disabled"))
                .andExpect(jsonPath("$.status").value(403))
                .andExpect(jsonPath("$.detail").value("Search functionality is currently disabled"));
    }

    @Test
    public void testSearchEnabledWithParams() throws Exception {
        // Arrange
        when(featureFlagService.isCatalogPublicBrowseEnabled()).thenReturn(true);
        when(featureFlagService.isSearchEnabled()).thenReturn(true);

        // Act & Assert - both search and category filtering should be allowed when enabled
        mockMvc.perform(get("/products").param("q", "test").param("category", "electronics"))
                .andExpect(status().is(200));
    }
}