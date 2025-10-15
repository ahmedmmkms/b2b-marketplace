-- Baseline schema for P4 B2B Marketplace
-- This is the initial database schema with all core tables

-- Create UUID extension if not exists (for ULID functionality)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Account table - represents either buyers or vendors
CREATE TABLE account (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('BUYER', 'VENDOR')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_APPROVAL')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User table - users belong to accounts
CREATE TABLE user (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    account_id VARCHAR(26) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    role VARCHAR(50) NOT NULL CHECK (role IN ('ADMIN', 'BUYER', 'VENDOR', 'SUPER_ADMIN')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED')),
    password_hash VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
);

-- Vendor table - additional vendor-specific information
CREATE TABLE vendor (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    account_id VARCHAR(26) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    business_registration_number VARCHAR(255),
    tax_id VARCHAR(255),
    kyc_status VARCHAR(50) NOT NULL CHECK (kyc_status IN ('PENDING', 'APPROVED', 'REJECTED')),
    kyc_rejection_reason TEXT,
    kyc_approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
);

-- Product category table
CREATE TABLE product_category (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_id VARCHAR(26),
    level INTEGER DEFAULT 0,
    path TEXT, -- e.g., "/electronics/computers/laptops"
    status VARCHAR(50) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES product_category(id) ON DELETE SET NULL
);

-- Product table
CREATE TABLE product (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    vendor_id VARCHAR(26) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sku VARCHAR(100) UNIQUE,
    category_id VARCHAR(26),
    status VARCHAR(50) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE', 'DRAFT', 'ARCHIVED')),
    weight DECIMAL(10,3), -- in kg
    dimensions_length DECIMAL(10,2), -- in cm
    dimensions_width DECIMAL(10,2), -- in cm
    dimensions_height DECIMAL(10,2), -- in cm
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES vendor(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES product_category(id) ON DELETE SET NULL
);

-- Product attribute definition
CREATE TABLE product_attribute (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'SELECT')),
    is_required BOOLEAN DEFAULT FALSE,
    is_searchable BOOLEAN DEFAULT FALSE,
    is_filterable BOOLEAN DEFAULT FALSE,
    validation_rules JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product attribute values
CREATE TABLE product_attribute_value (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    product_id VARCHAR(26) NOT NULL,
    attribute_id VARCHAR(26) NOT NULL,
    text_value TEXT,
    number_value DECIMAL(15,4),
    boolean_value BOOLEAN,
    date_value DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES product_attribute(id) ON DELETE CASCADE,
    UNIQUE (product_id, attribute_id)
);

-- Product media table for storing product images and documents
CREATE TABLE product_media (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    product_id VARCHAR(26) NOT NULL,
    media_type VARCHAR(50) NOT NULL CHECK (media_type IN ('IMAGE', 'DOCUMENT', 'VIDEO')),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

-- RFQ (Request for Quote) table
CREATE TABLE rfq (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    buyer_account_id VARCHAR(26) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL CHECK (status IN ('DRAFT', 'OPEN', 'CLOSED', 'AWARDED', 'CANCELLED')),
    validity_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_account_id) REFERENCES account(id) ON DELETE CASCADE
);

-- RFQ line items
CREATE TABLE rfq_line (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    rfq_id VARCHAR(26) NOT NULL,
    product_id VARCHAR(26),
    product_name VARCHAR(255) NOT NULL, -- product name at time of RFQ creation
    quantity INTEGER NOT NULL,
    unit_of_measure VARCHAR(50),
    specifications TEXT,
    delivery_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rfq_id) REFERENCES rfq(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE SET NULL
);

-- Quote table
CREATE TABLE quote (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    rfq_id VARCHAR(26) NOT NULL,
    vendor_account_id VARCHAR(26) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('DRAFT', 'SUBMITTED', 'ACCEPTED', 'REJECTED', 'EXPIRED')),
    validity_date TIMESTAMP WITH TIME ZONE,
    total_amount DECIMAL(15,2),
    tax_amount DECIMAL(15,2),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rfq_id) REFERENCES rfq(id) ON DELETE CASCADE,
    FOREIGN KEY (vendor_account_id) REFERENCES account(id) ON DELETE CASCADE
);

