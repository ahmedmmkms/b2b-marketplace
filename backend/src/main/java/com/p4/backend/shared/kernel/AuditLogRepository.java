package com.p4.backend.shared.kernel;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, String> {
    
    Page<AuditLog> findByUserId(String userId, Pageable pageable);
    
    Page<AuditLog> findByAction(String action, Pageable pageable);
    
    Page<AuditLog> findByEntityType(String entityType, Pageable pageable);
    
    Page<AuditLog> findByEntityId(String entityId, Pageable pageable);
    
    @Query("SELECT a FROM AuditLog a WHERE a.entityId = :entityId AND a.entityType = :entityType")
    List<AuditLog> findByEntityIdAndEntityType(@Param("entityId") String entityId, 
                                               @Param("entityType") String entityType);
    
    @Query("SELECT a FROM AuditLog a WHERE a.createdAt BETWEEN :startDate AND :endDate")
    Page<AuditLog> findByCreatedAtBetween(@Param("startDate") LocalDateTime startDate, 
                                          @Param("endDate") LocalDateTime endDate, 
                                          Pageable pageable);
    
    @Query("SELECT a FROM AuditLog a WHERE a.userId = :userId AND a.action = :action")
    Page<AuditLog> findByUserIdAndAction(@Param("userId") String userId, 
                                         @Param("action") String action, 
                                         Pageable pageable);
    
    List<AuditLog> findTop10ByOrderByCreatedAtDesc();
}