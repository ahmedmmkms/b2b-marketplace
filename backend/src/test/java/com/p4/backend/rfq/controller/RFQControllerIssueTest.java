package com.p4.backend.rfq.controller;

import com.p4.backend.rfq.model.RFQResponse;
import com.p4.backend.rfq.service.RFQService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(RFQController.class)
class RFQControllerIssueTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RFQService rfqService;

    private static final String VALID_RFQ_ID = "01GQZ0ZJZ0ZJZ0ZJZ0ZJZ0ZJZ0";
    private static final String INVALID_RFQ_ID = "invalid-id";

    @Test
    void testIssueRFQSuccess() throws Exception {
        // Arrange
        doNothing().when(rfqService).issueRFQ(eq(VALID_RFQ_ID));

        // Act & Assert
        mockMvc.perform(post("/rfqs/{rfqId}/issue", VALID_RFQ_ID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        
        Mockito.verify(rfqService).issueRFQ(VALID_RFQ_ID);
    }

    @Test
    void testIssueRFQInvalidId() throws Exception {
        // Arrange
        doThrow(new RuntimeException("Invalid ID format")).when(rfqService).issueRFQ(eq(INVALID_RFQ_ID));

        // Act & Assert - expect 400 Bad Request for invalid ULID format
        mockMvc.perform(post("/rfqs/{rfqId}/issue", INVALID_RFQ_ID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}