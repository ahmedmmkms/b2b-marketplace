package com.p4.backend.catalog.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request payload for assigning or updating product attributes.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttributeAssignmentRequestDto {

    @NotBlank(message = "attributeId is required")
    private String attributeId;

    /**
     * Optional reference to a predefined attribute value.
     */
    private String valueId;

    /**
     * Custom value when valueId is not supplied.
     */
    private String customValue;

    private String displayValue;

    private Boolean isDefault;
}
