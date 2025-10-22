package com.p4.backend.catalog.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "CatalogMediaAsset")
@Table(name = "media_assets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaAsset extends Base {

    @NotBlank(message = "Original filename is required")
    @Column(name = "original_filename", nullable = false)
    private String originalFilename;

    @NotBlank(message = "Storage path is required")
    @Column(name = "storage_path", nullable = false)
    private String storagePath;

    @NotBlank(message = "Content type is required")
    @Column(name = "content_type", nullable = false)
    private String contentType;

    @NotNull(message = "File size is required")
    @Column(name = "file_size", nullable = false)
    private Long fileSize;

    @Column(name = "alt_text")
    private String altText;

    @Column(name = "caption")
    private String caption;

    @Enumerated(EnumType.STRING)
    @Column(name = "media_type", nullable = false)
    @Builder.Default
    private MediaType mediaType = MediaType.IMAGE;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private MediaStatus status = MediaStatus.ACTIVE;

    @NotBlank(message = "Media name is required")
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "title")
    private String title;

    @Column(name = "is_primary")
    @Builder.Default
    private Boolean isPrimary = false;

    @Column(name = "upload_date")
    private LocalDateTime uploadDate;

    @PrePersist
    protected void onCreate() {
        if (this.uploadDate == null) {
            this.uploadDate = LocalDateTime.now();
        }
        if (this.mediaType == null) {
            this.mediaType = MediaType.IMAGE;
        }
        if (this.status == null) {
            this.status = MediaStatus.ACTIVE;
        }
        if (this.isPrimary == null) {
            this.isPrimary = false;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        // Additional validation or updates can be performed here
    }

    public enum MediaType {
        IMAGE,
        VIDEO,
        DOCUMENT,
        OTHER
    }

    public enum MediaStatus {
        ACTIVE,
        INACTIVE,
        DELETED
    }
}
