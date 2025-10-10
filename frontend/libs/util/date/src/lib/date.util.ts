import { Injectable } from '@angular/core';
import { LanguageService } from '@p4/frontend/data-access';

@Injectable({
  providedIn: 'root'
})
export class DateUtil {
  
  constructor(private languageService: LanguageService) {}

  /**
   * Formats a date according to the current locale
   */
  formatDate(date: Date | string, options: Intl.DateTimeFormatOptions = {}): string {
    const locale = this.languageService.getCurrentLanguage() === 'ar' ? 'ar-EG' : 'en-GB';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Default options for date formatting
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    const formatOptions = { ...defaultOptions, ...options };
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  }

  /**
   * Formats time according to the current locale
   */
  formatTime(date: Date | string, options: Intl.DateTimeFormatOptions = {}): string {
    const locale = this.languageService.getCurrentLanguage() === 'ar' ? 'ar-EG' : 'en-GB';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Default options for time formatting
    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
    };
    
    const formatOptions = { ...defaultOptions, ...options };
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  }

  /**
   * Formats datetime according to the current locale
   */
  formatDateTime(date: Date | string, options: Intl.DateTimeFormatOptions = {}): string {
    const locale = this.languageService.getCurrentLanguage() === 'ar' ? 'ar-EG' : 'en-GB';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Default options for datetime formatting
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    const formatOptions = { ...defaultOptions, ...options };
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  }

  /**
   * Calculates the difference between two dates in days
   */
  dateDifferenceInDays(date1: Date, date2: Date): number {
    const timeDifference = date2.getTime() - date1.getTime();
    return Math.round(timeDifference / (1000 * 3600 * 24));
  }

  /**
   * Checks if a date is in the past
   */
  isPast(date: Date | string): boolean {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj < new Date();
  }

  /**
   * Checks if a date is in the future
   */
  isFuture(date: Date | string): boolean {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj > new Date();
  }

  /**
   * Adds days to a date
   */
  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}