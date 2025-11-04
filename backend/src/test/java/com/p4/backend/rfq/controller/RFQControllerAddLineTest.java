package com.p4.backend.rfq.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.rfq.model.RFQLineCreate;
import com.p4.backend.rfq.model.RFQLineDto;
import com.p4.backend.rfq.service.RFQService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RFQController.class)
public class RFQControllerAddLineTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RFQService rfqService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testAddRFQLine_Success() throws Exception {
        // Arrange
        String validRfqId = ULIDGenerator.generateULID();
        
        RFQLineCreate lineCreate = new RFQLineCreate();
        lineCreate.setDescription("Test Line");
        lineCreate.setQuantity(BigDecimal.valueOf(5));
        lineCreate.setUom("EA");
        lineCreate.setTargetPrice(BigDecimal.valueOf(100.00));

        RFQLineDto expectedLine = new RFQLineDto();
        expectedLine.setId(ULIDGenerator.generateULID());
        expectedLine.setDescription("Test Line");
        expectedLine.setQuantity(BigDecimal.valueOf(5));
        expectedLine.setUom("EA");
        expectedLine.setTargetPrice(BigDecimal.valueOf(100.00));

        when(rfqService.addRFQLine(eq(validRfqId), any(RFQLineCreate.class))).thenReturn(expectedLine);

        // Act & Assert
        mockMvc.perform(post("/rfqs/{rfqId}/lines", validRfqId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(lineCreate)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(expectedLine.getId()))
                .andExpect(jsonPath("$.description").value("Test Line"))
                .andExpect(jsonPath("$.quantity").value(5))
                .andExpect(jsonPath("$.uom").value("EA"))
                .andExpect(jsonPath("$.targetPrice").value(100.00));
    }

    @Test
    public void testAddRFQLine_WithInvalidULID() throws Exception {
        // Arrange
        String invalidRfqId = "INVALID_ULID"; // Not a 26-char ULID
        
        RFQLineCreate lineCreate = new RFQLineCreate();
        lineCreate.setDescription("Test Line");
        lineCreate.setQuantity(BigDecimal.valueOf(5));
        lineCreate.setUom("EA");

        // Act & Assert
        mockMvc.perform(post("/rfqs/{rfqId}/lines", invalidRfqId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(lineCreate)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Invalid ID format"));
    }

    @Test
    public void testAddRFQLine_WithInvalidQuantity() throws Exception {
        // Arrange
        String validRfqId = ULIDGenerator.generateULID();
        
        RFQLineCreate lineCreate = new RFQLineCreate();
        lineCreate.setDescription("Test Line");
        lineCreate.setQuantity(BigDecimal.valueOf(0)); // Invalid quantity
        lineCreate.setUom("EA");

        // Act & Assert
        mockMvc.perform(post("/rfqs/{rfqId}/lines", validRfqId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(lineCreate)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Invalid quantity"));
    }

    @Test
    public void testAddRFQLine_WithEmptyUom() throws Exception {
        // Arrange
        String validRfqId = ULIDGenerator.generateULID();
        
        RFQLineCreate lineCreate = new RFQLineCreate();
        lineCreate.setDescription("Test Line");
        lineCreate.setQuantity(BigDecimal.valueOf(5));
        lineCreate.setUom(""); // Empty UOM

        // Act & Assert
        mockMvc.perform(post("/rfqs/{rfqId}/lines", validRfqId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(lineCreate)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Invalid unit of measure"));
    }
}