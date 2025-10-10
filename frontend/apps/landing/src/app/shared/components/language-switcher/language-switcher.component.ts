import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/i18n/language.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'p4-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
  currentLang$!: Observable<'en' | 'ar'>;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLang$ = this.languageService.locale$;
  }

  setLanguage(lang: 'en' | 'ar'): void {
    this.languageService.setLanguage(lang);
  }

  getCurrentLang(): 'en' | 'ar' {
    return this.languageService.getCurrentLanguage();
  }
}