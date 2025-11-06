import bcrypt
import psycopg2
import os

def test_password():
    try:
        # Connect to the database
        conn = psycopg2.connect(
            host='ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech',
            database='neondb',
            user=os.getenv('SPRING_DATASOURCE_USERNAME', 'neondb_owner'),
            password=os.getenv('SPRING_DATASOURCE_PASSWORD', 'npg_QTE70VJgbcdp'),
            port=5432,
            sslmode='require'
        )
        
        cursor = conn.cursor()
        
        # Get the hashed password
        cursor.execute("SELECT password_hash FROM users WHERE email = 'admin@admin.com';")
        result = cursor.fetchone()
        
        if result:
            stored_hash = result[0]
            print(f"Stored hash: {stored_hash}")
            
            # Test if the password matches
            password_to_test = "112233445566"
            is_match = bcrypt.checkpw(password_to_test.encode('utf-8'), stored_hash.encode('utf-8'))
            
            print(f"Password matches: {is_match}")
            
            if is_match:
                print("Password verification successful - the credentials should work")
            else:
                print("Password verification failed - the credentials won't work")
        else:
            print("Admin user not found")
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_password()