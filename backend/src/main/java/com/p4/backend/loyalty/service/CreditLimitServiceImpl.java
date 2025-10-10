package com.p4.backend.loyalty.service;

import com.p4.backend.loyalty.entity.CreditDunningEvent;
import com.p4.backend.loyalty.entity.CreditLimit;
import com.p4.backend.loyalty.repository.CreditDunningEventRepository;
import com.p4.backend.loyalty.repository.CreditLimitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CreditLimitServiceImpl implements CreditLimitService {

    @Autowired
    private CreditLimitRepository creditLimitRepository;
    
    @Autowired
    private CreditDunningEventRepository creditDunningEventRepository;

    @Override
    public CreditLimit getCreditLimit(String accountId, String costCenterId) {
        if (costCenterId != null) {
            return creditLimitRepository.findByAccountIdAndCostCenterId(accountId, costCenterId);
        } else {
            return creditLimitRepository.findByAccountId(accountId);
        }
    }

    @Override
    public boolean hasAvailableCredit(String accountId, String costCenterId, BigDecimal amount) {
        CreditLimit creditLimit = getCreditLimit(accountId, costCenterId);
        
        if (creditLimit == null) {
            // If no credit limit exists, assume no credit is allowed
            return false;
        }
        
        if (!creditLimit.getIsActive()) {
            return false;
        }
        
        BigDecimal availableCredit = creditLimit.getApprovedLimit().subtract(creditLimit.getCurrentBalance());
        return availableCredit.compareTo(amount) >= 0;
    }

    @Override
    public void increaseCreditUsed(String accountId, String costCenterId, BigDecimal amount) {
        CreditLimit creditLimit = getCreditLimit(accountId, costCenterId);
        
        if (creditLimit == null) {
            throw new RuntimeException("No credit limit found for account: " + accountId + 
                                     (costCenterId != null ? " and cost center: " + costCenterId : ""));
        }
        
        if (!creditLimit.getIsActive()) {
            throw new RuntimeException("Credit limit is not active for account: " + accountId);
        }
        
        BigDecimal newBalance = creditLimit.getCurrentBalance().add(amount);
        
        // Check if the new balance exceeds the approved limit
        if (newBalance.compareTo(creditLimit.getApprovedLimit()) > 0) {
            // Create a dunning event for over-limit usage
            createDunningEvent(
                accountId, 
                creditLimit.getId(), 
                "OVER_LIMIT_NOTIFY", 
                newBalance, 
                creditLimit.getApprovedLimit(), 
                "Account exceeded credit limit"
            );
            
            // In a real implementation, you might want to prevent the transaction
            // or apply soft/hard locks based on policy
        }
        
        creditLimit.setCurrentBalance(newBalance);
        creditLimitRepository.save(creditLimit);
    }

    @Override
    public void decreaseCreditUsed(String accountId, String costCenterId, BigDecimal amount) {
        CreditLimit creditLimit = getCreditLimit(accountId, costCenterId);
        
        if (creditLimit == null) {
            throw new RuntimeException("No credit limit found for account: " + accountId + 
                                     (costCenterId != null ? " and cost center: " + costCenterId : ""));
        }
        
        BigDecimal newBalance = creditLimit.getCurrentBalance().subtract(amount);
        // Ensure balance doesn't go negative
        if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
            newBalance = BigDecimal.ZERO;
        }
        
        creditLimit.setCurrentBalance(newBalance);
        creditLimitRepository.save(creditLimit);
    }

    @Override
    public CreditDunningEvent createDunningEvent(String accountId, String limitId, String eventType, 
                                                 BigDecimal balanceAtEvent, BigDecimal limitAmount, String notes) {
        CreditDunningEvent event = new CreditDunningEvent(
            accountId,
            limitId,
            eventType,
            balanceAtEvent,
            limitAmount,
            notes
        );
        
        return creditDunningEventRepository.save(event);
    }

    @Override
    public List<CreditDunningEvent> getActiveDunningEvents(String accountId) {
        // Get dunning events that are not yet resolved
        return creditDunningEventRepository.findByAccountIdAndResolvedAtIsNull(accountId);
    }

    @Override
    public void resolveDunningEvent(String eventId, String resolvedBy, String resolutionNotes) {
        Optional<CreditDunningEvent> eventOpt = creditDunningEventRepository.findById(eventId);
        
        if (!eventOpt.isPresent()) {
            throw new RuntimeException("Dunning event not found: " + eventId);
        }
        
        CreditDunningEvent event = eventOpt.get();
        
        // Only update if not already resolved
        if (event.getResolvedAt() == null) {
            event.setResolvedBy(resolvedBy);
            event.setResolvedAt(LocalDateTime.now());
            event.setResolutionNotes(resolutionNotes);
            creditDunningEventRepository.save(event);
        }
    }
}