package com.p4.backend.loyalty.repository;

import com.p4.backend.loyalty.entity.LoyaltyReward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoyaltyRewardRepository extends JpaRepository<LoyaltyReward, String> {
    List<LoyaltyReward> findByIsActiveTrue();
    List<LoyaltyReward> findByRewardType(String rewardType);
    List<LoyaltyReward> findByIsActiveTrueAndAvailableFromBeforeAndAvailableUntilAfter(
            java.time.LocalDate currentDate, java.time.LocalDate currentDate2);
}