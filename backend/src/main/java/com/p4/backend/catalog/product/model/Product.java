package com.p4.backend.catalog.product.model;

import com.p4.backend.catalog.vendor.model.Vendor;
import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product extends Base {
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "slug", unique = true)
    private String slug;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "short_description", length = 500)
    private String shortDescription;

    @Column(name = "sku", unique = true)
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_status")
    private ProductStatus productStatus;

    @Column(name = "price_amount", precision = 19, scale = 4)
    private BigDecimal priceAmount;

    @Column(name = "price_currency", length = 3)
    private String priceCurrency;

    @Column(name = "tax_class")
    private String taxClass;

    @Column(name = "meta_title")
    private String metaTitle;

    @Column(name = "meta_description", length = 500)
    private String metaDescription;

    @Column(name = "meta_keywords", columnDefinition = "TEXT")
    private String metaKeywords;

    @Column(name = "weight", precision = 10, scale = 3)
    private BigDecimal weight;

    @Column(name = "dimensions", columnDefinition = "jsonb")
    private String dimensions;

    @Column(name = "packaging_info", columnDefinition = "jsonb")
    private String packagingInfo;

    @Column(name = "min_order_quantity")
    private Integer minOrderQuantity;

    @Column(name = "moq")
    private Integer moq;

    @Column(name = "inventory_tracking")
    private Boolean inventoryTracking;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "inventory_status")
    private InventoryStatus inventoryStatus;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "dimensions_length", precision = 10, scale = 3)
    private BigDecimal dimensionsLength;

    @Column(name = "dimensions_width", precision = 10, scale = 3)
    private BigDecimal dimensionsWidth;

    @Column(name = "dimensions_height", precision = 10, scale = 3)
    private BigDecimal dimensionsHeight;

    public enum ProductStatus {
        DRAFT, ACTIVE, INACTIVE, DISCONTINUED
    }

    public enum InventoryStatus {
        IN_STOCK, OUT_OF_STOCK, BACKORDER, DISCONTINUED
    }
}