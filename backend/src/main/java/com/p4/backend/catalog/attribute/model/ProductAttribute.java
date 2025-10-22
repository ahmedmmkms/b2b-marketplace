package com.p4.backend.catalog.attribute.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "AttributeProductAttribute")
@Table(name = "product_attributes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttribute extends Base {
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "display_name", nullable = false)
    private String displayName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "attribute_type", nullable = false)
    private AttributeType attributeType;

    @Column(name = "is_required")
    private Boolean isRequired;

    @Column(name = "is_searchable")
    private Boolean isSearchable;

    @Column(name = "is_filterable")
    private Boolean isFilterable;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @Column(name = "validation_rules", columnDefinition = "jsonb")
    private String validationRules;

    public enum AttributeType {
        TEXT, NUMBER, BOOLEAN, DATE, SELECT, MULTI_SELECT
    }
}