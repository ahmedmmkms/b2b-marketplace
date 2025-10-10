import { Routes } from '@angular/router';

export const IDENTITY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./identity.component').then(m => m.IdentityComponent)
  }
];