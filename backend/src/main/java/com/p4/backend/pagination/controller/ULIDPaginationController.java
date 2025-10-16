package com.p4.backend.pagination.controller;

import com.p4.backend.pagination.PageImpl;
import com.p4.backend.pagination.PageRequest;
import com.p4.backend.pagination.ULIDPaginationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Controller demonstrating ULID-based cursor pagination
 * This controller shows how to implement pagination endpoints using ULID cursors
 */
@RestController
@RequestMapping("/api/pagination-demo")
@RequiredArgsConstructor
public class ULIDPaginationController {
    
    private final ULIDPaginationService ulidPaginationService;
    
    /**
     * Endpoint to get paginated results using ULID-based cursor pagination
     * 
     * @param size Page size (number of items per page)
     * @param cursor ULID cursor for pagination (null for first page)
     * @param direction Direction of pagination (FORWARD for next page, BACKWARD for previous page)
     * @return Paginated results with metadata
     */
    @GetMapping("/paginated")
    public ResponseEntity<PageImpl<Map<String, Object>>> getPaginatedResults(
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String cursor,
            @RequestParam(defaultValue = "FORWARD") PageRequest.Direction direction) {
        
        // Validate page size
        if (size <= 0 || size > 100) {
            return ResponseEntity.badRequest().build();
        }
        
        // Validate cursor if provided
        if (cursor != null && !ulidPaginationService.isValidCursor(cursor)) {
            return ResponseEntity.badRequest().build();
        }
        
        // Get paginated results
        // In a real implementation, we would define the actual query to execute
        // For this demonstration, we'll use a mock query
        String baseQuery = "SELECT id, name, description FROM products";
        String sortColumn = "id";
        
        PageImpl<Map<String, Object>> resultPage = ulidPaginationService.getPaginatedResults(
                baseQuery, sortColumn, cursor, direction, size);
        
        return ResponseEntity.ok(resultPage);
    }
}