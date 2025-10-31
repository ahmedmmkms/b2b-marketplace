package com.p4.backend.rfq.repository;

import com.p4.backend.rfq.model.RFQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RFQRepository extends JpaRepository<RFQ, String> {
}