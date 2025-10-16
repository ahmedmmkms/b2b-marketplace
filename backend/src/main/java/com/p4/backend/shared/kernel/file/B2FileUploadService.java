package com.p4.backend.shared.kernel.file;

import com.p4.backend.config.B2ConfigurationProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class B2FileUploadService implements FileUploadService {

    private final B2ConfigurationProperties b2Config;

    public String uploadFile(MultipartFile file) throws FileUploadException {
        // Initialize S3 client with B2 configuration
        S3Client s3Client = createS3Client();

        try {
            // Generate a unique file key to avoid conflicts
            String fileKey = generateFileKey(file.getOriginalFilename());

            String bucketName = b2Config.getBucket().getName();
            log.info("Attempting to upload file to B2 bucket: {}", bucketName);

            // Prepare the PutObjectRequest
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileKey)
                    .contentType(file.getContentType())
                    .build();

            // Upload the file
            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            log.info("File uploaded successfully to B2 with key: {}", fileKey);
            
            // Return the file key for reference
            return fileKey;
        } catch (S3Exception e) {
            log.error("S3/B2 error uploading file. Bucket: {}, Error: {}", b2Config.getBucket().getName(), e.getMessage());
            log.error("S3 Error Code: {}, S3 Error Details: {}", e.awsErrorDetails().errorCode(), e.awsErrorDetails());
            throw new FileUploadException("Failed to upload file to B2: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("General error uploading file to B2: {}", e.getMessage());
            throw new FileUploadException("Failed to upload file to B2: " + e.getMessage(), e);
        } finally {
            s3Client.close();
        }
    }

    public String uploadFileWithPublicUrl(MultipartFile file) throws FileUploadException {
        // This method uploads the file and returns a publicly accessible URL
        String fileKey = uploadFile(file);
        
        // Construct the public URL for the uploaded file
        // We use the configured endpoint with the bucket name/id specified in configuration
        String publicUrl = String.format("%s/file/%s/%s", b2Config.getEndpoint().getUrl(), b2Config.getBucket().getName(), fileKey);
        log.info("Generated public URL: {}", publicUrl);
        return publicUrl;
    }

    private S3Client createS3Client() {
        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(
                b2Config.getApplication().getKey().getId(),
                b2Config.getSecret().getAccess().getKey()
        );

        return S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                // B2's S3-compatible API doesn't require a specific AWS region
                // Using custom configuration to ensure compatibility with B2
                .region(Region.US_EAST_1) // This is required but can be any valid region for S3 compatibility
                .endpointOverride(URI.create(b2Config.getEndpoint().getUrl()))
                .forcePathStyle(true)  // B2 requires path-style addressing
                .build();
    }

    private String generateFileKey(String originalFilename) {
        // Generate a unique key using UUID to avoid naming conflicts
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
        }
        return String.format("uploads/%s-%s%s", UUID.randomUUID(), System.currentTimeMillis(), extension);
    }
}