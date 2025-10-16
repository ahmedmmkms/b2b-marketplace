package com.p4.backend.shared.kernel.file;

import com.p4.backend.shared.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice(basePackages = "com.p4.backend.shared.kernel.file")
public class FileUploadExceptionHandler {

    @ExceptionHandler(FileUploadException.class)
    public ResponseEntity<ApiResponse<Map<String, Object>>> handleFileUploadException(FileUploadException e) {
        log.error("File upload error: {}", e.getMessage(), e);
        return ResponseEntity.internalServerError()
                .body(ApiResponse.error("about:blank", "File upload failed", 500, e.getMessage()));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponse<Map<String, Object>>> handleMaxSizeException(MaxUploadSizeExceededException e) {
        log.error("File upload size limit exceeded: {}", e.getMessage());
        return ResponseEntity.badRequest()
                .body(ApiResponse.error("about:blank", "File upload failed", 400, "File size exceeds maximum allowed size"));
    }
}