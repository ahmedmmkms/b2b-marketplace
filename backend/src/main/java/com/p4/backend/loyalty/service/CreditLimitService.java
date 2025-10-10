package com.p4.backend.loyalty.service;

import com.p4.backend.loyalty.entity.CreditDunningEvent;
import com.p4.backend.loyalty.entity.CreditLimit;

import java.math.BigDecimal;
import java.util.List;

public interface CreditLimitService {
    // Get credit limit for an account
    CreditLimit getCreditLimit(String accountId, String costCenterId);
    
    // Check if an account has available credit
    boolean hasAvailableCredit(String accountId, String costCenterId, BigDecimal amount);
    
    // Increase credit used (when placing an order)
    void increaseCreditUsed(String accountId, String costCenterId, BigDecimal amount);
    
    // Decrease credit used (when payment is received)
    void decreaseCreditUsed(String accountId, String costCenterId, BigDecimal amount);
    
    // Create a dunning event
    CreditDunningEvent createDunningEvent(String accountId, String limitId, String eventType, 
                                          BigDecimal balanceAtEvent, BigDecimal limitAmount, String notes);
    
    // Get active dunning events for an account
    List<CreditDunningEvent> getActiveDunningEvents(String accountId);
    
    // Resolve a dunning event
    void resolveDunningEvent(String eventId, String resolvedBy, String resolutionNotes);
}