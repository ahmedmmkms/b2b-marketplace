-- V9__Create_loyalty_and_credit_control_tables.sql
-- Create tables for loyalty programs and credit controls

-- Table for loyalty programs
CREATE TABLE loyalty_programs (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    earn_points_rate DECIMAL(5, 4) NOT NULL DEFAULT 0.0000, -- Points per currency unit spent
    minimum_spend_threshold DECIMAL(10, 2) DEFAULT 0.00, -- Minimum spend to earn points
    maximum_points_per_transaction INTEGER DEFAULT 10000, -- Max points earned in a single transaction
    expiration_days INTEGER DEFAULT 365, -- Days after which points expire
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for loyalty tiers
CREATE TABLE loyalty_tiers (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    name VARCHAR(255) NOT NULL,
    description TEXT,
    min_points_required BIGINT NOT NULL DEFAULT 0, -- Minimum points needed to reach this tier
    discount_percentage DECIMAL(5, 2) DEFAULT 0.00, -- Discount percentage for this tier
    special_benefits JSONB, -- Additional benefits as JSON
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for loyalty rules
CREATE TABLE loyalty_rules (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    program_id VARCHAR(26) NOT NULL, -- Reference to loyalty program
    rule_name VARCHAR(255) NOT NULL,
    rule_type VARCHAR(50) NOT NULL, -- EARN, BURN, ELIGIBILITY
    condition_expression TEXT, -- Logic expression for rule conditions
    priority INTEGER DEFAULT 0, -- Priority order when multiple rules apply
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (program_id) REFERENCES loyalty_programs(id)
);

-- Table for loyalty transactions
CREATE TABLE loyalty_transactions (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    account_id VARCHAR(26) NOT NULL, -- Who earned/burned the points
    program_id VARCHAR(26) NOT NULL, -- Which program
    transaction_type VARCHAR(20) NOT NULL, -- EARN, BURN, EXPIRE, ADJUSTMENT
    points_amount INTEGER NOT NULL, -- Number of points (positive for earn, negative for burn/expired)
    reference_id VARCHAR(26), -- Reference to the original transaction (order, adjustment, etc.)
    reference_type VARCHAR(50), -- Type of reference (ORDER, ADJUSTMENT, etc.)
    expiry_date DATE, -- Date when these points will expire
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (program_id) REFERENCES loyalty_programs(id)
);

-- Table for loyalty rewards
CREATE TABLE loyalty_rewards (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    reward_name VARCHAR(255) NOT NULL,
    description TEXT,
    points_cost INTEGER NOT NULL, -- Points required to claim this reward
    reward_type VARCHAR(50) NOT NULL, -- DISCOUNT, GIFT, EXPERIENCE
    reward_value TEXT, -- Value of the reward (percentage, fixed amount, description)
    is_active BOOLEAN DEFAULT TRUE,
    max_uses_per_customer INTEGER DEFAULT NULL, -- Max times a customer can use this reward
    available_from DATE,
    available_until DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for credit limits
CREATE TABLE credit_limits (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    account_id VARCHAR(26) NOT NULL, -- Reference to the account
    cost_center_id VARCHAR(26), -- Optional reference to specific cost center
    approved_limit DECIMAL(19, 4) NOT NULL, -- Approved credit limit amount
    current_balance DECIMAL(19, 4) NOT NULL DEFAULT 0.0000, -- Current used credit
    currency VARCHAR(3) NOT NULL DEFAULT 'USD', -- Currency of the credit limit
    is_active BOOLEAN DEFAULT TRUE, -- Whether this credit line is active
    approved_by VARCHAR(26), -- Who approved this credit limit
    approved_at TIMESTAMP WITH TIME ZONE,
    reviewed_by VARCHAR(26), -- Who last reviewed this limit
    reviewed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES account(id)
);

-- Table for credit limit dunning events
CREATE TABLE credit_dunning_events (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    account_id VARCHAR(26) NOT NULL, -- Account that triggered the dunning
    limit_id VARCHAR(26) NOT NULL, -- Which credit limit was exceeded
    event_type VARCHAR(50) NOT NULL, -- SOFT_LOCK, HARD_LOCK, OVER_LIMIT_NOTIFY
    event_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    balance_at_event DECIMAL(19, 4) NOT NULL, -- Balance when event occurred
    limit_amount DECIMAL(19, 4) NOT NULL, -- The credit limit that was exceeded
    notes TEXT, -- Additional information about the dunning event
    resolved_by VARCHAR(26), -- Who resolved this dunning event
    resolved_at TIMESTAMP WITH TIME ZONE, -- When it was resolved
    resolution_notes TEXT, -- How it was resolved
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (limit_id) REFERENCES credit_limits(id)
);

-- Indexes to improve query performance
CREATE INDEX idx_loyalty_transactions_account_id ON loyalty_transactions(account_id);
CREATE INDEX idx_loyalty_transactions_program_id ON loyalty_transactions(program_id);
CREATE INDEX idx_loyalty_transactions_transaction_type ON loyalty_transactions(transaction_type);
CREATE INDEX idx_loyalty_transactions_expiry_date ON loyalty_transactions(expiry_date);

CREATE INDEX idx_loyalty_tiers_min_points ON loyalty_tiers(min_points_required);

CREATE INDEX idx_credit_limits_account_id ON credit_limits(account_id);
CREATE INDEX idx_credit_limits_cost_center_id ON credit_limits(cost_center_id);

CREATE INDEX idx_credit_dunning_events_account_id ON credit_dunning_events(account_id);
CREATE INDEX idx_credit_dunning_events_limit_id ON credit_dunning_events(limit_id);
CREATE INDEX idx_credit_dunning_events_event_type ON credit_dunning_events(event_type);

-- Trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all relevant tables
CREATE TRIGGER update_loyalty_programs_updated_at 
    BEFORE UPDATE ON loyalty_programs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loyalty_tiers_updated_at 
    BEFORE UPDATE ON loyalty_tiers 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loyalty_rules_updated_at 
    BEFORE UPDATE ON loyalty_rules 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loyalty_transactions_updated_at 
    BEFORE UPDATE ON loyalty_transactions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loyalty_rewards_updated_at 
    BEFORE UPDATE ON loyalty_rewards 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credit_limits_updated_at 
    BEFORE UPDATE ON credit_limits 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credit_dunning_events_updated_at 
    BEFORE UPDATE ON credit_dunning_events 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();