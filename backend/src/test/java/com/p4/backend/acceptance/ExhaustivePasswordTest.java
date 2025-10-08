package com.p4.backend.acceptance;

import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Exhaustive test to try different password variations to identify the correct one
 */
public class ExhaustivePasswordTest {

    private static final String DB_URL_BASE = "jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
    private static final String DB_USERNAME = "neondb_owner";
    
    // Different password variations to test
    private static final String[] PASSWORD_VARIATIONS = {
        "***REMOVED***",  // From URL
        "pg_QTE70VJgbcd",    // Separate password
        "pg_QTE70VJgbcdp",   // Variation of URL password
        "npg_QTE70VJgbcd"    // Truncated version
    };

    @Test
    public void testAllPasswordVariations() {
        boolean connectionSuccessful = false;
        String successfulPassword = null;
        
        for (String password : PASSWORD_VARIATIONS) {
            System.out.println("🔍 Testing with password: " + maskPassword(password));
            long startTime = System.currentTimeMillis();

            try {
                DriverManagerDataSource dataSource = new DriverManagerDataSource();
                dataSource.setDriverClassName("org.postgresql.Driver");
                dataSource.setUrl(DB_URL_BASE);
                dataSource.setUsername(DB_USERNAME);
                dataSource.setPassword(password);

                JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
                
                // Test connection by executing a simple query
                Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
                
                long responseTime = System.currentTimeMillis() - startTime;
                System.out.println("⏱️  Database connection test with password '" + maskPassword(password) + "' completed in " + responseTime + "ms");
                
                if (Integer.valueOf(1).equals(result)) {
                    System.out.println("✅ SUCCESS! Neon Postgres database connection successful with password: " + maskPassword(password));
                    connectionSuccessful = true;
                    successfulPassword = password;
                    break; // Exit loop once we find a working password
                }
                
            } catch (Exception e) {
                long responseTime = System.currentTimeMillis() - startTime;
                System.out.println("⏱️  Database connection test with password '" + maskPassword(password) + "' failed after " + responseTime + "ms");
                System.out.println("❌ Database connection failed: " + e.getMessage());
            }
            
            System.out.println(); // Add blank line between tests
        }
        
        if (connectionSuccessful) {
            System.out.println("🎉 Found working password: " + successfulPassword);
        } else {
            System.out.println("❌ None of the tested password variations worked. Please verify your credentials.");
            fail("No working database credentials found from the tested variations");
        }
    }
    
    private String maskPassword(String password) {
        if (password == null || password.length() <= 2) {
            return password;
        }
        return password.substring(0, 2) + "***" + password.substring(Math.max(0, password.length() - 2));
    }
}