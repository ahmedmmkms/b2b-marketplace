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

def hash_password_for_spring(password):
    """Hash password using the same parameters as Spring's BCryptPasswordEncoder (cost factor 10)"""
    # Spring's default BCryptPasswordEncoder uses cost factor 10
    # bcrypt.gensalt() with rounds=10 gives the same effect
    salt = bcrypt.gensalt(rounds=10)
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def update_user_password():
    connection_params = load_db_config()
    
    try:
        # Connect to the database
        print("Connecting to the database...")
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        # Hash the password using the same method as the application
        hashed_password = hash_password_for_spring("112233445566")
        
        # Update the password for our admin user
        cursor.execute(
            "UPDATE users SET password_hash = %s WHERE email = %s",
            (hashed_password, "admin@admin.com")
        )
        
        # Check how many rows were updated
        rows_affected = cursor.rowcount
        if rows_affected > 0:
            print(f"Successfully updated password for admin@admin.com. Rows affected: {rows_affected}")
            print(f"New hash: {hashed_password}")
        else:
            print("No user found with email admin@admin.com")
            
            # Let's check if the user exists in the db
            cursor.execute("SELECT id, email, full_name FROM users WHERE email LIKE '%admin%';")
            results = cursor.fetchall()
            if results:
                print("Found admin-like users:")
                for user in results:
                    print(f"  ID: {user[0]}, Email: {user[1]}, Name: {user[2]}")
            else:
                print("No users with 'admin' in the email were found")
        
        # Commit the changes
        conn.commit()
        print("Password update completed!")
        
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
    update_user_password()