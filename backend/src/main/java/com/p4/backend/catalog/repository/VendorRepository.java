package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, String> {
    List<Vendor> findByStatus(Vendor.VendorStatus status);
}