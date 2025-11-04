package com.p4.backend.quotes.controller;

import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.identity.model.UserAccount;
import com.p4.backend.quotes.dto.QuoteCreate;
import com.p4.backend.quotes.dto.QuoteResponse;
import com.p4.backend.quotes.service.QuoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rfqs/{rfqId}/quotes")
public class QuoteController {
    
    @Autowired
    private QuoteService quoteService;
    
    /**
     * Submit a quote for an RFQ (Vendor)
     */
    @PostMapping
    public ResponseEntity<QuoteResponse> submitQuote(@PathVariable String rfqId, @Valid @RequestBody QuoteCreate quoteCreate) {
        // Validate ULID format before proceeding
        if (!ULIDGenerator.isValidULID(rfqId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "RFQ ID must be a valid ULID format"
            );
        }
        
        // Validate vendor ID format in the request body
        if (quoteCreate.getVendorId() != null && !ULIDGenerator.isValidULID(quoteCreate.getVendorId())) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "Vendor ID must be a valid ULID format"
            );
        }
        
        // Extract user details from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserAccount userAccount) {
            Map<String, Object> jwtClaims = new HashMap<>();
            jwtClaims.put("orgId", userAccount.getOrgId());
            jwtClaims.put("userId", userAccount.getId());
            QuoteResponse quoteResponse = quoteService.submitQuote(rfqId, quoteCreate, jwtClaims);
            return ResponseEntity.status(HttpStatus.CREATED).body(quoteResponse);
        } else {
            throw new ProblemDetailException(
                HttpStatus.UNAUTHORIZED,
                "https://api.example.com/errors/unauthorized",
                "Unauthorized",
                "Authentication is required to submit a quote"
            );
        }
    }
    
    /**
     * List quotes for RFQ (Buyer view)
     */
    @GetMapping
    public ResponseEntity<List<QuoteResponse>> listQuotes(@PathVariable String rfqId) {
        // Validate ULID format before proceeding
        if (!ULIDGenerator.isValidULID(rfqId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "RFQ ID must be a valid ULID format"
            );
        }
        
        List<QuoteResponse> quotes = quoteService.getQuotesForRFQ(rfqId);
        return ResponseEntity.ok(quotes);
    }
}