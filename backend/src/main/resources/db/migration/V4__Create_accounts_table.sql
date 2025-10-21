-- Migration for Account entity (Task 4.1)

DO $$ 
BEGIN
    -- Check if the 'accounts' table doesn't exist (for fresh installations)
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'accounts' AND table_schema = 'public') THEN
        -- Create the accounts table if it doesn't exist
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
            kyc_verified BOOLEAN DEFAULT FALSE
        );
        
        -- Create indexes for better query performance
        CREATE INDEX idx_accounts_email ON accounts(email);
        CREATE INDEX idx_accounts_status ON accounts(status);
        CREATE INDEX idx_accounts_account_type ON accounts(account_type);
        CREATE INDEX idx_accounts_created_at ON accounts(created_at);
    ELSE
        -- If the 'accounts' table already exists, just add missing columns
        ALTER TABLE accounts ADD COLUMN IF NOT EXISTS contact_person VARCHAR(255);
        ALTER TABLE accounts ADD COLUMN IF NOT EXISTS registration_date DATE DEFAULT CURRENT_DATE;
        ALTER TABLE accounts ADD COLUMN IF NOT EXISTS kyc_verified BOOLEAN DEFAULT FALSE;
        ALTER TABLE accounts ADD COLUMN IF NOT EXISTS tax_id VARCHAR(50);
        
        -- Ensure contact_person column is NOT NULL if it exists but isn't already
        ALTER TABLE accounts ALTER COLUMN contact_person SET NOT NULL;
    END IF;
END $$;