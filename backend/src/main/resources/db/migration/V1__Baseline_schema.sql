-- Complete Database Schema for P4 B2B Marketplace

-- Feature Flags table
CREATE TABLE feature_flags (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    flag_name VARCHAR(255) NOT NULL UNIQUE,
    is_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- Accounts table
CREATE TABLE accounts (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    account_type VARCHAR(26) NOT NULL CHECK (account_type IN ('INDIVIDUAL', 'COMPANY')),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'CLOSED')),
    company_name VARCHAR(255),
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    tax_id VARCHAR(50),
    registration_date DATE DEFAULT CURRENT_DATE,
    kyc_verified BOOLEAN DEFAULT FALSE,
    credit_limit DECIMAL(19,4) DEFAULT 0.0000,
    available_credit DECIMAL(19,4) DEFAULT 0.0000
);

-- Users table
CREATE TABLE users (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    account_id VARCHAR(26) REFERENCES accounts(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    job_title VARCHAR(100),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMP,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP
);

-- Permissions table
CREATE TABLE permissions (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    permission_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Roles table
CREATE TABLE roles (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- User Roles junction table
CREATE TABLE user_roles (
    id VARCHAR(26) PRIMARY KEY DEFAULT gen_random_ulid(),
    user_id VARCHAR(26) REFERENCES users(id),
    role_id VARCHAR(26) REFERENCES roles(id),
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assigned_by VARCHAR(26),
    UNIQUE (user_id, role_id)
);

-- Role Permissions junction table
CREATE TABLE role_permissions (
    id VARCHAR(26) PRIMARY KEY DEFAULT gen_random_ulid(),
    role_id VARCHAR(26) REFERENCES roles(id),
    permission_id VARCHAR(26) REFERENCES permissions(id),
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assigned_by VARCHAR(26),
    UNIQUE (role_id, permission_id)
);

-- Vendors table
CREATE TABLE vendors (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    business_name VARCHAR(255) NOT NULL,
    description TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    address JSONB,
    tax_id VARCHAR(100),
    vendor_status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (vendor_status IN ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED', 'CLOSED')),
    approval_date DATE,
    business_license_no VARCHAR(100),
    registration_date DATE,
    kyc_verified BOOLEAN NOT NULL DEFAULT FALSE,
    kyc_verified_at DATE,
    kyc_verified_by VARCHAR(255)
);

-- Product Attributes table
CREATE TABLE product_attributes (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description TEXT,
    attribute_type VARCHAR(50) NOT NULL CHECK (attribute_type IN ('TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'SELECT', 'MULTI_SELECT')),
    is_required BOOLEAN DEFAULT FALSE,
    is_searchable BOOLEAN DEFAULT FALSE,
    is_filterable BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    validation_rules JSONB
);

-- Product Attribute Values table
CREATE TABLE product_attribute_values (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    product_attribute_id VARCHAR(26) REFERENCES product_attributes(id),
    value TEXT NOT NULL,
    display_value TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0
);

-- Product Attribute Assignments table
CREATE TABLE product_attribute_assignments (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    product_id VARCHAR(26) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    product_attribute_id VARCHAR(26) NOT NULL REFERENCES product_attributes(id) ON DELETE CASCADE,
    product_attribute_value_id VARCHAR(26) REFERENCES product_attribute_values(id),
    custom_value TEXT,
    display_value TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    CONSTRAINT uq_product_attribute_assignment UNIQUE (product_id, product_attribute_id)
);

-- Media Assets table
CREATE TABLE media_assets (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    storage_path VARCHAR(1000) NOT NULL,
    content_type VARCHAR(100),
    file_size BIGINT,
    alt_text VARCHAR(255),
    title VARCHAR(255),
    caption TEXT,
    media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('IMAGE', 'VIDEO', 'DOCUMENT', 'OTHER')),
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'DELETED')),
    is_primary BOOLEAN DEFAULT FALSE,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    description TEXT,
    short_description VARCHAR(500),
    sku VARCHAR(100),
    upc VARCHAR(50),
    gtin VARCHAR(50),
    mpn VARCHAR(100),
    brand VARCHAR(100),
    category_id VARCHAR(26),
    vendor_id VARCHAR(26) REFERENCES vendors(id),
    product_status VARCHAR(20) DEFAULT 'DRAFT' CHECK (product_status IN ('DRAFT', 'ACTIVE', 'INACTIVE', 'DISCONTINUED')),
    price_amount DECIMAL(19,4),
    price_currency VARCHAR(3) DEFAULT 'USD',
    tax_class VARCHAR(50),
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    meta_keywords TEXT,
    weight DECIMAL(10,3),
    dimensions JSONB,
    packaging_info JSONB,
    min_order_quantity INTEGER DEFAULT 1,
    moq INTEGER,
    inventory_tracking BOOLEAN DEFAULT FALSE,
    stock_quantity INTEGER DEFAULT 0,
    inventory_status VARCHAR(20) DEFAULT 'IN_STOCK' CHECK (inventory_status IN ('IN_STOCK', 'OUT_OF_STOCK', 'BACKORDER', 'DISCONTINUED')),
    is_active BOOLEAN DEFAULT TRUE,
    dimensions_length DECIMAL(10,3),
    dimensions_width DECIMAL(10,3),
    dimensions_height DECIMAL(10,3),
    UNIQUE (slug)
);

-- Product Media junction table
CREATE TABLE product_media (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    product_id VARCHAR(26) REFERENCES products(id),
    media_asset_id VARCHAR(26) REFERENCES media_assets(id),
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    alt_text_override TEXT,
    UNIQUE (product_id, media_asset_id)
);

-- RFQs table
CREATE TABLE rfqs (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    account_id VARCHAR(26) REFERENCES accounts(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    rfq_status VARCHAR(20) DEFAULT 'DRAFT' CHECK (rfq_status IN ('DRAFT', 'OPEN', 'CLOSED', 'EXPIRED')),
    expiry_date TIMESTAMP,
    currency VARCHAR(3) DEFAULT 'USD',
    is_public BOOLEAN DEFAULT FALSE,
    contact_person VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    tax_included BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(255) NOT NULL
);

-- RFQ Lines table
CREATE TABLE rfq_lines (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    rfq_id VARCHAR(26) REFERENCES rfqs(id),
    product_id VARCHAR(26) REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER NOT NULL,
    unit_of_measure VARCHAR(20) DEFAULT 'EA',
    required_by TIMESTAMP,
    product_specifications TEXT,
    brand_preference VARCHAR(255),
    quality_requirements TEXT
);

-- Quotes table
CREATE TABLE quotes (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    rfq_id VARCHAR(26) REFERENCES rfqs(id),
    vendor_id VARCHAR(26) REFERENCES vendors(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    quote_status VARCHAR(20) DEFAULT 'DRAFT' CHECK (quote_status IN ('DRAFT', 'SUBMITTED', 'ACCEPTED', 'REJECTED', 'EXPIRED')),
    total_amount DECIMAL(19,4),
    currency VARCHAR(3) DEFAULT 'USD',
    validity_days INTEGER DEFAULT 30,
    expiry_date TIMESTAMP,
    accepted_at TIMESTAMP,
    quoted_by VARCHAR(255) NOT NULL,
    quote_number VARCHAR(255) NOT NULL,
    valid_until TIMESTAMP NOT NULL,
    freight_included BOOLEAN DEFAULT FALSE,
    tax_included BOOLEAN DEFAULT FALSE,
    UNIQUE (quote_number)
);

-- Quote Lines table
CREATE TABLE quote_lines (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    quote_id VARCHAR(26) REFERENCES quotes(id),
    rfq_line_id VARCHAR(26) REFERENCES rfq_lines(id),
    product_id VARCHAR(26) REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    unit_price DECIMAL(19,4) NOT NULL,
    quantity INTEGER NOT NULL,
    line_total DECIMAL(19,4) NOT NULL,
    moq INTEGER DEFAULT 1
);

-- Orders table
CREATE TABLE orders (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    account_id VARCHAR(26) REFERENCES accounts(id),
    quote_id VARCHAR(26) REFERENCES quotes(id),
    po_number VARCHAR(100),
    order_status VARCHAR(30) DEFAULT 'PENDING' CHECK (order_status IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED')),
    currency VARCHAR(3) DEFAULT 'USD',
    subtotal DECIMAL(19,4),
    tax_amount DECIMAL(19,4),
    shipping_amount DECIMAL(19,4),
    discount_amount DECIMAL(19,4),
    total_amount DECIMAL(19,4),
    billing_address JSONB,
    shipping_address JSONB,
    notes TEXT
);

-- Order Lines table
CREATE TABLE order_lines (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    order_id VARCHAR(26) REFERENCES orders(id),
    product_id VARCHAR(26) REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    unit_price DECIMAL(19,4) NOT NULL,
    quantity INTEGER NOT NULL,
    total_price DECIMAL(19,4) GENERATED ALWAYS AS (unit_price * quantity) STORED
);

-- Payments table
CREATE TABLE payments (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    order_id VARCHAR(26) REFERENCES orders(id),
    payment_method VARCHAR(50) NOT NULL,
    amount DECIMAL(19,4) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_status VARCHAR(20) DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED', 'CANCELLED')),
    transaction_id VARCHAR(255),
    provider VARCHAR(50),
    provider_response JSONB,
    captured_at TIMESTAMP
);

-- Wallets table
CREATE TABLE wallets (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    account_id VARCHAR(26) REFERENCES accounts(id),
    name VARCHAR(255) NOT NULL,
    balance DECIMAL(19,4) DEFAULT 0.0000,
    currency VARCHAR(3) DEFAULT 'USD',
    wallet_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (wallet_status IN ('ACTIVE', 'SUSPENDED', 'CLOSED'))
);

-- Wallet Transactions table
CREATE TABLE wallet_transactions (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    wallet_id VARCHAR(26) REFERENCES wallets(id),
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('CREDIT', 'DEBIT')),
    amount DECIMAL(19,4) NOT NULL,
    reference_type VARCHAR(50) NOT NULL,
    reference_id VARCHAR(26),
    description TEXT,
    balance_after DECIMAL(19,4)
);

-- Credit Limits table
CREATE TABLE credit_limits (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    account_id VARCHAR(26) REFERENCES accounts(id),
    currency VARCHAR(3) DEFAULT 'USD',
    limit_amount DECIMAL(19,4) NOT NULL,
    available_amount DECIMAL(19,4) NOT NULL,
    used_amount DECIMAL(19,4) DEFAULT 0.0000,
    credit_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (credit_status IN ('ACTIVE', 'SUSPENDED', 'EXCEEDED')),
    approved_date DATE,
    approved_by VARCHAR(26),
    notes TEXT
);

-- Tax Registrations table
CREATE TABLE tax_registrations (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    legal_name VARCHAR(255) NOT NULL,
    tax_number VARCHAR(100) NOT NULL,
    address JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Sequence Registry table
CREATE TABLE sequence_registry (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tax_reg_id VARCHAR(26) REFERENCES tax_registrations(id),
    sequence_type VARCHAR(20) NOT NULL CHECK (sequence_type IN ('INVOICE', 'CREDIT_NOTE')),
    prefix VARCHAR(20) NOT NULL,
    current_value INTEGER NOT NULL DEFAULT 0,
    next_value INTEGER NOT NULL DEFAULT 1,
    year INTEGER NOT NULL,
    UNIQUE (tax_reg_id, sequence_type, year)
);

-- Invoices table
CREATE TABLE invoices (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tax_reg_id VARCHAR(26) REFERENCES tax_registrations(id),
    sequence_number INTEGER NOT NULL,
    full_number VARCHAR(100),
    order_id VARCHAR(26) REFERENCES orders(id),
    issued_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    subtotal DECIMAL(19,4),
    discount_amount DECIMAL(19,4),
    vat_amount DECIMAL(19,4),
    total_amount DECIMAL(19,4),
    invoice_status VARCHAR(20) DEFAULT 'DRAFT' CHECK (invoice_status IN ('DRAFT', 'ISSUED', 'PAID', 'OVERDUE', 'CANCELLED')),
    customer_name VARCHAR(255) NOT NULL,
    customer_tax_number VARCHAR(100),
    customer_address JSONB,
    notes TEXT,
    UNIQUE (full_number)
);

-- Invoice Lines table
CREATE TABLE invoice_lines (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    invoice_id VARCHAR(26) REFERENCES invoices(id),
    order_line_id VARCHAR(26) REFERENCES order_lines(id),
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    unit_price DECIMAL(19,4) NOT NULL,
    quantity INTEGER NOT NULL,
    vat_rate DECIMAL(5,2) NOT NULL,
    vat_amount DECIMAL(19,4) GENERATED ALWAYS AS (((unit_price * quantity) * vat_rate) / 100) STORED,
    total_amount DECIMAL(19,4) GENERATED ALWAYS AS ((unit_price * quantity) + vat_amount) STORED
);

-- Credit Notes table
CREATE TABLE credit_notes (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tax_reg_id VARCHAR(26) REFERENCES tax_registrations(id),
    sequence_number INTEGER NOT NULL,
    full_number VARCHAR(100),
    invoice_id VARCHAR(26) REFERENCES invoices(id),
    issued_date DATE DEFAULT CURRENT_DATE,
    reason VARCHAR(50) NOT NULL CHECK (reason IN ('RETURN', 'CANCELLED_ORDER', 'DISCOUNT', 'ERROR', 'OTHER')),
    reason_details TEXT,
    currency VARCHAR(3) DEFAULT 'USD',
    subtotal DECIMAL(19,4),
    vat_amount DECIMAL(19,4),
    total_amount DECIMAL(19,4),
    credit_status VARCHAR(20) DEFAULT 'DRAFT' CHECK (credit_status IN ('DRAFT', 'ISSUED', 'APPLIED', 'CANCELLED')),
    UNIQUE (full_number)
);

-- Credit Note Lines table
CREATE TABLE credit_note_lines (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    credit_note_id VARCHAR(26) REFERENCES credit_notes(id),
    invoice_line_id VARCHAR(26) REFERENCES invoice_lines(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(19,4) NOT NULL,
    vat_rate DECIMAL(5,2) NOT NULL,
    vat_amount DECIMAL(19,4) GENERATED ALWAYS AS (((unit_price * quantity) * vat_rate) / 100) STORED,
    total_amount DECIMAL(19,4) GENERATED ALWAYS AS ((unit_price * quantity) + vat_amount) STORED
);

-- Loyalty Programs table
CREATE TABLE loyalty_programs (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    program_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (program_status IN ('DRAFT', 'ACTIVE', 'SUSPENDED', 'COMPLETED', 'CANCELLED')),
    point_ratio DECIMAL(5,2) DEFAULT 1.00,
    max_points_per_transaction DECIMAL(10,2)
);

-- Tiers table
CREATE TABLE tiers (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    loyalty_program_id VARCHAR(26) REFERENCES loyalty_programs(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    min_points_required INTEGER DEFAULT 0,
    discount_percentage DECIMAL(5,2) DEFAULT 0.00,
    priority_support BOOLEAN DEFAULT FALSE
);

-- Account Tiers table
CREATE TABLE account_tiers (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    account_id VARCHAR(26) REFERENCES accounts(id),
    tier_id VARCHAR(26) REFERENCES tiers(id),
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    membership_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (membership_status IN ('ACTIVE', 'EXPIRED', 'REVOKED'))
);

-- Rewards table
CREATE TABLE rewards (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    loyalty_program_id VARCHAR(26) REFERENCES loyalty_programs(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    points_required INTEGER NOT NULL,
    redemption_limit INTEGER,
    remaining_redemptions INTEGER,
    reward_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (reward_status IN ('DRAFT', 'ACTIVE', 'SUSPENDED', 'EXPIRED'))
);

-- Loyalty Transactions table
CREATE TABLE loyalty_transactions (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    account_id VARCHAR(26) REFERENCES accounts(id),
    txn_type VARCHAR(20) NOT NULL CHECK (txn_type IN ('EARN', 'BURN', 'ADJUST')),
    points DECIMAL(10,2) NOT NULL,
    reference_type VARCHAR(50),
    reference_id VARCHAR(26),
    balance_after DECIMAL(10,2),
    description TEXT
);

-- Audit Log table
CREATE TABLE audit_log (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(26),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(26),
    old_values JSONB,
    new_values JSONB,
    metadata JSONB,
    entity_id VARCHAR(255) NOT NULL,
    entity_type VARCHAR(50) NOT NULL
);

-- Idempotency Keys table
CREATE TABLE idempotency_keys (
    id VARCHAR(26) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    key_value VARCHAR(255) NOT NULL UNIQUE,
    request_method VARCHAR(10) NOT NULL,
    request_path TEXT NOT NULL,
    request_body TEXT,
    response_status INTEGER,
    response_body TEXT,
    expires_at TIMESTAMP NOT NULL
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_account_id ON users(account_id);
CREATE INDEX idx_users_account_active ON users(account_id, is_active);
CREATE INDEX idx_accounts_email ON accounts(email);
CREATE INDEX idx_accounts_status ON accounts(status);
CREATE INDEX idx_accounts_account_type ON accounts(account_type);
CREATE INDEX idx_permissions_name ON permissions(permission_name);
CREATE INDEX idx_permissions_active ON permissions(is_active);
CREATE INDEX idx_roles_name ON roles(role_name);
CREATE INDEX idx_roles_active ON roles(is_active);
CREATE INDEX idx_products_name ON products USING GIN(to_tsvector('english', name));
CREATE INDEX idx_products_status ON products(product_status);
CREATE INDEX idx_products_vendor_id ON products(vendor_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_slug_gin ON products USING GIN(to_tsvector('english', slug));
CREATE INDEX idx_product_attribute_assignments_product_id ON product_attribute_assignments(product_id);
CREATE INDEX idx_product_attribute_assignments_attribute_id ON product_attribute_assignments(product_attribute_id);
CREATE INDEX idx_vendors_status ON vendors(vendor_status);
CREATE INDEX idx_rfqs_account_id ON rfqs(account_id);
CREATE INDEX idx_rfqs_status ON rfqs(rfq_status);
CREATE INDEX idx_quotes_rfq_id ON quotes(rfq_id);
CREATE INDEX idx_quotes_vendor_id ON quotes(vendor_id);
CREATE INDEX idx_orders_account_id ON orders(account_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_invoices_order_id ON invoices(order_id);
CREATE INDEX idx_invoices_status ON invoices(invoice_status);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_status ON payments(payment_status);
CREATE INDEX idx_media_assets_status ON media_assets(status);
CREATE INDEX idx_media_assets_type ON media_assets(media_type);
CREATE INDEX idx_feature_flags_name ON feature_flags(flag_name);

-- Triggers to automatically update updated_at field
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_permissions_updated_at BEFORE UPDATE ON permissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_attributes_updated_at BEFORE UPDATE ON product_attributes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_attribute_values_updated_at BEFORE UPDATE ON product_attribute_values FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_attribute_assignments_updated_at BEFORE UPDATE ON product_attribute_assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_assets_updated_at BEFORE UPDATE ON media_assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rfqs_updated_at BEFORE UPDATE ON rfqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_credit_limits_updated_at BEFORE UPDATE ON credit_limits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loyalty_programs_updated_at BEFORE UPDATE ON loyalty_programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tiers_updated_at BEFORE UPDATE ON tiers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rewards_updated_at BEFORE UPDATE ON rewards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sequence_registry_updated_at BEFORE UPDATE ON sequence_registry FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tax_registrations_updated_at BEFORE UPDATE ON tax_registrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feature_flags_updated_at BEFORE UPDATE ON feature_flags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
