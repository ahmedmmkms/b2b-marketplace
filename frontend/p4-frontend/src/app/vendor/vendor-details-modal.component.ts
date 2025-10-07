import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface Vendor {
  id: string;
  name: string;
  description: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  taxNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  businessLicense: string;
  registrationDate: Date;
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED';
  approvalDate?: Date;
  submittedDate: Date;
}

@Component({
  selector: 'app-vendor-details-modal',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzModalModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzIconModule
  ],
  template: `
    <div class="vendor-details-modal">
      <nz-descriptions 
        [nzTitle]="'VENDOR.DETAILS' | translate" 
        [nzBordered]="true" 
        [nzColumn]="1">
        <nz-descriptions-item [nzTitle]="'VENDOR.NAME' | translate">
          {{ vendor.name }}
        </nz-descriptions-item>
        <nz-descriptions-item [nzTitle]="'VENDOR.DESCRIPTION' | translate">
          {{ vendor.description }}
        </nz-descriptions-item>
        <nz-descriptions-item [nzTitle]="'VENDOR.CONTACT_PERSON' | translate">
          {{ vendor.contactPerson }}
        </nz-descriptions-item>
        <nz-descriptions-item [nzTitle]="'VENDOR.CONTACT_EMAIL' | translate">
          {{ vendor.contactEmail }}
        </nz-descriptions-item>
        <nz-descriptions-item [nzTitle]="'VENDOR.CONTACT_PHONE' | translate">
          {{ vendor.contactPhone }}
        </nz-descriptions-item>
        <nz-descriptions-item [nzTitle]="'VENDOR.TAX_NUMBER' | translate">
          {{ vendor.taxNumber }}
        </nz-descriptions-item>
        <nz-descriptions-item [nzTitle]="'VENDOR.REGISTRATION_DATE' | translate">
          {{ vendor.registrationDate | date:'short' }}
        </nz-descriptions-item>
        <nz-descriptions-item [nzTitle]="'VENDOR.STATUS' | translate">
          {{ 'VENDOR.STATUS_' + vendor.status | translate }}
        </nz-descriptions-item>
        <nz-descriptions-item [nzTitle]="'VENDOR.SUBMITTED_DATE' | translate">
          {{ vendor.submittedDate | date:'short' }}
        </nz-descriptions-item>
        <nz-descriptions-item [nzTitle]="'VENDOR.ADDRESS' | translate">
          <div>{{ vendor.address.street }}</div>
          <div>{{ vendor.address.city }}, {{ vendor.address.state }}, {{ vendor.address.postalCode }}</div>
          <div>{{ vendor.address.country }}</div>
        </nz-descriptions-item>
      </nz-descriptions>
    </div>
  `,
  styles: [`
    .vendor-details-modal {
      padding: 16px;
    }
    
    .ant-descriptions {
      margin-top: 16px;
    }
  `]
})
export class VendorDetailsModalComponent {
  @Input() vendor!: Vendor;
}