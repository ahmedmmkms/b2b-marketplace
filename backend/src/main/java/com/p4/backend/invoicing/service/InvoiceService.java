package com.p4.backend.invoicing.service;

import com.p4.backend.invoicing.dto.CreateCreditNoteRequest;
import com.p4.backend.invoicing.dto.CreateInvoiceRequest;
import com.p4.backend.invoicing.dto.InvoiceResponse;
import com.p4.backend.invoicing.entity.*;
import com.p4.backend.invoicing.repository.*;
import com.p4.backend.shared.exception.BusinessException;
import com.p4.backend.shared.util.UlidUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {
    
    private static final Logger log = LoggerFactory.getLogger(InvoiceService.class);
    
    private final InvoiceRepository invoiceRepository;
    private final InvoiceLineRepository invoiceLineRepository;
    private final CreditNoteRepository creditNoteRepository;
    private final CreditNoteLineRepository creditNoteLineRepository;
    private final SequenceService sequenceService;
    private final VatRateRepository vatRateRepository;
    private final TaxRegistrationRepository taxRegistrationRepository;
    private final SequenceRegistryRepository sequenceRegistryRepository;
    private final InvoicePdfService invoicePdfService;
    private final InvoiceTelemetryService invoiceTelemetryService;
    private final InvoiceNotificationService invoiceNotificationService;
    
    public InvoiceService(InvoiceRepository invoiceRepository,
                         InvoiceLineRepository invoiceLineRepository,
                         CreditNoteRepository creditNoteRepository,
                         CreditNoteLineRepository creditNoteLineRepository,
                         SequenceService sequenceService,
                         VatRateRepository vatRateRepository,
                         TaxRegistrationRepository taxRegistrationRepository,
                         SequenceRegistryRepository sequenceRegistryRepository,
                         InvoicePdfService invoicePdfService,
                         InvoiceTelemetryService invoiceTelemetryService,
                         InvoiceNotificationService invoiceNotificationService) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceLineRepository = invoiceLineRepository;
        this.creditNoteRepository = creditNoteRepository;
        this.creditNoteLineRepository = creditNoteLineRepository;
        this.sequenceService = sequenceService;
        this.vatRateRepository = vatRateRepository;
        this.taxRegistrationRepository = taxRegistrationRepository;
        this.sequenceRegistryRepository = sequenceRegistryRepository;
        this.invoicePdfService = invoicePdfService;
        this.invoiceTelemetryService = invoiceTelemetryService;
        this.invoiceNotificationService = invoiceNotificationService;
    }

    @Transactional
    public InvoiceResponse createInvoice(CreateInvoiceRequest request) {
        log.info("Creating invoice for order: {}", request.getOrderId());
        
        // Validate tax establishment exists
        Optional<TaxRegistration> taxRegOpt = taxRegistrationRepository.findById(request.getEstablishmentId());
        if (taxRegOpt.isEmpty()) {
            throw new BusinessException("Tax establishment not found: " + request.getEstablishmentId());
        }
        
        // Create the invoice entity
        Invoice invoice = new Invoice();
        invoice.setId(UlidUtil.generateUlid());
        invoice.setOrderId(request.getOrderId());
        invoice.setCustomerId(request.getCustomerId());
        invoice.setVendorId(request.getVendorId());
        invoice.setEstablishmentId(request.getEstablishmentId());
        invoice.setIssueDate(request.getIssueDate() != null ? request.getIssueDate() : LocalDate.now());
        invoice.setDueDate(request.getDueDate());
        invoice.setCurrency(request.getCurrency());
        invoice.setPoNumber(request.getPoNumber());
        invoice.setNotes(request.getNotes());
        invoice.setStatus(Invoice.InvoiceStatus.DRAFT);
        
        // Generate invoice number using sequence service
        String invoiceNumber = sequenceService.getNextSequenceValue(request.getEstablishmentId(), "INVOICE");
        invoice.setInvoiceNumber(invoiceNumber);
        
        // Calculate amounts and create invoice lines
        List<InvoiceLine> invoiceLines = new ArrayList<>();
        BigDecimal totalSubtotal = BigDecimal.ZERO;
        BigDecimal totalTax = BigDecimal.ZERO;
        
        for (CreateInvoiceRequest.InvoiceLineRequest lineRequest : request.getInvoiceLines()) {
            // Get the applicable VAT rate for this tax class on the issue date
            BigDecimal taxRate = getVatRateForTaxClass(request.getEstablishmentId(), lineRequest.getTaxClass(), invoice.getIssueDate());
            
            InvoiceLine line = new InvoiceLine();
            line.setId(UlidUtil.generateUlid());
            line.setInvoiceId(invoice.getId());
            line.setProductId(lineRequest.getProductId());
            line.setProductName(lineRequest.getProductName());
            line.setDescription(lineRequest.getDescription());
            line.setQuantity(lineRequest.getQuantity());
            line.setUnitPrice(lineRequest.getUnitPrice());
            
            // Calculate line total
            BigDecimal lineTotal = lineRequest.getUnitPrice().multiply(new BigDecimal(lineRequest.getQuantity()));
            line.setLineTotal(lineTotal);
            
            // Set tax information
            line.setTaxClass(lineRequest.getTaxClass());
            line.setTaxRate(taxRate);
            
            // Calculate tax amount for this line
            BigDecimal taxAmount = lineTotal.multiply(taxRate).setScale(2, RoundingMode.HALF_UP);
            line.setTaxAmount(taxAmount);
            
            invoiceLines.add(line);
            totalSubtotal = totalSubtotal.add(lineTotal);
            totalTax = totalTax.add(taxAmount);
        }
        
        // Calculate total amounts
        BigDecimal totalAmount = totalSubtotal.add(totalTax);
        invoice.setSubtotalAmount(totalSubtotal);
        invoice.setTaxAmount(totalTax);
        invoice.setTotalAmount(totalAmount);
        
        // Save invoice and lines
        invoice = invoiceRepository.save(invoice);
        
        for (InvoiceLine line : invoiceLines) {
            line.setInvoiceId(invoice.getId());
        }
        List<InvoiceLine> savedLines = invoiceLineRepository.saveAll(invoiceLines);
        invoice.setInvoiceLines(savedLines);
        
        // Use telemetry to record the invoice generation operation
        invoiceTelemetryService.recordInvoiceGenerationTime(() -> {
            // Generate and store PDF
            try {
                String pdfLocation = invoicePdfService.generateAndUploadInvoicePdf(invoice.getId());
                invoice.setPdfLocation(pdfLocation);
                invoice = invoiceRepository.save(invoice);
            } catch (Exception e) {
                log.error("Failed to generate PDF for invoice: {}", invoice.getId(), e);
                // We don't fail the invoice creation if PDF generation fails, but log the error
            }
        });
        
        log.info("Successfully created invoice: {} for order: {}, total amount: {}", 
                invoice.getInvoiceNumber(), request.getOrderId(), totalAmount);
        
        return mapToResponse(invoice);
    }
    
    @Transactional
    public InvoiceResponse createCreditNote(CreateCreditNoteRequest request) {
        log.info("Creating credit note for invoice: {}", request.getInvoiceId());
        
        // Validate the original invoice exists
        Optional<Invoice> originalInvoiceOpt = invoiceRepository.findById(request.getInvoiceId());
        if (originalInvoiceOpt.isEmpty()) {
            throw new BusinessException("Original invoice not found: " + request.getInvoiceId());
        }
        
        Invoice originalInvoice = originalInvoiceOpt.get();
        
        // Validate tax establishment exists
        Optional<TaxRegistration> taxRegOpt = taxRegistrationRepository.findById(request.getEstablishmentId());
        if (taxRegOpt.isEmpty()) {
            throw new BusinessException("Tax establishment not found: " + request.getEstablishmentId());
        }
        
        // Create the credit note entity
        CreditNote creditNote = new CreditNote();
        creditNote.setId(UlidUtil.generateUlid());
        creditNote.setInvoiceId(request.getInvoiceId());
        creditNote.setCustomerId(request.getCustomerId());
        creditNote.setVendorId(request.getVendorId());
        creditNote.setEstablishmentId(request.getEstablishmentId());
        creditNote.setIssueDate(request.getIssueDate() != null ? request.getIssueDate() : LocalDate.now());
        creditNote.setCurrency(request.getCurrency());
        creditNote.setReason(request.getReason());
        creditNote.setNotes(request.getNotes());
        creditNote.setStatus(CreditNote.CreditNoteStatus.DRAFT);
        
        // Generate credit note number using sequence service
        String creditNoteNumber = sequenceService.getNextSequenceValue(request.getEstablishmentId(), "CREDIT_NOTE");
        creditNote.setCreditNoteNumber(creditNoteNumber);
        
        // Calculate amounts and create credit note lines
        List<CreditNoteLine> creditNoteLines = new ArrayList<>();
        BigDecimal totalSubtotal = BigDecimal.ZERO;
        BigDecimal totalTax = BigDecimal.ZERO;
        
        for (CreateCreditNoteRequest.CreditNoteLineRequest lineRequest : request.getCreditNoteLines()) {
            // Get the applicable VAT rate for this tax class on the original invoice date
            BigDecimal taxRate = getVatRateForTaxClass(request.getEstablishmentId(), lineRequest.getTaxClass(), originalInvoice.getIssueDate());
            
            CreditNoteLine line = new CreditNoteLine();
            line.setId(UlidUtil.generateUlid());
            line.setCreditNoteId(creditNote.getId());
            line.setInvoiceLineId(lineRequest.getInvoiceLineId());
            line.setProductId(lineRequest.getProductId());
            line.setProductName(lineRequest.getProductName());
            line.setDescription(lineRequest.getDescription());
            line.setQuantity(lineRequest.getQuantity());
            line.setUnitPrice(lineRequest.getUnitPrice());
            
            // Calculate line total
            BigDecimal lineTotal = lineRequest.getUnitPrice().multiply(new BigDecimal(lineRequest.getQuantity()));
            line.setLineTotal(lineTotal);
            
            // Set tax information
            line.setTaxClass(lineRequest.getTaxClass());
            line.setTaxRate(taxRate);
            
            // Calculate tax amount for this line
            BigDecimal taxAmount = lineTotal.multiply(taxRate).setScale(2, RoundingMode.HALF_UP);
            line.setTaxAmount(taxAmount);
            
            creditNoteLines.add(line);
            totalSubtotal = totalSubtotal.add(lineTotal);
            totalTax = totalTax.add(taxAmount);
        }
        
        // Calculate total amounts
        BigDecimal totalAmount = totalSubtotal.add(totalTax);
        creditNote.setSubtotalAmount(totalSubtotal);
        creditNote.setTaxAmount(totalTax);
        creditNote.setTotalAmount(totalAmount);
        
        // Save credit note and lines
        creditNote = creditNoteRepository.save(creditNote);
        
        for (CreditNoteLine line : creditNoteLines) {
            line.setCreditNoteId(creditNote.getId());
        }
        List<CreditNoteLine> savedLines = creditNoteLineRepository.saveAll(creditNoteLines);
        creditNote.setCreditNoteLines(savedLines);
        
        log.info("Successfully created credit note: {} for original invoice: {}, total amount: {}", 
                creditNote.getCreditNoteNumber(), request.getInvoiceId(), totalAmount);
        
        return mapToResponse(creditNote);
    }
    
    @Transactional
    public InvoiceResponse issueCreditNote(String creditNoteId) {
        log.info("Issuing credit note: {}", creditNoteId);
        
        Optional<CreditNote> creditNoteOpt = creditNoteRepository.findById(creditNoteId);
        if (creditNoteOpt.isEmpty()) {
            throw new BusinessException("Credit note not found: " + creditNoteId);
        }
        
        CreditNote creditNote = creditNoteOpt.get();
        if (creditNote.getStatus() != CreditNote.CreditNoteStatus.DRAFT) {
            throw new BusinessException("Only draft credit notes can be issued, current status: " + creditNote.getStatus());
        }
        
        creditNote.setStatus(CreditNote.CreditNoteStatus.ISSUED);
        creditNote = creditNoteRepository.save(creditNote);
        
        log.info("Successfully issued credit note: {}", creditNoteId);
        
        // Return the associated original invoice response as it was affected
        Optional<Invoice> originalInvoiceOpt = invoiceRepository.findById(creditNote.getInvoiceId());
        return originalInvoiceOpt.map(this::mapToResponse).orElse(null);
    }
    
    private BigDecimal getVatRateForTaxClass(String establishmentId, String taxClass, LocalDate date) {
        // For this implementation, we'll get the tax registration to know the country
        Optional<TaxRegistration> taxRegOpt = taxRegistrationRepository.findById(establishmentId);
        if (taxRegOpt.isEmpty()) {
            throw new BusinessException("Tax establishment not found: " + establishmentId);
        }
        
        String countryCode = taxRegOpt.get().getCountryCode();
        
        // Find the applicable VAT rate for the given country, tax class, and date
        List<VatRate> vatRates = vatRateRepository.findByCountryCodeAndTaxClassAndDate(countryCode, taxClass, date);
        if (vatRates.isEmpty()) {
            log.warn("No VAT rate found for country: {}, tax class: {} on date: {}, using 0.0 rate", 
                    countryCode, taxClass, date);
            return BigDecimal.ZERO;
        }
        
        // Use the most recent rate (sorted by effectiveFrom DESC in the query)
        return vatRates.get(0).getRate();
    }
    
    private InvoiceResponse mapToResponse(Invoice invoice) {
        InvoiceResponse response = new InvoiceResponse();
        response.setId(invoice.getId());
        response.setInvoiceNumber(invoice.getInvoiceNumber());
        response.setEstablishmentId(invoice.getEstablishmentId());
        response.setOrderId(invoice.getOrderId());
        response.setCustomerId(invoice.getCustomerId());
        response.setVendorId(invoice.getVendorId());
        response.setIssueDate(invoice.getIssueDate());
        response.setDueDate(invoice.getDueDate());
        response.setCurrency(invoice.getCurrency());
        response.setSubtotalAmount(invoice.getSubtotalAmount());
        response.setTaxAmount(invoice.getTaxAmount());
        response.setTotalAmount(invoice.getTotalAmount());
        response.setStatus(invoice.getStatus());
        response.setNotes(invoice.getNotes());
        response.setPoNumber(invoice.getPoNumber());
        response.setReferenceInvoiceId(invoice.getReferenceInvoiceId());
        
        if (invoice.getInvoiceLines() != null) {
            List<InvoiceResponse.InvoiceLineResponse> lineResponses = new ArrayList<>();
            for (InvoiceLine line : invoice.getInvoiceLines()) {
                InvoiceResponse.InvoiceLineResponse lineResponse = new InvoiceResponse.InvoiceLineResponse();
                lineResponse.setId(line.getId());
                lineResponse.setProductId(line.getProductId());
                lineResponse.setProductName(line.getProductName());
                lineResponse.setDescription(line.getDescription());
                lineResponse.setQuantity(line.getQuantity());
                lineResponse.setUnitPrice(line.getUnitPrice());
                lineResponse.setLineTotal(line.getLineTotal());
                lineResponse.setTaxClass(line.getTaxClass());
                lineResponse.setTaxRate(line.getTaxRate());
                lineResponse.setTaxAmount(line.getTaxAmount());
                lineResponses.add(lineResponse);
            }
            response.setInvoiceLines(lineResponses);
        }
        
        return response;
    }
    
    public InvoiceResponse getInvoiceById(String invoiceId) {
        Optional<Invoice> invoiceOpt = invoiceRepository.findById(invoiceId);
        if (invoiceOpt.isEmpty()) {
            throw new BusinessException("Invoice not found: " + invoiceId);
        }
        
        Invoice invoice = invoiceOpt.get();
        // Fetch the invoice lines as well
        List<InvoiceLine> lines = invoiceLineRepository.findByInvoiceId(invoiceId);
        invoice.setInvoiceLines(lines);
        
        return mapToResponse(invoice);
    }
    
    private InvoiceResponse mapToResponse(CreditNote creditNote) {
        // For credit notes, returning the original invoice that was affected
        Optional<Invoice> originalInvoiceOpt = invoiceRepository.findById(creditNote.getInvoiceId());
        return originalInvoiceOpt.map(this::mapToResponse).orElse(null);
    }
    
    public String getInvoicePdfSignedUrl(String invoiceId) {
        Optional<Invoice> invoiceOpt = invoiceRepository.findById(invoiceId);
        if (invoiceOpt.isEmpty()) {
            throw new BusinessException("Invoice not found: " + invoiceId);
        }
        
        Invoice invoice = invoiceOpt.get();
        if (invoice.getPdfLocation() == null) {
            // If PDF doesn't exist, generate it
            String pdfLocation = invoicePdfService.generateAndUploadInvoicePdf(invoiceId);
            invoice.setPdfLocation(pdfLocation);
            invoiceRepository.save(invoice);
        }
        
        // Generate a signed URL valid for 1 hour
        return invoicePdfService.generateSignedUrl(invoice.getPdfLocation(), java.time.Duration.ofHours(1));
    }
    
    // Internal method to get invoice entity (not the response DTO)
    public Optional<Invoice> getInvoiceByIdInternal(String invoiceId) {
        return invoiceRepository.findById(invoiceId);
    }
    
    @Transactional
    public InvoiceResponse issueInvoice(String invoiceId) {
        log.info("Issuing invoice: {}", invoiceId);
        
        Optional<Invoice> invoiceOpt = invoiceRepository.findById(invoiceId);
        if (invoiceOpt.isEmpty()) {
            throw new BusinessException("Invoice not found: " + invoiceId);
        }
        
        Invoice invoice = invoiceOpt.get();
        if (invoice.getStatus() != Invoice.InvoiceStatus.DRAFT) {
            throw new BusinessException("Only draft invoices can be issued, current status: " + invoice.getStatus());
        }
        
        invoice.setStatus(Invoice.InvoiceStatus.ISSUED);
        invoice = invoiceRepository.save(invoice);
        
        // Send notification email after issuing the invoice
        try {
            invoiceNotificationService.sendInvoiceNotification(invoiceId);
        } catch (Exception e) {
            log.error("Failed to send notification for invoice: {}", invoiceId, e);
            // Don't fail the invoice issuance if email sending fails
        }
        
        log.info("Successfully issued invoice: {}", invoiceId);
        return mapToResponse(invoice);
    }
}