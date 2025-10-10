import { TestBed } from '@angular/core/testing';
import { LanguageService } from './../../../apps/landing/src/app/core/i18n/language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageService]
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with English as default', () => {
    expect(service.getCurrentLanguage()).toBe('en');
    expect(service.getCurrentLocale()).toBe('en-GB');
    expect(service.getCurrentDirection()).toBe('ltr');
  });

  it('should switch to Arabic correctly', () => {
    service.setLanguage('ar');
    
    expect(service.getCurrentLanguage()).toBe('ar');
    expect(service.getCurrentLocale()).toBe('ar-EG');
    expect(service.getCurrentDirection()).toBe('rtl');
  });

  it('should switch to English correctly', () => {
    service.setLanguage('ar'); // Start with Arabic
    service.setLanguage('en'); // Switch to English
    
    expect(service.getCurrentLanguage()).toBe('en');
    expect(service.getCurrentLocale()).toBe('en-GB');
    expect(service.getCurrentDirection()).toBe('ltr');
  });

  it('should persist language in localStorage', () => {
    service.setLanguage('ar');
    
    expect(localStorage.getItem('p4-lang')).toBe('ar');
    
    service.setLanguage('en');
    
    expect(localStorage.getItem('p4-lang')).toBe('en');
  });
});