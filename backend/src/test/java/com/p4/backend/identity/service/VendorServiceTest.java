package com.p4.backend.identity.service;

import com.p4.backend.catalog.model.Organization;
import com.p4.backend.catalog.repository.OrganizationRepository;
import com.p4.backend.identity.model.VendorCreateRequest;
import com.p4.backend.identity.model.VendorResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class VendorServiceTest {

    @Mock
    private OrganizationRepository organizationRepository;

    @InjectMocks
    private VendorService vendorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateVendor() {
        // Arrange
        String testName = "Test Vendor";
        VendorCreateRequest request = new VendorCreateRequest();
        request.setName(testName);

        Organization savedOrg = new Organization();
        savedOrg.setId("TESTULID1234567890123456");
        savedOrg.setName(testName);
        savedOrg.setRole(Organization.Role.vendor);

        when(organizationRepository.save(any(Organization.class))).thenReturn(savedOrg);

        // Act
        VendorResponse response = vendorService.createVendor(request);

        // Assert
        assertNotNull(response);
        assertEquals(savedOrg.getId(), response.getId());
        assertEquals(testName, response.getName());
        assertEquals("vendor", response.getRole());
    }
}