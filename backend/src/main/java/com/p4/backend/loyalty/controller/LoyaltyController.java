package com.p4.backend.loyalty.controller;

import com.p4.backend.loyalty.entity.LoyaltyTransaction;
import com.p4.backend.loyalty.service.LoyaltyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loyalty")
public class LoyaltyController {
    
    @Autowired
    private LoyaltyService loyaltyService;
    
    // Endpoint to earn points (typically called internally after an order)
    @PostMapping("/earn-points")
    public ResponseEntity<LoyaltyTransaction> earnPoints(
            @RequestParam String accountId,
            @RequestParam String programId,
            @RequestParam String referenceId,
            @RequestParam String referenceType,
            @RequestParam double amountSpent) {
        
        LoyaltyTransaction transaction = loyaltyService.earnPoints(
            accountId, programId, referenceId, referenceType, amountSpent);
            
        return ResponseEntity.ok(transaction);
    }
    
    // Endpoint to burn points (typically used during checkout)
    @PostMapping("/burn-points")
    public ResponseEntity<LoyaltyTransaction> burnPoints(
            @RequestParam String accountId,
            @RequestParam String programId,
            @RequestParam String referenceId,
            @RequestParam String referenceType,
            @RequestParam int pointsToBurn,
            @RequestParam String description) {
        
        LoyaltyTransaction transaction = loyaltyService.burnPoints(
            accountId, programId, referenceId, referenceType, pointsToBurn, description);
            
        return ResponseEntity.ok(transaction);
    }
    
    // Get loyalty balance for an account
    @GetMapping("/balance/{accountId}")
    public ResponseEntity<Integer> getLoyaltyBalance(@PathVariable String accountId) {
        int balance = loyaltyService.getLoyaltyBalance(accountId);
        return ResponseEntity.ok(balance);
    }
    
    // Get transaction history for an account
    @GetMapping("/history/{accountId}")
    public ResponseEntity<List<LoyaltyTransaction>> getTransactionHistory(@PathVariable String accountId) {
        List<LoyaltyTransaction> history = loyaltyService.getTransactionHistory(accountId);
        return ResponseEntity.ok(history);
    }
    
    // Get current tier for an account
    @GetMapping("/tier/{accountId}")
    public ResponseEntity<String> getCurrentTier(@PathVariable String accountId) {
        String tier = loyaltyService.getCurrentTier(accountId);
        return ResponseEntity.ok(tier);
    }
}