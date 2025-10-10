package com.p4.backend.loyalty.service;

import com.p4.backend.loyalty.entity.LoyaltyTransaction;

import java.util.List;

public interface LoyaltyService {
    // Earn points functionality
    LoyaltyTransaction earnPoints(String accountId, String programId, String referenceId, 
                                 String referenceType, double amountSpent);
    
    // Burn points functionality
    LoyaltyTransaction burnPoints(String accountId, String programId, String referenceId, 
                                  String referenceType, int pointsToBurn, String description);
    
    // Get loyalty balance for an account
    int getLoyaltyBalance(String accountId);
    
    // Get transaction history for an account
    List<LoyaltyTransaction> getTransactionHistory(String accountId);
    
    // Expire old points
    List<LoyaltyTransaction> expireOldPoints();
    
    // Calculate current tier for an account
    String getCurrentTier(String accountId);
}