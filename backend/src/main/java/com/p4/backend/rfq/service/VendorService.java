package com.p4.backend.rfq.service;

import com.p4.backend.catalog.entity.Vendor;
import com.p4.backend.catalog.repository.VendorRepository;
import com.p4.backend.rfq.entity.Rfq;
import com.p4.backend.rfq.repository.RfqRepository;
import com.p4.backend.shared.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private RfqRepository rfqRepository;

    public List<Vendor> getVendorsForRfq(String rfqId) {
        // First validate that the RFQ exists
        if (rfqRepository.findById(rfqId).isEmpty()) {
            throw new BusinessException("RFQ not found: " + rfqId);
        }

        // For now, return all active vendors
        // In a more sophisticated implementation, we would filter based on product categories,
        // location, ratings, etc.
        return vendorRepository.findByStatus(Vendor.Status.ACTIVE);
    }

    public void addVendorsToRfqShortlist(String rfqId, List<String> vendorIds) {
        // Validate the RFQ exists
        if (rfqRepository.findById(rfqId).isEmpty()) {
            throw new BusinessException("RFQ not found: " + rfqId);
        }

        // Validate that all vendors exist and are active
        for (String vendorId : vendorIds) {
            vendorRepository.findById(vendorId).ifPresentOrElse(
                vendor -> {
                    if (vendor.getStatus() != Vendor.Status.ACTIVE) {
                        throw new BusinessException("Vendor is not active: " + vendorId);
                    }
                },
                () -> {
                    throw new BusinessException("Vendor not found: " + vendorId);
                }
            );
        }

        // In a more advanced implementation, we would store the shortlist in a separate table
        // For now, we just validate the vendors
    }
}