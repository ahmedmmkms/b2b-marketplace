package com.p4.backend.shared.kernel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller for audit trail functionality demonstration
 */
@RestController
@RequestMapping("/api/audit")
public class AuditController {

    @Autowired
    private AuditService auditService;

    @Autowired
    private AuditLogRepository auditLogRepository;

    /**
     * Log a custom action for demonstration
     */
    @PostMapping("/log-custom-action")
    public ResponseEntity<String> logCustomAction(
            @RequestParam String userId,
            @RequestParam String action,
            @RequestParam String entityName,
            @RequestParam String entityId,
            @RequestBody(required = false) Map<String, Object> data) {

        Map<String, Object> metadata = new HashMap<>();
        if (data != null) {
            metadata.putAll(data);
        }
        
        // Log the custom action
        auditService.logCustomAction(userId, action, entityName, entityId, null, null, metadata);

        return ResponseEntity.ok("Audit log created successfully");
    }

    /**
     * Get audit logs for an entity
     */
    @GetMapping("/logs/{entityType}/{entityId}")
    public ResponseEntity<List<AuditLog>> getAuditLogs(
            @PathVariable String entityType,
            @PathVariable String entityId) {

        List<AuditLog> logs = auditLogRepository.findByEntityIdAndEntityType(entityId, entityType);
        return ResponseEntity.ok(logs);
    }

    /**
     * Get recent audit logs
     */
    @GetMapping("/recent-logs")
    public ResponseEntity<List<AuditLog>> getRecentLogs() {
        List<AuditLog> logs = auditLogRepository.findTop10ByOrderByCreatedAtDesc();
        return ResponseEntity.ok(logs);
    }
    
    /**
     * Get paginated audit logs for an entity with sorting
     */
    @GetMapping("/logs/{entityType}/{entityId}/paginated")
    public ResponseEntity<Page<AuditLog>> getAuditLogsWithPagination(
            @PathVariable String entityType,
            @PathVariable String entityId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        
        Sort sort = direction.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        
        // Since our repository doesn't have a paginated version of this method,
        // we'll use the non-paginated one and convert to page for now
        // In a real implementation, we'd add a paginated method to the repository
        List<AuditLog> allLogs = auditLogRepository.findByEntityIdAndEntityType(entityId, entityType);
        
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allLogs.size());
        
        List<AuditLog> pagedLogs = allLogs.subList(start, end);
        Page<AuditLog> resultPage = new PageImpl<>(
            pagedLogs, 
            pageable, 
            allLogs.size()
        );
        
        return ResponseEntity.ok(resultPage);
    }
}