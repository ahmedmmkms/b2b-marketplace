package com.p4.backend.rfq.controller;

import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.rfq.model.RFQCreate;
import com.p4.backend.rfq.model.RFQResponse;
import com.p4.backend.rfq.service.RFQService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/rfqs")
public class RFQController {
    
    @Autowired
    private RFQService rfqService;
    
    /**
     * Create a new RFQ
     */
    @PostMapping
    public ResponseEntity<RFQResponse> createRFQ(@Valid @RequestBody RFQCreate rfqCreate, Principal principal) {
        // TODO: Extract buyerId and buyerUserId from JWT claims in real implementation
        // For now, using the placeholder method that will be updated when security is implemented
        RFQResponse rfqResponse = rfqService.createRFQ(rfqCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body(rfqResponse);
    }
    
    /**
     * Get an RFQ by ID
     */
    @GetMapping("/{rfqId}")
    public ResponseEntity<RFQResponse> getRFQ(@PathVariable String rfqId) {
        // Validate ULID format before proceeding
        if (!ULIDGenerator.isValidULID(rfqId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST, 
                "https://api.example.com/errors/invalid-id", 
                "Invalid ID format", 
                "RFQ ID must be a valid ULID format"
            );
        }
        
        RFQResponse rfqResponse = rfqService.getRFQById(rfqId);
        return ResponseEntity.ok(rfqResponse);
    }
}