package com.p4.backend.rfq.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class FeatureFlagsConfig {

    @Value("${feature.flags.rfq.enabled:false}")
    private boolean rfqEnabled;

    @Value("${feature.flags.quote.vendorConsole.enabled:false}")
    private boolean vendorConsoleEnabled;

    public boolean isRfqEnabled() {
        return rfqEnabled;
    }

    public boolean isVendorConsoleEnabled() {
        return vendorConsoleEnabled;
    }
}