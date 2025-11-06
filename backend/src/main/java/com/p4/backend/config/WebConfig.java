package com.p4.backend.config;

import com.p4.backend.common.logging.RequestLoggingInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.p4.backend.common.feature.FeatureFlagFilter;
import com.p4.backend.common.logging.CorrelationIdFilter;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private FeatureFlagFilter featureFlagFilter;
    
    @Autowired
    private RequestLoggingInterceptor requestLoggingInterceptor;

    @Bean
    public FilterRegistrationBean<FeatureFlagFilter> featureFlagFilterRegistration() {
        FilterRegistrationBean<FeatureFlagFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(featureFlagFilter);
        registration.addUrlPatterns("/products/*"); // Apply to product routes only
        registration.setName("featureFlagFilter");
        registration.setOrder(1); // High precedence to run early
        return registration;
    }

    @Bean
    public FilterRegistrationBean<CorrelationIdFilter> correlationIdFilterRegistration() {
        FilterRegistrationBean<CorrelationIdFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new CorrelationIdFilter());
        registration.addUrlPatterns("/*"); // Apply to all URLs
        registration.setName("correlationIdFilter");
        registration.setOrder(0); // Highest precedence to run first
        return registration;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(requestLoggingInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/actuator/**", "/error"); // Exclude health/actuator endpoints from detailed logging
    }
}