-- Migration for Account entity (Task 4.1)
-- Creates the accounts table with all necessary fields

CREATE TABLE accounts (
    id VARCHAR(26) PRIMARY KEY, -- ULID format
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    account_type VARCHAR(20) NOT NULL, -- INDIVIDUAL or COMPANY
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, ACTIVE, INACTIVE, SUSPENDED, CLOSED
    company_name VARCHAR(255),
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    tax_id VARCHAR(50),
    registration_date DATE,
    kyc_verified BOOLEAN DEFAULT FALSE
);

-- Create indexes for better query performance
CREATE INDEX idx_accounts_email ON accounts(email);
CREATE INDEX idx_accounts_status ON accounts(status);
CREATE INDEX idx_accounts_account_type ON accounts(account_type);
CREATE INDEX idx_accounts_created_at ON accounts(created_at);