package com.p4.backend.config;

import com.p4.backend.common.feature.FeatureFlagFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {

    @Autowired
    private FeatureFlagFilter featureFlagFilter;

    @Bean
    public FilterRegistrationBean<FeatureFlagFilter> featureFlagFilterRegistration() {
        FilterRegistrationBean<FeatureFlagFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(featureFlagFilter);
        registration.addUrlPatterns("/products/*"); // Apply to product routes only
        registration.setName("featureFlagFilter");
        registration.setOrder(1); // High precedence to run early
        return registration;
    }
}