-- Migration for Account entity (Task 4.1)
-- Renames existing account table to accounts and updates its structure to match Java entity

-- Rename the existing account table to accounts and update its structure
DO $$ 
BEGIN
    -- Check if the 'account' table exists and 'accounts' table doesn't exist
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'account' AND table_schema = 'public') 
    AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'accounts' AND table_schema = 'public') THEN
        -- Rename the table
        ALTER TABLE account RENAME TO accounts;
        
        -- Add missing columns that are expected by the Account entity
        ALTER TABLE accounts ADD COLUMN IF NOT EXISTS contact_person VARCHAR(255);
        ALTER TABLE accounts ADD COLUMN IF NOT EXISTS email VARCHAR(255);
        ALTER TABLE accounts ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
        ALTER TABLE accounts ADD COLUMN IF NOT EXISTS registration_date DATE;
        ALTER TABLE accounts ADD COLUMN IF NOT EXISTS kyc_verified BOOLEAN DEFAULT FALSE;
        ALTER TABLE accounts ADD COLUMN IF NOT EXISTS credit_limit DECIMAL(19,4) DEFAULT 0.0000;
        ALTER TABLE accounts ADD COLUMN IF NOT EXISTS available_credit DECIMAL(19,4) DEFAULT 0.0000;
        
        -- Rename columns to match the Account entity expectations
        ALTER TABLE accounts RENAME COLUMN company_email TO email;
        ALTER TABLE accounts RENAME COLUMN name TO company_name;
        ALTER TABLE accounts RENAME COLUMN type TO account_type;
        
        -- Update the email field to be non-nullable but only if it has valid values
        UPDATE accounts SET email = company_name || '@example.com' WHERE email IS NULL OR email = '';
        
        -- Update the contact_person field to use first_name or legal_name if available
        UPDATE accounts SET contact_person = COALESCE(contact_person, legal_name, 'Unknown Contact');
        
        -- Ensure required fields have values
        UPDATE accounts SET contact_person = 'Unknown Contact' WHERE contact_person IS NULL;
        
        -- Change column constraints to match the Account entity
        ALTER TABLE accounts ALTER COLUMN contact_person SET NOT NULL;
        
        -- Drop the legal_name column if it exists (since it's not in the final Account entity)
        ALTER TABLE accounts DROP COLUMN IF EXISTS legal_name;
        
        -- Rename and update constraints
        ALTER TABLE accounts DROP CONSTRAINT IF EXISTS account_pkey;
        ALTER TABLE accounts ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
        
        ALTER TABLE accounts DROP CONSTRAINT IF EXISTS uk_account_company_email;
        ALTER TABLE accounts ADD CONSTRAINT accounts_email_key UNIQUE (email);
        
        ALTER TABLE accounts DROP CONSTRAINT IF EXISTS account_status_check;
        ALTER TABLE accounts ADD CONSTRAINT accounts_status_check 
            CHECK (status::text = ANY (ARRAY['PENDING'::character varying, 'ACTIVE'::character varying, 'INACTIVE'::character varying, 'SUSPENDED'::character varying, 'CLOSED'::character varying]::text[]));
        
        ALTER TABLE accounts DROP CONSTRAINT IF EXISTS account_type_check;
        ALTER TABLE accounts ADD CONSTRAINT accounts_type_check 
            CHECK (account_type::text = ANY (ARRAY['INDIVIDUAL'::character varying, 'COMPANY'::character varying]::text[]));
        
        -- Update the trigger name
        ALTER FUNCTION IF EXISTS update_account_updated_at RENAME TO update_accounts_updated_at;
    END IF;
END $$;

-- Create the accounts table if it doesn't exist (for fresh installations)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'accounts' AND table_schema = 'public') THEN
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
            registration_date DATE DEFAULT CURRENT_DATE,
            kyc_verified BOOLEAN DEFAULT FALSE,
            credit_limit DECIMAL(19,4) DEFAULT 0.0000,
            available_credit DECIMAL(19,4) DEFAULT 0.0000
        );
        
        -- Create indexes for better query performance
        CREATE INDEX idx_accounts_email ON accounts(email);
        CREATE INDEX idx_accounts_status ON accounts(status);
        CREATE INDEX idx_accounts_account_type ON accounts(account_type);
        CREATE INDEX idx_accounts_created_at ON accounts(created_at);
    END IF;
END $$;