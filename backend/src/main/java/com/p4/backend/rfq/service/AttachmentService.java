package com.p4.backend.rfq.service;

import com.p4.backend.shared.exception.BusinessException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.net.URI;
import java.util.UUID;

@Service
public class AttachmentService {

    @Value("${r2.access.key.id}")
    private String accessKeyId;

    @Value("${r2.secret.access.key}")
    private String secretAccessKey;

    @Value("${r2.bucket.name}")
    private String bucketName;

    @Value("${r2.endpoint.url}")
    private String endpointUrl;

    private S3Client s3Client;

    @PostConstruct
    private void initializeS3Client() {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKeyId, secretAccessKey);
        this.s3Client = S3Client.builder()
                .endpointOverride(URI.create(endpointUrl))
                .region(Region.US_EAST_1) // Cloudflare R2 uses us-east-1 region
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();
    }

    public String uploadFile(InputStream fileStream, String originalFileName, String uploadDirectory) throws BusinessException {
        try {
            // Generate a unique file name to avoid conflicts
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));
            String uniqueFileName = uploadDirectory + "/" + UUID.randomUUID().toString() + fileExtension;

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(uniqueFileName)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(fileStream, fileStream.available()));

            return uniqueFileName;
        } catch (Exception e) {
            throw new BusinessException("Failed to upload file to R2: " + e.getMessage());
        }
    }

    public String uploadRfqAttachment(InputStream fileStream, String originalFileName) throws BusinessException {
        return uploadFile(fileStream, originalFileName, "rfq-attachments");
    }
}