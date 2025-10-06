import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule, Location } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FeatureFlagDirective } from '../core/feature-flags/feature-flag.directive';
import { FeatureFlagName } from '../core/feature-flags/feature-flag.types';
import { PerformanceMonitoringService } from '../core/performance/performance-monitoring.service';
import { AnalyticsService } from '../core/analytics/analytics.service';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  sku: string;
  vendorId: string;
  status: string;
  currency: string;
  basePrice: number;
  taxClass?: string;
  weight?: number;
  dimensions?: string;
  minOrderQty?: number;
  inventoryQty?: number;
  inventoryStatus: string;
  createdAt: string;
  updatedAt: string;
  mediaAssets?: MediaAsset[];
}

interface MediaAsset {
  id: string;
  name: string;
  filePath: string;
  mediaType: string;
  isPrimary?: boolean;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzSwitchModule,
    NzPaginationModule,
    NzListModule,
    NzTagModule,
    NzBadgeModule,
    NzAlertModule,
    FeatureFlagDirective,
    FormsModule,
    TranslateModule
  ],
  template: `
    <div class="catalog-container" [dir]="isRTL ? 'rtl' : 'ltr'">
      <!-- Feature flag check - only show catalog if feature is enabled -->
      <ng-container *appFeatureFlag="FeatureFlagName.CATALOG_PUBLIC_BROWSE; else featureDisabled">
        <div class="toolbar">
          <nz-input-group size="large" class="search-section">
            <input 
              type="text" 
              nz-input 
              [placeholder]="'CATALOG.SEARCH_PLACEHOLDER' | translate"
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange()"
            />
            <span *nzSuffix nz-icon nzType="search"></span>
          </nz-input-group>
          
          <div class="view-controls">
            <nz-switch
              [(ngModel)]="isListView"
              [nzCheckedChildren]="'CATALOG.LIST_VIEW' | translate"
              [nzUnCheckedChildren]="'CATALOG.GRID_VIEW' | translate">
            </nz-switch>
            
            <div class="pagination">
              <nz-pagination 
                [(nzPageIndex)]="currentPage" 
                [(nzPageSize)]="pageSize" 
                [nzTotal]="totalProducts"
                [nzShowSizeChanger]="true"
                [nzPageSizeOptions]="[12, 20, 30, 50]"
                (nzPageIndexChange)="onPageChange($event)"
                (nzPageSizeChange)="onPageSizeChange($event)">
              </nz-pagination>
            </div>
          </div>
        </div>

        <!-- Facets/Sidebar for filters -->
        <div class="main-content">
          <div class="filters-sidebar" *ngIf="!isListView">
            <h3>{{ 'CATALOG.FILTERS' | translate }}</h3>
            
            <div class="filter-group">
              <h4>{{ 'CATALOG.CATEGORIES' | translate }}</h4>
              <nz-tag 
                *ngFor="let category of categories" 
                [nzMode]="'checkable'"
                [(nzChecked)]="category.selected"
                (nzCheckedChange)="onCategoryChange(category.id, $event)">
                {{ category.name }}
              </nz-tag>
            </div>
            
            <div class="filter-group">
              <h4>{{ 'CATALOG.VENDORS' | translate }}</h4>
              <nz-tag 
                *ngFor="let vendor of vendors" 
                [nzMode]="'checkable'"
                [(nzChecked)]="vendor.selected"
                (nzCheckedChange)="onVendorChange(vendor.id, $event)">
                {{ vendor.name }}
              </nz-tag>
            </div>
            
            <div class="filter-group">
              <h4>{{ 'CATALOG.PRICE_RANGE' | translate }}</h4>
              <div class="price-filter">
                <nz-input-group nzAddOnBefore="Min" nzAddOnAfter="Max">
                  <input type="number" nz-input [(ngModel)]="minPrice" placeholder="0">
                  <input type="number" nz-input [(ngModel)]="maxPrice" placeholder="1000">
                </nz-input-group>
              </div>
            </div>
          </div>
          
          <!-- Products display -->
          <div class="products-section">
            <div class="results-summary">
              {{ 'CATALOG.SHOWING_RESULTS' | translate: { start: (currentPage - 1) * pageSize + 1, end: Math.min(currentPage * pageSize, totalProducts), total: totalProducts } }}
            </div>
            
            <div *ngIf="isListView; else gridView" class="list-view">
              <nz-list 
                [nzDataSource]="currentProducts"
                [nzItemLayout]="'horizontal'"
                [nzRenderItem]="listItem">
                <ng-template #listItem let-product>
                  <nz-list-item>
                    <nz-list-item-meta
                      [nzTitle]="product.name"
                      [nzDescription]="product.description">
                      <nz-list-item-meta-avatar>
                        <img *ngIf="product.mediaAssets?.[0]" [src]="getMediaUrl(product.mediaAssets[0])" [alt]="product.name" class="product-image">
                        <div *ngIf="!product.mediaAssets?.[0]" class="no-image-placeholder">
                          <span nz-icon nzType="picture" nzTheme="outline"></span>
                        </div>
                      </nz-list-item-meta-avatar>
                    </nz-list-item-meta>
                    <div nz-list-item-actions>
                      <button nz-button nzType="primary">{{ 'BUTTONS.VIEW_DETAILS' | translate }}</button>
                      <button nz-button nzType="default">{{ 'BUTTONS.ADD_TO_CART' | translate }}</button>
                    </div>
                    <div class="product-price">{{ formatPrice(product.basePrice, product.currency) }}</div>
                  </nz-list-item>
                </ng-template>
              </nz-list>
            </div>
            
            <ng-template #gridView>
              <div class="grid-view">
                <div nz-row [nzGutter]="[16, 16]">
                  <div 
                    nz-col 
                    nzSpan="8" 
                    nzXXL="6" 
                    nzXL="8" 
                    nzLg="8" 
                    nzMd="12" 
                    nzSm="12" 
                    nzXs="24" 
                    *ngFor="let product of currentProducts">
                    <nz-card 
                      [nzCover]="product.mediaAssets?.[0] ? coverTemplate : undefined"
                      class="product-card">
                      <ng-template #coverTemplate>
                        <img 
                          [src]="getMediaUrl(product.mediaAssets[0])" 
                          [alt]="product.name" 
                          class="product-cover-image">
                      </ng-template>
                      
                      <nz-card-meta
                        [nzTitle]="product.name"
                        [nzDescription]="product.shortDescription || product.description">
                      </nz-card-meta>
                      
                      <div class="product-footer">
                        <div class="product-price">{{ formatPrice(product.basePrice, product.currency) }}</div>
                        <div class="product-actions">
                          <button nz-button nzType="primary" nzSize="small">{{ 'BUTTONS.VIEW_DETAILS' | translate }}</button>
                          <button nz-button nzType="default" nzSize="small">{{ 'BUTTONS.ADD_TO_CART' | translate }}</button>
                        </div>
                      </div>
                    </nz-card>
                  </div>
                </div>
              </div>
            </ng-template>
            
            <!-- Pagination at the bottom -->
            <div class="pagination-bottom">
              <nz-pagination 
                [(nzPageIndex)]="currentPage" 
                [(nzPageSize)]="pageSize" 
                [nzTotal]="totalProducts"
                [nzShowSizeChanger]="true"
                [nzPageSizeOptions]="[12, 20, 30, 50]"
                (nzPageIndexChange)="onPageChange($event)"
                (nzPageSizeChange)="onPageSizeChange($event)">
              </nz-pagination>
            </div>
          </div>
        </div>

        <div class="no-products" *ngIf="totalProducts === 0">
          {{ 'CATALOG.NO_PRODUCTS' | translate }}
        </div>
      </ng-container>
      
      <ng-template #featureDisabled>
        <nz-alert
          [nzType]="'info'"
          [nzMessage]="'CATALOG.FEATURE_DISABLED_TITLE' | translate"
          [nzDescription]="'CATALOG.FEATURE_DISABLED_DESCRIPTION' | translate"
          nzShowIcon>
        </nz-alert>
      </ng-template>
    </div>
  `,
  styles: [`
    .catalog-container {
      padding: 20px;
      direction: ltr;
    }
    
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e8e8e8;
    }
    
    .search-section {
      flex: 1;
      min-width: 300px;
    }
    
    .view-controls {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .pagination {
      margin-left: 16px;
    }
    
    .main-content {
      display: flex;
      gap: 24px;
    }
    
    .filters-sidebar {
      width: 250px;
      background: #fafafa;
      padding: 16px;
      border-radius: 4px;
    }
    
    .filters-sidebar h3 {
      margin-top: 0;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e8e8e8;
    }
    
    .filter-group {
      margin-bottom: 24px;
    }
    
    .filter-group h4 {
      margin: 0 0 12px 0;
      font-size: 14px;
      font-weight: 600;
    }
    
    .price-filter {
      margin-top: 8px;
    }
    
    .products-section {
      flex: 1;
    }
    
    .results-summary {
      margin-bottom: 16px;
      color: #8c8c8c;
    }
    
    .list-view {
      margin-top: 16px;
    }
    
    .product-image {
      width: 64px;
      height: 64px;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .no-image-placeholder {
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      border-radius: 4px;
    }
    
    .product-price {
      font-size: 18px;
      font-weight: bold;
      color: #1890ff;
      margin-top: 8px;
    }
    
    .grid-view {
      margin-bottom: 16px;
    }
    
    .product-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .product-cover-image {
      height: 150px;
      object-fit: cover;
    }
    
    .product-footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
    }
    
    .product-actions {
      display: flex;
      gap: 8px;
    }
    
    .pagination-bottom {
      margin-top: 24px;
      display: flex;
      justify-content: center;
    }
    
    .no-products {
      text-align: center;
      padding: 40px;
      font-size: 18px;
      color: #8c8c8c;
    }
    
    /* RTL support */
    .catalog-container[dir="rtl"] .toolbar {
      flex-direction: row-reverse;
    }
    
    .catalog-container[dir="rtl"] .search-section {
      order: 2;
    }
    
    .catalog-container[dir="rtl"] .view-controls {
      order: 1;
    }
    
    .catalog-container[dir="rtl"] .pagination {
      margin-left: 0;
      margin-right: 16px;
    }
    
    .catalog-container[dir="rtl"] .main-content {
      flex-direction: row-reverse;
    }
    
    .catalog-container[dir="rtl"] .product-footer {
      flex-direction: row-reverse;
    }
    
    @media (max-width: 768px) {
      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-section {
        min-width: auto;
      }
      
      .view-controls {
        justify-content: center;
      }
      
      .main-content {
        flex-direction: column;
      }
      
      .filters-sidebar {
        width: 100%;
        order: 2;
      }
      
      .results-summary {
        text-align: center;
      }
    }
  `]
})
export class CatalogComponent implements OnInit, OnDestroy, AfterViewInit {
  FeatureFlagName = FeatureFlagName;
  searchTerm: string = '';
  isListView: boolean = false;
  currentPage: number = 1;
  pageSize: number = 20;
  totalProducts: number = 0;
  currentProducts: Product[] = [];
  
