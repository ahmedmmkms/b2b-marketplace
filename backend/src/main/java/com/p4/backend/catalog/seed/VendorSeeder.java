package com.p4.backend.catalog.seed;

import com.p4.backend.catalog.model.Vendor;
import com.p4.backend.catalog.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

/**
 * Data seeder for Vendor entities
 * This component runs in all environments but only seeds if no vendors exist
 */
@Component
@Order(1)
@RequiredArgsConstructor
@Slf4j
public class VendorSeeder implements CommandLineRunner {
    
    private final VendorRepository vendorRepository;
    private final Random random = new Random();
    
    // Sample business names for vendors
    private final String[] businessNames = {
        "Tech Innovations LLC", "Global Supplies Co.", "Premium Goods Inc.", 
        "Electronics Hub", "Industrial Parts Pro", "Fashion Forward Ltd.", 
        "Home Essentials", "Office Solutions", "Auto Parts Direct", 
        "Garden & Yard Co.", "Health & Wellness Corp", "Sports Gear Inc."
    };
    
    // Sample addresses
    private final String[] addresses = {
        "123 Tech Street, San Francisco, CA 94103",
        "456 Commerce Blvd, New York, NY 10001", 
        "789 Industrial Way, Chicago, IL 60601",
        "321 Market Road, Seattle, WA 98101",
        "654 Business Ave, Boston, MA 02108",
        "987 Trade Plaza, Austin, TX 73301",
        "147 Supply Lane, Denver, CO 80202",
        "258 Distribution Dr, Miami, FL 33101",
        "369 Manufacturing Rd, Detroit, MI 48201",
        "741 Logistics Way, Atlanta, GA 30303"
    };
    
    @Override
    public void run(String... args) throws Exception {
        log.info("Starting vendor data seeding...");
        
        // Check if vendors with our specific business names already exist
        long existingVendors = vendorRepository.count();
        if (existingVendors > 0) {
            log.info("Found {} vendors in database. Checking if seed vendors exist.", existingVendors);
            
            // Check if our specific seed vendors already exist
            boolean seedVendorsExist = businessNames.length > 0 && 
                vendorRepository.findByEmail(generateEmail(businessNames[0])).isPresent();
                
            if (seedVendorsExist) {
                log.info("Seed vendors already exist in database. Skipping seeding.");
                return;
            }
        }
        
        // Create and save mock vendors
        for (int i = 0; i < businessNames.length; i++) {
            Vendor vendor = new Vendor();
            vendor.setBusinessName(businessNames[i]);
            vendor.setEmail(generateEmail(businessNames[i]));
            vendor.setPhone(generatePhoneNumber());
            vendor.setAddress(addresses[i % addresses.length]);
            vendor.setTaxId("TAX" + String.format("%06d", i + 1));
            vendor.setBusinessLicenseNo("BL" + String.format("%08d", i + 1));
            vendor.setRegistrationDate(LocalDate.now().minusDays(random.nextInt(365 * 3))); // Within last 3 years
            vendor.setVendorStatus(Vendor.VendorStatus.APPROVED); // Always approved for seed data
            vendor.setKycVerified(true); // Always verified for seed data
            vendor.setKycVerifiedAt(LocalDate.now().minusDays(random.nextInt(180)));
            vendor.setKycVerifiedBy("System Admin");
            
            vendorRepository.save(vendor);
            log.debug("Saved vendor: {}", vendor.getBusinessName());
        }
        
        log.info("Vendor data seeding completed. Total vendors created: {}", businessNames.length);
    }
    
    private String generateEmail(String businessName) {
        // Clean the business name to create an email
        String cleanName = businessName.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        return cleanName + "@vendor.com";
    }
    
    private String generatePhoneNumber() {
        // Generate a realistic US phone number format
        int areaCode = 200 + random.nextInt(800);
        int exchange = 200 + random.nextInt(800);
        int number = 1000 + random.nextInt(9000);
        return String.format("+1%d%d%d", areaCode, exchange, number);
    }
}