package com.p4.backend.common;

import org.springframework.http.HttpStatus;

public class ProblemDetailException extends RuntimeException {
    private final HttpStatus status;
    private final String type;
    private final String title;
    private final String detail;

    public ProblemDetailException(HttpStatus status, String type, String title, String detail) {
        super(detail);
        this.status = status;
        this.type = type;
        this.title = title;
        this.detail = detail;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public String getDetail() {
        return detail;
    }
}