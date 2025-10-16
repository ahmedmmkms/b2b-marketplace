package com.p4.backend.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

/**
 * General security configuration for the application.
 * Defines access rules for different endpoints in the application.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/test/**").permitAll()  // Allow access to test endpoints
                .requestMatchers("/actuator/**").permitAll()  // Allow access to actuator endpoints
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()  // Allow access to API docs
                .anyRequest().authenticated()  // Require authentication for all other requests
            )
            .csrf(AbstractHttpConfigurer::disable);  // Disable CSRF for API endpoints
            
        return http.build();
    }
}