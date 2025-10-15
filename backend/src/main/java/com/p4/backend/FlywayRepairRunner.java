package com.p4.backend;

import org.flywaydb.core.Flyway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

/**
 * Temporary runner to execute Flyway repair. This should be removed after the 
 * checksum mismatch issue is resolved in the database.
 */
@Component
public class FlywayRepairRunner implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(FlywayRepairRunner.class);
    
    @Autowired
    private DataSource dataSource;
    
    @Override
    public void run(String... args) throws Exception {
        logger.info("Running Flyway repair to fix checksum mismatch...");
        
        Flyway flyway = Flyway.configure()
            .dataSource(dataSource)
            .locations("classpath:db/migration")
            .load();
            
        flyway.repair();
        
        logger.info("Flyway repair completed successfully.");
    }
}