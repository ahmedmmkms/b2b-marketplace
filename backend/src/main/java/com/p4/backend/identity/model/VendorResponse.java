package com.p4.backend.identity.model;

public class VendorResponse {
    
    private String id;
    private String name;
    private String role;
    
    public VendorResponse() {}
    
    public VendorResponse(String id, String name, String role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
}