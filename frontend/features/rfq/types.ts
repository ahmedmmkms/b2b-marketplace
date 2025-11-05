// RFQ Types
export interface RFQ {
  id: string;
  buyerId: string;
  title: string;
  description?: string;
  notes?: string;
  status: 'draft' | 'issued' | 'closed' | 'awarded' | 'cancelled';
  attachments?: Attachment[];
  lines: RFQLine[];
}

export interface RFQCreate {
  title: string;
  notes?: string;
  lines: RFQLineCreate[];
}

export interface RFQLine {
  id: string;
  productId?: string;
  description: string;
  quantity: number;
  uom: string;
  targetPrice?: number;
}

export interface RFQLineCreate {
  productId?: string;
  description: string;
  quantity: number | string;
  uom: string;
  targetPrice?: number | string;
}

// Quote Types
export interface Quote {
  id: string;
  rfqId: string;
  vendorId: string;
  currency: string;
  validUntil?: string;
  status: 'draft' | 'submitted' | 'accepted' | 'rejected' | 'expired';
  subtotal: number;
  taxTotal: number;
  grandTotal: number;
  notes?: string;
  lines: QuoteLine[];
}

export interface QuoteCreate {
  vendorId: string;
  currency: string;
  validUntil?: string;
  notes?: string;
  lines: QuoteLineCreate[];
}

export interface QuoteLine {
  id: string;
  rfqLineId: string;
  productId?: string;
  description: string;
  quantity: number;
  uom: string;
  unitPrice: number;
  lineTotal: number;
  moq?: number;
  leadTimeDays?: number;
}

export interface QuoteLineCreate {
  rfqLineId: string;
  productId?: string;
  description: string;
  quantity: number;
  uom: string;
  unitPrice: number;
  moq?: number;
  leadTimeDays?: number;
}

// Attachment Type
export interface Attachment {
  key: string;
  url: string;
  filename: string;
}