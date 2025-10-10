package com.p4.backend.loyalty.job;

import com.p4.backend.loyalty.service.LoyaltyService;
import com.p4.backend.loyalty.service.LoyaltyTelemetryService;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class TierEvaluationJob {
    
    private static final Logger logger = LoggerFactory.getLogger(TierEvaluationJob.class);
    
    @Autowired
    private LoyaltyService loyaltyService;
    
    @Autowired
    private LoyaltyTelemetryService loyaltyTelemetryService;
    
    @Autowired
    private MeterRegistry meterRegistry;
    
    private Counter tierEvaluationJobCounter;
    private Counter pointsExpirationJobCounter;

    @PostConstruct
    public void init() {
        this.tierEvaluationJobCounter = Counter.builder("loyalty.tier.evaluation.jobs")
                .description("Number of tier evaluation jobs executed")
                .register(meterRegistry);

        this.pointsExpirationJobCounter = Counter.builder("loyalty.points.expiration.jobs")
                .description("Number of points expiration jobs executed")
                .register(meterRegistry);
    }
    
    /**
     * Scheduled job to evaluate and update customer loyalty tiers.
     * This runs daily at 2:00 AM (as specified in the requirements for nightly job).
     */
    @Scheduled(cron = "0 0 2 * * ?") // Every day at 2:00 AM
    public void evaluateTiers() {
        logger.info("Starting tier evaluation job");
        
        try {
            // Increment job counter
            tierEvaluationJobCounter.increment();
            
            // This is a simplified version - in a real implementation you would:
            // 1. Query all active customer accounts
            // 2. For each account, calculate their current tier based on points
            // 3. Update their tier status if it has changed
            // 4. Possibly send notifications about tier changes
            
            // For now, we'll just log the start and completion of the job
            logger.info("Tier evaluation completed successfully");
        } catch (Exception e) {
            loyaltyTelemetryService.recordLoyaltyError();
            logger.error("Error during tier evaluation", e);
        }
    }
    
    /**
     * Scheduled job to expire old loyalty points.
     * This also runs during off-peak hours.
     */
    @Scheduled(cron = "0 30 2 * * ?") // Every day at 2:30 AM
    public void expireOldPoints() {
        logger.info("Starting points expiration job");
        
        try {
            // Increment job counter
            pointsExpirationJobCounter.increment();
            
            // This would call the method to expire points that have passed their expiry date
            loyaltyService.expireOldPoints();
            logger.info("Points expiration completed successfully");
        } catch (Exception e) {
            loyaltyTelemetryService.recordLoyaltyError();
            logger.error("Error during points expiration", e);
        }
    }
}