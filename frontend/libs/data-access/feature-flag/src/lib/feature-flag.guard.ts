import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FeatureFlagService } from './feature-flag.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagGuard implements CanActivate {
  constructor(private featureFlagService: FeatureFlagService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredFeature = route.data['feature'] as string;
    
    if (!requiredFeature) {
      console.warn('FeatureFlagGuard used without specifying a feature in route data');
      return true;
    }

    return this.featureFlagService.isFeatureEnabled(requiredFeature as any).pipe(
      take(1),
      map(isEnabled => {
        if (isEnabled) {
          return true;
        } else {
          // Optionally redirect to a "feature not available" page
          // For now, we'll just return false to prevent navigation
          return false;
        }
      })
    );
  }
}