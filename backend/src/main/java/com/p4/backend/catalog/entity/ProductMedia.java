package com.p4.backend.catalog.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_media")
public class ProductMedia extends BaseEntity {
    
    @Column(name = "product_id", nullable = false)
    private String productId;
    
    @Column(name = "media_asset_id", nullable = false)
    private String mediaAssetId;
    
    @Column(name = "sort_order")
    private Integer sortOrder = 0;  // Order in which to display media
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Constructors
    public ProductMedia() {
        super();
        this.createdAt = LocalDateTime.now();
    }
    
    public ProductMedia(String productId, String mediaAssetId) {
        super();
        this.productId = productId;
        this.mediaAssetId = mediaAssetId;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and setters
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    
    public String getMediaAssetId() { return mediaAssetId; }
    public void setMediaAssetId(String mediaAssetId) { this.mediaAssetId = mediaAssetId; }
    
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}