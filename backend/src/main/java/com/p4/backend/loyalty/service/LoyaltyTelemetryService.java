package com.p4.backend.loyalty.service;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.MeterRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.HashMap;
import java.util.Map;

@Service
public class LoyaltyTelemetryService {
    private static final Logger log = LoggerFactory.getLogger(LoyaltyTelemetryService.class);

    private final MeterRegistry meterRegistry;
    
    public LoyaltyTelemetryService(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    private Counter pointsEarnedCounter;
    private Counter pointsBurnedCounter;
    private Counter pointsExpiredCounter;
    private Counter loyaltyTierChangesCounter;
    private Counter loyaltyErrorsCounter;

    // Metrics for earn/burn ratio and breakage
    private Map<String, AtomicInteger> pointsEarnedByAccount;
    private Map<String, AtomicInteger> pointsBurnedByAccount;
    private Map<String, AtomicInteger> pointsExpiredByAccount;

    @PostConstruct
    public void init() {
        this.pointsEarnedCounter = Counter.builder("loyalty.points.earned")
                .description("Number of loyalty points earned")
                .register(meterRegistry);

        this.pointsBurnedCounter = Counter.builder("loyalty.points.burned")
                .description("Number of loyalty points burned/redeemed")
                .register(meterRegistry);

        this.pointsExpiredCounter = Counter.builder("loyalty.points.expired")
                .description("Number of loyalty points expired")
                .register(meterRegistry);

        this.loyaltyTierChangesCounter = Counter.builder("loyalty.tier.changes")
                .description("Number of loyalty tier changes")
                .register(meterRegistry);

        this.loyaltyErrorsCounter = Counter.builder("loyalty.errors")
                .description("Number of loyalty-related errors")
                .register(meterRegistry);

        // Initialize maps for account-specific metrics
        this.pointsEarnedByAccount = new HashMap<>();
        this.pointsBurnedByAccount = new HashMap<>();
        this.pointsExpiredByAccount = new HashMap<>();
    }

    public void recordPointsEarned(String accountId, int points) {
        pointsEarnedCounter.increment(points);
        
        // Track points by account for ratio calculations
        pointsEarnedByAccount.computeIfAbsent(accountId, k -> new AtomicInteger(0))
                            .addAndGet(points);
    }

    public void recordPointsBurned(String accountId, int points) {
        pointsBurnedCounter.increment(points);
        
        // Track points by account for ratio calculations
        pointsBurnedByAccount.computeIfAbsent(accountId, k -> new AtomicInteger(0))
                            .addAndGet(points);
    }

    public void recordPointsExpired(String accountId, int points) {
        pointsExpiredCounter.increment(points);
        
        // Track points by account for breakage calculations
        pointsExpiredByAccount.computeIfAbsent(accountId, k -> new AtomicInteger(0))
                            .addAndGet(points);
    }

    public void recordTierChange() {
        loyaltyTierChangesCounter.increment();
    }

    public void recordLoyaltyError() {
        loyaltyErrorsCounter.increment();
    }

    // Calculate and expose earn/burn ratio as a gauge for each account
    public double calculateEarnBurnRatio(String accountId) {
        int earned = pointsEarnedByAccount.getOrDefault(accountId, new AtomicInteger(0)).get();
        int burned = pointsBurnedByAccount.getOrDefault(accountId, new AtomicInteger(0)).get();
        
        if (earned == 0) {
            return 0.0; // No points earned, so ratio is 0
        }
        
        return (double) burned / earned;
    }

    // Calculate and expose breakage rate as a gauge for each account
    public double calculateBreakageRate(String accountId) {
        int earned = pointsEarnedByAccount.getOrDefault(accountId, new AtomicInteger(0)).get();
        int expired = pointsExpiredByAccount.getOrDefault(accountId, new AtomicInteger(0)).get();
        
        if (earned == 0) {
            return 0.0; // No points earned, so breakage rate is 0
        }
        
        return (double) expired / earned;
    }
}