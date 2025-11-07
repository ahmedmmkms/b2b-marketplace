#!/usr/bin/env python3
"""
Script to seed the production database with essential data for the P4 B2B Marketplace.
This script connects to the production database and populates it with necessary baseline data.
"""

import psycopg2
import os
from datetime import datetime, date
import json
import uuid

def generate_ulid():
    """Generate a ULID string for database entities."""
    # This is a simplified ULID generator for demonstration purposes
    # In production, you would use the proper ULID algorithm
    return str(uuid.uuid4()).replace('-', '')[:26].upper()

def connect_to_db():
    """Establish connection to the database using environment variables."""
    db_url = os.getenv('DB_URL')
    if not db_url:
        raise ValueError("DB_URL environment variable is not set")
    
    # Extract components from the DB_URL (simplified approach)
    # In a real application, you would parse the URL properly
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST', 'ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech'),
        database=os.getenv('DB_NAME', 'neondb'),
        user=os.getenv('DB_USERNAME', 'neondb_owner'),
        password=os.getenv('DB_PASSWORD', 'npg_QTE70VJgbcdp'),
        sslmode='require'
    )
    
    return conn

def seed_feature_flags(conn):
    """Seed feature flags for the application."""
    with conn.cursor() as cur:
        print("Seeding feature flags...")
        
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
            ("credit.controls", True, "Enable credit controls")
        ]
        
        for flag_name, is_enabled, description in flags:
            flag_id = generate_ulid()
            cur.execute("""
                INSERT INTO feature_flags (id, flag_name, is_enabled, description, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT (flag_name) DO UPDATE SET
                    is_enabled = EXCLUDED.is_enabled,
                    description = EXCLUDED.description,
                    updated_at = EXCLUDED.updated_at
            """, (flag_id, flag_name, is_enabled, description, datetime.now(), datetime.now()))
        
        conn.commit()
        print(f"Seeded {len(flags)} feature flags.")

def seed_permissions(conn):
    """Seed basic permissions for the RBAC system."""
    with conn.cursor() as cur:
        print("Seeding permissions...")
        
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
            ("CAN_ADMIN_PANEL", "Can access admin panel")
        ]
        
        for perm_name, description in permissions:
            perm_id = generate_ulid()
            cur.execute("""
                INSERT INTO permissions (id, permission_name, description, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (permission_name) DO UPDATE SET
                    description = EXCLUDED.description,
                    updated_at = EXCLUDED.updated_at
            """, (perm_id, perm_name, description, datetime.now(), datetime.now()))
        
        conn.commit()
        print(f"Seeded {len(permissions)} permissions.")

def seed_roles(conn):
    """Seed basic roles for the RBAC system."""
    with conn.cursor() as cur:
        print("Seeding roles...")
        
        roles = [
            ("BUYER", "Regular buyer role"),
            ("VENDOR", "Vendor role"),
            ("ADMIN", "Administrator role"),
            ("ACCOUNT_MANAGER", "Account manager role"),
            ("SUPERVISOR", "Supervisor role")
        ]
        
        for role_name, description in roles:
            role_id = generate_ulid()
            cur.execute("""
                INSERT INTO roles (id, role_name, description, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (role_name) DO UPDATE SET
                    description = EXCLUDED.description,
                    updated_at = EXCLUDED.updated_at
            """, (role_id, role_name, description, datetime.now(), datetime.now()))
        
        conn.commit()
        print(f"Seeded {len(roles)} roles.")

def seed_product_attributes(conn):
    """Seed common product attributes."""
    with conn.cursor() as cur:
        print("Seeding product attributes...")
        
        attributes = [
            ("color", "Color", "Product color", "SELECT", True, True, True),
            ("size", "Size", "Product size", "SELECT", True, True, True),
            ("material", "Material", "Material of the product", "SELECT", False, True, True),
            ("weight", "Weight (kg)", "Weight in kilograms", "NUMBER", False, True, True),
            ("dimensions", "Dimensions", "Product dimensions", "TEXT", False, False, False),
            ("brand", "Brand", "Product brand", "TEXT", False, True, True)
        ]
        
        for name, display_name, description, attr_type, is_required, is_searchable, is_filterable in attributes:
            attr_id = generate_ulid()
            cur.execute("""
                INSERT INTO product_attributes (id, name, display_name, description, attribute_type, 
                                               is_required, is_searchable, is_filterable, sort_order, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (name) DO UPDATE SET
                    display_name = EXCLUDED.display_name,
                    description = EXCLUDED.description,
                    attribute_type = EXCLUDED.attribute_type,
                    is_required = EXCLUDED.is_required,
                    is_searchable = EXCLUDED.is_searchable,
                    is_filterable = EXCLUDED.is_filterable,
                    updated_at = EXCLUDED.updated_at
            """, (attr_id, name, display_name, description, attr_type, is_required, is_searchable, is_filterable, 0, datetime.now(), datetime.now()))
            
            # Seed some attribute values for select types
            if attr_type == "SELECT":
                if name == "color":
                    values = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Purple", "Orange"]
                elif name == "size":
                    values = ["XS", "S", "M", "L", "XL", "XXL"]
                elif name == "material":
                    values = ["Cotton", "Polyester", "Wool", "Silk", "Leather", "Nylon", "Denim"]
                else:
                    values = ["Option 1", "Option 2", "Option 3"]
                
                for value in values:
                    value_id = generate_ulid()
                    display_value = value
                    cur.execute("""
                        INSERT INTO product_attribute_values (id, product_attribute_id, value, display_value, is_default, sort_order, created_at, updated_at)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """, (value_id, attr_id, value, display_value, False, 0, datetime.now(), datetime.now()))
        
        conn.commit()
        print(f"Seeded product attributes with values.")

