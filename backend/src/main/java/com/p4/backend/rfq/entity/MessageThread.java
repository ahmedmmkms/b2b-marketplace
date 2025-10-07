package com.p4.backend.rfq.entity;

import com.p4.backend.shared.entity.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "message_thread")
public class MessageThread extends BaseEntity {

    @Column(name = "rfq_id", nullable = false)
    private String rfqId;

    @Column(name = "quote_id")
    private String quoteId;

    @Column(name = "subject", nullable = false)
    private String subject;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ThreadType type = ThreadType.RFQ;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ThreadStatus status = ThreadStatus.ACTIVE;

    @Column(name = "last_message_at")
    private LocalDateTime lastMessageAt;

    @Column(name = "last_message_by")
    private String lastMessageBy;

    // Constructors
    public MessageThread() {
        super();
    }

    public MessageThread(String rfqId, String subject) {
        super();
        this.rfqId = rfqId;
        this.subject = subject;
    }

    // Getters and setters
    public String getRfqId() {
        return rfqId;
    }

    public void setRfqId(String rfqId) {
        this.rfqId = rfqId;
    }

    public String getQuoteId() {
        return quoteId;
    }

    public void setQuoteId(String quoteId) {
        this.quoteId = quoteId;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public ThreadType getType() {
        return type;
    }

    public void setType(ThreadType type) {
        this.type = type;
    }

    public ThreadStatus getStatus() {
        return status;
    }

    public void setStatus(ThreadStatus status) {
        this.status = status;
    }

    public LocalDateTime getLastMessageAt() {
        return lastMessageAt;
    }

    public void setLastMessageAt(LocalDateTime lastMessageAt) {
        this.lastMessageAt = lastMessageAt;
    }

    public String getLastMessageBy() {
        return lastMessageBy;
    }

    public void setLastMessageBy(String lastMessageBy) {
        this.lastMessageBy = lastMessageBy;
    }

    // Enums
    public enum ThreadType {
        RFQ, QUOTE, DISPUTE
    }

    public enum ThreadStatus {
        ACTIVE, RESOLVED, CLOSED
    }
}