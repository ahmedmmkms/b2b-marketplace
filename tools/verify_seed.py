#!/usr/bin/env python3
"""
Script to verify that vendor data was inserted correctly
"""

import psycopg2
from urllib.parse import urlparse

# Database configuration from the original seeding
DB_URL = "jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
DB_USERNAME = "neondb_owner"
DB_PASSWORD = "npg_QTE70VJgbcdp"

def parse_db_url(db_url):
    """Convert JDBC URL to standard URL format"""
    if db_url.startswith("jdbc:postgresql:"):
        db_url = db_url[12:]  # Remove "jdbc:postgresql:" prefix
    
    # Handle the specific URL format from the credentials
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
        'user': DB_USERNAME,
        'password': DB_PASSWORD,
        'sslmode': params.get('sslmode', 'require'),
        'channel_binding': params.get('channel_binding', 'require')
    }

def verify_seed():
    """Verify that vendor data was inserted correctly"""
    conn_params = parse_db_url(DB_URL)
    
    try:
        print("Connecting to the database...")
        conn = psycopg2.connect(**conn_params)
        
        with conn.cursor() as cur:
            # Count total vendors
            cur.execute('SELECT COUNT(*) FROM vendor;')
            total_count = cur.fetchone()[0]
            print(f'Total vendors in database: {total_count}')
            
            # Check for vendors with our specific email pattern
            cur.execute("SELECT id, name, contact_email, status FROM vendor WHERE contact_email LIKE %s;", ('%@vendor.com%',))
            matching_vendors = cur.fetchall()
            print(f'Vendors with @vendor.com emails: {len(matching_vendors)}')
            
            print('\nSample vendor records:')
            for vendor in matching_vendors[:5]:  # Show first 5
                print(f'  ID: {vendor[0]}, Name: {vendor[1]}, Email: {vendor[2]}, Status: {vendor[3]}')
            
            print(f'\nProcess completed successfully. {len(matching_vendors)} vendor records found with vendor.com emails.')
        
        conn.close()
        
    except psycopg2.Error as e:
        print(f"Database error occurred: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    verify_seed()