package com.p4.backend.invoicing.synthetic;

import com.p4.backend.invoicing.dto.CreateInvoiceRequest;
import com.p4.backend.invoicing.service.InvoiceService;
import com.p4.backend.shared.config.FeatureFlagsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;

/**
 * Synthetic invoice generation job for staging environment.
 * This job runs periodically to validate the invoice generation process
 * and ensure templates are working correctly.
 */
@Service
@ConditionalOnProperty(name = "synthetic.jobs.enabled", havingValue = "true", matchIfMissing = false)
public class SyntheticInvoiceGenerationJob {

    private static final Logger log = LoggerFactory.getLogger(SyntheticInvoiceGenerationJob.class);

    private final InvoiceService invoiceService;
    private final FeatureFlagsService featureFlagsService;
    
    public SyntheticInvoiceGenerationJob(InvoiceService invoiceService, FeatureFlagsService featureFlagsService) {
        this.invoiceService = invoiceService;
        this.featureFlagsService = featureFlagsService;
    }

    /**
     * Runs the synthetic invoice generation every hour in staging environments
     */
    @Scheduled(fixedRate = 3600000) // Every hour
    public void runSyntheticInvoiceGeneration() {
        if (!featureFlagsService.isInvoiceVatEnabled()) {
            log.info("Invoice VAT feature flag is disabled, skipping synthetic invoice generation");
            return;
        }

        log.info("Starting synthetic invoice generation job");
        
        try {
            // Create a mock invoice request
            CreateInvoiceRequest request = new CreateInvoiceRequest();
            request.setOrderId("TEST-ORDER-001");
            request.setCustomerId("TEST-CUST-001");
            request.setVendorId("TEST-VEND-001");
            request.setEstablishmentId("TEST-EST-001");
            request.setIssueDate(LocalDate.now());
            request.setDueDate(LocalDate.now().plusDays(30));
            request.setCurrency("USD");
            request.setPoNumber("TEST-PO-001");
            request.setNotes("Synthetic test invoice for validation");
            
            // Add a mock line item
            CreateInvoiceRequest.InvoiceLineRequest line = new CreateInvoiceRequest.InvoiceLineRequest();
            line.setProductId("TEST-PROD-001");
            line.setProductName("Test Product");
            line.setDescription("Test product for synthetic invoice");
            line.setQuantity(2);
            line.setUnitPrice(new BigDecimal("50.00"));
            line.setTaxClass("STANDARD");
            
            request.setInvoiceLines(Collections.singletonList(line));

            // Attempt to create the invoice
            var response = invoiceService.createInvoice(request);
            
            log.info("Successfully generated synthetic invoice: {}", response.getInvoiceNumber());
            
        } catch (Exception e) {
            log.error("Failed to generate synthetic invoice", e);
        }
    }
}