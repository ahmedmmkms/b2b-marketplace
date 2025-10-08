import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzTypographyModule,
    NzIconModule,
    NzGridModule,
    TranslateModule,
    RouterLink,
    DatePipe
  ],
  template: `
    <div class="confirmation-container">
      <nz-card class="confirmation-card">
        <div class="confirmation-content" nz-row [nzJustify]="'center'" [nzAlign]="'middle'">
          <div nz-col nzSpan="24" class="text-center">
            <i nz-icon nzType="check-circle" class="success-icon"></i>
            <h1 nz-typography translate>orderConfirmation.successTitle</h1>
            <p nz-typography nzType="secondary" translate>orderConfirmation.successMessage</p>
            
            <nz-card nzSize="small" class="order-details-card">
              <p nz-typography><strong translate>orderConfirmation.orderNumber</strong> {{ orderNumber }}</p>
              <p nz-typography><strong translate>orderConfirmation.orderDate</strong> {{ orderDate | date }}</p>
              <p nz-typography><strong translate>orderConfirmation.totalAmount</strong> {{ totalAmount | currency }}</p>
            </nz-card>
            
            <div class="action-buttons">
              <button nz-button nzType="primary" (click)="viewOrder()" translate>orderConfirmation.viewOrder</button>
              <button nz-button nzType="default" [routerLink]="['/']" translate>orderConfirmation.continueShopping</button>
            </div>
          </div>
        </div>
      </nz-card>
    </div>
  `,
  styles: [`
    .confirmation-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .confirmation-card {
      text-align: center;
    }
    
    .success-icon {
      font-size: 64px;
      color: #52c41a;
      margin-bottom: 24px;
    }
    
    .order-details-card {
      margin: 24px auto;
      max-width: 400px;
      text-align: left;
    }
    
    .action-buttons {
      margin-top: 24px;
    }
    
    .action-buttons button {
      margin: 0 8px;
    }
    
    .text-center {
      text-align: center;
    }
  `]
})
export class OrderConfirmationComponent implements OnInit {
  orderNumber = 'ORD-12345678'; // This would come from route params in real implementation
  orderDate = new Date();
  totalAmount = 385; // This would also come from order data

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewOrder(): void {
    // Navigate to the order details page
    this.router.navigate(['/orders', this.orderNumber]);
  }
}