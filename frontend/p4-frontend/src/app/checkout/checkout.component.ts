import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzCardModule,
    NzRadioModule,
    NzTypographyModule,
    NzSpinModule,
    NzAlertModule,
    NzDividerModule,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  paymentMethods: PaymentMethod[] = [
    { id: 'WALLET', name: 'Wallet', description: 'Pay with your company wallet' },
    { id: 'CREDIT_CARD', name: 'Credit Card', description: 'Pay with credit card (Sandbox)' },
    { id: 'BANK_TRANSFER', name: 'Bank Transfer', description: 'Pay with bank transfer' }
  ];
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  orderId: string | null = null;
  
  // Mock data for cart items and totals
  cartItems = [
    { id: '1', name: 'Product A', quantity: 2, unitPrice: 100, total: 200 },
    { id: '2', name: 'Product B', quantity: 1, unitPrice: 150, total: 150 }
  ];
  subtotal = 350;
  tax = 35;
  total = 385;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      company: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    // Initialize payment method form control separately
    this.checkoutForm.addControl('paymentMethod', this.fb.control('WALLET'));
  }

  ngOnInit(): void {
    // Check if feature is enabled
    // In a real implementation, we would check the feature flag here
  }

  onPaymentMethodChange(method: string): void {
    this.checkoutForm.get('paymentMethod')?.setValue(method);
  }

  get selectedPaymentMethod(): string {
    return this.checkoutForm.get('paymentMethod')?.value || 'WALLET';
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    // In a real implementation, this would call the backend API
    // Simulate API call with timeout
    setTimeout(() => {
      this.isLoading = false;
      // For demo purposes, we'll assume success
      this.successMessage = 'Order placed successfully!';
      this.orderId = 'ORD-12345678'; // Mock order ID
      
      // In a real implementation, we would:
      // 1. Prepare the order data
      // 2. Create an idempotency key
      // 3. Call the backend to create the order
      // 4. Process the payment based on selected method
    }, 1500);
  }

  onBack(): void {
    this.router.navigate(['/cart']);
  }
}