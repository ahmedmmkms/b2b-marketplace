-- V1__Create_complete_schema.sql

-- Drop existing tables if they exist (to start fresh)
DROP TABLE IF EXISTS product_media CASCADE;
DROP TABLE IF EXISTS product_attribute_value CASCADE;
DROP TABLE IF EXISTS media_asset CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS product_attribute CASCADE;
DROP TABLE IF EXISTS vendor CASCADE;

-- Create vendor table
CREATE TABLE vendor (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    name VARCHAR(255) NOT NULL,
    description TEXT,
    contact_person VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address JSONB,  -- Flexible address structure
    tax_number VARCHAR(100),  -- VAT/Tax registration number
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('PENDING', 'ACTIVE', 'SUSPENDED', 'REJECTED')),
    approval_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create product_attribute table to store attribute definitions
CREATE TABLE product_attribute (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    attribute_type VARCHAR(50) NOT NULL CHECK (attribute_type IN ('TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'SELECT')),
    is_required BOOLEAN DEFAULT FALSE,
    is_searchable BOOLEAN DEFAULT FALSE,
    is_filterable BOOLEAN DEFAULT FALSE,
    validation_rules JSONB,  -- Store validation constraints as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create product table
CREATE TABLE product (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,  -- URL-friendly identifier
    description TEXT,
    short_description VARCHAR(500),
    sku VARCHAR(100) UNIQUE,  -- Stock Keeping Unit
    upc VARCHAR(50),  -- Universal Product Code
    gtin VARCHAR(50),  -- Global Trade Item Number
    mpn VARCHAR(100),  -- Manufacturer Part Number
    brand VARCHAR(100),
    category_id VARCHAR(26),  -- Reference to category table if exists
    vendor_id VARCHAR(26) NOT NULL REFERENCES vendor(id),
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'UNPUBLISHED', 'SUSPENDED')),
    currency VARCHAR(3) DEFAULT 'USD',  -- Default currency
    base_price DECIMAL(19, 4),  -- Base price without currency
    tax_class VARCHAR(50),  -- Tax classification
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    meta_keywords TEXT,
    weight DECIMAL(10, 3),  -- Weight in kg
    dimensions JSONB,  -- Length, width, height as JSON
    packaging_info JSONB,  -- Packaging details
    min_order_qty INTEGER DEFAULT 1,
    moq INTEGER,  -- Minimum Order Quantity
    inventory_tracking BOOLEAN DEFAULT FALSE,
    inventory_qty INTEGER DEFAULT 0,
    inventory_status VARCHAR(20) DEFAULT 'IN_STOCK' CHECK (inventory_status IN ('IN_STOCK', 'OUT_OF_STOCK', 'BACKORDER', 'DISCONTINUED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create product_attribute_value table to store actual attribute values for products
CREATE TABLE product_attribute_value (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    product_id VARCHAR(26) NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    attribute_id VARCHAR(26) NOT NULL REFERENCES product_attribute(id),
    value_text TEXT,
    value_number DECIMAL(19, 4),
    value_boolean BOOLEAN,
    value_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, attribute_id)
);

-- Create media_asset table for storing product images and other media
CREATE TABLE media_asset (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    name VARCHAR(255) NOT NULL,  -- Display name
    filename VARCHAR(255) NOT NULL,  -- Original filename
    file_path VARCHAR(1000) NOT NULL,  -- Path in storage (e.g., R2 bucket path)
    mime_type VARCHAR(100),  -- MIME type of the file
    file_size BIGINT,  -- File size in bytes
    alt_text VARCHAR(255),  -- Alt text for accessibility
    title VARCHAR(255),  -- Title for the media
    caption TEXT,  -- Caption or description
    tags TEXT,  -- Comma-separated tags for search
    media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('IMAGE', 'VIDEO', 'DOCUMENT', 'OTHER')),  -- Type of media
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'DELETED')),
    is_primary BOOLEAN DEFAULT FALSE,  -- Primary image for product
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create product_media table for linking products to their media assets
CREATE TABLE product_media (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    product_id VARCHAR(26) NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    media_asset_id VARCHAR(26) NOT NULL REFERENCES media_asset(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,  -- Order in which to display media
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, media_asset_id)
);

-- Identity and access management tables
CREATE TABLE account (
    id VARCHAR(26) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('INDIVIDUAL', 'COMPANY')) DEFAULT 'INDIVIDUAL',
    legal_name VARCHAR(255),
    tax_number VARCHAR(100),
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('PENDING', 'ACTIVE', 'SUSPENDED', 'REJECTED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE app_user (
    id VARCHAR(26) PRIMARY KEY,
    account_id VARCHAR(26) NOT NULL REFERENCES account(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(50) DEFAULT 'USER',
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED')),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RFQ and Quote tables
CREATE TABLE rfq (
    id VARCHAR(26) PRIMARY KEY,
    account_id VARCHAR(26) NOT NULL REFERENCES account(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'OPEN', 'CLOSED', 'EXPIRED')),
    expiry_date TIMESTAMP,
    currency VARCHAR(3) DEFAULT 'USD',
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rfq_line (
    id VARCHAR(26) PRIMARY KEY,
    rfq_id VARCHAR(26) NOT NULL REFERENCES rfq(id) ON DELETE CASCADE,
    product_id VARCHAR(26) REFERENCES product(id),  -- Product reference (optional for custom products)
    product_name VARCHAR(255) NOT NULL,  -- Product name as specified in RFQ
    description TEXT,
    quantity INTEGER NOT NULL,
    unit_of_measure VARCHAR(20) DEFAULT 'EA',
    required_by TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quote (
    id VARCHAR(26) PRIMARY KEY,
    rfq_id VARCHAR(26) NOT NULL REFERENCES rfq(id),
    vendor_id VARCHAR(26) NOT NULL REFERENCES vendor(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'SUBMITTED', 'ACCEPTED', 'REJECTED', 'EXPIRED')),
    total_amount DECIMAL(19, 4),
    currency VARCHAR(3) DEFAULT 'USD',
    validity_days INTEGER DEFAULT 30,  -- Number of days the quote is valid
    expiry_date TIMESTAMP,
    accepted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quote_line (
    id VARCHAR(26) PRIMARY KEY,
    quote_id VARCHAR(26) NOT NULL REFERENCES quote(id) ON DELETE CASCADE,
    rfq_line_id VARCHAR(26) NOT NULL REFERENCES rfq_line(id),
    product_id VARCHAR(26) REFERENCES product(id),
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    unit_price DECIMAL(19, 4) NOT NULL,
    quantity INTEGER NOT NULL,
    total_price DECIMAL(19, 4) GENERATED ALWAYS AS (unit_price * quantity) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders tables (using order_table to avoid conflict with reserved word 'order')
CREATE TABLE order_table (
    id VARCHAR(26) PRIMARY KEY,
    account_id VARCHAR(26) NOT NULL REFERENCES account(id),
    quote_id VARCHAR(26) REFERENCES quote(id),  -- Reference to quote if created from quote
    po_number VARCHAR(100),  -- Customer's Purchase Order number
    status VARCHAR(30) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED')),
    currency VARCHAR(3) DEFAULT 'USD',
    subtotal DECIMAL(19, 4),
    tax_amount DECIMAL(19, 4),
    shipping_amount DECIMAL(19, 4),
    discount_amount DECIMAL(19, 4),
    total_amount DECIMAL(19, 4),
    billing_address JSONB,
    shipping_address JSONB,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order line items
CREATE TABLE order_line (
    id VARCHAR(26) PRIMARY KEY,
    order_id VARCHAR(26) NOT NULL REFERENCES order_table(id) ON DELETE CASCADE,
    product_id VARCHAR(26) REFERENCES product(id),
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    unit_price DECIMAL(19, 4) NOT NULL,
    quantity INTEGER NOT NULL,
    total_price DECIMAL(19, 4) GENERATED ALWAYS AS (unit_price * quantity) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment tables
CREATE TABLE payment (
    id VARCHAR(26) PRIMARY KEY,
    order_id VARCHAR(26) NOT NULL REFERENCES order_table(id),
    payment_method VARCHAR(50) NOT NULL,  -- Payment method (e.g., credit_card, bank_transfer, wallet)
    amount DECIMAL(19, 4) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED', 'CANCELLED')),
    transaction_id VARCHAR(255),  -- External transaction ID from payment gateway
    provider VARCHAR(50),  -- Payment provider (e.g., stripe, paypal)
    provider_response JSONB,  -- Full response from payment provider
    captured_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoicing tables
CREATE TABLE tax_reg (
    id VARCHAR(26) PRIMARY KEY,
    legal_name VARCHAR(255) NOT NULL,
    tax_number VARCHAR(100) NOT NULL,  -- VAT/Tax registration number
    address JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sequence_registry (
    id VARCHAR(26) PRIMARY KEY,  -- ULID
    tax_reg_id VARCHAR(26) NOT NULL REFERENCES tax_reg(id),
    sequence_type VARCHAR(20) NOT NULL CHECK (sequence_type IN ('INVOICE', 'CREDIT_NOTE')),  -- Type of sequence
    prefix VARCHAR(20) NOT NULL,  -- Prefix for the sequence (e.g., INV, CN)
    current_value INTEGER NOT NULL DEFAULT 0,  -- Current sequence value
    next_value INTEGER NOT NULL DEFAULT 1,  -- Next value to be used
    year INTEGER NOT NULL,  -- Year for year-specific sequences
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tax_reg_id, sequence_type, year)
);

CREATE TABLE invoice (
    id VARCHAR(26) PRIMARY KEY,
    tax_reg_id VARCHAR(26) NOT NULL REFERENCES tax_reg(id),
    sequence_number INTEGER NOT NULL,  -- Sequential number for the tax_reg
    full_number VARCHAR(100) UNIQUE,  -- Full invoice number (e.g., INV-2024-000001)
    order_id VARCHAR(26) NOT NULL REFERENCES order_table(id),
    issued_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    subtotal DECIMAL(19, 4),
    discount_amount DECIMAL(19, 4),
    vat_amount DECIMAL(19, 4),
    total_amount DECIMAL(19, 4),
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'ISSUED', 'PAID', 'OVERDUE', 'CANCELLED')),
    customer_name VARCHAR(255) NOT NULL,
    customer_tax_number VARCHAR(100),
    customer_address JSONB,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoice_line (
    id VARCHAR(26) PRIMARY KEY,
    invoice_id VARCHAR(26) NOT NULL REFERENCES invoice(id) ON DELETE CASCADE,
    order_line_id VARCHAR(26) NOT NULL REFERENCES order_line(id),
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    unit_price DECIMAL(19, 4) NOT NULL,
    quantity INTEGER NOT NULL,
    vat_rate DECIMAL(5, 2) NOT NULL,  -- VAT rate percentage
    vat_amount DECIMAL(19, 4) GENERATED ALWAYS AS (unit_price * quantity * vat_rate / 100) STORED,
    total_amount DECIMAL(19, 4) GENERATED ALWAYS AS (unit_price * quantity + (unit_price * quantity * vat_rate / 100)) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE credit_note (
    id VARCHAR(26) PRIMARY KEY,
    tax_reg_id VARCHAR(26) NOT NULL REFERENCES tax_reg(id),
    sequence_number INTEGER NOT NULL,
    full_number VARCHAR(100) UNIQUE,  -- Full credit note number (e.g., CN-2024-000001)
    invoice_id VARCHAR(26) NOT NULL REFERENCES invoice(id),
    issued_date DATE NOT NULL DEFAULT CURRENT_DATE,
    reason VARCHAR(50) NOT NULL CHECK (reason IN ('RETURN', 'CANCELLED_ORDER', 'DISCOUNT', 'ERROR', 'OTHER')),
    reason_details TEXT,
    currency VARCHAR(3) DEFAULT 'USD',
    subtotal DECIMAL(19, 4),
    vat_amount DECIMAL(19, 4),
    total_amount DECIMAL(19, 4),
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'ISSUED', 'APPLIED', 'CANCELLED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE credit_note_line (
    id VARCHAR(26) PRIMARY KEY,
    credit_note_id VARCHAR(26) NOT NULL REFERENCES credit_note(id) ON DELETE CASCADE,
    invoice_line_id VARCHAR(26) NOT NULL REFERENCES invoice_line(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(19, 4) NOT NULL,
    vat_rate DECIMAL(5, 2) NOT NULL,
    vat_amount DECIMAL(19, 4) GENERATED ALWAYS AS (unit_price * quantity * vat_rate / 100) STORED,
    total_amount DECIMAL(19, 4) GENERATED ALWAYS AS (unit_price * quantity + (unit_price * quantity * vat_rate / 100)) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallet and credit control tables
CREATE TABLE wallet (
    id VARCHAR(26) PRIMARY KEY,
    account_id VARCHAR(26) NOT NULL REFERENCES account(id),
    name VARCHAR(255) NOT NULL,  -- Name for the wallet (e.g., "Main Wallet", "Credit Wallet")
    balance DECIMAL(19, 4) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'CLOSED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wallet_txn (
    id VARCHAR(26) PRIMARY KEY,
    wallet_id VARCHAR(26) NOT NULL REFERENCES wallet(id),
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('CREDIT', 'DEBIT')),  -- CREDIT for deposits/additions, DEBIT for spendings/deductions
    amount DECIMAL(19, 4) NOT NULL,
    reference_type VARCHAR(50) NOT NULL,  -- Reference to the source of the transaction (e.g., 'ORDER_PAYMENT', 'REFUND')
    reference_id VARCHAR(26),  -- ID of the referenced entity
    description TEXT,
    balance_after DECIMAL(19, 4),  -- Balance in the wallet after this transaction
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE credit_limit (
    id VARCHAR(26) PRIMARY KEY,
    account_id VARCHAR(26) NOT NULL REFERENCES account(id),
    currency VARCHAR(3) DEFAULT 'USD',
    limit_amount DECIMAL(19, 4) NOT NULL,
    available_amount DECIMAL(19, 4) NOT NULL,  -- Available credit left
    used_amount DECIMAL(19, 4) DEFAULT 0.00,  -- Amount currently used
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'EXCEEDED')),
    approved_date DATE,
    approved_by VARCHAR(26),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loyalty program tables
CREATE TABLE loyalty_program (
    id VARCHAR(26) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('DRAFT', 'ACTIVE', 'SUSPENDED', 'COMPLETED', 'CANCELLED')),
    point_ratio DECIMAL(5, 2) DEFAULT 1.00,  -- How many points per currency unit spent
    max_points_per_transaction DECIMAL(10, 2),  -- Max points that can be earned per transaction
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tier (
    id VARCHAR(26) PRIMARY KEY,
    loyalty_program_id VARCHAR(26) NOT NULL REFERENCES loyalty_program(id),
    name VARCHAR(255) NOT NULL,  -- Tier name (e.g., Bronze, Silver, Gold)
    description TEXT,
    min_points_required INTEGER DEFAULT 0,  -- Minimum points to reach this tier
    discount_percentage DECIMAL(5, 2) DEFAULT 0.00,  -- Discount percentage for this tier
    priority_support BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE account_tier (
    id VARCHAR(26) PRIMARY KEY,
    account_id VARCHAR(26) NOT NULL REFERENCES account(id),
    tier_id VARCHAR(26) NOT NULL REFERENCES tier(id),
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,  -- When the tier expires (null if no expiry)
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'EXPIRED', 'REVOKED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reward (
    id VARCHAR(26) PRIMARY KEY,
    loyalty_program_id VARCHAR(26) NOT NULL REFERENCES loyalty_program(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    points_required INTEGER NOT NULL,  -- Number of points required to claim this reward
    redemption_limit INTEGER,  -- How many times this reward can be redeemed (NULL for unlimited)
    remaining_redemptions INTEGER,  -- Remaining redemptions available
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('DRAFT', 'ACTIVE', 'SUSPENDED', 'EXPIRED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loyalty_txn (
    id VARCHAR(26) PRIMARY KEY,
    account_id VARCHAR(26) NOT NULL REFERENCES account(id),
    txn_type VARCHAR(20) NOT NULL CHECK (txn_type IN ('EARN', 'BURN', 'ADJUST')),  -- EARN for gaining points, BURN for spending, ADJUST for admin adjustments
    points DECIMAL(10, 2) NOT NULL,
    reference_type VARCHAR(50),  -- Reference to the source of the transaction (e.g., 'PURCHASE', 'PROMOTION')
    reference_id VARCHAR(26),  -- ID of the referenced entity
    balance_after DECIMAL(10, 2),  -- Balance after this transaction
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit log table
CREATE TABLE audit_log (
    id VARCHAR(26) PRIMARY KEY,
    user_id VARCHAR(26),  -- User who performed the action (nullable for system actions)
    action VARCHAR(100) NOT NULL,  -- What action was performed
    resource_type VARCHAR(50) NOT NULL,  -- The type of resource (e.g., 'PRODUCT', 'ORDER', 'USER')
    resource_id VARCHAR(26),  -- The ID of the resource that was acted upon
    old_values JSONB,  -- Previous values before the change (for update operations)
    new_values JSONB,  -- New values after the change (for update operations)
    metadata JSONB,  -- Additional context about the action
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_product_vendor_id ON product(vendor_id);
CREATE INDEX idx_product_status ON product(status);
CREATE INDEX idx_product_category ON product(category_id);
CREATE INDEX idx_product_sku ON product(sku);
CREATE INDEX idx_product_slug ON product(slug);
CREATE INDEX idx_vendor_status ON vendor(status);
CREATE INDEX idx_media_asset_type ON media_asset(media_type);
CREATE INDEX idx_media_asset_status ON media_asset(status);
CREATE INDEX idx_product_attribute_name ON product_attribute(name);
CREATE INDEX idx_product_attribute_type ON product_attribute(attribute_type);
CREATE INDEX idx_rfq_account_id ON rfq(account_id);
CREATE INDEX idx_rfq_status ON rfq(status);
CREATE INDEX idx_quote_rfq_id ON quote(rfq_id);
CREATE INDEX idx_quote_vendor_id ON quote(vendor_id);
CREATE INDEX idx_order_account_id ON order_table(account_id);
CREATE INDEX idx_order_status ON order_table(status);
CREATE INDEX idx_payment_order_id ON payment(order_id);
CREATE INDEX idx_payment_status ON payment(status);
CREATE INDEX idx_invoice_order_id ON invoice(order_id);
CREATE INDEX idx_invoice_status ON invoice(status);

-- Add full-text search support
CREATE INDEX idx_product_name_gin ON product USING gin(to_tsvector('english', name));
CREATE INDEX idx_product_description_gin ON product USING gin(to_tsvector('english', description));
CREATE INDEX idx_product_slug_gin ON product USING gin(to_tsvector('english', slug));

-- Create function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_vendor_updated_at BEFORE UPDATE ON vendor FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON product FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_attribute_updated_at BEFORE UPDATE ON product_attribute FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_asset_updated_at BEFORE UPDATE ON media_asset FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_attribute_value_updated_at BEFORE UPDATE ON product_attribute_value FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_account_updated_at BEFORE UPDATE ON account FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_app_user_updated_at BEFORE UPDATE ON app_user FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rfq_updated_at BEFORE UPDATE ON rfq FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quote_updated_at BEFORE UPDATE ON quote FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_order_updated_at BEFORE UPDATE ON order_table FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoice_updated_at BEFORE UPDATE ON invoice FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallet_updated_at BEFORE UPDATE ON wallet FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_credit_limit_updated_at BEFORE UPDATE ON credit_limit FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loyalty_program_updated_at BEFORE UPDATE ON loyalty_program FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tier_updated_at BEFORE UPDATE ON tier FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();