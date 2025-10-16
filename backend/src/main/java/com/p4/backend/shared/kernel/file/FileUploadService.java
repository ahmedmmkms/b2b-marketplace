package com.p4.backend.shared.kernel.file;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
    String uploadFile(MultipartFile file) throws FileUploadException;
    String uploadFileWithPublicUrl(MultipartFile file) throws FileUploadException;
}