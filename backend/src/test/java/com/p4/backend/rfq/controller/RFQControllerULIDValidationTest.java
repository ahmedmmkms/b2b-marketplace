package com.p4.backend.rfq.controller;

import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.rfq.service.RFQService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RFQController.class)
public class RFQControllerULIDValidationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RFQService rfqService;

    @Test
    public void testGetRFQWithValidULID() throws Exception {
        String validULID = ULIDGenerator.generateULID();
        
        mockMvc.perform(get("/rfqs/" + validULID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetRFQWithInvalidULIDTooShort() throws Exception {
        String invalidULID = "01G65Z755XXF4Y4Z01G65Z755"; // Only 25 chars
        
        mockMvc.perform(get("/rfqs/" + invalidULID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testGetRFQWithInvalidULIDContainsI() throws Exception {
        String invalidULID = "01G65Z755XXF4Y4Z01G65Z755I"; // Contains 'I'
        
        mockMvc.perform(get("/rfqs/" + invalidULID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testGetRFQWithInvalidULIDContainsL() throws Exception {
        String invalidULID = "01G65Z755XXF4Y4Z01G65Z755L"; // Contains 'L'
        
        mockMvc.perform(get("/rfqs/" + invalidULID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testGetRFQWithInvalidULIDContainsO() throws Exception {
        String invalidULID = "01G65Z755XXF4Y4Z01G65Z755O"; // Contains 'O'
        
        mockMvc.perform(get("/rfqs/" + invalidULID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}