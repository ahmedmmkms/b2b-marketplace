package com.p4.backend.invoicing.repository;

import com.p4.backend.invoicing.entity.InvoiceLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceLineRepository extends JpaRepository<InvoiceLine, String> {
    List<InvoiceLine> findByInvoiceId(String invoiceId);
}