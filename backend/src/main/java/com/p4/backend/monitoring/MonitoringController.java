package com.p4.backend.monitoring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/monitoring")
public class MonitoringController {
    
    @Autowired
    private ErrorBudgetService errorBudgetService;
    
    @GetMapping("/error-budget-status")
    public ResponseEntity<Map<String, Object>> getErrorBudgetStatus() {
        Map<String, Object> response = new HashMap<>();
        
        // Get availability SLO status
        boolean availabilityCompliant = errorBudgetService.isSloCompliant("availability");
        double availabilityBudgetConsumption = errorBudgetService.getErrorBudgetConsumption("availability");
        
        // Get latency SLO status
        boolean latencyCompliant = errorBudgetService.isSloCompliant("latency");
        double latencyBudgetConsumption = errorBudgetService.getErrorBudgetConsumption("latency");
        
        // Get detailed SLO info
        ErrorBudgetService.ServiceLevelObjective availabilitySlo = errorBudgetService.getSloDetails("availability");
        ErrorBudgetService.ServiceLevelObjective latencySlo = errorBudgetService.getSloDetails("latency");
        
        response.put("availability", Map.of(
            "compliant", availabilityCompliant,
            "budgetConsumption", availabilityBudgetConsumption,
            "target", availabilitySlo != null ? availabilitySlo.getTargetPercentage() : 99.9,
            "totalRequests", availabilitySlo != null ? availabilitySlo.getTotalRequests() : 0,
            "errors", availabilitySlo != null ? availabilitySlo.getErrors() : 0,
            "successes", availabilitySlo != null ? availabilitySlo.getSuccesses() : 0
        ));
        
        response.put("latency", Map.of(
            "compliant", latencyCompliant,
            "budgetConsumption", latencyBudgetConsumption,
            "target", latencySlo != null ? latencySlo.getTargetPercentage() : 95.0,
            "totalRequests", latencySlo != null ? latencySlo.getTotalRequests() : 0,
            "errors", latencySlo != null ? latencySlo.getErrors() : 0,
            "successes", latencySlo != null ? latencySlo.getSuccesses() : 0
        ));
        
        // Overall status
        response.put("overallCompliant", availabilityCompliant && latencyCompliant);
        response.put("timestamp", System.currentTimeMillis());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/slo-gates")
    public ResponseEntity<Map<String, Boolean>> getSloGates() {
        Map<String, Boolean> gates = new HashMap<>();
        
        // Check if all SLOs are compliant to allow deployments
        gates.put("availabilityGate", errorBudgetService.isSloCompliant("availability"));
        gates.put("latencyGate", errorBudgetService.isSloCompliant("latency"));
        gates.put("canDeploy", errorBudgetService.isSloCompliant("availability") && 
                               errorBudgetService.isSloCompliant("latency"));
        
        return ResponseEntity.ok(gates);
    }
}