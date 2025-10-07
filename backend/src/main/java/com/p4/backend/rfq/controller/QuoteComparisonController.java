package com.p4.backend.rfq.controller;

import com.p4.backend.rfq.entity.Quote;
import com.p4.backend.rfq.entity.QuoteLine;
import com.p4.backend.rfq.service.QuoteComparisonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotes/comparison")
public class QuoteComparisonController {

    @Autowired
    private QuoteComparisonService quoteComparisonService;

    @GetMapping("/rfq/{rfqId}")
    public ResponseEntity<List<Quote>> getQuotesForComparison(@PathVariable String rfqId) {
        List<Quote> quotes = quoteComparisonService.getQuotesForComparison(rfqId);
        return ResponseEntity.ok(quotes);
    }

    @GetMapping("/{quoteId}/lines")
    public ResponseEntity<List<QuoteLine>> getQuoteLinesForQuote(@PathVariable String quoteId) {
        List<QuoteLine> quoteLines = quoteComparisonService.getQuoteLinesForQuote(quoteId);
        return ResponseEntity.ok(quoteLines);
    }

    @PostMapping("/{quoteId}/accept")
    public ResponseEntity<Void> acceptQuote(@PathVariable String quoteId, @RequestBody AcceptQuoteRequest request) {
        quoteComparisonService.acceptQuote(quoteId, request.getUserId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{quoteId}/decline")
    public ResponseEntity<Void> declineQuote(@PathVariable String quoteId, @RequestBody DeclineQuoteRequest request) {
        quoteComparisonService.declineQuote(quoteId, request.getUserId());
        return ResponseEntity.ok().build();
    }

    // Inner request classes
    public static class AcceptQuoteRequest {
        private String userId;

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }
    }

    public static class DeclineQuoteRequest {
        private String userId;

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }
    }
}