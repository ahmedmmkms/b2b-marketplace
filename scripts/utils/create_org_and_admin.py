import psycopg2
from dotenv import load_dotenv
import os
from urllib.parse import urlparse
import bcrypt

def load_db_config():
    """Load database configuration from environment variables"""
    # Use the same config as the backend app
    db_url = os.getenv('SPRING_DATASOURCE_URL', 'jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require')
    
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
            password = os.getenv('SPRING_DATASOURCE_PASSWORD', 'npg_QTE70VJgbcdp')
        
        return {
            'host': result.hostname,
            'database': result.path[1:],  # Remove leading '/'
            'user': os.getenv('SPRING_DATASOURCE_USERNAME', result.username) or 'neondb_owner',
            'password': password,
            'port': result.port or 5432,
            'sslmode': 'require'
        }

def hash_password(password):
    """Hash password using bcrypt (same as Spring Security typically does)"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def create_organization_and_user():
    connection_params = load_db_config()
    
    try:
        # Connect to the database
        print("Connecting to the database...")
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        print("Creating organization and admin user...")
        
        # Check if organization exists
        # The provided orgId "VX5X063MPY8G9VVT27PZXEY356" should be valid ULID format
        org_id = "VX5X063MPY8G9VVT27PZXEY356"
        cursor.execute("SELECT id FROM organizations WHERE id = %s", (org_id,))
        org_exists = cursor.fetchone()
        
        if not org_exists:
            # Create the organization with the provided ULID
            print(f"Creating organization with ID: {org_id}")
            cursor.execute(
                "INSERT INTO organizations (id, name, role, is_active) VALUES (%s, %s, %s, %s)",
                (org_id, "Admin Organization", "admin", True)
            )
            print(f"Created organization {org_id}")
        else:
            print(f"Organization {org_id} already exists")
        
        # Check if admin user exists
        cursor.execute("SELECT id FROM users WHERE email = %s", ("admin@admin.com",))
        user_exists = cursor.fetchone()
        
        if not user_exists:
            # Hash the password
            hashed_password = hash_password("112233445566")
            
            # Generate a valid ULID for the user ID
            import random
            import string
            ulid_chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
            user_id = ''.join(random.choices(ulid_chars, k=26))
            
            # Create the admin user
            cursor.execute(
                "INSERT INTO users (id, org_id, email, full_name, role, password_hash, is_active) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                (user_id, "VX5X063MPY8G9VVT27PZXEY356", "admin@admin.com", "admin", "admin", hashed_password, True)
            )
            print(f"Created admin user admin@admin.com with ID: {user_id}")
        else:
            print("Admin user admin@admin.com already exists")
        
        # Commit the changes
        conn.commit()
        print("Organization and admin user created successfully!")
        
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
    create_organization_and_user()