package com.p4.backend.catalog.entity;

import com.p4.backend.shared.entity.BaseEntity;
import com.p4.backend.shared.vo.Money;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "product")
public class Product extends BaseEntity {
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true)
    private String slug;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(length = 500)
    private String shortDescription;
    
    @Column(unique = true)
    private String sku;
    
    private String upc;
    private String gtin;
    private String mpn;
    private String brand;
    
    @Column(name = "category_id")
    private String categoryId;
    
    @Column(name = "vendor_id", nullable = false)
    private String vendorId;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ProductStatus status = ProductStatus.DRAFT;
    
    private String currency = "USD";
    
    @Column(name = "base_price", precision = 19, scale = 4)
    private BigDecimal basePrice;
    
    @Column(name = "tax_class")
    private String taxClass;
    
    @Column(name = "meta_title")
    private String metaTitle;
    
    @Column(name = "meta_description")
    private String metaDescription;
    
    @Column(name = "meta_keywords", columnDefinition = "text")
    private String metaKeywords;
    
    private BigDecimal weight;
    
    @Column(columnDefinition = "JSONB")
    private String dimensions; // JSON string for length, width, height
    
    @Column(columnDefinition = "JSONB")
    private String packagingInfo; // JSON string for packaging details
    
    @Column(name = "min_order_qty")
    private Integer minOrderQty = 1;
    
    @Column(name = "moq")
    private Integer moq; // Minimum Order Quantity
    
    @Column(name = "inventory_tracking")
    private Boolean inventoryTracking = false;
    
    @Column(name = "inventory_qty")
    private Integer inventoryQty = 0;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "inventory_status", length = 20)
    private InventoryStatus inventoryStatus = InventoryStatus.IN_STOCK;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Product() {
        super();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.metaKeywords = "[]"; // Initialize as JSON string for metaKeywords
    }
    
    public Product(String name, String vendorId) {
        super();
        this.name = name;
        this.vendorId = vendorId;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.metaKeywords = "[]"; // Initialize as JSON string for metaKeywords
    }
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    
    public String getUpc() { return upc; }
    public void setUpc(String upc) { this.upc = upc; }
    
    public String getGtin() { return gtin; }
    public void setGtin(String gtin) { this.gtin = gtin; }
    
    public String getMpn() { return mpn; }
    public void setMpn(String mpn) { this.mpn = mpn; }
    
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    
    public String getCategoryId() { return categoryId; }
    public void setCategoryId(String categoryId) { this.categoryId = categoryId; }
    
    public String getVendorId() { return vendorId; }
    public void setVendorId(String vendorId) { this.vendorId = vendorId; }
    
    public ProductStatus getStatus() { return status; }
    public void setStatus(ProductStatus status) { this.status = status; }
    
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    
    public BigDecimal getBasePrice() { return basePrice; }
    public void setBasePrice(BigDecimal basePrice) { this.basePrice = basePrice; }
    
    public String getTaxClass() { return taxClass; }
    public void setTaxClass(String taxClass) { this.taxClass = taxClass; }
    
    public String getMetaTitle() { return metaTitle; }
    public void setMetaTitle(String metaTitle) { this.metaTitle = metaTitle; }
    
    public String getMetaDescription() { return metaDescription; }
    public void setMetaDescription(String metaDescription) { this.metaDescription = metaDescription; }
    
    public String getMetaKeywords() { return metaKeywords; }
    public void setMetaKeywords(String metaKeywords) { this.metaKeywords = metaKeywords; }
    
    public BigDecimal getWeight() { return weight; }
    public void setWeight(BigDecimal weight) { this.weight = weight; }
    
    public String getDimensions() { return dimensions; }
    public void setDimensions(String dimensions) { this.dimensions = dimensions; }
    
    public String getPackagingInfo() { return packagingInfo; }
    public void setPackagingInfo(String packagingInfo) { this.packagingInfo = packagingInfo; }
    
    public Integer getMinOrderQty() { return minOrderQty; }
    public void setMinOrderQty(Integer minOrderQty) { this.minOrderQty = minOrderQty; }
    
    public Integer getMoq() { return moq; }
    public void setMoq(Integer moq) { this.moq = moq; }
    
    public Boolean getInventoryTracking() { return inventoryTracking; }
    public void setInventoryTracking(Boolean inventoryTracking) { this.inventoryTracking = inventoryTracking; }
    
    public Integer getInventoryQty() { return inventoryQty; }
    public void setInventoryQty(Integer inventoryQty) { this.inventoryQty = inventoryQty; }
    
    public InventoryStatus getInventoryStatus() { return inventoryStatus; }
    public void setInventoryStatus(InventoryStatus inventoryStatus) { this.inventoryStatus = inventoryStatus; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Enums
    public enum ProductStatus {
        DRAFT, PUBLISHED, UNPUBLISHED, SUSPENDED
    }
    
    public enum InventoryStatus {
        IN_STOCK, OUT_OF_STOCK, BACKORDER, DISCONTINUED
    }
    
    // Helper methods
    public Money getPrice() {
        if (basePrice != null && currency != null) {
            return Money.of(basePrice, currency);
        }
        return Money.zero("USD"); // Default fallback
    }
}