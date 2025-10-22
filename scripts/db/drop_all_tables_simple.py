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

print(f"Dropping all tables from: {host}:{port}, database: {database}")

try:
    # Establish connection
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=DB_USERNAME,
        password=DB_PASSWORD
    )
    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    
    cursor = conn.cursor()
    
    # Get a list of all user-defined tables in the public schema
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
    """)
    
    tables = cursor.fetchall()
    
    # Drop all foreign key constraints first
    print("Dropping all foreign key constraints...")
    cursor.execute("""
        SELECT 
            'ALTER TABLE ' || quote_ident(table_name) || 
            ' DROP CONSTRAINT ' || quote_ident(constraint_name) || ';'
        FROM information_schema.table_constraints 
        WHERE constraint_type = 'FOREIGN KEY' 
        AND table_schema = 'public';
    """)
    
    constraints = cursor.fetchall()
    for constraint_sql in constraints:
        try:
            cursor.execute(constraint_sql[0])
            print(f"Dropped constraint: {constraint_sql[0]}")
        except Exception as e:
            print(f"Could not drop constraint: {str(e)}")
    
    # Drop all tables
    print("Dropping all tables...")
    for table in tables:
        try:
            table_name = table[0]
            cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE")
            print(f"Dropped table: {table_name}")
        except Exception as e:
            print(f"Could not drop table {table_name}: {str(e)}")
    
    print("All tables dropped successfully!")
    
    # Close connections
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"Error dropping tables: {str(e)}")