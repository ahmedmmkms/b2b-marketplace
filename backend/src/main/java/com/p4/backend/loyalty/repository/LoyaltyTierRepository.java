package com.p4.backend.loyalty.repository;

import com.p4.backend.loyalty.entity.LoyaltyTier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoyaltyTierRepository extends JpaRepository<LoyaltyTier, String> {
}