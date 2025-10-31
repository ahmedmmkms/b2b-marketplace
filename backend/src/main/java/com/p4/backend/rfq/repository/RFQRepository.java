package com.p4.backend.rfq.repository;

import com.p4.backend.rfq.model.RFQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RFQRepository extends JpaRepository<RFQ, String> {
    
    @Query("SELECT r FROM RFQ r WHERE " +
           "(:buyerId IS NULL OR r.buyerId = :buyerId) AND " +
           "(:status IS NULL OR r.status = :status)")
    List<RFQ> findByFilters(@Param("buyerId") String buyerId, @Param("status") RFQ.Status status);
}