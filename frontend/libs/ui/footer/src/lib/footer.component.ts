import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageSwitcherComponent } from '../../../apps/landing/src/app/shared/components/language-switcher/language-switcher.component';
import { LanguageService } from '../../../apps/landing/src/app/core/i18n/language.service';

@Component({
  selector: 'p4-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LanguageSwitcherComponent
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  constructor(public languageService: LanguageService) { }

  ngOnInit(): void {
  }

}