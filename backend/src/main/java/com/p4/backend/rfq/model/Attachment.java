package com.p4.backend.rfq.model;

public class Attachment {
    private String key;
    private String url;
    private String filename;
    
    public Attachment() {}
    
    public Attachment(String key, String url, String filename) {
        this.key = key;
        this.url = url;
        this.filename = filename;
    }
    
    public String getKey() {
        return key;
    }
    
    public void setKey(String key) {
        this.key = key;
    }
    
    public String getUrl() {
        return url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }
    
    public String getFilename() {
        return filename;
    }
    
    public void setFilename(String filename) {
        this.filename = filename;
    }
}