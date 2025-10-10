import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

// Define the feature flags interface
export interface FeatureFlags {
  'catalog.publicBrowse': boolean;
  'search.enabled': boolean;
  'rfq.enabled': boolean;
  'quote.vendorConsole': boolean;
  'orders.checkout': boolean;
  'payments.gateway1': boolean;
  'wallet.basic': boolean;
  'invoice.vat': boolean;
  'loyalty.core': boolean;
  'credit.controls': boolean;
  [key: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  private readonly STORAGE_KEY = 'p4-feature-flags';
  private readonly URL_OVERRIDE_PARAM = 'ff';
  
  private flagsSubject = new BehaviorSubject<FeatureFlags | null>(null);
  public flags$ = this.flagsSubject.asObservable();
  
  private defaultFlags: FeatureFlags = {
    'catalog.publicBrowse': true,
    'search.enabled': true,
    'rfq.enabled': true,
    'quote.vendorConsole': true,
    'orders.checkout': false, // Initially disabled until payment system is ready
    'payments.gateway1': false,
    'wallet.basic': false,
    'invoice.vat': false,
    'loyalty.core': false,
    'credit.controls': false
  };

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeFlags();
  }

  private initializeFlags(): void {
    // For SSR, only initialize on browser
    if (isPlatformBrowser(this.platformId)) {
      this.loadFlagsFromStorage();
      this.loadFlagsFromRuntime().subscribe();
    }
  }

  private loadFlagsFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const flags = JSON.parse(stored) as FeatureFlags;
        this.flagsSubject.next(flags);
      } catch (e) {
        console.error('Error parsing stored feature flags', e);
      }
    }
  }

  private loadFlagsFromRuntime(): Observable<FeatureFlags> {
    // Check URL for override parameters first
    const overrideFlags = this.getFlagsFromUrl();
    if (Object.keys(overrideFlags).length > 0) {
      const updatedFlags = { ...this.defaultFlags, ...overrideFlags };
      this.updateFlags(updatedFlags);
      return of(updatedFlags);
    }

    // Fetch from environment config (build-time flags)
    const buildFlags = this.getFlagsFromEnvironment();
    if (Object.keys(buildFlags).length > 0) {
      const updatedFlags = { ...this.defaultFlags, ...buildFlags };
      this.updateFlags(updatedFlags);
      return of(updatedFlags);
    }

    // Fetch from runtime JSON (for dynamic updates)
    return this.fetchRuntimeFlags().pipe(
      map(runtimeFlags => {
        if (runtimeFlags) {
          const updatedFlags = { ...this.defaultFlags, ...runtimeFlags };
          this.updateFlags(updatedFlags);
          return updatedFlags;
        }
        return this.defaultFlags;
      }),
      catchError(() => {
        console.warn('Could not load feature flags, using defaults');
        this.updateFlags(this.defaultFlags);
        return of(this.defaultFlags);
      })
    );
  }

  private fetchRuntimeFlags(): Observable<FeatureFlags | null> {
    // Using a JSON file for runtime flag configuration
    return this.http.get<FeatureFlags>('/assets/flags.json').pipe(
      catchError(() => {
        console.warn('flags.json not found, using build-time flags');
        return of(null);
      })
    );
  }

  private getFlagsFromUrl(): Partial<FeatureFlags> {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const overrideParam = urlParams.get(this.URL_OVERRIDE_PARAM);
      
      if (overrideParam) {
        const flags: Partial<FeatureFlags> = {};
        const pairs = overrideParam.split(',');
        
        for (const pair of pairs) {
          const [key, value] = pair.split(':');
          if (key && value !== undefined) {
            const flagKey = key.trim() as keyof FeatureFlags;
            const flagValue = value.trim().toLowerCase() === 'on' || value.trim() === 'true';
            flags[flagKey] = flagValue;
          }
        }
        return flags;
      }
    }
    return {};
  }

  private getFlagsFromEnvironment(): Partial<FeatureFlags> {
    // In a real implementation, this would read from environment variables
    // For now, we'll return an empty object since we don't have a config service yet
    return {};
  }

  private updateFlags(flags: FeatureFlags): void {
    this.flagsSubject.next(flags);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(flags));
    }
  }

  isFeatureEnabled(feature: keyof FeatureFlags): Observable<boolean> {
    return this.flags$.pipe(
      map(flags => flags ? flags[feature] : this.defaultFlags[feature]),
      // Fallback to default if flags haven't loaded yet
      map(enabled => enabled !== undefined ? enabled : this.defaultFlags[feature])
    );
  }

  // Synchronous method to check feature status if flags are already loaded
  isFeatureEnabledSync(feature: keyof FeatureFlags): boolean {
    const flags = this.flagsSubject.value;
    if (flags) {
      return flags[feature] ?? this.defaultFlags[feature];
    }
    return this.defaultFlags[feature];
  }

  // Method to update a single flag (useful for testing or admin overrides)
  updateFlag(feature: keyof FeatureFlags, enabled: boolean): void {
    const currentFlags = this.flagsSubject.value || this.defaultFlags;
    const newFlags = { ...currentFlags, [feature]: enabled };
    this.updateFlags(newFlags);
  }

  // Method to update multiple flags at once
  updateFlagsBulk(flags: Partial<FeatureFlags>): void {
    const currentFlags = this.flagsSubject.value || this.defaultFlags;
    const newFlags = { ...currentFlags, ...flags };
    this.updateFlags(newFlags);
  }
}