package com.p4.backend.config.security;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Security configuration to allow access to test endpoints in development/testing environments.
 * This configuration is only enabled when app.test-endpoints.enabled property is set to true.
 */
@Configuration
@ConditionalOnProperty(
    name = "app.test-endpoints.enabled",
    havingValue = "true",
    matchIfMissing = false
)
public class TestEndpointsSecurityConfig {

    @Bean
    @Order(1)
    public SecurityFilterChain testEndpointsFilterChain(HttpSecurity http) throws Exception {
        http
            .securityMatcher("/api/test/**")  // Apply this security config only to test endpoints
            .authorizeHttpRequests(authz -> authz.anyRequest().permitAll())  // Allow access to all test endpoints
            .csrf(AbstractHttpConfigurer::disable);  // Disable CSRF for test endpoints
            
        return http.build();
    }
}
