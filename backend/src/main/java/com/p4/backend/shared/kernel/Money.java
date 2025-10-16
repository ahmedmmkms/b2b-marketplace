package com.p4.backend.shared.kernel;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Currency;

/**
 * Value object representing monetary amounts with currency.
 * Money objects are immutable and handle arithmetic operations correctly.
 */
@Getter
@ToString
@EqualsAndHashCode
public class Money {

    private static final int DEFAULT_SCALE = 2;
    private static final RoundingMode DEFAULT_ROUNDING = RoundingMode.HALF_UP;

    private final BigDecimal amount;
    private final Currency currency;

    /**
     * Creates a new Money object with the specified amount and currency.
     *
     * @param amount   the monetary amount as a BigDecimal
     * @param currency the currency code
     * @throws IllegalArgumentException if amount or currency is null
     */
    @JsonCreator
    public Money(@JsonProperty("amount") BigDecimal amount, @JsonProperty("currency") Currency currency) {
        if (amount == null) {
            throw new IllegalArgumentException("Amount cannot be null");
        }
        if (currency == null) {
            throw new IllegalArgumentException("Currency cannot be null");
        }
        this.amount = amount.setScale(DEFAULT_SCALE, DEFAULT_ROUNDING);
        this.currency = currency;
    }

    /**
     * Creates a new Money object with the specified amount and currency code.
     *
     * @param amount        the monetary amount as a BigDecimal
     * @param currencyCode  the currency code as a string (e.g., "USD", "EUR", "SAR")
     */
    public Money(BigDecimal amount, String currencyCode) {
        this(amount, Currency.getInstance(currencyCode));
    }

    /**
     * Creates a new Money object with the specified amount and currency.
     *
     * @param amount   the monetary amount as a double
     * @param currency the currency code
     */
    public Money(double amount, Currency currency) {
        this(BigDecimal.valueOf(amount), currency);
    }

    /**
     * Creates a new Money object with the specified amount and currency code.
     *
     * @param amount        the monetary amount as a double
     * @param currencyCode  the currency code as a string (e.g., "USD", "EUR", "SAR")
     */
    public Money(double amount, String currencyCode) {
        this(BigDecimal.valueOf(amount), currencyCode);
    }

    /**
     * Adds another Money object to this one.
     *
     * @param other the other Money object to add
     * @return a new Money object representing the sum
     * @throws IllegalArgumentException if the currencies don't match
     */
    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Cannot add Money objects with different currencies");
        }
        BigDecimal newAmount = this.amount.add(other.amount);
        return new Money(newAmount, this.currency);
    }

    /**
     * Subtracts another Money object from this one.
     *
     * @param other the other Money object to subtract
     * @return a new Money object representing the difference
     * @throws IllegalArgumentException if the currencies don't match
     */
    public Money subtract(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Cannot subtract Money objects with different currencies");
        }
        BigDecimal newAmount = this.amount.subtract(other.amount);
        return new Money(newAmount, this.currency);
    }

    /**
     * Multiplies this Money object by a factor.
     *
     * @param factor the factor to multiply by
     * @return a new Money object representing the product
     */
    public Money multiply(double factor) {
        BigDecimal newAmount = this.amount.multiply(BigDecimal.valueOf(factor));
        return new Money(newAmount, this.currency);
    }

    /**
     * Divides this Money object by a divisor.
     *
     * @param divisor the divisor to divide by
     * @return a new Money object representing the quotient
     */
    public Money divide(double divisor) {
        if (divisor == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }
        BigDecimal newAmount = this.amount.divide(BigDecimal.valueOf(divisor), DEFAULT_ROUNDING);
        return new Money(newAmount, this.currency);
    }

    /**
     * Checks if this Money object is greater than another.
     *
     * @param other the other Money object to compare with
     * @return true if this is greater than other, false otherwise
     * @throws IllegalArgumentException if the currencies don't match
     */
    public boolean isGreaterThan(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Cannot compare Money objects with different currencies");
        }
        return this.amount.compareTo(other.amount) > 0;
    }

    /**
     * Checks if this Money object is greater than or equal to another.
     *
     * @param other the other Money object to compare with
     * @return true if this is greater than or equal to other, false otherwise
     * @throws IllegalArgumentException if the currencies don't match
     */
    public boolean isGreaterThanOrEqual(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Cannot compare Money objects with different currencies");
        }
        return this.amount.compareTo(other.amount) >= 0;
    }

    /**
     * Checks if this Money object is less than another.
     *
     * @param other the other Money object to compare with
     * @return true if this is less than other, false otherwise
     * @throws IllegalArgumentException if the currencies don't match
     */
    public boolean isLessThan(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Cannot compare Money objects with different currencies");
        }
        return this.amount.compareTo(other.amount) < 0;
    }

    /**
     * Checks if this Money object is less than or equal to another.
     *
     * @param other the other Money object to compare with
     * @return true if this is less than or equal to other, false otherwise
     * @throws IllegalArgumentException if the currencies don't match
     */
    public boolean isLessThanOrEqual(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Cannot compare Money objects with different currencies");
        }
        return this.amount.compareTo(other.amount) <= 0;
    }

    /**
     * Checks if this Money object is equal to another in value.
     *
     * @param other the other Money object to compare with
     * @return true if the amounts are equal, false otherwise
     * @throws IllegalArgumentException if the currencies don't match
     */
    public boolean isEqualTo(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Cannot compare Money objects with different currencies");
        }
        return this.amount.compareTo(other.amount) == 0;
    }

    /**
     * Checks if this Money represents a positive amount.
     *
     * @return true if the amount is positive, false otherwise
     */
    public boolean isPositive() {
        return this.amount.compareTo(BigDecimal.ZERO) > 0;
    }

    /**
     * Checks if this Money represents a negative amount.
     *
     * @return true if the amount is negative, false otherwise
     */
    public boolean isNegative() {
        return this.amount.compareTo(BigDecimal.ZERO) < 0;
    }

    /**
     * Checks if this Money represents zero amount.
     *
     * @return true if the amount is zero, false otherwise
     */
    public boolean isZero() {
        return this.amount.compareTo(BigDecimal.ZERO) == 0;
    }

    /**
     * Returns the absolute value of this Money object.
     *
     * @return a new Money object with the absolute value
     */
    public Money abs() {
        return new Money(this.amount.abs(), this.currency);
    }

    /**
     * Returns a new Money object with the negated value.
     *
     * @return a new Money object with the negated value
     */
    public Money negate() {
        return new Money(this.amount.negate(), this.currency);
    }

    /**
     * Creates a zero Money object for the specified currency.
     *
     * @param currency the currency for the zero amount
     * @return a Money object with zero amount and the specified currency
     */
    public static Money zero(Currency currency) {
        return new Money(BigDecimal.ZERO, currency);
    }

    /**
     * Creates a zero Money object for the specified currency code.
     *
     * @param currencyCode the currency code as a string (e.g., "USD", "EUR", "SAR")
     * @return a Money object with zero amount and the specified currency
     */
    public static Money zero(String currencyCode) {
        return new Money(BigDecimal.ZERO, currencyCode);
    }
}