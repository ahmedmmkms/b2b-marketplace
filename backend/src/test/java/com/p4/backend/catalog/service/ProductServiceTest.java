package com.p4.backend.catalog.service;

import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.ProductCreate;
import com.p4.backend.catalog.repository.ProductRepository;
import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import io.micrometer.core.instrument.MeterRegistry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;
    
    @Mock
    private MeterRegistry meterRegistry;

    private ProductService productService;

    @BeforeEach
    void setUp() {
        productService = new ProductService(meterRegistry);
        ReflectionTestUtils.setField(productService, "productRepository", productRepository);
    }

    @Test
    void testBrowseProducts() {
        // Arrange
        List<Product> products = Arrays.asList(new Product(), new Product());
        Page<Product> productPage = new PageImpl<>(products);
        when(productRepository.findByIsActiveTrueWithFilters(null, null, any(Pageable.class)))
            .thenReturn(productPage);

        // Act
        Page<Product> result = productService.browseProducts(null, null, 1, 20);

        // Assert
        assertEquals(2, result.getContent().size());
        verify(productRepository).findByIsActiveTrueWithFilters(null, null, any(Pageable.class));
    }

    @Test
    void testGetProductById_ExistingProduct() {
        // Arrange
        String productId = "TEST_PRODUCT_ID";
        Product product = new Product(productId, "VENDOR_ID", "SKU", "Test Product");
        product.setIsActive(true);
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        // Act
        Product result = productService.getProductById(productId);

        // Assert
        assertEquals(productId, result.getId());
        verify(productRepository).findById(productId);
    }

    @Test
    void testGetProductById_NonExistingProduct() {
        // Arrange
        String productId = "NON_EXISTENT_ID";
        when(productRepository.findById(productId)).thenReturn(Optional.empty());

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class, 
            () -> productService.getProductById(productId));
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(productRepository).findById(productId);
    }

    @Test
    void testGetProductById_InactiveProduct() {
        // Arrange
        String productId = "INACTIVE_PRODUCT_ID";
        Product product = new Product(productId, "VENDOR_ID", "SKU", "Test Product");
        product.setIsActive(false);
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class, 
            () -> productService.getProductById(productId));
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(productRepository).findById(productId);
    }

    @Test
    void testCreateProduct_Success() {
        // Arrange
        ProductCreate productCreate = new ProductCreate();
        productCreate.setVendorId("VENDOR_ID");
        productCreate.setSku("TEST-SKU");
        productCreate.setName("Test Product");
        productCreate.setDescription("Test Description");
        productCreate.setReferencePrice(100.0);

        when(productRepository.findByVendorIdAndSku("VENDOR_ID", "TEST-SKU")).thenReturn(Optional.empty());
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> {
            Product savedProduct = invocation.getArgument(0);
            savedProduct.setId(ULIDGenerator.generateULID()); // This simulates the ID being set
            return savedProduct;
        });

        // Act
        Product result = productService.createProduct(productCreate);

        // Assert
        assertNotNull(result.getId());
        assertEquals("VENDOR_ID", result.getVendorId());
        assertEquals("TEST-SKU", result.getSku());
        assertEquals("Test Product", result.getName());
        assertEquals("Test Description", result.getDescription());
        assertEquals(BigDecimal.valueOf(100.0), result.getReferencePrice());
        verify(productRepository).findByVendorIdAndSku("VENDOR_ID", "TEST-SKU");
        verify(productRepository).save(any(Product.class));

        // Verify that the created product has the expected state
        ArgumentCaptor<Product> productCaptor = ArgumentCaptor.forClass(Product.class);
        verify(productRepository).save(productCaptor.capture());
        Product capturedProduct = productCaptor.getValue();
        assertNotNull(capturedProduct.getId());
        assertEquals("VENDOR_ID", capturedProduct.getVendorId());
        assertEquals("TEST-SKU", capturedProduct.getSku());
        assertEquals("Test Product", capturedProduct.getName());
    }

    @Test
    void testCreateProduct_DuplicateSku() {
        // Arrange
        ProductCreate productCreate = new ProductCreate();
        productCreate.setVendorId("VENDOR_ID");
        productCreate.setSku("DUPLICATE-SKU");
        productCreate.setName("Test Product");

        Product existingProduct = new Product("EXISTING_ID", "VENDOR_ID", "DUPLICATE-SKU", "Existing Product");
        when(productRepository.findByVendorIdAndSku("VENDOR_ID", "DUPLICATE-SKU")).thenReturn(Optional.of(existingProduct));

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class, 
            () -> productService.createProduct(productCreate));
        assertEquals(HttpStatus.CONFLICT, exception.getStatus());
        assertTrue(exception.getDetail().contains("already exists"));
        verify(productRepository).findByVendorIdAndSku("VENDOR_ID", "DUPLICATE-SKU");
        verify(productRepository, never()).save(any(Product.class));
    }
}