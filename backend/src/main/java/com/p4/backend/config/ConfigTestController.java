package com.p4.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Test controller to verify configuration properties are loaded correctly.
 * This controller should only be enabled in non-production environments for testing purposes.
 */
@RestController
@RequestMapping("/test/config")
public class ConfigTestController {

    @Autowired
    private B2ConfigurationProperties b2Config;

    @Autowired
    private RedisConfigurationProperties redisConfig;

    @Autowired
    private DatabaseConfigurationProperties dbConfig;

    @Autowired
    private FeatureFlagsConfiguration featureFlagsConfig;

    @GetMapping("/b2")
    public B2ConfigurationProperties getB2Config() {
        return b2Config;
    }

    @GetMapping("/redis")
    public RedisConfigurationProperties getRedisConfig() {
        return redisConfig;
    }

    @GetMapping("/database")
    public DatabaseConfigurationProperties getDbConfig() {
        return dbConfig;
    }

    @GetMapping("/feature-flags")
    public FeatureFlagsConfiguration getFeatureFlagsConfig() {
        return featureFlagsConfig;
    }

    @GetMapping("/all")
    public ConfigBundle getAllConfig() {
        return new ConfigBundle(b2Config, redisConfig, dbConfig, featureFlagsConfig);
    }

    public static class ConfigBundle {
        private final B2ConfigurationProperties b2Config;
        private final RedisConfigurationProperties redisConfig;
        private final DatabaseConfigurationProperties dbConfig;
        private final FeatureFlagsConfiguration featureFlagsConfig;

        public ConfigBundle(B2ConfigurationProperties b2Config, 
                           RedisConfigurationProperties redisConfig,
                           DatabaseConfigurationProperties dbConfig,
                           FeatureFlagsConfiguration featureFlagsConfig) {
            this.b2Config = b2Config;
            this.redisConfig = redisConfig;
            this.dbConfig = dbConfig;
            this.featureFlagsConfig = featureFlagsConfig;
        }

        public B2ConfigurationProperties getB2Config() {
            return b2Config;
        }

        public RedisConfigurationProperties getRedisConfig() {
            return redisConfig;
        }

        public DatabaseConfigurationProperties getDbConfig() {
            return dbConfig;
        }

        public FeatureFlagsConfiguration getFeatureFlagsConfig() {
            return featureFlagsConfig;
        }
    }
}