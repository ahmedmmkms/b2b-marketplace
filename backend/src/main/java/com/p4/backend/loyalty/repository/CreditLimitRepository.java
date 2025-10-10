package com.p4.backend.loyalty.repository;

import com.p4.backend.loyalty.entity.CreditLimit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditLimitRepository extends JpaRepository<CreditLimit, String> {
    CreditLimit findByAccountId(String accountId);
    CreditLimit findByAccountIdAndCostCenterId(String accountId, String costCenterId);
}