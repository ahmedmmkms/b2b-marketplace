package com.p4.backend.monitoring;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Tag;
import io.micrometer.core.instrument.Timer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class ErrorBudgetService {
    
    @Autowired
    private MeterRegistry meterRegistry;
    
    // Counters for tracking errors and requests
    private Counter errorCounter;
    private Counter successCounter;
    
    // Map to track service-level objectives
    private final Map<String, ServiceLevelObjective> slos = new ConcurrentHashMap<>();
    
    @PostConstruct
    public void init() {
        errorCounter = Counter.builder("requests.total")
                .description("Total number of requests")
                .tags("status", "error")
                .register(meterRegistry);
                
        successCounter = Counter.builder("requests.total")
                .description("Total number of requests")
                .tags("status", "success")
                .register(meterRegistry);
                
        // Initialize default SLOs
        registerSlo("availability", 99.9, 10000); // 99.9% availability, 10000 requests budget
        registerSlo("latency", 95.0, 10000); // 95% of requests under latency budget, 10000 requests budget
    }
    
    public void registerSlo(String name, double targetPercentage, long budget) {
        slos.put(name, new ServiceLevelObjective(name, targetPercentage, budget));
    }
    
    public void trackError(String sloName, String endpoint) {
        errorCounter.increment(
            Tag.of("slo", sloName),
            Tag.of("endpoint", endpoint)
        );
        
        // Update SLO compliance
        ServiceLevelObjective slo = slos.get(sloName);
        if (slo != null) {
            slo.incrementErrors();
        }
    }
    
    public void trackSuccess(String sloName, String endpoint) {
        successCounter.increment(
            Tag.of("slo", sloName),
            Tag.of("endpoint", endpoint)
        );
        
        // Update SLO compliance
        ServiceLevelObjective slo = slos.get(sloName);
        if (slo != null) {
            slo.incrementSuccesses();
        }
    }
    
    public boolean isSloCompliant(String name) {
        ServiceLevelObjective slo = slos.get(name);
        if (slo == null) {
            return true; // Unknown SLO is considered compliant
        }
        
        return slo.isCompliant();
    }
    
    public double getErrorBudgetConsumption(String name) {
        ServiceLevelObjective slo = slos.get(name);
        if (slo == null) {
            return 0.0; // Unknown SLO has 0% error budget consumption
        }
        
        return slo.getErrorBudgetConsumption();
    }
    
    public void resetSlo(String name) {
        ServiceLevelObjective slo = slos.get(name);
        if (slo != null) {
            slo.reset();
        }
    }
    
    // Inner class to represent an SLO
    private static class ServiceLevelObjective {
        private final String name;
        private final double targetPercentage;
        private final long budget;
        private long errors;
        private long successes;
        
        public ServiceLevelObjective(String name, double targetPercentage, long budget) {
            this.name = name;
            this.targetPercentage = targetPercentage;
            this.budget = budget;
            this.errors = 0;
            this.successes = 0;
        }
        
        public synchronized void incrementErrors() {
            errors++;
        }
        
        public synchronized void incrementSuccesses() {
            successes++;
        }
        
        public boolean isCompliant() {
            long total = errors + successes;
            if (total == 0) {
                return true; // No requests yet, so compliant
            }
            
            double successRate = (double) successes / total * 100;
            return successRate >= targetPercentage;
        }
        
        public double getErrorBudgetConsumption() {
            long total = errors + successes;
            if (total == 0) {
                return 0.0; // No requests yet
            }
            
            // Calculate error rate
            double errorRate = (double) errors / total * 100;
            
            // Calculate how much of the allowed error budget is consumed
            // If target is 99.9% success, then 0.1% errors are allowed
            double allowedErrorRate = 100.0 - targetPercentage;
            
            // If allowed error rate is 0 (100% target), avoid division by zero
            if (allowedErrorRate <= 0) {
                return errors > 0 ? 100.0 : 0.0;
            }
            
            // Calculate percentage of error budget consumed
            return Math.min(errorRate / allowedErrorRate * 100, 100.0);
        }
        
        public synchronized void reset() {
            errors = 0;
            successes = 0;
        }
        
        public String getName() {
            return name;
        }
        
        public double getTargetPercentage() {
            return targetPercentage;
        }
        
        public long getBudget() {
            return budget;
        }
        
        public long getErrors() {
            return errors;
        }
        
        public long getSuccesses() {
            return successes;
        }
        
        public long getTotalRequests() {
            return errors + successes;
        }
    }
    
    // Get SLO details for monitoring dashboards
    public ServiceLevelObjective getSloDetails(String name) {
        return slos.get(name);
    }
}