import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-rfq',
  standalone: true,
  imports: [
    NzPageHeaderModule,
    NzCardModule,
    NzListModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    TranslateModule,
    DatePipe,
    CommonModule
  ],
  template: `
    <nz-page-header nzTitle="{{ 'RFQ.TITLE' | translate }}" nzSubtitle="{{ 'RFQ.SUBTITLE' | translate }}">
      <nz-page-header-content>
        <nz-card [nzBordered]="false">
          <p>{{ 'RFQ.DESCRIPTION' | translate }}</p>
          <button nz-button nzType="primary" (click)="createRfq()">
            <span nz-icon nzType="plus"></span>
            {{ 'RFQ.CREATE_NEW' | translate }}
          </button>
        </nz-card>
        
        <nz-card [nzBordered]="false" [nzTitle]="'RFQ.MY_RFQS' | translate">
          <nz-list
            [nzDataSource]="rfqs"
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
                  <li><a href="javascript:;">{{ 'RFQ.VIEW' | translate }}</a></li>
                  <li><a href="javascript:;">{{ 'RFQ.EDIT' | translate }}</a></li>
                </ul>
                <nz-list-item extra>
                  <nz-tag nzColor="blue">{{ item.status }}</nz-tag>
                  <div>{{ item.validUntil | date }}</div>
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
export class RfqComponent {
  rfqs = [
    {
      id: 'rfq-001',
      title: 'Industrial Equipment RFQ',
      description: 'Request for industrial pumps and related equipment',
      status: 'Open',
      validUntil: new Date(2025, 10, 15)
    },
    {
      id: 'rfq-002',
      title: 'Office Supplies RFQ',
      description: 'Monthly request for office supplies and stationery',
      status: 'Closed',
      validUntil: new Date(2025, 9, 30)
    }
  ];

  createRfq() {
    console.log('Creating new RFQ');
    // TODO: Implement create RFQ functionality
  }
}