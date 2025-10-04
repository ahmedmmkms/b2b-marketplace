import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { CatalogComponent } from './catalog/catalog';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: '**', redirectTo: '' }
];