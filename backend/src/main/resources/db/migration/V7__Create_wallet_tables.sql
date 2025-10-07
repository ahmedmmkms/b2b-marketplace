-- V7__Create_wallet_tables.sql
-- Create wallets table
CREATE TABLE wallets (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    account_id VARCHAR(26) UNIQUE NOT NULL,
    balance_amount DECIMAL(19, 4) NOT NULL DEFAULT 0, -- Amount in lowest currency unit (e.g., cents)
    balance_currency VARCHAR(3) NOT NULL DEFAULT 'USD', -- ISO 4217 currency code
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create wallet_transactions table
CREATE TABLE wallet_transactions (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    wallet_id VARCHAR(26) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL, -- TOP_UP, DEBIT, REFUND
    amount_amount DECIMAL(19, 4) NOT NULL, -- Amount in lowest currency unit (e.g., cents)
    amount_currency VARCHAR(3) NOT NULL, -- ISO 4217 currency code
    description TEXT,
    reference_id VARCHAR(26), -- Reference to order, payment, or other entity
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_wallets_account_id ON wallets(account_id);

CREATE INDEX idx_wallet_transactions_wallet_id ON wallet_transactions(wallet_id);
CREATE INDEX idx_wallet_transactions_reference_id ON wallet_transactions(reference_id);
CREATE INDEX idx_wallet_transactions_created_at ON wallet_transactions(created_at);
CREATE INDEX idx_wallet_transactions_type ON wallet_transactions(transaction_type);