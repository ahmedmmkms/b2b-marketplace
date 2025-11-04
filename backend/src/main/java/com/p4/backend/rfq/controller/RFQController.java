package com.p4.backend.rfq.controller;

import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.rfq.model.RFQCreate;
import com.p4.backend.rfq.model.RFQLineCreate;
import com.p4.backend.rfq.model.RFQLineDto;
import com.p4.backend.rfq.model.RFQResponse;
import com.p4.backend.rfq.service.RFQService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
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
     * List all RFQs (with optional filtering)
     */
    @GetMapping
    public ResponseEntity<List<RFQResponse>> listRFQs(
            @RequestParam(required = false) String buyerId,
            @RequestParam(required = false) String status) {
        List<RFQResponse> rfqs = rfqService.listRFQs(buyerId, status);
        return ResponseEntity.ok(rfqs);
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
    
    /**
     * Add a line to an existing RFQ
     */
    @PostMapping("/{rfqId}/lines")
    public ResponseEntity<RFQLineDto> addRFQLine(@PathVariable String rfqId, @Valid @RequestBody RFQLineCreate lineCreate) {
        // Validate ULID format before proceeding
        if (!ULIDGenerator.isValidULID(rfqId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "RFQ ID must be a valid ULID format"
            );
        }
        
        RFQLineDto rfqLine = rfqService.addRFQLine(rfqId, lineCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body(rfqLine);
    }
    
    /**
     * Issue an RFQ (transition from draft to issued)
     */
    @PostMapping("/{rfqId}/issue")
    public ResponseEntity<Void> issueRFQ(@PathVariable String rfqId) {
        // Validate ULID format before proceeding
        if (!ULIDGenerator.isValidULID(rfqId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "RFQ ID must be a valid ULID format"
            );
        }
        
        rfqService.issueRFQ(rfqId);
        return ResponseEntity.ok().build(); // 200 OK as specified in the API contract
    }
}