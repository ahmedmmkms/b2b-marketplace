#!/usr/bin/env python3
"""
Complete Data Seeding Script for P4 B2B Marketplace

This script truncates existing data and repopulates all tables with significant amounts of realistic data.
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

def truncate_tables(conn):
    """Truncate all tables to remove existing data."""
    print("Truncating all tables...")
    
    with conn.cursor() as cur:
        # Get all table names
        cur.execute("""
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname = 'public';
        """)
        tables = cur.fetchall()
        
        # Get table names as a list
        table_names = [table[0] for table in tables if table[0] != 'flyway_schema_history']
        
        # Sort tables by dependency to handle foreign keys properly
        # Order to respect foreign key constraints
        ordered_tables = [
            'wallet_transactions', 'order_lines', 'invoice_lines', 'credit_note_lines', 
            'quote_lines', 'rfq_lines', 'loyalty_transactions', 'product_media',
            'product_attribute_values', 'idempotency_keys', 'audit_log', 'wallets',
            'credit_limits', 'account_tiers', 'invoices', 'credit_notes', 'payments',
            'orders', 'quotes', 'rfqs', 'invoice_lines', 'product_attribute_values',
            'user_roles', 'role_permissions', 'quote_lines', 'order_lines', 'invoice_lines',
            'credit_note_lines', 'rfq_lines', 'loyalty_transactions', 'product_media',
            'users', 'vendors', 'rewards', 'tiers', 'loyalty_programs', 'sequence_registry',
            'tax_registrations', 'media_assets', 'products', 'product_attributes', 
            'accounts', 'feature_flags', 'permissions', 'roles'
        ]
        
        # Add any tables not in the predefined order
        for table in table_names:
            if table not in ordered_tables:
                ordered_tables.insert(0, table)
        
        # Truncate tables in the correct order
        for table in ordered_tables:
            if table in table_names:
                print(f"Truncating table: {table}")
                try:
                    cur.execute(f"TRUNCATE TABLE {table} RESTART IDENTITY CASCADE;")
                except psycopg2.Error as e:
                    print(f"Error truncating table {table}: {e}")
                    # Some tables might have issues being truncated due to dependencies
                    # Try to delete instead
                    try:
                        cur.execute(f"DELETE FROM {table};")
                        print(f"Successfully deleted all records from {table}")
                    except:
                        print(f"Could not truncate or delete from {table}, skipping...")
                        conn.rollback()
                        continue
        
        conn.commit()
        print(f"Truncated {len([t for t in table_names if t != 'flyway_schema_history'])} tables.")

def seed_feature_flags(conn):
    """Seed feature flags with significant data."""
    with conn.cursor() as cur:
        print("Seeding feature flags...")
        
        # Define a comprehensive list of feature flags
        flags = [
            ("catalog.publicBrowse", True, "Enable public catalog browsing"),
            ("search.enabled", True, "Enable product search functionality"),
            ("rfq.enabled", True, "Enable RFQ creation"),
            ("quote.vendorConsole", True, "Enable vendor quote console"),
            ("orders.checkout", True, "Enable checkout process"),
            ("payments.gateway1", True, "Enable first payment gateway"),
            ("wallet.basic", True, "Enable basic wallet functionality"),
            ("invoice.vat", True, "Enable VAT invoicing"),
            ("loyalty.core", True, "Enable loyalty program"),
            ("credit.controls", True, "Enable credit controls"),
            ("vendor.onboarding", True, "Enable vendor onboarding"),
            ("multi.currency", False, "Enable multi-currency support"),
            ("product.reviews", False, "Enable product reviews"),
            ("advanced.analytics", False, "Enable advanced analytics"),
            ("multi.language", True, "Enable multi-language support"),
            ("advanced.search", True, "Enable advanced search features"),
            ("custom.quotes", True, "Enable custom quote requests"),
            ("bulk.orders", False, "Enable bulk ordering"),
            ("api.access", True, "Enable API access for partners"),
            ("mobile.app", False, "Enable mobile application features")
        ]
        
        # Add more feature flags for a significant amount
        for i in range(21, 101):
            flags.append((
                f"feature.{i}",
                random.choice([True, False]),
                f"Feature flag number {i} for testing purposes"
            ))
        
        for flag_name, is_enabled, description in flags:
            flag_id = generate_ulid()
            cur.execute("""
                INSERT INTO feature_flags (id, flag_name, is_enabled, description, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (flag_id, flag_name, is_enabled, description, datetime.now(), datetime.now()))
        
        conn.commit()
        print(f"Seeded {len(flags)} feature flags.")