-- Quote line items
CREATE TABLE quote_line (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    quote_id VARCHAR(26) NOT NULL,
    rfq_line_id VARCHAR(26) NOT NULL,
    product_id VARCHAR(26),
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(15,4) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    tax_rate DECIMAL(5,4),
    tax_amount DECIMAL(15,2),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quote_id) REFERENCES quote(id) ON DELETE CASCADE,
    FOREIGN KEY (rfq_line_id) REFERENCES rfq_line(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE SET NULL
);

-- Order table
CREATE TABLE "order" (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    quote_id VARCHAR(26),
    buyer_account_id VARCHAR(26) NOT NULL,
    vendor_account_id VARCHAR(26) NOT NULL,
    order_number VARCHAR(100) UNIQUE, -- formatted order number
    status VARCHAR(50) NOT NULL CHECK (status IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED')),
    total_amount DECIMAL(15,2),
    tax_amount DECIMAL(15,2),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    shipping_address JSONB,
    billing_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quote_id) REFERENCES quote(id) ON DELETE SET NULL,
    FOREIGN KEY (buyer_account_id) REFERENCES account(id) ON DELETE CASCADE,
    FOREIGN KEY (vendor_account_id) REFERENCES account(id) ON DELETE CASCADE
);

-- Order line items
CREATE TABLE order_line (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    order_id VARCHAR(26) NOT NULL,
    quote_line_id VARCHAR(26),
    product_id VARCHAR(26),
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(15,4) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    tax_rate DECIMAL(5,4),
    tax_amount DECIMAL(15,2),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES "order"(id) ON DELETE CASCADE,
    FOREIGN KEY (quote_line_id) REFERENCES quote_line(id) ON DELETE SET NULL,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE SET NULL
);

-- Payment table
CREATE TABLE payment (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    order_id VARCHAR(26) NOT NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('CREDIT_CARD', 'BANK_TRANSFER', 'WALLET', 'PAYPAL', 'OTHER')),
    payment_gateway VARCHAR(50),
    gateway_transaction_id VARCHAR(255),
    status VARCHAR(50) NOT NULL CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED')),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    gateway_response JSONB,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES "order"(id) ON DELETE CASCADE
);

-- Wallet table for corporate credit accounts
CREATE TABLE wallet (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    account_id VARCHAR(26) NOT NULL,
    name VARCHAR(255) NOT NULL, -- e.g., "Primary Corporate Wallet"
    description TEXT,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    reserved_amount DECIMAL(15,2) NOT NULL DEFAULT 0.00, -- for pending transactions
    available_balance DECIMAL(15,2) NOT NULL DEFAULT 0.00, -- balance - reserved
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
);

-- Wallet transaction table
CREATE TABLE wallet_transaction (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    wallet_id VARCHAR(26) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL CHECK (transaction_type IN ('CREDIT', 'DEBIT', 'RESERVATION', 'RELEASE', 'ADJUSTMENT')),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    balance_after DECIMAL(15,2) NOT NULL, -- balance after this transaction
    reference_id VARCHAR(255), -- reference to related entity (order, payment, etc.)
    reference_type VARCHAR(50), -- type of the related entity
    description TEXT,
    metadata JSONB,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallet(id) ON DELETE CASCADE
);

-- Credit limit table
CREATE TABLE credit_limit (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    account_id VARCHAR(26) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    approved_limit DECIMAL(15,2) NOT NULL,
    utilized_amount DECIMAL(15,2) DEFAULT 0.00,
    available_amount DECIMAL(15,2) AS (approved_limit - utilized_amount) STORED,
    status VARCHAR(50) NOT NULL CHECK (status IN ('ACTIVE', 'LIMIT_EXCEEDED', 'SUSPENDED', 'INACTIVE')),
    approved_by VARCHAR(26), -- user ID of approver
    approved_at TIMESTAMP WITH TIME ZONE,
    effective_from TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    effective_to TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
);

