package com.p4.backend.rfq.repository;

import com.p4.backend.rfq.entity.RfqLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RfqLineRepository extends JpaRepository<RfqLine, String> {
    List<RfqLine> findByRfqId(String rfqId);
}