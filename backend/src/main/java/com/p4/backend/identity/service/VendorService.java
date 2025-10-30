package com.p4.backend.identity.service;

import com.p4.backend.catalog.model.Organization;
import com.p4.backend.catalog.repository.OrganizationRepository;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.identity.model.VendorCreateRequest;
import com.p4.backend.identity.model.VendorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VendorService {
    
    @Autowired
    private OrganizationRepository organizationRepository;
    
    public VendorResponse createVendor(VendorCreateRequest request) {
        // Generate a new ULID for the organization
        String ulid = ULIDGenerator.generateULID();
        
        // Create a new Organization with role VENDOR
        Organization vendor = new Organization();
        vendor.setId(ulid);
        vendor.setName(request.getName());
        vendor.setRole(Organization.Role.vendor);
        
        // Save the organization
        Organization savedVendor = organizationRepository.save(vendor);
        
        // Return the response
        return new VendorResponse(savedVendor.getId(), savedVendor.getName(), savedVendor.getRole().toString());
    }
    
    public Optional<Organization> findVendorById(String id) {
        return organizationRepository.findById(id);
    }
}