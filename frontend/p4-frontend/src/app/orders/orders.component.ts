import { Component } from '@angular/core';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NzPageHeaderModule,
    NzCardModule,
    NzListModule,
    NzTagModule,
    NzButtonModule,
    NzIconModule,
    TranslateModule,
    CommonModule
  ],
  template: `
    <nz-page-header nzTitle="{{ 'ORDERS.TITLE' | translate }}" nzSubtitle="{{ 'ORDERS.SUBTITLE' | translate }}">
      <nz-page-header-content>
        <nz-card [nzBordered]="false">
          <p>{{ 'ORDERS.DESCRIPTION' | translate }}</p>
        </nz-card>
        
        <nz-card [nzBordered]="false" [nzTitle]="'ORDERS.MY_ORDERS' | translate">
          <nz-list
            [nzDataSource]="orders"
            [nzItemLayout]="'vertical'"
            nzSize="large"
            [nzRenderItem]="item"
          >
            <ng-template #item let-item>
              <nz-list-item>
                <nz-list-item-meta
                  [nzTitle]="item.title"
                  [nzDescription]="item.description"
                >
                </nz-list-item-meta>
                <ul nz-list-item-actions>
                  <li><a href="javascript:;">{{ 'ORDERS.VIEW_DETAILS' | translate }}</a></li>
                  <li><a href="javascript:;">{{ 'ORDERS.TRACK' | translate }}</a></li>
                </ul>
                <nz-list-item extra>
                  <nz-tag [nzColor]="getStatusColor(item.status)">{{ item.status }}</nz-tag>
                  <div>{{ item.orderDate | date }}</div>
                </nz-list-item>
              </nz-list-item>
            </ng-template>
          </nz-list>
        </nz-card>
      </nz-page-header-content>
    </nz-page-header>
  `,
  styles: [``]
})
export class OrdersComponent {
  orders = [
    {
      id: 'ord-001',
      title: 'Industrial Equipment Order #ORD-001',
      description: 'Order for industrial pumps from ABC Supplier',
      status: 'Shipped',
      orderDate: new Date(2025, 8, 15)
    },
    {
      id: 'ord-002',
      title: 'Office Supplies Order #ORD-002',
      description: 'Monthly office supplies order',
      status: 'Delivered',
      orderDate: new Date(2025, 8, 10)
    },
    {
      id: 'ord-003',
      title: 'Raw Materials Order #ORD-003',
      description: 'Order for raw materials for Q4 production',
      status: 'Processing',
      orderDate: new Date(2025, 9, 1)
    }
  ];

  getStatusColor(status: string): string {
    switch(status) {
      case 'Delivered': return 'green';
      case 'Shipped': return 'blue';
      case 'Processing': return 'orange';
      case 'Cancelled': return 'red';
      default: return 'default';
    }
  }
}