package com.p4.backend.loyalty.controller;

import com.p4.backend.loyalty.entity.CreditDunningEvent;
import com.p4.backend.loyalty.entity.CreditLimit;
import com.p4.backend.loyalty.service.CreditLimitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/credit")
public class CreditLimitController {
    
    @Autowired
    private CreditLimitService creditLimitService;
    
    // Get credit limit for an account
    @GetMapping("/limit/{accountId}")
    public ResponseEntity<CreditLimit> getCreditLimit(
            @PathVariable String accountId,
            @RequestParam(required = false) String costCenterId) {
        
        CreditLimit limit = creditLimitService.getCreditLimit(accountId, costCenterId);
        return ResponseEntity.ok(limit);
    }
    
    // Check if an account has available credit
    @GetMapping("/available/{accountId}")
    public ResponseEntity<Boolean> hasAvailableCredit(
            @PathVariable String accountId,
            @RequestParam(required = false) String costCenterId,
            @RequestParam BigDecimal amount) {
        
        boolean hasCredit = creditLimitService.hasAvailableCredit(accountId, costCenterId, amount);
        return ResponseEntity.ok(hasCredit);
    }
    
    // Increase credit used (typically called when placing an order)
    @PostMapping("/increase-used")
    public ResponseEntity<Void> increaseCreditUsed(
            @RequestParam String accountId,
            @RequestParam(required = false) String costCenterId,
            @RequestParam BigDecimal amount) {
        
        creditLimitService.increaseCreditUsed(accountId, costCenterId, amount);
        return ResponseEntity.ok().build();
    }
    
    // Decrease credit used (typically called when payment is received)
    @PostMapping("/decrease-used")
    public ResponseEntity<Void> decreaseCreditUsed(
            @RequestParam String accountId,
            @RequestParam(required = false) String costCenterId,
            @RequestParam BigDecimal amount) {
        
        creditLimitService.decreaseCreditUsed(accountId, costCenterId, amount);
        return ResponseEntity.ok().build();
    }
    
    // Get active dunning events for an account
    @GetMapping("/dunning-events/{accountId}")
    public ResponseEntity<List<CreditDunningEvent>> getActiveDunningEvents(@PathVariable String accountId) {
        List<CreditDunningEvent> events = creditLimitService.getActiveDunningEvents(accountId);
        return ResponseEntity.ok(events);
    }
    
    // Resolve a dunning event
    @PostMapping("/resolve-dunning/{eventId}")
    public ResponseEntity<Void> resolveDunningEvent(
            @PathVariable String eventId,
            @RequestParam String resolvedBy,
            @RequestParam String resolutionNotes) {
        
        creditLimitService.resolveDunningEvent(eventId, resolvedBy, resolutionNotes);
        return ResponseEntity.ok().build();
    }
}