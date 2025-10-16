package com.p4.backend.shared.kernel;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.p4.backend.util.IULIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuditService {
    
    @Autowired
    private AuditLogRepository auditLogRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private IULIDGenerator ulidGenerator;
    
    /**
     * Creates an audit log entry for an entity operation
     */
    public void logEntityChange(String userId, String action, String entityName, String entityId,
                                Map<String, Object> beforeValues, Map<String, Object> afterValues) {
        logEntityChange(userId, action, entityName, entityId, beforeValues, afterValues, new HashMap<>());
    }
    
    /**
     * Creates an audit log entry for an entity operation with custom metadata
     */
    public void logEntityChange(String userId, String action, String entityName, String entityId,
                                Map<String, Object> beforeValues, Map<String, Object> afterValues,
                                Map<String, Object> metadata) {
        try {
            // Create the audit log entry
            String id = ulidGenerator.generateULID();
            
            AuditLog auditLog = new AuditLog(
                id, 
                userId, 
                action, 
                entityName,  // resourceType
                entityId,    // resourceId
                entityId,    // entityId
                entityName,  // entityType
                beforeValues, 
                afterValues, 
                metadata
            );
            
            // Save the audit log
            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            // Log the error but don't let it break the main operation
            System.err.println("Failed to create audit log: " + e.getMessage());
        }
    }
    
    /**
     * Log an entity creation
     */
    public void logEntityCreation(String userId, String entityName, String entityId, Map<String, Object> newValues) {
        logEntityChange(userId, "CREATE", entityName, entityId, null, newValues);
    }
    
    /**
     * Log an entity update
     */
    public void logEntityUpdate(String userId, String entityName, String entityId, 
                                Map<String, Object> oldValues, Map<String, Object> newValues) {
        logEntityChange(userId, "UPDATE", entityName, entityId, oldValues, newValues);
    }
    
    /**
     * Log an entity deletion
     */
    public void logEntityDeletion(String userId, String entityName, String entityId, Map<String, Object> oldValues) {
        logEntityChange(userId, "DELETE", entityName, entityId, oldValues, null);
    }
    
    /**
     * Log a custom action on an entity
     */
    public void logCustomAction(String userId, String action, String entityName, String entityId, 
                                Map<String, Object> beforeValues, Map<String, Object> afterValues,
                                Map<String, Object> metadata) {
        logEntityChange(userId, action, entityName, entityId, beforeValues, afterValues, metadata);
    }
    
    /**
     * Convert an object to a map representation for audit logging
     */
    public Map<String, Object> objectToMap(Object obj) {
        if (obj == null) {
            return null;
        }
        
        try {
            String json = objectMapper.writeValueAsString(obj);
            return objectMapper.readValue(json, Map.class);
        } catch (JsonProcessingException e) {
            System.err.println("Failed to convert object to map for audit: " + e.getMessage());
            Map<String, Object> result = new HashMap<>();
            result.put("error", "Could not serialize object");
            result.put("objectToString", obj.toString());
            return result;
        }
    }
}