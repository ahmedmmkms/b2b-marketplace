package com.p4.backend.ops.service;

import com.p4.backend.ops.entity.AuditLog;
import com.p4.backend.ops.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public AuditLog logAction(String userId, String entityType, String entityId, String action, String ipAddress, String userAgent) {
        AuditLog auditLog = new AuditLog(userId, entityType, entityId, action);
        auditLog.setIpAddress(ipAddress);
        auditLog.setUserAgent(userAgent);

        return auditLogRepository.save(auditLog);
    }

    public AuditLog logAction(String userId, String entityType, String entityId, String action) {
        return logAction(userId, entityType, entityId, action, null, null);
    }

    public List<AuditLog> getAuditLogsByEntityId(String entityId) {
        return auditLogRepository.findByEntityId(entityId);
    }

    public List<AuditLog> getAuditLogsByEntityType(String entityType) {
        return auditLogRepository.findByEntityType(entityType);
    }

    public List<AuditLog> getAuditLogsByUserId(String userId) {
        return auditLogRepository.findByUserId(userId);
    }

    public List<AuditLog> getAuditLogsByEntityTypeAndEntityId(String entityType, String entityId) {
        return auditLogRepository.findByEntityTypeAndEntityId(entityType, entityId);
    }
}