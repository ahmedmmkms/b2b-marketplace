package com.p4.backend.invoicing.repository;

import com.p4.backend.invoicing.entity.VatRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VatRateRepository extends JpaRepository<VatRate, String> {
    List<VatRate> findByCountryCodeAndEffectiveFromBeforeAndEffectiveToAfterOrEffectiveToIsNull(
            String countryCode, LocalDate date, LocalDate date2);
    
    @Query("SELECT vr FROM VatRate vr WHERE vr.countryCode = :countryCode AND " +
           "vr.taxClass = :taxClass AND " +
           "vr.effectiveFrom <= :date AND " +
           "(vr.effectiveTo IS NULL OR vr.effectiveTo >= :date) " +
           "ORDER BY vr.effectiveFrom DESC")
    List<VatRate> findByCountryCodeAndTaxClassAndDate(
            @Param("countryCode") String countryCode, 
            @Param("taxClass") String taxClass, 
            @Param("date") LocalDate date);
}