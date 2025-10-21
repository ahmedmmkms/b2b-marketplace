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
    
    # Disable triggers temporarily to avoid issues with dependencies
    print("Disabling all triggers...")
    cursor.execute("""
        SELECT 'ALTER TABLE ' || quote_ident(schemaname) || '.' || quote_ident(tablename) || 
        ' DISABLE TRIGGER ALL;' 
        FROM pg_tables 
        WHERE schemaname = 'public'
    """)
    triggers = cursor.fetchall()
    for trigger_sql in triggers:
        cursor.execute(trigger_sql[0])
    
    # Get all foreign key constraints and drop them
    print("Dropping all foreign key constraints...")
    cursor.execute("""
        SELECT 'ALTER TABLE ' || quote_ident(tc.table_schema) || '.' || quote_ident(tc.table_name) || 
        ' DROP CONSTRAINT ' || quote_ident(tc.constraint_name) || ';'
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage ccu
        ON ccu.constraint_name = tc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_schema = 'public';
    """)
    fkeys = cursor.fetchall()
    for fk_sql in fkeys:
        cursor.execute(fk_sql[0])
    
    # Drop all tables
    print("Dropping all tables...")
    cursor.execute("DROP SCHEMA public CASCADE;")
    cursor.execute("CREATE SCHEMA public;")
    cursor.execute("GRANT ALL ON SCHEMA public TO neondb_owner;")
    cursor.execute("GRANT ALL ON SCHEMA public TO public;")
    
    print("All tables dropped successfully!")
    
    # Close connections
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"Error dropping tables: {str(e)}")