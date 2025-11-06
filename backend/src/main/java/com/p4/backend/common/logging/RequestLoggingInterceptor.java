package com.p4.backend.common.logging;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RequestLoggingInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(RequestLoggingInterceptor.class);
    
    private final MeterRegistry meterRegistry;
    
    private final Counter successCounter;
    private final Counter errorCounter;
    private final Timer requestTimer;

    @Autowired
    public RequestLoggingInterceptor(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        
        // Create metrics
        this.successCounter = Counter.builder("http_requests_total")
                .description("Total number of successful HTTP requests")
                .tag("status", "success")
                .register(meterRegistry);
                
        this.errorCounter = Counter.builder("http_requests_total")
                .description("Total number of failed HTTP requests")
                .tag("status", "error")
                .register(meterRegistry);
                
        this.requestTimer = Timer.builder("http_request_duration_seconds")
                .description("HTTP request duration in seconds")
                .register(meterRegistry);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Add request start time to request attributes for later use
        request.setAttribute("requestStartTime", System.currentTimeMillis());
        
        // Log the incoming request
        logger.info("Incoming request: {} {} from {}", 
                   request.getMethod(), 
                   request.getRequestURI(), 
                   request.getRemoteAddr());
        
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        Long startTime = (Long) request.getAttribute("requestStartTime");
        long duration = startTime != null ? System.currentTimeMillis() - startTime : 0;
        
        // Record the timer metric
        requestTimer.record(duration, java.util.concurrent.TimeUnit.MILLISECONDS);
        
        // Log the completed request with timing
        String correlationId = MDC.get("correlationId");
        logger.info("Request completed: {} {} - Status: {} - Duration: {}ms - Correlation-ID: {}", 
                   request.getMethod(), 
                   request.getRequestURI(), 
                   response.getStatus(),
                   duration,
                   correlationId != null ? correlationId : "N/A");
        
        // Update counters based on response status
        if (response.getStatus() >= 200 && response.getStatus() < 400) {
            successCounter.increment();
        } else {
            errorCounter.increment();
        }
    }
}