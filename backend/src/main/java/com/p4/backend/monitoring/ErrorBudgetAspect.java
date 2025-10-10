package com.p4.backend.monitoring;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMethod;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class ErrorBudgetAspect {
    
    @Autowired
    private ErrorBudgetService errorBudgetService;
    
    @Around("@annotation(org.springframework.web.bind.annotation.RequestMapping) || " +
            "@annotation(org.springframework.web.bind.annotation.GetMapping) || " +
            "@annotation(org.springframework.web.bind.annotation.PostMapping) || " +
            "@annotation(org.springframework.web.bind.annotation.PutMapping) || " +
            "@annotation(org.springframework.web.bind.annotation.DeleteMapping)")
    public Object trackApiCall(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String endpoint = className + "." + methodName;
        
        long startTime = System.currentTimeMillis();
        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - startTime;
            
            // Track success
            errorBudgetService.trackSuccess("availability", endpoint);
            
            // For latency SLO, we might want to track calls that exceed a threshold
            if (duration > 2000) { // More than 2 seconds is considered slow
                errorBudgetService.trackError("latency", endpoint);
            } else {
                errorBudgetService.trackSuccess("latency", endpoint);
            }
            
            return result;
        } catch (Exception e) {
            // Track error
            errorBudgetService.trackError("availability", endpoint);
            errorBudgetService.trackError("latency", endpoint);
            throw e; // Re-throw the exception
        }
    }
    
    // Helper method to get the current request URI
    private String getCurrentRequestUri() {
        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();
                return request.getRequestURI();
            }
        } catch (Exception e) {
            // Ignore if we can't get the request URI
        }
        return "unknown";
    }
}