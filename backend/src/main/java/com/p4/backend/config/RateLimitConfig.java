package com.p4.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;

@Configuration
public class RateLimitConfig implements WebMvcConfigurer {

    // Create a bucket with a capacity of 100 requests per minute
    private final Bucket bucket = Bucket.builder()
            .addLimit(Bandwidth.classic(100, Refill.intervally(100, Duration.ofMinutes(1))))
            .build();

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new RateLimitInterceptor(bucket));
    }

    public static class RateLimitInterceptor implements HandlerInterceptor {
        private final Bucket bucket;

        public RateLimitInterceptor(Bucket bucket) {
            this.bucket = bucket;
        }

        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
            // Allow admin endpoints to bypass rate limiting
            if (request.getRequestURI().contains("/admin")) {
                return true;
            }

            if (bucket.tryConsume(1)) {
                // Add rate limit headers to response
                response.addHeader("X-RateLimit-Remaining", String.valueOf(bucket.getAvailableTokens()));
                response.addHeader("X-RateLimit-Limit", "100");
                response.addHeader("X-RateLimit-Reset", String.valueOf(System.currentTimeMillis() + Duration.ofMinutes(1).toMillis()));
                return true;
            } else {
                response.setStatus(HttpServletResponse.SC_TOO_MANY_REQUESTS);
                response.getWriter().write("{\"error\":\"Rate limit exceeded. Please try again later.\"}");
                return false;
            }
        }
    }

    @Bean
    public Bucket generalBucket() {
        return Bucket.builder()
                .addLimit(Bandwidth.classic(100, Refill.intervally(100, Duration.ofMinutes(1))))
                .build();
    }

    // Specialized bucket for search endpoints - higher rate limit due to frequent use
    @Bean
    public Bucket searchBucket() {
        return Bucket.builder()
                .addLimit(Bandwidth.classic(200, Refill.intervally(200, Duration.ofMinutes(1))))
                .build();
    }

    // Specialized bucket for authentication endpoints - lower rate limit to prevent brute force
    @Bean
    public Bucket authBucket() {
        return Bucket.builder()
                .addLimit(Bandwidth.classic(10, Refill.intervally(10, Duration.ofMinutes(1))))
                .build();
    }
}