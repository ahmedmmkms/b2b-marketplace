package com.p4.backend.identity.controller;

import com.p4.backend.identity.model.VendorCreateRequest;
import com.p4.backend.identity.model.VendorResponse;
import com.p4.backend.identity.service.VendorService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(VendorController.class)
class VendorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private VendorService vendorService;

    @Test
    void testCreateVendor() throws Exception {
        // Arrange
        String testName = "Test Vendor";
        VendorCreateRequest request = new VendorCreateRequest();
        request.setName(testName);

        VendorResponse response = new VendorResponse();
        response.setId("TESTULID1234567890123456");
        response.setName(testName);
        response.setRole("vendor");

        when(vendorService.createVendor(any(VendorCreateRequest.class))).thenReturn(response);

        String requestBody = "{ \"name\": \"" + testName + "\" }";

        // Act & Assert
        mockMvc.perform(post("/vendors")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(response.getId()))
                .andExpect(jsonPath("$.name").value(response.getName()))
                .andExpect(jsonPath("$.role").value(response.getRole()));
    }
}