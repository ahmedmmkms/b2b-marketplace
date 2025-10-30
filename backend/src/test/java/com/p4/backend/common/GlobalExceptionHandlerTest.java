package com.p4.backend.common;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GlobalExceptionHandlerTest {

    @InjectMocks
    private GlobalExceptionHandler exceptionHandler;

    @BeforeEach
    void setUp() {
        exceptionHandler = new GlobalExceptionHandler();
    }

    @Test
    void testHandleProblemDetailException() {
        // Arrange
        ProblemDetailException ex = new ProblemDetailException(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/product-not-found",
                "Product not found",
                "Product with id 'test123' does not exist"
        );

        // Act
        ResponseEntity<Object> response = exceptionHandler.handleProblemDetailException(ex);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertTrue(response.getBody() instanceof java.util.Map);
        
        java.util.Map<String, Object> body = (java.util.Map<String, Object>) response.getBody();
        assertEquals("https://api.example.com/errors/product-not-found", body.get("type"));
        assertEquals("Product not found", body.get("title"));
        assertEquals(404, body.get("status"));
        assertEquals("Product with id 'test123' does not exist", body.get("detail"));
        assertTrue(body.containsKey("timestamp"));
    }

    @Test
    void testHandleResponseStatusException() {
        // Arrange
        ResponseStatusException ex = new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");

        // Act
        ResponseEntity<Object> response = exceptionHandler.handleResponseStatusException(ex);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertTrue(response.getBody() instanceof java.util.Map);
        
        java.util.Map<String, Object> body = (java.util.Map<String, Object>) response.getBody();
        assertEquals("about:blank", body.get("type"));
        assertEquals("Not Found", body.get("title"));
        assertEquals(404, body.get("status"));
        assertEquals("Product not found", body.get("detail"));
        assertTrue(body.containsKey("timestamp"));
    }
}