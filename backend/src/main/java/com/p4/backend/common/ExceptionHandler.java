package com.p4.backend.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice(basePackages = "com.p4.backend")
public class GlobalExceptionHandler {

    @ExceptionHandler(ProblemDetailException.class)
    public ResponseEntity<Object> handleProblemDetailException(ProblemDetailException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("type", ex.getType());
        body.put("title", ex.getTitle());
        body.put("status", ex.getStatus().value());
        body.put("detail", ex.getDetail());
        body.put("timestamp", Instant.now().toString());

        return new ResponseEntity<>(body, ex.getStatus());
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Object> handleResponseStatusException(ResponseStatusException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("type", "about:blank");
        body.put("title", getStatusText(ex.getStatus()));
        body.put("status", ex.getStatus().value());
        body.put("detail", ex.getReason());
        body.put("timestamp", Instant.now().toString());

        return new ResponseEntity<>(body, ex.getStatus());
    }

    private String getStatusText(HttpStatus status) {
        switch (status) {
            case NOT_FOUND:
                return "Not Found";
            case UNPROCESSABLE_ENTITY:
                return "Unprocessable Entity";
            case CONFLICT:
                return "Conflict";
            case BAD_REQUEST:
                return "Bad Request";
            default:
                return status.getReasonPhrase();
        }
    }
}