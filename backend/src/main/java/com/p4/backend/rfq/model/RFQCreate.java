package com.p4.backend.rfq.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class RFQCreate {
    @NotBlank
    private String title;
    
    private String notes;
    
    private List<RFQLineCreate> lines;
    
    public RFQCreate() {}
    
    public RFQCreate(String title) {
        this.title = title;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public List<RFQLineCreate> getLines() {
        return lines;
    }
    
    public void setLines(List<RFQLineCreate> lines) {
        this.lines = lines;
    }
}