#!/usr/bin/env python3
"""
Script to seed the production database with vendor data directly using Python
This bypasses the application's seeding process that's causing issues in production
"""

import os
import psycopg2
from datetime import datetime, timedelta
import random
from urllib.parse import urlparse
import time
import secrets

# Database configuration
DB_URL = "jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
DB_USERNAME = "neondb_owner"
DB_PASSWORD = "npg_QTE70VJgbcdp"

def parse_db_url(db_url):
    """Convert JDBC URL to psycopg2 connection parameters"""
    # Convert JDBC URL to standard URL format
    if db_url.startswith("jdbc:postgresql:"):
        db_url = db_url[12:]  # Remove "jdbc:postgresql:" prefix
    
    parsed = urlparse(f"postgres://{DB_USERNAME}:{DB_PASSWORD}@{db_url}")
    
    # Extract host, port, and database name
    path_parts = parsed.path.split('/')
    database_name = path_parts[1] if len(path_parts) > 1 else 'neondb'
    
    # Parse query parameters
    params = {}
    if parsed.query:
        for param in parsed.query.split('&'):
            key, value = param.split('=', 1) if '=' in param else (param, None)
            params[key] = value
    
    return {
        'host': parsed.hostname,
        'port': parsed.port or 5432,
        'database': database_name,
        'user': DB_USERNAME,
        'password': DB_PASSWORD,
        'sslmode': params.get('sslmode', 'require'),
        'channel_binding': params.get('channel_binding', 'require')
    }

def get_connection_params():
    """Get database connection parameters"""
    # Use environment variables if available, otherwise use defaults
    db_url = os.getenv('DB_URL', DB_URL)
    db_username = os.getenv('DB_USERNAME', DB_USERNAME)
    db_password = os.getenv('DB_PASSWORD', DB_PASSWORD)
    
    # Update the default values with environment variables
    if db_url != DB_URL:
        parsed_params = parse_db_url(db_url)
        parsed_params['user'] = os.getenv('DB_USERNAME', parsed_params['user'])
        parsed_params['password'] = os.getenv('DB_PASSWORD', parsed_params['password'])
        return parsed_params
    else:
        # Handle the specific URL format manually
        host_and_path = "ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
        host_path_split = host_and_path.split('/', 1)
        host = host_path_split[0]
        path_and_params = host_path_split[1].split('?', 1)
        database = path_and_params[0]
        
        params = {}
        if len(path_and_params) > 1:
            for param in path_and_params[1].split('&'):
                key, value = param.split('=', 1)
                params[key] = value
        
        return {
            'host': host,
            'port': 5432,
            'database': database,
            'user': db_username,
            'password': db_password,
            'sslmode': params.get('sslmode', 'require'),
            'channel_binding': params.get('channel_binding', 'require')
        }

def generate_ulid():
    """Generate a ULID (Universally Unique Lexicographically Sortable Identifier) manually"""
    # ULIDs are 26 characters long, composed of:
    # - 10 characters for timestamp (48-bit integer)
    # - 16 characters for random data (80-bit integer)
    
    # Get the current time in milliseconds since Unix epoch
    timestamp_ms = int(time.time() * 1000)
    
    # Convert to 10-character Crockford's Base32 encoded string (timestamp part)
    encoding = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
    timestamp_part = ""
    temp_timestamp = timestamp_ms
    for _ in range(10):
        timestamp_part = encoding[temp_timestamp % 32] + timestamp_part
        temp_timestamp //= 32
    
    # Generate 16 characters for the random part using Crockford's Base32
    random_part = ""
    random_bytes = secrets.token_bytes(10)  # 80 bits = 10 bytes
    random_int = int.from_bytes(random_bytes, byteorder='big')
    
    for _ in range(16):
        random_part = encoding[random_int % 32] + random_part
        random_int //= 32
    
    return timestamp_part + random_part

