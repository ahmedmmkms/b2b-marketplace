import { Routes } from '@angular/router';
import { FeatureFlagGuard } from '@p4/frontend/data-access';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing/landing.routes').then(m => m.LANDING_ROUTES)
  },
  {
    path: 'catalog',
    loadChildren: () => import('@p4/frontend/feature-catalog').then(m => m.CATALOG_ROUTES)
  },
  {
    path: 'product/:id',
    loadChildren: () => import('@p4/frontend/feature-catalog').then(m => m.PRODUCT_ROUTES)
  },
  {
    path: 'rfq',
    canActivate: [FeatureFlagGuard],
    data: { feature: 'rfq.enabled' },
    loadChildren: () => import('@p4/frontend/feature-rfq').then(m => m.RFQ_ROUTES)
  },
  {
    path: 'quotes',
    canActivate: [FeatureFlagGuard],
    data: { feature: 'quote.vendorConsole' },
    loadChildren: () => import('@p4/frontend/feature-quotes').then(m => m.QUOTES_ROUTES)
  },
  {
    path: 'compare',
    canActivate: [FeatureFlagGuard],
    data: { feature: 'quote.vendorConsole' },
    loadComponent: () => import('./pages/quotes/compare/compare.component').then(m => m.CompareComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/account/account.component').then(m => m.AccountComponent)
  },
  {
    path: 'wallet',
    canActivate: [FeatureFlagGuard],
    data: { feature: 'wallet.basic' },
    loadComponent: () => import('./pages/wallet/wallet.component').then(m => m.WalletComponent)
  },
  {
    path: 'orders',
    canActivate: [FeatureFlagGuard],
    data: { feature: 'orders.checkout' },
    loadChildren: () => import('@p4/frontend/feature-orders').then(m => m.ORDERS_ROUTES)
  },
  {
    path: 'invoices',
    canActivate: [FeatureFlagGuard],
    data: { feature: 'invoice.vat' },
    loadChildren: () => import('@p4/frontend/feature-invoicing').then(m => m.INVOICING_ROUTES)
  },
  {
    path: 'loyalty',
    canActivate: [FeatureFlagGuard],
    data: { feature: 'loyalty.core' },
    loadComponent: () => import('./pages/loyalty/loyalty.component').then(m => m.LoyaltyComponent)
  },
  {
    path: 'admin',
    canActivate: [FeatureFlagGuard],
    data: { feature: 'rfq.enabled' },  // Adjust as needed for actual admin features
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];