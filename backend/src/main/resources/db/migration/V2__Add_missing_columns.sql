-- V2__Add_missing_columns.sql
-- This migration adds missing columns that were defined in JPA entities but not in the initial schema

-- Add missing columns to account table
ALTER TABLE account ADD COLUMN IF NOT EXISTS company_email VARCHAR(255);
ALTER TABLE account ADD COLUMN IF NOT EXISTS company_phone VARCHAR(50);
ALTER TABLE account ADD COLUMN IF NOT EXISTS company_address TEXT;
ALTER TABLE account ADD COLUMN IF NOT EXISTS tax_id VARCHAR(100);
ALTER TABLE account ADD COLUMN IF NOT EXISTS activated_at TIMESTAMP;
ALTER TABLE account ADD COLUMN IF NOT EXISTS credit_limit DECIMAL(19, 4);
ALTER TABLE account ADD COLUMN IF NOT EXISTS available_credit DECIMAL(19, 4);
ALTER TABLE account ADD COLUMN IF NOT EXISTS type VARCHAR(20) DEFAULT 'BUYER';

-- Update existing records with default values where needed and make the company_email column NOT NULL
UPDATE account SET company_email = 'default@company.com' WHERE company_email IS NULL;
ALTER TABLE account ALTER COLUMN company_email SET NOT NULL;
ALTER TABLE account ADD CONSTRAINT uk_account_company_email UNIQUE (company_email);

-- Add missing columns to audit_log table
ALTER TABLE audit_log ADD COLUMN IF NOT EXISTS entity_id VARCHAR(255);
ALTER TABLE audit_log ADD COLUMN IF NOT EXISTS entity_type VARCHAR(50);

-- Update existing records with default values and make columns NOT NULL
UPDATE audit_log SET entity_id = id, entity_type = 'UNKNOWN' WHERE entity_id IS NULL OR entity_type IS NULL;

ALTER TABLE audit_log ALTER COLUMN entity_id SET NOT NULL;
ALTER TABLE audit_log ALTER COLUMN entity_type SET NOT NULL;

-- Add missing columns to quote table
ALTER TABLE quote ADD COLUMN IF NOT EXISTS quoted_by VARCHAR(255);
ALTER TABLE quote ADD COLUMN IF NOT EXISTS quote_number VARCHAR(255);
ALTER TABLE quote ADD COLUMN IF NOT EXISTS valid_until TIMESTAMP;
ALTER TABLE quote ADD COLUMN IF NOT EXISTS freight_included BOOLEAN DEFAULT FALSE;
ALTER TABLE quote ADD COLUMN IF NOT EXISTS tax_included BOOLEAN DEFAULT FALSE;

-- Update existing records with default values and make columns NOT NULL
UPDATE quote SET quoted_by = 'system', quote_number = 'TEMP-' || id, valid_until = CURRENT_TIMESTAMP + INTERVAL '30 days' WHERE quoted_by IS NULL OR quote_number IS NULL OR valid_until IS NULL;

ALTER TABLE quote ALTER COLUMN quoted_by SET NOT NULL;
ALTER TABLE quote ALTER COLUMN quote_number SET NOT NULL;
ALTER TABLE quote ALTER COLUMN valid_until SET NOT NULL;
ALTER TABLE quote ALTER COLUMN freight_included SET NOT NULL;
ALTER TABLE quote ALTER COLUMN tax_included SET NOT NULL;

-- Add unique constraint for quote_number
ALTER TABLE quote ADD CONSTRAINT uk_quote_number UNIQUE (quote_number);

-- Add missing columns to quote_line table
ALTER TABLE quote_line ADD COLUMN IF NOT EXISTS line_total DECIMAL(19, 4);
ALTER TABLE quote_line ADD COLUMN IF NOT EXISTS moq INTEGER DEFAULT 1;

-- Update existing records with default values and make columns NOT NULL
UPDATE quote_line SET line_total = 0.0000, moq = 1 WHERE line_total IS NULL OR moq IS NULL;

ALTER TABLE quote_line ALTER COLUMN line_total SET NOT NULL;
ALTER TABLE quote_line ALTER COLUMN moq SET NOT NULL;

-- Add missing columns to rfq table
ALTER TABLE rfq ADD COLUMN IF NOT EXISTS contact_person VARCHAR(255);
ALTER TABLE rfq ADD COLUMN IF NOT EXISTS contact_email VARCHAR(255);
ALTER TABLE rfq ADD COLUMN IF NOT EXISTS tax_included BOOLEAN DEFAULT FALSE;
ALTER TABLE rfq ADD COLUMN IF NOT EXISTS created_by VARCHAR(255);

-- Update existing records with default values and make columns NOT NULL
UPDATE rfq SET contact_person = 'N/A', contact_email = 'default@rfq.com', created_by = 'system' WHERE contact_person IS NULL OR contact_email IS NULL OR created_by IS NULL;

ALTER TABLE rfq ALTER COLUMN contact_person SET NOT NULL;
ALTER TABLE rfq ALTER COLUMN contact_email SET NOT NULL;
ALTER TABLE rfq ALTER COLUMN tax_included SET NOT NULL;
ALTER TABLE rfq ALTER COLUMN created_by SET NOT NULL;

-- Add missing columns to rfq_line table
ALTER TABLE rfq_line ADD COLUMN IF NOT EXISTS product_specifications TEXT;
ALTER TABLE rfq_line ADD COLUMN IF NOT EXISTS brand_preference VARCHAR(255);
ALTER TABLE rfq_line ADD COLUMN IF NOT EXISTS quality_requirements TEXT;