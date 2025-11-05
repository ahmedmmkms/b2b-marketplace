package com.p4.backend.common.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends RFC7807Exception {
    public NotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, "NOT_FOUND", "Resource not found", message);
    }
}