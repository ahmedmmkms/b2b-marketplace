package com.p4.backend.pagination;

import com.p4.backend.util.ULIDGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Utility class for ULID-based cursor pagination
 * Provides methods to create, validate, and manipulate ULID-based pagination cursors
 */
@Component
@RequiredArgsConstructor
public class ULIDCursorPaginationUtil {
    
    private final ULIDGeneratorService ulidGeneratorService;
    
    /**
     * Validates if the given cursor is a valid ULID
     * 
     * @param cursor The cursor string to validate
     * @return true if the cursor is a valid ULID, false otherwise
     */
    public boolean isValidCursor(String cursor) {
        if (cursor == null) {
            return false;
        }
        
        return ulidGeneratorService.isValidULID(cursor);
    }
    
    /**
     * Normalizes a cursor by validating it and returning the appropriate value
     * 
     * @param cursor The cursor to normalize
     * @return The cursor if valid, null otherwise
     */
    public String normalizeCursor(String cursor) {
        if (isValidCursor(cursor)) {
            return cursor;
        }
        return null;
    }
    
    /**
     * Creates a query condition for forward pagination (items after the cursor)
     * 
     * @param columnName The name of the column to use for comparison
     * @param cursor The cursor ULID to start from
     * @return A SQL WHERE clause condition for forward pagination
     */
    public String createForwardPaginationCondition(String columnName, String cursor) {
        if (!isValidCursor(cursor)) {
            throw new IllegalArgumentException("Invalid cursor: " + cursor);
        }
        
        return String.format("%s > '%s'", columnName, cursor);
    }
    
    /**
     * Creates a query condition for backward pagination (items before the cursor)
     * 
     * @param columnName The name of the column to use for comparison
     * @param cursor The cursor ULID to start from
     * @return A SQL WHERE clause condition for backward pagination
     */
    public String createBackwardPaginationCondition(String columnName, String cursor) {
        if (!isValidCursor(cursor)) {
            throw new IllegalArgumentException("Invalid cursor: " + cursor);
        }
        
        return String.format("%s < '%s'", columnName, cursor);
    }
    
    /**
     * Generates a query with pagination parameters for forward navigation
     * 
     * @param baseQuery The base SQL query without ORDER BY and LIMIT clauses
     * @param sortColumn The column to sort by (must be the ULID column)
     * @param direction Sort direction (ASC for forward, DESC for backward)
     * @param cursor The cursor ULID to start from (null for first page)
     * @param pageSize The number of items per page
     * @return A complete SQL query with pagination parameters
     */
    public String buildPaginatedQuery(String baseQuery, String sortColumn, 
                                     PageRequest.Direction direction, String cursor, int pageSize) {
        StringBuilder queryBuilder = new StringBuilder(baseQuery);
        
        // Add WHERE clause if we have a cursor
        if (cursor != null && isValidCursor(cursor)) {
            queryBuilder.append(" WHERE ");
            
            if (direction == PageRequest.Direction.FORWARD) {
                queryBuilder.append(createForwardPaginationCondition(sortColumn, cursor));
            } else {
                queryBuilder.append(createBackwardPaginationCondition(sortColumn, cursor));
            }
        }
        
        // Add ORDER BY clause
        if (direction == PageRequest.Direction.FORWARD) {
            queryBuilder.append(" ORDER BY ").append(sortColumn).append(" ASC");
        } else {
            // For backward pagination, we need to reverse the sort order
            queryBuilder.append(" ORDER BY ").append(sortColumn).append(" DESC");
        }
        
        // Add LIMIT clause
        queryBuilder.append(" LIMIT ").append(pageSize + 1); // +1 to check if there's a next page
        
        return queryBuilder.toString();
    }
    
    /**
     * Determines if the response contains a next page based on the number of items returned
     * Since we fetch pageSize + 1 items, if we get pageSize + 1 items, there's a next page
     * 
     * @param items The list of items returned from the query
     * @param requestedPageSize The page size that was requested
     * @return true if there are more items available (next page exists), false otherwise
     */
    public boolean hasNextPage(int itemsCount, int requestedPageSize) {
        return itemsCount > requestedPageSize;
    }
    
    /**
     * Adjusts the item list to remove the extra item (if present) that was used to check for next page
     * 
     * @param items The list of items returned from the query
     * @param requestedPageSize The page size that was requested
     * @return The adjusted list with the correct number of items
     */
    public <T> java.util.List<T> adjustItemsList(java.util.List<T> items, int requestedPageSize) {
        if (items.size() > requestedPageSize) {
            // Return all items except the last one (the extra item used to check for next page)
            return items.subList(0, requestedPageSize);
        }
        return items;
    }
}