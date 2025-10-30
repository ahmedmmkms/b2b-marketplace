package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ProductControllerTest {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(productController)
                .build();
    }

    @Test
    void testGetProductById_Success() throws Exception {
        // Arrange
        String productId = "testId123456789012345678";
        Product mockProduct = new Product();
        mockProduct.setId(productId);
        mockProduct.setName("Test Product");
        mockProduct.setIsActive(true);
        
        when(productService.getProductById(productId)).thenReturn(mockProduct);

        // Act & Assert
        mockMvc.perform(get("/products/{id}", productId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(productId))
                .andExpect(jsonPath("$.name").value("Test Product"));

        verify(productService, times(1)).getProductById(productId);
    }

    @Test
    void testGetProductById_NotFound() throws Exception {
        // Arrange
        String productId = "nonExistentId1234567890123";
        
        doThrow(new com.p4.backend.common.ProblemDetailException(
                org.springframework.http.HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/product-not-found",
                "Product not found",
                "Product with id '" + productId + "' does not exist or is not active"
        )).when(productService).getProductById(productId);

        // Act & Assert
        mockMvc.perform(get("/products/{id}", productId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.type").value("https://api.example.com/errors/product-not-found"))
                .andExpect(jsonPath("$.title").value("Product not found"))
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.detail").value("Product with id '" + productId + "' does not exist or is not active"));

        verify(productService, times(1)).getProductById(productId);
    }
}