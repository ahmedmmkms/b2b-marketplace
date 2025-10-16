package com.p4.backend.shared.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Map;

/**
 * A generic response wrapper for API responses that follows RFC7807 standards
 * for error responses while still supporting standard success responses.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    /**
     * The response payload/data for successful requests.
     */
    private T data;

    /**
     * The RFC7807 problem details for error responses.
     */
    private ProblemDetails error;

    /**
     * A flag indicating whether the request was successful.
     */
    private boolean success;

    /**
     * Timestamp of when the response was created.
     */
    private Instant timestamp;

    /**
     * Additional metadata that might be useful for the response.
     */
    private Map<String, Object> metadata;

    /**
     * Creates a successful response with data.
     *
     * @param data The data to include in the response
     * @param <T> The type of data
     * @return A successful ApiResponse
     */
    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .data(data)
                .success(true)
                .timestamp(Instant.now())
                .build();
    }

    /**
     * Creates a successful response with data and metadata.
     *
     * @param data The data to include in the response
     * @param metadata Additional metadata to include in the response
     * @param <T> The type of data
     * @return A successful ApiResponse
     */
    public static <T> ApiResponse<T> success(T data, Map<String, Object> metadata) {
        return ApiResponse.<T>builder()
                .data(data)
                .metadata(metadata)
                .success(true)
                .timestamp(Instant.now())
                .build();
    }

    /**
     * Creates a response with an error following RFC7807.
     *
     * @param error The ProblemDetails object containing error information
     * @param <T> The type of data (usually null for error responses)
     * @return An error ApiResponse
     */
    public static <T> ApiResponse<T> error(ProblemDetails error) {
        return ApiResponse.<T>builder()
                .error(error)
                .success(false)
                .timestamp(Instant.now())
                .build();
    }

    /**
     * Convenience method to create an error response from basic parameters.
     *
     * @param type The problem type URI
     * @param title A short summary of the problem
     * @param status The HTTP status code
     * @param detail A human-readable explanation of the problem
     * @param <T> The type of data
     * @return An error ApiResponse
     */
    public static <T> ApiResponse<T> error(String type, String title, Integer status, String detail) {
        ProblemDetails problemDetails = ProblemDetails.create(type, title, status, detail);
        return ApiResponse.<T>builder()
                .error(problemDetails)
                .success(false)
                .timestamp(Instant.now())
                .build();
    }
}