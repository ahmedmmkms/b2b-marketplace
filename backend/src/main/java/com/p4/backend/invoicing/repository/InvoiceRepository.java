package com.p4.backend.invoicing.repository;

import com.p4.backend.invoicing.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, String> {
    List<Invoice> findByCustomerId(String customerId);
    List<Invoice> findByVendorId(String vendorId);
    List<Invoice> findByStatus(Invoice.InvoiceStatus status);
    List<Invoice> findByIssueDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT i FROM Invoice i WHERE i.orderId = :orderId")
    Invoice findByOrderId(@Param("orderId") String orderId);
    
    @Query("SELECT i FROM Invoice i WHERE i.establishmentId = :establishmentId AND i.status = :status")
    List<Invoice> findByEstablishmentIdAndStatus(@Param("establishmentId") String establishmentId, @Param("status") Invoice.InvoiceStatus status);
}