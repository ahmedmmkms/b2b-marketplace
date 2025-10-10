import { Routes } from '@angular/router';

export const LOYALTY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./loyalty.component').then(m => m.LoyaltyComponent)
  },
  {
    path: 'rewards',
    loadComponent: () => import('./rewards/rewards.component').then(m => m.RewardsComponent)
  }
];