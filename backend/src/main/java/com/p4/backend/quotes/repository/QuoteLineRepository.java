package com.p4.backend.quotes.repository;

import com.p4.backend.quotes.model.QuoteLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuoteLineRepository extends JpaRepository<QuoteLine, String> {
    
    @Query("SELECT ql FROM QuoteLine ql WHERE ql.quoteId = :quoteId")
    List<QuoteLine> findByQuoteId(@Param("quoteId") String quoteId);
    
    @Query("SELECT ql FROM QuoteLine ql WHERE ql.rfqLineId IN :rfqLineIds")
    List<QuoteLine> findByRfqLineIds(@Param("rfqLineIds") List<String> rfqLineIds);
}