package com.p4.backend.rfq.service;

import com.p4.backend.catalog.entity.Vendor;
import com.p4.backend.catalog.repository.VendorRepository;
import com.p4.backend.rfq.entity.Rfq;
import com.p4.backend.rfq.repository.RfqRepository;
import com.p4.backend.shared.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private RfqRepository rfqRepository;

    public List<Vendor> getVendorsForRfq(String rfqId) throws BusinessException {
        // First validate that the RFQ exists
        if (rfqRepository.findById(rfqId).isEmpty()) {
            throw new BusinessException("RFQ not found: " + rfqId);
        }

        // For now, return all active vendors
        // In a more sophisticated implementation, we would filter based on product categories,
        // location, ratings, etc.
        return vendorRepository.findByStatus(Vendor.VendorStatus.ACTIVE);
    }

    public void addVendorsToRfqShortlist(String rfqId, List<String> vendorIds) throws BusinessException {
        // Validate the RFQ exists
        if (rfqRepository.findById(rfqId).isEmpty()) {
            throw new BusinessException("RFQ not found: " + rfqId);
        }

        // Validate that all vendors exist and are active
        for (String vendorId : vendorIds) {
            Optional<Vendor> vendorOpt = vendorRepository.findById(vendorId);
            if (vendorOpt.isEmpty()) {
                throw new BusinessException("Vendor not found: " + vendorId);
            }
            
            Vendor vendor = vendorOpt.get();
            if (vendor.getStatus() != Vendor.VendorStatus.ACTIVE) {
                throw new BusinessException("Vendor is not active: " + vendorId);
            }
        }

        // In a more advanced implementation, we would store the shortlist in a separate table
        // For now, we just validate the vendors
    }
}