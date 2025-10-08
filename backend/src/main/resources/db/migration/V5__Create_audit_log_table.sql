-- P4-S2-T008: Create audit log table for tracking RFQ/Quote related actions
-- Table for storing audit trail of important actions

CREATE TABLE IF NOT EXISTS audit_log (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    user_id VARCHAR(26) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,  -- e.g., RFQ, QUOTE, USER, ACCOUNT
    entity_id VARCHAR(26) NOT NULL,   -- ID of the entity being audited
    action VARCHAR(50) NOT NULL,      -- e.g., CREATE, UPDATE, DELETE, ACCEPT, DECLINE
    ip_address VARCHAR(45),           -- Support both IPv4 and IPv6
    user_agent VARCHAR(500),          -- Browser/user agent string
    details TEXT,                     -- Additional details about the action
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_audit_log_entity_id ON audit_log(entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity_type ON audit_log(entity_type);
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity_type_id ON audit_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at);

-- Create function to automatically update the created_at column (though it's default)
CREATE OR REPLACE FUNCTION update_audit_log_created_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for audit_log table
CREATE TRIGGER update_audit_log_created_at BEFORE UPDATE ON audit_log FOR EACH ROW EXECUTE FUNCTION update_audit_log_created_at_column();