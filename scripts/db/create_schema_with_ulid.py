import psycopg2
import re

# Database credentials
DB_URL = "jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
DB_USERNAME = "neondb_owner"
DB_PASSWORD = "npg_QTE70VJgbcdp"

# Extract host, port, and database name from the JDBC URL
jdbc_match = re.match(r"jdbc:postgresql://([^:/]+)(?::(\d+))?/([^?]+)", DB_URL)
if jdbc_match:
    host = jdbc_match.group(1)
    port = jdbc_match.group(2) or "5432"
    database = jdbc_match.group(3).split('?')[0]
else:
    raise ValueError("Invalid JDBC URL format")

print(f"Creating schema in: {host}:{port}, database: {database}")

try:
    # Establish connection
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=DB_USERNAME,
        password=DB_PASSWORD
    )
    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    
    cursor = conn.cursor()
    
    # Install uuid-ossp extension if not already installed
    cursor.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
    print("Installed uuid-ossp extension")
    
    # Create a function to generate ULIDs if not available
    cursor.execute("""
    CREATE OR REPLACE FUNCTION gen_random_ulid()
    RETURNS VARCHAR(26) AS $$
    DECLARE
        timestamp BIGINT;
        randomness TEXT;
    BEGIN
        -- Get current Unix timestamp in milliseconds
        timestamp := (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT;
        
        -- Generate random string (10 bytes = 20 hex chars)
        randomness := MD5(RANDOM()::TEXT);
        
        -- Combine timestamp and randomness to form ULID
        -- Note: This is a simplified version of ULID format
        RETURN SUBSTRING(TO_HEX(timestamp), 1, 10) || UPPER(SUBSTRING(randomness, 1, 16));
    END;
    $$ LANGUAGE plpgsql;
    """)
    print("Created ULID generation function")
    
    # Create all tables as defined in the schema
    
    # Feature Flags table
    cursor.execute("""
    CREATE TABLE feature_flags (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        flag_name VARCHAR(255) NOT NULL UNIQUE,
        is_enabled BOOLEAN NOT NULL DEFAULT FALSE,
        description TEXT,
        created_by VARCHAR(255),
        updated_by VARCHAR(255)
    );
    """)
    print("Created table: feature_flags")
    
    # Accounts table
    cursor.execute("""
    CREATE TABLE accounts (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('INDIVIDUAL', 'COMPANY')),
        status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'CLOSED')),
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
    """)
    print("Created table: accounts")
    
    # Users table
    cursor.execute("""
    CREATE TABLE users (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        account_id VARCHAR(26) REFERENCES accounts(id),
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
        locked_until TIMESTAMP
    );
    """)
    print("Created table: users")
    
    # Permissions table
    cursor.execute("""
    CREATE TABLE permissions (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        permission_name VARCHAR(100) NOT NULL UNIQUE,
        description VARCHAR(255),
        is_active BOOLEAN NOT NULL DEFAULT TRUE
    );
    """)
    print("Created table: permissions")
    
    # Roles table
    cursor.execute("""
    CREATE TABLE roles (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        role_name VARCHAR(100) NOT NULL UNIQUE,
        description VARCHAR(255),
        is_active BOOLEAN NOT NULL DEFAULT TRUE
    );
    """)
    print("Created table: roles")
    
    # User Roles table
    cursor.execute("""
    CREATE TABLE user_roles (
        id VARCHAR(26) PRIMARY KEY DEFAULT gen_random_ulid(),
        user_id VARCHAR(26) REFERENCES users(id),
        role_id VARCHAR(26) REFERENCES roles(id),
        assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        assigned_by VARCHAR(26),
        UNIQUE (user_id, role_id)
    );
    """)
    print("Created table: user_roles")
    
    # Role Permissions table
    cursor.execute("""
    CREATE TABLE role_permissions (
        id VARCHAR(26) PRIMARY KEY DEFAULT gen_random_ulid(),
        role_id VARCHAR(26) REFERENCES roles(id),
        permission_id VARCHAR(26) REFERENCES permissions(id),
        assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        assigned_by VARCHAR(26),
        UNIQUE (role_id, permission_id)
    );
    """)
    print("Created table: role_permissions")
    
    # Vendors table
    cursor.execute("""
    CREATE TABLE vendors (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        business_name VARCHAR(255) NOT NULL,
        description TEXT,
        email VARCHAR(255),
        phone VARCHAR(50),
        address JSONB,
        tax_id VARCHAR(100),
        vendor_status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (vendor_status IN ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED', 'CLOSED')),
        approval_date DATE,
        business_license_no VARCHAR(100),
        registration_date DATE,
        kyc_verified BOOLEAN NOT NULL DEFAULT FALSE,
        kyc_verified_at DATE,
        kyc_verified_by VARCHAR(255)
    );
    """)
    print("Created table: vendors")
    
    # Product Attributes table
    cursor.execute("""
    CREATE TABLE product_attributes (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255) NOT NULL,
        display_name VARCHAR(255) NOT NULL,
        description TEXT,
        attribute_type VARCHAR(50) NOT NULL CHECK (attribute_type IN ('TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'SELECT', 'MULTI_SELECT')),
        is_required BOOLEAN DEFAULT FALSE,
        is_searchable BOOLEAN DEFAULT FALSE,
        is_filterable BOOLEAN DEFAULT FALSE,
        sort_order INTEGER DEFAULT 0,
        validation_rules JSONB
    );
    """)
    print("Created table: product_attributes")
    
    # Product Attribute Values table
    cursor.execute("""
    CREATE TABLE product_attribute_values (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        product_attribute_id VARCHAR(26) REFERENCES product_attributes(id),
        value TEXT NOT NULL,
        display_value TEXT,
        is_default BOOLEAN DEFAULT FALSE,
        sort_order INTEGER DEFAULT 0
    );
    """)
    print("Created table: product_attribute_values")
    
    # Media Assets table
    cursor.execute("""
    CREATE TABLE media_assets (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255) NOT NULL,
        original_filename VARCHAR(255) NOT NULL,
        storage_path VARCHAR(1000) NOT NULL,
        content_type VARCHAR(100),
        file_size BIGINT,
        alt_text VARCHAR(255),
        title VARCHAR(255),
        caption TEXT,
        media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('IMAGE', 'VIDEO', 'DOCUMENT', 'OTHER')),
        status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'DELETED')),
        is_primary BOOLEAN DEFAULT FALSE,
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)
    print("Created table: media_assets")
    
    # Products table
    cursor.execute("""
    CREATE TABLE products (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255),
        description TEXT,
        short_description VARCHAR(500),
        sku VARCHAR(100) UNIQUE,
        upc VARCHAR(50),
        gtin VARCHAR(50),
        mpn VARCHAR(100),
        brand VARCHAR(100),
        category_id VARCHAR(26),
        vendor_id VARCHAR(26) REFERENCES vendors(id),
        product_status VARCHAR(20) DEFAULT 'DRAFT' CHECK (product_status IN ('DRAFT', 'ACTIVE', 'INACTIVE', 'DISCONTINUED')),
        price_amount DECIMAL(19,4),
        price_currency VARCHAR(3) DEFAULT 'USD',
        tax_class VARCHAR(50),
        meta_title VARCHAR(255),
        meta_description VARCHAR(500),
        meta_keywords TEXT,
        weight DECIMAL(10,3),
        dimensions JSONB,
        packaging_info JSONB,
        min_order_quantity INTEGER DEFAULT 1,
        moq INTEGER,
        inventory_tracking BOOLEAN DEFAULT FALSE,
        stock_quantity INTEGER DEFAULT 0,
        inventory_status VARCHAR(20) DEFAULT 'IN_STOCK' CHECK (inventory_status IN ('IN_STOCK', 'OUT_OF_STOCK', 'BACKORDER', 'DISCONTINUED')),
        is_active BOOLEAN DEFAULT TRUE,
        dimensions_length DECIMAL(10,3),
        dimensions_width DECIMAL(10,3),
        dimensions_height DECIMAL(10,3)
    );
    """)
    print("Created table: products")
    
    # Product Media table
    cursor.execute("""
    CREATE TABLE product_media (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        product_id VARCHAR(26) REFERENCES products(id),
        media_asset_id VARCHAR(26) REFERENCES media_assets(id),
        display_order INTEGER DEFAULT 0,
        is_primary BOOLEAN DEFAULT FALSE,
        alt_text_override TEXT,
        UNIQUE (product_id, media_asset_id)
    );
    """)
    print("Created table: product_media")
    
    # RFQs table
    cursor.execute("""
    CREATE TABLE rfqs (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        account_id VARCHAR(26) REFERENCES accounts(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        rfq_status VARCHAR(20) DEFAULT 'DRAFT' CHECK (rfq_status IN ('DRAFT', 'OPEN', 'CLOSED', 'EXPIRED')),
        expiry_date TIMESTAMP,
        currency VARCHAR(3) DEFAULT 'USD',
        is_public BOOLEAN DEFAULT FALSE,
        contact_person VARCHAR(255) NOT NULL,
        contact_email VARCHAR(255) NOT NULL,
        tax_included BOOLEAN DEFAULT FALSE,
        created_by VARCHAR(255) NOT NULL
    );
    """)
    print("Created table: rfqs")
    
    # RFQ Lines table
    cursor.execute("""
    CREATE TABLE rfq_lines (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        rfq_id VARCHAR(26) REFERENCES rfqs(id),
        product_id VARCHAR(26) REFERENCES products(id),
        product_name VARCHAR(255) NOT NULL,
        description TEXT,
        quantity INTEGER NOT NULL,
        unit_of_measure VARCHAR(20) DEFAULT 'EA',
        required_by TIMESTAMP,
        product_specifications TEXT,
        brand_preference VARCHAR(255),
        quality_requirements TEXT
    );
    """)
    print("Created table: rfq_lines")
    
    # Quotes table
    cursor.execute("""
    CREATE TABLE quotes (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        rfq_id VARCHAR(26) REFERENCES rfqs(id),
        vendor_id VARCHAR(26) REFERENCES vendors(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        quote_status VARCHAR(20) DEFAULT 'DRAFT' CHECK (quote_status IN ('DRAFT', 'SUBMITTED', 'ACCEPTED', 'REJECTED', 'EXPIRED')),
        total_amount DECIMAL(19,4),
        currency VARCHAR(3) DEFAULT 'USD',
        validity_days INTEGER DEFAULT 30,
        expiry_date TIMESTAMP,
        accepted_at TIMESTAMP,
        quoted_by VARCHAR(255) NOT NULL,
        quote_number VARCHAR(255) NOT NULL UNIQUE,
        valid_until TIMESTAMP NOT NULL,
        freight_included BOOLEAN DEFAULT FALSE,
        tax_included BOOLEAN DEFAULT FALSE
    );
    """)
    print("Created table: quotes")
    
    # Quote Lines table
    cursor.execute("""
    CREATE TABLE quote_lines (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        quote_id VARCHAR(26) REFERENCES quotes(id),
        rfq_line_id VARCHAR(26) REFERENCES rfq_lines(id),
        product_id VARCHAR(26) REFERENCES products(id),
        product_name VARCHAR(255) NOT NULL,
        description TEXT,
        unit_price DECIMAL(19,4) NOT NULL,
        quantity INTEGER NOT NULL,
        line_total DECIMAL(19,4) NOT NULL,
        moq INTEGER DEFAULT 1
    );
    """)
    print("Created table: quote_lines")
    
    # Orders table
    cursor.execute("""
    CREATE TABLE orders (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        account_id VARCHAR(26) REFERENCES accounts(id),
        quote_id VARCHAR(26) REFERENCES quotes(id),
        po_number VARCHAR(100),
        order_status VARCHAR(30) DEFAULT 'PENDING' CHECK (order_status IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED')),
        currency VARCHAR(3) DEFAULT 'USD',
        subtotal DECIMAL(19,4),
        tax_amount DECIMAL(19,4),
        shipping_amount DECIMAL(19,4),
        discount_amount DECIMAL(19,4),
        total_amount DECIMAL(19,4),
        billing_address JSONB,
        shipping_address JSONB,
        notes TEXT
    );
    """)
    print("Created table: orders")
    
    # Order Lines table
    cursor.execute("""
    CREATE TABLE order_lines (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        order_id VARCHAR(26) REFERENCES orders(id),
        product_id VARCHAR(26) REFERENCES products(id),
        product_name VARCHAR(255) NOT NULL,
        description TEXT,
        unit_price DECIMAL(19,4) NOT NULL,
        quantity INTEGER NOT NULL,
        total_price DECIMAL(19,4) GENERATED ALWAYS AS (unit_price * quantity) STORED
    );
    """)
    print("Created table: order_lines")
    
    # Payments table
    cursor.execute("""
    CREATE TABLE payments (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        order_id VARCHAR(26) REFERENCES orders(id),
        payment_method VARCHAR(50) NOT NULL,
        amount DECIMAL(19,4) NOT NULL,
        currency VARCHAR(3) DEFAULT 'USD',
        payment_status VARCHAR(20) DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED', 'CANCELLED')),
        transaction_id VARCHAR(255),
        provider VARCHAR(50),
        provider_response JSONB,
        captured_at TIMESTAMP
    );
    """)
    print("Created table: payments")
    
    # Wallets table
    cursor.execute("""
    CREATE TABLE wallets (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        account_id VARCHAR(26) REFERENCES accounts(id),
        name VARCHAR(255) NOT NULL,
        balance DECIMAL(19,4) DEFAULT 0.0000,
        currency VARCHAR(3) DEFAULT 'USD',
        wallet_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (wallet_status IN ('ACTIVE', 'SUSPENDED', 'CLOSED'))
    );
    """)
    print("Created table: wallets")
    
    # Wallet Transactions table
    cursor.execute("""
    CREATE TABLE wallet_transactions (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        wallet_id VARCHAR(26) REFERENCES wallets(id),
        transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('CREDIT', 'DEBIT')),
        amount DECIMAL(19,4) NOT NULL,
        reference_type VARCHAR(50) NOT NULL,
        reference_id VARCHAR(26),
        description TEXT,
        balance_after DECIMAL(19,4)
    );
    """)
    print("Created table: wallet_transactions")
    
    # Credit Limits table
    cursor.execute("""
    CREATE TABLE credit_limits (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        account_id VARCHAR(26) REFERENCES accounts(id),
        currency VARCHAR(3) DEFAULT 'USD',
        limit_amount DECIMAL(19,4) NOT NULL,
        available_amount DECIMAL(19,4) NOT NULL,
        used_amount DECIMAL(19,4) DEFAULT 0.0000,
        credit_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (credit_status IN ('ACTIVE', 'SUSPENDED', 'EXCEEDED')),
        approved_date DATE,
        approved_by VARCHAR(26),
        notes TEXT
    );
    """)
    print("Created table: credit_limits")
    
    # Tax Registrations table
    cursor.execute("""
    CREATE TABLE tax_registrations (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        legal_name VARCHAR(255) NOT NULL,
        tax_number VARCHAR(100) NOT NULL,
        address JSONB NOT NULL,
        is_active BOOLEAN DEFAULT TRUE
    );
    """)
    print("Created table: tax_registrations")
    
    # Sequence Registry table
    cursor.execute("""
    CREATE TABLE sequence_registry (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        tax_reg_id VARCHAR(26) REFERENCES tax_registrations(id),
        sequence_type VARCHAR(20) NOT NULL CHECK (sequence_type IN ('INVOICE', 'CREDIT_NOTE')),
        prefix VARCHAR(20) NOT NULL,
        current_value INTEGER NOT NULL DEFAULT 0,
        next_value INTEGER NOT NULL DEFAULT 1,
        year INTEGER NOT NULL,
        UNIQUE (tax_reg_id, sequence_type, year)
    );
    """)
    print("Created table: sequence_registry")
    
    # Invoices table
    cursor.execute("""
    CREATE TABLE invoices (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        tax_reg_id VARCHAR(26) REFERENCES tax_registrations(id),
        sequence_number INTEGER NOT NULL,
        full_number VARCHAR(100) UNIQUE,
        order_id VARCHAR(26) REFERENCES orders(id),
        issued_date DATE DEFAULT CURRENT_DATE,
        due_date DATE NOT NULL,
        currency VARCHAR(3) DEFAULT 'USD',
        subtotal DECIMAL(19,4),
        discount_amount DECIMAL(19,4),
        vat_amount DECIMAL(19,4),
        total_amount DECIMAL(19,4),
        invoice_status VARCHAR(20) DEFAULT 'DRAFT' CHECK (invoice_status IN ('DRAFT', 'ISSUED', 'PAID', 'OVERDUE', 'CANCELLED')),
        customer_name VARCHAR(255) NOT NULL,
        customer_tax_number VARCHAR(100),
        customer_address JSONB,
        notes TEXT
    );
    """)
    print("Created table: invoices")
    
    # Invoice Lines table
    cursor.execute("""
    CREATE TABLE invoice_lines (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        invoice_id VARCHAR(26) REFERENCES invoices(id),
        order_line_id VARCHAR(26) REFERENCES order_lines(id),
        product_name VARCHAR(255) NOT NULL,
        description TEXT,
        unit_price DECIMAL(19,4) NOT NULL,
        quantity INTEGER NOT NULL,
        vat_rate DECIMAL(5,2) NOT NULL,
        vat_amount DECIMAL(19,4) GENERATED ALWAYS AS ((unit_price * quantity * vat_rate) / 100) STORED,
        total_amount DECIMAL(19,4) GENERATED ALWAYS AS ((unit_price * quantity) + vat_amount) STORED
    );
    """)
    print("Created table: invoice_lines")
    
    # Credit Notes table
    cursor.execute("""
    CREATE TABLE credit_notes (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        tax_reg_id VARCHAR(26) REFERENCES tax_registrations(id),
        sequence_number INTEGER NOT NULL,
        full_number VARCHAR(100) UNIQUE,
        invoice_id VARCHAR(26) REFERENCES invoices(id),
        issued_date DATE DEFAULT CURRENT_DATE,
        reason VARCHAR(50) NOT NULL CHECK (reason IN ('RETURN', 'CANCELLED_ORDER', 'DISCOUNT', 'ERROR', 'OTHER')),
        reason_details TEXT,
        currency VARCHAR(3) DEFAULT 'USD',
        subtotal DECIMAL(19,4),
        vat_amount DECIMAL(19,4),
        total_amount DECIMAL(19,4),
        credit_status VARCHAR(20) DEFAULT 'DRAFT' CHECK (credit_status IN ('DRAFT', 'ISSUED', 'APPLIED', 'CANCELLED'))
    );
    """)
    print("Created table: credit_notes")
    
    # Credit Note Lines table
    cursor.execute("""
    CREATE TABLE credit_note_lines (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        credit_note_id VARCHAR(26) REFERENCES credit_notes(id),
        invoice_line_id VARCHAR(26) REFERENCES invoice_lines(id),
        quantity INTEGER NOT NULL,
        unit_price DECIMAL(19,4) NOT NULL,
        vat_rate DECIMAL(5,2) NOT NULL,
        vat_amount DECIMAL(19,4) GENERATED ALWAYS AS ((unit_price * quantity * vat_rate) / 100) STORED,
        total_amount DECIMAL(19,4) GENERATED ALWAYS AS ((unit_price * quantity) + vat_amount) STORED
    );
    """)
    print("Created table: credit_note_lines")
    
    # Loyalty Programs table
    cursor.execute("""
    CREATE TABLE loyalty_programs (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        start_date DATE NOT NULL,
        end_date DATE,
        program_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (program_status IN ('DRAFT', 'ACTIVE', 'SUSPENDED', 'COMPLETED', 'CANCELLED')),
        point_ratio DECIMAL(5,2) DEFAULT 1.00,
        max_points_per_transaction DECIMAL(10,2)
    );
    """)
    print("Created table: loyalty_programs")
    
    # Tiers table
    cursor.execute("""
    CREATE TABLE tiers (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        loyalty_program_id VARCHAR(26) REFERENCES loyalty_programs(id),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        min_points_required INTEGER DEFAULT 0,
        discount_percentage DECIMAL(5,2) DEFAULT 0.00,
        priority_support BOOLEAN DEFAULT FALSE
    );
    """)
    print("Created table: tiers")
    
    # Account Tiers table
    cursor.execute("""
    CREATE TABLE account_tiers (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        account_id VARCHAR(26) REFERENCES accounts(id),
        tier_id VARCHAR(26) REFERENCES tiers(id),
        start_date DATE DEFAULT CURRENT_DATE,
        end_date DATE,
        membership_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (membership_status IN ('ACTIVE', 'EXPIRED', 'REVOKED'))
    );
    """)
    print("Created table: account_tiers")
    
    # Rewards table
    cursor.execute("""
    CREATE TABLE rewards (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        loyalty_program_id VARCHAR(26) REFERENCES loyalty_programs(id),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        points_required INTEGER NOT NULL,
        redemption_limit INTEGER,
        remaining_redemptions INTEGER,
        reward_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (reward_status IN ('DRAFT', 'ACTIVE', 'SUSPENDED', 'EXPIRED'))
    );
    """)
    print("Created table: rewards")
    
    # Loyalty Transactions table
    cursor.execute("""
    CREATE TABLE loyalty_transactions (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        account_id VARCHAR(26) REFERENCES accounts(id),
        txn_type VARCHAR(20) NOT NULL CHECK (txn_type IN ('EARN', 'BURN', 'ADJUST')),
        points DECIMAL(10,2) NOT NULL,
        reference_type VARCHAR(50),
        reference_id VARCHAR(26),
        balance_after DECIMAL(10,2),
        description TEXT
    );
    """)
    print("Created table: loyalty_transactions")
    
    # Audit Log table
    cursor.execute("""
    CREATE TABLE audit_log (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id VARCHAR(26),
        action VARCHAR(100) NOT NULL,
        resource_type VARCHAR(50) NOT NULL,
        resource_id VARCHAR(26),
        old_values JSONB,
        new_values JSONB,
        metadata JSONB,
        entity_id VARCHAR(255) NOT NULL,
        entity_type VARCHAR(50) NOT NULL
    );
    """)
    print("Created table: audit_log")
    
    # Idempotency Keys table
    cursor.execute("""
    CREATE TABLE idempotency_keys (
        id VARCHAR(26) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        key_value VARCHAR(255) NOT NULL UNIQUE,
        request_method VARCHAR(10) NOT NULL,
        request_path TEXT NOT NULL,
        request_body TEXT,
        response_status INTEGER,
        response_body TEXT,
        expires_at TIMESTAMP NOT NULL
    );
    """)
    print("Created table: idempotency_keys")
    
    print("All tables created successfully!")
    
    # Close connections
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"Error creating schema: {str(e)}")