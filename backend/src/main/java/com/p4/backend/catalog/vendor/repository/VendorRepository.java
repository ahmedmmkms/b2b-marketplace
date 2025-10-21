package com.p4.backend.catalog.vendor.repository;

import com.p4.backend.catalog.vendor.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, String> {
    List<Vendor> findByVendorStatus(Vendor.VendorStatus vendorStatus);
    Optional<Vendor> findByBusinessName(String businessName);
    List<Vendor> findByKycVerified(Boolean kycVerified);
}