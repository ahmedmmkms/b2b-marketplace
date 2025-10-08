-- P4-S2-T002: Create entities for RFQ, RFQ lines, quotes, quote lines, and message threads
-- Tables for RFQ (Request for Quote) and Quote functionality

-- Create account table
CREATE TABLE IF NOT EXISTS account (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    name VARCHAR(255) NOT NULL,
    company_email VARCHAR(255) UNIQUE NOT NULL,
    company_phone VARCHAR(50),
    company_address TEXT,
    tax_id VARCHAR(100),  -- VAT/Tax registration number
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('PENDING', 'ACTIVE', 'SUSPENDED', 'REJECTED', 'CLOSED')),
    type VARCHAR(20) DEFAULT 'BUYER' CHECK (type IN ('BUYER', 'VENDOR')),
    activated_at TIMESTAMP,
    credit_limit DECIMAL(19, 4),
    available_credit DECIMAL(19, 4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user table
CREATE TABLE IF NOT EXISTS "user" (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION')),
    role VARCHAR(20) DEFAULT 'MEMBER' CHECK (role IN ('ADMIN', 'MEMBER', 'OWNER')),
    account_id VARCHAR(26) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create rfq table
CREATE TABLE IF NOT EXISTS rfq (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    account_id VARCHAR(26) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),
    description TEXT,
    valid_until TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'CLOSED', 'CANCELLED')),
    expected_delivery_date TIMESTAMP,
    currency VARCHAR(3) DEFAULT 'USD' NOT NULL,
    payment_terms VARCHAR(255),
    shipping_terms VARCHAR(255),
    tax_included BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(26) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create rfq_line table
CREATE TABLE IF NOT EXISTS rfq_line (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    rfq_id VARCHAR(26) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    quantity INTEGER NOT NULL,
    unit_of_measure VARCHAR(20),
    required_by_date TIMESTAMP,
    product_specifications TEXT,
    notes TEXT,
    brand_preference VARCHAR(255),
    quality_requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create quote table
CREATE TABLE IF NOT EXISTS quote (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    rfq_id VARCHAR(26) NOT NULL,
    vendor_id VARCHAR(26) NOT NULL,
    quoted_by VARCHAR(26) NOT NULL,
    quote_number VARCHAR(100) UNIQUE NOT NULL,
    valid_until TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'SUBMITTED', 'ACCEPTED', 'DECLINED', 'EXPIRED')),
    currency VARCHAR(3) DEFAULT 'USD' NOT NULL,
    payment_terms VARCHAR(255),
    delivery_terms VARCHAR(255),
    freight_included BOOLEAN DEFAULT FALSE,
    tax_included BOOLEAN DEFAULT FALSE,
    notes TEXT,
    total_amount DECIMAL(19, 4),
    accepted_at TIMESTAMP,
    accepted_by VARCHAR(26),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create quote_line table
CREATE TABLE IF NOT EXISTS quote_line (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    quote_id VARCHAR(26) NOT NULL,
    rfq_line_id VARCHAR(26) NOT NULL,
    unit_price DECIMAL(19, 4) NOT NULL,
    quantity INTEGER NOT NULL,
    line_total DECIMAL(19, 4) NOT NULL,
    uom VARCHAR(20),
    delivery_date TIMESTAMP,
    moq INTEGER DEFAULT 1,
    lead_time_days INTEGER,
    product_specifications TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create message_thread table
CREATE TABLE IF NOT EXISTS message_thread (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    rfq_id VARCHAR(26) NOT NULL,
    quote_id VARCHAR(26),
    subject VARCHAR(255) NOT NULL,
    type VARCHAR(20) DEFAULT 'RFQ' CHECK (type IN ('RFQ', 'QUOTE', 'DISPUTE')),
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'RESOLVED', 'CLOSED')),
    last_message_at TIMESTAMP,
    last_message_by VARCHAR(26),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_account_email ON account(company_email);
CREATE INDEX IF NOT EXISTS idx_account_status ON account(status);
CREATE INDEX IF NOT EXISTS idx_account_type ON account(type);
CREATE INDEX IF NOT EXISTS idx_user_email ON "user"(email);
CREATE INDEX IF NOT EXISTS idx_user_username ON "user"(username);
CREATE INDEX IF NOT EXISTS idx_user_account_id ON "user"(account_id);
CREATE INDEX IF NOT EXISTS idx_user_status ON "user"(status);
CREATE INDEX IF NOT EXISTS idx_rfq_account_id ON rfq(account_id);
CREATE INDEX IF NOT EXISTS idx_rfq_status ON rfq(status);
CREATE INDEX IF NOT EXISTS idx_rfq_valid_until ON rfq(valid_until);
CREATE INDEX IF NOT EXISTS idx_rfq_line_rfq_id ON rfq_line(rfq_id);
CREATE INDEX IF NOT EXISTS idx_quote_rfq_id ON quote(rfq_id);
CREATE INDEX IF NOT EXISTS idx_quote_vendor_id ON quote(vendor_id);
CREATE INDEX IF NOT EXISTS idx_quote_status ON quote(status);
CREATE INDEX IF NOT EXISTS idx_quote_valid_until ON quote(valid_until);
CREATE INDEX IF NOT EXISTS idx_quote_line_quote_id ON quote_line(quote_id);
CREATE INDEX IF NOT EXISTS idx_quote_line_rfq_line_id ON quote_line(rfq_line_id);
CREATE INDEX IF NOT EXISTS idx_message_thread_rfq_id ON message_thread(rfq_id);
CREATE INDEX IF NOT EXISTS idx_message_thread_quote_id ON message_thread(quote_id);

-- Add foreign key constraints
ALTER TABLE "user" ADD CONSTRAINT fk_user_account_id FOREIGN KEY (account_id) REFERENCES account(id);
ALTER TABLE rfq_line ADD CONSTRAINT fk_rfq_line_rfq_id FOREIGN KEY (rfq_id) REFERENCES rfq(id);
ALTER TABLE quote ADD CONSTRAINT fk_quote_rfq_id FOREIGN KEY (rfq_id) REFERENCES rfq(id);
ALTER TABLE quote ADD CONSTRAINT fk_quote_vendor_id FOREIGN KEY (vendor_id) REFERENCES account(id);
ALTER TABLE quote_line ADD CONSTRAINT fk_quote_line_quote_id FOREIGN KEY (quote_id) REFERENCES quote(id);
ALTER TABLE quote_line ADD CONSTRAINT fk_quote_line_rfq_line_id FOREIGN KEY (rfq_line_id) REFERENCES rfq_line(id);
ALTER TABLE message_thread ADD CONSTRAINT fk_message_thread_rfq_id FOREIGN KEY (rfq_id) REFERENCES rfq(id);
ALTER TABLE message_thread ADD CONSTRAINT fk_message_thread_quote_id FOREIGN KEY (quote_id) REFERENCES quote(id);

-- Create function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at column
CREATE TRIGGER update_account_updated_at BEFORE UPDATE ON account FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "user" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rfq_updated_at BEFORE UPDATE ON rfq FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rfq_line_updated_at BEFORE UPDATE ON rfq_line FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quote_updated_at BEFORE UPDATE ON quote FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quote_line_updated_at BEFORE UPDATE ON quote_line FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_message_thread_updated_at BEFORE UPDATE ON message_thread FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();