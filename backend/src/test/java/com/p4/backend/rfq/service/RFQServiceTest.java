package com.p4.backend.rfq.service;

import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.rfq.model.*;
import com.p4.backend.rfq.repository.RFQLineRepository;
import com.p4.backend.rfq.repository.RFQRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RFQServiceTest {

    @Mock
    private RFQRepository rfqRepository;

    @Mock
    private RFQLineRepository rfqLineRepository;

    private RFQService rfqService;

    @BeforeEach
    void setUp() {
        rfqService = new RFQService();
        ReflectionTestUtils.setField(rfqService, "rfqRepository", rfqRepository);
        ReflectionTestUtils.setField(rfqService, "rfqLineRepository", rfqLineRepository);
    }

    @Test
    void testCreateRFQ_Success() {
        // Arrange
        RFQCreate rfqCreate = new RFQCreate();
        rfqCreate.setTitle("Test RFQ");
        rfqCreate.setDescription("Test Description");
        rfqCreate.setNotes("Test Notes");

        RFQ savedRFQ = new RFQ();
        savedRFQ.setId(ULIDGenerator.generateULID());
        savedRFQ.setBuyerId("PLACEHOLDER_BUYER_ID");
        savedRFQ.setBuyerUserId("PLACEHOLDER_BUYER_USER_ID");
        savedRFQ.setTitle("Test RFQ");
        savedRFQ.setDescription("Test Description");
        savedRFQ.setNotes("Test Notes");
        savedRFQ.setStatus(RFQ.Status.draft);

        when(rfqRepository.save(any(RFQ.class))).thenReturn(savedRFQ);

        // Act
        RFQResponse result = rfqService.createRFQ(rfqCreate);

        // Assert
        assertNotNull(result.getId());
        assertEquals("PLACEHOLDER_BUYER_ID", result.getBuyerId());
        assertEquals("Test RFQ", result.getTitle());
        assertEquals("Test Description", result.getDescription());
        assertEquals("Test Notes", result.getNotes());
        assertEquals("draft", result.getStatus());
        verify(rfqRepository).save(any(RFQ.class));
    }

    @Test
    void testCreateRFQ_WithLines() {
        // Arrange
        RFQCreate rfqCreate = new RFQCreate();
        rfqCreate.setTitle("Test RFQ");
        rfqCreate.setDescription("Test Description");
        
        RFQLineCreate lineCreate = new RFQLineCreate();
        lineCreate.setDescription("Test Line");
        lineCreate.setQuantity(BigDecimal.valueOf(10));
        lineCreate.setUom("EA");
        rfqCreate.setLines(Arrays.asList(lineCreate));

        RFQ savedRFQ = new RFQ();
        savedRFQ.setId(ULIDGenerator.generateULID());
        savedRFQ.setBuyerId("PLACEHOLDER_BUYER_ID");
        savedRFQ.setBuyerUserId("PLACEHOLDER_BUYER_USER_ID");
        savedRFQ.setTitle("Test RFQ");
        savedRFQ.setDescription("Test Description");
        savedRFQ.setStatus(RFQ.Status.draft);

        RFQLine savedLine = new RFQLine();
        savedLine.setId(ULIDGenerator.generateULID());
        savedLine.setRfqId(savedRFQ.getId());
        savedLine.setDescription("Test Line");
        savedLine.setQuantity(BigDecimal.valueOf(10));
        savedLine.setUom("EA");

        when(rfqRepository.save(any(RFQ.class))).thenReturn(savedRFQ);
        when(rfqLineRepository.save(any(RFQLine.class))).thenReturn(savedLine);
        when(rfqLineRepository.findByRfqId(eq(savedRFQ.getId()))).thenReturn(Arrays.asList(savedLine));

        // Act
        RFQResponse result = rfqService.createRFQ(rfqCreate);

        // Assert
        assertNotNull(result.getId());
        assertEquals("Test RFQ", result.getTitle());
        assertEquals("Test Description", result.getDescription());
        assertNotNull(result.getLines());
        assertEquals(1, result.getLines().size());
        verify(rfqRepository).save(any(RFQ.class));
        verify(rfqLineRepository).save(any(RFQLine.class));
    }

    @Test
    void testGetRFQById_ExistingRFQ() {
        // Arrange
        String rfqId = "TEST_RFQ_ID";
        RFQ rfq = new RFQ();
        rfq.setId(rfqId);
        rfq.setBuyerId("BUYER_ID");
        rfq.setTitle("Test RFQ");
        rfq.setDescription("Test Description");
        rfq.setNotes("Test Notes");
        rfq.setStatus(RFQ.Status.draft);

        when(rfqRepository.findById(rfqId)).thenReturn(Optional.of(rfq));
        when(rfqLineRepository.findByRfqId(rfqId)).thenReturn(new ArrayList<>());

        // Act
        RFQResponse result = rfqService.getRFQById(rfqId);

        // Assert
        assertEquals(rfqId, result.getId());
        assertEquals("BUYER_ID", result.getBuyerId());
        assertEquals("Test RFQ", result.getTitle());
        assertEquals("Test Description", result.getDescription());
        assertEquals("Test Notes", result.getNotes());
        assertEquals("draft", result.getStatus());
        verify(rfqRepository).findById(rfqId);
        verify(rfqLineRepository).findByRfqId(rfqId);
    }

    @Test
    void testGetRFQById_NonExistingRFQ() {
        // Arrange
        String rfqId = "NON_EXISTENT_ID";
        when(rfqRepository.findById(rfqId)).thenReturn(Optional.empty());

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class, 
            () -> rfqService.getRFQById(rfqId));
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        assertTrue(exception.getDetail().contains("does not exist"));
        verify(rfqRepository).findById(rfqId);
    }

    @Test
    void testAddRFQLine_Success() {
        // Arrange
        String rfqId = ULIDGenerator.generateULID();
        RFQLineCreate lineCreate = new RFQLineCreate();
        lineCreate.setDescription("Test Line");
        lineCreate.setQuantity(BigDecimal.valueOf(5));
        lineCreate.setUom("EA");
        lineCreate.setTargetPrice(BigDecimal.valueOf(100.00));

        RFQ rfq = new RFQ();
        rfq.setId(rfqId);
        rfq.setStatus(RFQ.Status.draft);

        when(rfqRepository.findById(rfqId)).thenReturn(Optional.of(rfq));

        RFQLine savedLine = new RFQLine();
        savedLine.setId(ULIDGenerator.generateULID());
        savedLine.setRfqId(rfqId);
        savedLine.setDescription("Test Line");
        savedLine.setQuantity(BigDecimal.valueOf(5));
        savedLine.setUom("EA");
        savedLine.setTargetPrice(BigDecimal.valueOf(100.00));

        when(rfqLineRepository.save(any(RFQLine.class))).thenReturn(savedLine);

        // Act
        RFQLineDto result = rfqService.addRFQLine(rfqId, lineCreate);

        // Assert
        assertNotNull(result.getId());
        assertEquals("Test Line", result.getDescription());
        assertEquals(BigDecimal.valueOf(5), result.getQuantity());
        assertEquals("EA", result.getUom());
        assertEquals(BigDecimal.valueOf(100.00), result.getTargetPrice());
        verify(rfqRepository).findById(rfqId);
        verify(rfqLineRepository).save(any(RFQLine.class));
    }

    @Test
    void testAddRFQLine_RFQNotFound() {
        // Arrange
        String rfqId = ULIDGenerator.generateULID();
        RFQLineCreate lineCreate = new RFQLineCreate();
        lineCreate.setDescription("Test Line");
        lineCreate.setQuantity(BigDecimal.valueOf(5));
        lineCreate.setUom("EA");

        when(rfqRepository.findById(rfqId)).thenReturn(Optional.empty());

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> rfqService.addRFQLine(rfqId, lineCreate));
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        assertTrue(exception.getDetail().contains("does not exist"));
        verify(rfqRepository).findById(rfqId);
    }

    @Test
    void testAddRFQLine_RFQNotInDraftStatus() {
        // Arrange
        String rfqId = ULIDGenerator.generateULID();
        RFQLineCreate lineCreate = new RFQLineCreate();
        lineCreate.setDescription("Test Line");
        lineCreate.setQuantity(BigDecimal.valueOf(5));
        lineCreate.setUom("EA");

        RFQ rfq = new RFQ();
        rfq.setId(rfqId);
        rfq.setStatus(RFQ.Status.issued);  // Not draft

        when(rfqRepository.findById(rfqId)).thenReturn(Optional.of(rfq));

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> rfqService.addRFQLine(rfqId, lineCreate));
        assertEquals(HttpStatus.CONFLICT, exception.getStatus());
        assertTrue(exception.getDetail().contains("not in draft status"));
        verify(rfqRepository).findById(rfqId);
    }

    @Test
    void testAddRFQLine_InvalidQuantity_Zero() {
        // Arrange
        String rfqId = ULIDGenerator.generateULID();
        RFQLineCreate lineCreate = new RFQLineCreate();
        lineCreate.setDescription("Test Line");
        lineCreate.setQuantity(BigDecimal.ZERO);  // Zero quantity
        lineCreate.setUom("EA");

        RFQ rfq = new RFQ();
        rfq.setId(rfqId);
        rfq.setStatus(RFQ.Status.draft);

        when(rfqRepository.findById(rfqId)).thenReturn(Optional.of(rfq));

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> rfqService.addRFQLine(rfqId, lineCreate));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
        assertTrue(exception.getDetail().contains("Quantity must be greater than 0"));
    }

    @Test
    void testAddRFQLine_InvalidQuantity_Negative() {
        // Arrange
        String rfqId = ULIDGenerator.generateULID();
        RFQLineCreate lineCreate = new RFQLineCreate();
        lineCreate.setDescription("Test Line");
        lineCreate.setQuantity(BigDecimal.valueOf(-5));  // Negative quantity
        lineCreate.setUom("EA");

        RFQ rfq = new RFQ();
        rfq.setId(rfqId);
        rfq.setStatus(RFQ.Status.draft);

        when(rfqRepository.findById(rfqId)).thenReturn(Optional.of(rfq));

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> rfqService.addRFQLine(rfqId, lineCreate));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
        assertTrue(exception.getDetail().contains("Quantity must be greater than 0"));
    }

    @Test
    void testAddRFQLine_InvalidUom_Empty() {
        // Arrange
        String rfqId = ULIDGenerator.generateULID();
        RFQLineCreate lineCreate = new RFQLineCreate();
        lineCreate.setDescription("Test Line");
        lineCreate.setQuantity(BigDecimal.valueOf(5));
        lineCreate.setUom("");  // Empty UOM

        RFQ rfq = new RFQ();
        rfq.setId(rfqId);
        rfq.setStatus(RFQ.Status.draft);

        when(rfqRepository.findById(rfqId)).thenReturn(Optional.of(rfq));

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> rfqService.addRFQLine(rfqId, lineCreate));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
        assertTrue(exception.getDetail().contains("cannot be empty"));
    }

    @Test
    void testAddRFQLine_InvalidUom_Null() {
        // Arrange
        String rfqId = ULIDGenerator.generateULID();
        RFQLineCreate lineCreate = new RFQLineCreate();
        lineCreate.setDescription("Test Line");
        lineCreate.setQuantity(BigDecimal.valueOf(5));
        lineCreate.setUom(null);  // Null UOM

        RFQ rfq = new RFQ();
        rfq.setId(rfqId);
        rfq.setStatus(RFQ.Status.draft);

        when(rfqRepository.findById(rfqId)).thenReturn(Optional.of(rfq));

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> rfqService.addRFQLine(rfqId, lineCreate));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
        assertTrue(exception.getDetail().contains("cannot be empty"));
    }
}
