package com.p4.backend.catalog.service;

import com.p4.backend.catalog.entity.MediaAsset;
import com.p4.backend.catalog.repository.MediaAssetRepository;  // We'll create this repository next
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.IOException;
import java.net.URI;
import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class MediaAssetService {
    
    private static final Logger logger = LoggerFactory.getLogger(MediaAssetService.class);
    
    private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList(
        "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"
    );
    
    private static final List<String> ALLOWED_DOCUMENT_TYPES = Arrays.asList(
        "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain", "application/zip"
    );
    
    private static final List<String> ALLOWED_TYPES = Arrays.asList(
        "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml",
        "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain", "application/zip"
    );
    
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    
    @Autowired
    private MediaAssetRepository mediaAssetRepository;
    
    @Value("${r2.access.key}")
    private String accessKey;
    
    @Value("${r2.secret.key}")
    private String secretKey;
    
    @Value("${r2.bucket.name}")
    private String bucketName;
    
    @Value("${r2.endpoint}")
    private String endpoint;
    
    private S3Client s3Client;
    private S3Presigner s3Presigner;
    
    public MediaAssetService() {
        // Initialize S3 client with R2-specific configuration
    }
    
    private void initializeS3Clients() {
        if (s3Client == null) {
            AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKey, secretKey);
            
            s3Client = S3Client.builder()
                    .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                    .region(Region.US_EAST_1) // Cloudflare R2 uses this region
                    .endpointOverride(URI.create(endpoint))
                    .build();
                    
            s3Presigner = S3Presigner.builder()
                    .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                    .region(Region.US_EAST_1)
                    .endpointOverride(URI.create(endpoint))
                    .build();
        }
    }
    
    /**
     * Uploads a media file to R2 storage
     */
    public MediaAsset uploadMedia(MultipartFile file) throws IOException {
        // Validate file
        validateFile(file);
        
        // Initialize S3 clients if not already done
        initializeS3Clients();
        
        // Generate unique file name
        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;
        String filePath = "media/" + uniqueFileName;  // Organize by media prefix
        
        try {
            // Upload to R2
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(filePath)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .build();
            
            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
            
            // Create media asset entity
            MediaAsset mediaAsset = new MediaAsset(
                    originalFileName != null ? originalFileName : "unnamed_file",
                    originalFileName,
                    filePath,
                    determineMediaType(file.getContentType())
            );
            
            mediaAsset.setFileSize(file.getSize());
            mediaAsset.setMimeType(file.getContentType());
            
            // Save to database
            return mediaAssetRepository.save(mediaAsset);
            
        } catch (S3Exception e) {
            logger.error("Error uploading file to R2: {}", e.getMessage());
            throw new RuntimeException("Failed to upload file: " + e.getMessage(), e);
        }
    }
    
    /**
     * Generates a presigned URL for downloading a media file
     */
    public String generatePresignedUrl(String mediaAssetId, Duration duration) {
        MediaAsset mediaAsset = mediaAssetRepository.findById(mediaAssetId)
                .orElseThrow(() -> new RuntimeException("Media asset not found: " + mediaAssetId));
        
        initializeS3Clients();
        
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(mediaAsset.getFilePath())
                .build();
        
        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(duration)
                .getObjectRequest(getObjectRequest)
                .build();
        
        return s3Presigner.presignGetObject(presignRequest).url().toString();
    }
    
    /**
     * Validates the uploaded file for type and size
     */
    private void validateFile(MultipartFile file) {
        // Check file size
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds maximum allowed size of " + MAX_FILE_SIZE + " bytes");
        }
        
        // Check file type
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("File type not allowed: " + contentType);
        }
    }
    
    /**
     * Determines the media type based on MIME type
     */
    private MediaAsset.MediaType determineMediaType(String mimeType) {
        if (mimeType == null) {
            return MediaAsset.MediaType.OTHER;
        }
        
        if (ALLOWED_IMAGE_TYPES.contains(mimeType.toLowerCase())) {
            return MediaAsset.MediaType.IMAGE;
        } else if (ALLOWED_DOCUMENT_TYPES.contains(mimeType.toLowerCase())) {
            return MediaAsset.MediaType.DOCUMENT;
        } else {
            return MediaAsset.MediaType.OTHER;
        }
    }
    
    /**
     * Gets a media asset by ID
     */
    public MediaAsset getMediaAsset(String id) {
        return mediaAssetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Media asset not found: " + id));
    }
    
    /**
     * Deletes a media asset from both R2 and database
     */
    public void deleteMediaAsset(String id) {
        MediaAsset mediaAsset = getMediaAsset(id);
        
        // Initialize S3 clients if not already done
        initializeS3Clients();
        
        try {
            // Delete from R2 storage
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(mediaAsset.getFilePath())
                    .build();
            
            s3Client.deleteObject(deleteObjectRequest);
            
            // Delete from database
            mediaAssetRepository.deleteById(id);
            
        } catch (S3Exception e) {
            logger.error("Error deleting file from R2: {}", e.getMessage());
            throw new RuntimeException("Failed to delete file: " + e.getMessage(), e);
        }
    }
}