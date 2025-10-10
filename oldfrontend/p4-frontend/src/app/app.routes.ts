import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { CatalogComponent } from './catalog/catalog';
import { VendorOnboardingComponent } from './vendor/vendor-onboarding.component';
import { VendorApprovalQueueComponent } from './vendor/vendor-approval-queue.component';
import { FeatureFlagsManagementComponent } from './core/feature-flags/feature-flags-management.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmationComponent } from './checkout/order-confirmation.component';
import { RfqComponent } from './rfq/rfq.component';
import { OrdersComponent } from './orders/orders.component';
import { catalogPublicBrowseGuard, searchEnabledGuard, ordersCheckoutGuard, rfqEnabledGuard } from './core/feature-flags/feature-flag.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'catalog', 
    component: CatalogComponent, 
    canActivate: [catalogPublicBrowseGuard] 
  },
  { 
    path: 'checkout', 
    component: CheckoutComponent, 
    canActivate: [ordersCheckoutGuard] 
  },
  { 
    path: 'order-confirmation', 
    component: OrderConfirmationComponent, 
    canActivate: [ordersCheckoutGuard] 
  },
  { 
    path: 'rfq', 
    component: RfqComponent, 
    canActivate: [rfqEnabledGuard] 
  },
  { 
    path: 'orders', 
    component: OrdersComponent, 
    canActivate: [ordersCheckoutGuard] 
  },
  { path: 'vendor/onboard', component: VendorOnboardingComponent },
  { path: 'vendor/approval-queue', component: VendorApprovalQueueComponent },
  { path: 'admin/feature-flags', component: FeatureFlagsManagementComponent },
  { path: '**', redirectTo: '' }
];