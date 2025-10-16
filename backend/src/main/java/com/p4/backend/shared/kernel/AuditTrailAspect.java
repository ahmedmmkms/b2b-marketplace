package com.p4.backend.shared.kernel;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Aspect to automatically audit changes to entities that extend Base class
 * This aspect will track creation, updates, and deletion of entities
 */
@Aspect
@Component
public class AuditTrailAspect {

    @Autowired
    private AuditService auditService;

    /**
     * Audit entity creation after successful save
     * This aspect will audit entities after they are saved to DB for the first time
     */
    @AfterReturning(
        pointcut = "execution(* org.springframework.data.jpa.repository.JpaRepository.save(..)) && args(entity, ..)",
        returning = "result"
    )
    public void auditEntityCreation(JoinPoint joinPoint, Object entity, Object result) {
        if (entity instanceof Base) {
            Base baseEntity = (Base) entity;
            
            // Determine if this is a creation or update based on ID presence before save
            // In a real implementation, we might need to track if this is a new entity differently
            // For now, we'll log as update since we can't reliably determine if it's new
            Map<String, Object> objectMap = auditService.objectToMap(result);
            
            // We'd need to implement better tracking of whether this is a creation vs update
            // For now, just logging the save operation
            auditService.logEntityUpdate(
                getCurrentUserId(), 
                entity.getClass().getSimpleName(), 
                baseEntity.getId(), 
                null, 
                objectMap
            );
        }
    }

    /**
     * Additional methods for auditing updates and deletions would go here
     * For entity deletion:
     * - We could use @Before annotation on delete methods
     * - Capture the entity before deletion and log it
     */
    
    // Helper method to get current user ID - would typically come from security context
    private String getCurrentUserId() {
        // In a real implementation, this would extract the user ID from security context
        // For example: return SecurityContextHolder.getContext().getAuthentication().getName();
        return "SYSTEM"; // Placeholder for now
    }
}