import { Routes } from '@angular/router';
import { InvoicingComponent } from './invoicing.component';

export const INVOICING_ROUTES: Routes = [
  {
    path: '',
    component: InvoicingComponent
  },
  {
    path: ':id',
    loadComponent: () => import('./invoice-detail/invoice-detail.component').then(m => m.InvoiceDetailComponent)
  },
  {
    path: 'credit-note/:id',
    loadComponent: () => import('./credit-note-detail/credit-note-detail.component').then(m => m.CreditNoteDetailComponent)
  }
];