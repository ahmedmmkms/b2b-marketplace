package com.p4.backend.invoicing.repository;

import com.p4.backend.invoicing.entity.SequenceRegistry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SequenceRegistryRepository extends JpaRepository<SequenceRegistry, String> {
    Optional<SequenceRegistry> findByEstablishmentIdAndSequenceName(String establishmentId, String sequenceName);
    Optional<SequenceRegistry> findByEstablishmentIdAndSequenceNameAndIsActiveTrue(String establishmentId, String sequenceName);
}