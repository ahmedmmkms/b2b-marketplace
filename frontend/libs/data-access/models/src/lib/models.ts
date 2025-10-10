// Common types and interfaces for the P4 marketplace

export interface BaseEntity {
  id: string; // ULID
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface PaginationParams {
  limit?: number;
  pageKey?: string; // ULID for cursor/keyset pagination
}

export interface PaginatedResponse<T> {
  data: T[];
  hasNext: boolean;
  nextKey?: string; // ULID for next page
}

// User and Account Models
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isActive: boolean;
  roles: string[];
}

export interface Account extends BaseEntity {
  name: string;
  type: 'BUYER' | 'VENDOR' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING_APPROVAL';
  primaryContact: User;
  users: User[];
}

// Product and Catalog Models
export interface Product extends BaseEntity {
  name: string;
  description: string;
  sku: string;
  gtin?: string; // Global Trade Item Number
  category: string;
  brand?: string;
  vendorId: string;
  isActive: boolean;
  attributes: ProductAttribute[];
  mediaAssets: MediaAsset[];
  inventory?: InventorySnapshot;
  priceLists?: PriceList[];
}

export interface ProductAttribute extends BaseEntity {
  productId: string;
  name: string;
  value: string;
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'ENUM';
}

export interface MediaAsset extends BaseEntity {
  productId: string;
  assetType: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  fileName: string;
  fileSize: number; // in bytes
  url: string;
  thumbnailUrl?: string;
  isPrimary: boolean;
}

export interface InventorySnapshot extends BaseEntity {
  productId: string;
  quantityAvailable: number;
  quantityReserved: number;
  lastUpdated: string;
  location?: string;
}

export interface PriceList extends BaseEntity {
  productId: string;
  name: string;
  currency: string; // e.g., 'AED', 'SAR'
  price: number;
  validFrom?: string;
  validTo?: string;
  minOrderQuantity?: number;
  isActive: boolean;
}

// Vendor Model
export interface Vendor extends BaseEntity {
  name: string;
  description?: string;
  businessRegistrationNumber?: string;
  taxId?: string;
  address: Address;
  contactInfo: ContactInfo;
  rating?: number; // Average rating
  isActive: boolean;
  isApproved: boolean;
}

