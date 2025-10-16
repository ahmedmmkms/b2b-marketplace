package com.p4.backend.test;

import com.p4.backend.shared.kernel.Money;
import com.p4.backend.shared.kernel.TaxLine;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Currency;

/**
 * Test controller to expose TaxLine value object functionality for production testing.
 */
@RestController
@RequestMapping("/api/test")
public class TaxLineTestController {

    /**
     * Endpoint to test TaxLine creation and calculations.
     */
    @PostMapping("/taxline")
    public ResponseEntity<TaxLineTestResponse> testTaxLine(@RequestBody TaxLineTestRequest request) {
        try {
            // Create Money object for base amount
            Currency currency = Currency.getInstance(request.getCurrencyCode());
            Money baseAmount = new Money(request.getBaseAmount(), currency);

            // Create TaxLine object
            TaxLine taxLine = new TaxLine(request.getJurisdiction(), request.getRate(), baseAmount);

            TaxLineTestResponse response = new TaxLineTestResponse();
            response.setJurisdiction(taxLine.getJurisdiction());
            response.setRate(taxLine.getRate());
            response.setBaseAmount(taxLine.getBaseAmount());
            response.setTaxAmount(taxLine.getTaxAmount());
            response.setTotalAmount(taxLine.getTotalAmount());
            response.setRateAsPercentage(taxLine.getRateAsPercentage());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Request class for TaxLine tests.
     */
    public static class TaxLineTestRequest {
        private String jurisdiction;
        private double rate;
        private BigDecimal baseAmount;
        private String currencyCode;

        public TaxLineTestRequest() {}

        public String getJurisdiction() { return jurisdiction; }
        public void setJurisdiction(String jurisdiction) { this.jurisdiction = jurisdiction; }

        public double getRate() { return rate; }
        public void setRate(double rate) { this.rate = rate; }

        public BigDecimal getBaseAmount() { return baseAmount; }
        public void setBaseAmount(BigDecimal baseAmount) { this.baseAmount = baseAmount; }

        public String getCurrencyCode() { return currencyCode; }
        public void setCurrencyCode(String currencyCode) { this.currencyCode = currencyCode; }
    }

    /**
     * Response class for TaxLine tests.
     */
    public static class TaxLineTestResponse {
        private String jurisdiction;
        private java.math.BigDecimal rate;
        private com.p4.backend.shared.kernel.Money baseAmount;
        private com.p4.backend.shared.kernel.Money taxAmount;
        private com.p4.backend.shared.kernel.Money totalAmount;
        private double rateAsPercentage;

        public TaxLineTestResponse() {}

        public String getJurisdiction() { return jurisdiction; }
        public void setJurisdiction(String jurisdiction) { this.jurisdiction = jurisdiction; }

        public java.math.BigDecimal getRate() { return rate; }
        public void setRate(java.math.BigDecimal rate) { this.rate = rate; }

        public com.p4.backend.shared.kernel.Money getBaseAmount() { return baseAmount; }
        public void setBaseAmount(com.p4.backend.shared.kernel.Money baseAmount) { this.baseAmount = baseAmount; }

        public com.p4.backend.shared.kernel.Money getTaxAmount() { return taxAmount; }
        public void setTaxAmount(com.p4.backend.shared.kernel.Money taxAmount) { this.taxAmount = taxAmount; }

        public com.p4.backend.shared.kernel.Money getTotalAmount() { return totalAmount; }
        public void setTotalAmount(com.p4.backend.shared.kernel.Money totalAmount) { this.totalAmount = totalAmount; }

        public double getRateAsPercentage() { return rateAsPercentage; }
        public void setRateAsPercentage(double rateAsPercentage) { this.rateAsPercentage = rateAsPercentage; }
    }
}