import { Routes } from '@angular/router';
import { QuotesComponent } from './quotes.component';

export const QUOTES_ROUTES: Routes = [
  {
    path: '',
    component: QuotesComponent
  },
  {
    path: ':id',
    loadComponent: () => import('./quote-detail/quote-detail.component').then(m => m.QuoteDetailComponent)
  }
];