export interface Address {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface ContactInfo {
  primaryContact: string; // Name
  email: string;
  phone: string;
  website?: string;
}

// RFQ and Quote Models
export interface Rfq extends BaseEntity {
  title: string;
  description: string;
  dueDate: string; // ISO date string
  status: 'DRAFT' | 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'CLOSED';
  createdBy: string; // User ID
  accountId: string;
  rfqLines: RfqLine[];
  attachments: Attachment[];
  quotes?: Quote[]; // Associated quotes
}

export interface RfqLine extends BaseEntity {
  rfqId: string;
  product?: Product; // Product reference
  productName: string;
  description?: string;
  quantity: number;
  unitOfMeasure: string;
  requiredDate?: string;
}

export interface Attachment extends BaseEntity {
  rfqId: string;
  fileName: string;
  fileSize: number;
  url: string;
  mimeType: string;
}

export interface Quote extends BaseEntity {
  rfqId: string;
  vendorId: string;
  vendor: Vendor;
  submissionDate: string;
  expiryDate: string;
  status: 'DRAFT' | 'SUBMITTED' | 'ACCEPTED' | 'REJECTED';
  quoteLines: QuoteLine[];
  attachments: Attachment[];
  totalAmount: number;
  currency: string;
}

export interface QuoteLine extends BaseEntity {
  quoteId: string;
  rfqLineId: string;
  rfqLine: RfqLine;
  unitPrice: number;
  totalPrice: number;
  deliveryDate?: string;
  notes?: string;
}

// Order Models
export interface Order extends BaseEntity {
  rfqId?: string;
  quoteId?: string;
  vendorId: string;
  accountId: string;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
  orderLines: OrderLine[];
  taxBreakdown?: TaxBreakdown[];
  totalAmount: number;
  currency: string;
  billingAddress: Address;
  shippingAddress: Address;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  shipmentStubs?: ShipmentStub[];
}

export interface OrderLine extends BaseEntity {
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxAmount?: number;
}

export interface TaxBreakdown extends BaseEntity {
  orderId: string;
  taxType: string; // e.g., 'VAT', 'GST'
  taxRate: number; // percentage
  taxAmount: number;
  taxableAmount: number;
}

export interface ShipmentStub extends BaseEntity {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  shippedDate: string;
  estimatedDelivery: string;
  status: 'PROCESSING' | 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'RETURNED';
}

// Payment Models
export interface Payment extends BaseEntity {
  orderId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
  paymentMethod: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'WALLET' | 'CASH_ON_DELIVERY';
  transactionId?: string;
  gateway: string; // Payment gateway used
  processedAt?: string;
}

// Wallet Models
export interface Wallet extends BaseEntity {
  accountId: string;
  balance: number;
  currency: string;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  walletTransactions: WalletTransaction[];
}

export interface WalletTransaction extends BaseEntity {
  walletId: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  currency: string;
  balanceAfter: number;
  transactionType: 'TOP_UP' | 'ORDER_PAYMENT' | 'REFUND' | 'ADJUSTMENT' | 'PENALTY';
  referenceId?: string; // Related order/payment ID
  description?: string;
}

// Invoice Models
export interface Invoice extends BaseEntity {
  orderId: string;
  vendorId: string;
  accountId: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  invoiceLines: InvoiceLine[];
  taxBreakdown: TaxBreakdown[];
  totalAmount: number;
  currency: string;
  vatRegNumber?: string; // VAT registration number
  sequenceNumber?: string; // Sequential number per tax establishment
}

export interface InvoiceLine extends BaseEntity {
  invoiceId: string;
  productId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxAmount?: number;
}

export interface CreditNote extends BaseEntity {
  invoiceId: string;
  reason: string;
  creditNoteNumber: string;
  creditDate: string;
  creditLines: CreditNoteLine[];
  totalCreditAmount: number;
  currency: string;
}

export interface CreditNoteLine extends BaseEntity {
  creditNoteId: string;
  invoiceLineId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalCredit: number;
}

// Loyalty Models
export interface LoyaltyProgram extends BaseEntity {
  name: string;
  description: string;
  programType: 'POINTS' | 'TIER' | 'REWARDS';
  isActive: boolean;
  rules: LoyaltyRule[];
  rewards: LoyaltyReward[];
}

export interface LoyaltyTier extends BaseEntity {
  programId: string;
  name: string;
  level: number; // 1 is lowest
  minPoints?: number; // For points-based tiering
  minSpending?: number; // For spending-based tiering
  benefits: LoyaltyBenefit[];
}

export interface LoyaltyRule extends BaseEntity {
  programId: string;
  ruleType: 'EARN' | 'BURN' | 'TIER_UPGRADE' | 'TIER_DOWNGRADE';
  condition: string; // JSON rule definition
  pointsMultiplier?: number;
  description: string;
}

export interface LoyaltyBenefit extends BaseEntity {
  tierId: string;
  benefitType: 'DISCOUNT' | 'FREE_SHIPPING' | 'EARLY_ACCESS' | 'SPECIAL_SUPPORT';
  value: number; // Discount percentage or fixed amount
  description: string;
}

export interface LoyaltyReward extends BaseEntity {
  programId: string;
  name: string;
  description: string;
  requiredPoints: number;
  rewardType: 'DISCOUNT_CODE' | 'PHYSICAL_PRODUCT' | 'EXPERIENCE';
  value?: string; // Discount code or product ID
}

export interface LoyaltyTransaction extends BaseEntity {
  accountId: string;
  programId: string;
  type: 'EARN' | 'BURN' | 'EXPIRE';
  points: number;
  balanceAfter: number;
  referenceId?: string; // Order ID or other reference
  description?: string;
}