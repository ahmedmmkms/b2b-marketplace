package com.p4.backend.test;

import com.p4.backend.shared.kernel.Money;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Currency;

/**
 * Test controller to expose Money value object functionality for production testing.
 */
@RestController
@RequestMapping("/api/test")
public class MoneyTestController {

    /**
     * Endpoint to test Money creation and basic operations.
     */
    @PostMapping("/money")
    public ResponseEntity<MoneyTestResponse> testMoney(@RequestBody MoneyTestRequest request) {
        try {
            // Create Money objects
            Currency currency = Currency.getInstance(request.getCurrencyCode());
            Money money1 = new Money(request.getAmount1(), currency);
            Money money2 = new Money(request.getAmount2(), currency);

            // Perform operations
            Money sum = money1.add(money2);
            Money difference = money1.subtract(money2);
            Money product = money1.multiply(request.getFactor());
            Money quotient = money1.divide(request.getDivisor());

            // Create response
            MoneyTestResponse response = new MoneyTestResponse();
            response.setOriginalMoney1(money1);
            response.setOriginalMoney2(money2);
            response.setSum(sum);
            response.setDifference(difference);
            response.setProduct(product);
            response.setQuotient(quotient);
            response.setOperationValid(true);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            MoneyTestResponse response = new MoneyTestResponse();
            response.setOperationValid(false);
            response.setError(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Request class for Money tests.
     */
    public static class MoneyTestRequest {
        private BigDecimal amount1;
        private BigDecimal amount2;
        private String currencyCode;
        private double factor;
        private double divisor;

        // Default constructor
        public MoneyTestRequest() {}

        // Getters and setters
        public BigDecimal getAmount1() { return amount1; }
        public void setAmount1(BigDecimal amount1) { this.amount1 = amount1; }

        public BigDecimal getAmount2() { return amount2; }
        public void setAmount2(BigDecimal amount2) { this.amount2 = amount2; }

        public String getCurrencyCode() { return currencyCode; }
        public void setCurrencyCode(String currencyCode) { this.currencyCode = currencyCode; }

        public double getFactor() { return factor; }
        public void setFactor(double factor) { this.factor = factor; }

        public double getDivisor() { return divisor; }
        public void setDivisor(double divisor) { this.divisor = divisor; }
    }

    /**
     * Response class for Money tests.
     */
    public static class MoneyTestResponse {
        private Money originalMoney1;
        private Money originalMoney2;
        private Money sum;
        private Money difference;
        private Money product;
        private Money quotient;
        private boolean operationValid;
        private String error;

        // Default constructor
        public MoneyTestResponse() {}

        // Getters and setters
        public Money getOriginalMoney1() { return originalMoney1; }
        public void setOriginalMoney1(Money originalMoney1) { this.originalMoney1 = originalMoney1; }

        public Money getOriginalMoney2() { return originalMoney2; }
        public void setOriginalMoney2(Money originalMoney2) { this.originalMoney2 = originalMoney2; }

        public Money getSum() { return sum; }
        public void setSum(Money sum) { this.sum = sum; }

        public Money getDifference() { return difference; }
        public void setDifference(Money difference) { this.difference = difference; }

        public Money getProduct() { return product; }
        public void setProduct(Money product) { this.product = product; }

        public Money getQuotient() { return quotient; }
        public void setQuotient(Money quotient) { this.quotient = quotient; }

        public boolean isOperationValid() { return operationValid; }
        public void setOperationValid(boolean operationValid) { this.operationValid = operationValid; }

        public String getError() { return error; }
        public void setError(String error) { this.error = error; }
    }
}