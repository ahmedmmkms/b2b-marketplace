package com.p4.backend.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MediaAssetDto {

    private String id;
    private String originalFilename;
    private String storagePath;
    private String contentType;
    private Long fileSize;
    private String altText;
    private String caption;
    private String mediaType;
    private String status;
    private String name;
    private String title;
    private Boolean isPrimary;
    private LocalDateTime uploadDate;
}
