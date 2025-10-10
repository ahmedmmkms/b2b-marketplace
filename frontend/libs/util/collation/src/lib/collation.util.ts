import { Injectable } from '@angular/core';
import { LanguageService } from '@p4/frontend/data-access';

@Injectable({
  providedIn: 'root'
})
export class CollationUtil {
  
  constructor(private languageService: LanguageService) {}

  /**
   * Creates a collator based on the current language setting
   */
  getCollator(): Intl.Collator {
    const currentLang = this.languageService.getCurrentLanguage();
    return new Intl.Collator(currentLang === 'ar' ? 'ar' : 'en', { 
      sensitivity: 'base', 
      numeric: true 
    });
  }

  /**
   * Sorts an array of objects by a provided label getter function using locale-aware collation
   */
  sortByLocalized<T>(items: T[], labelGetter: (item: T) => string): T[] {
    const collator = this.getCollator();
    return [...items].sort((a, b) => 
      collator.compare(labelGetter(a), labelGetter(b))
    );
  }

  /**
   * Sorts an array of strings using locale-aware collation
   */
  sortStringsLocalized(strings: string[]): string[] {
    const collator = this.getCollator();
    return [...strings].sort((a, b) => collator.compare(a, b));
  }

  /**
   * Compares two strings using locale-aware collation
   */
  compareLocalized(str1: string, str2: string): number {
    const collator = this.getCollator();
    return collator.compare(str1, str2);
  }
}