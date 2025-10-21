#!/usr/bin/env python3
"""
Complete Database Reset Script for P4 B2B Marketplace (Production Version)

This script:
1. Drops all existing tables in the database
2. Recreates the complete schema from scratch
3. Seeds the database with significant amounts of realistic data

WARNING: This will completely delete all existing data in the database.
"""

import psycopg2
import os
from datetime import datetime, date, timedelta
import json
import uuid
import random
from faker import Faker

fake = Faker()

def generate_ulid():
    """Generate a ULID string for database entities."""
    # This is a simplified ULID generator for demonstration purposes
    # In production, you would use the proper ULID algorithm
    return str(uuid.uuid4()).replace('-', '')[:26].upper()

def connect_to_db():
    """Establish connection to the database using environment variables."""
    db_url = os.getenv('DB_URL')
    if not db_url:
        # Use default values for local development
        print("DB_URL not found, using default development settings...")
        conn = psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_NAME', 'p4_dev'),
            user=os.getenv('DB_USERNAME', 'postgres'),
            password=os.getenv('DB_PASSWORD', 'password'),
            port=os.getenv('DB_PORT', '5432')
        )
    else:
        # Parse the JDBC DB_URL format
        import re
        # Handle JDBC format: jdbc:postgresql://host:port/database?params
        jdbc_pattern = r"jdbc:postgresql://([^:/]+):?(\d*)/([^?]+)\?(.*)"
        match = re.match(jdbc_pattern, db_url)
        if match:
            host, port, db_name, params = match.groups()
            if not port:
                port = '5432'  # Default PostgreSQL port
            
            # Extract user and password from environment variables since JDBC URL doesn't typically include them
            user = os.getenv('DB_USERNAME')
            password = os.getenv('DB_PASSWORD')
            
            if not user or not password:
                raise ValueError("DB_USERNAME and DB_PASSWORD must be set in environment variables when using JDBC URL")
            
            conn = psycopg2.connect(
                host=host,
                port=port,
                database=db_name,
                user=user,
                password=password,
                sslmode='require'
            )
        else:
            # Try standard PostgreSQL format as fallback
            standard_pattern = r"postgresql://([^:]+):([^@]+)@([^:]+):(\d+)/([^?]+)"
            match = re.match(standard_pattern, db_url.replace("jdbc:", ""))
            if match:
                user, password, host, port, db_name = match.groups()
                conn = psycopg2.connect(
                    host=host,
                    port=port,
                    database=db_name,
                    user=user,
                    password=password
                )
            else:
                raise ValueError("Invalid DB_URL format")
    
    return conn

def drop_all_tables(conn):
    """Drop all tables in the database."""
    print("Dropping all existing tables...")
    
    with conn.cursor() as cur:
        # Get all table names
        cur.execute("""
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname = 'public';
        """)
        tables = cur.fetchall()
        
        # Drop all tables one by one to handle dependencies properly
        for table in tables:
            table_name = table[0]
            if table_name != 'flyway_schema_history':  # Don't drop Flyway's history table
                print(f"Dropping table: {table_name}")
                try:
                    cur.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE;")
                    conn.commit()  # Commit each drop to avoid transaction issues
                except psycopg2.Error as e:
                    print(f"Error dropping table {table_name}: {e}")
                    conn.rollback()
                    continue
        
        print(f"Dropped {len([t for t in tables if t[0] != 'flyway_schema_history'])} tables.")

