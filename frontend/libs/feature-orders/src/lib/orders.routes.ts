import { Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';

export const ORDERS_ROUTES: Routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: ':id',
    loadComponent: () => import('./order-detail/order-detail.component').then(m => m.OrderDetailComponent)
  }
];