def seed_permissions(conn):
    """Seed permissions with significant data."""
    with conn.cursor() as cur:
        print("Seeding permissions...")
        
        # Define a comprehensive list of permissions
        permissions = [
            ("CAN_VIEW_PRODUCTS", "Can view products"),
            ("CAN_CREATE_RFQ", "Can create RFQs"),
            ("CAN_VIEW_RFQ", "Can view RFQs"),
            ("CAN_SUBMIT_QUOTE", "Can submit quotes"),
            ("CAN_VIEW_QUOTES", "Can view quotes"),
            ("CAN_CREATE_ORDER", "Can create orders"),
            ("CAN_MANAGE_ACCOUNT", "Can manage account information"),
            ("CAN_MANAGE_USERS", "Can manage users"),
            ("CAN_MANAGE_VENDORS", "Can manage vendors"),
            ("CAN_ADMIN_PANEL", "Can access admin panel"),
            ("CAN_MANAGE_INVOICES", "Can manage invoices"),
            ("CAN_MANAGE_PAYMENTS", "Can manage payments"),
            ("CAN_MANAGE_WALLETS", "Can manage wallets"),
            ("CAN_MANAGE_CREDITS", "Can manage credit limits"),
            ("CAN_MANAGE_LOYALTY", "Can manage loyalty programs"),
            ("CAN_VIEW_REPORTS", "Can view reports"),
            ("CAN_MANAGE_REVIEWS", "Can manage product reviews"),
            ("CAN_MANAGE_CATEGORIES", "Can manage product categories"),
            ("CAN_MANAGE_ATTRIBUTES", "Can manage product attributes"),
            ("CAN_MANAGE_MEDIA", "Can manage media assets")
        ]
        
        # Add more permissions for a significant amount
        for i in range(21, 151):
            permissions.append((
                f"CAN_PERFORM_ACTION_{i}",
                f"Permission to perform action number {i}"
            ))
        
        for perm_name, description in permissions:
            perm_id = generate_ulid()
            cur.execute("""
                INSERT INTO permissions (id, permission_name, description, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s)
            """, (perm_id, perm_name, description, datetime.now(), datetime.now()))
        
        conn.commit()
        print(f"Seeded {len(permissions)} permissions.")

def seed_roles(conn):
    """Seed roles with significant data."""
    with conn.cursor() as cur:
        print("Seeding roles...")
        
        # Define roles
        roles = [
            ("BUYER", "Regular buyer role"),
            ("VENDOR", "Vendor role"),
            ("ADMIN", "Administrator role"),
            ("ACCOUNT_MANAGER", "Account manager role"),
            ("SUPERVISOR", "Supervisor role"),
            ("FINANCE_MANAGER", "Finance manager role"),
            ("PRODUCT_MANAGER", "Product manager role"),
            ("SUPPORT_AGENT", "Support agent role"),
            ("AUDITOR", "Auditor role"),
            ("MARKETING_MANAGER", "Marketing manager role")
        ]
        
        # Add more roles for a significant amount
        for i in range(11, 51):
            roles.append((
                f"ROLE_{i}",
                f"Role number {i} for testing purposes"
            ))
        
        for role_name, description in roles:
            role_id = generate_ulid()
            cur.execute("""
                INSERT INTO roles (id, role_name, description, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s)
            """, (role_id, role_name, description, datetime.now(), datetime.now()))
        
        conn.commit()
        print(f"Seeded {len(roles)} roles.")

def seed_accounts(conn):
    """Seed accounts with significant data."""
    with conn.cursor() as cur:
        print("Seeding accounts...")
        
        # Define account types
        account_types = ["INDIVIDUAL", "COMPANY"]
        statuses = ["PENDING", "ACTIVE", "INACTIVE", "SUSPENDED", "CLOSED"]
        
        # Create a list to store account IDs for later use
        account_ids = []
        
        for i in range(500):  # Create 500 accounts
            account_id = generate_ulid()
            account_type = random.choice(account_types)
            status = random.choice(statuses)
            
            # Generate appropriate company name for COMPANY accounts
            company_name = fake.company() if account_type == "COMPANY" else None
            if account_type == "INDIVIDUAL":
                company_name = f"{fake.first_name()} {fake.last_name()}"
            
            # Generate contact person
            contact_person = fake.name()
            
            # Generate unique email
            email = f"account{i}@{fake.domain_name()}"
            
            # Generate other fields
            tax_id = fake.bothify(text="###-###-###") if random.choice([True, False]) else None
            kyc_verified = random.choice([True, False])
            
            cur.execute("""
                INSERT INTO accounts (id, account_type, status, company_name, contact_person, email, 
                                     phone, tax_id, registration_date, kyc_verified, 
                                     credit_limit, available_credit, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                account_id, account_type, status, 
                company_name[:255] if company_name else None, contact_person, email,
                fake.phone_number()[:20] if fake.phone_number() else None, tax_id, 
                fake.date_between(start_date='-3y', end_date='today'),
                kyc_verified,
                random.uniform(1000, 100000),  # credit limit
                random.uniform(0, 100000),     # available credit
                datetime.now(), datetime.now()
            ))
            
            account_ids.append(account_id)
        
        conn.commit()
        print(f"Seeded {len(account_ids)} accounts.")
        return account_ids

def seed_users(conn, account_ids):
    """Seed users with significant data."""
    with conn.cursor() as cur:
        print("Seeding users...")
        
        user_ids = []
        
        for i in range(600):  # Create 600 users
            user_id = generate_ulid()
            account_id = random.choice(account_ids)
            
            # Generate user details
            first_name = fake.first_name()
            last_name = fake.last_name()
            email = f"{first_name.lower()}.{last_name.lower()}{i}@{fake.domain_name()}"
            
            cur.execute("""
                INSERT INTO users (id, account_id, first_name, last_name, email, 
                                  phone, job_title, is_active, last_login_at, 
                                  password_hash, salt, failed_login_attempts, locked_until,
                                  created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                user_id, account_id, first_name, last_name, email,
                fake.phone_number()[:20] if fake.phone_number() else None, 
                random.choice(["Manager", "Director", "Coordinator", "Specialist", "Analyst", "Executive", "Associate", "Officer"]),
                random.choice([True, False]),
                fake.date_time_between(start_date='-6m', end_date='now') if random.choice([True, False]) else None,
                f"$2b$10${fake.sha256()[:50]}",  # Placeholder hash
                fake.sha256()[:30],  # Salt placeholder
                random.randint(0, 5),
                fake.date_time_between(start_date='-1d', end_date='now') if random.choice([True, False]) else None,
                datetime.now(), datetime.now()
            ))
            
            user_ids.append(user_id)
        
        conn.commit()
        print(f"Seeded {len(user_ids)} users.")
        return user_ids

