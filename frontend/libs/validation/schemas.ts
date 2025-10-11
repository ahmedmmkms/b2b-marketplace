// libs/validation/schemas.ts
import { z } from 'zod';

// User schemas
export const userSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
});

// Product schemas
export const productSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  inStock: z.boolean(),
  quantity: z.number().min(0, 'Quantity cannot be negative'),
});

// RFQ schemas
export const rfqSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  productId: z.string().min(1, 'Product ID is required'),
  productName: z.string().min(1, 'Product name is required'),
  quantity: z.number().positive('Quantity must be positive'),
  requiredBy: z.string().refine(date => !isNaN(Date.parse(date)), 'Invalid date'),
  description: z.string().optional(),
});

// Quote schemas
export const quoteSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  rfqId: z.string().min(1, 'RFQ ID is required'),
  vendorId: z.string().min(1, 'Vendor ID is required'),
  vendorName: z.string().min(1, 'Vendor name is required'),
  unitPrice: z.number().positive('Unit price must be positive'),
  totalAmount: z.number().positive('Total amount must be positive'),
  validityDays: z.number().positive('Validity must be positive'),
});

// Order schemas
export const orderSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  rfqId: z.string().min(1, 'RFQ ID is required'),
  quoteId: z.string().min(1, 'Quote ID is required'),
  status: z.enum(['DRAFT', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
  totalAmount: z.number().positive('Total amount must be positive'),
  createdAt: z.string().refine(date => !isNaN(Date.parse(date)), 'Invalid date'),
});

// Invoice schemas
export const invoiceSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  orderId: z.string().min(1, 'Order ID is required'),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  amount: z.number().positive('Amount must be positive'),
  vatAmount: z.number().nonnegative('VAT amount cannot be negative'),
  issueDate: z.string().refine(date => !isNaN(Date.parse(date)), 'Invalid date'),
  dueDate: z.string().refine(date => !isNaN(Date.parse(date)), 'Invalid date'),
});

// Wallet schemas
export const walletSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  balance: z.number().nonnegative('Balance cannot be negative'),
  creditLimit: z.number().nonnegative('Credit limit cannot be negative'),
  availableCredit: z.number().nonnegative('Available credit cannot be negative'),
});

// Loyalty schemas
export const loyaltySchema = z.object({
  id: z.string().min(1, 'ID is required'),
  points: z.number().nonnegative('Points cannot be negative'),
  tier: z.string().min(1, 'Tier is required'),
  nextTierPoints: z.number().nonnegative('Next tier points cannot be negative'),
});