package com.p4.backend.shared.exception;

public class ApplicationError extends RuntimeException {
    private final String code;
    private final String details;

    public ApplicationError(String message) {
        super(message);
        this.code = "GENERIC_ERROR";
        this.details = message;
    }

    public ApplicationError(String code, String message) {
        super(message);
        this.code = code;
        this.details = message;
    }

    public ApplicationError(String code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
        this.details = message;
    }

    public String getCode() {
        return code;
    }

    public String getDetails() {
        return details;
    }
}