package com.p4.backend.catalog.model;

import com.p4.backend.shared.kernel.Base;
import com.p4.backend.shared.kernel.Money;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product extends Base {

    @NotBlank(message = "Product name is required")
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", referencedColumnName = "id", nullable = false)
    private Vendor vendor;

    @Column(name = "sku", unique = true, nullable = false)
    private String sku;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "amount", column = @Column(name = "price_amount", nullable = false)),
        @AttributeOverride(name = "currency", column = @Column(name = "price_currency", nullable = false, length = 3))
    })
    private Money price;

    @Positive(message = "Stock quantity must be positive")
    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity = 0;

    @Column(name = "min_order_quantity", nullable = false)
    private Integer minOrderQuantity = 1;

    @Column(name = "weight") // in grams
    private BigDecimal weight;

    @Column(name = "dimensions_length") // in cm
    private BigDecimal dimensionsLength;

    @Column(name = "dimensions_width") // in cm
    private BigDecimal dimensionsWidth;

    @Column(name = "dimensions_height") // in cm
    private BigDecimal dimensionsHeight;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_status", nullable = false)
    private ProductStatus productStatus = ProductStatus.ACTIVE;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @PrePersist
    protected void onCreate() {
        if (this.productStatus == null) {
            this.productStatus = ProductStatus.ACTIVE;
        }
        if (this.isActive == null) {
            this.isActive = true;
        }
        if (this.minOrderQuantity == null) {
            this.minOrderQuantity = 1;
        }
        if (this.stockQuantity == null) {
            this.stockQuantity = 0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        // Additional validation or updates can be performed here
    }

    public enum ProductStatus {
        DRAFT,
        ACTIVE,
        INACTIVE,
        DISCONTINUED
    }
}