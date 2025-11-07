import psycopg2
import re

# Database credentials
DB_URL = "jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
DB_USERNAME = "neondb_owner"
DB_PASSWORD = "npg_QTE70VJgbcdp"

# Extract host, port, and database name from the JDBC URL
jdbc_match = re.match(r"jdbc:postgresql://([^:/]+)(?::(\d+))?/([^?]+)", DB_URL)
if jdbc_match:
    host = jdbc_match.group(1)
    port = jdbc_match.group(2) or "5432"
    database = jdbc_match.group(3).split('?')[0]
else:
    raise ValueError("Invalid JDBC URL format")

print(f"Checking database state: {host}:{port}, database: {database}")

try:
    # Establish connection
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=DB_USERNAME,
        password=DB_PASSWORD
    )
    
    cursor = conn.cursor()
    
    # Check if tables exist
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        ORDER BY table_name;
    """)
    
    tables = cursor.fetchall()
    print(f"Tables found: {len(tables)}")
    for table in tables:
        print(f"  - {table[0]}")
    
    # Check if the products table exists specifically
    cursor.execute("""
        SELECT EXISTS (
           SELECT FROM information_schema.tables 
           WHERE table_schema = 'public' 
           AND table_name = 'products'
        );
    """)
    
    products_exist = cursor.fetchone()[0]
    print(f"Products table exists: {products_exist}")
    
    # Check the structure of the products table if it exists
    if products_exist:
        cursor.execute("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'products'
            ORDER BY ordinal_position;
        """)
        
        columns = cursor.fetchall()
        print(f"Products table columns: {len(columns)}")
        for col in columns[:10]:  # Show first 10 columns
            print(f"  - {col[0]} ({col[1]})")
    
    # Close connections
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"Error checking database: {str(e)}")