package com.p4.backend.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response payload describing a product's attribute assignment.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttributeAssignmentDto {

    private String attributeId;
    private String attributeName;
    private String attributeType;
    private Boolean isRequired;
    private Boolean isFilterable;
    private Boolean isSearchable;
    private String valueId;
    private String value;
    private String displayValue;
    private Boolean isDefault;
}
