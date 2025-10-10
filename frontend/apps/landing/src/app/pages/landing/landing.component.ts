import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FfIfDirective } from '@p4/frontend/data-access';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'p4-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FfIfDirective
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit(): void {
  }

}