// src/app/core/feature-flags/feature-flags.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FeatureFlag, FeatureFlagsConfig, FeatureFlagName } from './feature-flag.types';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  private readonly LOCAL_STORAGE_KEY = 'feature_flags';
  private readonly API_ENDPOINT = '/api/feature-flags'; // Backend endpoint to fetch flags
  
  private flagsSubject = new BehaviorSubject<FeatureFlagsConfig | null>(null);
  public flags$ = this.flagsSubject.asObservable();
  
  private defaultFlags: FeatureFlagsConfig = {
    [FeatureFlagName.CATALOG_PUBLIC_BROWSE]: {
      key: FeatureFlagName.CATALOG_PUBLIC_BROWSE,
      enabled: true,
      description: 'Enable public catalog browsing functionality',
      tags: ['catalog', 'public']
    },
    [FeatureFlagName.SEARCH_ENABLED]: {
      key: FeatureFlagName.SEARCH_ENABLED,
      enabled: true,
      description: 'Enable search functionality',
      tags: ['search', 'public']
    },
    [FeatureFlagName.RFQ_ENABLED]: {
      key: FeatureFlagName.RFQ_ENABLED,
      enabled: false,
      description: 'Enable RFQ functionality',
      tags: ['rfq', 'negotiation']
    },
    [FeatureFlagName.ORDERS_CHECKOUT]: {
      key: FeatureFlagName.ORDERS_CHECKOUT,
      enabled: false,
      description: 'Enable checkout and order functionality',
      tags: ['orders', 'checkout']
    },
    [FeatureFlagName.PAYMENTS_GATEWAY1]: {
      key: FeatureFlagName.PAYMENTS_GATEWAY1,
      enabled: false,
      description: 'Enable first payment gateway integration',
      tags: ['payments', 'gateway']
    },
    [FeatureFlagName.WALLET_BASIC]: {
      key: FeatureFlagName.WALLET_BASIC,
      enabled: false,
      description: 'Enable basic corporate wallet functionality',
      tags: ['wallet', 'payments']
    },
    [FeatureFlagName.INVOICE_VAT]: {
      key: FeatureFlagName.INVOICE_VAT,
      enabled: false,
      description: 'Enable VAT invoice generation',
      tags: ['invoicing', 'vat']
    },
    [FeatureFlagName.LOYALTY_CORE]: {
      key: FeatureFlagName.LOYALTY_CORE,
      enabled: false,
      description: 'Enable loyalty program functionality',
      tags: ['loyalty', 'rewards']
    },
    [FeatureFlagName.CREDIT_CONTROLS]: {
      key: FeatureFlagName.CREDIT_CONTROLS,
      enabled: false,
      description: 'Enable credit limit and dunning functionality',
      tags: ['credit', 'finance']
    }
  };

  constructor(private http: HttpClient) {
    this.initializeFlags();
  }

  /**
   * Initialize feature flags from local storage or API
   */
  private initializeFlags(): void {
    console.log('DEBUG: Initializing feature flags');
    
    // First, try to load from local storage
    const savedFlags = this.loadFromLocalStorage();
    if (savedFlags) {
      console.log('DEBUG: Loaded feature flags from local storage:', savedFlags);
      this.flagsSubject.next(savedFlags);
      return;
    }

    console.log('DEBUG: No saved flags found, loading from API or using defaults');
    
    // If no saved flags, load from API or use defaults
    this.loadFlagsFromApi().subscribe({
      next: (flags) => {
        console.log('DEBUG: Loaded feature flags from API:', flags);
        this.flagsSubject.next(flags);
        this.saveToLocalStorage(flags);
      },
      error: (error) => {
        console.error('DEBUG: Failed to load feature flags from API, using defaults:', error);
        // If API fails, use default flags
        this.flagsSubject.next(this.defaultFlags);
        this.saveToLocalStorage(this.defaultFlags);
      }
    });
  }

  /**
   * Load feature flags from API
   */
  private loadFlagsFromApi(): Observable<FeatureFlagsConfig> {
    // For now, we'll return defaults, but in a real app, this would call the backend
    return this.http.get<FeatureFlagsConfig>(this.API_ENDPOINT).pipe(
      catchError(() => {
        console.warn('Failed to load feature flags from API, using defaults');
        return of(this.defaultFlags);
      })
    );
  }

  /**
   * Check if a specific feature flag is enabled
   */
  public isFeatureEnabled(featureName: FeatureFlagName): boolean {
    const flags = this.flagsSubject.value;
    const result = flags && flags[featureName] ? flags[featureName].enabled : this.defaultFlags[featureName]?.enabled || false;
    
    console.log('DEBUG: Checking feature flag:', {
      featureName,
      result,
      currentFlags: flags ? flags[featureName] : null,
      defaultFlag: this.defaultFlags[featureName]
    });
    
    return result;
  }

  /**
   * Get all feature flags
   */
  public getAllFlags(): FeatureFlagsConfig | null {
    return this.flagsSubject.value;
  }

  /**
   * Get a specific feature flag
   */
  public getFlag(featureName: FeatureFlagName): FeatureFlag | undefined {
    const flags = this.flagsSubject.value;
    return flags ? flags[featureName] : this.defaultFlags[featureName];
  }

  /**
   * Update a feature flag (for admin panel or testing)
   */
  public updateFlag(featureName: FeatureFlagName, enabled: boolean): void {
    const currentFlags = this.flagsSubject.value || this.defaultFlags;
    const updatedFlags = {
      ...currentFlags,
      [featureName]: {
        ...currentFlags[featureName],
        enabled
      }
    };
    
    this.flagsSubject.next(updatedFlags);
    this.saveToLocalStorage(updatedFlags);
  }

  /**
   * Save flags to local storage
   */
  private saveToLocalStorage(flags: FeatureFlagsConfig): void {
    try {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(flags));
    } catch (error) {
      console.error('Failed to save feature flags to local storage', error);
    }
  }

  /**
   * Load flags from local storage
   */
  private loadFromLocalStorage(): FeatureFlagsConfig | null {
    try {
      const stored = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load feature flags from local storage', error);
      return null;
    }
  }

  /**
   * Reset flags to defaults
   */
  public resetToDefaults(): void {
    this.flagsSubject.next(this.defaultFlags);
    this.saveToLocalStorage(this.defaultFlags);
  }
}