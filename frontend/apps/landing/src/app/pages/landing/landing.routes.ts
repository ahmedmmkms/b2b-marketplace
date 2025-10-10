import { Routes } from '@angular/router';
import { LandingComponent } from './landing.component';

export const LANDING_ROUTES: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'vendors',
    loadComponent: () => import('./vendors/vendors.component').then(m => m.VendorsComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./faq/faq.component').then(m => m.FaqComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./privacy/privacy.component').then(m => m.PrivacyComponent)
  }
];