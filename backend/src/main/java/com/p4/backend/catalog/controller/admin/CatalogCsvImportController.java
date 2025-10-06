package com.p4.backend.catalog.controller.admin;

import com.p4.backend.catalog.csv.CatalogCsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/catalog")
public class CatalogCsvImportController {
    
    @Autowired
    private CatalogCsvService catalogCsvService;
    
    /**
     * Import products from a CSV file
     * This endpoint is role-gated for staging only
     */
    @PostMapping("/import")
    @PreAuthorize("hasRole('ADMIN') or hasRole('OPS')")  // Role-gated access
    public ResponseEntity<Map<String, Object>> importProducts(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "File is empty"));
        }
        
        if (!file.getContentType().equals("text/csv") && 
            !file.getOriginalFilename().toLowerCase().endsWith(".csv")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Only CSV files are allowed"));
        }
        
        try {
            var result = catalogCsvService.importProductsFromCsv(file);
            
            return ResponseEntity.ok(Map.of(
                "success", result.isSuccess(),
                "totalRows", result.getTotalRows(),
                "processedRows", result.getProcessedRows(),
                "errors", result.getErrors()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Error during import: " + e.getMessage()));
        }
    }
    
    /**
     * Download a sample CSV template
     */
    @GetMapping("/sample-template")
    @PreAuthorize("hasRole('ADMIN') or hasRole('OPS')")  // Role-gated access
    public ResponseEntity<ByteArrayResource> downloadSampleTemplate() {
        byte[] data = catalogCsvService.generateSampleCsv();
        ByteArrayResource resource = new ByteArrayResource(data);
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=sample-product-template.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(resource);
    }
}