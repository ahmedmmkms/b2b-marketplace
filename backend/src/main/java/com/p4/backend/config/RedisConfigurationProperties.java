package com.p4.backend.config;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Data
@Validated
@Configuration
@ConfigurationProperties(prefix = "spring.redis")
public class RedisConfigurationProperties {

    @NotBlank
    private String host;

    @Positive
    private int port;

    private String password;

    @PositiveOrZero
    private int database = 0;
    
    private int timeout = 2000;  // in milliseconds

    @NotNull
    private Jedis jedis = new Jedis();

    @Data
    public static class Jedis {
        @NotNull
        private Pool pool = new Pool();
    }

    @Data
    public static class Pool {
        @Positive
        private int maxActive = 8;

        @Positive
        private int maxIdle = 8;

        private int minIdle = 0;

        private int maxWait = -1; // -1 means no limit in milliseconds
    }
}