-- V8__Create_invoicing_tables.sql
-- Create tables for VAT configuration and invoice management

-- Table for tax jurisdictions/establishments
CREATE TABLE tax_registrations (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    country_code VARCHAR(3) NOT NULL,
    tax_id VARCHAR(50) NOT NULL, -- VAT/Tax registration number
    establishment_name VARCHAR(255) NOT NULL,
    address JSONB, -- Flexible address structure as JSON
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for VAT rate configuration by jurisdiction and class
CREATE TABLE vat_rates (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    country_code VARCHAR(3) NOT NULL,
    tax_class VARCHAR(50) NOT NULL, -- e.g., STANDARD, REDUCED, EXEMPT
    rate DECIMAL(5, 4) NOT NULL, -- Up to 99.999% (precision for small rates)
    description TEXT,
    effective_from DATE NOT NULL,
    effective_to DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(country_code, tax_class, effective_from)
);

-- Table for invoice sequence management per tax establishment
CREATE TABLE sequence_registries (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    establishment_id VARCHAR(26) NOT NULL,
    sequence_name VARCHAR(100) NOT NULL, -- e.g., INVOICE, CREDIT_NOTE
    current_value BIGINT NOT NULL DEFAULT 0,
    prefix VARCHAR(20), -- Optional prefix for invoice numbers
    suffix VARCHAR(20), -- Optional suffix for invoice numbers
    format_pattern VARCHAR(50) DEFAULT 'SNNNNNNN', -- Default: prefix + 7 digits + suffix
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (establishment_id) REFERENCES tax_registrations(id),
    UNIQUE(establishment_id, sequence_name)
);

-- Table for invoices
CREATE TABLE invoices (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    establishment_id VARCHAR(26) NOT NULL,
    order_id VARCHAR(26) NOT NULL,
    customer_id VARCHAR(26) NOT NULL,
    vendor_id VARCHAR(26) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    
    -- Amounts
    subtotal_amount DECIMAL(19, 4) NOT NULL DEFAULT 0.0000,
    tax_amount DECIMAL(19, 4) NOT NULL DEFAULT 0.0000,
    total_amount DECIMAL(19, 4) NOT NULL DEFAULT 0.0000,
    
    -- Status and tracking
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT', -- DRAFT, ISSUED, PAID, CANCELLED
    notes TEXT,
    
    -- Document references
    po_number VARCHAR(50), -- Purchase order number
    reference_invoice_id VARCHAR(26), -- For credit notes referencing original invoice
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (establishment_id) REFERENCES tax_registrations(id),
    FOREIGN KEY (reference_invoice_id) REFERENCES invoices(id)
);

-- Table for invoice lines
CREATE TABLE invoice_lines (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    invoice_id VARCHAR(26) NOT NULL,
    product_id VARCHAR(26) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(19, 4) NOT NULL,
    line_total DECIMAL(19, 4) NOT NULL,
    
    -- VAT information for this line
    tax_class VARCHAR(50),
    tax_rate DECIMAL(5, 4),
    tax_amount DECIMAL(19, 4) NOT NULL DEFAULT 0.0000,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
);

-- Table for credit notes (refunds/adjustments)
CREATE TABLE credit_notes (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    credit_note_number VARCHAR(50) NOT NULL UNIQUE,
    establishment_id VARCHAR(26) NOT NULL,
    invoice_id VARCHAR(26) NOT NULL, -- Reference to original invoice
    customer_id VARCHAR(26) NOT NULL,
    vendor_id VARCHAR(26) NOT NULL,
    issue_date DATE NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    
    -- Amounts
    subtotal_amount DECIMAL(19, 4) NOT NULL DEFAULT 0.0000,
    tax_amount DECIMAL(19, 4) NOT NULL DEFAULT 0.0000,
    total_amount DECIMAL(19, 4) NOT NULL DEFAULT 0.0000,
    
    -- Status and reason
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT', -- DRAFT, ISSUED, CANCELLED
    reason VARCHAR(100), -- Reason for credit note
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (establishment_id) REFERENCES tax_registrations(id),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

-- Table for credit note lines
CREATE TABLE credit_note_lines (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    credit_note_id VARCHAR(26) NOT NULL,
    invoice_line_id VARCHAR(26), -- Reference to original invoice line (if applicable)
    product_id VARCHAR(26),
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(19, 4) NOT NULL,
    line_total DECIMAL(19, 4) NOT NULL,
    
    -- VAT information for this line
    tax_class VARCHAR(50),
    tax_rate DECIMAL(5, 4),
    tax_amount DECIMAL(19, 4) NOT NULL DEFAULT 0.0000,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (credit_note_id) REFERENCES credit_notes(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_invoices_establishment_id ON invoices(establishment_id);
CREATE INDEX idx_invoices_customer_id ON invoices(customer_id);
CREATE INDEX idx_invoices_vendor_id ON invoices(vendor_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_issue_date ON invoices(issue_date);

CREATE INDEX idx_invoice_lines_invoice_id ON invoice_lines(invoice_id);

CREATE INDEX idx_credit_notes_establishment_id ON credit_notes(establishment_id);
CREATE INDEX idx_credit_notes_invoice_id ON credit_notes(invoice_id);
CREATE INDEX idx_credit_notes_customer_id ON credit_notes(customer_id);

CREATE INDEX idx_credit_note_lines_credit_note_id ON credit_note_lines(credit_note_id);

-- Trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all relevant tables
CREATE TRIGGER update_tax_registrations_updated_at 
    BEFORE UPDATE ON tax_registrations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vat_rates_updated_at 
    BEFORE UPDATE ON vat_rates 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sequence_registries_updated_at 
    BEFORE UPDATE ON sequence_registries 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at 
    BEFORE UPDATE ON invoices 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoice_lines_updated_at 
    BEFORE UPDATE ON invoice_lines 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credit_notes_updated_at 
    BEFORE UPDATE ON credit_notes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credit_note_lines_updated_at 
    BEFORE UPDATE ON credit_note_lines 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();