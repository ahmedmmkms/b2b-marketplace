package com.p4.backend.invoicing.repository;

import com.p4.backend.invoicing.entity.CreditNoteLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditNoteLineRepository extends JpaRepository<CreditNoteLine, String> {
    List<CreditNoteLine> findByCreditNoteId(String creditNoteId);
}