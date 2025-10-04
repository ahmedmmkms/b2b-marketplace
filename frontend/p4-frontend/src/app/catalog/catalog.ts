import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  vendorId: string;
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
    FormsModule,
    TranslateModule
  ],
  template: `
    <div class="catalog-container">
      <div class="search-section">
        <nz-input-group size="large">
          <input 
            type="text" 
            nz-input 
            [placeholder]="'CATALOG.SEARCH_PLACEHOLDER' | translate"
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearchChange()"
          />
          <span *nzSuffix nz-icon nzType="search"></span>
        </nz-input-group>
      </div>

      <div class="products-grid">
        <div nz-row [nzGutter]="[16, 16]">
          <div nz-col nzSpan="8" *ngFor="let product of filteredProducts">
            <nz-card 
              [nzTitle]="product.name" 
              class="product-card">
              <p>{{ product.description }}</p>
              <p class="price">{{ '$' + product.price }}</p>
              <button nz-button nzType="primary">{{ 'BUTTONS.VIEW_DETAILS' | translate }}</button>
            </nz-card>
          </div>
        </div>
      </div>

      <div class="no-products" *ngIf="filteredProducts.length === 0">
        {{ 'CATALOG.NO_PRODUCTS' | translate }}
      </div>
    </div>
  `,
  styles: [`
    .catalog-container {
      padding: 20px;
    }
    
    .search-section {
      margin-bottom: 30px;
    }
    
    .products-grid {
      margin-top: 20px;
    }
    
    .product-card {
      height: 200px;
    }
    
    .price {
      font-size: 18px;
      font-weight: bold;
      color: #1890ff;
      margin: 10px 0;
    }
    
    .no-products {
      text-align: center;
      padding: 40px;
      font-size: 18px;
      color: #8c8c8c;
    }
  `]
})
export class CatalogComponent implements OnInit {
  searchTerm: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    // Initialize with sample data
    this.products = [
      { id: '1', name: 'Sample Product 1', description: 'This is a sample product', price: 99.99, vendorId: 'vendor-1' },
      { id: '2', name: 'Sample Product 2', description: 'Another sample product', price: 149.99, vendorId: 'vendor-2' },
      { id: '3', name: 'Sample Product 3', description: 'Yet another sample product', price: 199.99, vendorId: 'vendor-1' }
    ];
    this.filteredProducts = [...this.products];
  }

  onSearchChange() {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}