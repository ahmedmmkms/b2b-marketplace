package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.ProductCreate;
import com.p4.backend.catalog.service.ProductService;
import com.p4.backend.common.ProblemDetailException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    private Product sampleProduct;
    private ProductCreate sampleProductCreate;

    @BeforeEach
    void setUp() {
        sampleProduct = new Product();
        sampleProduct.setId("TEST_PRODUCT_ID");
        sampleProduct.setVendorId("VENDOR_ID");
        sampleProduct.setSku("TEST-SKU");
        sampleProduct.setName("Test Product");
        sampleProduct.setDescription("Test Description");
        sampleProduct.setReferencePrice(BigDecimal.valueOf(100.0));

        sampleProductCreate = new ProductCreate();
        sampleProductCreate.setVendorId("VENDOR_ID");
        sampleProductCreate.setSku("TEST-SKU");
        sampleProductCreate.setName("Test Product");
        sampleProductCreate.setDescription("Test Description");
        sampleProductCreate.setReferencePrice(100.0);
    }

    @Test
    void testBrowseProducts_NoFilters() throws Exception {
        // Arrange
        when(productService.browseProducts(null, null, 1, 20)).thenReturn(null);

        // Act & Assert
        mockMvc.perform(get("/products"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(productService).browseProducts(null, null, 1, 20);
    }

    @Test
    void testBrowseProducts_WithFilters() throws Exception {
        // Arrange
        when(productService.browseProducts("test", "electronics", 2, 10)).thenReturn(null);

        // Act & Assert
        mockMvc.perform(get("/products")
            .param("q", "test")
            .param("category", "electronics")
            .param("page", "2")
            .param("pageSize", "10"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(productService).browseProducts("test", "electronics", 2, 10);
    }

    @Test
    void testGetProductById_ExistingProduct() throws Exception {
        // Arrange
        when(productService.getProductById("TEST_ID")).thenReturn(sampleProduct);

        // Act & Assert
        mockMvc.perform(get("/products/TEST_ID"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value("TEST_PRODUCT_ID"))
            .andExpect(jsonPath("$.name").value("Test Product"));

        verify(productService).getProductById("TEST_ID");
    }

    @Test
    void testCreateProduct_Success() throws Exception {
        // Arrange
        when(productService.createProduct(any(ProductCreate.class))).thenReturn(sampleProduct);

        String productJson = """
            {
                "vendorId": "VENDOR_ID",
                "sku": "TEST-SKU",
                "name": "Test Product",
                "description": "Test Description",
                "referencePrice": 100.0
            }
            """;

        // Act & Assert
        mockMvc.perform(post("/products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(productJson))
            .andExpect(status().isCreated())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value("TEST_PRODUCT_ID"))
            .andExpect(jsonPath("$.name").value("Test Product"));

        verify(productService).createProduct(any(ProductCreate.class));

        // Verify that the argument captured matches the expected input
        ArgumentCaptor<ProductCreate> captor = ArgumentCaptor.forClass(ProductCreate.class);
        verify(productService).createProduct(captor.capture());
        ProductCreate captured = captor.getValue();
        assertEquals("VENDOR_ID", captured.getVendorId());
        assertEquals("TEST-SKU", captured.getSku());
        assertEquals("Test Product", captured.getName());
    }

    @Test
    void testCreateProduct_ValidationFailure() throws Exception {
        // Arrange
        String invalidProductJson = """
            {
                "vendorId": "",
                "sku": "",
                "name": ""
            }
            """;

        // Act & Assert - Expect a 400 Bad Request due to validation
        mockMvc.perform(post("/products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(invalidProductJson))
            .andExpect(status().isBadRequest());

        // Should not call the service method if validation fails at the controller level
        verify(productService, never()).createProduct(any());
    }
}