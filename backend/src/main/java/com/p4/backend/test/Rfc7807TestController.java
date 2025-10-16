package com.p4.backend.test;

import com.p4.backend.exception.ResourceNotFoundException;
import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Currency;
import java.util.HashMap;
import java.util.Map;

/**
 * Test controller to demonstrate RFC7807-compliant API responses.
 */
@RestController
@RequestMapping("/api/test/rfc7807")
public class Rfc7807TestController {

    /**
     * Test endpoint that returns a successful response using the API wrapper.
     */
    @GetMapping("/success")
    public ResponseEntity<ApiResponse<TestData>> getSuccessResponse() {
        TestData data = new TestData("test-id-123", "Test Data", 42, true);
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("requestId", "req-789");
        metadata.put("processingTime", "25ms");
        
        ApiResponse<TestData> response = ApiResponse.success(data, metadata);
        return ResponseEntity.ok(response);
    }

    /**
     * Test endpoint that returns an error response following RFC7807.
     */
    @GetMapping("/error")
    public ResponseEntity<ApiResponse<TestData>> getErrorResponse() {
        ProblemDetails problemDetails = ProblemDetails.create(
            "https://httpstatuses.com/400", 
            "Invalid Request", 
            400, 
            "The request contains invalid parameters"
        );
        
        problemDetails.setInstance("/api/test/rfc7807/error");
        problemDetails.setErrorCode("INVALID_REQUEST");
        
        ApiResponse<TestData> response = ApiResponse.error(problemDetails);
        return ResponseEntity.badRequest().body(response);
    }

    /**
     * Test endpoint that throws an exception handled by the global exception handler.
     */
    @GetMapping("/exception")
    public ResponseEntity<ApiResponse<TestData>> getExceptionResponse() {
        throw new ResourceNotFoundException("TestResource", "Test resource with ID 123 was not found");
    }

    /**
     * Test endpoint that demonstrates validation error response.
     */
    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<TestData>> validateData(@RequestBody ValidationRequest request) {
        // Simple validation
        if (request.getValue() == null || request.getValue().isEmpty()) {
            ProblemDetails problem = ProblemDetails.validationError("Value field is required");
            problem.setInstance("/api/test/rfc7807/validate");
            
            ApiResponse<TestData> response = ApiResponse.error(problem);
            return ResponseEntity.badRequest().body(response);
        }
        
        if (request.getNumber() != null && request.getNumber().compareTo(BigDecimal.valueOf(100)) > 0) {
            ProblemDetails problem = ProblemDetails.validationError("Number must not exceed 100");
            problem.setInstance("/api/test/rfc7807/validate");
            
            ApiResponse<TestData> response = ApiResponse.error(problem);
            return ResponseEntity.badRequest().body(response);
        }
        
        TestData data = new TestData("new-id", request.getValue(), request.getNumber().intValue(), true);
        ApiResponse<TestData> response = ApiResponse.success(data);
        return ResponseEntity.ok(response);
    }

    /**
     * Data class for test purposes.
     */
    public static class TestData {
        private String id;
        private String name;
        private Integer value;
        private Boolean active;

        public TestData(String id, String name, Integer value, Boolean active) {
            this.id = id;
            this.name = name;
            this.value = value;
            this.active = active;
        }

        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public Integer getValue() { return value; }
        public void setValue(Integer value) { this.value = value; }

        public Boolean getActive() { return active; }
        public void setActive(Boolean active) { this.active = active; }
    }

    /**
     * Request class for validation test.
     */
    public static class ValidationRequest {
        private String value;
        private BigDecimal number;

        // Getters and setters
        public String getValue() { return value; }
        public void setValue(String value) { this.value = value; }

        public BigDecimal getNumber() { return number; }
        public void setNumber(BigDecimal number) { this.number = number; }
    }
}