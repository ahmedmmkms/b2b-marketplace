import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

import localeEnGb from '@angular/common/locales/en-GB';
import localeArEg from '@angular/common/locales/ar-EG';

registerLocaleData(localeEnGb);
registerLocaleData(localeArEg);

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideNzI18n } from './app/core/i18n/ng-zorro-i18n.provider';
import { provideActiveLocale } from './app/core/i18n/locale.provider';
import { LanguageService } from './app/core/i18n/language.service';

if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
  const savedLang = localStorage.getItem('p4-lang') || 'en';
  document.documentElement.lang = savedLang;
  
  // Set direction based on language
  const direction = savedLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = direction;
}

enableProdMode();

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideActiveLocale(),
    provideNzI18n(),
    LanguageService
  ]
}).catch(err => console.error(err));