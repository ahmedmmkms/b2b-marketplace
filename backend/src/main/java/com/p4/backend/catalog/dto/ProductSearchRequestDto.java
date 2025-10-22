package com.p4.backend.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSearchRequestDto {

    private String keyword;
    private String vendorId;
    private String category;
    private String sortBy;
    private String sortOrder; // ASC or DESC
    private Integer page;
    private Integer size;
    private java.math.BigDecimal minPrice;
    private java.math.BigDecimal maxPrice;
}
