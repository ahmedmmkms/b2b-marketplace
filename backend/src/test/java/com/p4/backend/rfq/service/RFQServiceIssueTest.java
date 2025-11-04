package com.p4.backend.rfq.service;

import com.p4.backend.catalog.model.Organization;
import com.p4.backend.catalog.repository.OrganizationRepository;
import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.identity.model.UserAccount;
import com.p4.backend.identity.repository.UserAccountRepository;
import com.p4.backend.rfq.model.RFQ;
import com.p4.backend.rfq.model.RFQLine;
import com.p4.backend.rfq.repository.RFQLineRepository;
import com.p4.backend.rfq.repository.RFQRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RFQServiceIssueTest {

    @Mock
    private RFQRepository rfqRepository;

    @Mock
    private RFQLineRepository rfqLineRepository;

    @Mock
    private OrganizationRepository organizationRepository;

    @Mock
    private UserAccountRepository userAccountRepository;

    @InjectMocks
    private RFQService rfqService;

    private String validRFQId;
    private String validBuyerId;
    private String validBuyerUserId;

    @BeforeEach
    void setUp() {
        validRFQId = ULIDGenerator.generateULID();
        validBuyerId = ULIDGenerator.generateULID();
        validBuyerUserId = ULIDGenerator.generateULID();
    }

    @Test
    void testIssueRFQSuccessfully() {
        // Arrange
        RFQ rfq = createDraftRFQ();
        when(rfqRepository.findById(validRFQId)).thenReturn(Optional.of(rfq));
        when(rfqLineRepository.findByRfqId(validRFQId)).thenReturn(List.of(createRFQLine()));
        when(rfqRepository.save(any(RFQ.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        var result = rfqService.issueRFQ(validRFQId);

        // Assert
        assertEquals(RFQ.Status.issued.name(), result.getStatus());
        verify(rfqRepository, times(1)).save(rfq);
    }

    @Test
    void testIssueRFQInvalidIdFormat() {
        // Arrange
        String invalidId = "invalid-id";

        // Act & Assert
        ProblemDetailException exception = assertThrows(
            ProblemDetailException.class,
            () -> rfqService.issueRFQ(invalidId)
        );
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    void testIssueRFQNotFound() {
        // Arrange
        when(rfqRepository.findById(validRFQId)).thenReturn(Optional.empty());

        // Act & Assert
        ProblemDetailException exception = assertThrows(
            ProblemDetailException.class,
            () -> rfqService.issueRFQ(validRFQId)
        );
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    void testIssueRFQNotInDraftStatus() {
        // Arrange
        RFQ rfq = createIssuedRFQ(); // Status is issued, not draft
        when(rfqRepository.findById(validRFQId)).thenReturn(Optional.of(rfq));

        // Act & Assert
        ProblemDetailException exception = assertThrows(
            ProblemDetailException.class,
            () -> rfqService.issueRFQ(validRFQId)
        );
        assertEquals(HttpStatus.CONFLICT, exception.getStatus());
        assertEquals("RFQ is not in draft status", exception.getDetail());
    }

    @Test
    void testIssueRFQNoLines() {
        // Arrange
        RFQ rfq = createDraftRFQ();
        when(rfqRepository.findById(validRFQId)).thenReturn(Optional.of(rfq));
        when(rfqLineRepository.findByRfqId(validRFQId)).thenReturn(List.of()); // No lines

        // Act & Assert
        ProblemDetailException exception = assertThrows(
            ProblemDetailException.class,
            () -> rfqService.issueRFQ(validRFQId)
        );
        assertEquals(HttpStatus.CONFLICT, exception.getStatus());
        assertEquals("RFQ has no lines", exception.getDetail());
    }

    private RFQ createDraftRFQ() {
        RFQ rfq = new RFQ();
        rfq.setId(validRFQId);
        rfq.setBuyerId(validBuyerId);
        rfq.setBuyerUserId(validBuyerUserId);
        rfq.setTitle("Test RFQ");
        rfq.setStatus(RFQ.Status.draft);
        rfq.setCreatedAt(OffsetDateTime.now());
        rfq.setUpdatedAt(OffsetDateTime.now());
        return rfq;
    }

    private RFQ createIssuedRFQ() {
        RFQ rfq = createDraftRFQ();
        rfq.setStatus(RFQ.Status.issued);
        return rfq;
    }

    private RFQLine createRFQLine() {
        RFQLine line = new RFQLine();
        line.setId(ULIDGenerator.generateULID());
        line.setRfqId(validRFQId);
        line.setDescription("Test line");
        line.setQuantity(BigDecimal.valueOf(10));
        line.setUom("units");
        return line;
    }
}