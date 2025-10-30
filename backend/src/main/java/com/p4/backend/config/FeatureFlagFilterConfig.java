package com.p4.backend.config;

import com.p4.backend.common.feature.FeatureFlagFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeatureFlagFilterConfig {

    @Autowired
    private FeatureFlagFilter featureFlagFilter;

    // The filter will be registered automatically because it's a @Component
}