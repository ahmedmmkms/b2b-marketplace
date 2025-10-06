import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  selector: 'app-vendor-approval-queue',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzCardModule,
    NzGridModule,
    NzPopconfirmModule,
    NzSpaceModule,
    NzIconModule,
    NzModalModule
  ],
  template: `
    <div class="vendor-approval-container">
      <div class="header">
        <h1>{{ 'VENDOR.APPROVAL_QUEUE' | translate }}</h1>
        <p>{{ 'VENDOR.APPROVAL_QUEUE_SUBTITLE' | translate }}</p>
      </div>

      <nz-card>
        <nz-table
          #vendorTable
          [nzData]="vendors"
          [nzLoading]="loading"
          [nzFrontPagination]="false"
          [nzShowSizeChanger]="true"
          [nzShowQuickJumper]="true"
          [nzShowTotal]="totalTemplate"
          [nzPageSize]="pageSize"
          [nzPageIndex]="pageIndex"
          [nzTotal]="total"
          (nzPageIndexChange)="onPageIndexChange($event)"
          (nzPageSizeChange)="onPageSizeChange($event)">
          
          <thead>
            <tr>
              <th>{{ 'VENDOR.NAME' | translate }}</th>
              <th>{{ 'VENDOR.CONTACT_PERSON' | translate }}</th>
              <th>{{ 'VENDOR.CONTACT_EMAIL' | translate }}</th>
              <th>{{ 'VENDOR.STATUS' | translate }}</th>
              <th>{{ 'VENDOR.SUBMITTED_DATE' | translate }}</th>
              <th>{{ 'VENDOR.ACTIONS' | translate }}</th>
            </tr>
          </thead>
          
          <tbody>
            <tr *ngFor="let vendor of vendorTable.data">
              <td>
                <strong>{{ vendor.name }}</strong>
                <div class="vendor-description">{{ vendor.description }}</div>
              </td>
              <td>{{ vendor.contactPerson }}</td>
              <td>{{ vendor.contactEmail }}</td>
              <td>
                <nz-tag [nzColor]="getStatusColor(vendor.status)">{{ 'VENDOR.STATUS_' + vendor.status | translate }}</nz-tag>
              </td>
              <td>{{ vendor.submittedDate | date:'short' }}</td>
              <td>
                <nz-space>
                  <button *nzSpaceItem nz-button nzType="default" (click)="viewVendorDetails(vendor)">
                    <span nz-icon nzType="eye"></span> {{ 'BUTTONS.VIEW' | translate }}
                  </button>
                  <button *nzSpaceItem nz-button nzType="primary" (click)="approveVendor(vendor)" 
                    [disabled]="vendor.status !== 'PENDING'">
                    <span nz-icon nzType="check"></span> {{ 'BUTTONS.APPROVE' | translate }}
                  </button>
                  <button *nzSpaceItem nz-button nzType="dashed" (click)="rejectVendor(vendor)"
                    [disabled]="vendor.status !== 'PENDING'">
                    <span nz-icon nzType="close"></span> {{ 'BUTTONS.REJECT' | translate }}
                  </button>
                </nz-space>
              </td>
            </tr>
          </tbody>
        </nz-table>
        
        <ng-template #totalTemplate let-total>{{ 'VENDOR.TOTAL_VENDORS' | translate: { total: total } }}</ng-template>
      </nz-card>
    </div>
  `,
  styles: [`
    .vendor-approval-container {
      padding: 24px;
    }
    
    .header {
      margin-bottom: 24px;
    }
    
    .header h1 {
      margin-bottom: 8px;
      font-size: 24px;
    }
    
    .vendor-description {
      font-size: 12px;
      color: #8c8c8c;
      margin-top: 4px;
    }
  `]
})
export class VendorApprovalQueueComponent implements OnInit {
  vendors: Vendor[] = [];
  loading = true;
  total = 0;
  pageIndex = 1;
  pageSize = 10;

  constructor(
    private http: HttpClient,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.loadVendors();
  }

