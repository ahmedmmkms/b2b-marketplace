package com.p4.backend.quotes.service;

import com.p4.backend.catalog.model.Organization;
import com.p4.backend.catalog.repository.OrganizationRepository;
import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.identity.model.UserAccount;
import com.p4.backend.identity.repository.UserAccountRepository;
import com.p4.backend.quotes.dto.QuoteCreate;
import com.p4.backend.quotes.dto.QuoteLineCreate;
import com.p4.backend.quotes.dto.QuoteLineResponse;
import com.p4.backend.quotes.dto.QuoteResponse;
import com.p4.backend.quotes.model.Quote;
import com.p4.backend.quotes.model.QuoteLine;
import com.p4.backend.quotes.repository.QuoteLineRepository;
import com.p4.backend.quotes.repository.QuoteRepository;
import com.p4.backend.rfq.model.RFQ;
import com.p4.backend.rfq.model.RFQLine;
import com.p4.backend.rfq.repository.RFQLineRepository;
import com.p4.backend.rfq.repository.RFQRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class QuoteService {
    
    @Autowired
    private QuoteRepository quoteRepository;
    
    @Autowired
    private QuoteLineRepository quoteLineRepository;
    
    @Autowired
    private RFQRepository rfqRepository;
    
    @Autowired
    private RFQLineRepository rfqLineRepository;
    
    @Autowired
    private OrganizationRepository organizationRepository;
    
    @Autowired
    private UserAccountRepository userAccountRepository;

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Submit a quote for an RFQ
     * @param rfqId The ID of the RFQ to submit a quote for
     * @param quoteCreate Request body containing quote details
     * @param jwtClaims The JWT claims containing user info (should come from authentication)
     * @return Created quote response
     */
    @Transactional
    public QuoteResponse submitQuote(String rfqId, QuoteCreate quoteCreate, Map<String, Object> jwtClaims) {
        // Validate ULID format before querying database
        if (!ULIDGenerator.isValidULID(rfqId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "RFQ ID must be a valid ULID format"
            );
        }
        
        // Validate vendor ID format
        if (!ULIDGenerator.isValidULID(quoteCreate.getVendorId())) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "Vendor ID must be a valid ULID format"
            );
        }
        
        // Check if the RFQ exists
        Optional<RFQ> rfqOpt = rfqRepository.findById(rfqId);
        if (rfqOpt.isEmpty()) {
            throw new ProblemDetailException(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/rfq-not-found",
                "RFQ not found",
                "RFQ with id '" + rfqId + "' does not exist"
            );
        }
        
        RFQ rfq = rfqOpt.get();
        
        // Check if the RFQ is in 'issued' status (only issued RFQs can receive quotes)
        if (rfq.getStatus() != RFQ.Status.issued) {
            throw new ProblemDetailException(
                HttpStatus.CONFLICT,
                "https://api.example.com/errors/rfq-invalid-state", 
                "RFQ is not in issued status",
                "Quotes can only be submitted for issued RFQs"
            );
        }
        
        // Verify vendor authorization - check if the authenticated vendor matches the one in the request
        VendorContext vendorContext = resolveVendorContext(jwtClaims);
        if (!vendorContext.orgId().equals(quoteCreate.getVendorId())) {
            throw new ProblemDetailException(
                HttpStatus.FORBIDDEN,
                "https://api.example.com/errors/forbidden",
                "Forbidden",
                "You are not authorized to submit a quote for this vendor"
            );
        }
        
        // Check if a quote already exists for this vendor and RFQ (one quote per vendor per RFQ)
        Optional<Quote> existingQuoteOpt = quoteRepository.findByRfqIdAndVendorId(rfqId, quoteCreate.getVendorId());
        if (existingQuoteOpt.isPresent()) {
            throw new ProblemDetailException(
                HttpStatus.CONFLICT,
                "https://api.example.com/errors/quote-already-exists",
                "Quote already exists",
                "A quote already exists for this vendor and RFQ"
            );
        }
        
        // Validate that the vendor exists
        if (!organizationRepository.existsById(quoteCreate.getVendorId())) {
            throw new ProblemDetailException(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/vendor-not-found",
                "Vendor not found",
                "Vendor with id '" + quoteCreate.getVendorId() + "' does not exist"
            );
        }
        
        // Validate quote create data
        if (quoteCreate.getLines() == null || quoteCreate.getLines().isEmpty()) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/quote-no-lines",
                "Quote has no lines",
                "Quote must have at least one line"
            );
        }
        
        // Validate each quote line
        List<RFQLine> rfqLines = rfqLineRepository.findByRfqId(rfqId);
        for (QuoteLineCreate quoteLineCreate : quoteCreate.getLines()) {
            // Validate ULID format for RFQ line ID
            if (!ULIDGenerator.isValidULID(quoteLineCreate.getRfqLineId())) {
                throw new ProblemDetailException(
                    HttpStatus.BAD_REQUEST,
                    "https://api.example.com/errors/invalid-id",
                    "Invalid ID format",
                    "RFQ Line ID must be a valid ULID format"
                );
            }
            
            // Check if the RFQ line exists and belongs to the RFQ
            boolean rfqLineExists = rfqLines.stream()
                .anyMatch(rfqLine -> quoteLineCreate.getRfqLineId().equals(rfqLine.getId()));
            if (!rfqLineExists) {
                throw new ProblemDetailException(
                    HttpStatus.BAD_REQUEST,
                    "https://api.example.com/errors/rfq-line-not-found",
                    "RFQ Line not found",
                    "RFQ Line with id '" + quoteLineCreate.getRfqLineId() + "' does not exist in this RFQ"
                );
            }
            
            // Validate quantity
            if (quoteLineCreate.getQuantity() == null || quoteLineCreate.getQuantity().compareTo(BigDecimal.ZERO) <= 0) {
                throw new ProblemDetailException(
                    HttpStatus.BAD_REQUEST,
                    "https://api.example.com/errors/invalid-quantity",
                    "Invalid quantity",
                    "Quantity must be greater than 0"
                );
            }
            
            // Validate unit of measure
            if (quoteLineCreate.getUom() == null || quoteLineCreate.getUom().trim().isEmpty()) {
                throw new ProblemDetailException(
                    HttpStatus.BAD_REQUEST,
                    "https://api.example.com/errors/invalid-uom",
                    "Invalid unit of measure",
                    "Unit of measure cannot be empty"
                );
            }
            
            // Validate unit price
            if (quoteLineCreate.getUnitPrice() == null || quoteLineCreate.getUnitPrice().compareTo(BigDecimal.ZERO) < 0) {
                throw new ProblemDetailException(
                    HttpStatus.BAD_REQUEST,
                    "https://api.example.com/errors/invalid-unit-price",
                    "Invalid unit price",
                    "Unit price cannot be negative"
                );
            }
        }
        
        // Create the quote
        Quote quote = new Quote();
        quote.setId(ULIDGenerator.generateULID());
        quote.setRfqId(rfqId);
        quote.setVendorId(quoteCreate.getVendorId());
        quote.setVendorUserId(vendorContext.userId()); // Use authenticated user ID
        quote.setCurrency(quoteCreate.getCurrency());
        quote.setValidUntil(quoteCreate.getValidUntil());
        quote.setNotes(quoteCreate.getNotes());
        quote.setStatus(Quote.Status.submitted);
        
        // Calculate totals and prepare quote lines
        List<QuoteLine> quoteLinesToPersist = new ArrayList<>();
        List<QuoteLineResponse> quoteLineResponses = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;
        
        for (QuoteLineCreate quoteLineCreate : quoteCreate.getLines()) {
            // Calculate line total
            BigDecimal lineTotal = quoteLineCreate.getQuantity().multiply(quoteLineCreate.getUnitPrice());
            
            // Create quote line
            QuoteLine quoteLine = new QuoteLine();
            quoteLine.setId(ULIDGenerator.generateULID());
            quoteLine.setQuoteId(quote.getId());
            quoteLine.setRfqLineId(quoteLineCreate.getRfqLineId());
            quoteLine.setProductId(quoteLineCreate.getProductId());
            quoteLine.setDescription(quoteLineCreate.getDescription());
            quoteLine.setQuantity(quoteLineCreate.getQuantity());
            quoteLine.setUom(quoteLineCreate.getUom());
            quoteLine.setUnitPrice(quoteLineCreate.getUnitPrice());
            quoteLine.setLineTotal(lineTotal);
            quoteLine.setMoq(quoteLineCreate.getMoq());
            quoteLine.setLeadTimeDays(quoteLineCreate.getLeadTimeDays());
            
            quoteLinesToPersist.add(quoteLine);
            
            // Add to subtotal
            subtotal = subtotal.add(lineTotal);
            
            // Convert to response DTO
            QuoteLineResponse quoteLineResponse = new QuoteLineResponse();
            quoteLineResponse.setId(quoteLine.getId());
            quoteLineResponse.setRfqLineId(quoteLine.getRfqLineId());
            quoteLineResponse.setProductId(quoteLine.getProductId());
            quoteLineResponse.setDescription(quoteLine.getDescription());
            quoteLineResponse.setQuantity(quoteLine.getQuantity());
            quoteLineResponse.setUom(quoteLine.getUom());
            quoteLineResponse.setUnitPrice(quoteLine.getUnitPrice());
            quoteLineResponse.setLineTotal(quoteLine.getLineTotal());
            quoteLineResponse.setMoq(quoteLine.getMoq());
            quoteLineResponse.setLeadTimeDays(quoteLine.getLeadTimeDays());
            
            quoteLineResponses.add(quoteLineResponse);
        }
        
        // Set calculated totals on the quote
        quote.setSubtotal(subtotal);
        quote.setTaxTotal(BigDecimal.ZERO); // Initially zero, can be set later based on business rules
        quote.setGrandTotal(subtotal);
        
        Quote savedQuote = quoteRepository.save(quote);
        quoteLineRepository.saveAll(quoteLinesToPersist);
        
        // Build response
        QuoteResponse response = new QuoteResponse();
        response.setId(savedQuote.getId());
        response.setRfqId(savedQuote.getRfqId());
        response.setVendorId(savedQuote.getVendorId());
        response.setCurrency(savedQuote.getCurrency());
        response.setValidUntil(savedQuote.getValidUntil());
        response.setStatus(savedQuote.getStatus().name());
        response.setSubtotal(savedQuote.getSubtotal());
        response.setTaxTotal(savedQuote.getTaxTotal());
        response.setGrandTotal(savedQuote.getGrandTotal());
        response.setLines(quoteLineResponses);
        
        return response;
    }

    /**
     * Create a new quote with placeholder method for now (will be called with extracted claims)
     * @param rfqId The ID of the RFQ to submit a quote for
     * @param quoteCreate Request body containing quote details
     * @return Created quote response
     */
    @Transactional
    public QuoteResponse submitQuote(String rfqId, QuoteCreate quoteCreate) {
        // Extract user details from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserAccount userAccount) {
            Map<String, Object> jwtClaims = new HashMap<>();
            jwtClaims.put("orgId", userAccount.getOrgId());
            jwtClaims.put("userId", userAccount.getId());
            return submitQuote(rfqId, quoteCreate, jwtClaims);
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
     * Get quotes for an RFQ (for buyer view)
     * @param rfqId The ID of the RFQ
     * @return List of quotes ordered by grand total ascending
     */
    public List<QuoteResponse> getQuotesForRFQ(String rfqId) {
        // Validate ULID format before querying database
        if (!ULIDGenerator.isValidULID(rfqId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "RFQ ID must be a valid ULID format"
            );
        }
        
        // Check if the RFQ exists
        Optional<RFQ> rfqOpt = rfqRepository.findById(rfqId);
        if (rfqOpt.isEmpty()) {
            throw new ProblemDetailException(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/rfq-not-found",
                "RFQ not found",
                "RFQ with id '" + rfqId + "' does not exist"
            );
        }
        
        RFQ rfq = rfqOpt.get();
        
        ensureBuyerAccess(rfq);
        
        // Get quotes for the RFQ ordered by grand total ascending
        List<Quote> quotes = quoteRepository.findByRfqIdOrderByGrandTotalAsc(rfqId);
        
        List<QuoteResponse> responses = new ArrayList<>();
        for (Quote quote : quotes) {
            QuoteResponse response = buildQuoteResponse(quote);
            responses.add(response);
        }
        
        return responses;
    }

    /**
     * Get a specific quote for an RFQ
     * @param rfqId The ID of the RFQ
     * @param quoteId The ID of the quote to retrieve
     * @return Quote response with line details
     */
    public QuoteResponse getQuoteForRFQ(String rfqId, String quoteId) {
        // Validate ULID formats before querying database
        if (!ULIDGenerator.isValidULID(rfqId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "RFQ ID must be a valid ULID format"
            );
        }

        if (!ULIDGenerator.isValidULID(quoteId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "Quote ID must be a valid ULID format"
            );
        }

        // Ensure the RFQ exists
        RFQ rfq = rfqRepository.findById(rfqId).orElseThrow(() -> new ProblemDetailException(
            HttpStatus.NOT_FOUND,
            "https://api.example.com/errors/rfq-not-found",
            "RFQ not found",
            "RFQ with id '" + rfqId + "' does not exist"
        ));

        ensureBuyerAccess(rfq);

        // Locate the quote for this RFQ
        Quote quote = quoteRepository.findByIdAndRfqId(quoteId, rfqId).orElseThrow(() -> new ProblemDetailException(
            HttpStatus.NOT_FOUND,
            "https://api.example.com/errors/quote-not-found",
            "Quote not found",
            "Quote with id '" + quoteId + "' does not exist for this RFQ"
        ));

        return buildQuoteResponse(quote);
    }
    
    private QuoteResponse buildQuoteResponse(Quote quote) {
        // Get associated quote lines
        List<QuoteLine> quoteLines = quoteLineRepository.findByQuoteId(quote.getId());
        
        List<QuoteLineResponse> quoteLineResponses = new ArrayList<>();
        for (QuoteLine quoteLine : quoteLines) {
            QuoteLineResponse dto = new QuoteLineResponse();
            dto.setId(quoteLine.getId());
            dto.setRfqLineId(quoteLine.getRfqLineId());
            dto.setProductId(quoteLine.getProductId());
            dto.setDescription(quoteLine.getDescription());
            dto.setQuantity(quoteLine.getQuantity());
            dto.setUom(quoteLine.getUom());
            dto.setUnitPrice(quoteLine.getUnitPrice());
            dto.setLineTotal(quoteLine.getLineTotal());
            dto.setMoq(quoteLine.getMoq());
            dto.setLeadTimeDays(quoteLine.getLeadTimeDays());
            quoteLineResponses.add(dto);
        }
        
        // Build response
        QuoteResponse response = new QuoteResponse();
        response.setId(quote.getId());
        response.setRfqId(quote.getRfqId());
        response.setVendorId(quote.getVendorId());
        response.setCurrency(quote.getCurrency());
        response.setValidUntil(quote.getValidUntil());
        response.setStatus(quote.getStatus().name());
        response.setSubtotal(quote.getSubtotal());
        response.setTaxTotal(quote.getTaxTotal());
        response.setGrandTotal(quote.getGrandTotal());
        response.setNotes(quote.getNotes());
        response.setLines(quoteLineResponses);
        
        return response;
    }
    
    /**
     * Accept a quote for an RFQ
     * @param rfqId The ID of the RFQ
     * @param quoteId The ID of the quote to accept
     */
    @Transactional
    public void acceptQuote(String rfqId, String quoteId) {
        // Validate ULID formats before querying database
        if (!ULIDGenerator.isValidULID(rfqId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "RFQ ID must be a valid ULID format"
            );
        }
        
        if (!ULIDGenerator.isValidULID(quoteId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "Quote ID must be a valid ULID format"
            );
        }
        
        // Check if the RFQ exists
        Optional<RFQ> rfqOpt = rfqRepository.findById(rfqId);
        if (rfqOpt.isEmpty()) {
            throw new ProblemDetailException(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/rfq-not-found",
                "RFQ not found",
                "RFQ with id '" + rfqId + "' does not exist"
            );
        }
        
        RFQ rfq = rfqOpt.get();
        
        // Check if the quote exists and belongs to the RFQ
        Optional<Quote> quoteOpt = quoteRepository.findByIdAndRfqId(quoteId, rfqId);
        if (quoteOpt.isEmpty()) {
            throw new ProblemDetailException(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/quote-not-found",
                "Quote not found",
                "Quote with id '" + quoteId + "' does not exist for this RFQ"
            );
        }
        
        Quote quoteToAccept = quoteOpt.get();
        
        // Verify that the current authenticated user is from the buyer organization
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserAccount userAccount) {
            // Check if the authenticated user belongs to the buyer organization
            if (!rfq.getBuyerId().equals(userAccount.getOrgId())) {
                throw new ProblemDetailException(
                    HttpStatus.FORBIDDEN,
                    "https://api.example.com/errors/forbidden",
                    "Forbidden",
                    "You are not authorized to accept a quote for this RFQ"
                );
            }
        } else {
            throw new ProblemDetailException(
                HttpStatus.UNAUTHORIZED,
                "https://api.example.com/errors/unauthorized",
                "Unauthorized",
                "Authentication is required to accept a quote"
            );
        }
        
        // Check if the RFQ is in a valid state for quote acceptance (should be 'issued' or 'awarded' but not already 'awarded')
        if (rfq.getStatus() == RFQ.Status.awarded) {
            // Idempotent behavior: if already awarded with same accepted quote, return successfully
            if (quoteToAccept.getStatus() == Quote.Status.accepted) {
                return; // Already accepted, operation is idempotent
            } else {
                throw new ProblemDetailException(
                    HttpStatus.CONFLICT,
                    "https://api.example.com/errors/rfq-already-awarded",
                    "RFQ already awarded",
                    "This RFQ has already been awarded to another quote"
                );
            }
        } else if (rfq.getStatus() != RFQ.Status.issued) {
            throw new ProblemDetailException(
                HttpStatus.CONFLICT,
                "https://api.example.com/errors/rfq-invalid-state",
                "RFQ is not in valid state for acceptance",
                "RFQ must be in 'issued' status to accept a quote"
            );
        }
        
        // Check if the quote is already accepted (idempotent behavior)
        if (quoteToAccept.getStatus() == Quote.Status.accepted) {
            // If the quote is already accepted and RFQ is awarded, this is idempotent
            if (rfq.getStatus() == RFQ.Status.awarded) {
                return; // Already in correct state, operation is idempotent
            }
        }
        
        // Update all quotes for this RFQ: accepted quote becomes 'accepted', others become 'rejected'
        List<Quote> allQuotesForRfq = quoteRepository.findByRfqId(rfqId);
        for (Quote quote : allQuotesForRfq) {
            if (quote.getId().equals(quoteId)) {
                quote.setStatus(Quote.Status.accepted);
            } else {
                quote.setStatus(Quote.Status.rejected);
            }
            quoteRepository.save(quote);
        }
        
        // Update RFQ status to 'awarded'
        rfq.setStatus(RFQ.Status.awarded);
        rfqRepository.save(rfq);
    }

    private void ensureBuyerAccess(RFQ rfq) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserAccount userAccount) {
            if (!rfq.getBuyerId().equals(userAccount.getOrgId())) {
                throw new ProblemDetailException(
                    HttpStatus.FORBIDDEN,
                    "https://api.example.com/errors/forbidden",
                    "Forbidden",
                    "You are not authorized to view quotes for this RFQ"
                );
            }
        } else {
            throw new ProblemDetailException(
                HttpStatus.UNAUTHORIZED,
                "https://api.example.com/errors/unauthorized",
                "Unauthorized",
                "Authentication is required to view quotes for an RFQ"
            );
        }
    }
    
    private VendorContext resolveVendorContext(Map<String, Object> jwtClaims) {
        // First try to use the provided JWT claims if available (backward compatibility)
        if (jwtClaims != null && !jwtClaims.isEmpty()) {
            String orgId = extractUlid(jwtClaims.get("orgId"));
            String userId = extractUlid(jwtClaims.get("userId"));

            if (orgId != null && userId != null) {
                // Check if org is a vendor
                Optional<Organization> organization = organizationRepository.findById(orgId);
                if (organization.isEmpty() || organization.get().getRole() != Organization.Role.vendor) {
                    throw unauthorizedProblem("Organization is not a vendor");
                }

                if (!organizationRepository.existsById(orgId)) {
                    throw unauthorizedProblem("Vendor organization referenced in JWT claims does not exist");
                }

                Optional<UserAccount> userAccount = userAccountRepository.findById(userId);
                if (userAccount.isEmpty() || !orgId.equals(userAccount.get().getOrgId())) {
                    throw unauthorizedProblem("Vendor user referenced in JWT claims does not exist or does not belong to the organization");
                }

                return new VendorContext(orgId, userId);
            }
        }
        
        // If no valid JWT claims provided, extract from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserAccount userAccount) {
            String orgId = userAccount.getOrgId();
            String userId = userAccount.getId();
            
            // Verify the user's organization is a vendor
            Optional<Organization> organization = organizationRepository.findById(orgId);
            if (organization.isEmpty()) {
                throw unauthorizedProblem("Organization does not exist");
            }
            if (organization.get().getRole() != Organization.Role.vendor) {
                throw unauthorizedProblem("User does not belong to a vendor organization");
            }

            return new VendorContext(orgId, userId);
        }

        return getOrCreateDefaultVendorContext();
    }

    private VendorContext getOrCreateDefaultVendorContext() {
        // In the real implementation, this would require proper authentication
        // For now, returning a placeholder
        throw new ProblemDetailException(
            HttpStatus.UNAUTHORIZED,
            "https://api.example.com/errors/unauthorized",
            "Unauthorized",
            "Authentication is required to submit a quote"
        );
    }

    private String extractUlid(Object value) {
        if (value instanceof String str && ULIDGenerator.isValidULID(str)) {
            return str;
        }
        return null;
    }

    private ProblemDetailException unauthorizedProblem(String detail) {
        return new ProblemDetailException(
            HttpStatus.UNAUTHORIZED,
            "https://api.example.com/errors/unauthorized",
            "Unauthorized",
            detail
        );
    }

    private record VendorContext(String orgId, String userId) {}
}
