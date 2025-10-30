import psycopg2
from dotenv import load_dotenv
import os
from urllib.parse import urlparse

def load_db_config():
    """Load database configuration from .env file"""
    load_dotenv()
    
    # Parse the DB_URL from .env file or use direct credentials
    db_url = os.getenv('DB_URL', 'jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require')
    
    # Handle JDBC URL format (jdbc:postgresql://...)
    if db_url.startswith('jdbc:'):
        # Remove 'jdbc:' prefix to get standard PostgreSQL URL
        pg_url = db_url[5:]  # Remove 'jdbc:' prefix
        
        # Handle query parameters in JDBC URL
        if '?' in pg_url:
            pg_url, query_params = pg_url.split('?', 1)
        else:
            query_params = ""
            
        # Parse the PostgreSQL URL
        result = urlparse(pg_url)
        
        # Extract credentials from URL components
        password = result.password
        # If password not in URL, try to get from environment
        if not password:
            password = os.getenv('DB_PASSWORD', 'npg_QTE70VJgbcdp')
        
        return {
            'host': result.hostname,
            'database': result.path[1:],  # Remove leading '/'
            'user': os.getenv('DB_USERNAME', result.username) or 'neondb_owner',
            'password': password,
            'port': result.port or 5432,
            'sslmode': 'require'
        }
    else:
        # Standard PostgreSQL URL
        result = urlparse(db_url)
        
        # Extract credentials from URL components
        password = result.password
        # If password not in URL, try to get from environment
        if not password:
            password = os.getenv('DB_PASSWORD', 'npg_QTE70VJgbcdp')
        
        return {
            'host': result.hostname,
            'database': result.path[1:],  # Remove leading '/'
            'user': os.getenv('DB_USERNAME', result.username) or 'neondb_owner',
            'password': password,
            'port': result.port or 5432,
            'sslmode': 'require'
        }

def verify_tables():
    connection_params = load_db_config()

    try:
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        # List of tables to verify
        tables = [
            'organizations', 'users', 'products', 'rfqs', 
            'rfq_lines', 'quotes', 'quote_lines', 'orders', 
            'order_lines', 'wallets', 'wallet_transactions', 
            'payments', 'feature_flags'
        ]
        
        print("Verifying database schema and data...")
        print("="*50)
        
        for table in tables:
            # Check if table exists
            cursor.execute("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = %s);", (table,))
            table_exists = cursor.fetchone()[0]
            
            if table_exists:
                # Count number of records in the table
                cursor.execute(f"SELECT COUNT(*) FROM {table};")
                record_count = cursor.fetchone()[0]
                print(f"[SUCCESS] {table}: exists, {record_count} records")
            else:
                print(f"[ERROR] {table}: does not exist")
        
        print("="*50)
        print("Verification completed successfully.")
        
        # Test the rfq_quote_summary view
        print("\nTesting rfq_quote_summary view...")
        try:
            cursor.execute("SELECT * FROM rfq_quote_summary LIMIT 5;")
            view_results = cursor.fetchall()
            print(f"[SUCCESS] rfq_quote_summary view: exists, {len(view_results)} records")
        except Exception as e:
            print(f"[ERROR] rfq_quote_summary view: error - {e}")
        
        conn.close()
    except Exception as e:
        print(f'Error: {e}')

if __name__ == "__main__":
    verify_tables()