import { InjectionToken } from '@angular/core';
import { LanguageService, Locale } from './language.service';

export const ACTIVE_LOCALE = new InjectionToken<string>('ACTIVE_LOCALE');

export function provideActiveLocale() {
  return {
    provide: ACTIVE_LOCALE,
    useFactory: (languageService: LanguageService): string => {
      return languageService.getCurrentLocale();
    },
    deps: [LanguageService]
  };
}