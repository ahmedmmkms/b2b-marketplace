package com.p4.backend.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttributeValueDto {

    private String id;
    private String value;
    private String displayValue;
    private Boolean isDefault;
    private Integer sortOrder;
}