def seed_vendors(conn):
    """Seed vendors with significant data."""
    with conn.cursor() as cur:
        print("Seeding vendors...")
        
        vendor_statuses = ["PENDING", "APPROVED", "REJECTED", "SUSPENDED", "CLOSED"]
        vendor_ids = []
        
        for i in range(200):  # Create 200 vendors
            vendor_id = generate_ulid()
            
            # Generate vendor details
            business_name = fake.company()
            vendor_status = random.choice(vendor_statuses)
            kyc_verified = random.choice([True, False]) if vendor_status == "APPROVED" else False
            
            cur.execute("""
                INSERT INTO vendors (id, business_name, description, email, phone, 
                                    address, tax_id, vendor_status, approval_date, 
                                    business_license_no, registration_date, kyc_verified, 
                                    kyc_verified_at, kyc_verified_by, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                vendor_id, business_name[:255] if business_name else None, fake.catch_phrase(),
                f"contact@{business_name.replace(' ', '').lower()}{i}.com",
                fake.phone_number()[:50] if fake.phone_number() else None,
                json.dumps({
                    "street": fake.street_address(),
                    "city": fake.city(),
                    "state": fake.state(),
                    "zip": fake.postcode(),
                    "country": fake.country()
                }),
                fake.bothify(text="###-###-###"),
                vendor_status,
                fake.date_between(start_date='-2y', end_date='today') if vendor_status == "APPROVED" else None,
                fake.bothify(text="LICENSE-?????-#####"),
                fake.date_between(start_date='-3y', end_date='today'),
                kyc_verified,
                fake.date_between(start_date='-1y', end_date='today') if kyc_verified else None,
                f"user{i}" if kyc_verified else None,
                datetime.now(), datetime.now()
            ))
            
            vendor_ids.append(vendor_id)
        
        conn.commit()
        print(f"Seeded {len(vendor_ids)} vendors.")
        return vendor_ids

def seed_product_attributes(conn):
    """Seed product attributes with significant data."""
    with conn.cursor() as cur:
        print("Seeding product attributes...")
        
        attribute_types = ["TEXT", "NUMBER", "BOOLEAN", "DATE", "SELECT", "MULTI_SELECT"]
        attr_ids = []
        
        # Common product attributes
        common_attrs = [
            ("color", "Color", "Product color"),
            ("size", "Size", "Product size"),
            ("material", "Material", "Material of the product"),
            ("weight", "Weight (kg)", "Weight in kilograms"),
            ("dimensions", "Dimensions", "Product dimensions"),
            ("brand", "Brand", "Product brand"),
            ("model", "Model", "Product model"),
            ("warranty", "Warranty (months)", "Warranty period in months"),
            ("power", "Power (W)", "Power consumption in watts"),
            ("voltage", "Voltage (V)", "Operating voltage")
        ]
        
        for name, display_name, description in common_attrs:
            attr_id = generate_ulid()
            cur.execute("""
                INSERT INTO product_attributes (id, name, display_name, description, 
                                              attribute_type, is_required, is_searchable, 
                                              is_filterable, sort_order, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                attr_id, name, display_name, description,
                random.choice(["SELECT", "TEXT"]),  # Use SELECT or TEXT for common attributes
                random.choice([True, False]), random.choice([True, False]), random.choice([True, False]),
                0, datetime.now(), datetime.now()
            ))
            attr_ids.append(attr_id)
        
        # Add more attributes for a significant amount
        for i in range(11, 101):
            attr_name = f"attr_{i}"
            attr_display = f"Attribute {i}"
            attr_desc = f"Description for attribute {i}"
            
            attr_id = generate_ulid()
            cur.execute("""
                INSERT INTO product_attributes (id, name, display_name, description, 
                                              attribute_type, is_required, is_searchable, 
                                              is_filterable, sort_order, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                attr_id, attr_name, attr_display, attr_desc,
                random.choice(attribute_types),
                random.choice([True, False]), random.choice([True, False]), random.choice([True, False]),
                0, datetime.now(), datetime.now()
            ))
            attr_ids.append(attr_id)
        
        conn.commit()
        print(f"Seeded {len(attr_ids)} product attributes.")
        return attr_ids

def seed_products(conn, vendor_ids):
    """Seed products with significant data."""
    with conn.cursor() as cur:
        print("Seeding products...")
        
        statuses = ["DRAFT", "ACTIVE", "INACTIVE", "DISCONTINUED"]
        currencies = ["USD", "EUR", "SAR", "AED", "EGP"]
        inventory_statuses = ["IN_STOCK", "OUT_OF_STOCK", "BACKORDER", "DISCONTINUED"]
        
        product_ids = []
        
        for i in range(1500):  # Create 1500 products
            product_id = generate_ulid()
            vendor_id = random.choice(vendor_ids)
            
            # Generate product details
            name = f"{fake.catch_phrase()} {i}"  # Adding index to ensure uniqueness
            description = fake.text(max_nb_chars=500)
            sku = f"SKU-{fake.unique.random_int(min=1000, max=9999)}-{i}"
            brand = random.choice(["TechBrand", "QualityCorp", "InnovateX", "ReliableCo", "PremiumPlus", "StandardLine", "EcoFriendly", "ProSeries", "BasicModel", "DeluxeEdition"])
            
            cur.execute("""
                INSERT INTO products (id, name, slug, description, short_description, 
                                     sku, upc, gtin, mpn, brand, vendor_id,
                                     product_status, price_amount, price_currency, 
                                     tax_class, meta_title, meta_description, 
                                     weight, dimensions, packaging_info, 
                                     min_order_quantity, moq, inventory_tracking, 
                                     stock_quantity, inventory_status, is_active,
                                     dimensions_length, dimensions_width, dimensions_height,
                                     created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                product_id, name[:255] if name else None, name.lower().replace(" ", "-").replace("(", "").replace(")", "").replace(",", "").replace(".", "")[:255] if name else None,
                description, fake.sentence()[:500] if fake.sentence() else None,
                sku[:100] if sku else None, fake.bothify(text="##########"), fake.bothify(text="##########"), f"MPN-{i}",
                brand[:100] if brand else None, vendor_id,
                random.choice(statuses), 
                round(random.uniform(5.99, 9999.99), 2), 
                random.choice(currencies),
                random.choice(["Standard", "Reduced", "Exempt"]),
                f"Meta title for {name}"[:255] if name else None, fake.sentence(nb_words=10)[:500] if fake.sentence(nb_words=10) else None,
                round(random.uniform(0.1, 50.0), 3),
                json.dumps({
                    "length": round(random.uniform(5, 100), 2),
                    "width": round(random.uniform(5, 100), 2),
                    "height": round(random.uniform(5, 100), 2),
                    "unit": "cm"
                }),
                json.dumps({
                    "box_count": random.randint(1, 10),
                    "box_dimensions": f"{round(random.uniform(10, 50), 2)}x{round(random.uniform(10, 50), 2)}x{round(random.uniform(10, 50), 2)} cm",
                    "weight_per_box": round(random.uniform(1.0, 20.0), 2)
                }),
                random.randint(1, 10),  # min_order_quantity
                random.randint(1, 50) if random.choice([True, False]) else None,  # moq
                random.choice([True, False]),  # inventory_tracking
                random.randint(0, 1000),  # stock_quantity
                random.choice(inventory_statuses),
                random.choice([True, False]),  # is_active
                round(random.uniform(5, 100), 3),  # dimensions_length
                round(random.uniform(5, 100), 3),  # dimensions_width
                round(random.uniform(5, 100), 3),  # dimensions_height
                datetime.now(), datetime.now()
            ))
            
            product_ids.append(product_id)
        
        conn.commit()
        print(f"Seeded {len(product_ids)} products.")
        return product_ids

