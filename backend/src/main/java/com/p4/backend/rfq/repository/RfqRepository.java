package com.p4.backend.rfq.repository;

import com.p4.backend.rfq.entity.Rfq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RfqRepository extends JpaRepository<Rfq, String> {
    List<Rfq> findByAccountId(String accountId);
    List<Rfq> findByStatus(Rfq.RfqStatus status);
    List<Rfq> findByValidUntilBefore(LocalDateTime dateTime);
    List<Rfq> findByAccountIdAndStatus(String accountId, Rfq.RfqStatus status);
}