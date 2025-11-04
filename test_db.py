import psycopg2
import os

# Test database connection
def test_db_connection():
    try:
        # Use the connection details from the application properties
        conn = psycopg2.connect(
            host='ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech',
            database='neondb',
            user=os.getenv('SPRING_DATASOURCE_USERNAME', 'neondb_owner'),
            password=os.getenv('SPRING_DATASOURCE_PASSWORD', 'npg_QTE70VJgbcdp'),
            port=5432,
            sslmode='require'
        )
        
        cursor = conn.cursor()
        
        # Test the connection by counting records
        cursor.execute('SELECT COUNT(*) FROM users;')
        user_count = cursor.fetchone()[0]
        print(f"Users count: {user_count}")
        
        # Check for specific admin user
        cursor.execute("SELECT COUNT(*) FROM users WHERE email = 'admin@admin.com';")
        admin_count = cursor.fetchone()[0]
        print(f"Admin users count: {admin_count}")
        
        if admin_count > 0:
            cursor.execute("SELECT id, org_id, email, full_name, role, password_hash FROM users WHERE email = 'admin@admin.com';")
            user_data = cursor.fetchone()
            if user_data:
                print(f"Found admin user: {user_data}")
        
        cursor.close()
        conn.close()
        print("Database test completed successfully")
        
    except Exception as e:
        print(f"Database connection error: {e}")

if __name__ == "__main__":
    test_db_connection()