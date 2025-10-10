package com.p4.backend.loyalty.repository;

import com.p4.backend.loyalty.entity.LoyaltyProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoyaltyProgramRepository extends JpaRepository<LoyaltyProgram, String> {
}