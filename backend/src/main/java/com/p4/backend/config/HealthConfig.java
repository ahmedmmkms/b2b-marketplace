package com.p4.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.context.annotation.Bean;

@Configuration
public class HealthConfig {
    
    @Bean
    public HealthIndicator readinessHealthIndicator() {
        return () -> Health.up()
                .withDetail("status", "Application is ready")
                .build();
    }
}