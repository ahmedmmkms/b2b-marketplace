package com.p4.backend.rfq.controller;

import com.p4.backend.rfq.entity.Quote;
import com.p4.backend.rfq.entity.QuoteLine;
import com.p4.backend.rfq.service.QuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    @Autowired
    private QuoteService quoteService;

    @PostMapping
    public ResponseEntity<Quote> createQuote(@RequestBody CreateQuoteRequest request) throws Exception {
        Quote quote = request.getQuote();
        List<QuoteLine> quoteLines = request.getQuoteLines();
        
        // In a real implementation, you would extract the userId from the authenticated user context
        // For now, using a placeholder userId
        String userId = "PLACEHOLDER_USER_ID"; // This should be replaced with actual user authentication
        Quote createdQuote = quoteService.createQuote(quote, quoteLines, userId);
        return ResponseEntity.ok(createdQuote);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quote> getQuoteById(@PathVariable String id) {
        return quoteService.getQuoteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/rfq/{rfqId}")
    public ResponseEntity<List<Quote>> getQuotesByRfqId(@PathVariable String rfqId) {
        List<Quote> quotes = quoteService.getQuotesByRfqId(rfqId);
        return ResponseEntity.ok(quotes);
    }

    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<Quote>> getQuotesByVendorId(@PathVariable String vendorId) {
        List<Quote> quotes = quoteService.getQuotesByVendorId(vendorId);
        return ResponseEntity.ok(quotes);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateQuoteStatus(@PathVariable String id, @RequestBody UpdateQuoteStatusRequest request) throws Exception {
        // In a real implementation, you would extract the userId from the authenticated user context
        // For now, using a placeholder userId
        String userId = "PLACEHOLDER_USER_ID"; // This should be replaced with actual user authentication
        quoteService.updateQuoteStatus(id, request.getStatus(), userId);
        return ResponseEntity.ok().build();
    }

    // Inner request classes
    public static class CreateQuoteRequest {
        private Quote quote;
        private List<QuoteLine> quoteLines;

        public Quote getQuote() {
            return quote;
        }

        public void setQuote(Quote quote) {
            this.quote = quote;
        }

        public List<QuoteLine> getQuoteLines() {
            return quoteLines;
        }

        public void setQuoteLines(List<QuoteLine> quoteLines) {
            this.quoteLines = quoteLines;
        }
    }

    public static class UpdateQuoteStatusRequest {
        private Quote.QuoteStatus status;

        public Quote.QuoteStatus getStatus() {
            return status;
        }

        public void setStatus(Quote.QuoteStatus status) {
            this.status = status;
        }
    }
}