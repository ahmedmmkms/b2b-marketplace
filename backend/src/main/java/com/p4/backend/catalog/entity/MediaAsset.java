package com.p4.backend.catalog.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "media_asset")
public class MediaAsset extends BaseEntity {
    
    @Column(nullable = false)
    private String name; // Display name
    
    @Column(name = "filename", nullable = false)
    private String filename; // Original filename
    
    @Column(name = "file_path", nullable = false, length = 1000)
    private String filePath; // Path in storage (e.g., R2 bucket path)
    
    @Column(name = "mime_type")
    private String mimeType; // MIME type of the file
    
    @Column(name = "file_size")
    private Long fileSize; // File size in bytes
    
    @Column(name = "alt_text")
    private String altText; // Alt text for accessibility
    
    private String title; // Title for the media
    
    @Column(columnDefinition = "TEXT")
    private String caption; // Caption or description
    
    @Column(name = "tags", columnDefinition = "text")
    private String tags; // Tags for search (as JSON string)
    
    @Enumerated(EnumType.STRING)
    @Column(name = "media_type", nullable = false, length = 20)
    private MediaType mediaType;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private MediaStatus status = MediaStatus.ACTIVE;
    
    @Column(name = "is_primary")
    private Boolean isPrimary = false; // Primary image for product
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public MediaAsset() {
        super();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.tags = "[]"; // Initialize as JSON string for tags
    }
    
    public MediaAsset(String name, String filename, String filePath, MediaType mediaType) {
        super();
        this.name = name;
        this.filename = filename;
        this.filePath = filePath;
        this.mediaType = mediaType;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.tags = "[]"; // Initialize as JSON string for tags
    }
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }
    
    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }
    
    public String getMimeType() { return mimeType; }
    public void setMimeType(String mimeType) { this.mimeType = mimeType; }
    
    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }
    
    public String getAltText() { return altText; }
    public void setAltText(String altText) { this.altText = altText; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }
    
    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
    
    public MediaType getMediaType() { return mediaType; }
    public void setMediaType(MediaType mediaType) { this.mediaType = mediaType; }
    
    public MediaStatus getStatus() { return status; }
    public void setStatus(MediaStatus status) { this.status = status; }
    
    public Boolean getIsPrimary() { return isPrimary; }
    public void setIsPrimary(Boolean isPrimary) { this.isPrimary = isPrimary; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Enums
    public enum MediaType {
        IMAGE, VIDEO, DOCUMENT, OTHER
    }
    
    public enum MediaStatus {
        ACTIVE, INACTIVE, DELETED
    }
}