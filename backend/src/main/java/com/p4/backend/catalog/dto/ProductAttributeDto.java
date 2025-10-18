package com.p4.backend.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttributeDto {

    private String id;
    private String name;
    private String displayName;
    private String description;
    private String attributeType;
    private Boolean isRequired;
    private Boolean isFilterable;
    private Integer sortOrder;
    private List<ProductAttributeValueDto> attributeValues;
}