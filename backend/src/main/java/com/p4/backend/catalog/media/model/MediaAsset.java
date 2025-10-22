package com.p4.backend.catalog.media.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity(name = "MediaLibraryAsset")
@Table(name = "media_assets")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MediaAsset extends Base {
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "original_filename", nullable = false)
    private String originalFilename;

    @Column(name = "storage_path", nullable = false)
    private String storagePath;

    @Column(name = "content_type")
    private String contentType;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "alt_text")
    private String altText;

    @Column(name = "title")
    private String title;

    @Column(name = "caption", columnDefinition = "TEXT")
    private String caption;

    @Enumerated(EnumType.STRING)
    @Column(name = "media_type", nullable = false)
    private MediaType mediaType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "is_primary")
    private Boolean isPrimary;

    @Column(name = "upload_date")
    private LocalDateTime uploadDate;

    public enum MediaType {
        IMAGE, VIDEO, DOCUMENT, OTHER
    }

    public enum Status {
        ACTIVE, INACTIVE, DELETED
    }
}