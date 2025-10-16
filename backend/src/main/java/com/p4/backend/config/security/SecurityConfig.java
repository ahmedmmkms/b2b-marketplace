package com.p4.backend.config.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

/**
 * General security configuration for the application.
 * Defines access rules for different endpoints in the application.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${SECURITY_USER_NAME:admin}")
    private String userName;

    @Value("${SECURITY_USER_PASSWORD:}")
    private String password;

    @Value("${SECURITY_USER_ROLES:ACTUATOR,ADMIN}")
    private String roles;

    @Bean
    public InMemoryUserDetailsManager userDetailsService(PasswordEncoder passwordEncoder) {
        // Use password from environment variable, fallback to a default if not set
        String actualPassword = password != null && !password.isEmpty() 
            ? password 
            : generateDefaultPassword();

        // Create user with the configured username and password
        UserDetails user = User.builder()
            .username(userName)
            .password(passwordEncoder.encode(actualPassword))
            .roles(roles.split(",")) // Split roles by comma
            .build();
        
        return new InMemoryUserDetailsManager(user);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Order(Ordered.LOWEST_PRECEDENCE)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/actuator/**").permitAll()  // Allow access to actuator endpoints
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()  // Allow access to API docs
                .anyRequest().authenticated()  // Require authentication for all other requests
            )
            .httpBasic(httpBasic -> httpBasic.realmName("Realm")) // Set realm name for basic auth
            .csrf(AbstractHttpConfigurer::disable);  // Disable CSRF for API endpoints
            
        return http.build();
    }

    /**
     * Generates a default password when SECURITY_USER_PASSWORD is not set.
     * In production, it's essential to set the SECURITY_USER_PASSWORD environment variable.
     */
    private String generateDefaultPassword() {
        // This is just a fallback - in production, SECURITY_USER_PASSWORD should be set
        return "defaultPassword123!"; // A default, but users should set their own
    }
}
