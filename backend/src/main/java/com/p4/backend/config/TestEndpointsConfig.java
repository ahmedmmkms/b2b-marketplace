package com.p4.backend.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * Configuration class to conditionally enable test controllers.
 * These should only be active in development/testing environments.
 */
@Configuration
@ConditionalOnProperty(
    name = "app.test-endpoints.enabled",
    havingValue = "true",
    matchIfMissing = false  // Disabled by default
)
@Import(ConfigTestController.class)
public class TestEndpointsConfig {
    // This configuration enables test endpoints only when property is set to true
}