def seed_rfqs_and_quotes(conn, account_ids, product_ids, vendor_ids):
    """Seed RFQs and quotes with significant data."""
    with conn.cursor() as cur:
        print("Seeding RFQs and quotes...")
        
        statuses = ["DRAFT", "OPEN", "CLOSED", "EXPIRED"]
        quote_statuses = ["DRAFT", "SUBMITTED", "ACCEPTED", "REJECTED", "EXPIRED"]
        
        rfq_ids = []
        
        for i in range(800):  # Create 800 RFQs
            rfq_id = generate_ulid()
            account_id = random.choice(account_ids)
            
            # Generate RFQ details
            title = f"RFQ for {fake.catch_phrase()}"
            expiry_date = fake.date_time_between(start_date='now', end_date='+30d') if random.choice([True, False]) else None
            
            cur.execute("""
                INSERT INTO rfqs (id, account_id, title, description, rfq_status, 
                                 expiry_date, currency, is_public, contact_person, 
                                 contact_email, tax_included, created_by, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                rfq_id, account_id, title[:255], fake.paragraph(),
                random.choice(statuses), expiry_date,
                random.choice(["USD", "EUR", "SAR", "AED"]), random.choice([True, False]),
                fake.name()[:255], fake.email()[:255], random.choice([True, False]),
                fake.name()[:255], datetime.now(), datetime.now()
            ))
            
            rfq_ids.append(rfq_id)
        
        conn.commit()
        print(f"Seeded {len(rfq_ids)} RFQs.")
        
        # Now create RFQ lines
        rfq_line_ids = []
        for rfq_id in rfq_ids:
            # Each RFQ has 1-5 lines
            num_lines = random.randint(1, 5)
            for j in range(num_lines):
                rfq_line_id = generate_ulid()
                # Randomly decide whether to use an existing product or specify by name
                use_existing_product = random.choice([True, False])
                
                if use_existing_product and product_ids:  # Only if we have products
                    product_id = random.choice(product_ids)
                    # Get the product name from the product table
                    cur.execute("SELECT name FROM products WHERE id = %s", (product_id,))
                    result = cur.fetchone()
                    product_name = result[0][:255] if result and result[0] else fake.catch_phrase()[:255]
                else:
                    product_id = None
                    product_name = fake.catch_phrase()[:255]
                
                cur.execute("""
                    INSERT INTO rfq_lines (id, rfq_id, product_id, product_name, description, 
                                          quantity, unit_of_measure, required_by, 
                                          product_specifications, brand_preference, quality_requirements,
                                          created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    rfq_line_id, rfq_id, 
                    product_id,
                    product_name,
                    fake.paragraph(),
                    random.randint(1, 100),
                    random.choice(["EA", "BOX", "PKG", "SET", "LOT"]),
                    fake.date_time_between(start_date='now', end_date='+60d') if random.choice([True, False]) else None,
                    fake.paragraph()[:255] if random.choice([True, False]) else None,
                    fake.company()[:255] if random.choice([True, False]) else None,
                    fake.paragraph()[:255] if random.choice([True, False]) else None,
                    datetime.now(), datetime.now()
                ))
                rfq_line_ids.append(rfq_line_id)
        
        conn.commit()
        print(f"Seeded {len(rfq_line_ids)} RFQ lines.")
        
        # Now create quotes for the RFQs
        quote_ids = []
        for rfq_id in rfq_ids[:600]:  # Create quotes for 600 of the RFQs
            num_quotes = random.randint(1, 3)  # 1-3 quotes per RFQ
            for j in range(num_quotes):
                quote_id = generate_ulid()
                vendor_id = random.choice(vendor_ids)
                
                # Generate quote details
                title = f"Quote for {fake.catch_phrase()}"
                total_amount = round(random.uniform(100, 10000), 2)
                valid_until = fake.date_time_between(start_date='+1d', end_date='+60d')
                
                cur.execute("""
                    INSERT INTO quotes (id, rfq_id, vendor_id, title, description, 
                                       quote_status, total_amount, currency, 
                                       validity_days, expiry_date, accepted_at, 
                                       quoted_by, quote_number, valid_until, 
                                       freight_included, tax_included, created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    quote_id, rfq_id, vendor_id, title[:255], fake.paragraph(),
                    random.choice(quote_statuses), total_amount,
                    random.choice(["USD", "EUR", "SAR", "AED"]),
                    random.randint(7, 90), 
                    fake.date_time_between(start_date='+1d', end_date='+90d') if random.choice([True, False]) else None,
                    fake.date_time_between(start_date='-30d', end_date='now') if random.choice([True, False]) else None,
                    fake.name()[:255], f"Q-{generate_ulid()[:10]}", valid_until,
                    random.choice([True, False]), random.choice([True, False]),
                    datetime.now(), datetime.now()
                ))
                quote_ids.append(quote_id)
        
        conn.commit()
        print(f"Seeded {len(quote_ids)} quotes.")
        
        # Create quote lines for the quotes
        quote_line_ids = []
        for quote_id in quote_ids:
            # Each quote has 1-5 lines that match RFQ lines
            cur.execute("SELECT id FROM rfq_lines WHERE rfq_id = (SELECT rfq_id FROM quotes WHERE id = %s) LIMIT 5", (quote_id,))
            rfq_lines = [row[0] for row in cur.fetchall()]
            
            for rfq_line_id in rfq_lines:
                if random.choice([True, False]):  # Sometimes not all RFQ lines get quoted
                    quote_line_id = generate_ulid()
                    
                    cur.execute("""
                        INSERT INTO quote_lines (id, quote_id, rfq_line_id, product_id, product_name, 
                                               description, unit_price, quantity, line_total, moq, 
                                               created_at, updated_at)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (
                        quote_line_id, quote_id, rfq_line_id,
                        random.choice(product_ids) if random.choice([True, False]) else None,
                        fake.catch_phrase()[:255],
                        fake.paragraph(),
                        round(random.uniform(10, 1000), 2),
                        random.randint(1, 50),
                        round(random.uniform(100, 5000), 2),
                        random.randint(1, 10),
                        datetime.now(), datetime.now()
                    ))
                    quote_line_ids.append(quote_line_id)
        
        conn.commit()
        print(f"Seeded {len(quote_line_ids)} quote lines.")
        return quote_ids

