package com.p4.backend.catalog.attribute.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "AttributeProductAttributeValue")
@Table(name = "product_attribute_values")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttributeValue extends Base {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_attribute_id", nullable = false)
    private ProductAttribute productAttribute;

    @Column(name = "value", nullable = false)
    private String value;

    @Column(name = "display_value")
    private String displayValue;

    @Column(name = "is_default")
    private Boolean isDefault;

    @Column(name = "sort_order")
    private Integer sortOrder;
}