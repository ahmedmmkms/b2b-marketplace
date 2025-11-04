package com.p4.backend.quotes.repository;

import com.p4.backend.quotes.model.Quote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuoteRepository extends JpaRepository<Quote, String> {
    
    @Query("SELECT q FROM Quote q WHERE q.rfqId = :rfqId")
    List<Quote> findByRfqId(@Param("rfqId") String rfqId);
    
    @Query("SELECT q FROM Quote q WHERE q.rfqId = :rfqId AND q.vendorId = :vendorId")
    Optional<Quote> findByRfqIdAndVendorId(@Param("rfqId") String rfqId, @Param("vendorId") String vendorId);
    
    @Query("SELECT q FROM Quote q WHERE q.rfqId = :rfqId ORDER BY q.grandTotal ASC")
    List<Quote> findByRfqIdOrderByGrandTotalAsc(@Param("rfqId") String rfqId);
    
    Optional<Quote> findByIdAndRfqId(@Param("id") String id, @Param("rfqId") String rfqId);
}