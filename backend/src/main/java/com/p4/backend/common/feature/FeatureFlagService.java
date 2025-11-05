package com.p4.backend.common.feature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FeatureFlagService {
    
    @Autowired
    private FeatureFlagRepository featureFlagRepository;
    
    public boolean isFeatureEnabled(String flagKey, boolean defaultValue) {
        Optional<FeatureFlag> flagOpt = featureFlagRepository.findById(flagKey);
        if (flagOpt.isPresent()) {
            Object value = flagOpt.get().getValue();
            if (value instanceof Boolean) {
                return (Boolean) value;
            } else if (value instanceof String) {
                return "true".equalsIgnoreCase((String) value);
            }
        }
        return defaultValue;
    }
    
    public boolean isCatalogPublicBrowseEnabled() {
        return isFeatureEnabled("catalog.publicBrowse", true);
    }
    
    public boolean isSearchEnabled() {
        return isFeatureEnabled("search.enabled", true);
    }
    
    public boolean isRfqEnabled() {
        return isFeatureEnabled("rfq.enabled", false);
    }
    
    public boolean isQuoteVendorConsoleEnabled() {
        return isFeatureEnabled("quote.vendorConsole", false);
    }
}