package com.p4.backend.invoicing.repository;

import com.p4.backend.invoicing.entity.CreditNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CreditNoteRepository extends JpaRepository<CreditNote, String> {
    List<CreditNote> findByCustomerId(String customerId);
    List<CreditNote> findByVendorId(String vendorId);
    List<CreditNote> findByStatus(CreditNote.CreditNoteStatus status);
    List<CreditNote> findByIssueDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT cn FROM CreditNote cn WHERE cn.invoiceId = :invoiceId")
    List<CreditNote> findByInvoiceId(@Param("invoiceId") String invoiceId);
    
    @Query("SELECT cn FROM CreditNote cn WHERE cn.establishmentId = :establishmentId AND cn.status = :status")
    List<CreditNote> findByEstablishmentIdAndStatus(@Param("establishmentId") String establishmentId, @Param("status") CreditNote.CreditNoteStatus status);
}