-- Migration to align database schema with Java entity mappings
-- Addresses inconsistencies between V1 schema and actual JPA entity definitions
-- Specifically fixes table names and column mappings for Account and User entities

-- Rename account table to accounts to match Account.java entity
ALTER TABLE IF EXISTS account RENAME TO accounts;

-- Update the constraint names to match the new table name
ALTER TABLE IF EXISTS accounts DROP CONSTRAINT IF EXISTS account_pkey;
ALTER TABLE IF EXISTS accounts DROP CONSTRAINT IF EXISTS uk_account_company_email;
ALTER TABLE IF EXISTS accounts RENAME CONSTRAINT account_status_check TO accounts_status_check;
ALTER TABLE IF EXISTS accounts RENAME CONSTRAINT account_type_check TO accounts_type_check;

-- Recreate constraints with correct names
ALTER TABLE IF EXISTS accounts ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
ALTER TABLE IF EXISTS accounts ADD CONSTRAINT uk_accounts_company_email UNIQUE (company_email);

-- Update the trigger name
DROP TRIGGER IF EXISTS update_account_updated_at ON accounts;
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Rename app_user table to users to match User.java entity
ALTER TABLE IF EXISTS app_user RENAME TO users;

-- Update the constraint names to match the new table name
ALTER TABLE IF EXISTS users DROP CONSTRAINT IF EXISTS app_user_pkey;
ALTER TABLE IF EXISTS users DROP CONSTRAINT IF EXISTS app_user_email_key;
ALTER TABLE IF EXISTS users RENAME CONSTRAINT app_user_status_check TO users_status_check;

-- Update foreign key constraint
ALTER TABLE IF EXISTS users DROP CONSTRAINT IF EXISTS app_user_account_id_fkey;
ALTER TABLE IF EXISTS users ADD CONSTRAINT users_account_id_fkey 
    FOREIGN KEY (account_id) REFERENCES accounts(id);

-- Recreate constraints with correct names
ALTER TABLE IF EXISTS users ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE IF EXISTS users ADD CONSTRAINT users_email_key UNIQUE (email);

-- Update the trigger name
DROP TRIGGER IF EXISTS update_app_user_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update indexes to match new table names
DROP INDEX IF EXISTS idx_users_account_id;
CREATE INDEX idx_users_account_id ON users(account_id);

-- Update other tables to reference the correct account_id foreign key
-- Update order_table to reference accounts table correctly
ALTER TABLE IF EXISTS order_table DROP CONSTRAINT IF EXISTS order_table_account_id_fkey;
ALTER TABLE IF EXISTS order_table ADD CONSTRAINT order_table_account_id_fkey 
    FOREIGN KEY (account_id) REFERENCES accounts(id);

-- Update rfq to reference accounts table correctly
ALTER TABLE IF EXISTS rfq DROP CONSTRAINT IF EXISTS rfq_account_id_fkey;
ALTER TABLE IF EXISTS rfq ADD CONSTRAINT rfq_account_id_fkey 
    FOREIGN KEY (account_id) REFERENCES accounts(id);

-- Update loyalty_txn to reference accounts table correctly
ALTER TABLE IF EXISTS loyalty_txn DROP CONSTRAINT IF EXISTS loyalty_txn_account_id_fkey;
ALTER TABLE IF EXISTS loyalty_txn ADD CONSTRAINT loyalty_txn_account_id_fkey 
    FOREIGN KEY (account_id) REFERENCES accounts(id);

-- Update credit_limit to reference accounts table correctly
ALTER TABLE IF EXISTS credit_limit DROP CONSTRAINT IF EXISTS credit_limit_account_id_fkey;
ALTER TABLE IF EXISTS credit_limit ADD CONSTRAINT credit_limit_account_id_fkey 
    FOREIGN KEY (account_id) REFERENCES accounts(id);

-- Update wallet to reference accounts table correctly
ALTER TABLE IF EXISTS wallet DROP CONSTRAINT IF EXISTS wallet_account_id_fkey;
ALTER TABLE IF EXISTS wallet ADD CONSTRAINT wallet_account_id_fkey 
    FOREIGN KEY (account_id) REFERENCES accounts(id);

-- Update account_tier to reference accounts table correctly
ALTER TABLE IF EXISTS account_tier DROP CONSTRAINT IF EXISTS account_tier_account_id_fkey;
ALTER TABLE IF EXISTS account_tier ADD CONSTRAINT account_tier_account_id_fkey 
    FOREIGN KEY (account_id) REFERENCES accounts(id);

-- Update indexes for the accounts table
DROP INDEX IF EXISTS idx_accounts_email; -- V4 migration likely creates this
-- Note: We'll add proper indexes after V4-V6 migrations are considered

-- Ensure the correct status values are supported in accounts table
-- Update any status values that don't match expected enum values
UPDATE accounts 
SET status = CASE 
    WHEN status = 'PENDING' THEN 'PENDING'
    WHEN status = 'ACTIVE' THEN 'ACTIVE'
    WHEN status = 'SUSPENDED' THEN 'SUSPENDED'
    WHEN status = 'REJECTED' THEN 'REJECTED'
    WHEN status = 'INACTIVE' THEN 'INACTIVE'
    WHEN status = 'CLOSED' THEN 'CLOSED'
    ELSE 'PENDING'
END;

-- Add any missing account_type values if needed (to support INDIVIDUAL/COMPANY)
UPDATE accounts 
SET type = CASE 
    WHEN type = 'INDIVIDUAL' THEN 'INDIVIDUAL'
    WHEN type = 'COMPANY' THEN 'COMPANY'
    ELSE 'INDIVIDUAL'
END;

-- Update default constraint for account status if needed
ALTER TABLE accounts ALTER COLUMN status SET DEFAULT 'PENDING';

-- Add any missing columns that are expected by Account.java but might be missing
-- Add any missing columns that are expected by User.java but might be missing
-- These would be added based on the Account.java and User.java definitions if they don't already exist:

-- For Account entity, add missing columns if they don't exist:
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS account_type VARCHAR(20) DEFAULT 'INDIVIDUAL';
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS contact_person VARCHAR(255);
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS registration_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS kyc_verified BOOLEAN DEFAULT FALSE;

-- For User entity, ensure all expected columns exist:
ALTER TABLE users ADD COLUMN IF NOT EXISTS job_title VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS salt VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS locked_until TIMESTAMP;

-- Update the updated_at trigger for users if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_trigger 
        WHERE tgname = 'update_users_updated_at'
    ) THEN
        CREATE TRIGGER update_users_updated_at 
        BEFORE UPDATE ON users 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END
$$;

-- Create indexes for better performance based on expected queries
-- These should align with common query patterns from the Java application
CREATE INDEX IF NOT EXISTS idx_accounts_email ON accounts(company_email);
CREATE INDEX IF NOT EXISTS idx_accounts_status ON accounts(status);
CREATE INDEX IF NOT EXISTS idx_accounts_account_type ON accounts(account_type);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_account_active ON users(account_id, is_active) WHERE is_active = TRUE;