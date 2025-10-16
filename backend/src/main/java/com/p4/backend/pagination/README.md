# ULID-based Cursor Pagination

This module provides utilities for implementing ULID-based cursor pagination in the P4 B2B Marketplace backend.

## Overview

Traditional offset-based pagination has performance issues with large datasets because the database has to count rows up to the offset position. Keyset (cursor-based) pagination provides better performance by using a unique key or set of keys to determine the starting point for the next/previous page.

ULIDs (Universally Unique Lexically Sortable Identifiers) are ideal for cursor-based pagination because:
- They are 26-character identifiers that are unique
- They are lexicographically sortable (time-based ordering)
- They are URL-safe
- They prevent information leakage (unlike auto-incrementing IDs)

## Components

### PageRequest
Custom implementation of Spring's Pageable interface that supports ULID-based cursor pagination:

- `offset`: Number of elements to skip (for compatibility)
- `size`: Page size
- `sort`: Sorting configuration
- `cursor`: ULID-based cursor for pagination
- `direction`: FORWARD (next page) or BACKWARD (previous page)

### PageImpl
Custom Page implementation implementing Spring's Page interface with ULID-based metadata:

- `content`: The actual data for the current page
- `pageRequest`: The request used to retrieve this page
- `firstId`: ULID of the first element in the page
- `lastId`: ULID of the last element in the page
- Standard pagination metadata (hasNext, hasPrevious, etc.)

### ULIDCursorPaginationUtil
Utility class with methods for:

- Validating ULID cursors
- Building SQL queries with pagination conditions
- Handling forward and backward pagination
- Managing page size calculations

### ULIDPaginationService
Service class demonstrating how to use the pagination utilities with a data source.

### ULIDPaginationController
Example controller showing how to implement pagination endpoints.

## Usage

### Forward Pagination (Next Page)
```java
// Get first page
PageImpl<Item> firstPage = paginationService.getPaginatedResults(
    "SELECT * FROM items",
    "id", 
    null,  // No cursor for first page
    PageRequest.Direction.FORWARD,
    10      // Page size
);

// Get next page using the lastId from the current page
PageImpl<Item> nextPage = paginationService.getPaginatedResults(
    "SELECT * FROM items",
    "id",
    firstPage.getLastId(),  // Use lastId as cursor
    PageRequest.Direction.FORWARD,
    10
);
```

### Backward Pagination (Previous Page)
```java
// Get previous page (if available)
if (currentPage.isHasPrevious()) {
    PageImpl<Item> previousPage = paginationService.getPaginatedResults(
        "SELECT * FROM items",
        "id",
        currentPage.getFirstId(),  // Use firstId for backward navigation
        PageRequest.Direction.BACKWARD,
        10
    );
}
```

## API Endpoint Example

The example controller provides an endpoint at `/api/pagination-demo/paginated` with these parameters:

- `size` (optional, default: 10): Number of items per page
- `cursor` (optional): ULID cursor for pagination
- `direction` (optional, default: FORWARD): FORWARD or BACKWARD

## Testing

Unit tests for the pagination utilities can be found in `src/test/java/com/p4/backend/pagination/`.

A production acceptance test script is available at the root of the repository: `test_ulid_pagination.py`.

## Benefits

- Better performance for large datasets compared to offset-based pagination
- Consistent results even when data is modified during pagination
- Supports bidirectional navigation (forward and backward)
- Time-based ordering of results (newest items first if sorted by ULID desc)