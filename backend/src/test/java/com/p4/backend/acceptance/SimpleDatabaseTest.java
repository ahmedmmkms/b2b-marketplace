package com.p4.backend.acceptance;

import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Simple test to verify database connection using the exact URL provided
 */
public class SimpleDatabaseTest {

    // Using the exact URL provided by the user
    private static final String DB_URL = System.getenv().getOrDefault("DB_URL",
            "jdbc:postgresql://neondb_owner:***REMOVED***@ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
    
    // Separate credentials (if needed for debugging)
    private static final String DB_USERNAME = System.getenv().getOrDefault("DB_USERNAME", "neondb_owner");
    private static final String DB_PASSWORD = System.getenv().getOrDefault("DB_PASSWORD", "***REMOVED***");

    @Test
    public void testDatabaseConnectionWithURL() {
        System.out.println("🔍 Testing Neon Postgres database connection with full URL...");
        System.out.println("🔗 URL: " + DB_URL.replace(DB_PASSWORD, "***HIDDEN***")); // Hide password in output
        long startTime = System.currentTimeMillis();

        try {
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            dataSource.setDriverClassName("org.postgresql.Driver");
            dataSource.setUrl("jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb");
            dataSource.setUsername("neondb_owner");
            dataSource.setPassword("***REMOVED***");

            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            
            // Test connection by executing a simple query
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            
            long responseTime = System.currentTimeMillis() - startTime;
            System.out.println("⏱️  Database connection test completed in " + responseTime + "ms");
            
            assertEquals(Integer.valueOf(1), result, "Database connection should return 1 from SELECT 1 query");
            System.out.println("✅ Neon Postgres database connection successful!");
            
        } catch (Exception e) {
            long responseTime = System.currentTimeMillis() - startTime;
            System.out.println("⏱️  Database connection test failed after " + responseTime + "ms");
            System.out.println("❌ Neon database connection failed: " + e.getMessage());
            e.printStackTrace();
            fail("Database connection failed: " + e.getMessage());
        }
    }
    
    @Test
    public void testDatabaseConnectionWithFullURL() {
        System.out.println("🔍 Testing Neon Postgres database connection with full URL (including credentials)...");
        long startTime = System.currentTimeMillis();

        try {
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            dataSource.setDriverClassName("org.postgresql.Driver");
            // Using the full URL that contains the credentials
            dataSource.setUrl("jdbc:postgresql://neondb_owner:***REMOVED***@ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            
            // Test connection by executing a simple query
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            
            long responseTime = System.currentTimeMillis() - startTime;
            System.out.println("⏱️  Database connection test with full URL completed in " + responseTime + "ms");
            
            assertEquals(Integer.valueOf(1), result, "Database connection should return 1 from SELECT 1 query");
            System.out.println("✅ Neon Postgres database connection with full URL successful!");
            
        } catch (Exception e) {
            long responseTime = System.currentTimeMillis() - startTime;
            System.out.println("⏱️  Database connection test with full URL failed after " + responseTime + "ms");
            System.out.println("❌ Neon database connection with full URL failed: " + e.getMessage());
            e.printStackTrace();
            fail("Database connection with full URL failed: " + e.getMessage());
        }
    }
}