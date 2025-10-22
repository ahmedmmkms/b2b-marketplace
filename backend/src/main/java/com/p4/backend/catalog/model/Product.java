package com.p4.backend.catalog.model;

import com.p4.backend.shared.kernel.Base;
import com.p4.backend.shared.kernel.Money;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product extends Base {

    @NotBlank(message = "Product name is required")
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "slug", unique = true)
    private String slug;

    @Column(name = "description")
    private String description;

    @Column(name = "short_description", length = 500)
    private String shortDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", referencedColumnName = "id", nullable = false)
    private Vendor vendor;

    @Column(name = "sku", unique = true, nullable = false)
    private String sku;

    @Column(name = "upc")
    private String upc;

    @Column(name = "gtin")
    private String gtin;

    @Column(name = "mpn")
    private String mpn;

    @Column(name = "brand")
    private String brand;

    @Column(name = "category_id")
    private String categoryId;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "amount", column = @Column(name = "price_amount", nullable = false)),
        @AttributeOverride(name = "currency", column = @Column(name = "price_currency", nullable = false, length = 3))
    })
    private Money price;

    @Positive(message = "Stock quantity must be positive")
    @Column(name = "stock_quantity", nullable = false)
    @Builder.Default
    private Integer stockQuantity = 0;

    @Column(name = "min_order_quantity", nullable = false)
    @Builder.Default
    private Integer minOrderQuantity = 1;

    @Column(name = "weight") // in grams
    private BigDecimal weight;

    @Column(name = "dimensions_length") // in cm
    private BigDecimal dimensionsLength;

    @Column(name = "dimensions_width") // in cm
    private BigDecimal dimensionsWidth;

    @Column(name = "dimensions_height") // in cm
    private BigDecimal dimensionsHeight;

    @Column(name = "dimensions", columnDefinition = "jsonb")
    private String dimensions;

    @Column(name = "packaging_info", columnDefinition = "jsonb")
    private String packagingInfo;

    @Column(name = "tax_class")
    private String taxClass;

    @Column(name = "meta_title")
    private String metaTitle;

    @Column(name = "meta_description", length = 500)
    private String metaDescription;

    @Column(name = "meta_keywords", columnDefinition = "TEXT")
    private String metaKeywords;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_status", nullable = false)
    @Builder.Default
    private ProductStatus productStatus = ProductStatus.ACTIVE;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "inventory_tracking")
    @Builder.Default
    private Boolean inventoryTracking = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "inventory_status")
    @Builder.Default
    private InventoryStatus inventoryStatus = InventoryStatus.IN_STOCK;

    @Column(name = "moq")
    private Integer moq;

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
        if (this.inventoryStatus == null) {
            this.inventoryStatus = InventoryStatus.IN_STOCK;
        }
        if (this.inventoryTracking == null) {
            this.inventoryTracking = false;
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

    public enum InventoryStatus {
        IN_STOCK,
        OUT_OF_STOCK,
        BACKORDER,
        DISCONTINUED
    }
}
