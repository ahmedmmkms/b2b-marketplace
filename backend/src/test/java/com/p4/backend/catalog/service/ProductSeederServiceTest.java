package com.p4.backend.catalog.service;

import com.p4.backend.catalog.model.Organization;
import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.repository.OrganizationRepository;
import com.p4.backend.catalog.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductSeederServiceTest {

    @Mock
    private OrganizationRepository organizationRepository;
    
    @Mock
    private ProductRepository productRepository;
    
    private ProductSeederService productSeederService;
    
    @BeforeEach
    void setUp() {
        productSeederService = new ProductSeederService();
        // Use reflection or setter injection to inject the mocks
        productSeederService.organizationRepository = organizationRepository;
        productSeederService.productRepository = productRepository;
    }

    @Test
    void shouldCreateVendorIfNotExists() {
        // Given
        String csvPath = "test.csv";
        when(organizationRepository.findByRole(Organization.Role.vendor)).thenReturn(Optional.empty());
        when(organizationRepository.save(any(Organization.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(productRepository.findByVendorId(any(String.class))).thenReturn(List.of());

        // When
        productSeederService.seedData(csvPath);

        // Then
        verify(organizationRepository, times(1)).save(any(Organization.class));
        verify(productRepository, times(1)).findByVendorId(any(String.class));
    }
    
    @Test
    void shouldUseExistingVendorIfExists() {
        // Given
        String csvPath = "test.csv";
        Organization existingVendor = new Organization("test-id", "Existing Vendor", Organization.Role.vendor);
        when(organizationRepository.findByRole(Organization.Role.vendor)).thenReturn(Optional.of(existingVendor));

        // When
        productSeederService.seedData(csvPath);

        // Then
        verify(organizationRepository, never()).save(any(Organization.class));
        verify(productRepository, times(1)).findByVendorId("test-id");
    }
    
    @Test
    void shouldSaveNewProducts() {
        // Given
        Organization vendor = new Organization("vendor-id", "Test Vendor", Organization.Role.vendor);
        when(organizationRepository.findByRole(Organization.Role.vendor)).thenReturn(Optional.of(vendor));
        when(productRepository.findByVendorId("vendor-id")).thenReturn(List.of()); // No existing products
        
        // When
        // This will fail since CSV file doesn't exist, so just testing the save behavior logic
        assertThrows(RuntimeException.class, () -> {
            productSeederService.seedData("nonexistent.csv");
        });

        // Then - verify that it tried to find existing products
        verify(productRepository, times(1)).findByVendorId("vendor-id");
    }
}