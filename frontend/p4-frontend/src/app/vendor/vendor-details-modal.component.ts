import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';

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
    NzTagModule,
    NzModalModule
  ],
  template: `
    <div class="vendor-details-modal">
      <h3>{{ 'VENDOR.BASIC_INFO' | translate }}</h3>
      <p><strong>{{ 'VENDOR.NAME' | translate }}:</strong> {{ vendor.name }}</p>
      <p><strong>{{ 'VENDOR.DESCRIPTION' | translate }}:</strong> {{ vendor.description }}</p>
      <p><strong>{{ 'VENDOR.CONTACT_PERSON' | translate }}:</strong> {{ vendor.contactPerson }}</p>
      <p><strong>{{ 'VENDOR.CONTACT_EMAIL' | translate }}:</strong> {{ vendor.contactEmail }}</p>
      <p><strong>{{ 'VENDOR.CONTACT_PHONE' | translate }}:</strong> {{ vendor.contactPhone }}</p>
      <p><strong>{{ 'VENDOR.TAX_NUMBER' | translate }}:</strong> {{ vendor.taxNumber }}</p>

      <h3 style="margin-top: 20px;">{{ 'VENDOR.ADDRESS' | translate }}</h3>
      <p><strong>{{ 'VENDOR.STREET' | translate }}:</strong> {{ vendor.address.street }}</p>
      <p><strong>{{ 'VENDOR.CITY' | translate }}:</strong> {{ vendor.address.city }}</p>
      <p><strong>{{ 'VENDOR.STATE' | translate }}:</strong> {{ vendor.address.state }}</p>
      <p><strong>{{ 'VENDOR.COUNTRY' | translate }}:</strong> {{ vendor.address.country }}</p>
      <p><strong>{{ 'VENDOR.POSTAL_CODE' | translate }}:</strong> {{ vendor.address.postalCode }}</p>

      <h3 style="margin-top: 20px;">{{ 'VENDOR.BUSINESS_INFO' | translate }}</h3>
      <p><strong>{{ 'VENDOR.REGISTRATION_DATE' | translate }}:</strong> {{ vendor.registrationDate | date:'short' }}</p>
      <p><strong>{{ 'VENDOR.BUSINESS_LICENSE' | translate }}:</strong> <a href="{{ vendor.businessLicense }}">{{ 'VENDOR.DOWNLOAD' | translate }}</a></p>
      <p><strong>{{ 'VENDOR.STATUS' | translate }}:</strong> 
        <nz-tag [nzColor]="getStatusColor(vendor.status)">{{ 'VENDOR.STATUS_' + vendor.status | translate }}</nz-tag>
      </p>
      <p *ngIf="vendor.approvalDate"><strong>{{ 'VENDOR.APPROVAL_DATE' | translate }}:</strong> {{ vendor.approvalDate | date:'short' }}</p>
    </div>
  `,
  styles: [`
    .vendor-details-modal {
      max-height: 500px;
      overflow-y: auto;
    }
    
    .vendor-details-modal h3 {
      margin-top: 0;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 8px;
    }
    
    .vendor-details-modal p {
      margin-bottom: 10px;
      line-height: 1.6;
    }
  `]
})
export class VendorDetailsModalComponent {
  @Input() vendor!: Vendor;

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING': return 'orange';
      case 'ACTIVE': return 'green';
      case 'SUSPENDED': return 'red';
      case 'REJECTED': return 'red';
      default: return 'default';
    }
  }
}