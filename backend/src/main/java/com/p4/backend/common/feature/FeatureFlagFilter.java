package com.p4.backend.common.feature;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class FeatureFlagFilter implements Filter {
    
    @Autowired
    private FeatureFlagService featureFlagService;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String requestURI = httpRequest.getRequestURI();
        
        // Check if this is a product-related request that needs feature flag checks
        if (requestURI.startsWith("/products")) {
            // Check catalog.publicBrowse flag for all product routes
            if (!featureFlagService.isCatalogPublicBrowseEnabled()) {
                // Catalog browsing is disabled, return 403 with a friendly message
                httpResponse.setStatus(HttpStatus.FORBIDDEN.value());
                httpResponse.setContentType("application/json");
                
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("type", "https://tools.ietf.org/html/rfc7231#section-6.5.3");
                errorResponse.put("title", "Feature Disabled");
                errorResponse.put("status", 403);
                errorResponse.put("detail", "Catalog browsing is currently disabled");
                
                httpResponse.getWriter().write(objectMapper.writeValueAsString(errorResponse));
                return;
            }
            
            // Check search.enabled flag specifically for GET /products with query params
            if (requestURI.equals("/products") && 
                "GET".equals(httpRequest.getMethod())) {
                String query = httpRequest.getParameter("q");
                String category = httpRequest.getParameter("category");
                
                // If there's a search parameter and search is disabled, return 403
                if ((query != null && !query.trim().isEmpty()) || 
                    (category != null && !category.trim().isEmpty())) {
                    if (!featureFlagService.isSearchEnabled()) {
                        // Search functionality is disabled, return 403
                        httpResponse.setStatus(HttpStatus.FORBIDDEN.value());
                        httpResponse.setContentType("application/json");
                        
                        Map<String, Object> errorResponse = new HashMap<>();
                        errorResponse.put("type", "https://tools.ietf.org/html/rfc7231#section-6.5.3");
                        errorResponse.put("title", "Feature Disabled");
                        errorResponse.put("status", 403);
                        errorResponse.put("detail", "Search functionality is currently disabled");
                        
                        httpResponse.getWriter().write(objectMapper.writeValueAsString(errorResponse));
                        return;
                    }
                }
            }
        }
        
        // Check if this is an RFQ-related request that needs feature flag checks
        if (requestURI.startsWith("/rfqs")) {
            // First, check if RFQ functionality is enabled at all
            if (!featureFlagService.isRfqEnabled()) {
                // If rfq.enabled is false, block all RFQ endpoints
                httpResponse.setStatus(HttpStatus.FORBIDDEN.value());
                httpResponse.setContentType("application/json");
                
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("type", "https://tools.ietf.org/html/rfc7231#section-6.5.3");
                errorResponse.put("title", "Feature Disabled");
                errorResponse.put("status", 403);
                errorResponse.put("detail", "RFQ functionality is currently disabled");
                
                httpResponse.getWriter().write(objectMapper.writeValueAsString(errorResponse));
                return;
            }
            
            // If RFQ is enabled, check if this is a vendor-specific action that requires vendorConsole flag
            if (requestURI.contains("/quotes") && 
                "POST".equals(httpRequest.getMethod()) && 
                !requestURI.contains("/accept")) {  // POST to /rfqs/{id}/quotes (submit quote) - vendor action
                
                // This is quote submission - check for vendor console flag in addition to RFQ being enabled
                if (!featureFlagService.isQuoteVendorConsoleEnabled()) {
                    // Quote vendor console is disabled, return 403 with a friendly message
                    httpResponse.setStatus(HttpStatus.FORBIDDEN.value());
                    httpResponse.setContentType("application/json");
                    
                    Map<String, Object> errorResponse = new HashMap<>();
                    errorResponse.put("type", "https://tools.ietf.org/html/rfc7231#section-6.5.3");
                    errorResponse.put("title", "Feature Disabled");
                    errorResponse.put("status", 403);
                    errorResponse.put("detail", "Quote vendor console is currently disabled");
                    
                    httpResponse.getWriter().write(objectMapper.writeValueAsString(errorResponse));
                    return;
                }
            }
        }
        
        // Continue with the filter chain if all checks pass
        chain.doFilter(request, response);
    }
}