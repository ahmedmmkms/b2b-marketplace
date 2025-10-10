package com.p4.backend.invoicing.service;

import com.p4.backend.invoicing.entity.TaxRegistration;
import com.p4.backend.invoicing.entity.VatRate;
import com.p4.backend.invoicing.repository.TaxRegistrationRepository;
import com.p4.backend.invoicing.repository.VatRateRepository;
import com.p4.backend.orders.entity.Order;
import com.p4.backend.orders.entity.OrderLine;
import com.p4.backend.shared.exception.BusinessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class VatCalculationService {
    
    private static final Logger log = LoggerFactory.getLogger(VatCalculationService.class);
    
    private final TaxRegistrationRepository taxRegistrationRepository;
    private final VatRateRepository vatRateRepository;
    
    public VatCalculationService(TaxRegistrationRepository taxRegistrationRepository,
                                VatRateRepository vatRateRepository) {
        this.taxRegistrationRepository = taxRegistrationRepository;
        this.vatRateRepository = vatRateRepository;
    }

    /**
     * Calculate VAT for an entire order based on the establishment and product tax classes
     */
    public VatCalculationResult calculateVatForOrder(Order order, String establishmentId) {
        // Get the tax registration to know the country
        Optional<TaxRegistration> taxRegOpt = taxRegistrationRepository.findById(establishmentId);
        if (taxRegOpt.isEmpty()) {
            throw new RuntimeException(new BusinessException("Tax establishment not found: " + establishmentId));
        }
        
        String countryCode = taxRegOpt.get().getCountryCode();
        
        BigDecimal totalTax = BigDecimal.ZERO;
        BigDecimal subtotal = BigDecimal.ZERO;
        
        // Calculate VAT for each order line
        for (OrderLine line : order.getOrderLines()) {
            BigDecimal lineSubtotal = line.getUnitPrice().getAmount().multiply(new BigDecimal(line.getQuantity()));
            subtotal = subtotal.add(lineSubtotal);
            
            // Get the applicable VAT rate for this tax class on the order date
            BigDecimal taxRate = getVatRateForTaxClass(countryCode, line.getTaxClass(), order.getCreatedAt().toLocalDate());
            
            // Calculate tax amount for this line
            BigDecimal lineTax = lineSubtotal.multiply(taxRate).setScale(2, RoundingMode.HALF_UP);
            totalTax = totalTax.add(lineTax);
        }
        
        BigDecimal totalAmount = subtotal.add(totalTax);
        
        VatCalculationResult result = new VatCalculationResult();
        result.setSubtotal(subtotal);
        result.setTotalTax(totalTax);
        result.setTotalAmount(totalAmount);
        
        return result;
    }
    
    /**
     * Get the applicable VAT rate for a given country, tax class and date
     */
    public BigDecimal getVatRateForTaxClass(String countryCode, String taxClass, LocalDate date) {
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
    
    /**
     * Result class for VAT calculation
     */
    public static class VatCalculationResult {
        private BigDecimal subtotal;
        private BigDecimal totalTax;
        private BigDecimal totalAmount;
        
        // Getters and setters
        public BigDecimal getSubtotal() {
            return subtotal;
        }
        
        public void setSubtotal(BigDecimal subtotal) {
            this.subtotal = subtotal;
        }
        
        public BigDecimal getTotalTax() {
            return totalTax;
        }
        
        public void setTotalTax(BigDecimal totalTax) {
            this.totalTax = totalTax;
        }
        
        public BigDecimal getTotalAmount() {
            return totalAmount;
        }
        
        public void setTotalAmount(BigDecimal totalAmount) {
            this.totalAmount = totalAmount;
        }
    }
}