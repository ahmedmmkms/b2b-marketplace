// src/app/core/feature-flags/feature-flag.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FeatureFlagsService } from './feature-flags.service';
import { FeatureFlagName } from './feature-flag.types';
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs';

export const featureFlagGuard = (featureName: FeatureFlagName) => {
  return ((route, state) => {
    const featureFlagsService = inject(FeatureFlagsService);
    const router = inject(Router);

    // Check if feature is enabled
    const isEnabled = featureFlagsService.isFeatureEnabled(featureName);
    
    if (isEnabled) {
      return true;
    } else {
      // Redirect to home or show unauthorized page
      return of(router.createUrlTree(['/']));
    }
  }) as CanActivateFn;
};

// Specific guards for common features
export const catalogPublicBrowseGuard = featureFlagGuard(FeatureFlagName.CATALOG_PUBLIC_BROWSE);
export const searchEnabledGuard = featureFlagGuard(FeatureFlagName.SEARCH_ENABLED);
export const ordersCheckoutGuard = featureFlagGuard(FeatureFlagName.ORDERS_CHECKOUT);