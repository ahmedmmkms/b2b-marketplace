package com.p4.backend.catalog.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product_attribute_values")
@Getter
@Setter
public class ProductAttributeValue extends Base {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_attribute_id", referencedColumnName = "id", nullable = false)
    private ProductAttribute productAttribute;

    @NotBlank(message = "Attribute value is required")
    @Column(name = "value", nullable = false)
    private String value;

    @Column(name = "display_value")
    private String displayValue;

    @NotNull(message = "Is default value setting is required")
    @Column(name = "is_default", nullable = false)
    private Boolean isDefault = false;

    @Column(name = "sort_order")
    private Integer sortOrder = 0;

    @PrePersist
    protected void onCreate() {
        if (this.isDefault == null) {
            this.isDefault = false;
        }
        if (this.sortOrder == null) {
            this.sortOrder = 0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        // Additional validation or updates can be performed here
    }
}