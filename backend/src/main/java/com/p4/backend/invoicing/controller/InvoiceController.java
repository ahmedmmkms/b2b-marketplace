package com.p4.backend.invoicing.controller;

import com.p4.backend.invoicing.dto.CreateCreditNoteRequest;
import com.p4.backend.invoicing.dto.CreateInvoiceRequest;
import com.p4.backend.invoicing.dto.InvoiceResponse;
import com.p4.backend.invoicing.service.InvoiceService;
import com.p4.backend.shared.config.FeatureFlagsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/invoicing")
public class InvoiceController {

    private static final Logger log = LoggerFactory.getLogger(InvoiceController.class);

    private final InvoiceService invoiceService;
    private final FeatureFlagsService featureFlagsService;
    
    public InvoiceController(InvoiceService invoiceService, FeatureFlagsService featureFlagsService) {
        this.invoiceService = invoiceService;
        this.featureFlagsService = featureFlagsService;
    }

    @PostMapping("/invoices")
    public ResponseEntity<InvoiceResponse> createInvoice(@Valid @RequestBody CreateInvoiceRequest request) {
        if (!featureFlagsService.isInvoiceVatEnabled()) {
            return ResponseEntity.badRequest().build();
        }
        
        log.info("Received request to create invoice for order: {}", request.getOrderId());
        InvoiceResponse response = invoiceService.createInvoice(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/invoices/{invoiceId}/issue")
    public ResponseEntity<InvoiceResponse> issueInvoice(@PathVariable String invoiceId) {
        if (!featureFlagsService.isInvoiceVatEnabled()) {
            return ResponseEntity.badRequest().build();
        }
        
        log.info("Received request to issue invoice: {}", invoiceId);
        InvoiceResponse response = invoiceService.issueInvoice(invoiceId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/credit-notes")
    public ResponseEntity<InvoiceResponse> createCreditNote(@Valid @RequestBody CreateCreditNoteRequest request) {
        if (!featureFlagsService.isInvoiceVatEnabled()) {
            return ResponseEntity.badRequest().build();
        }
        
        log.info("Received request to create credit note for invoice: {}", request.getInvoiceId());
        InvoiceResponse response = invoiceService.createCreditNote(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/credit-notes/{creditNoteId}/issue")
    public ResponseEntity<InvoiceResponse> issueCreditNote(@PathVariable String creditNoteId) {
        if (!featureFlagsService.isInvoiceVatEnabled()) {
            return ResponseEntity.badRequest().build();
        }
        
        log.info("Received request to issue credit note: {}", creditNoteId);
        InvoiceResponse response = invoiceService.issueCreditNote(creditNoteId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/invoices/{invoiceId}")
    public ResponseEntity<InvoiceResponse> getInvoice(@PathVariable String invoiceId) {
        if (!featureFlagsService.isInvoiceVatEnabled()) {
            return ResponseEntity.badRequest().build();
        }
        
        log.info("Retrieving invoice: {}", invoiceId);
        InvoiceResponse response = invoiceService.getInvoiceById(invoiceId);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/invoices/{invoiceId}/pdf-url")
    public ResponseEntity<String> getInvoicePdfUrl(@PathVariable String invoiceId) {
        if (!featureFlagsService.isInvoiceVatEnabled()) {
            return ResponseEntity.badRequest().build();
        }
        
        log.info("Retrieving PDF URL for invoice: {}", invoiceId);
        String signedUrl = invoiceService.getInvoicePdfSignedUrl(invoiceId);
        return ResponseEntity.ok(signedUrl);
    }
}