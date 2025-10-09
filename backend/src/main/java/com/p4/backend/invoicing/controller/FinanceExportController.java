package com.p4.backend.invoicing.controller;

import com.p4.backend.invoicing.service.FinanceExportService;
import com.p4.backend.shared.config.FeatureFlagsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/invoicing/exports")
public class FinanceExportController {
    
    private static final Logger log = LoggerFactory.getLogger(FinanceExportController.class);
    
    private final FinanceExportService financeExportService;
    private final FeatureFlagsService featureFlagsService;
    
    public FinanceExportController(FinanceExportService financeExportService, FeatureFlagsService featureFlagsService) {
        this.financeExportService = financeExportService;
        this.featureFlagsService = featureFlagsService;
    }

    @GetMapping(value = "/invoices-csv", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<byte[]> exportInvoicesToCsv(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        if (!featureFlagsService.isInvoiceVatEnabled()) {
            return ResponseEntity.badRequest().build();
        }
        
        log.info("Exporting invoices to CSV for date range: {} to {}", startDate, endDate);
        
        byte[] csvData = financeExportService.exportInvoicesToCsv(startDate, endDate);
        
        String filename = "invoices_" + startDate + "_to_" + endDate + ".csv";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csvData);
    }

    @GetMapping(value = "/invoices-json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> exportInvoicesToJson(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        if (!featureFlagsService.isInvoiceVatEnabled()) {
            return ResponseEntity.badRequest().build();
        }
        
        log.info("Exporting invoices to JSON for date range: {} to {}", startDate, endDate);
        
        byte[] jsonData = financeExportService.exportInvoicesToJson(startDate, endDate);
        
        String filename = "invoices_" + startDate + "_to_" + endDate + ".json";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonData);
    }
}