package com.p4.backend.identity.model;

import jakarta.validation.constraints.NotBlank;

public class VendorCreateRequest {
    
    @NotBlank
    private String name;
    
    public VendorCreateRequest() {}
    
    public VendorCreateRequest(String name) {
        this.name = name;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}