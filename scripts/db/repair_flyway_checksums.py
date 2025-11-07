import psycopg2
import hashlib
import os
from pathlib import Path


def calculate_file_checksum(file_path):
    """Calculate SHA-256 checksum of a file like Flyway does"""
    with open(file_path, 'rb') as f:
        file_content = f.read()
        # Calculate SHA-256 hash
        checksum = hashlib.sha256(file_content).hexdigest()
        # Convert to signed 32-bit integer (like Flyway does)
        checksum_int = int(checksum, 16) % (2**32)
        if checksum_int >= 2**31:
            checksum_int -= 2**32
        return checksum_int


def connect_and_update_checksum():
    """Connect to the database and update Flyway checksum"""
    # Database connection parameters
    # These should match what's in your application.yml for prod profile
    connection_params = {
        'host': os.getenv('DB_HOST', 'ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech'),
        'database': os.getenv('DB_NAME', 'neondb'),
        'user': os.getenv('DB_USERNAME', 'neondb_owner'),
        'password': os.getenv('DB_PASSWORD', 'npg_QTE70VJgbcdp'),  # Consider using a more secure method
        'port': os.getenv('DB_PORT', '5432'),
        'sslmode': 'require'
    }
    
    # Construct the full database URL
    db_url = os.getenv('DB_URL', f"jdbc:postgresql://{connection_params['host']}/{connection_params['database']}?sslmode=require&channel_binding=require")
    
    # If DB_URL is set, parse it to extract connection parameters
    if db_url and db_url.startswith('jdbc:postgresql:'):
        import re
        # Extract connection parameters from JDBC URL
        jdbc_match = re.match(r'jdbc:postgresql://([^/]+)/([^?]+)(?:\?(.+))?', db_url)
        if jdbc_match:
            host_port = jdbc_match.group(1)
            db_name = jdbc_match.group(2)
            params = jdbc_match.group(3)
            
            # Handle host and port
            if ':' in host_port:
                host, port = host_port.split(':')
                connection_params['host'] = host
                connection_params['port'] = port
            else:
                connection_params['host'] = host_port
            
            connection_params['database'] = db_name
    
    # Migration file path
    migration_file_path = Path('D:/Projects/b2b-marketplace/backend/src/main/resources/db/migration/V1__baseline_schema.sql')
    
    # Calculate the checksum of the local file
    if not migration_file_path.exists():
        print(f"Migration file not found: {migration_file_path}")
        return False
    
    local_checksum = calculate_file_checksum(migration_file_path)
    print(f"Calculated local checksum: {local_checksum}")
    
    try:
        # Connect to the database
        print(f"Connecting to database: {connection_params['host']}/{connection_params['database']}")
        conn = psycopg2.connect(**connection_params)
        cur = conn.cursor()
        
        # Get current checksum from flyway_schema_history
        cur.execute("""
            SELECT version, checksum, description, installed_on 
            FROM flyway_schema_history 
            WHERE version = '1';
        """)
        
        result = cur.fetchone()
        if result:
            version, db_checksum, description, installed_on = result
            print(f"Database checksum for version {version}: {db_checksum}")
            print(f"Description: {description}")
            print(f"Installed on: {installed_on}")
            
            if db_checksum == local_checksum:
                print("Checksums already match. No update needed.")
                return True
            else:
                print(f"Checksum mismatch detected:")
                print(f"  Database checksum: {db_checksum}")
                print(f"  Local checksum:    {local_checksum}")
                
                # Update the checksum
                cur.execute("""
                    UPDATE flyway_schema_history 
                    SET checksum = %s
                    WHERE version = '1';
                """, (local_checksum,))
                
                conn.commit()
                print(f"Checksum successfully updated to: {local_checksum}")
                return True
        else:
            print("No migration with version '1' found in flyway_schema_history.")
            return False
    
    except psycopg2.Error as e:
        print(f"Database error: {e}")
        if 'conn' in locals():
            conn.rollback()
        return False
    
    except Exception as e:
        print(f"Error: {e}")
        if 'conn' in locals():
            conn.rollback()
        return False
    
    finally:
        # Close database connection
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
        print("Database connection closed.")


if __name__ == "__main__":
    print("Flyway checksum repair script")
    print("=============================")
    success = connect_and_update_checksum()
    
    if success:
        print("\nFlyway checksum repair completed successfully!")
    else:
        print("\nFlyway checksum repair failed!")
        exit(1)