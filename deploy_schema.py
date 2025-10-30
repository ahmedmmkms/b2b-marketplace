import psycopg2
from dotenv import load_dotenv
import os
from urllib.parse import urlparse
import sqlparse

def load_db_config():
    """Load database configuration from .env file"""
    load_dotenv()
    
    # Parse the DB_URL from .env file
    db_url = os.getenv('DB_URL')
    if not db_url:
        # Use direct connection if DB_URL not in .env
        db_url = 'jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
    
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

def execute_sql_file(file_path):
    """Execute SQL commands from a file"""
    connection_params = load_db_config()
    
    try:
        # Connect to the database
        print("Connecting to the database...")
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        # Read SQL file content
        with open(file_path, 'r') as file:
            sql_content = file.read()
        
        # Parse and execute SQL statements
        statements = sqlparse.split(sql_content)
        
        for statement in statements:
            statement = statement.strip()
            if statement:  # Skip empty statements
                print(f"Executing: {statement[:50]}...")
                cursor.execute(statement)
        
        # Commit the changes
        conn.commit()
        print("Schema deployed successfully!")
        
    except psycopg2.Error as e:
        print(f"Database error: {e}")
        if 'conn' in locals():
            conn.rollback()
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'conn' in locals() and conn:
            conn.close()
        print("Database connection closed.")

if __name__ == "__main__":
    execute_sql_file('db_schema.sql')