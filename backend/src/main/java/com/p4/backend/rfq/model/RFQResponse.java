package com.p4.backend.rfq.model;

import java.time.OffsetDateTime;
import java.util.List;

public class RFQResponse {
    private String id;
    private String buyerId;
    private String title;
    private String notes;
    private String status;
    private List<Attachment> attachments;
    private List<RFQLineDto> lines;
    
    public RFQResponse() {}
    
    public RFQResponse(String id, String buyerId, String title, String status) {
        this.id = id;
        this.buyerId = buyerId;
        this.title = title;
        this.status = status;
    }
    
    // Getters and setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getBuyerId() {
        return buyerId;
    }
    
    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
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
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public List<Attachment> getAttachments() {
        return attachments;
    }
    
    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }
    
    public List<RFQLineDto> getLines() {
        return lines;
    }
    
    public void setLines(List<RFQLineDto> lines) {
        this.lines = lines;
    }
}