-- Tax registration table (for VAT compliance)
CREATE TABLE tax_reg (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    country_code VARCHAR(3) NOT NULL, -- ISO 3166-1 alpha-3
    tax_type VARCHAR(50) NOT NULL, -- VAT, GST, etc.
    registration_number VARCHAR(255) NOT NULL,
    legal_entity_name VARCHAR(255) NOT NULL,
    address JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    issued_date DATE,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Invoice sequence registry (for proper invoice numbering per tax jurisdiction)
CREATE TABLE sequence_registry (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    tax_reg_id VARCHAR(26) NOT NULL,
    sequence_name VARCHAR(255) NOT NULL, -- e.g., "SALES_INV", "CN"
    current_value BIGINT NOT NULL DEFAULT 0,
    prefix VARCHAR(20), -- e.g., "INV-"
    suffix VARCHAR(20), -- e.g., "-2025"
    format VARCHAR(50) DEFAULT '%08d', -- number format
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tax_reg_id) REFERENCES tax_reg(id) ON DELETE CASCADE,
    UNIQUE (tax_reg_id, sequence_name)
);

-- Invoice table
CREATE TABLE invoice (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    sequence_registry_id VARCHAR(26) NOT NULL,
    invoice_number VARCHAR(255) NOT NULL, -- formatted number using sequence
    order_id VARCHAR(26) NOT NULL,
    buyer_account_id VARCHAR(26) NOT NULL,
    vendor_account_id VARCHAR(26) NOT NULL,
    tax_reg_id VARCHAR(26) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('DRAFT', 'ISSUED', 'PAID', 'CANCELLED', 'OVERDUE')),
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE,
    total_amount DECIMAL(15,2),
    tax_amount DECIMAL(15,2),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    notes TEXT,
    pdf_file_path VARCHAR(500), -- path to stored invoice PDF
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sequence_registry_id) REFERENCES sequence_registry(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES "order"(id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_account_id) REFERENCES account(id) ON DELETE CASCADE,
    FOREIGN KEY (vendor_account_id) REFERENCES account(id) ON DELETE CASCADE,
    FOREIGN KEY (tax_reg_id) REFERENCES tax_reg(id) ON DELETE CASCADE,
    UNIQUE (invoice_number)
);

-- Invoice line items
CREATE TABLE invoice_line (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    invoice_id VARCHAR(26) NOT NULL,
    order_line_id VARCHAR(26),
    product_id VARCHAR(26),
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(15,4) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    tax_rate DECIMAL(5,4),
    tax_amount DECIMAL(15,2),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoice(id) ON DELETE CASCADE,
    FOREIGN KEY (order_line_id) REFERENCES order_line(id) ON DELETE SET NULL,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE SET NULL
);

