package com.p4.backend.invoicing.repository;

import com.p4.backend.invoicing.entity.TaxRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaxRegistrationRepository extends JpaRepository<TaxRegistration, String> {
    List<TaxRegistration> findByIsActiveTrue();
    List<TaxRegistration> findByCountryCode(String countryCode);
    TaxRegistration findByTaxId(String taxId);
}