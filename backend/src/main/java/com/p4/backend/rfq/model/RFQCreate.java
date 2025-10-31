package com.p4.backend.rfq.model;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class RFQCreate {
    @NotBlank
    private String title;
    
    private String notes;

    private String description;
    
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