  // Filters
  categories: Array<{id: string, name: string, selected: boolean}> = [
    { id: 'cat1', name: 'Electronics', selected: false },
    { id: 'cat2', name: 'Clothing', selected: false },
    { id: 'cat3', name: 'Home & Kitchen', selected: false },
    { id: 'cat4', name: 'Books', selected: false }
  ];
  
  vendors: Array<{id: string, name: string, selected: boolean}> = [
    { id: 'vendor1', name: 'Vendor A', selected: false },
    { id: 'vendor2', name: 'Vendor B', selected: false },
    { id: 'vendor3', name: 'Vendor C', selected: false }
  ];
  
  minPrice: number | null = null;
  maxPrice: number | null = null;
  
  // RTL support
  isRTL: boolean = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private translate: TranslateService, 
    private location: Location,
    private perfService: PerformanceMonitoringService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    // Detect RTL based on current language
    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(event => {
      this.isRTL = event.lang === 'ar';
      this.location.go(location.path()); // Refresh location for RTL update
    });
    
    // Initialize with sample data
    this.loadProducts();
    this.applyFilters();
  }

  ngAfterViewInit() {
    // Track page view when component is initialized
    this.analyticsService.trackPageView();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts() {
    // Sample data - would be replaced with API call
    const sampleProducts: Product[] = Array.from({ length: 100 }, (_, i) => ({
      id: `prod-${i + 1}`,
      name: `Product ${i + 1}`,
      description: `This is a description for Product ${i + 1}. It provides detailed information about the product's features and benefits.`,
      shortDescription: `Product ${i + 1} short desc`,
      sku: `SKU-${i + 1}`,
      vendorId: `vendor-${(i % 3) + 1}`,
      status: 'PUBLISHED',
      currency: 'USD',
      basePrice: Math.floor(Math.random() * 500) + 50,
      taxClass: 'standard',
      weight: Math.random() * 5 + 0.1,
      dimensions: JSON.stringify({ length: 10, width: 8, height: 5 }),
      minOrderQty: 1,
      inventoryQty: Math.floor(Math.random() * 100),
      inventoryStatus: 'IN_STOCK',
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      updatedAt: new Date().toISOString(),
      mediaAssets: i % 4 !== 0 ? [{ 
        id: `img-${i + 1}`, 
        name: `Product ${i + 1} Image`, 
        filePath: `https://via.placeholder.com/300x300?text=Product+${i + 1}`, 
        mediaType: 'IMAGE',
        isPrimary: true
      }] : undefined
    }));
    
    this.totalProducts = sampleProducts.length;
    this.currentProducts = sampleProducts.slice(0, this.pageSize);
  }

  onSearchChange() {
    const startTime = Date.now();
    
    this.perfService.measure('search', 'catalog-search', () => {
      this.currentPage = 1;
      this.applyFilters();
    });
    
    // Track search event with analytics
    const duration = Date.now() - startTime;
    this.analyticsService.trackSearch(this.searchTerm, this.filteredProducts.length, undefined, duration);
  }

  onCategoryChange(categoryId: string, checked: boolean) {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      category.selected = checked;
      
      // Track filter event
      this.analyticsService.trackFilter('category', category.name, 0); // We'll update results count after filtering
      
      this.applyFilters();
      
      // Update the tracked results count after filtering
      this.analyticsService.trackFilter('category', category.name, this.filteredProducts.length);
    }
  }

  onVendorChange(vendorId: string, checked: boolean) {
    const vendor = this.vendors.find(v => v.id === vendorId);
    if (vendor) {
      vendor.selected = checked;
      
      // Track filter event
      this.analyticsService.trackFilter('vendor', vendor.name, 0);
      
      this.applyFilters();
      
      // Update the tracked results count after filtering
      this.analyticsService.trackFilter('vendor', vendor.name, this.filteredProducts.length);
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.applyFilters();
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    // Track filter event before applying filters
    const activeFilters: { [key: string]: any } = {};
    if (this.searchTerm) activeFilters.search = this.searchTerm;
    if (this.minPrice !== null || this.maxPrice !== null) {
      activeFilters.price = { min: this.minPrice, max: this.maxPrice };
    }
    const selectedCategories = this.categories.filter(cat => cat.selected).map(cat => cat.name);
    if (selectedCategories.length > 0) activeFilters.categories = selectedCategories;
    const selectedVendors = this.vendors.filter(vendor => vendor.selected).map(vendor => vendor.name);
    if (selectedVendors.length > 0) activeFilters.vendors = selectedVendors;

    // This would typically be an API call with filters
    // For now, we'll simulate filtering with sample data
    let filteredProducts = [...this.getSampleProducts()];
    
    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    const selectedCategoriesForFilter = this.categories.filter(cat => cat.selected).map(cat => cat.name);
    if (selectedCategoriesForFilter.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedCategoriesForFilter.some(cat => product.name.includes(cat)) // Simple mapping for demo
      );
    }
    
    // Apply vendor filter
    const selectedVendorsForFilter = this.vendors.filter(vendor => vendor.selected).map(vendor => vendor.id);
    if (selectedVendorsForFilter.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedVendorsForFilter.includes(product.vendorId)
      );
    }
    
    // Apply price filter
    if (this.minPrice !== null) {
      filteredProducts = filteredProducts.filter(product => product.basePrice >= (this.minPrice || 0));
    }
    if (this.maxPrice !== null) {
      filteredProducts = filteredProducts.filter(product => product.basePrice <= (this.maxPrice || Number.MAX_VALUE));
    }
    
    this.totalProducts = filteredProducts.length;
    
    // Track filter event after applying filters
    this.analyticsService.trackEvent({
      eventType: 'filter_application',
      properties: {
        ...activeFilters,
        resultsCount: this.totalProducts
      }
    });
    
    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentProducts = filteredProducts.slice(startIndex, endIndex);
  }

  getSampleProducts(): Product[] {
    // Generate sample products
    return Array.from({ length: 100 }, (_, i) => ({
      id: `prod-${i + 1}`,
      name: `Product ${i + 1}`,
      description: `This is a description for Product ${i + 1}. It provides detailed information about the product's features and benefits.`,
      shortDescription: `Product ${i + 1} short desc`,
      sku: `SKU-${i + 1}`,
      vendorId: `vendor-${(i % 3) + 1}`,
      status: 'PUBLISHED',
      currency: 'USD',
      basePrice: Math.floor(Math.random() * 500) + 50,
      taxClass: 'standard',
      weight: Math.random() * 5 + 0.1,
      dimensions: JSON.stringify({ length: 10, width: 8, height: 5 }),
      minOrderQty: 1,
      inventoryQty: Math.floor(Math.random() * 100),
      inventoryStatus: 'IN_STOCK',
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      updatedAt: new Date().toISOString(),
      mediaAssets: i % 4 !== 0 ? [{ 
        id: `img-${i + 1}`, 
        name: `Product ${i + 1} Image`, 
        filePath: `https://via.placeholder.com/300x300?text=Product+${i + 1}`, 
        mediaType: 'IMAGE',
        isPrimary: true
      }] : undefined
    }));
  }

  getMediaUrl(mediaAsset?: MediaAsset): string {
    if (mediaAsset && mediaAsset.filePath) {
      return mediaAsset.filePath;
    }
    return 'https://via.placeholder.com/300x300?text=No+Image';
  }

  formatPrice(price: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(price);
  }

  onPriceFilterChange() {
    this.currentPage = 1;
    this.applyFilters();
    
    // Track price filter event
    this.analyticsService.trackFilter(
      'price_range', 
      `${this.minPrice || 0}-${this.maxPrice || '∞'}`, 
      this.totalProducts
    );
  }

  trackByProduct(index: number, item: Product) {
    return item.id;
  }

  trackByFacet(index: number, item: any) {
    return item.id;
  }

  trackByFacetValue(index: number, item: any) {
    return item.name;
  }
}