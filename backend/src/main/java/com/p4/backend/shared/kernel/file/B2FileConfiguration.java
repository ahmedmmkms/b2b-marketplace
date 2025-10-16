package com.p4.backend.shared.kernel.file;

import com.p4.backend.config.B2ConfigurationProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import jakarta.annotation.PostConstruct;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class B2FileConfiguration {
    // This configuration ensures that B2 credentials are properly configured
    // We don't need to add additional beans since we're using the existing B2ConfigurationProperties
    
    private final B2ConfigurationProperties b2Config;
    
    @PostConstruct
    public void validateConfiguration() {
        if (b2Config.getAccount().getId() == null || b2Config.getAccount().getId().isEmpty()) {
            throw new IllegalStateException("B2 Account ID is not configured");
        }
        if (b2Config.getApplication().getKey().getId() == null || b2Config.getApplication().getKey().getId().isEmpty()) {
            throw new IllegalStateException("B2 Application Key ID is not configured");
        }
        if (b2Config.getSecret().getAccess().getKey() == null || b2Config.getSecret().getAccess().getKey().isEmpty()) {
            throw new IllegalStateException("B2 Application Key is not configured");
        }
        if (b2Config.getBucket().getName() == null || b2Config.getBucket().getName().isEmpty()) {
            throw new IllegalStateException("B2 Bucket Name is not configured");
        }
        if (b2Config.getEndpoint().getUrl() == null || b2Config.getEndpoint().getUrl().isEmpty()) {
            throw new IllegalStateException("B2 Endpoint URL is not configured");
        }
        
        log.info("B2 Configuration validated successfully");
    }
}