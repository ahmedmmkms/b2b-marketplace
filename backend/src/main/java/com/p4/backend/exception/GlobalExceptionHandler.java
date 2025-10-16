package com.p4.backend.exception;

import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Global exception handler that implements RFC7807 for API error responses.
 * This class handles exceptions across the application and returns them
 * in a standardized RFC7807 Problem Details format.
 */
@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Handles generic exceptions that don't match other specific handlers.
     *
     * @param ex The exception that was thrown
     * @param request The web request that resulted in the exception
     * @return A ResponseEntity with RFC7807-compliant error details
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGenericException(Exception ex, WebRequest request) {
        logger.error("Unexpected error occurred: ", ex);
        
        ProblemDetails problemDetails = ProblemDetails.serverError(
            "Internal Server Error",
            "An unexpected error occurred: " + ex.getMessage()
        );
        
        problemDetails.setInstance(request.getDescription(false).replace("uri=", ""));
        
        ApiResponse<Object> response = ApiResponse.error(problemDetails);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Handles IllegalArgumentException specifically.
     *
     * @param ex The IllegalArgumentException that was thrown
     * @param request The web request that resulted in the exception
     * @return A ResponseEntity with RFC7807-compliant error details
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Object>> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        logger.warn("Bad request: {}", ex.getMessage());
        
        ProblemDetails problemDetails = ProblemDetails.clientError(
            "Bad Request",
            ex.getMessage()
        );
        
        problemDetails.setStatus(HttpStatus.BAD_REQUEST.value());
        problemDetails.setInstance(request.getDescription(false).replace("uri=", ""));
        
        ApiResponse<Object> response = ApiResponse.error(problemDetails);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles ResourceNotFoundException specifically.
     *
     * @param ex The ResourceNotFoundException that was thrown
     * @param request The web request that resulted in the exception
     * @return A ResponseEntity with RFC7807-compliant error details
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        logger.info("Resource not found: {}", ex.getMessage());
        
        ProblemDetails problemDetails = ProblemDetails.notFound(ex.getResourceType());
        problemDetails.setInstance(request.getDescription(false).replace("uri=", ""));
        problemDetails.setDetail(ex.getMessage());
        
        ApiResponse<Object> response = ApiResponse.error(problemDetails);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}