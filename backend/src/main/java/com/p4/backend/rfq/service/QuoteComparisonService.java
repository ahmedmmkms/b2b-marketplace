package com.p4.backend.rfq.service;

import com.p4.backend.ops.service.AuditService;
import com.p4.backend.rfq.entity.Quote;
import com.p4.backend.rfq.entity.QuoteLine;
import com.p4.backend.rfq.entity.Rfq;
import com.p4.backend.rfq.repository.QuoteLineRepository;
import com.p4.backend.rfq.repository.QuoteRepository;
import com.p4.backend.rfq.repository.RfqRepository;
import com.p4.backend.shared.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuoteComparisonService {

    @Autowired
    private QuoteRepository quoteRepository;

    @Autowired
    private QuoteLineRepository quoteLineRepository;

    @Autowired
    private RfqRepository rfqRepository;

    @Autowired
    private AuditService auditService;

    public List<Quote> getQuotesForComparison(String rfqId) throws BusinessException {
        // Validate that the RFQ exists
        Optional<Rfq> rfqOpt = rfqRepository.findById(rfqId);
        if (rfqOpt.isEmpty()) {
            throw new BusinessException("RFQ not found: " + rfqId);
        }

        // Get all submitted quotes for the RFQ that haven't expired
        List<Quote> quotes = quoteRepository.findByRfqIdAndStatus(rfqId, Quote.QuoteStatus.SUBMITTED);

        // Filter out expired quotes
        quotes.removeIf(quote -> quote.getValidUntil().isBefore(java.time.LocalDateTime.now()));

        return quotes;
    }

    public List<QuoteLine> getQuoteLinesForQuote(String quoteId) {
        return quoteLineRepository.findByQuoteId(quoteId);
    }

    public void acceptQuote(String quoteId, String acceptedByUserId) throws BusinessException {
        Optional<Quote> quoteOpt = quoteRepository.findById(quoteId);
        if (quoteOpt.isEmpty()) {
            throw new BusinessException("Quote not found: " + quoteId);
        }

        Quote quote = quoteOpt.get();
        
        // Check if the quote is still valid for acceptance
        if (quote.getStatus() == Quote.QuoteStatus.ACCEPTED) {
            throw new BusinessException("Quote already accepted");
        }
        
        if (quote.getStatus() == Quote.QuoteStatus.DECLINED) {
            throw new BusinessException("Quote already declined");
        }
        
        if (quote.getStatus() == Quote.QuoteStatus.EXPIRED) {
            throw new BusinessException("Cannot accept an expired quote");
        }
        
        if (quote.getValidUntil().isBefore(java.time.LocalDateTime.now())) {
            throw new BusinessException("Cannot accept an expired quote");
        }

        // Update the quote status to accepted
        Quote.QuoteStatus oldStatus = quote.getStatus();
        quote.setStatus(Quote.QuoteStatus.ACCEPTED);
        quote.setAcceptedAt(java.time.LocalDateTime.now());
        quote.setAcceptedById(acceptedByUserId);
        
        quoteRepository.save(quote);
        
        // Log the acceptance action
        auditService.logAction(acceptedByUserId, "QUOTE", quoteId, "ACCEPT", 
            null, null);
    }

    public void declineQuote(String quoteId, String declinedByUserId) throws BusinessException {
        Optional<Quote> quoteOpt = quoteRepository.findById(quoteId);
        if (quoteOpt.isEmpty()) {
            throw new BusinessException("Quote not found: " + quoteId);
        }

        Quote quote = quoteOpt.get();
        
        // Check if the quote can be declined
        if (quote.getStatus() == Quote.QuoteStatus.ACCEPTED) {
            throw new BusinessException("Cannot decline an already accepted quote");
        }
        
        if (quote.getStatus() == Quote.QuoteStatus.DECLINED) {
            throw new BusinessException("Quote already declined");
        }

        // Update the quote status to declined
        Quote.QuoteStatus oldStatus = quote.getStatus();
        quote.setStatus(Quote.QuoteStatus.DECLINED);
        
        quoteRepository.save(quote);
        
        // Log the decline action
        auditService.logAction(declinedByUserId, "QUOTE", quoteId, "DECLINE", 
            null, null);
    }
}