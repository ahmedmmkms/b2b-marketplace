-- Migration for Task 4.4: Create roles and permissions tables with user-role and role-permission relationships
-- Implements role-based access control (RBAC)

DO $$
BEGIN
    -- Create permissions table if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'permissions' AND table_schema = 'public') THEN
        CREATE TABLE permissions (
            id VARCHAR(26) PRIMARY KEY, -- ULID
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            permission_name VARCHAR(100) NOT NULL UNIQUE,
            description VARCHAR(255),
            is_active BOOLEAN NOT NULL DEFAULT TRUE
        );
    END IF;
    
    -- Create roles table if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'roles' AND table_schema = 'public') THEN
        CREATE TABLE roles (
            id VARCHAR(26) PRIMARY KEY, -- ULID
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            role_name VARCHAR(100) NOT NULL UNIQUE,
            description VARCHAR(255),
            is_active BOOLEAN NOT NULL DEFAULT TRUE
        );
    END IF;
    
    -- Create user_roles junction table if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_roles' AND table_schema = 'public') THEN
        CREATE TABLE user_roles (
            id VARCHAR(26) PRIMARY KEY DEFAULT gen_random_ulid()::text,
            user_id VARCHAR(26) NOT NULL,
            role_id VARCHAR(26) NOT NULL,
            assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            assigned_by VARCHAR(26),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
            UNIQUE(user_id, role_id)
        );
    END IF;
    
    -- Create role_permissions junction table if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'role_permissions' AND table_schema = 'public') THEN
        CREATE TABLE role_permissions (
            id VARCHAR(26) PRIMARY KEY DEFAULT gen_random_ulid()::text,
            role_id VARCHAR(26) NOT NULL,
            permission_id VARCHAR(26) NOT NULL,
            assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            assigned_by VARCHAR(26),
            FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
            FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
            UNIQUE(role_id, permission_id)
        );
    END IF;

    -- Create indexes for better query performance (if they don't exist)
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_permissions_name') THEN
        CREATE INDEX idx_permissions_name ON permissions(permission_name);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_permissions_active') THEN
        CREATE INDEX idx_permissions_active ON permissions(is_active);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_roles_name') THEN
        CREATE INDEX idx_roles_name ON roles(role_name);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_roles_active') THEN
        CREATE INDEX idx_roles_active ON roles(is_active);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_roles_user_id') THEN
        CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_roles_role_id') THEN
        CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_role_permissions_role_id') THEN
        CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_role_permissions_permission_id') THEN
        CREATE INDEX idx_role_permissions_permission_id ON role_permissions(permission_id);
    END IF;

    -- Create triggers for permissions and roles tables (if they don't exist)
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_permissions_updated_at') THEN
        CREATE TRIGGER update_permissions_updated_at 
            BEFORE UPDATE ON permissions
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_roles_updated_at') THEN
        CREATE TRIGGER update_roles_updated_at 
            BEFORE UPDATE ON roles
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;