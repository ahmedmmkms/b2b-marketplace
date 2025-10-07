package com.p4.backend;

import com.p4.backend.catalog.entity.Product;
import com.p4.backend.catalog.entity.Vendor;
import com.p4.backend.catalog.repository.CatalogRepository;
import com.p4.backend.catalog.repository.VendorRepository;
import com.p4.backend.shared.config.DatabaseSeeder;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class DatabaseSeederTest {

    @Autowired
    private DatabaseSeeder databaseSeeder;
    
    @Autowired
    private VendorRepository vendorRepository;
    
    @Autowired
    private CatalogRepository productRepository;

    @Test
    void contextLoads() {
        assertNotNull(databaseSeeder);
    }
    
    @Test
    void testDatabaseSeederRuns() {
        // Run the seeder
        try {
            databaseSeeder.run();
            
            // Verify vendors were created
            long vendorCount = vendorRepository.count();
            assertTrue(vendorCount > 0, "Vendors should be seeded");
            
            // Verify products were created
            long productCount = productRepository.count();
            assertTrue(productCount > 0, "Products should be seeded");
            
            // Verify at least one vendor is active
            Vendor vendor = vendorRepository.findAll().iterator().next();
            assertEquals(Vendor.VendorStatus.ACTIVE, vendor.getStatus(), "Vendor should be active");
            
            // Verify at least one product is published
            Product product = productRepository.findAll().iterator().next();
            assertEquals(Product.ProductStatus.PUBLISHED, product.getStatus(), "Product should be published");
            
        } catch (Exception e) {
            fail("Seeder should run without exceptions: " + e.getMessage());
        }
    }
}