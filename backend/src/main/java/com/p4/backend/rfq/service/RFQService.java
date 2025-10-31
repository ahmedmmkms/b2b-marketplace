package com.p4.backend.rfq.service;

import com.p4.backend.catalog.model.Organization;
import com.p4.backend.catalog.repository.OrganizationRepository;
import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.identity.model.UserAccount;
import com.p4.backend.identity.repository.UserAccountRepository;
import com.p4.backend.rfq.model.*;
import com.p4.backend.rfq.repository.RFQLineRepository;
import com.p4.backend.rfq.repository.RFQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RFQService {
    
    @Autowired
    private RFQRepository rfqRepository;
    
    @Autowired
    private RFQLineRepository rfqLineRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    private static final String DEFAULT_BUYER_ORG_NAME = "Default Buyer Org";
    private static final String DEFAULT_BUYER_USER_EMAIL = "buyer@example.com";
    private static final String DEFAULT_BUYER_USER_FULL_NAME = "Default Buyer";
    
    /**
     * Create a new RFQ
     * @param rfqCreate Request body containing RFQ details
     * @param jwtClaims The JWT claims containing user info (should come from authentication)
     * @return Created RFQ
     */
    @Transactional
    public RFQResponse createRFQ(RFQCreate rfqCreate, Map<String, Object> jwtClaims) {
        BuyerContext buyerContext = resolveBuyerContext(jwtClaims);
        
        // Create new RFQ
        RFQ rfq = new RFQ();
        rfq.setId(ULIDGenerator.generateULID());
        rfq.setBuyerId(buyerContext.orgId());
        rfq.setBuyerUserId(buyerContext.userId());
        rfq.setTitle(rfqCreate.getTitle());
        rfq.setDescription(rfqCreate.getDescription());
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
        response.setDescription(savedRFQ.getDescription());
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
        return createRFQ(rfqCreate, Collections.emptyMap());
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
            response.setDescription(rfq.getDescription());
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
    
    /**
     * List RFQs with optional filtering
     * @param buyerId Optional buyer ID to filter by
     * @param status Optional status to filter by
     * @return List of RFQ responses
     */
    public List<RFQResponse> listRFQs(String buyerId, String status) {
        // Convert status string to enum if provided
        RFQ.Status statusEnum = null;
        if (status != null && !status.isEmpty()) {
            try {
                statusEnum = RFQ.Status.valueOf(status.toLowerCase());
            } catch (IllegalArgumentException e) {
                throw new ProblemDetailException(
                    HttpStatus.BAD_REQUEST,
                    "https://api.example.com/errors/invalid-status",
                    "Invalid status",
                    "Status must be one of: draft, issued, closed, awarded, cancelled"
                );
            }
        }
        
        // Build query based on filters
        List<RFQ> rfqs = rfqRepository.findByFilters(buyerId, statusEnum);
        
        List<RFQResponse> responses = new ArrayList<>();
        for (RFQ rfq : rfqs) {
            RFQResponse response = new RFQResponse();
            response.setId(rfq.getId());
            response.setBuyerId(rfq.getBuyerId());
            response.setTitle(rfq.getTitle());
            response.setDescription(rfq.getDescription());
            response.setNotes(rfq.getNotes());
            response.setStatus(rfq.getStatus().name());
            response.setAttachments(rfq.getAttachments() != null ? 
                convertAttachments(rfq.getAttachments()) : new ArrayList<>());
            // Note: Not including lines in the list response for performance
            // Lines can be retrieved when getting individual RFQs
            
            responses.add(response);
        }
        
        return responses;
    }

    private BuyerContext resolveBuyerContext(Map<String, Object> jwtClaims) {
        if (jwtClaims != null && !jwtClaims.isEmpty()) {
            String orgId = extractUlid(jwtClaims.get("orgId"));
            String userId = extractUlid(jwtClaims.get("userId"));

            if (orgId == null || userId == null) {
                throw unauthorizedProblem("User information not found in JWT claims");
            }

            if (!organizationRepository.existsById(orgId)) {
                throw unauthorizedProblem("Buyer organization referenced in JWT claims does not exist");
            }

            Optional<UserAccount> userAccount = userAccountRepository.findById(userId);
            if (userAccount.isEmpty() || !orgId.equals(userAccount.get().getOrgId())) {
                throw unauthorizedProblem("Buyer user referenced in JWT claims does not exist or does not belong to the organization");
            }

            return new BuyerContext(orgId, userId);
        }

        return getOrCreateDefaultBuyerContext();
    }

    private BuyerContext getOrCreateDefaultBuyerContext() {
        Organization organization = organizationRepository
            .findByName(DEFAULT_BUYER_ORG_NAME)
            .orElseGet(this::createDefaultBuyerOrganization);

        UserAccount userAccount = userAccountRepository
            .findByEmailIgnoreCase(DEFAULT_BUYER_USER_EMAIL)
            .filter(user -> organization.getId().equals(user.getOrgId()))
            .orElseGet(() -> createDefaultBuyerUser(organization.getId()));

        return new BuyerContext(organization.getId(), userAccount.getId());
    }

    private Organization createDefaultBuyerOrganization() {
        Organization organization = new Organization();
        organization.setId(ULIDGenerator.generateULID());
        organization.setName(DEFAULT_BUYER_ORG_NAME);
        organization.setRole(Organization.Role.buyer);
        organization.setIsActive(true);
        return organizationRepository.save(organization);
    }

    private UserAccount createDefaultBuyerUser(String organizationId) {
        UserAccount userAccount = new UserAccount();
        userAccount.setId(ULIDGenerator.generateULID());
        userAccount.setOrgId(organizationId);
        userAccount.setEmail(DEFAULT_BUYER_USER_EMAIL);
        userAccount.setFullName(DEFAULT_BUYER_USER_FULL_NAME);
        userAccount.setRole(UserAccount.Role.buyer);
        userAccount.setIsActive(true);
        return userAccountRepository.save(userAccount);
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

    private record BuyerContext(String orgId, String userId) {}

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
