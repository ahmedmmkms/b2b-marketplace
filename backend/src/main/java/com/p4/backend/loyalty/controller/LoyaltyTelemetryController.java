package com.p4.backend.loyalty.controller;

import com.p4.backend.loyalty.service.LoyaltyTelemetryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/loyalty/telemetry")
public class LoyaltyTelemetryController {
    
    @Autowired
    private LoyaltyTelemetryService telemetryService;
    
    // Get earn/burn ratio for a specific account
    @GetMapping("/ratio/{accountId}")
    public ResponseEntity<Double> getEarnBurnRatio(@PathVariable String accountId) {
        double ratio = telemetryService.calculateEarnBurnRatio(accountId);
        return ResponseEntity.ok(ratio);
    }
    
    // Get breakage rate for a specific account
    @GetMapping("/breakage/{accountId}")
    public ResponseEntity<Double> getBreakageRate(@PathVariable String accountId) {
        double breakageRate = telemetryService.calculateBreakageRate(accountId);
        return ResponseEntity.ok(breakageRate);
    }
}