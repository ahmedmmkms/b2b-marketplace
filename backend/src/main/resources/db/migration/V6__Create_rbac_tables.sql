-- Migration for Task 4.4: Create roles and permissions tables with user-role and role-permission relationships
-- Implements role-based access control (RBAC)

-- Create permissions table
CREATE TABLE permissions (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    permission_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create roles table
CREATE TABLE roles (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create user_roles junction table for many-to-many relationship between users and roles
CREATE TABLE user_roles (
    user_id VARCHAR(26) NOT NULL,
    role_id VARCHAR(26) NOT NULL,
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assigned_by VARCHAR(26),
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Create role_permissions junction table for many-to-many relationship between roles and permissions
CREATE TABLE role_permissions (
    role_id VARCHAR(26) NOT NULL,
    permission_id VARCHAR(26) NOT NULL,
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assigned_by VARCHAR(26),
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_permissions_name ON permissions(permission_name);
CREATE INDEX idx_permissions_active ON permissions(is_active);

CREATE INDEX idx_roles_name ON roles(role_name);
CREATE INDEX idx_roles_active ON roles(is_active);

CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);

CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission_id ON role_permissions(permission_id);

-- Update the updated_at field automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for permissions and roles tables
CREATE TRIGGER update_permissions_updated_at BEFORE UPDATE ON permissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();