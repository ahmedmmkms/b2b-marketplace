package com.p4.backend.config;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Data
@Validated
@Configuration
@ConfigurationProperties(prefix = "spring.datasource")
public class DatabaseConfigurationProperties {

    @NotBlank
    private String url;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String driverClassName;

    @NotNull
    private Hikari hikari = new Hikari();

    @Data
    public static class Hikari {
        @NotBlank
        private String poolName;

        @Positive
        private int minimumIdle = 5;

        @Positive
        private int maximumPoolSize = 20;

        @Positive
        private long idleTimeout = 300000L;

        @Positive
        private long maxLifetime = 1200000L;

        @Positive
        private long connectionTimeout = 30000L;

        @Positive
        private long leakDetectionThreshold = 60000L;

        @Positive
        private long validationTimeout = 5000L;

        @NotBlank
        private String connectionTestQuery = "SELECT 1";
    }
}