def seed_orders(conn, account_ids, quote_ids):
    """Seed orders with significant data."""
    with conn.cursor() as cur:
        print("Seeding orders...")
        
        statuses = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"]
        currencies = ["USD", "EUR", "SAR", "AED"]
        
        order_ids = []
        
        for i in range(1000):  # Create 1000 orders
            order_id = generate_ulid()
            account_id = random.choice(account_ids)
            quote_id = random.choice(quote_ids) if random.choice([True, False, False]) else None  # Some orders without quotes
            
            # Generate order details
            po_number = f"PO-{fake.unique.random_int(min=1000, max=9999)}-{i}" if random.choice([True, False]) else None
            total_amount = round(random.uniform(50, 10000), 2)
            
            cur.execute("""
                INSERT INTO orders (id, account_id, quote_id, po_number, order_status, 
                                   currency, subtotal, tax_amount, shipping_amount, 
                                   discount_amount, total_amount, billing_address, 
                                   shipping_address, notes, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                order_id, account_id, quote_id, po_number[:100] if po_number else None,
                random.choice(statuses),
                random.choice(currencies),
                round(total_amount * 0.85, 2),  # subtotal
                round(total_amount * 0.15, 2),  # tax
                round(random.uniform(5, 200), 2),  # shipping
                round(random.uniform(0, 500), 2) if random.choice([True, False]) else 0,  # discount
                total_amount,
                json.dumps({
                    "street": fake.street_address(),
                    "city": fake.city(),
                    "state": fake.state(),
                    "zip": fake.postcode(),
                    "country": fake.country()
                }),
                json.dumps({
                    "street": fake.street_address(),
                    "city": fake.city(),
                    "state": fake.state(),
                    "zip": fake.postcode(),
                    "country": fake.country()
                }),
                fake.paragraph()[:500] if random.choice([True, False]) else None,
                datetime.now(), datetime.now()
            ))
            
            order_ids.append(order_id)
        
        conn.commit()
        print(f"Seeded {len(order_ids)} orders.")
        
        # Now create order lines for the orders
        order_line_ids = []
        for order_id in order_ids:
            # Each order has 1-8 lines
            num_lines = random.randint(1, 8)
            for j in range(num_lines):
                order_line_id = generate_ulid()
                
                cur.execute("""
                    INSERT INTO order_lines (id, order_id, product_id, product_name, 
                                           description, unit_price, quantity, 
                                           created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    order_line_id, order_id,
                    random.choice(product_ids) if random.choice([True, False]) else None,
                    fake.catch_phrase()[:255],
                    fake.paragraph(),
                    round(random.uniform(10, 1000), 2),
                    random.randint(1, 10),
                    datetime.now(), datetime.now()
                ))
                order_line_ids.append(order_line_id)
        
        conn.commit()
        print(f"Seeded {len(order_line_ids)} order lines.")
        return order_ids

