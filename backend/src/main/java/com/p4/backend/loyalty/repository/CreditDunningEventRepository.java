package com.p4.backend.loyalty.repository;

import com.p4.backend.loyalty.entity.CreditDunningEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditDunningEventRepository extends JpaRepository<CreditDunningEvent, String> {
    List<CreditDunningEvent> findByAccountId(String accountId);
    List<CreditDunningEvent> findByLimitId(String limitId);
    List<CreditDunningEvent> findByAccountIdAndResolvedAtIsNull(String accountId);
}