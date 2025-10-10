import { Routes } from '@angular/router';
import { RfqComponent } from './rfq.component';

export const RFQ_ROUTES: Routes = [
  {
    path: '',
    component: RfqComponent
  },
  {
    path: 'create',
    loadComponent: () => import('./create-rfq/create-rfq.component').then(m => m.CreateRfqComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./rfq-detail/rfq-detail.component').then(m => m.RfqDetailComponent)
  }
];