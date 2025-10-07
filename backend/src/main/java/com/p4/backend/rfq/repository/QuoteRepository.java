package com.p4.backend.rfq.repository;

import com.p4.backend.rfq.entity.Quote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuoteRepository extends JpaRepository<Quote, String> {
    List<Quote> findByRfqId(String rfqId);
    List<Quote> findByVendorId(String vendorId);
    List<Quote> findByStatus(Quote.QuoteStatus status);
    List<Quote> findByValidUntilBefore(LocalDateTime dateTime);
    List<Quote> findByRfqIdAndStatus(String rfqId, Quote.QuoteStatus status);
}