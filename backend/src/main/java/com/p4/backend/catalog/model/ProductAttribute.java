package com.p4.backend.catalog.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product_attributes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAttribute extends Base {

    @NotBlank(message = "Attribute name is required")
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank(message = "Attribute display name is required")
    @Column(name = "display_name", nullable = false)
    private String displayName;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "attribute_type", nullable = false)
    @Builder.Default
    private AttributeType attributeType = AttributeType.TEXT;

    @NotNull(message = "Attribute is required setting is required")
    @Column(name = "is_required", nullable = false)
    @Builder.Default
    private Boolean isRequired = false;

    @Column(name = "is_searchable")
    @Builder.Default
    private Boolean isSearchable = false;

    @Column(name = "is_filterable")
    @Builder.Default
    private Boolean isFilterable = false;

    @Column(name = "sort_order")
    @Builder.Default
    private Integer sortOrder = 0;

    @Column(name = "validation_rules", columnDefinition = "jsonb")
    private String validationRules;

    @OneToMany(mappedBy = "productAttribute", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<ProductAttributeValue> attributeValues = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        if (this.attributeType == null) {
            this.attributeType = AttributeType.TEXT;
        }
        if (this.isRequired == null) {
            this.isRequired = false;
        }
        if (this.isFilterable == null) {
            this.isFilterable = false;
        }
        if (this.isSearchable == null) {
            this.isSearchable = false;
        }
        if (this.sortOrder == null) {
            this.sortOrder = 0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        // Additional validation or updates can be performed here
    }

    public enum AttributeType {
        TEXT,
        NUMBER,
        BOOLEAN,
        DATE,
        SELECT,
        MULTI_SELECT
    }
}
