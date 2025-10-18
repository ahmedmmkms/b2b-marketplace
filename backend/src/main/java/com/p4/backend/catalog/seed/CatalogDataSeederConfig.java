package com.p4.backend.catalog.seed;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;

/**
 * Master configuration for data seeding components
 * This configuration ensures all seeding components are properly registered
 * and run in all environments, but only populate data if none exists
 */
@Configuration
@RequiredArgsConstructor
@Slf4j
public class CatalogDataSeederConfig {
    
    // The individual seeders are already configured as @Components with @Profile({"dev", "test"})
    // This configuration class serves to group them and document their purpose
    
    static {
        log.info("Catalog Data Seeder configuration loaded. Seeders will run in dev/test profiles only.");
    }
}