def create_complete_schema(conn):
    """Create the complete database schema from scratch."""
    print("Creating complete database schema...")
    
    with conn.cursor() as cur:
        # Create functions
        cur.execute("""
        CREATE OR REPLACE FUNCTION public.update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        """)
        
        # Feature Flags Table
        cur.execute("""
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
        
        # Accounts Table
        cur.execute("""
        CREATE TABLE accounts (
            id VARCHAR(26) PRIMARY KEY,
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
        """)
        
        # Users Table
        cur.execute("""
        CREATE TABLE users (
            id VARCHAR(26) PRIMARY KEY,
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
        """)
        
        # Permissions Table
        cur.execute("""
        CREATE TABLE permissions (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            permission_name VARCHAR(100) NOT NULL UNIQUE,
            description VARCHAR(255),
            is_active BOOLEAN NOT NULL DEFAULT TRUE
        );
        """)
        
        # Roles Table
        cur.execute("""
        CREATE TABLE roles (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            role_name VARCHAR(100) NOT NULL UNIQUE,
            description VARCHAR(255),
            is_active BOOLEAN NOT NULL DEFAULT TRUE
        );
        """)
        
        # User Roles Junction Table - Fixed to not use gen_random_ulid
        cur.execute("""
        CREATE TABLE user_roles (
            id VARCHAR(26) PRIMARY KEY,
            user_id VARCHAR(26) NOT NULL,
            role_id VARCHAR(26) NOT NULL,
            assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            assigned_by VARCHAR(26),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
            UNIQUE(user_id, role_id)
        );
        """)
        
        # Role Permissions Junction Table - Fixed to not use gen_random_ulid
        cur.execute("""
        CREATE TABLE role_permissions (
            id VARCHAR(26) PRIMARY KEY,
            role_id VARCHAR(26) NOT NULL,
            permission_id VARCHAR(26) NOT NULL,
            assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            assigned_by VARCHAR(26),
            FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
            FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
            UNIQUE(role_id, permission_id)
        );
        """)
        
        # Vendors Table
        cur.execute("""
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
            vendor_status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED, SUSPENDED, CLOSED
            approval_date DATE,
            business_license_no VARCHAR(100),
            registration_date DATE,
            kyc_verified BOOLEAN NOT NULL DEFAULT FALSE,
            kyc_verified_at DATE,
            kyc_verified_by VARCHAR(255)
        );
        """)
        
        # Product Attributes Table
        cur.execute("""
        CREATE TABLE product_attributes (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            name VARCHAR(255) NOT NULL,
            display_name VARCHAR(255) NOT NULL,
            description TEXT,
            attribute_type VARCHAR(50) NOT NULL, -- TEXT, NUMBER, BOOLEAN, DATE, SELECT, MULTI_SELECT
            is_required BOOLEAN DEFAULT FALSE,
            is_searchable BOOLEAN DEFAULT FALSE,
            is_filterable BOOLEAN DEFAULT FALSE,
            sort_order INTEGER DEFAULT 0,
            validation_rules JSONB
        );
        """)
        
        # Product Attribute Values Table
        cur.execute("""
        CREATE TABLE product_attribute_values (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            product_attribute_id VARCHAR(26) NOT NULL,
            value TEXT NOT NULL,
            display_value TEXT,
            is_default BOOLEAN DEFAULT FALSE,
            sort_order INTEGER DEFAULT 0,
            
            FOREIGN KEY (product_attribute_id) REFERENCES product_attributes(id) ON DELETE CASCADE
        );
        """)
        
        # Media Assets Table
        cur.execute("""
        CREATE TABLE media_assets (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            name VARCHAR(255) NOT NULL,
            original_filename VARCHAR(255) NOT NULL,
            storage_path VARCHAR(1000) NOT NULL,
            content_type VARCHAR(100), -- MIME type
            file_size BIGINT,
            alt_text VARCHAR(255),
            title VARCHAR(255),
            caption TEXT,
            media_type VARCHAR(20) NOT NULL, -- IMAGE, VIDEO, DOCUMENT, OTHER
            status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, DELETED
            is_primary BOOLEAN DEFAULT FALSE,
            upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        
        # Products Table
        cur.execute("""
        CREATE TABLE products (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            name VARCHAR(255) NOT NULL,
            slug VARCHAR(255) UNIQUE,
            description TEXT,
            short_description VARCHAR(500),
            sku VARCHAR(100) UNIQUE,
            upc VARCHAR(50),
            gtin VARCHAR(50),
            mpn VARCHAR(100),
            brand VARCHAR(100),
            category_id VARCHAR(26),
            vendor_id VARCHAR(26) NOT NULL,
            
            product_status VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, ACTIVE, INACTIVE, DISCONTINUED
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
            inventory_status VARCHAR(20) DEFAULT 'IN_STOCK', -- IN_STOCK, OUT_OF_STOCK, BACKORDER, DISCONTINUED
            
            is_active BOOLEAN DEFAULT TRUE,
            
            -- Dimensions separated for better indexing and queries
            dimensions_length DECIMAL(10,3),
            dimensions_width DECIMAL(10,3),
            dimensions_height DECIMAL(10,3),
            
            FOREIGN KEY (vendor_id) REFERENCES vendors(id)
        );
        """)
        
        # Product Media Junction Table
        cur.execute("""
        CREATE TABLE product_media (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            product_id VARCHAR(26) NOT NULL,
            media_asset_id VARCHAR(26) NOT NULL,
            display_order INTEGER DEFAULT 0,
            is_primary BOOLEAN DEFAULT FALSE,
            alt_text_override TEXT,
            
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE CASCADE,
            UNIQUE(product_id, media_asset_id)
        );
        """)
        
        # RFQ Table
        cur.execute("""
        CREATE TABLE rfqs (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            account_id VARCHAR(26) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            rfq_status VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, OPEN, CLOSED, EXPIRED
            expiry_date TIMESTAMP,
            currency VARCHAR(3) DEFAULT 'USD',
            is_public BOOLEAN DEFAULT FALSE,
            
            contact_person VARCHAR(255) NOT NULL,
            contact_email VARCHAR(255) NOT NULL,
            tax_included BOOLEAN DEFAULT FALSE,
            created_by VARCHAR(255) NOT NULL,
            
            FOREIGN KEY (account_id) REFERENCES accounts(id)
        );
        """)
        
        # RFQ Lines Table
        cur.execute("""
        CREATE TABLE rfq_lines (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            rfq_id VARCHAR(26) NOT NULL,
            product_id VARCHAR(26),
            product_name VARCHAR(255) NOT NULL,
            description TEXT,
            quantity INTEGER NOT NULL,
            unit_of_measure VARCHAR(20) DEFAULT 'EA',
            required_by TIMESTAMP,
            
            -- Additional fields for specific requirements
            product_specifications TEXT,
            brand_preference VARCHAR(255),
            quality_requirements TEXT,
            
            FOREIGN KEY (rfq_id) REFERENCES rfqs(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id)
        );
        """)
        
        # Quotes Table
        cur.execute("""
        CREATE TABLE quotes (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            rfq_id VARCHAR(26) NOT NULL,
            vendor_id VARCHAR(26) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            quote_status VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, SUBMITTED, ACCEPTED, REJECTED, EXPIRED
            total_amount DECIMAL(19,4),
            currency VARCHAR(3) DEFAULT 'USD',
            validity_days INTEGER DEFAULT 30,
            expiry_date TIMESTAMP,
            accepted_at TIMESTAMP,
            
            quoted_by VARCHAR(255) NOT NULL,
            quote_number VARCHAR(255) NOT NULL UNIQUE,
            valid_until TIMESTAMP NOT NULL,
            freight_included BOOLEAN DEFAULT FALSE,
            tax_included BOOLEAN DEFAULT FALSE,
            
            FOREIGN KEY (rfq_id) REFERENCES rfqs(id),
            FOREIGN KEY (vendor_id) REFERENCES vendors(id)
        );
        """)
        
        # Quote Lines Table
        cur.execute("""
        CREATE TABLE quote_lines (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            quote_id VARCHAR(26) NOT NULL,
            rfq_line_id VARCHAR(26) NOT NULL,
            product_id VARCHAR(26),
            product_name VARCHAR(255) NOT NULL,
            description TEXT,
            unit_price DECIMAL(19,4) NOT NULL,
            quantity INTEGER NOT NULL,
            line_total DECIMAL(19,4) NOT NULL,
            moq INTEGER DEFAULT 1,
            
            FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE,
            FOREIGN KEY (rfq_line_id) REFERENCES rfq_lines(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        );
        """)
        
        # Orders Table
        cur.execute("""
        CREATE TABLE orders (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            account_id VARCHAR(26) NOT NULL,
            quote_id VARCHAR(26),
            po_number VARCHAR(100),
            order_status VARCHAR(30) DEFAULT 'PENDING', -- PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, RETURNED
            currency VARCHAR(3) DEFAULT 'USD',
            subtotal DECIMAL(19,4),
            tax_amount DECIMAL(19,4),
            shipping_amount DECIMAL(19,4),
            discount_amount DECIMAL(19,4),
            total_amount DECIMAL(19,4),
            billing_address JSONB,
            shipping_address JSONB,
            notes TEXT,
            
            FOREIGN KEY (account_id) REFERENCES accounts(id),
            FOREIGN KEY (quote_id) REFERENCES quotes(id)
        );
        """)
        
        # Order Lines Table
        cur.execute("""
        CREATE TABLE order_lines (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            order_id VARCHAR(26) NOT NULL,
            product_id VARCHAR(26),
            product_name VARCHAR(255) NOT NULL,
            description TEXT,
            unit_price DECIMAL(19,4) NOT NULL,
            quantity INTEGER NOT NULL,
            total_price DECIMAL(19,4) GENERATED ALWAYS AS (unit_price * quantity) STORED,
            
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id)
        );
        """)
        
        # Payments Table
        cur.execute("""
        CREATE TABLE payments (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            order_id VARCHAR(26) NOT NULL,
            payment_method VARCHAR(50) NOT NULL,
            amount DECIMAL(19,4) NOT NULL,
            currency VARCHAR(3) DEFAULT 'USD',
            payment_status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, AUTHORIZED, CAPTURED, FAILED, REFUNDED, CANCELLED
            transaction_id VARCHAR(255),
            provider VARCHAR(50),
            provider_response JSONB,
            captured_at TIMESTAMP,
            
            FOREIGN KEY (order_id) REFERENCES orders(id)
        );
        """)
        
        # Wallets Table
        cur.execute("""
        CREATE TABLE wallets (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            account_id VARCHAR(26) NOT NULL,
            name VARCHAR(255) NOT NULL,
            balance DECIMAL(19,4) DEFAULT 0.0000,
            currency VARCHAR(3) DEFAULT 'USD',
            wallet_status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, SUSPENDED, CLOSED
            
            FOREIGN KEY (account_id) REFERENCES accounts(id)
        );
        """)
        
        # Wallet Transactions Table
        cur.execute("""
        CREATE TABLE wallet_transactions (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            wallet_id VARCHAR(26) NOT NULL,
            transaction_type VARCHAR(20) NOT NULL, -- CREDIT, DEBIT
            amount DECIMAL(19,4) NOT NULL,
            reference_type VARCHAR(50) NOT NULL,
            reference_id VARCHAR(26),
            description TEXT,
            balance_after DECIMAL(19,4),
            
            FOREIGN KEY (wallet_id) REFERENCES wallets(id)
        );
        """)
        
        # Credit Limits Table
        cur.execute("""
        CREATE TABLE credit_limits (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            account_id VARCHAR(26) NOT NULL,
            currency VARCHAR(3) DEFAULT 'USD',
            limit_amount DECIMAL(19,4) NOT NULL,
            available_amount DECIMAL(19,4) NOT NULL,
            used_amount DECIMAL(19,4) DEFAULT 0.0000,
            credit_status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, SUSPENDED, EXCEEDED
            approved_date DATE,
            approved_by VARCHAR(26),
            notes TEXT,
            
            FOREIGN KEY (account_id) REFERENCES accounts(id)
        );
        """)
        
        # Tax Registrations Table
        cur.execute("""
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
        
        # Sequence Registry Table
        cur.execute("""
        CREATE TABLE sequence_registry (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            tax_reg_id VARCHAR(26) NOT NULL,
            sequence_type VARCHAR(20) NOT NULL, -- INVOICE, CREDIT_NOTE
            prefix VARCHAR(20) NOT NULL,
            current_value INTEGER NOT NULL DEFAULT 0,
            next_value INTEGER NOT NULL DEFAULT 1,
            year INTEGER NOT NULL,
            
            FOREIGN KEY (tax_reg_id) REFERENCES tax_registrations(id),
            UNIQUE(tax_reg_id, sequence_type, year)
        );
        """)
        
        # Invoices Table
        cur.execute("""
        CREATE TABLE invoices (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            tax_reg_id VARCHAR(26) NOT NULL,
            sequence_number INTEGER NOT NULL,
            full_number VARCHAR(100) UNIQUE,
            order_id VARCHAR(26) NOT NULL,
            issued_date DATE DEFAULT CURRENT_DATE,
            due_date DATE NOT NULL,
            currency VARCHAR(3) DEFAULT 'USD',
            subtotal DECIMAL(19,4),
            discount_amount DECIMAL(19,4),
            vat_amount DECIMAL(19,4),
            total_amount DECIMAL(19,4),
            invoice_status VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, ISSUED, PAID, OVERDUE, CANCELLED
            
            customer_name VARCHAR(255) NOT NULL,
            customer_tax_number VARCHAR(100),
            customer_address JSONB,
            notes TEXT,
            
            FOREIGN KEY (tax_reg_id) REFERENCES tax_registrations(id),
            FOREIGN KEY (order_id) REFERENCES orders(id)
        );
        """)
        
        # Invoice Lines Table
        cur.execute("""
        CREATE TABLE invoice_lines (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            invoice_id VARCHAR(26) NOT NULL,
            order_line_id VARCHAR(26) NOT NULL,
            product_name VARCHAR(255) NOT NULL,
            description TEXT,
            unit_price DECIMAL(19,4) NOT NULL,
            quantity INTEGER NOT NULL,
            vat_rate DECIMAL(5,2) NOT NULL,
            vat_amount DECIMAL(19,4) GENERATED ALWAYS AS (ROUND(((unit_price * quantity) * vat_rate) / 100, 4)) STORED,
            total_amount DECIMAL(19,4) GENERATED ALWAYS AS (ROUND((unit_price * quantity) + (((unit_price * quantity) * vat_rate) / 100), 4)) STORED,
            
            FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
            FOREIGN KEY (order_line_id) REFERENCES order_lines(id)
        );
        """)
        
        # Credit Notes Table
        cur.execute("""
        CREATE TABLE credit_notes (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            tax_reg_id VARCHAR(26) NOT NULL,
            sequence_number INTEGER NOT NULL,
            full_number VARCHAR(100) UNIQUE,
            invoice_id VARCHAR(26) NOT NULL,
            issued_date DATE DEFAULT CURRENT_DATE,
            reason VARCHAR(50) NOT NULL, -- RETURN, CANCELLED_ORDER, DISCOUNT, ERROR, OTHER
            reason_details TEXT,
            currency VARCHAR(3) DEFAULT 'USD',
            subtotal DECIMAL(19,4),
            vat_amount DECIMAL(19,4),
            total_amount DECIMAL(19,4),
            credit_status VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, ISSUED, APPLIED, CANCELLED
            
            FOREIGN KEY (tax_reg_id) REFERENCES tax_registrations(id),
            FOREIGN KEY (invoice_id) REFERENCES invoices(id)
        );
        """)
        
        # Credit Note Lines Table
        cur.execute("""
        CREATE TABLE credit_note_lines (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            credit_note_id VARCHAR(26) NOT NULL,
            invoice_line_id VARCHAR(26) NOT NULL,
            quantity INTEGER NOT NULL,
            unit_price DECIMAL(19,4) NOT NULL,
            vat_rate DECIMAL(5,2) NOT NULL,
            vat_amount DECIMAL(19,4) GENERATED ALWAYS AS (ROUND(((unit_price * quantity) * vat_rate) / 100, 4)) STORED,
            total_amount DECIMAL(19,4) GENERATED ALWAYS AS (ROUND((unit_price * quantity) + (((unit_price * quantity) * vat_rate) / 100), 4)) STORED,
            
            FOREIGN KEY (credit_note_id) REFERENCES credit_notes(id) ON DELETE CASCADE,
            FOREIGN KEY (invoice_line_id) REFERENCES invoice_lines(id)
        );
        """)
        
        # Loyalty Programs Table
        cur.execute("""
        CREATE TABLE loyalty_programs (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            name VARCHAR(255) NOT NULL,
            description TEXT,
            start_date DATE NOT NULL,
            end_date DATE,
            program_status VARCHAR(20) DEFAULT 'ACTIVE', -- DRAFT, ACTIVE, SUSPENDED, COMPLETED, CANCELLED
            point_ratio DECIMAL(5,2) DEFAULT 1.00,
            max_points_per_transaction DECIMAL(10,2)
        );
        """)
        
        # Tiers Table
        cur.execute("""
        CREATE TABLE tiers (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            loyalty_program_id VARCHAR(26) NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            min_points_required INTEGER DEFAULT 0,
            discount_percentage DECIMAL(5,2) DEFAULT 0.00,
            priority_support BOOLEAN DEFAULT FALSE,
            
            FOREIGN KEY (loyalty_program_id) REFERENCES loyalty_programs(id)
        );
        """)
        
        # Account Tiers Junction Table
        cur.execute("""
        CREATE TABLE account_tiers (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            account_id VARCHAR(26) NOT NULL,
            tier_id VARCHAR(26) NOT NULL,
            start_date DATE DEFAULT CURRENT_DATE,
            end_date DATE,
            membership_status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, EXPIRED, REVOKED
            
            FOREIGN KEY (account_id) REFERENCES accounts(id),
            FOREIGN KEY (tier_id) REFERENCES tiers(id)
        );
        """)
        
        # Rewards Table
        cur.execute("""
        CREATE TABLE rewards (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            loyalty_program_id VARCHAR(26) NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            points_required INTEGER NOT NULL,
            redemption_limit INTEGER,
            remaining_redemptions INTEGER,
            reward_status VARCHAR(20) DEFAULT 'ACTIVE', -- DRAFT, ACTIVE, SUSPENDED, EXPIRED
            
            FOREIGN KEY (loyalty_program_id) REFERENCES loyalty_programs(id)
        );
        """)
        
        # Loyalty Transactions Table
        cur.execute("""
        CREATE TABLE loyalty_transactions (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            account_id VARCHAR(26) NOT NULL,
            txn_type VARCHAR(20) NOT NULL, -- EARN, BURN, ADJUST
            points DECIMAL(10,2) NOT NULL,
            reference_type VARCHAR(50),
            reference_id VARCHAR(26),
            balance_after DECIMAL(10,2),
            description TEXT,
            
            FOREIGN KEY (account_id) REFERENCES accounts(id)
        );
        """)
        
        # Audit Log Table
        cur.execute("""
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
        
        # Idempotency Keys Table
        cur.execute("""
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
        
        # Create indexes for better performance
        cur.execute("CREATE INDEX idx_users_email ON users(email);")
        cur.execute("CREATE INDEX idx_users_account_id ON users(account_id);")
        cur.execute("CREATE INDEX idx_users_account_active ON users(account_id, is_active) WHERE is_active = TRUE;")

        cur.execute("CREATE INDEX idx_accounts_email ON accounts(email);")
        cur.execute("CREATE INDEX idx_accounts_status ON accounts(status);")
        cur.execute("CREATE INDEX idx_accounts_account_type ON accounts(account_type);")

        cur.execute("CREATE INDEX idx_permissions_name ON permissions(permission_name);")
        cur.execute("CREATE INDEX idx_permissions_active ON permissions(is_active);")

        cur.execute("CREATE INDEX idx_roles_name ON roles(role_name);")
        cur.execute("CREATE INDEX idx_roles_active ON roles(is_active);")

        cur.execute("CREATE INDEX idx_products_name ON products USING gin(to_tsvector('english'::regconfig, name));")
        cur.execute("CREATE INDEX idx_products_status ON products(product_status);")
        cur.execute("CREATE INDEX idx_products_vendor_id ON products(vendor_id);")
        cur.execute("CREATE INDEX idx_products_sku ON products(sku);")
        cur.execute("CREATE INDEX idx_products_slug ON products(slug);")
        cur.execute("CREATE INDEX idx_products_slug_gin ON products USING gin(to_tsvector('english'::regconfig, slug));")

        cur.execute("CREATE INDEX idx_vendors_status ON vendors(vendor_status);")

        cur.execute("CREATE INDEX idx_rfqs_account_id ON rfqs(account_id);")
        cur.execute("CREATE INDEX idx_rfqs_status ON rfqs(rfq_status);")

        cur.execute("CREATE INDEX idx_quotes_rfq_id ON quotes(rfq_id);")
        cur.execute("CREATE INDEX idx_quotes_vendor_id ON quotes(vendor_id);")

        cur.execute("CREATE INDEX idx_orders_account_id ON orders(account_id);")
        cur.execute("CREATE INDEX idx_orders_status ON orders(order_status);")

        cur.execute("CREATE INDEX idx_invoices_order_id ON invoices(order_id);")
        cur.execute("CREATE INDEX idx_invoices_status ON invoices(invoice_status);")

        cur.execute("CREATE INDEX idx_payments_order_id ON payments(order_id);")
        cur.execute("CREATE INDEX idx_payments_status ON payments(payment_status);")

        cur.execute("CREATE INDEX idx_media_assets_status ON media_assets(status);")
        cur.execute("CREATE INDEX idx_media_assets_type ON media_assets(media_type);")

        cur.execute("CREATE INDEX idx_feature_flags_name ON feature_flags(flag_name);")
        
        # Create triggers for auto-updating updated_at fields
        cur.execute("CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_permissions_updated_at BEFORE UPDATE ON permissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_product_attributes_updated_at BEFORE UPDATE ON product_attributes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_product_attribute_values_updated_at BEFORE UPDATE ON product_attribute_values FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_media_assets_updated_at BEFORE UPDATE ON media_assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_rfqs_updated_at BEFORE UPDATE ON rfqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_credit_limits_updated_at BEFORE UPDATE ON credit_limits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_loyalty_programs_updated_at BEFORE UPDATE ON loyalty_programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_tiers_updated_at BEFORE UPDATE ON tiers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_rewards_updated_at BEFORE UPDATE ON rewards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_sequence_registry_updated_at BEFORE UPDATE ON sequence_registry FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_tax_registrations_updated_at BEFORE UPDATE ON tax_registrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        cur.execute("CREATE TRIGGER update_feature_flags_updated_at BEFORE UPDATE ON feature_flags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();")
        
        conn.commit()
        print("Complete schema has been created.")

def main(skip_confirmation=False):
    """Main function to execute the complete database reset."""
    print("Starting complete database reset for P4 B2B Marketplace...")
    print("WARNING: This will completely delete all existing data in the database.")
    
    if not skip_confirmation:
        confirmation = input("Are you sure you want to proceed? Type 'YES' to continue: ")
        if confirmation != 'YES':
            print("Operation cancelled.")
            return
    
    try:
        conn = connect_to_db()
        print("Connected to database successfully.")
        
        drop_all_tables(conn)
        create_complete_schema(conn)
        
        conn.close()
        print("\nDatabase reset completed successfully! Schema is now ready for seeding.")
        
    except Exception as e:
        print(f"Error during database reset: {str(e)}")
        if 'conn' in locals():
            conn.rollback()
    finally:
        if 'conn' in locals():
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == '--force':
        main(skip_confirmation=True)
    else:
        main()