def check_vendors_table_exists(conn):
    """Check if the vendors table exists in the database"""
    with conn.cursor() as cur:
        # Check for the table name that matches Java entity mapping
        cur.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'vendors'
            );
        """)
        vendors_exists = cur.fetchone()[0]
        
        if vendors_exists:
            return 'vendors'
        
        # Check for the singular vendor table name from the migration
        cur.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'vendor'
            );
        """)
        vendor_exists = cur.fetchone()[0]
        
        if vendor_exists:
            return 'vendor'
        
        # Check for any table that might contain vendor information
        cur.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name ILIKE '%vendor%';
        """)
        tables = cur.fetchall()
        if tables:
            return tables[0][0]  # Return the first table that matches
        
        return None

def generate_vendor_data():
    """Generate sample vendor data matching the VendorSeeder logic"""
    # Sample business names for vendors
    business_names = [
        "Tech Innovations LLC", "Global Supplies Co.", "Premium Goods Inc.", 
        "Electronics Hub", "Industrial Parts Pro", "Fashion Forward Ltd.", 
        "Home Essentials", "Office Solutions", "Auto Parts Direct", 
        "Garden & Yard Co.", "Health & Wellness Corp", "Sports Gear Inc."
    ]
    
    # Sample addresses
    addresses = [
        "123 Tech Street, San Francisco, CA 94103",
        "456 Commerce Blvd, New York, NY 10001", 
        "789 Industrial Way, Chicago, IL 60601",
        "321 Market Road, Seattle, WA 98101",
        "654 Business Ave, Boston, MA 02108",
        "987 Trade Plaza, Austin, TX 73301",
        "147 Supply Lane, Denver, CO 80202",
        "258 Distribution Dr, Miami, FL 33101",
        "369 Manufacturing Rd, Detroit, MI 48201",
        "741 Logistics Way, Atlanta, GA 30303"
    ]
    
    vendors = []
    for i, name in enumerate(business_names):
        # Generate a clean email based on the business name
        clean_name = ''.join(e for e in name if e.isalnum()).lower()
        email = f"{clean_name}@vendor.com"
        
        # Generate realistic US phone number
        area_code = 200 + random.randint(0, 800)
        exchange = 200 + random.randint(0, 800)
        number = 1000 + random.randint(0, 9000)
        phone = f"+1{area_code}{exchange}{number}"
        
        # Generate dates within last 3 years
        registration_date = datetime.now() - timedelta(days=random.randint(0, 365 * 3))
        kyc_verified_at = datetime.now() - timedelta(days=random.randint(0, 180))
        
        vendor = {
            'business_name': name,
            'email': email,
            'phone': phone,
            'address': addresses[i % len(addresses)],
            'tax_id': f"TAX{str(i+1).zfill(6)}",
            'business_license_no': f"BL{str(i+1).zfill(8)}",
            'registration_date': registration_date.date(),
            'vendor_status': 'APPROVED',
            'kyc_verified': True,
            'kyc_verified_at': kyc_verified_at.date(),
            'kyc_verified_by': 'System Admin',
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }
        vendors.append(vendor)
    
    return vendors

def seed_vendors_table(conn, table_name):
    """Insert vendor data into the database"""
    vendors = generate_vendor_data()
    
    with conn.cursor() as cur:
        # Check if vendors already exist to avoid duplicates
        if table_name == 'vendor':
            # For the 'vendor' table (singular), the column name is 'contact_email'
            cur.execute(f"SELECT COUNT(*) FROM {table_name} WHERE contact_email LIKE %s;", ('%@vendor.com%',))
        else:
            # For the 'vendors' table (plural), the column name is 'email'
            cur.execute(f"SELECT COUNT(*) FROM {table_name} WHERE email LIKE %s;", ('%@vendor.com%',))
        existing_vendor_count = cur.fetchone()[0]
        
        if existing_vendor_count > 0:
            print(f"Found {existing_vendor_count} existing vendors with vendor.com emails. Skipping seeding.")
            return
        
        # Insert vendor data
        for vendor in vendors:
            # For the 'vendor' table (singular), the column names are different
            if table_name == 'vendor':
                # The vendor table from migration has different columns
                # Generate a ULID manually (26-character string)
                ulid = generate_ulid()
                
                insert_sql = """
                    INSERT INTO vendor (
                        id, name, description, contact_email, 
                        contact_phone, address, tax_number, status, 
                        created_at, updated_at
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                    );
                """
                
                # Map the values to the 'vendor' table structure
                import json
                # For the 'vendor' table, use 'ACTIVE' instead of 'APPROVED' due to check constraint
                vendor_status = 'ACTIVE' if vendor['vendor_status'] == 'APPROVED' else vendor['vendor_status']
                
                cur.execute(insert_sql, (
                    ulid,  # id
                    vendor['business_name'],  # name
                    f"Description for {vendor['business_name']}",  # description
                    vendor['email'],  # contact_email
                    vendor['phone'],  # contact_phone
                    json.dumps({"full_address": vendor['address']}),  # address as JSON string
                    vendor['tax_id'],  # tax_number
                    vendor_status,  # status - using value compatible with vendor table
                    vendor['created_at'],  # created_at
                    vendor['updated_at']   # updated_at
                ))
            else:
                # For a 'vendors' table (plural), use the correct column names
                ulid = generate_ulid()
                
                insert_sql = f"""
                    INSERT INTO {table_name} (
                        id, business_name, email, phone, address, 
                        tax_id, business_license_no, registration_date, 
                        vendor_status, kyc_verified, kyc_verified_at, 
                        kyc_verified_by, created_at, updated_at
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                    );
                """
                
                cur.execute(insert_sql, (
                    ulid,  # id
                    vendor['business_name'],  # business_name
                    vendor['email'],  # email
                    vendor['phone'],  # phone
                    vendor['address'],  # address
                    vendor['tax_id'],  # tax_id
                    vendor['business_license_no'],  # business_license_no
                    vendor['registration_date'],  # registration_date
                    vendor['vendor_status'],  # vendor_status
                    vendor['kyc_verified'],  # kyc_verified
                    vendor['kyc_verified_at'],  # kyc_verified_at
                    vendor['kyc_verified_by'],  # kyc_verified_by
                    vendor['created_at'],  # created_at
                    vendor['updated_at']   # updated_at
                ))
    
    conn.commit()
    print(f"Successfully seeded {len(vendors)} vendors into the {table_name} table.")

def main():
    """Main function to connect to database and seed data"""
    try:
        # Get connection parameters
        conn_params = get_connection_params()
        
        # Connect to the database
        print("Connecting to the database...")
        conn = psycopg2.connect(**conn_params)
        
        # Check which table name to use
        table_name = check_vendors_table_exists(conn)
        if not table_name:
            print("No vendors table found in the database!")
            conn.close()
            return
        
        print(f"Found vendors table: {table_name}")
        
        # Seed the vendors table
        seed_vendors_table(conn, table_name)
        
        # Close the connection
        conn.close()
        print("Database connection closed.")
        
    except psycopg2.Error as e:
        print(f"Database error occurred: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()