package com.p4.backend.rfq.service;

import com.p4.backend.catalog.model.Organization;
import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.rfq.model.*;
import com.p4.backend.rfq.repository.RFQLineRepository;
import com.p4.backend.rfq.repository.RFQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RFQService {
    
    @Autowired
    private RFQRepository rfqRepository;
    
    @Autowired
    private RFQLineRepository rfqLineRepository;
    
    /**
     * Create a new RFQ
     * @param rfqCreate Request body containing RFQ details
     * @param jwtClaims The JWT claims containing user info (should come from authentication)
     * @return Created RFQ
     */
    @Transactional
    public RFQResponse createRFQ(RFQCreate rfqCreate, Map<String, Object> jwtClaims) {
        // Extract user information from JWT claims
        String buyerId = (String) jwtClaims.get("orgId"); // Organization ID from JWT
        String buyerUserId = (String) jwtClaims.get("userId"); // User ID from JWT
        
        if (buyerId == null || buyerUserId == null) {
            throw new ProblemDetailException(
                HttpStatus.UNAUTHORIZED, 
                "https://api.example.com/errors/unauthorized", 
                "Unauthorized", 
                "User information not found in JWT claims"
            );
        }
        
        // Create new RFQ
        RFQ rfq = new RFQ();
        rfq.setId(ULIDGenerator.generateULID());
        rfq.setBuyerId(buyerId);
        rfq.setBuyerUserId(buyerUserId);
        rfq.setTitle(rfqCreate.getTitle());
        rfq.setNotes(rfqCreate.getNotes());
        rfq.setStatus(RFQ.Status.draft);
        rfq.setAttachments(new ArrayList<>()); // Initialize with empty list
        
        RFQ savedRFQ = rfqRepository.save(rfq);
        
        // Handle lines if provided
        List<RFQLineDto> rfqLines = new ArrayList<>();
        if (rfqCreate.getLines() != null && !rfqCreate.getLines().isEmpty()) {
            for (RFQLineCreate lineCreate : rfqCreate.getLines()) {
                RFQLine line = new RFQLine();
                line.setId(ULIDGenerator.generateULID());
                line.setRfqId(savedRFQ.getId());
                line.setProductId(lineCreate.getProductId());
                line.setDescription(lineCreate.getDescription());
                line.setQuantity(lineCreate.getQuantity());
                line.setUom(lineCreate.getUom());
                line.setTargetPrice(lineCreate.getTargetPrice());
                
                RFQLine savedLine = rfqLineRepository.save(line);
                
                // Convert to DTO
                RFQLineDto dto = new RFQLineDto();
                dto.setId(savedLine.getId());
                dto.setProductId(savedLine.getProductId());
                dto.setDescription(savedLine.getDescription());
                dto.setQuantity(savedLine.getQuantity());
                dto.setUom(savedLine.getUom());
                dto.setTargetPrice(savedLine.getTargetPrice());
                
                rfqLines.add(dto);
            }
        }
        
        // Build response
        RFQResponse response = new RFQResponse();
        response.setId(savedRFQ.getId());
        response.setBuyerId(savedRFQ.getBuyerId());
        response.setTitle(savedRFQ.getTitle());
        response.setNotes(savedRFQ.getNotes());
        response.setStatus(savedRFQ.getStatus().name());
        response.setAttachments(savedRFQ.getAttachments() != null ? 
            convertAttachments(savedRFQ.getAttachments()) : new ArrayList<>());
        response.setLines(rfqLines);
        
        return response;
    }
    
    /**
     * Create a new RFQ with placeholder method for now (will be called with extracted claims)
     * @param rfqCreate Request body containing RFQ details
     * @return Created RFQ
     */
    @Transactional
    public RFQResponse createRFQ(RFQCreate rfqCreate) {
        // In a real implementation, this would get JWT claims from the security context
        // For now, using placeholders to demonstrate the flow
        Map<String, Object> jwtClaims = Map.of(
            "orgId", "PLACEHOLDER_BUYER_ID",
            "userId", "PLACEHOLDER_BUYER_USER_ID"
        );
        return createRFQ(rfqCreate, jwtClaims);
    }
    
    /**
     * Get RFQ by ID
     * @param rfqId RFQ ID (ULID)
     * @return RFQ if found
     */
    public RFQResponse getRFQById(String rfqId) {
        // Validate ULID format before querying database
        if (!ULIDGenerator.isValidULID(rfqId)) {
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST, 
                "https://api.example.com/errors/invalid-id", 
                "Invalid ID format", 
                "RFQ ID must be a valid ULID format"
            );
        }
        
        Optional<RFQ> rfqOpt = rfqRepository.findById(rfqId);
        
        if (rfqOpt.isPresent()) {
            RFQ rfq = rfqOpt.get();
            
            // Get associated lines
            List<RFQLineDto> lines = new ArrayList<>();
            List<com.p4.backend.rfq.model.RFQLine> dbLines = rfqLineRepository.findByRfqId(rfqId);
            for (com.p4.backend.rfq.model.RFQLine dbLine : dbLines) {
                RFQLineDto dto = new RFQLineDto();
                dto.setId(dbLine.getId());
                dto.setProductId(dbLine.getProductId());
                dto.setDescription(dbLine.getDescription());
                dto.setQuantity(dbLine.getQuantity());
                dto.setUom(dbLine.getUom());
                dto.setTargetPrice(dbLine.getTargetPrice());
                lines.add(dto);
            }
            
            // Build response
            RFQResponse response = new RFQResponse();
            response.setId(rfq.getId());
            response.setBuyerId(rfq.getBuyerId());
            response.setTitle(rfq.getTitle());
            response.setNotes(rfq.getNotes());
            response.setStatus(rfq.getStatus().name());
            response.setAttachments(rfq.getAttachments() != null ? 
                convertAttachments(rfq.getAttachments()) : new ArrayList<>());
            response.setLines(lines);
            
            return response;
        } else {
            throw new ProblemDetailException(
                HttpStatus.NOT_FOUND, 
                "https://api.example.com/errors/rfq-not-found", 
                "RFQ not found", 
                "RFQ with id '" + rfqId + "' does not exist"
            );
        }
    }
    
    private List<Attachment> convertAttachments(List<java.util.Map<String, Object>> attachmentsMap) {
        List<Attachment> attachments = new ArrayList<>();
        if (attachmentsMap != null) {
            for (java.util.Map<String, Object> attachmentMap : attachmentsMap) {
                Attachment attachment = new Attachment();
                attachment.setKey((String) attachmentMap.get("key"));
                attachment.setUrl((String) attachmentMap.get("url"));
                attachment.setFilename((String) attachmentMap.get("filename"));
                attachments.add(attachment);
            }
        }
        return attachments;
    }
}