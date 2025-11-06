import psycopg2
from dotenv import load_dotenv
import os
from urllib.parse import urlparse
import sqlparse

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

def execute_sql_file(file_path):
    """Execute SQL commands from a file"""
    connection_params = load_db_config()
    
    try:
        # Connect to the database
        print(f"Connecting to the database to execute {file_path}...")
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        # Read SQL file content
        with open(file_path, 'r') as file:
            sql_content = file.read()
        
        # Parse and execute SQL statements
        statements = sqlparse.split(sql_content)
        
        for i, statement in enumerate(statements):
            statement = statement.strip()
            if statement:  # Skip empty statements
                print(f"Executing statement {i+1}: {statement[:50]}...")
                cursor.execute(statement)
        
        # Commit the changes
        conn.commit()
        print(f"Successfully executed {file_path}!")
        
    except psycopg2.Error as e:
        print(f"Database error when executing {file_path}: {e}")
        if 'conn' in locals():
            conn.rollback()
        raise
    except Exception as e:
        print(f"Error when executing {file_path}: {e}")
        raise
    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'conn' in locals() and conn:
            conn.close()
        print("Database connection closed.")

def test_tables_exist():
    """Test that the expected tables exist"""
    connection_params = load_db_config()
    
    try:
        print("Connecting to the database to test tables...")
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        tables_to_check = [
            'organizations', 'users', 'products', 'feature_flags',  # V001 & V002 & V003
            'rfqs', 'rfq_lines', 'quotes', 'quote_lines',          # V004
            'orders', 'order_lines', 'wallets', 'wallet_transactions', 'payments'  # V005
        ]
        
        for table in tables_to_check:
            cursor.execute("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = %s);", (table,))
            exists = cursor.fetchone()[0]
            if exists:
                print(f"[OK] Table {table} exists")
            else:
                print(f"[MISSING] Table {table} does NOT exist")
        
        print("Table existence check completed!")
        
    except psycopg2.Error as e:
        print(f"Database error during table check: {e}")
        raise
    except Exception as e:
        print(f"Error during table check: {e}")
        raise
    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'conn' in locals() and conn:
            conn.close()
        print("Database connection closed.")

if __name__ == "__main__":
    print("Testing V004 and V005 migrations...")
    
    print("\nExecuting V004 migration (RFQ and Quotes)...")
    execute_sql_file('scripts/db/migrations/V004__rfq_and_quotes.sql')
    
    print("\nExecuting V005 migration (Orders, Wallets, Payments)...")
    execute_sql_file('scripts/db/migrations/V005__orders_wallets_payments.sql')
    
    print("\nChecking that all tables exist...")
    test_tables_exist()
    
    print("\nAll migrations executed successfully!")