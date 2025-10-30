package com.p4.backend.catalog.service;

import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.repository.ProductRepository;
import com.p4.backend.common.ProblemDetailException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetProductById_Success() {
        // Arrange
        String productId = "testId123456789012345678";
        Product mockProduct = new Product();
        mockProduct.setId(productId);
        mockProduct.setIsActive(true);
        
        when(productRepository.findById(productId)).thenReturn(Optional.of(mockProduct));

        // Act
        Product result = productService.getProductById(productId);

        // Assert
        assertNotNull(result);
        assertEquals(productId, result.getId());
        assertTrue(result.getIsActive());
        verify(productRepository, times(1)).findById(productId);
    }

    @Test
    void testGetProductById_NotFound() {
        // Arrange
        String productId = "nonExistentId1234567890123";
        
        when(productRepository.findById(productId)).thenReturn(Optional.empty());

        // Act & Assert
        ProblemDetailException exception = assertThrows(
            ProblemDetailException.class, 
            () -> productService.getProductById(productId)
        );
        
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        assertEquals("https://api.example.com/errors/product-not-found", exception.getType());
        assertEquals("Product not found", exception.getTitle());
        assertTrue(exception.getDetail().contains(productId));
        verify(productRepository, times(1)).findById(productId);
    }

    @Test
    void testGetProductById_InactiveProduct() {
        // Arrange
        String productId = "inactiveId1234567890123456";
        Product mockProduct = new Product();
        mockProduct.setId(productId);
        mockProduct.setIsActive(false);
        
        when(productRepository.findById(productId)).thenReturn(Optional.of(mockProduct));

        // Act & Assert
        ProblemDetailException exception = assertThrows(
            ProblemDetailException.class, 
            () -> productService.getProductById(productId)
        );
        
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        assertEquals("https://api.example.com/errors/product-not-found", exception.getType());
        assertEquals("Product not found", exception.getTitle());
        assertTrue(exception.getDetail().contains(productId));
        verify(productRepository, times(1)).findById(productId);
    }
}