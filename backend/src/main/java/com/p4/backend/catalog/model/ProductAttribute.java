package com.p4.backend.catalog.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "product_attributes")
@Getter
@Setter
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
    private AttributeType attributeType = AttributeType.TEXT;

    @NotNull(message = "Attribute is required setting is required")
    @Column(name = "is_required", nullable = false)
    private Boolean isRequired = false;

    @Column(name = "is_filterable")
    private Boolean isFilterable = false;

    @Column(name = "sort_order")
    private Integer sortOrder = 0;

    @OneToMany(mappedBy = "productAttribute", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductAttributeValue> attributeValues;

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