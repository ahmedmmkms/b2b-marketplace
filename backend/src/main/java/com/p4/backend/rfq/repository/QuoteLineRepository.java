package com.p4.backend.rfq.repository;

import com.p4.backend.rfq.entity.QuoteLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuoteLineRepository extends JpaRepository<QuoteLine, String> {
    List<QuoteLine> findByQuoteId(String quoteId);
    List<QuoteLine> findByRfqLineId(String rfqLineId);
}