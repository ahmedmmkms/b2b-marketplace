package com.p4.backend.pagination;

import com.p4.backend.util.ULIDGeneratorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ULIDCursorPaginationUtilTest {

    @Mock
    private ULIDGeneratorService ulidGeneratorService;

    private ULIDCursorPaginationUtil paginationUtil;

    @BeforeEach
    void setUp() {
        paginationUtil = new ULIDCursorPaginationUtil(ulidGeneratorService);
    }

    @Test
    void testIsValidCursor_ValidULID() {
        // Given
        String validUlid = "01ARZ3NDEKTSV4RRFFQ69G5FAV";
        when(ulidGeneratorService.isValidULID(validUlid)).thenReturn(true);

        // When
        boolean result = paginationUtil.isValidCursor(validUlid);

        // Then
        assertTrue(result);
    }

    @Test
    void testIsValidCursor_InvalidULID() {
        // Given
        String invalidUlid = "INVALID_ULID_123456789";

        // When
        boolean result = paginationUtil.isValidCursor(invalidUlid);

        // Then
        assertFalse(result);
    }

    @Test
    void testIsValidCursor_NullCursor() {
        // When
        boolean result = paginationUtil.isValidCursor(null);

        // Then
        assertFalse(result);
    }

    @Test
    void testNormalizeCursor_ValidULID() {
        // Given
        String validUlid = "01ARZ3NDEKTSV4RRFFQ69G5FAV";
        when(ulidGeneratorService.isValidULID(validUlid)).thenReturn(true);

        // When
        String result = paginationUtil.normalizeCursor(validUlid);

        // Then
        assertEquals(validUlid, result);
    }

    @Test
    void testNormalizeCursor_InvalidULID() {
        // Given
        String invalidUlid = "INVALID_ULID_123456789";
        when(ulidGeneratorService.isValidULID(invalidUlid)).thenReturn(false);

        // When
        String result = paginationUtil.normalizeCursor(invalidUlid);

        // Then
        assertNull(result);
    }

    @Test
    void testCreateForwardPaginationCondition() {
        // Given
        String columnName = "id";
        String cursor = "01ARZ3NDEKTSV4RRFFQ69G5FAV";
        when(ulidGeneratorService.isValidULID(cursor)).thenReturn(true);

        // When
        String result = paginationUtil.createForwardPaginationCondition(columnName, cursor);

        // Then
        assertEquals("id > '01ARZ3NDEKTSV4RRFFQ69G5FAV'", result);
    }

    @Test
    void testCreateBackwardPaginationCondition() {
        // Given
        String columnName = "id";
        String cursor = "01ARZ3NDEKTSV4RRFFQ69G5FAV";
        when(ulidGeneratorService.isValidULID(cursor)).thenReturn(true);

        // When
        String result = paginationUtil.createBackwardPaginationCondition(columnName, cursor);

        // Then
        assertEquals("id < '01ARZ3NDEKTSV4RRFFQ69G5FAV'", result);
    }

    @Test
    void testCreateForwardPaginationCondition_InvalidCursor() {
        // Given
        String columnName = "id";
        String invalidCursor = "INVALID_CURSOR";

        // When/Then
        assertThrows(IllegalArgumentException.class, () -> {
            paginationUtil.createForwardPaginationCondition(columnName, invalidCursor);
        });
    }

    @Test
    void testBuildPaginatedQuery_Forward() {
        // Given
        String baseQuery = "SELECT * FROM products";
        String sortColumn = "id";
        PageRequest.Direction direction = PageRequest.Direction.FORWARD;
        String cursor = "01ARZ3NDEKTSV4RRFFQ69G5FAV";
        int pageSize = 10;
        
        when(ulidGeneratorService.isValidULID(cursor)).thenReturn(true);

        // When
        String result = paginationUtil.buildPaginatedQuery(baseQuery, sortColumn, direction, cursor, pageSize);

        // Then
        String expected = "SELECT * FROM products WHERE id > '01ARZ3NDEKTSV4RRFFQ69G5FAV' ORDER BY id ASC LIMIT 11";
        assertEquals(expected, result);
    }

    @Test
    void testBuildPaginatedQuery_Backward() {
        // Given
        String baseQuery = "SELECT * FROM products";
        String sortColumn = "id";
        PageRequest.Direction direction = PageRequest.Direction.BACKWARD;
        String cursor = "01ARZ3NDEKTSV4RRFFQ69G5FAV";
        int pageSize = 10;
        
        when(ulidGeneratorService.isValidULID(cursor)).thenReturn(true);

        // When
        String result = paginationUtil.buildPaginatedQuery(baseQuery, sortColumn, direction, cursor, pageSize);

        // Then
        String expected = "SELECT * FROM products WHERE id < '01ARZ3NDEKTSV4RRFFQ69G5FAV' ORDER BY id DESC LIMIT 11";
        assertEquals(expected, result);
    }

    @Test
    void testHasNextPage() {
        // When & Then
        assertTrue(paginationUtil.hasNextPage(11, 10));  // More items than page size means next page exists
        assertFalse(paginationUtil.hasNextPage(10, 10)); // Same number of items as page size means no next page
        assertFalse(paginationUtil.hasNextPage(5, 10));  // Fewer items than page size means no next page
    }

    @Test
    void testAdjustItemsList() {
        // Given
        List<String> items = Arrays.asList("item1", "item2", "item3", "item4", "item5", "item6");
        int requestedPageSize = 5;

        // When
        List<String> result = paginationUtil.adjustItemsList(items, requestedPageSize);

        // Then
        assertEquals(5, result.size());
        assertEquals(Arrays.asList("item1", "item2", "item3", "item4", "item5"), result);
    }
}