package com.p4.backend.catalog.csv;

import com.opencsv.bean.CsvBindByName;

/**
 * Data Transfer Object for product CSV import
 * Maps CSV columns to Product entity fields
 */
public class ProductCsvDto {
    
    @CsvBindByName(column = "name", required = true)
    private String name;
    
    @CsvBindByName(column = "slug")
    private String slug;
    
    @CsvBindByName(column = "description")
    private String description;
    
    @CsvBindByName(column = "short_description")
    private String shortDescription;
    
    @CsvBindByName(column = "sku", required = true)
    private String sku;
    
    @CsvBindByName(column = "upc")
    private String upc;
    
    @CsvBindByName(column = "gtin")
    private String gtin;
    
    @CsvBindByName(column = "mpn")
    private String mpn;
    
    @CsvBindByName(column = "brand")
    private String brand;
    
    @CsvBindByName(column = "category_id")
    private String categoryId;
    
    @CsvBindByName(column = "vendor_id", required = true)
    private String vendorId;
    
    @CsvBindByName(column = "status")
    private String status;
    
    @CsvBindByName(column = "currency")
    private String currency = "USD";
    
    @CsvBindByName(column = "base_price")
    private String basePrice;  // Will be parsed to BigDecimal
    
    @CsvBindByName(column = "tax_class")
    private String taxClass;
    
    @CsvBindByName(column = "meta_title")
    private String metaTitle;
    
    @CsvBindByName(column = "meta_description")
    private String metaDescription;
    
    @CsvBindByName(column = "meta_keywords")
    private String metaKeywords;
    
    @CsvBindByName(column = "weight")
    private String weight;  // Will be parsed to BigDecimal
    
    @CsvBindByName(column = "min_order_qty")
    private String minOrderQty;  // Will be parsed to Integer
    
    @CsvBindByName(column = "moq")
    private String moq;  // Will be parsed to Integer
    
    @CsvBindByName(column = "inventory_tracking")
    private String inventoryTracking;  // Will be parsed to Boolean
    
    @CsvBindByName(column = "inventory_qty")
    private String inventoryQty;  // Will be parsed to Integer
    
    @CsvBindByName(column = "inventory_status")
    private String inventoryStatus;
    
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
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    
    public String getBasePrice() { return basePrice; }
    public void setBasePrice(String basePrice) { this.basePrice = basePrice; }
    
    public String getTaxClass() { return taxClass; }
    public void setTaxClass(String taxClass) { this.taxClass = taxClass; }
    
    public String getMetaTitle() { return metaTitle; }
    public void setMetaTitle(String metaTitle) { this.metaTitle = metaTitle; }
    
    public String getMetaDescription() { return metaDescription; }
    public void setMetaDescription(String metaDescription) { this.metaDescription = metaDescription; }
    
    public String getMetaKeywords() { return metaKeywords; }
    public void setMetaKeywords(String metaKeywords) { this.metaKeywords = metaKeywords; }
    
    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }
    
    public String getMinOrderQty() { return minOrderQty; }
    public void setMinOrderQty(String minOrderQty) { this.minOrderQty = minOrderQty; }
    
    public String getMoq() { return moq; }
    public void setMoq(String moq) { this.moq = moq; }
    
    public String getInventoryTracking() { return inventoryTracking; }
    public void setInventoryTracking(String inventoryTracking) { this.inventoryTracking = inventoryTracking; }
    
    public String getInventoryQty() { return inventoryQty; }
    public void setInventoryQty(String inventoryQty) { this.inventoryQty = inventoryQty; }
    
    public String getInventoryStatus() { return inventoryStatus; }
    public void setInventoryStatus(String inventoryStatus) { this.inventoryStatus = inventoryStatus; }
}