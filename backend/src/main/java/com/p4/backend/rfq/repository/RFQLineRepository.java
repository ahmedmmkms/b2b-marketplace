package com.p4.backend.rfq.repository;

import com.p4.backend.rfq.model.RFQLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RFQLineRepository extends JpaRepository<RFQLine, String> {
    List<RFQLine> findByRfqId(String rfqId);
}