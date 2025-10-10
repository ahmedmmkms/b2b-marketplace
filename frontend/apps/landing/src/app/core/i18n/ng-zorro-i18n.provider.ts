import { Provider } from '@angular/core';
import { NZ_I18N, en_US, ar_EG, NzI18nInterface } from 'ng-zorro-antd/i18n';
import { LanguageService } from './language.service';

export function provideNzI18n(): Provider {
  return {
    provide: NZ_I18N,
    useFactory: (languageService: LanguageService): NzI18nInterface => {
      const currentLang = languageService.getCurrentLanguage();
      return currentLang === 'ar' ? ar_EG : en_US;
    },
    deps: [LanguageService]
  };
}