package com.p4.backend.catalog.command;

import com.p4.backend.catalog.service.ProductSeederService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ProductSeederRunner implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(ProductSeederRunner.class);
    
    @Autowired
    private ProductSeederService productSeederService;
    
    @Value("${app.seed.csv-path:seed/products.csv}")
    private String csvPath;
    
    @Override
    public void run(String... args) throws Exception {
        logger.info("Starting product seeding process...");
        
        try {
            // Run the seeding process
            productSeederService.seedData(csvPath);
            logger.info("Product seeding process completed successfully!");
        } catch (Exception e) {
            logger.error("Error occurred during product seeding: {}", e.getMessage(), e);
            throw e; // Re-throw to indicate failure to Spring Boot
        }
    }
}