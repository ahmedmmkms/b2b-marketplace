package com.p4.backend.invoicing.service;

import com.p4.backend.invoicing.entity.SequenceRegistry;
import com.p4.backend.invoicing.repository.SequenceRegistryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SequenceService {
    private static final Logger log = LoggerFactory.getLogger(SequenceService.class);
    
    private final SequenceRegistryRepository sequenceRegistryRepository;
    
    public SequenceService(SequenceRegistryRepository sequenceRegistryRepository) {
        this.sequenceRegistryRepository = sequenceRegistryRepository;
    }

    /**
     * Generates the next sequence value for a given establishment and sequence type
     * This method is synchronized to handle concurrent requests properly
     */
    public synchronized String getNextSequenceValue(String establishmentId, String sequenceName) {
        // Find the sequence registry for this establishment and sequence name
        Optional<SequenceRegistry> sequenceOpt = sequenceRegistryRepository
                .findByEstablishmentIdAndSequenceNameAndIsActiveTrue(establishmentId, sequenceName);

        if (sequenceOpt.isEmpty()) {
            log.error("Sequence registry not found for establishmentId: {} and sequenceName: {}", 
                     establishmentId, sequenceName);
            throw new RuntimeException("Sequence registry not found for establishment: " + 
                                     establishmentId + " and sequence: " + sequenceName);
        }

        SequenceRegistry sequenceRegistry = sequenceOpt.get();

        // Increment the sequence value in the database
        sequenceRegistry.setCurrentValue(sequenceRegistry.getCurrentValue() + 1);
        sequenceRegistry = sequenceRegistryRepository.save(sequenceRegistry);

        // Format the sequence value according to the pattern
        return formatSequenceNumber(sequenceRegistry, sequenceRegistry.getCurrentValue());
    }

    private String formatSequenceNumber(SequenceRegistry sequenceRegistry, Long value) {
        String formatPattern = sequenceRegistry.getFormatPattern();
        String prefix = sequenceRegistry.getPrefix() != null ? sequenceRegistry.getPrefix() : "";
        String suffix = sequenceRegistry.getSuffix() != null ? sequenceRegistry.getSuffix() : "";
        
        // Default format is "SNNNNNNN" where S is prefix and NNNNNNN is 7 digits
        String formattedNumber = String.format("%07d", value);
        
        // If a custom format pattern exists, use it
        if (formatPattern != null) {
            // Replace 'N' with the actual number
            formattedNumber = formatPattern.replace("NNNNNNN", String.format("%07d", value));
            formattedNumber = formatPattern.replace("NNNNN", String.format("%05d", value));
            formattedNumber = formatPattern.replace("NNN", String.format("%03d", value));
        }
        
        return prefix + formattedNumber + suffix;
    }
}