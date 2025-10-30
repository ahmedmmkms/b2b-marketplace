package com.p4.backend.catalog.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;

import java.util.List;
import java.util.Map;

public class ProductCreate {
    @NotNull
    @NotBlank
    private String vendorId;
    
    @NotNull
    @NotBlank
    private String sku;
    
    @NotNull
    @NotBlank
    private String name;
    
    private String description;
    private String category;
    private Double referencePrice;
    private List<String> mediaUrls;
    private Map<String, Object> attributes;
    
    // Constructors
    public ProductCreate() {}
    
    public ProductCreate(String vendorId, String sku, String name) {
        this.vendorId = vendorId;
        this.sku = sku;
        this.name = name;
    }

    // Getters and setters
    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getReferencePrice() {
        return referencePrice;
    }

    public void setReferencePrice(Double referencePrice) {
        this.referencePrice = referencePrice;
    }

    public List<String> getMediaUrls() {
        return mediaUrls;
    }

    public void setMediaUrls(List<String> mediaUrls) {
        this.mediaUrls = mediaUrls;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
}