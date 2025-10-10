import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const CATALOG_ROUTES: Routes = [
  {
    path: '',
    component: CatalogComponent
  },
  {
    path: 'category/:categoryId',
    component: CatalogComponent
  },
  {
    path: 'search',
    component: CatalogComponent
  }
];

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductDetailComponent
  }
];