package com.p4.backend.rfq.repository;

import com.p4.backend.rfq.entity.MessageThread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageThreadRepository extends JpaRepository<MessageThread, String> {
    List<MessageThread> findByRfqId(String rfqId);
    List<MessageThread> findByQuoteId(String quoteId);
    List<MessageThread> findByRfqIdAndStatus(String rfqId, MessageThread.ThreadStatus status);
    List<MessageThread> findByQuoteIdAndStatus(String quoteId, MessageThread.ThreadStatus status);
}