def seed_other_tables(conn, account_ids, order_ids, product_ids):
    """Seed remaining tables with significant data."""
    with conn.cursor() as cur:
        print("Seeding remaining tables...")
        
        # Seed tax registrations
        tax_reg_ids = []
        tax_regs = [
            ("KSA Tax Registration", "300000000000003", {"street": "King Fahd Road", "city": "Riyadh", "country": "SA"}, True),
            ("UAE Tax Registration", "100000000000001", {"street": "Sheikh Zayed Road", "city": "Dubai", "country": "AE"}, True),
            ("Egypt Tax Registration", "123456789012345", {"street": "Nile Corniche", "city": "Cairo", "country": "EG"}, True)
        ]
        
        for legal_name, tax_number, address, is_active in tax_regs:
            reg_id = generate_ulid()
            cur.execute("""
                INSERT INTO tax_registrations (id, legal_name, tax_number, address, is_active, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (reg_id, legal_name[:255], tax_number[:100], json.dumps(address), is_active, datetime.now(), datetime.now()))
            tax_reg_ids.append(reg_id)
        
        conn.commit()
        print(f"Seeded {len(tax_reg_ids)} tax registrations.")
        
        # Seed sequence registry
        for tax_reg_id in tax_reg_ids:
            for seq_type in ["INVOICE", "CREDIT_NOTE"]:
                seq_id = generate_ulid()
                cur.execute("""
                    INSERT INTO sequence_registry (id, tax_reg_id, sequence_type, prefix, current_value, next_value, year, created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (seq_id, tax_reg_id, seq_type, seq_type[:3], 0, 1, datetime.now().year, datetime.now(), datetime.now()))
        
        conn.commit()
        print("Seeded sequence registry entries.")
        
        # Seed loyalty programs and tiers
        prog_id = generate_ulid()
        cur.execute("""
            INSERT INTO loyalty_programs (id, name, description, start_date, end_date, 
                                         program_status, point_ratio, max_points_per_transaction, 
                                         created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            prog_id, "Standard Loyalty Program", "Our standard loyalty program", 
            date.today(), date.today().replace(year=date.today().year + 1),
            "ACTIVE", 1.00, 10000.00, datetime.now(), datetime.now()
        ))
        
        # Add tiers to the program
        tier_names = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"]
        for i, tier_name in enumerate(tier_names):
            tier_id = generate_ulid()
            cur.execute("""
                INSERT INTO tiers (id, loyalty_program_id, name, description, min_points_required, 
                                  discount_percentage, priority_support, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                tier_id, prog_id, tier_name[:255], f"{tier_name} tier with special benefits",
                i * 1000, (i + 1) * 2.5, i > 2,  # Priority support for top 2 tiers
                datetime.now(), datetime.now()
            ))
        
        conn.commit()
        print("Seeded loyalty programs and tiers.")
        
        # Seed wallets
        wallet_ids = []
        for account_id in account_ids[:300]:  # Create wallets for first 300 accounts
            wallet_id = generate_ulid()
            balance = round(random.uniform(0, 5000), 2)
            cur.execute("""
                INSERT INTO wallets (id, account_id, name, balance, currency, wallet_status, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (wallet_id, account_id, f"{account_id[:8]}-wallet"[:255], balance, "USD", 
                  random.choice(["ACTIVE", "SUSPENDED"]), datetime.now(), datetime.now()))
            wallet_ids.append(wallet_id)
        
        conn.commit()
        print(f"Seeded {len(wallet_ids)} wallets.")
        
        # Seed credit limits
        for account_id in account_ids[:400]:  # Create credit limits for first 400 accounts
            credit_limit_id = generate_ulid()
            limit_amount = round(random.uniform(5000, 50000), 2)
            used_amount = round(random.uniform(0, limit_amount), 2)
            
            cur.execute("""
                INSERT INTO credit_limits (id, account_id, currency, limit_amount, available_amount, 
                                          used_amount, credit_status, approved_date, 
                                          approved_by, notes, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                credit_limit_id, account_id, "USD", limit_amount,
                limit_amount - used_amount, used_amount,
                random.choice(["ACTIVE", "SUSPENDED", "EXCEEDED"]),
                fake.date_between(start_date='-2y', end_date='today'),
                f"user-{random.randint(1, 50)}"[:26], 
                fake.paragraph()[:255] if random.choice([True, False]) else None,
                datetime.now(), datetime.now()
            ))
        
        conn.commit()
        print("Seeded credit limits for accounts.")
        
        # Seed media assets
        media_ids = []
        for i in range(1000):  # Create 1000 media assets
            media_id = generate_ulid()
            cur.execute("""
                INSERT INTO media_assets (id, name, original_filename, storage_path, 
                                         content_type, file_size, alt_text, title, 
                                         caption, media_type, status, is_primary, 
                                         upload_date, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                media_id, f"Media Asset {i}"[:255], f"image_{i}.jpg"[:255], f"/uploads/images/{i}/image_{i}.jpg"[:1000],
                "image/jpeg", random.randint(50000, 5000000), fake.sentence()[:255],
                f"Title for media {i}"[:255], fake.sentence()[:255], "IMAGE",
                random.choice(["ACTIVE", "INACTIVE", "DELETED"]), 
                random.choice([True, False]),
                fake.date_time_between(start_date='-1y', end_date='now'),
                datetime.now(), datetime.now()
            ))
            media_ids.append(media_id)
        
        conn.commit()
        print(f"Seeded {len(media_ids)} media assets.")
        
        # Link some products to media assets
        for product_id in product_ids[:1000]:  # Link first 1000 products to media
            num_media = random.randint(1, 5)
            for j in range(num_media):
                product_media_id = generate_ulid()
                cur.execute("""
                    INSERT INTO product_media (id, product_id, media_asset_id, display_order, 
                                              is_primary, alt_text_override, created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    product_media_id, product_id, 
                    random.choice(media_ids),
                    j, j == 0,  # is_primary for first one
                    fake.sentence()[:255] if random.choice([True, False]) else None,
                    datetime.now(), datetime.now()
                ))
        
        conn.commit()
        print("Linked products to media assets.")
        
        # Seed payments for some orders
        for order_id in order_ids[:700]:  # Create payments for first 700 orders
            payment_id = generate_ulid()
            amount = round(random.uniform(50, 5000), 2)
            
            cur.execute("""
                INSERT INTO payments (id, order_id, payment_method, amount, currency, 
                                     payment_status, transaction_id, provider, 
                                     provider_response, captured_at, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                payment_id, order_id,
                random.choice(["CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER", "WALLET", "CASH_ON_DELIVERY"]),
                amount, "USD", random.choice(["PENDING", "AUTHORIZED", "CAPTURED", "FAILED", "REFUNDED", "CANCELLED"]),
                f"TXN-{generate_ulid()[:12]}", 
                random.choice(["STRIPE", "PAYPAL", "BANK", "INTERNAL"]),
                json.dumps({"status": "success", "auth_code": fake.bothify(text="?????")}) if random.choice([True, False]) else None,
                fake.date_time_between(start_date='-30d', end_date='now') if random.choice([True, False]) else None,
                datetime.now(), datetime.now()
            ))
        
        conn.commit()
        print("Seeded payments for orders.")
        
        # Seed invoices for some orders
        for order_id in order_ids[:600]:  # Create invoices for first 600 orders
            invoice_id = generate_ulid()
            
            cur.execute("""
                INSERT INTO invoices (id, tax_reg_id, sequence_number, full_number, 
                                     order_id, issued_date, due_date, currency, 
                                     subtotal, discount_amount, vat_amount, total_amount, 
                                     invoice_status, customer_name, customer_tax_number, 
                                     customer_address, notes, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                invoice_id, random.choice(tax_reg_ids),
                random.randint(1, 10000), f"INV-{datetime.now().year}-{random.randint(1000, 9999)}",
                order_id, fake.date_between(start_date='-30d', end_date='now'),
                fake.date_between(start_date='+7d', end_date='+60d'),
                "USD", round(random.uniform(100, 5000), 2),
                round(random.uniform(0, 500), 2) if random.choice([True, False]) else 0,
                round(random.uniform(5, 500), 2), round(random.uniform(150, 6000), 2),
                random.choice(["DRAFT", "ISSUED", "PAID", "OVERDUE", "CANCELLED"]),
                fake.name()[:255], fake.bothify(text="###-###-###")[:100],
                json.dumps({
                    "street": fake.street_address(),
                    "city": fake.city(),
                    "state": fake.state(),
                    "zip": fake.postcode(),
                    "country": fake.country()
                }),
                fake.paragraph()[:500] if random.choice([True, False]) else None,
                datetime.now(), datetime.now()
            ))
        
        conn.commit()
        print("Seeded invoices for orders.")
        
        # Seed invoice lines for the invoices
        for order_id in order_ids[:600]:  # Create invoice lines for orders that have invoices
            # Get the invoice ID for this order
            cur.execute("SELECT id FROM invoices WHERE order_id = %s", (order_id,))
            invoice_result = cur.fetchone()
            if invoice_result:
                invoice_id = invoice_result[0]
                
                # Get the order lines for this order
                cur.execute("SELECT id, product_name, unit_price, quantity FROM order_lines WHERE order_id = %s", (order_id,))
                order_lines = cur.fetchall()
                
                for order_line_id, product_name, unit_price, quantity in order_lines:
                    invoice_line_id = generate_ulid()
                    vat_rate = round(random.uniform(5, 20), 2)  # VAT rate between 5% and 20%
                    
                    cur.execute("""
                        INSERT INTO invoice_lines (id, invoice_id, order_line_id, product_name, 
                                                  description, unit_price, quantity, 
                                                  vat_rate, vat_amount, total_amount, 
                                                  created_at, updated_at)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (
                        invoice_line_id, invoice_id, order_line_id,
                        product_name[:255] if product_name else None, fake.sentence()[:255] if fake.sentence() else None,
                        unit_price, quantity,
                        vat_rate,
                        round((unit_price * quantity * vat_rate) / 100, 2),
                        round((unit_price * quantity) + (unit_price * quantity * vat_rate) / 100, 2),
                        datetime.now(), datetime.now()
                    ))
        
        conn.commit()
        print("Seeded invoice lines for invoices.")
        
        # Seed loyalty transactions
        for account_id in account_ids[:200]:  # Create loyalty transactions for first 200 accounts
            for j in range(random.randint(1, 10)):  # 1-10 transactions per account
                txn_id = generate_ulid()
                points = round(random.uniform(10, 500), 2) if random.choice([True, False]) else -round(random.uniform(10, 200), 2)
                
                cur.execute("""
                    INSERT INTO loyalty_transactions (id, account_id, txn_type, points, 
                                                    reference_type, reference_id, balance_after, 
                                                    description, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    txn_id, account_id,
                    random.choice(["EARN", "BURN", "ADJUST"]),
                    points,
                    random.choice(["ORDER", "REFERRAL", "PROMOTION", "RETURN"]),
                    random.choice(order_ids) if random.choice([True, False]) else None,
                    round(random.uniform(0, 2000), 2),
                    fake.sentence()[:255],
                    datetime.now()
                ))
        
        conn.commit()
        print("Seeded loyalty transactions for accounts.")

def main():
    """Main function to execute the extensive data seeding."""
    print("Starting extensive data seeding for P4 B2B Marketplace...")
    print("This will populate all tables with significant amounts of realistic data.")
    
    try:
        conn = connect_to_db()
        print("Connected to database successfully.")
        
        # Truncate existing data first
        truncate_tables(conn)
        
        # Seed data in the correct order (respecting foreign key constraints)
        seed_feature_flags(conn)
        seed_permissions(conn)
        seed_roles(conn)
        
        account_ids = seed_accounts(conn)
        vendor_ids = seed_vendors(conn)
        attr_ids = seed_product_attributes(conn)
        product_ids = seed_products(conn, vendor_ids)
        
        user_ids = seed_users(conn, account_ids)
        
        quote_ids = seed_rfqs_and_quotes(conn, account_ids, product_ids, vendor_ids)
        order_ids = seed_orders(conn, account_ids, quote_ids)
        
        seed_other_tables(conn, account_ids, order_ids, product_ids)
        
        conn.close()
        print("\nExtensive data seeding completed successfully!")
        
    except Exception as e:
        print(f"Error during data seeding: {str(e)}")
        if 'conn' in locals():
            conn.rollback()
    finally:
        if 'conn' in locals():
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    main()