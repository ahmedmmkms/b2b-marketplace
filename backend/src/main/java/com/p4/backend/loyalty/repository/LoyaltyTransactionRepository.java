package com.p4.backend.loyalty.repository;

import com.p4.backend.loyalty.entity.LoyaltyTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoyaltyTransactionRepository extends JpaRepository<LoyaltyTransaction, String> {
    List<LoyaltyTransaction> findByAccountId(String accountId);
    List<LoyaltyTransaction> findByAccountIdAndTransactionType(String accountId, String transactionType);
    List<LoyaltyTransaction> findByProgramId(String programId);
    List<LoyaltyTransaction> findByExpiryDateBefore(java.time.LocalDate date);
}