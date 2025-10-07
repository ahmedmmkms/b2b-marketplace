package com.p4.backend.rfq.service;

import com.p4.backend.catalog.entity.Vendor;
import com.p4.backend.catalog.repository.VendorRepository;
import com.p4.backend.ops.service.AuditService;
import com.p4.backend.rfq.entity.Quote;
import com.p4.backend.rfq.entity.QuoteLine;
import com.p4.backend.rfq.entity.Rfq;
import com.p4.backend.rfq.entity.RfqLine;
import com.p4.backend.rfq.repository.QuoteLineRepository;
import com.p4.backend.rfq.repository.QuoteRepository;
import com.p4.backend.rfq.repository.RfqLineRepository;
import com.p4.backend.rfq.repository.RfqRepository;
import com.p4.backend.shared.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QuoteService {

    @Autowired
    private QuoteRepository quoteRepository;

    @Autowired
    private QuoteLineRepository quoteLineRepository;

    @Autowired
    private RfqRepository rfqRepository;

    @Autowired
    private RfqLineRepository rfqLineRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private AuditService auditService;

    @Transactional
    public Quote createQuote(Quote quote, List<QuoteLine> quoteLines, String userId) {
        // Validate that the RFQ exists and is still open
        Optional<Rfq> rfqOpt = rfqRepository.findById(quote.getRfqId());
        if (rfqOpt.isEmpty()) {
            throw new BusinessException("RFQ not found: " + quote.getRfqId());
        }

        Rfq rfq = rfqOpt.get();
        if (rfq.getStatus() != Rfq.RfqStatus.PUBLISHED) {
            throw new BusinessException("Cannot quote RFQ with status: " + rfq.getStatus());
        }

        if (rfq.getValidUntil().isBefore(LocalDateTime.now())) {
            throw new BusinessException("RFQ has expired and cannot be quoted");
        }

        // Validate that the vendor exists
        Optional<Vendor> vendorOpt = vendorRepository.findById(quote.getVendorId());
        if (vendorOpt.isEmpty()) {
            throw new BusinessException("Vendor not found: " + quote.getVendorId());
        }

        // Validate all quote lines reference valid RFQ lines
        for (QuoteLine quoteLine : quoteLines) {
            Optional<RfqLine> rfqLineOpt = rfqLineRepository.findById(quoteLine.getRfqLineId());
            if (rfqLineOpt.isEmpty()) {
                throw new BusinessException("RFQ line not found: " + quoteLine.getRfqLineId());
            }
        }

        // Calculate total amount from quote lines
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (QuoteLine quoteLine : quoteLines) {
            // Validate MOQ (minimum order quantity)
            if (quoteLine.getQuantity() < quoteLine.getMoq()) {
                throw new BusinessException("Quantity " + quoteLine.getQuantity() + 
                    " is below MOQ " + quoteLine.getMoq() + " for line " + quoteLine.getId());
            }
            
            totalAmount = totalAmount.add(quoteLine.getLineTotal());
        }

        // Set the calculated total amount
        quote.setTotalAmount(totalAmount);

        // Set status to SUBMITTED
        quote.setStatus(Quote.QuoteStatus.SUBMITTED);

        // Save the quote
        Quote savedQuote = quoteRepository.save(quote);

        // Set quote ID for each line and save them
        for (QuoteLine quoteLine : quoteLines) {
            quoteLine.setQuoteId(savedQuote.getId());
            quoteLineRepository.save(quoteLine);
        }

        // Log the creation action
        auditService.logAction(userId, "QUOTE", savedQuote.getId(), "CREATE");

        return savedQuote;
    }

    public Optional<Quote> getQuoteById(String id) {
        return quoteRepository.findById(id);
    }

    public List<Quote> getQuotesByRfqId(String rfqId) {
        return quoteRepository.findByRfqId(rfqId);
    }

    public List<Quote> getQuotesByVendorId(String vendorId) {
        return quoteRepository.findByVendorId(vendorId);
    }

    public void updateQuoteStatus(String quoteId, Quote.QuoteStatus newStatus, String userId) {
        Optional<Quote> quoteOpt = quoteRepository.findById(quoteId);
        if (quoteOpt.isEmpty()) {
            throw new BusinessException("Quote not found: " + quoteId);
        }

        Quote quote = quoteOpt.get();
        Quote.QuoteStatus oldStatus = quote.getStatus();
        quote.setStatus(newStatus);
        quoteRepository.save(quote);
        
        // Log the status update action
        auditService.logAction(userId, "QUOTE", quoteId, "UPDATE_STATUS", 
            "Status changed from " + oldStatus + " to " + newStatus);
    }
    
    public void expireQuotes() {
        List<Quote> expiredQuotes = quoteRepository.findByValidUntilBefore(LocalDateTime.now());
        for (Quote quote : expiredQuotes) {
            if (quote.getStatus() == Quote.QuoteStatus.SUBMITTED) {
                // Only log if the status is actually changing
                if (quote.getStatus() != Quote.QuoteStatus.EXPIRED) {
                    quote.setStatus(Quote.QuoteStatus.EXPIRED);
                    quoteRepository.save(quote);
                }
            }
        }
    }
}