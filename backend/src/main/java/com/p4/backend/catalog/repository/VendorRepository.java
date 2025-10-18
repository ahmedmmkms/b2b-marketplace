package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, String> {
    Optional<Vendor> findByEmail(String email);

    @Query("SELECT v FROM Vendor v WHERE v.vendorStatus = :status")
    List<Vendor> findByVendorStatus(@Param("status") Vendor.VendorStatus status);

    @Query("SELECT v FROM Vendor v WHERE v.kycVerified = true")
    List<Vendor> findByKycVerifiedTrue();

    boolean existsByEmail(String email);
}