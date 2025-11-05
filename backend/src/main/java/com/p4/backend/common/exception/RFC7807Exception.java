package com.p4.backend.common.exception;

import com.p4.backend.common.ProblemDetailException;
import org.springframework.http.HttpStatus;

public class RFC7807Exception extends ProblemDetailException {
    public RFC7807Exception(HttpStatus status, String type, String title, String detail) {
        super(status, type, title, detail);
    }

    public RFC7807Exception(HttpStatus status, String title, String detail) {
        super(status, "about:blank", title, detail);
    }
}