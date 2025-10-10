package com.p4.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class CacheConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CacheHeadersInterceptor());
    }

    public static class CacheHeadersInterceptor implements HandlerInterceptor {

        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
            String requestURI = request.getRequestURI();

            // Public API endpoints that return static or infrequently changing data
            if (requestURI.startsWith("/api/catalog")) {
                // For catalog endpoints, set appropriate cache headers
                if (requestURI.contains("/search") || requestURI.equals("/api/catalog")) {
                    // For search results and catalog browse, cache for a short time (5 minutes)
                    response.setHeader("Cache-Control", "public, max-age=300");
                } else if (requestURI.contains("/facets")) {
                    // For facet data (categories, vendors), cache for medium time (1 hour)
                    response.setHeader("Cache-Control", "public, max-age=3600");
                } else if (requestURI.contains("/{id}") && request.getMethod().equals("GET")) {
                    // For individual product details, cache for a medium time (15 minutes)
                    response.setHeader("Cache-Control", "public, max-age=900");
                }
            }
            // Add cache headers for other endpoints as needed
            else if (requestURI.startsWith("/api/health") || requestURI.startsWith("/actuator")) {
                // For health endpoints, set short cache time to allow for quick updates
                response.setHeader("Cache-Control", "no-cache, must-revalidate");
            }

            // For static resources if needed in the future
            if (requestURI.startsWith("/static") || requestURI.startsWith("/assets")) {
                response.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 24 hours
            }

            return true;
        }
    }
}