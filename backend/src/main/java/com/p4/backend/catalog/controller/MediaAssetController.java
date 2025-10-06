package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.entity.MediaAsset;
import com.p4.backend.catalog.service.MediaAssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api/media")
public class MediaAssetController {
    
    @Autowired
    private MediaAssetService mediaAssetService;
    
    /**
     * Upload a media file (restricted to authorized users)
     */
    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN') or hasRole('VENDOR') or hasRole('OPS')")  // Role-gated access
    public ResponseEntity<Map<String, Object>> uploadMedia(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "File is empty"));
        }
        
        try {
            MediaAsset mediaAsset = mediaAssetService.uploadMedia(file);
            
            return ResponseEntity.ok(Map.of(
                "id", mediaAsset.getId(),
                "name", mediaAsset.getName(),
                "filename", mediaAsset.getFilename(),
                "filePath", mediaAsset.getFilePath(),
                "mediaType", mediaAsset.getMediaType(),
                "fileSize", mediaAsset.getFileSize()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Error during upload: " + e.getMessage()));
        }
    }
    
    /**
     * Get presigned URL for a media asset (public access, but with signed URLs)
     */
    @GetMapping("/{id}/url")
    public ResponseEntity<Map<String, String>> getPresignedUrl(@PathVariable String id) {
        try {
            // Generate a URL that's valid for 1 hour
            String presignedUrl = mediaAssetService.generatePresignedUrl(id, Duration.ofHours(1));
            
            return ResponseEntity.ok(Map.of("url", presignedUrl));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * Get media asset details by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<MediaAsset> getMediaAsset(@PathVariable String id) {
        try {
            MediaAsset mediaAsset = mediaAssetService.getMediaAsset(id);
            return ResponseEntity.ok(mediaAsset);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Delete a media asset (restricted to authorized users)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('OPS')")  // Role-gated access
    public ResponseEntity<Map<String, String>> deleteMediaAsset(@PathVariable String id) {
        try {
            mediaAssetService.deleteMediaAsset(id);
            return ResponseEntity.ok(Map.of("message", "Media asset deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }
}