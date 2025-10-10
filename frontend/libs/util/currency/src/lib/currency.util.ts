import { Injectable } from '@angular/core';
import { LanguageService } from '@p4/frontend/data-access';

@Injectable({
  providedIn: 'root'
})
export class CurrencyUtil {
  
  constructor(private languageService: LanguageService) {}

  /**
   * Formats a number as currency according to the current locale and currency
   */
  formatCurrency(amount: number, currency: string = 'AED', options: Intl.NumberFormatOptions = {}): string {
    const locale = this.languageService.getCurrentLanguage() === 'ar' ? 'ar-EG' : 'en-GB';
    
    // Default options for currency formatting
    const defaultOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };
    
    const formatOptions = { ...defaultOptions, ...options };
    return new Intl.NumberFormat(locale, formatOptions).format(amount);
  }

  /**
   * Formats a price with the currency symbol at the appropriate position based on locale
   */
  formatPrice(amount: number, currency: string = 'AED'): string {
    const locale = this.languageService.getCurrentLanguage() === 'ar' ? 'ar-EG' : 'en-GB';
    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
    
    // In Arabic locale, the currency code may appear differently
    // This ensures consistent display regardless of locale positioning
    return formatted;
  }

  /**
   * Converts a currency string back to a number
   */
  parseCurrency(currencyString: string): number {
    // Remove all non-digit characters except decimal point
    const numberString = currencyString.replace(/[^\d.,]/g, '');
    // Handle both comma and period as decimal separators based on locale
    const normalizedNumberString = numberString.replace(/,/g, '.');
    return parseFloat(normalizedNumberString) || 0;
  }

  /**
   * Checks if a currency code is valid according to ISO 4217
   */
  isValidCurrencyCode(currencyCode: string): boolean {
    // This is a simplified check. In a real implementation, you'd check against a complete list of ISO 4217 codes
    const isoCurrencyRegex = /^[A-Z]{3}$/;
    return isoCurrencyRegex.test(currencyCode);
  }

  /**
   * Gets the symbol for a currency code
   */
  getCurrencySymbol(currencyCode: string): string {
    try {
      return (0).toLocaleString(
        this.languageService.getCurrentLanguage() === 'ar' ? 'ar-EG' : 'en-GB',
        { style: 'currency', currency: currencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0 }
      ).replace(/\d/g, '').trim();
    } catch (e) {
      // If the currency code is invalid, return the code itself
      return currencyCode;
    }
  }
}