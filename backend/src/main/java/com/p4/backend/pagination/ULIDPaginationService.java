package com.p4.backend.pagination;

import com.p4.backend.util.ULIDGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class demonstrating ULID-based cursor pagination implementation
 * This service would typically contain methods to query data with cursor-based pagination
 */
@Service
@RequiredArgsConstructor
public class ULIDPaginationService {
    
    private final ULIDCursorPaginationUtil paginationUtil;
    private final ULIDGeneratorService ulidGeneratorService;
    
    /**
     * Checks if a cursor is valid
     * 
     * @param cursor The cursor to validate
     * @return true if the cursor is valid, false otherwise
     */
    public boolean isValidCursor(String cursor) {
        return paginationUtil.isValidCursor(cursor);
    }
    
    /**
     * Simulates retrieving a paginated list of items using ULID-based cursor pagination
     * 
     * @param baseQuery The base SQL query to execute
     * @param sortColumn The column to sort by (should be a ULID column)
     * @param cursor The cursor ULID to start from (null for first page)
     * @param direction The pagination direction (forward for next page, backward for previous page)
     * @param pageSize The number of items to return per page
     * @return A Page object containing the results and pagination metadata
     */
    public <T> PageImpl<T> getPaginatedResults(String baseQuery, 
                                              String sortColumn, 
                                              String cursor, 
                                              PageRequest.Direction direction, 
                                              int pageSize) {
        // Validate the cursor if provided
        if (cursor != null && !paginationUtil.isValidCursor(cursor)) {
            throw new IllegalArgumentException("Invalid cursor: " + cursor);
        }
        
        // Build the paginated query
        String query = paginationUtil.buildPaginatedQuery(baseQuery, sortColumn, direction, cursor, pageSize);
        
        // In a real implementation, we would execute the query against the database
        // For demonstration purposes, we'll create mock data
        List<T> results = executeQuery(query);
        
        // Determine if there's a next page (we fetch one more item than requested to check)
        boolean hasNext = paginationUtil.hasNextPage(results.size(), pageSize);
        boolean hasPrevious = cursor != null; // If we have a cursor, we're not on the first page
        
        // Adjust the results list to remove the extra item if present
        List<T> adjustedResults = paginationUtil.adjustItemsList(results, pageSize);
        
        // Create the page request object
        PageRequest pageRequest = PageRequest.ofCursor(cursor, pageSize, null, direction);
        
        // Create and return the Page object
        return PageImpl.of(adjustedResults, pageRequest, adjustedResults.size(), hasNext, hasPrevious);
    }
    
    /**
     * Helper method to simulate query execution
     * In a real implementation, this would execute the actual database query
     */
    @SuppressWarnings("unchecked")
    private <T> List<T> executeQuery(String query) {
        // This is a mock implementation - in reality, this would execute against a database
        // For demonstration purposes, we'll return an empty list
        return (List<T>) java.util.Collections.emptyList();
    }
}