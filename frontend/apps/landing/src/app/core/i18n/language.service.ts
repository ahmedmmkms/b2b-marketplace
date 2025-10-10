import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { en_GB, ar_EG, NzI18nInterface } from 'ng-zorro-antd/i18n';
import { Direction, Directionality } from '@angular/cdk/bidi';

export type Locale = 'en-GB' | 'ar-EG';
export type DirectionType = 'ltr' | 'rtl';

@Injectable({
  providedIn: 'root'
})
export class LanguageService implements OnDestroy {
  private readonly STORAGE_KEY = 'p4-lang';
  private readonly URL_PARAM = 'lang';
  
  private localeSubject = new BehaviorSubject<Locale>('en-GB');
  private directionSubject = new BehaviorSubject<DirectionType>('ltr');
  
  public locale$ = this.localeSubject.asObservable();
  public direction$ = this.directionSubject.asObservable();
  
  private subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private nzI18nService: NzI18nService,
    private directionality: Directionality
  ) {
    this.initializeLanguage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeLanguage(): void {
    // Check URL parameter first
    const urlLang = this.getLanguageFromUrl();
    if (urlLang) {
      this.setLanguage(urlLang);
      return;
    }

    // Check localStorage
    const storedLang = localStorage.getItem(this.STORAGE_KEY);
    if (storedLang) {
      this.setLanguage(storedLang as 'en' | 'ar');
      return;
    }

    // Default to English
    this.setLanguage('en');
  }

  setLanguage(lang: 'en' | 'ar'): void {
    // Update locale
    const locale: Locale = lang === 'ar' ? 'ar-EG' : 'en-GB';
    this.localeSubject.next(locale);
    
    // Update direction
    const direction: DirectionType = lang === 'ar' ? 'rtl' : 'ltr';
    this.directionSubject.next(direction);
    
    // Update document attributes
    this.document.documentElement.lang = lang;
    this.document.documentElement.dir = direction;
    
    // Update localStorage
    localStorage.setItem(this.STORAGE_KEY, lang);
    
    // Update Ng-Zorro locale
    const nzLocale: NzI18nInterface = lang === 'ar' ? ar_EG : en_GB;
    this.nzI18nService.setLocale(nzLocale);
    
    // Update CDK directionality
    this.directionality.change?.emit(direction as Direction);
    
    // Update URL without page reload
    this.updateUrlLanguage(lang);
  }

  getCurrentLanguage(): 'en' | 'ar' {
    return this.localeSubject.value === 'ar-EG' ? 'ar' : 'en';
  }

  getCurrentLocale(): Locale {
    return this.localeSubject.value;
  }

  getCurrentDirection(): DirectionType {
    return this.directionSubject.value;
  }

  getCollator(): Intl.Collator {
    const locale = this.getCurrentLanguage();
    return new Intl.Collator(locale === 'ar' ? 'ar' : 'en', { 
      sensitivity: 'base', 
      numeric: true 
    });
  }

  private getLanguageFromUrl(): 'en' | 'ar' | null {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const lang = urlParams.get(this.URL_PARAM);
      if (lang === 'en' || lang === 'ar') {
        return lang;
      }
    }
    return null;
  }

  private updateUrlLanguage(lang: 'en' | 'ar'): void {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set(this.URL_PARAM, lang);
      
      const newUrl = `${window.location.pathname}?${urlParams.toString()}${window.location.hash}`;
      window.history.replaceState({}, '', newUrl);
    }
  }
}