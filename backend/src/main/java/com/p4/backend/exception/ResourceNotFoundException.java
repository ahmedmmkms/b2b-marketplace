package com.p4.backend.exception;

/**
 * Exception thrown when a requested resource is not found.
 */
public class ResourceNotFoundException extends RuntimeException {

    private final String resourceType;

    public ResourceNotFoundException(String resourceType, String message) {
        super(message);
        this.resourceType = resourceType;
    }

    public ResourceNotFoundException(String resourceType) {
        super(resourceType + " not found");
        this.resourceType = resourceType;
    }

    public String getResourceType() {
        return resourceType;
    }
}