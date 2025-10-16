package com.p4.backend.pagination;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Custom Page implementation that supports ULID-based cursor pagination
 */
@NoArgsConstructor
public class PageImpl<T> implements Page<T> {
    
    /**
     * The content of the current page
     */
    private List<T> content;
    
    /**
     * The page request that was used to retrieve this page
     */
    private PageRequest pageRequest;
    
    /**
     * The ULID of the first element in this page (for backward pagination)
     */
    private String firstId;
    
    /**
     * The ULID of the last element in this page (for forward pagination)
     */
    private String lastId;
    
    /**
     * Total number of elements matching the query
     */
    private long totalElements;
    
    /**
     * Total number of pages
     */
    private int totalPages;
    
    /**
     * Size of the page
     */
    private int size;
    
    /**
     * Number of the current page (0-indexed)
     */
    private int number;
    
    /**
     * Whether there is a next page
     */
    private boolean hasNext;
    
    /**
     * Whether there is a previous page
     */
    private boolean hasPrevious;
    
    /**
     * Whether this is the first page
     */
    private boolean first;
    
    /**
     * Whether this is the last page
     */
    private boolean last;
    

    
    /**
     * Creates a new Page with cursor-based pagination parameters
     * 
     * @param content The content of the page
     * @param pageRequest The page request used to retrieve this page
     * @param totalElements Total number of elements matching the query
     * @param hasNext Whether there's a next page
     * @param hasPrevious Whether there's a previous page
     */
    public PageImpl(List<T> content, PageRequest pageRequest, long totalElements, boolean hasNext, boolean hasPrevious) {
        this.content = content;
        this.pageRequest = pageRequest;
        this.totalElements = totalElements;
        this.size = content.size();
        this.number = pageRequest.getPageNumber();
        
        // Calculate other properties
        this.totalPages = (int) Math.ceil((double) totalElements / pageRequest.getPageSize());
        this.first = pageRequest.getPageNumber() == 0;
        this.last = !hasNext; // If there's no next page, this is the last page
        this.hasNext = hasNext;
        this.hasPrevious = hasPrevious;
        
        // Set first and last IDs from content if available
        // For backward pagination, the content might be reversed, so first and last need to be handled carefully
        if (!content.isEmpty()) {
            // When direction is BACKWARD, the content is sorted in DESC order, 
            // so the first item in the list actually has a higher ULID than the last item.
            // So for cursor purposes: 
            // - If we were going forward, the 'last' ULID for the next cursor is the highest ULID (last item)
            // - If we were going backward, the 'first' ULID for the next cursor is the lowest ULID (last item when reversed)
            
            if (pageRequest.getDirection() == PageRequest.Direction.FORWARD) {
                // In forward direction, firstId is the smallest ULID in the result, lastId is the largest
                this.firstId = extractId(content.get(0));
                this.lastId = extractId(content.get(content.size() - 1));
            } else {
                // In backward direction, results are typically reversed, so largest ULID is first
                this.lastId = extractId(content.get(0)); // The largest ULID in the page
                this.firstId = extractId(content.get(content.size() - 1)); // The smallest ULID in the page
            }
        } else {
            this.firstId = null;
            this.lastId = null;
        }
    }
    
    /**
     * Extracts the ULID from an entity
     * This method would need to be properly implemented based on the actual entity structure
     */
    @SuppressWarnings("unchecked")
    private String extractId(T entity) {
        try {
            // Use reflection to try to get the ID field
            // This is a simplified approach - in a real implementation, we'd want more type safety
            java.lang.reflect.Method getIdMethod = entity.getClass().getMethod("getId");
            Object id = getIdMethod.invoke(entity);
            return id != null ? id.toString() : null;
        } catch (Exception e) {
            // If reflection fails, return null
            // In a real implementation, we might want to require entities to implement an interface
            return null;
        }
    }
    
    /**
     * Creates a new Page with cursor-based pagination parameters
     */
    public static <T> PageImpl<T> of(List<T> content, PageRequest pageRequest, long totalElements, boolean hasNext, boolean hasPrevious) {
        return new PageImpl<>(content, pageRequest, totalElements, hasNext, hasPrevious);
    }
    
    /**
     * Creates a new Page with default values (for forward pagination)
     */
    public static <T> PageImpl<T> of(List<T> content, PageRequest pageRequest, long totalElements) {
        boolean hasNext = content.size() > pageRequest.getPageSize();
        // Adjust content to requested size if needed
        List<T> adjustedContent = content.size() > pageRequest.getPageSize() 
            ? content.subList(0, pageRequest.getPageSize()) 
            : content;
            
        return new PageImpl<>(adjustedContent, pageRequest, totalElements, hasNext, pageRequest.getPageNumber() > 0);
    }

    @Override
    public int getTotalPages() {
        return totalPages;
    }

    @Override
    public long getTotalElements() {
        return totalElements;
    }

    @Override
    public int getNumber() {
        return number;
    }

    @Override
    public int getSize() {
        return size;
    }

    @Override
    public int getNumberOfElements() {
        return content.size();
    }

    @Override
    public List<T> getContent() {
        return content;
    }

    @Override
    public boolean hasContent() {
        return !content.isEmpty();
    }

    @Override
    public Sort getSort() {
        return pageRequest.getSort();
    }

    @Override
    public boolean isFirst() {
        return first;
    }

    @Override
    public boolean isLast() {
        return last;
    }

    @Override
    public boolean hasNext() {
        return hasNext;
    }

    @Override
    public boolean hasPrevious() {
        return hasPrevious;
    }

    @Override
    public Pageable getPageable() {
        return pageRequest;
    }

    @Override
    public Pageable nextPageable() {
        return hasNext() ? pageRequest.next() : Pageable.unpaged();
    }

    @Override
    public Pageable previousPageable() {
        return hasPrevious() ? pageRequest.previousOrFirst() : Pageable.unpaged();
    }
    
    @Override
    public <U> Page<U> map(java.util.function.Function<? super T, ? extends U> converter) {
        List<U> convertedContent = getContent().stream()
            .map(converter)
            .collect(java.util.stream.Collectors.toList());
        
        return new PageImpl<>(
            convertedContent,
            getPageRequest(),
            getTotalElements(),
            isHasNext(),
            isHasPrevious()
        );
    }
}