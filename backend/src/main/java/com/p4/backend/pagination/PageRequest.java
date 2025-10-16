package com.p4.backend.pagination;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import lombok.NoArgsConstructor;

/**
 * Custom PageRequest implementation that supports ULID-based cursor pagination
 */
@NoArgsConstructor
public class PageRequest implements Pageable {
    
    /**
     * The number of elements to skip
     */
    private int offset;
    
    /**
     * The page size
     */
    private int size;
    
    /**
     * The sorting configuration
     */
    private Sort sort;
    
    /**
     * The ULID-based cursor for pagination
     * This will be used as the starting point for the next page
     */
    private String cursor;
    
    /**
     * Direction for pagination (forward or backward)
     */
    private Direction direction;
    
    // Getters
    public int getOffset() {
        return offset;
    }
    
    public int getSize() {
        return size;
    }
    
    public Sort getSort() {
        return sort;
    }
    
    public String getCursor() {
        return cursor;
    }
    
    public Direction getDirection() {
        return direction;
    }
    
    // Setters
    public void setOffset(int offset) {
        this.offset = offset;
    }
    
    public void setSize(int size) {
        this.size = size;
    }
    
    public void setSort(Sort sort) {
        this.sort = sort;
    }
    
    public void setCursor(String cursor) {
        this.cursor = cursor;
    }
    
    public void setDirection(Direction direction) {
        this.direction = direction;
    }
    
    // All-args constructor
    public PageRequest(int offset, int size, Sort sort, String cursor, Direction direction) {
        this.offset = offset;
        this.size = size;
        this.sort = sort;
        this.cursor = cursor;
        this.direction = direction;
    }
    
    public enum Direction {
        FORWARD,  // Next page
        BACKWARD  // Previous page
    }

    public static PageRequest of(int page, int size) {
        return PageRequest.of(page, size, Sort.unsorted());
    }

    public static PageRequest of(int page, int size, Sort sort) {
        return new PageRequest(page * size, size, sort, null, Direction.FORWARD);
    }

    public static PageRequest ofCursor(String cursor, int size) {
        return PageRequest.ofCursor(cursor, size, Sort.unsorted(), Direction.FORWARD);
    }

    public static PageRequest ofCursor(String cursor, int size, Sort sort) {
        return PageRequest.ofCursor(cursor, size, sort, Direction.FORWARD);
    }

    public static PageRequest ofCursor(String cursor, int size, Sort sort, Direction direction) {
        return new PageRequest(0, size, sort, cursor, direction);
    }

    @Override
    public int getPageNumber() {
        return offset / size;
    }

    @Override
    public int getPageSize() {
        return size;
    }

    @Override
    public long getOffset() {
        return offset;
    }

    @Override
    public Sort getSort() {
        return sort;
    }

    @Override
    public Pageable next() {
        return new PageRequest((int) (getOffset() + getPageSize()), getPageSize(), getSort(), cursor, direction);
    }

    @Override
    public Pageable previousOrFirst() {
        int previousPage = Math.max(getPageNumber() - 1, 0);
        return new PageRequest(previousPage * getPageSize(), getPageSize(), getSort(), cursor, direction);
    }

    @Override
    public Pageable first() {
        return new PageRequest(0, getPageSize(), getSort(), null, Direction.FORWARD);
    }

    @Override
    public Pageable withPage(int pageNumber) {
        return new PageRequest(pageNumber * getPageSize(), getPageSize(), getSort(), null, Direction.FORWARD);
    }

    @Override
    public boolean hasPrevious() {
        return getPageNumber() > 0;
    }
}