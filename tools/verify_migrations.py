import psycopg2
from dotenv import load_dotenv
import os
from urllib.parse import urlparse

def load_db_config():
    """Load database configuration from .env file"""
    load_dotenv()
    
    # Parse the DB_URL from .env file
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
        password = result.password or os.getenv('DB_PASSWORD', 'npg_QTE70VJgbcdp')
        
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
        password = result.password or os.getenv('DB_PASSWORD', 'npg_QTE70VJgbcdp')
        
        return {
            'host': result.hostname,
            'database': result.path[1:],  # Remove leading '/'
            'user': os.getenv('DB_USERNAME', result.username) or 'neondb_owner',
            'password': password,
            'port': result.port or 5432,
            'sslmode': 'require'
        }

def test_migrations():
    """Test that the expected tables and views exist"""
    connection_params = load_db_config()
    
    try:
        print("Connecting to the database to test tables and views...")
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        # Check tables
        tables_to_check = [
            'organizations', 'users', 'products', 'feature_flags',  # V001 & V002 & V003
            'rfqs', 'rfq_lines', 'quotes', 'quote_lines',          # V004
            'orders', 'order_lines', 'wallets', 'wallet_transactions', 'payments'  # V005
        ]
        
        print("\nChecking tables...")
        for table in tables_to_check:
            cursor.execute("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = %s);", (table,))
            exists = cursor.fetchone()[0]
            if exists:
                print(f"[OK] Table {table} exists")
            else:
                print(f"[MISSING] Table {table} does NOT exist")
        
        # Check view
        print("\nChecking views...")
        cursor.execute("SELECT EXISTS (SELECT FROM information_schema.views WHERE table_name = 'rfq_quote_summary');")
        exists = cursor.fetchone()[0]
        if exists:
            print("[OK] View rfq_quote_summary exists")
        else:
            print("[MISSING] View rfq_quote_summary does NOT exist")
        
        # Check indexes
        print("\nChecking indexes...")
        indexes_to_check = [
            'rfqs_buyer_idx',
            'rfq_lines_rfq_idx',
            'quotes_rfq_idx',
            'quote_lines_quote_idx',
            'orders_quote_unique',
            'orders_buyer_idx',
            'wallets_org_idx',
            'wallet_tx_wallet_idx',
            'products_vendor_sku_uniq',
            'products_name_trgm',
            'products_attrs_gin',
            'users_org_idx'
        ]
        
        for index in indexes_to_check:
            cursor.execute("SELECT EXISTS (SELECT FROM pg_indexes WHERE indexname = %s);", (index,))
            exists = cursor.fetchone()[0]
            if exists:
                print(f"[OK] Index {index} exists")
            else:
                print(f"[MISSING] Index {index} does NOT exist")
        
        print("\nMigration verification completed successfully!")
        
    except psycopg2.Error as e:
        print(f"Database error during verification: {e}")
        raise
    except Exception as e:
        print(f"Error during verification: {e}")
        raise
    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'conn' in locals() and conn:
            conn.close()
        print("\nDatabase connection closed.")

if __name__ == "__main__":
    test_migrations()