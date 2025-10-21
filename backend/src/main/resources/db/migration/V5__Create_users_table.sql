-- Migration for Task 4.2: Create users table
-- This migration creates the users table with proper relationships to accounts

-- Check if the users table doesn't already exist before creating it
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public') THEN
        CREATE TABLE users (
            id VARCHAR(26) PRIMARY KEY, -- ULID (matching accounts table)
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            account_id VARCHAR(26) NOT NULL,
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
            locked_until TIMESTAMP,
            FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
        );
        
        -- Index for efficient lookup by email
        CREATE INDEX idx_users_email ON users(email);
        
        -- Index for efficient lookup by account_id
        CREATE INDEX idx_users_account_id ON users(account_id);
        
        -- Index for efficient lookup of active users by account
        CREATE INDEX idx_users_account_active ON users(account_id, is_active) WHERE is_active = TRUE;
        
        -- Create the trigger for updating the updated_at field
        -- Check if trigger doesn't already exist to avoid conflicts
        IF NOT EXISTS (
            SELECT 1 
            FROM information_schema.triggers 
            WHERE trigger_name = 'update_users_updated_at'
        ) THEN
            CREATE TRIGGER update_users_updated_at 
                BEFORE UPDATE ON users
                FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        END IF;
    END IF;
END $$;