-- Loyalty program table
CREATE TABLE loyalty_program (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED')),
    earning_rules JSONB, -- contains rules for earning points (e.g., $1 spent = 1 point)
    expiration_policy JSONB, -- contains rules for point expiration
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Loyalty tier table
CREATE TABLE loyalty_tier (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    loyalty_program_id VARCHAR(26) NOT NULL,
    name VARCHAR(255) NOT NULL, -- e.g., "Bronze", "Silver", "Gold"
    display_name VARCHAR(255) NOT NULL,
    min_points_required BIGINT,
    min_spend_required DECIMAL(15,2),
    benefits JSONB, -- contains benefits of the tier
    priority_level INTEGER, -- determines tier hierarchy
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (loyalty_program_id) REFERENCES loyalty_program(id) ON DELETE CASCADE
);

-- Loyalty reward table
CREATE TABLE loyalty_reward (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    loyalty_program_id VARCHAR(26) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    points_required BIGINT NOT NULL,
    discount_percentage DECIMAL(5,2),
    discount_amount DECIMAL(15,2),
    max_redemptions_per_user INTEGER,
    validity_days INTEGER, -- how many days reward is valid after redemption
    status VARCHAR(50) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE', 'EXPIRED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (loyalty_program_id) REFERENCES loyalty_program(id) ON DELETE CASCADE
);

-- Loyalty transaction table
CREATE TABLE loyalty_txn (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    account_id VARCHAR(26) NOT NULL,
    loyalty_program_id VARCHAR(26) NOT NULL,
    txn_type VARCHAR(50) NOT NULL CHECK (txn_type IN ('EARN', 'REDEEM', 'EXPIRE', 'ADJUST')),
    points_earned BIGINT DEFAULT 0,
    points_redeemed BIGINT DEFAULT 0,
    points_expired BIGINT DEFAULT 0,
    points_adjusted BIGINT DEFAULT 0,
    running_balance BIGINT NOT NULL, -- running balance after this transaction
    reference_id VARCHAR(255), -- reference to related entity (order, etc.)
    reference_type VARCHAR(50), -- type of the related entity
    description TEXT,
    metadata JSONB,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE,
    FOREIGN KEY (loyalty_program_id) REFERENCES loyalty_program(id) ON DELETE CASCADE
);

-- Audit log table for tracking changes to entities
CREATE TABLE audit_log (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    entity_type VARCHAR(100) NOT NULL, -- e.g., 'product', 'user', 'order'
    entity_id VARCHAR(26) NOT NULL, -- ID of the entity that was changed
    operation VARCHAR(50) NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
    old_values JSONB, -- JSON representation of old values before change
    new_values JSONB, -- JSON representation of new values after change
    changed_by VARCHAR(26), -- user ID of who made the change
    user_email VARCHAR(255), -- email of the user who made the change
    ip_address INET, -- IP address from which the change was made
    user_agent TEXT, -- user agent string
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance

-- Index on account for quick lookups
CREATE INDEX idx_account_status ON account(status);
CREATE INDEX idx_account_type ON account(type);

-- Index on user for quick lookups
CREATE INDEX idx_user_email ON user(email);
CREATE INDEX idx_user_account_id ON user(account_id);
CREATE INDEX idx_user_status ON user(status);

-- Index on vendor for quick lookups
CREATE INDEX idx_vendor_account_id ON vendor(account_id);
CREATE INDEX idx_vendor_kyc_status ON vendor(kyc_status);

-- Index on product for quick lookups
CREATE INDEX idx_product_vendor_id ON product(vendor_id);
CREATE INDEX idx_product_category_id ON product(category_id);
CREATE INDEX idx_product_status ON product(status);
CREATE INDEX idx_product_sku ON product(sku);

-- Index on product category for hierarchy queries
CREATE INDEX idx_product_category_parent_id ON product_category(parent_id);
CREATE INDEX idx_product_category_level ON product_category(level);

-- Index on RFQ for quick lookups
CREATE INDEX idx_rfq_buyer_account_id ON rfq(buyer_account_id);
CREATE INDEX idx_rfq_status ON rfq(status);
CREATE INDEX idx_rfq_validity_date ON rfq(validity_date);

-- Index on RFQ line for quick lookups
CREATE INDEX idx_rfq_line_rfq_id ON rfq_line(rfq_id);
CREATE INDEX idx_rfq_line_product_id ON rfq_line(product_id);

-- Index on quote for quick lookups
CREATE INDEX idx_quote_rfq_id ON quote(rfq_id);
CREATE INDEX idx_quote_vendor_account_id ON quote(vendor_account_id);
CREATE INDEX idx_quote_status ON quote(status);

-- Index on quote line for quick lookups
CREATE INDEX idx_quote_line_quote_id ON quote_line(quote_id);
CREATE INDEX idx_quote_line_rfq_line_id ON quote_line(rfq_line_id);

-- Index on order for quick lookups
CREATE INDEX idx_order_quote_id ON "order"(quote_id);
CREATE INDEX idx_order_buyer_account_id ON "order"(buyer_account_id);
CREATE INDEX idx_order_vendor_account_id ON "order"(vendor_account_id);
CREATE INDEX idx_order_status ON "order"(status);
CREATE INDEX idx_order_order_number ON "order"(order_number);

-- Index on order line for quick lookups
CREATE INDEX idx_order_line_order_id ON order_line(order_id);
CREATE INDEX idx_order_line_quote_line_id ON order_line(quote_line_id);

-- Index on payment for quick lookups
CREATE INDEX idx_payment_order_id ON payment(order_id);
CREATE INDEX idx_payment_status ON payment(status);

-- Index on wallet for quick lookups
CREATE INDEX idx_wallet_account_id ON wallet(account_id);
CREATE INDEX idx_wallet_active ON wallet(is_active);

-- Index on wallet transaction for quick lookups
CREATE INDEX idx_wallet_txn_wallet_id ON wallet_transaction(wallet_id);
CREATE INDEX idx_wallet_txn_type ON wallet_transaction(transaction_type);
CREATE INDEX idx_wallet_txn_reference ON wallet_transaction(reference_id, reference_type);

-- Index on credit limit for quick lookups
CREATE INDEX idx_credit_limit_account_id ON credit_limit(account_id);
CREATE INDEX idx_credit_limit_status ON credit_limit(status);

-- Index on invoice for quick lookups
CREATE INDEX idx_invoice_order_id ON invoice(order_id);
CREATE INDEX idx_invoice_buyer_account_id ON invoice(buyer_account_id);
CREATE INDEX idx_invoice_vendor_account_id ON invoice(vendor_account_id);
CREATE INDEX idx_invoice_status ON invoice(status);
CREATE INDEX idx_invoice_date ON invoice(invoice_date);

-- Index on invoice line for quick lookups
CREATE INDEX idx_invoice_line_invoice_id ON invoice_line(invoice_id);
CREATE INDEX idx_invoice_line_order_line_id ON invoice_line(order_line_id);

-- Index on loyalty for quick lookups
CREATE INDEX idx_loyalty_txn_account_id ON loyalty_txn(account_id);
CREATE INDEX idx_loyalty_txn_program_id ON loyalty_txn(loyalty_program_id);
CREATE INDEX idx_loyalty_txn_type ON loyalty_txn(txn_type);

-- Index on audit log for quick lookups
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_operation ON audit_log(operation);
CREATE INDEX idx_audit_log_changed_by ON audit_log(changed_by);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);

-- Function to update the updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at timestamp for all tables that have it
CREATE TRIGGER update_account_updated_at BEFORE UPDATE ON account FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON user FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vendor_updated_at BEFORE UPDATE ON vendor FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_category_updated_at BEFORE UPDATE ON product_category FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON product FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_attribute_updated_at BEFORE UPDATE ON product_attribute FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_attribute_value_updated_at BEFORE UPDATE ON product_attribute_value FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_media_updated_at BEFORE UPDATE ON product_media FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rfq_updated_at BEFORE UPDATE ON rfq FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rfq_line_updated_at BEFORE UPDATE ON rfq_line FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quote_updated_at BEFORE UPDATE ON quote FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quote_line_updated_at BEFORE UPDATE ON quote_line FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_order_updated_at BEFORE UPDATE ON "order" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_order_line_updated_at BEFORE UPDATE ON order_line FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_updated_at BEFORE UPDATE ON payment FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallet_updated_at BEFORE UPDATE ON wallet FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallet_transaction_updated_at BEFORE UPDATE ON wallet_transaction FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_credit_limit_updated_at BEFORE UPDATE ON credit_limit FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tax_reg_updated_at BEFORE UPDATE ON tax_reg FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sequence_registry_updated_at BEFORE UPDATE ON sequence_registry FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoice_updated_at BEFORE UPDATE ON invoice FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoice_line_updated_at BEFORE UPDATE ON invoice_line FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loyalty_program_updated_at BEFORE UPDATE ON loyalty_program FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loyalty_tier_updated_at BEFORE UPDATE ON loyalty_tier FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loyalty_reward_updated_at BEFORE UPDATE ON loyalty_reward FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loyalty_txn_updated_at BEFORE UPDATE ON loyalty_txn FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_audit_log_updated_at BEFORE UPDATE ON audit_log FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();