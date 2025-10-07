import psycopg2
from dotenv import load_dotenv
import os
from urllib.parse import urlparse

def load_db_config():
    """Load database configuration from .env file"""
    load_dotenv()
    
    # Parse the DB_URL from .env file
    db_url = os.getenv('DB_URL')
    if not db_url:
        raise ValueError("DB_URL not found in .env file")
    
    # Parse the PostgreSQL URL
    result = urlparse(db_url)
    
    return {
        'host': result.hostname,
        'database': result.path[1:],  # Remove leading '/'
        'user': result.username,
        'password': result.password,
        'port': result.port,
        'sslmode': 'require',
        'channel_binding': 'require'
    }

def verify_all_tables():
    connection_params = load_db_config()

    try:
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        # Check all tables exist
        tables_to_check = ['vendor', 'product', 'product_attribute', 'product_attribute_value', 'media_asset', 'product_media']
        
        print("Checking if all tables exist:")
        for table in tables_to_check:
            cursor.execute("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = %s);", (table,))
            table_exists = cursor.fetchone()[0]
            print(f'  {table}: {"Exists" if table_exists else "Missing"}')
        
        print("\nVerification completed successfully.")
        
        # Show counts of each table
        print("\nTable record counts:")
        for table in tables_to_check:
            cursor.execute(f"SELECT COUNT(*) FROM {table};")
            count = cursor.fetchone()[0]
            print(f'  {table}: {count}')
        
        conn.close()
        print("\nAll verifications completed!")
    except Exception as e:
        print(f'Error: {e}')

if __name__ == "__main__":
    verify_all_tables()