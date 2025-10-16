package com.p4.backend.shared.kernel;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Currency;

import com.p4.backend.shared.kernel.Money;

/**
 * Value object representing tax calculation details.
 * TaxLine contains information about tax jurisdiction, rate, base amount, and calculated tax amount.
 */
@Getter
@ToString
@EqualsAndHashCode
public class TaxLine {

    private static final int DEFAULT_SCALE = 2;
    private static final RoundingMode DEFAULT_ROUNDING = RoundingMode.HALF_UP;

    private final String jurisdiction;
    private final BigDecimal rate;  // As a decimal (e.g., 0.15 for 15%)
    private final Money baseAmount; // The amount that the tax is being applied to
    private final Money taxAmount;  // The calculated tax amount

    /**
     * Creates a new TaxLine object with the specified parameters.
     *
     * @param jurisdiction the tax jurisdiction (e.g., country, state, province)
     * @param rate the tax rate as a decimal (e.g., 0.15 for 15%)
     * @param baseAmount the base amount to which the tax is applied
     * @throws IllegalArgumentException if any parameter is invalid
     */
    @JsonCreator
    public TaxLine(
            @JsonProperty("jurisdiction") String jurisdiction,
            @JsonProperty("rate") BigDecimal rate,
            @JsonProperty("baseAmount") Money baseAmount) {
        
        if (jurisdiction == null || jurisdiction.trim().isEmpty()) {
            throw new IllegalArgumentException("Jurisdiction cannot be null or empty");
        }
        
        if (rate == null) {
            throw new IllegalArgumentException("Rate cannot be null");
        }
        
        if (rate.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Rate cannot be negative");
        }
        
        if (baseAmount == null) {
            throw new IllegalArgumentException("Base amount cannot be null");
        }

        this.jurisdiction = jurisdiction.trim();
        this.rate = rate.setScale(4, RoundingMode.HALF_UP); // More precision for rates
        this.baseAmount = baseAmount;
        
        // Calculate tax amount: baseAmount * rate
        BigDecimal taxValue = baseAmount.getAmount().multiply(this.rate);
        this.taxAmount = new Money(taxValue, baseAmount.getCurrency());
    }

    /**
     * Creates a new TaxLine with a double rate value.
     *
     * @param jurisdiction the tax jurisdiction
     * @param rate the tax rate as a double (e.g., 0.15 for 15%)
     * @param baseAmount the base amount to which the tax is applied
     */
    public TaxLine(String jurisdiction, double rate, Money baseAmount) {
        this(jurisdiction, BigDecimal.valueOf(rate), baseAmount);
    }

    /**
     * Creates a new TaxLine with a double rate value and currency code.
     *
     * @param jurisdiction the tax jurisdiction
     * @param rate the tax rate as a double (e.g., 0.15 for 15%)
     * @param baseAmount the base amount as a BigDecimal
     * @param currencyCode the currency code for the amounts
     */
    public TaxLine(String jurisdiction, double rate, BigDecimal baseAmount, String currencyCode) {
        this(jurisdiction, rate, new Money(baseAmount, currencyCode));
    }

    /**
     * Returns the tax rate as a percentage value (e.g., 15.0 for 15%).
     *
     * @return the tax rate as percentage
     */
    public double getRateAsPercentage() {
        return this.rate.multiply(BigDecimal.valueOf(100)).doubleValue();
    }

    /**
     * Calculates the total amount (base + tax).
     *
     * @return the total amount including tax
     */
    public Money getTotalAmount() {
        return baseAmount.add(taxAmount);
    }
}