  loadVendors() {
    this.loading = true;
    
    // In a real app, this would be an API call
    // this.http.get<Vendor[]>(`http://localhost:8080/api/admin/vendors?status=PENDING&page=${this.pageIndex}&size=${this.pageSize}`)
    //   .subscribe({
    //     next: (response) => {
    //       this.vendors = response.content;
    //       this.total = response.totalElements;
    //       this.loading = false;
    //     },
    //     error: (error) => {
    //       console.error('Error loading vendors', error);
    //       this.loading = false;
    //     }
    //   });
    
    // For now, using sample data
    setTimeout(() => {
      this.vendors = [
        {
          id: '1',
          name: 'Tech Solutions Inc.',
          description: 'Provides cutting-edge technology solutions',
          contactPerson: 'Ahmed Ali',
          contactEmail: 'ahmed@techsolutions.com',
          contactPhone: '+1234567890',
          taxNumber: 'TAX123456',
          address: {
            street: '123 Business Road',
            city: 'Cairo',
            state: 'Cairo',
            country: 'Egypt',
            postalCode: '12345'
          },
          businessLicense: 'license.pdf',
          registrationDate: new Date('2023-01-15'),
          status: 'PENDING',
          submittedDate: new Date('2025-10-05')
        },
        {
          id: '2',
          name: 'Global Traders LLC',
          description: 'International trading company',
          contactPerson: 'Fatima Hassan',
          contactEmail: 'fatima@globaltraders.com',
          contactPhone: '+9876543210',
          taxNumber: 'TAX789012',
          address: {
            street: '456 Commerce St',
            city: 'Dubai',
            state: 'Dubai',
            country: 'UAE',
            postalCode: '65432'
          },
          businessLicense: 'license.pdf',
          registrationDate: new Date('2023-03-22'),
          status: 'PENDING',
          submittedDate: new Date('2025-10-04')
        }
      ];
      this.total = 2;
      this.loading = false;
    }, 1000);
  }

  onPageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.loadVendors();
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.loadVendors();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING': return 'orange';
      case 'ACTIVE': return 'green';
      case 'SUSPENDED': return 'red';
      case 'REJECTED': return 'red';
      default: return 'default';
    }
  }

  viewVendorDetails(vendor: Vendor) {
    this.modalService.create({
      nzTitle: `${vendor.name} - ${'VENDOR.DETAILS' | translate}`,
      nzContent: VendorDetailsModalComponent,
      nzComponentParams: {
        vendor: vendor
      },
      nzClosable: true,
      nzWidth: 700,
      nzFooter: null
    });
  }

  approveVendor(vendor: Vendor) {
    this.modalService.confirm({
      nzTitle: `${'VENDOR.APPROVE_VENDOR' | translate}: ${vendor.name}`,
      nzContent: 'VENDOR.APPROVE_CONFIRMATION',
      nzOnOk: () => {
        // In a real app, this would be an API call
        // this.http.post(`http://localhost:8080/api/admin/vendors/${vendor.id}/approve`, {})
        //   .subscribe({
        //     next: () => {
        //       vendor.status = 'ACTIVE';
        //       vendor.approvalDate = new Date();
        //       console.log(`${vendor.name} approved successfully`);
        //       // Refresh the list
        //       this.loadVendors();
        //     },
        //     error: (error) => {
        //       console.error('Error approving vendor', error);
        //     }
        //   });
        
        // For demo purposes
        vendor.status = 'ACTIVE';
        vendor.approvalDate = new Date();
        this.loadVendors();
      }
    });
  }

  rejectVendor(vendor: Vendor) {
    this.modalService.confirm({
      nzTitle: `${'VENDOR.REJECT_VENDOR' | translate}: ${vendor.name}`,
      nzContent: 'VENDOR.REJECT_CONFIRMATION',
      nzOnOk: () => {
        // In a real app, this would be an API call
        // this.http.post(`http://localhost:8080/api/admin/vendors/${vendor.id}/reject`, {})
        //   .subscribe({
        //     next: () => {
        //       vendor.status = 'REJECTED';
        //       console.log(`${vendor.name} rejected successfully`);
        //       // Refresh the list
        //       this.loadVendors();
        //     },
        //     error: (error) => {
        //       console.error('Error rejecting vendor', error);
        //     }
        //   });
        
        // For demo purposes
        vendor.status = 'REJECTED';
        this.loadVendors();
      }
    });
  }
}