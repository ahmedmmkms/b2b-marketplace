package com.p4.backend.shared.kernel.file;

import com.p4.backend.shared.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
public class FileUploadController {

    private final B2FileUploadService b2FileUploadService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<Map<String, Object>>> uploadFile(
            @RequestParam("file") MultipartFile file) {
        
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("about:blank", "File upload failed", 400, "File is empty"));
            }

            // Upload the file to B2
            String fileKey = b2FileUploadService.uploadFile(file);

            // Prepare success response
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("fileKey", fileKey);
            responseData.put("originalFilename", file.getOriginalFilename());
            responseData.put("size", file.getSize());
            responseData.put("contentType", file.getContentType());

            log.info("File uploaded successfully: {}", fileKey);

            return ResponseEntity.ok(ApiResponse.success(responseData));
        } catch (FileUploadException e) {
            log.error("Error uploading file: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("about:blank", "File upload failed", 500, e.getMessage()));
        }
    }

    @PostMapping("/upload-public")
    public ResponseEntity<ApiResponse<Map<String, Object>>> uploadFilePublic(
            @RequestParam("file") MultipartFile file) {
        
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("about:blank", "File upload failed", 400, "File is empty"));
            }

            // Upload the file to B2 and get public URL
            String publicUrl = b2FileUploadService.uploadFileWithPublicUrl(file);

            // Prepare success response
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("publicUrl", publicUrl);
            responseData.put("originalFilename", file.getOriginalFilename());
            responseData.put("size", file.getSize());
            responseData.put("contentType", file.getContentType());

            log.info("File uploaded successfully with public access: {}", publicUrl);

            return ResponseEntity.ok(ApiResponse.success(responseData));
        } catch (FileUploadException e) {
            log.error("Error uploading file: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("about:blank", "File upload failed", 500, e.getMessage()));
        }
    }
}