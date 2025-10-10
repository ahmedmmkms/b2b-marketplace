import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FeatureFlagService } from './../../../../libs/data-access/feature-flag/src/lib/feature-flag.service';

describe('FeatureFlagService', () => {
  let service: FeatureFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeatureFlagService]
    });
    service = TestBed.inject(FeatureFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default values for flags when not set', () => {
    expect(service.isFeatureEnabledSync('catalog.publicBrowse')).toBe(true);
    expect(service.isFeatureEnabledSync('rfq.enabled')).toBe(true);
    expect(service.isFeatureEnabledSync('orders.checkout')).toBe(false);
  });

  it('should update a single flag', () => {
    service.updateFlag('rfq.enabled', false);
    expect(service.isFeatureEnabledSync('rfq.enabled')).toBe(false);
  });

  it('should update multiple flags', () => {
    const newFlags = {
      'rfq.enabled': true,
      'orders.checkout': true,
      'wallet.basic': true
    };
    
    service.updateFlagsBulk(newFlags);
    
    expect(service.isFeatureEnabledSync('rfq.enabled')).toBe(true);
    expect(service.isFeatureEnabledSync('orders.checkout')).toBe(true);
    expect(service.isFeatureEnabledSync('wallet.basic')).toBe(true);
  });
});