def seed_tax_registrations(conn):
    """Seed tax registration data."""
    with conn.cursor() as cur:
        print("Seeding tax registrations...")
        
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
                ON CONFLICT (tax_number) DO UPDATE SET
                    legal_name = EXCLUDED.legal_name,
                    is_active = EXCLUDED.is_active,
                    updated_at = EXCLUDED.updated_at
            """, (reg_id, legal_name, tax_number, json.dumps(address), is_active, datetime.now(), datetime.now()))
        
        conn.commit()
        print(f"Seeded {len(tax_regs)} tax registrations.")

def seed_loyalty_programs(conn):
    """Seed basic loyalty programs."""
    with conn.cursor() as cur:
        print("Seeding loyalty programs...")
        
        programs = [
            {
                "name": "Standard Loyalty Program",
                "description": "Basic loyalty program for all customers",
                "start_date": date.today(),
                "end_date": date.today().replace(year=date.today().year + 1),
                "status": "ACTIVE",
                "point_ratio": 1.00,
                "max_points_per_transaction": 10000.00
            }
        ]
        
        for prog_data in programs:
            prog_id = generate_ulid()
            cur.execute("""
                INSERT INTO loyalty_programs (id, name, description, start_date, end_date, program_status, 
                                             point_ratio, max_points_per_transaction, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (name) DO UPDATE SET
                    description = EXCLUDED.description,
                    program_status = EXCLUDED.program_status,
                    point_ratio = EXCLUDED.point_ratio,
                    updated_at = EXCLUDED.updated_at
            """, (
                prog_id, 
                prog_data["name"], 
                prog_data["description"], 
                prog_data["start_date"], 
                prog_data["end_date"], 
                prog_data["status"],
                prog_data["point_ratio"], 
                prog_data["max_points_per_transaction"], 
                datetime.now(), 
                datetime.now()
            ))
            
            # Add tiers to the program
            tiers = [
                {"name": "Bronze", "description": "Entry level", "min_points": 0, "discount": 2.00},
                {"name": "Silver", "description": "Medium level", "min_points": 1000, "discount": 5.00},
                {"name": "Gold", "description": "High level", "min_points": 5000, "discount": 10.00},
                {"name": "Platinum", "description": "Top level", "min_points": 10000, "discount": 15.00}
            ]
            
            for tier_data in tiers:
                tier_id = generate_ulid()
                cur.execute("""
                    INSERT INTO tiers (id, loyalty_program_id, name, description, min_points_required, discount_percentage, created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    tier_id,
                    prog_id,
                    tier_data["name"],
                    tier_data["description"],
                    tier_data["min_points"],
                    tier_data["discount"],
                    datetime.now(),
                    datetime.now()
                ))
        
        conn.commit()
        print(f"Seeded loyalty programs with tiers.")

def seed_system_users(conn):
    """Seed initial system users."""
    with conn.cursor() as cur:
        print("Seeding system users...")
        
        # Create a system account for admin purposes
        account_id = generate_ulid()
        cur.execute("""
            INSERT INTO accounts (id, account_type, status, company_name, contact_person, email, 
                                 phone, registration_date, kyc_verified, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (email) DO UPDATE SET
                updated_at = EXCLUDED.updated_at
        """, (
            account_id,
            "COMPANY",
            "ACTIVE",
            "System Admin",
            "System Admin",
            "admin@system.local",
            "+1234567890",
            date.today(),
            True,
            datetime.now(),
            datetime.now()
        ))
        
        # Create an admin user
        user_id = generate_ulid()
        cur.execute("""
            INSERT INTO users (id, account_id, first_name, last_name, email, is_active, 
                              password_hash, salt, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (email) DO UPDATE SET
                account_id = EXCLUDED.account_id,
                updated_at = EXCLUDED.updated_at
        """, (
            user_id,
            account_id,
            "System",
            "Administrator",
            "admin@system.local",
            True,
            "placeholder_hash_for_demo",  # In real system, would be proper hash
            "placeholder_salt_for_demo",  # In real system, would be proper salt
            datetime.now(),
            datetime.now()
        ))
        
        # Assign admin role to the user
        cur.execute("""
            INSERT INTO user_roles (id, user_id, role_id, assigned_at, assigned_by)
            SELECT gen_random_ulid()::text, %s, id, %s, %s
            FROM roles
            WHERE role_name = 'ADMIN'
            ON CONFLICT (user_id, role_id) DO NOTHING
        """, (user_id, datetime.now(), "SYSTEM"))
        
        conn.commit()
        print("Seeded system admin account and user.")

def main():
    """Main function to run the seeding process."""
    print("Starting database seeding process for P4 B2B Marketplace...")
    
    try:
        conn = connect_to_db()
        print("Connected to database successfully.")
        
        # Run all seeding functions
        seed_feature_flags(conn)
        seed_permissions(conn)
        seed_roles(conn)
        seed_product_attributes(conn)
        seed_tax_registrations(conn)
        seed_loyalty_programs(conn)
        seed_system_users(conn)
        
        # Commit all changes
        conn.commit()
        print("\nDatabase seeding completed successfully!")
        
    except Exception as e:
        print(f"Error during seeding: {str(e)}")
        if 'conn' in locals():
            conn.rollback()
    finally:
        if 'conn' in locals():
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    main()