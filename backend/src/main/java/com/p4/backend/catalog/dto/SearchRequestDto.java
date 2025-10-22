package com.p4.backend.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchRequestDto {

    private String query;
    private SearchFilters filters;
    private String sort;
    private Integer page;
    private Integer size;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SearchFilters {
        private String category;
        private String vendorId;
        private PriceRange priceRange;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PriceRange {
        private BigDecimal min;
        private BigDecimal max;
    }
}
