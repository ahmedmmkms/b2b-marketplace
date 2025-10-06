import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzResultModule } from 'ng-zorro-antd/result';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Vendor {
  id?: string;
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
}

@Component({
  selector: 'app-vendor-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzUploadModule,
    NzIconModule,
    NzStepsModule,
    NzResultModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="vendor-onboarding-container">
      <nz-steps [nzCurrent]="currentStep" nzSize="small">
        <nz-step nzTitle="{{ 'VENDOR.STEP_1' | translate }}"></nz-step>
        <nz-step nzTitle="{{ 'VENDOR.STEP_2' | translate }}"></nz-step>
        <nz-step nzTitle="{{ 'VENDOR.STEP_3' | translate }}"></nz-step>
      </nz-steps>

      <div class="form-container">
        <!-- Step 1: Basic Information -->
        <div *ngIf="currentStep === 0" class="step-form">
          <h2>{{ 'VENDOR.BASIC_INFO' | translate }}</h2>
          
          <form nz-form [formGroup]="basicInfoForm" (ngSubmit)="nextStep()">
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.COMPANY_NAME' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <input 
                  nz-input 
                  formControlName="name" 
                  [placeholder]="'VENDOR.ENTER_COMPANY_NAME' | translate" />
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.DESCRIPTION' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <textarea 
                  nz-input 
                  formControlName="description" 
                  [placeholder]="'VENDOR.ENTER_DESCRIPTION' | translate"
                  [nzAutosize]="{ minRows: 4, maxRows: 8 }"></textarea>
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.CONTACT_PERSON' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <input 
                  nz-input 
                  formControlName="contactPerson" 
                  [placeholder]="'VENDOR.ENTER_CONTACT_PERSON' | translate" />
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.CONTACT_EMAIL' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <input 
                  nz-input 
                  formControlName="contactEmail" 
                  [placeholder]="'VENDOR.ENTER_CONTACT_EMAIL' | translate" />
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.CONTACT_PHONE' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <input 
                  nz-input 
                  formControlName="contactPhone" 
                  [placeholder]="'VENDOR.ENTER_CONTACT_PHONE' | translate" />
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.TAX_NUMBER' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <input 
                  nz-input 
                  formControlName="taxNumber" 
                  [placeholder]="'VENDOR.ENTER_TAX_NUMBER' | translate" />
              </nz-form-control>
            </nz-form-item>
            
            <div class="form-actions">
              <button nz-button [nzType]="'primary'" type="submit">{{ 'VENDOR.NEXT' | translate }}</button>
            </div>
          </form>
        </div>

        <!-- Step 2: Address Information -->
        <div *ngIf="currentStep === 1" class="step-form">
          <h2>{{ 'VENDOR.ADDRESS_INFO' | translate }}</h2>
          
          <form nz-form [formGroup]="addressForm" (ngSubmit)="nextStep()">
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.STREET' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <input 
                  nz-input 
                  formControlName="street" 
                  [placeholder]="'VENDOR.ENTER_STREET' | translate" />
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.CITY' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <input 
                  nz-input 
                  formControlName="city" 
                  [placeholder]="'VENDOR.ENTER_CITY' | translate" />
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.STATE' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <input 
                  nz-input 
                  formControlName="state" 
                  [placeholder]="'VENDOR.ENTER_STATE' | translate" />
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.COUNTRY' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <input 
                  nz-input 
                  formControlName="country" 
                  [placeholder]="'VENDOR.ENTER_COUNTRY' | translate" />
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.POSTAL_CODE' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <input 
                  nz-input 
                  formControlName="postalCode" 
                  [placeholder]="'VENDOR.ENTER_POSTAL_CODE' | translate" />
              </nz-form-control>
            </nz-form-item>
            
            <div class="form-actions">
              <button nz-button [nzType]="'default'" (click)="prevStep()">{{ 'VENDOR.PREVIOUS' | translate }}</button>
              <button nz-button [nzType]="'primary'" type="submit">{{ 'VENDOR.NEXT' | translate }}</button>
            </div>
          </form>
        </div>

        <!-- Step 3: Business Documents -->
        <div *ngIf="currentStep === 2" class="step-form">
          <h2>{{ 'VENDOR.DOCUMENTS' | translate }}</h2>
          
          <form nz-form [formGroup]="documentsForm" (ngSubmit)="submitVendor()">
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.BUSINESS_LICENSE' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <nz-upload
                  [nzBeforeUpload]="beforeUpload"
                  [nzFileList]="licenseFileList"
                  (nzFileListChange)="handleLicenseFileListChange($event)">
                  <button nz-button>
                    <span nz-icon nzType="upload"></span> {{ 'VENDOR.UPLOAD_LICENSE' | translate }}
                  </button>
                </nz-upload>
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.REGISTRATION_DATE' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <nz-date-picker 
                  nzFormat="yyyy-MM-dd"
                  formControlName="registrationDate"
                  [nzPlaceHolder]="'VENDOR.SELECT_REGISTRATION_DATE' | translate">
                </nz-date-picker>
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label [nzSpan]="6">{{ 'VENDOR.ADDITIONAL_DOCUMENTS' | translate }}</nz-form-label>
              <nz-form-control [nzSpan]="14">
                <nz-upload
                  nzMultiple
                  [nzBeforeUpload]="beforeUpload"
                  [nzFileList]="additionalFileList"
                  (nzFileListChange)="handleAdditionalFileListChange($event)">
                  <button nz-button>
                    <span nz-icon nzType="upload"></span> {{ 'VENDOR.UPLOAD_ADDITIONAL' | translate }}
                  </button>
                </nz-upload>
              </nz-form-control>
            </nz-form-item>
            
            <div class="form-actions">
              <button nz-button [nzType]="'default'" (click)="prevStep()">{{ 'VENDOR.PREVIOUS' | translate }}</button>
              <button nz-button [nzType]="'primary'" type="submit" [disabled]="!isFormValid()">{{ 'VENDOR.SUBMIT' | translate }}</button>
            </div>
          </form>
        </div>

        <!-- Confirmation Step -->
        <div *ngIf="currentStep === 3" class="confirmation">
          <nz-result
            nzStatus="success"
            [nzTitle]="'VENDOR.ONBOARDING_SUCCESS' | translate"
            [nzSubTitle]="'VENDOR.ONBOARDING_SUBTITLE' | translate">
            <div nz-result-extra>
              <button nz-button nzType="primary" (click)="resetForm()">{{ 'VENDOR.NEW_VENDOR' | translate }}</button>
            </div>
          </nz-result>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vendor-onboarding-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .form-container {
      margin-top: 24px;
      padding: 24px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .step-form {
      padding: 20px 0;
    }
    
    .form-actions {
      margin-top: 24px;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    
    .confirmation {
      text-align: center;
      padding: 40px 0;
    }
  `]
})
export class VendorOnboardingComponent {
  currentStep = 0;
  maxSteps = 3;

  basicInfoForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    contactPerson: ['', [Validators.required]],
    contactEmail: ['', [Validators.required, Validators.email]],
    contactPhone: ['', [Validators.required]],
    taxNumber: ['', [Validators.required]]
  });

  addressForm = this.fb.group({
    street: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    postalCode: ['', [Validators.required]]
  });

  documentsForm = this.fb.group({
    registrationDate: [null, [Validators.required]]
  });

  licenseFileList: any[] = [];
  additionalFileList: any[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  nextStep() {
    if (this.currentStep < this.maxSteps - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitVendor() {
    const vendor: Vendor = {
      name: this.basicInfoForm.get('name')?.value,
      description: this.basicInfoForm.get('description')?.value,
      contactPerson: this.basicInfoForm.get('contactPerson')?.value,
      contactEmail: this.basicInfoForm.get('contactEmail')?.value,
      contactPhone: this.basicInfoForm.get('contactPhone')?.value,
      taxNumber: this.basicInfoForm.get('taxNumber')?.value,
      address: {
        street: this.addressForm.get('street')?.value,
        city: this.addressForm.get('city')?.value,
        state: this.addressForm.get('state')?.value,
        country: this.addressForm.get('country')?.value,
        postalCode: this.addressForm.get('postalCode')?.value
      },
      businessLicense: this.licenseFileList[0]?.response?.url || '',
      registrationDate: this.documentsForm.get('registrationDate')?.value,
      status: 'PENDING'
    };

    // Submit the vendor data to the backend
    this.http.post('http://localhost:8080/api/admin/vendors', vendor)
      .subscribe({
        next: (response) => {
          console.log('Vendor submitted successfully', response);
          this.currentStep = 3; // Show success step
        },
        error: (error) => {
          console.error('Error submitting vendor', error);
        }
      });
  }

  beforeUpload = (file: any) => {
    // Validate file type and size
    const isValidType = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'].includes(file.type);
    const isValidSize = file.size / 1024 / 1024 < 5; // Less than 5MB

    if (!isValidType) {
      console.error('Invalid file type');
      return false;
    }

    if (!isValidSize) {
      console.error('File size exceeds 5MB');
      return false;
    }

    return true;
  };

  handleLicenseFileListChange(fileList: any[]) {
    this.licenseFileList = fileList;
  }

  handleAdditionalFileListChange(fileList: any[]) {
    this.additionalFileList = fileList;
  }

  isFormValid() {
    return this.documentsForm.valid && this.licenseFileList.length > 0;
  }

  resetForm() {
    this.currentStep = 0;
    this.basicInfoForm.reset();
    this.addressForm.reset();
    this.documentsForm.reset();
    this.licenseFileList = [];
    this.additionalFileList = [];
  }
}