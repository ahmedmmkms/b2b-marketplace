package com.p4.backend.catalog.service;

import com.p4.backend.catalog.model.Vendor;
import com.p4.backend.catalog.repository.VendorRepository;
import com.p4.backend.shared.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VendorService {

    private final VendorRepository vendorRepository;

    @Transactional
    public ApiResponse<Vendor> createVendor(Vendor vendor) {
        try {
            // Check if vendor with same email already exists
            if (vendorRepository.existsByEmail(vendor.getEmail())) {
                return ApiResponse.<Vendor>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            Vendor savedVendor = vendorRepository.save(vendor);
            return ApiResponse.success(savedVendor);
        } catch (Exception e) {
            return ApiResponse.<Vendor>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional(readOnly = true)
    public ApiResponse<Vendor> getVendorById(String vendorId) {
        try {
            Optional<Vendor> vendorOpt = vendorRepository.findById(vendorId);
            
            if (vendorOpt.isEmpty()) {
                return ApiResponse.<Vendor>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            Vendor vendor = vendorOpt.get();
            return ApiResponse.success(vendor);
        } catch (Exception e) {
            return ApiResponse.<Vendor>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional
    public ApiResponse<Vendor> updateVendor(String vendorId, Vendor vendorDetails) {
        try {
            Optional<Vendor> vendorOpt = vendorRepository.findById(vendorId);
            
            if (vendorOpt.isEmpty()) {
                return ApiResponse.<Vendor>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            Vendor existingVendor = vendorOpt.get();
            
            // Update fields
            existingVendor.setBusinessName(vendorDetails.getBusinessName());
            existingVendor.setEmail(vendorDetails.getEmail());
            existingVendor.setPhone(vendorDetails.getPhone());
            existingVendor.setAddress(vendorDetails.getAddress());
            existingVendor.setTaxId(vendorDetails.getTaxId());
            existingVendor.setBusinessLicenseNo(vendorDetails.getBusinessLicenseNo());
            existingVendor.setVendorStatus(vendorDetails.getVendorStatus());
            existingVendor.setKycVerified(vendorDetails.getKycVerified());
            existingVendor.setKycVerifiedAt(vendorDetails.getKycVerifiedAt());
            existingVendor.setKycVerifiedBy(vendorDetails.getKycVerifiedBy());
            
            Vendor updatedVendor = vendorRepository.save(existingVendor);
            return ApiResponse.success(updatedVendor);
        } catch (Exception e) {
            return ApiResponse.<Vendor>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional(readOnly = true)
    public ApiResponse<List<Vendor>> getAllVendors(String status, int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            
            Page<Vendor> vendorPage;
            
            if (status != null && !status.isEmpty()) {
                vendorPage = vendorRepository.findByVendorStatus(Vendor.VendorStatus.valueOf(status.toUpperCase()), pageable);
            } else {
                vendorPage = vendorRepository.findAll(pageable);
            }
            
            return ApiResponse.success(vendorPage.getContent());
        } catch (Exception e) {
            return ApiResponse.<List<Vendor>>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional
    public ApiResponse<Void> deleteVendor(String vendorId) {
        try {
            if (!vendorRepository.existsById(vendorId)) {
                return ApiResponse.<Void>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            vendorRepository.deleteById(vendorId);
            return ApiResponse.success(null);
        } catch (Exception e) {
            return ApiResponse.<Void>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }
}