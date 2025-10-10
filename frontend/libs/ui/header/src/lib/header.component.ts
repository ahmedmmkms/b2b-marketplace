import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FfIfDirective } from '@p4/frontend/data-access/feature-flag';
import { LanguageSwitcherComponent } from '../../../apps/landing/src/app/shared/components/language-switcher/language-switcher.component';
import { LanguageService } from '../../../apps/landing/src/app/core/i18n/language.service';

@Component({
  selector: 'p4-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FfIfDirective,
    LanguageSwitcherComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit(): void {
  }

}