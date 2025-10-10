package com.p4.backend.loyalty.service;

import com.p4.backend.loyalty.entity.*;
import com.p4.backend.loyalty.repository.*;
import com.p4.backend.shared.vo.Money;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LoyaltyServiceImpl implements LoyaltyService {

    @Autowired
    private LoyaltyProgramRepository loyaltyProgramRepository;
    
    @Autowired
    private LoyaltyTransactionRepository loyaltyTransactionRepository;
    
    @Autowired
    private LoyaltyTierRepository loyaltyTierRepository;
    
    @Autowired
    private LoyaltyTelemetryService loyaltyTelemetryService;
    
    @Override
    public LoyaltyTransaction earnPoints(String accountId, String programId, String referenceId, 
                                         String referenceType, double amountSpent) {
        try {
            // Get the loyalty program
            Optional<LoyaltyProgram> programOpt = loyaltyProgramRepository.findById(programId);
            if (!programOpt.isPresent()) {
                throw new RuntimeException("Loyalty program not found: " + programId);
            }
            
            LoyaltyProgram program = programOpt.get();
            
            // Check if the spend amount meets minimum threshold
            if (program.getMinimumSpendThreshold() != null && 
                amountSpent < program.getMinimumSpendThreshold().doubleValue()) {
                // Amount is below minimum threshold, no points earned
                return null;
            }
            
            // Calculate points to earn
            BigDecimal pointsRate = program.getEarnPointsRate();
            BigDecimal spendAmount = BigDecimal.valueOf(amountSpent);
            BigDecimal pointsEarned = spendAmount.multiply(pointsRate);
            
            // Apply maximum points per transaction limit if set
            if (program.getMaximumPointsPerTransaction() != null) {
                int maxPoints = program.getMaximumPointsPerTransaction();
                if (pointsEarned.compareTo(BigDecimal.valueOf(maxPoints)) > 0) {
                    pointsEarned = BigDecimal.valueOf(maxPoints);
                }
            }
            
            int finalPoints = pointsEarned.setScale(0, RoundingMode.DOWN).intValue();
            
            // Calculate expiry date
            LocalDate expiryDate = null;
            if (program.getExpirationDays() != null) {
                expiryDate = LocalDate.now().plusDays(program.getExpirationDays());
            }
            
            // Create the loyalty transaction
            LoyaltyTransaction transaction = new LoyaltyTransaction(
                accountId,
                programId,
                "EARN",
                finalPoints,
                referenceId,
                referenceType,
                expiryDate,
                String.format("Points earned for purchase of $%.2f", amountSpent)
            );
            
            LoyaltyTransaction savedTransaction = loyaltyTransactionRepository.save(transaction);
            
            // Record telemetry
            loyaltyTelemetryService.recordPointsEarned(accountId, finalPoints);
            
            return savedTransaction;
        } catch (Exception e) {
            loyaltyTelemetryService.recordLoyaltyError();
            throw e;
        }
    }
    
    @Override
    public LoyaltyTransaction burnPoints(String accountId, String programId, String referenceId, 
                                         String referenceType, int pointsToBurn, String description) {
        try {
            // Verify the account has enough points
            int currentBalance = getLoyaltyBalance(accountId);
            if (currentBalance < pointsToBurn) {
                throw new RuntimeException("Insufficient loyalty points. Current balance: " + 
                                         currentBalance + ", Requested: " + pointsToBurn);
            }
            
            // Create the loyalty transaction (negative points for burn)
            LoyaltyTransaction transaction = new LoyaltyTransaction(
                accountId,
                programId,
                "BURN",
                -pointsToBurn,  // Negative value for burning points
                referenceId,
                referenceType,
                null,  // No expiry for burned points
                description
            );
            
            LoyaltyTransaction savedTransaction = loyaltyTransactionRepository.save(transaction);
            
            // Record telemetry
            loyaltyTelemetryService.recordPointsBurned(accountId, pointsToBurn);
            
            return savedTransaction;
        } catch (Exception e) {
            loyaltyTelemetryService.recordLoyaltyError();
            throw e;
        }
    }
    
    @Override
    public int getLoyaltyBalance(String accountId) {
        List<LoyaltyTransaction> transactions = loyaltyTransactionRepository.findByAccountId(accountId);
        int balance = 0;
        
        for (LoyaltyTransaction transaction : transactions) {
            // Check if points have expired
            if (transaction.getExpiryDate() != null && 
                transaction.getExpiryDate().isBefore(LocalDate.now())) {
                // Skip expired points
                continue;
            }
            balance += transaction.getPointsAmount();
        }
        
        return Math.max(0, balance);  // Ensure we don't return negative balance
    }
    
    @Override
    public List<LoyaltyTransaction> getTransactionHistory(String accountId) {
        return loyaltyTransactionRepository.findByAccountId(accountId);
    }
    
    @Override
    public List<LoyaltyTransaction> expireOldPoints() {
        LocalDate today = LocalDate.now();
        List<LoyaltyTransaction> expiredTransactions = 
            loyaltyTransactionRepository.findByExpiryDateBefore(today);
        
        // Create expiry transactions for any points that have expired but not yet recorded
        for (LoyaltyTransaction transaction : expiredTransactions) {
            // Check if an expiry transaction already exists for these points
            // (in a real implementation, you'd want to avoid duplicate processing)
            if (!wasAlreadyExpired(transaction)) {
                // Create an expiry transaction
                LoyaltyTransaction expiryTransaction = new LoyaltyTransaction(
                    transaction.getAccountId(),
                    transaction.getProgramId(),
                    "EXPIRE",
                    -transaction.getPointsAmount(),  // Negative to reduce balance
                    transaction.getId(),  // Reference the original transaction
                    "LOYALTY_POINTS",
                    null,  // No expiry for expiry transaction
                    "Points expired on " + today
                );
                
                loyaltyTransactionRepository.save(expiryTransaction);
                
                // Record telemetry for expired points
                loyaltyTelemetryService.recordPointsExpired(transaction.getAccountId(), 
                    Math.abs(transaction.getPointsAmount()));
            }
        }
        
        return expiredTransactions;
    }
    
    /**
     * Check if the points from a transaction have already expired
     * In a real implementation, you'd have a more robust method to track this
     */
    private boolean wasAlreadyExpired(LoyaltyTransaction originalTransaction) {
        // In a more sophisticated implementation, this would check if there's 
        // already an expiry transaction referencing this one
        return false;
    }
    
    @Override
    public String getCurrentTier(String accountId) {
        int balance = getLoyaltyBalance(accountId);
        
        // Find the highest tier the user qualifies for
        List<LoyaltyTier> allTiers = loyaltyTierRepository.findAll();
        String highestTier = "None";  // Default tier if no applicable tiers found
        
        for (LoyaltyTier tier : allTiers) {
            if (Boolean.TRUE.equals(tier.getIsActive()) && 
                balance >= tier.getMinPointsRequired()) {
                if (highestTier.equals("None") || 
                    tier.getMinPointsRequired() > 
                    loyaltyTierRepository.findById(highestTier).get().getMinPointsRequired()) {
                    highestTier = tier.getId();
                }
            }
        }
        
        return highestTier;
    }
}