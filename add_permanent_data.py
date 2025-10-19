#!/usr/bin/env python3
"""
Script to permanently add data to database tables that need it for production
This ensures the application has the necessary data to run without seeders
"""

import os
import psycopg2
from urllib.parse import urlparse
import random
import time
import secrets
from datetime import datetime, timedelta
import json

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

def check_table_exists_and_has_data(conn, table_name):
    """Check if a table exists and has any data"""
    with conn.cursor() as cur:
        # Check if table exists
        cur.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = %s
            );
        """, (table_name,))
        table_exists = cur.fetchone()[0]
        
        if not table_exists:
            return False, 0
        
        # Check count of records
        cur.execute(f"SELECT COUNT(*) FROM {table_name};")
        count = cur.fetchone()[0]
        return True, count

def add_product_attributes_data(conn):
    """Add permanent product attributes data to the database"""
    print("Adding product attributes data...")
    
    # Define attribute definitions
    attribute_definitions = [
        {
            "name": "color",
            "display_name": "Color",
            "description": "The color of the product",
            "type": "SELECT",
            "required": True,
            "filterable": True
        },
        {
            "name": "size",
            "display_name": "Size",
            "description": "The size of the product",
            "type": "SELECT",
            "required": True,
            "filterable": True
        },
        {
            "name": "material",
            "display_name": "Material",
            "description": "The material of the product",
            "type": "SELECT",
            "required": False,
            "filterable": True
        },
        {
            "name": "weight",
            "display_name": "Weight",
            "description": "The weight of the product in grams",
            "type": "NUMBER",
            "required": False,
            "filterable": False
        },
        {
            "name": "brand",
            "display_name": "Brand",
            "description": "The brand of the product",
            "type": "TEXT",
            "required": False,
            "filterable": True
        }
    ]
    
    with conn.cursor() as cur:
        # Check if attributes already exist
        cur.execute("SELECT COUNT(*) FROM product_attributes;")
        existing_count = cur.fetchone()[0]
        
        if existing_count > 0:
            print(f"Found {existing_count} existing product attributes. Skipping insertion.")
            return
        
        # Insert product attributes
        for i, attr_def in enumerate(attribute_definitions):
            attr_id = generate_ulid()
            cur.execute("""
                INSERT INTO product_attributes (
                    id, name, display_name, description, attribute_type, 
                    is_required, is_filterable, is_searchable, sort_order,
                    created_at, updated_at
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                attr_id,
                attr_def["name"],
                attr_def["display_name"],
                attr_def["description"],
                attr_def["type"],
                attr_def["required"],
                attr_def["filterable"],
                True,  # is_searchable
                i + 1,
                datetime.now(),
                datetime.now()
            ))
        
        conn.commit()
        print(f"Added {len(attribute_definitions)} product attributes")

def add_media_assets_data(conn):
    """Add permanent media assets data to the database"""
    print("Adding media assets data...")
    
    with conn.cursor() as cur:
        # Check if media assets already exist
        cur.execute("SELECT COUNT(*) FROM media_assets;")
        existing_count = cur.fetchone()[0]
        
        if existing_count > 0:
            print(f"Found {existing_count} existing media assets. Skipping insertion.")
            return
        
        # Check if we have products to link media to
        cur.execute("SELECT id FROM products LIMIT 50;")  # Get up to 50 products
        products = [row[0] for row in cur.fetchall()]
        
        if not products:
            print("No products found. Media assets require products to link to. Skipping.")
            return
        
        # Insert sample media assets
        media_assets = []
        for i in range(100):  # Create 100 sample media assets
            media_id = generate_ulid()
            filename = f"product_{str(i+1).zfill(3)}.jpg"
            media_assets.append({
                'id': media_id,
                'filename': filename,
                'path': f"/images/products/{filename}",
                'content_type': 'image/jpeg',
                'size': 100000 + (i * 5000),  # Between 100KB and 500KB
                'alt_text': f"Image for product {i+1}",
                'caption': f"Caption for product image {i+1}"
            })
        
        # Insert media assets
        for asset in media_assets:
            media_category = asset['content_type'].split('/')[0].upper()
            media_type = 'IMAGE' if media_category == 'IMAGE' else (
                'VIDEO' if media_category == 'VIDEO' else (
                    'DOCUMENT' if media_category in ('APPLICATION', 'TEXT') else 'OTHER'
                )
            )
            cur.execute("""
                INSERT INTO media_assets (
                    id, name, original_filename, storage_path, content_type, 
                    file_size, alt_text, title, caption, media_type, 
                    status, is_primary, upload_date, created_at, updated_at
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                asset['id'],
                asset['filename'],
                asset['filename'],
                asset['path'],
                asset['content_type'],
                asset['size'],
                asset['alt_text'],
                asset['filename'],  # title
                asset['caption'],
                media_type,
                'ACTIVE',  # status
                False,  # is_primary
                datetime.now(),
                datetime.now(),
                datetime.now()
            ))
        
        # Link some media assets to products
        for i, product_id in enumerate(products):
            # Each product gets 1-3 media assets
            num_media = min(3, len(media_assets) - i*3)  # Ensure we have enough media assets
            for j in range(min(3, num_media)):  # Each product gets up to 3 media assets
                if i*3 + j < len(media_assets):
                    media_asset_id = media_assets[i*3 + j]['id']
                    media_id = generate_ulid()
                    cur.execute("""
                        INSERT INTO product_media (
                            id, product_id, media_asset_id, display_order, 
                            is_primary, alt_text_override, created_at, updated_at
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """, (
                        media_id,
                        product_id,
                        media_asset_id,
                        j + 1,
                        j == 0,
                        None,
                        datetime.now(),
                        datetime.now()
                    ))
        
        conn.commit()
        print(f"Added {len(media_assets)} media assets and linked them to products")

def main():
    """Main function to connect to database and add permanent data"""
    try:
        # Get connection parameters
        conn_params = get_connection_params()
        
        # Connect to the database
        print("Connecting to the database...")
        conn = psycopg2.connect(**conn_params)
        
        # Add product attributes data
        add_product_attributes_data(conn)
        
        # Add media assets data
        add_media_assets_data(conn)
        
        # Close the connection
        conn.close()
        print("Database connection closed.")
        print("Permanent data added successfully to production database.")
        
    except psycopg2.Error as e:
        print(f"Database error occurred: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
