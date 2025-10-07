package com.p4.backend.ops.repository;

import com.p4.backend.ops.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, String> {
    List<AuditLog> findByEntityId(String entityId);
    List<AuditLog> findByEntityType(String entityType);
    List<AuditLog> findByUserId(String userId);
    List<AuditLog> findByEntityTypeAndEntityId(String entityType, String entityId);
}