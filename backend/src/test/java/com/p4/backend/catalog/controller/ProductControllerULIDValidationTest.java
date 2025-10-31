package com.p4.backend.catalog.controller;

import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.catalog.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
public class ProductControllerULIDValidationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Test
    public void testGetProductWithValidULID() throws Exception {
        String validULID = ULIDGenerator.generateULID();
        
        mockMvc.perform(get("/products/" + validULID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetProductWithInvalidULIDTooShort() throws Exception {
        String invalidULID = "01G65Z755XXF4Y4Z01G65Z755"; // Only 25 chars
        
        mockMvc.perform(get("/products/" + invalidULID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testGetProductWithInvalidULIDContainsI() throws Exception {
        String invalidULID = "01G65Z755XXF4Y4Z01G65Z755I"; // Contains 'I'
        
        mockMvc.perform(get("/products/" + invalidULID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}