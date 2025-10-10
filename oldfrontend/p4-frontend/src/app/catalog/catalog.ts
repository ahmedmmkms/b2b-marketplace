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
    <div class="catalog-container" [attr.dir]="isRTL ? 'rtl' : 'ltr'" role="main" aria-label="Product Catalog">
      <!-- Feature flag check - only show catalog if feature is enabled -->
      <ng-container *appFeatureFlag="FeatureFlagName.CATALOG_PUBLIC_BROWSE; else featureDisabled">
        <header class="catalog-header">
          <h1 class="sr-only">{{ 'CATALOG.TITLE' | translate }}</h1>
          <div class="toolbar">
            <div class="search-section">
              <nz-input-group size="large">
                <input 
                  type="search" 
                  nz-input 
                  [placeholder]="'CATALOG.SEARCH_PLACEHOLDER' | translate"
                  [(ngModel)]="searchTerm"
                  (ngModelChange)="onSearchChange()"
                  [attr.aria-label]="'CATALOG.SEARCH_PLACEHOLDER' | translate"
                />
                <span *nzSuffix nz-icon nzType="search" [attr.aria-hidden]="true"></span>
              </nz-input-group>
            </div>
            
            <div class="view-controls">
              <label for="view-switch" class="sr-only">{{ 'CATALOG.VIEW_MODE' | translate }}</label>
              <nz-switch
                id="view-switch"
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
                  [nzShowQuickJumper]="true"
                  (nzPageIndexChange)="onPageChange($event)"
                  (nzPageSizeChange)="onPageSizeChange($event)"
                  [attr.aria-label]="'CATALOG.PAGINATION_NAVIGATION' | translate">
                </nz-pagination>
              </div>
            </div>
          </div>
        </header>

        <!-- Facets/Sidebar for filters -->
        <div class="main-content">
          <aside class="filters-sidebar" *ngIf="!isListView" [attr.aria-label]="'CATALOG.FILTERS_SIDEBAR' | translate">
            <h2>{{ 'CATALOG.FILTERS' | translate }}</h2>
            
            <div class="filter-group">
              <h3 id="category-filter">{{ 'CATALOG.CATEGORIES' | translate }}</h3>
              <ul role="list" class="filter-list" [attr.aria-describedby]="'category-filter'">
                <li *ngFor="let category of categories; trackBy: trackByFacetValue" class="filter-item">
                  <label class="filter-label">
                    <input 
                      type="checkbox"
                      [checked]="category.selected"
                      (change)="onCategoryChangeSafe(category.id, $event)"
                      class="filter-checkbox"
                      [attr.aria-label]="'CATALOG.FILTER_BY_CATEGORY' | translate: { category: category.name }"
                    />
                    <span class="filter-text">{{ category.name }}</span>
                  </label>
                </li>
              </ul>
            </div>
            
            <div class="filter-group">
              <h3 id="vendor-filter">{{ 'CATALOG.VENDORS' | translate }}</h3>
              <ul role="list" class="filter-list" [attr.aria-describedby]="'vendor-filter'">
                <li *ngFor="let vendor of vendors; trackBy: trackByFacetValue" class="filter-item">
                  <label class="filter-label">
                    <input 
                      type="checkbox"
                      [checked]="vendor.selected"
                      (change)="onVendorChangeSafe(vendor.id, $event)"
                      class="filter-checkbox"
                      [attr.aria-label]="'CATALOG.FILTER_BY_VENDOR' | translate: { vendor: vendor.name }"
                    />
                    <span class="filter-text">{{ vendor.name }}</span>
                  </label>
                </li>
              </ul>
            </div>
            
            <div class="filter-group">
              <h3 id="price-filter">{{ 'CATALOG.PRICE_RANGE' | translate }}</h3>
              <div class="price-filter" [attr.aria-describedby]="'price-filter'">
                <div class="price-inputs">
                  <nz-input-group nzAddOnBefore="{{ 'CATALOG.MIN_PRICE' | translate }}">
                    <input 
                      type="number" 
                      nz-input 
                      [(ngModel)]="minPrice" 
                      placeholder="0"
                      (change)="onPriceFilterChange()"
                      [attr.aria-label]="'CATALOG.MIN_PRICE' | translate"
                    >
                  </nz-input-group>
                  
                  <nz-input-group nzAddOnBefore="{{ 'CATALOG.MAX_PRICE' | translate }}">
                    <input 
                      type="number" 
                      nz-input 
                      [(ngModel)]="maxPrice" 
                      placeholder="1000"
                      (change)="onPriceFilterChange()"
                      [attr.aria-label]="'CATALOG.MAX_PRICE' | translate"
                    >
                  </nz-input-group>
                </div>
                
                <button 
                  nz-button 
                  nzType="default" 
                  (click)="resetPriceFilters()"
                  class="reset-price-filters">
                  {{ 'BUTTONS.RESET' | translate }}
                </button>
              </div>
            </div>
          </aside>
          
          <!-- Products display -->
          <section class="products-section" [attr.aria-label]="'CATALOG.PRODUCTS_SECTION' | translate">
            <div class="results-summary" role="status" aria-live="polite">
              {{ 'CATALOG.SHOWING_RESULTS' | translate: { start: (currentPage - 1) * pageSize + 1, end: calculateEndResultCount(), total: totalProducts } }}
            </div>
            
            <div *ngIf="isListView; else gridView" class="list-view" role="list" [attr.aria-label]="'CATALOG.LIST_VIEW_PRODUCTS' | translate">
              <div *ngFor="let product of currentProducts; trackBy: trackByProduct" class="list-item" role="listitem">
                <div class="product-content">
                  <div class="product-image-container">
                    <img 
                      *ngIf="product.mediaAssets?.[0]" 
                      [src]="getMediaUrl(product.mediaAssets?.[0])" 
                      [alt]="product.name" 
                      class="product-image"
                      loading="lazy">
                    <div *ngIf="!product.mediaAssets?.[0]" class="no-image-placeholder" role="img" [attr.aria-label]="'CATALOG.NO_IMAGE' | translate">
                      <span nz-icon nzType="picture" nzTheme="outline"></span>
                    </div>
                  </div>
                  
                  <div class="product-details">
                    <h3 class="product-title">{{ product.name }}</h3>
                    <p class="product-description">{{ product.description }}</p>
                    <div class="product-price" [attr.aria-label]="'CATALOG.PRICE' | translate: { price: formatPrice(product.basePrice, product.currency) }">
                      {{ formatPrice(product.basePrice, product.currency) }}
                    </div>
                  </div>
                  
                  <div class="product-actions">
                    <button nz-button nzType="primary" (click)="viewProductDetails(product.id)">{{ 'BUTTONS.VIEW_DETAILS' | translate }}</button>
                    <button nz-button nzType="default" (click)="addToCart(product.id)">{{ 'BUTTONS.ADD_TO_CART' | translate }}</button>
                  </div>
                </div>
              </div>
            </div>
            
            <ng-template #gridView>
              <div class="grid-view" role="list" [attr.aria-label]="'CATALOG.GRID_VIEW_PRODUCTS' | translate">
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
                    *ngFor="let product of currentProducts; trackBy: trackByProduct"
                    class="grid-item"
                    role="listitem">
                    <nz-card 
                      [nzCover]="product.mediaAssets?.[0] ? coverTemplate : undefined"
                      class="product-card"
                      [attr.aria-label]="product.name">
                      <ng-template #coverTemplate>
                        <img 
                          [src]="getMediaUrl(product.mediaAssets?.[0])" 
                          [alt]="product.name" 
                          class="product-cover-image"
                          loading="lazy">
                      </ng-template>
                      
                      <nz-card-meta
                        [nzTitle]="titleTemplate"
                        [nzDescription]="product.shortDescription || product.description">
                        <ng-template #titleTemplate>
                          <h3 class="product-card-title">{{ product.name }}</h3>
                        </ng-template>
                      </nz-card-meta>
                      
                      <div class="product-footer">
                        <div class="product-price" [attr.aria-label]="'CATALOG.PRICE' | translate: { price: formatPrice(product.basePrice, product.currency) }">
                          {{ formatPrice(product.basePrice, product.currency) }}
                        </div>
                        <div class="product-actions" role="group" [attr.aria-label]="'CATALOG.PRODUCT_ACTIONS' | translate">
                          <button 
                            nz-button 
                            nzType="primary" 
                            nzSize="small" 
                            (click)="viewProductDetails(product.id)"
                            [attr.aria-label]="getAriaLabelForViewDetails(product.name)">
                            <span nz-icon nzType="search" nzTheme="outline"></span>
                            {{ 'BUTTONS.VIEW_DETAILS' | translate }}
                          </button>
                          <button 
                            nz-button 
                            nzType="default" 
                            nzSize="small" 
                            (click)="addToCart(product.id)"
                            [attr.aria-label]="getAriaLabelForAddToCart(product.name)">
                            <span nz-icon nzType="shopping-cart" nzTheme="outline"></span>
                            {{ 'BUTTONS.ADD_TO_CART' | translate }}
                          </button>
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
                [nzShowQuickJumper]="true"
                (nzPageIndexChange)="onPageChange($event)"
                (nzPageSizeChange)="onPageSizeChange($event)"
                [attr.aria-label]="'CATALOG.PAGINATION_NAVIGATION' | translate">
              </nz-pagination>
            </div>
          </section>
        </div>

        <div class="no-products" *ngIf="totalProducts === 0" role="status" aria-live="polite">
          {{ 'CATALOG.NO_PRODUCTS' | translate }}
        </div>
      </ng-container>
      
      <ng-template #featureDisabled>
        <nz-alert
          [nzType]="'info'"
          [nzMessage]="'CATALOG.FEATURE_DISABLED_TITLE' | translate"
          [nzDescription]="'CATALOG.FEATURE_DISABLED_DESCRIPTION' | translate"
          nzShowIcon
          role="alert">
        </nz-alert>
      </ng-template>
    </div>
  `,
  styles: [`
    .catalog-container {
      padding: 20px;
      direction: ltr;
    }
    
    /* Screen reader only class */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    .catalog-header {
      margin-bottom: 24px;
    }
    
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
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
      flex-direction: column;
      align-items: flex-end;
      gap: 16px;
      width: 250px;
    }
    
    .pagination {
      width: 100%;
    }
    
    .main-content {
      display: flex;
      gap: 24px;
    }
    
    .filters-sidebar {
      width: 280px;
      background: #fafafa;
      padding: 16px;
      border-radius: 4px;
      height: fit-content;
      position: sticky;
      top: 20px;
    }
    
    .filters-sidebar h2 {
      margin-top: 0;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e8e8e8;
    }
    
    .filter-group {
      margin-bottom: 24px;
    }
    
    .filter-group h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 600;
    }
    
    .filter-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .filter-item {
      margin-bottom: 8px;
    }
    
    .filter-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 4px 0;
    }
    
    .filter-checkbox {
      margin-right: 8px;
    }
    
    .filter-text {
      flex: 1;
    }
    
    .price-filter {
      margin-top: 8px;
    }
    
    .price-inputs {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }
    
    .reset-price-filters {
      width: 100%;
    }
    
    .products-section {
      flex: 1;
    }
    
    .results-summary {
      margin-bottom: 16px;
      color: #8c8c8c;
      font-weight: 500;
    }
    
    .list-view {
      margin-top: 16px;
    }
    
    .list-item {
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
    
    .product-content {
      display: grid;
      grid-template-columns: 100px 1fr auto;
      gap: 16px;
      align-items: start;
    }
    
    .product-image-container {
      width: 80px;
      height: 80px;
    }
    
    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .no-image-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      border-radius: 4px;
      color: #8c8c8c;
    }
    
    .product-details {
      flex: 1;
    }
    
    .product-title {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 600;
    }
    
    .product-description {
      margin: 0 0 8px 0;
      color: #595959;
    }
    
    .product-price {
      font-size: 18px;
      font-weight: bold;
      color: #1890ff;
    }
    
    .product-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-self: center;
    }
    
    .grid-view {
      margin-bottom: 16px;
    }
    
    .grid-item {
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
    
    .product-card-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
    
    .product-footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
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
    
    /* Focus styles for accessibility */
    input:focus,
    button:focus,
    select:focus {
      outline: 2px solid #1890ff;
      outline-offset: 2px;
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .catalog-container {
        border: 1px solid #000;
      }
      
      .filters-sidebar {
        border: 1px solid #000;
      }
      
      .product-card {
        border: 1px solid #d9d9d9;
      }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
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
    
    .catalog-container[dir="rtl"] .product-content {
      grid-template-columns: auto 1fr 100px;
    }
    
    .catalog-container[dir="rtl"] .filter-checkbox {
      margin-right: 0;
      margin-left: 8px;
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
        width: 100%;
        align-items: stretch;
      }
      
      .main-content {
        flex-direction: column;
      }
      
      .filters-sidebar {
        width: 100%;
        position: static;
      }
      
      .results-summary {
        text-align: center;
      }
      
      .product-content {
        grid-template-columns: 1fr;
      }
      
      .product-actions {
        flex-direction: row;
        justify-content: center;
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
  
  // Store filtered products for analytics tracking
  filteredProducts: Product[] = [];

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
      this.location.go(this.location.path()); // Refresh location for RTL update
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
    if (this.searchTerm) activeFilters['search'] = this.searchTerm;
    if (this.minPrice !== null || this.maxPrice !== null) {
      activeFilters['price'] = { min: this.minPrice, max: this.maxPrice };
    }
    const selectedCategories = this.categories.filter(cat => cat.selected).map(cat => cat.name);
    if (selectedCategories.length > 0) activeFilters['categories'] = selectedCategories;
    const selectedVendors = this.vendors.filter(vendor => vendor.selected).map(vendor => vendor.name);
    if (selectedVendors.length > 0) activeFilters['vendors'] = selectedVendors;

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
    
    // Update filteredProducts for tracking
    this.filteredProducts = filteredProducts;
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

  calculateEndResultCount(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalProducts);
  }

  trackByFacetValue(index: number, item: any) {
    return item.name;
  }

  viewProductDetails(productId: string) {
    // Placeholder for navigating to product details
    console.log('View product details:', productId);
  }

  addToCart(productId: string) {
    // Placeholder for adding product to cart
    console.log('Add to cart:', productId);
  }

  resetPriceFilters() {
    this.minPrice = null;
    this.maxPrice = null;
    this.onPriceFilterChange();
  }

  onCategoryChangeSafe(categoryId: string, event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.onCategoryChange(categoryId, target.checked);
    }
  }

  onVendorChangeSafe(vendorId: string, event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.onVendorChange(vendorId, target.checked);
    }
  }

  getAriaLabelForViewDetails(productName: string): string {
    // Using translate service to get the translated text and append the product name
    return `${this.translate.instant('BUTTONS.VIEW_DETAILS')} ${productName}`;
  }

  getAriaLabelForAddToCart(productName: string): string {
    // Using translate service to get the translated text and append the product name
    return `${this.translate.instant('BUTTONS.ADD_TO_CART')} ${productName}`;
  }
}