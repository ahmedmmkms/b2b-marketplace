import psycopg2
import os

def update_user_role():
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
        
        # Update the role from 'admin' to 'buyer' temporarily to see if that fixes the issue
        cursor.execute(
            "UPDATE users SET role = 'buyer' WHERE email = 'admin@admin.com'"
        )
        
        rows_affected = cursor.rowcount
        print(f"Updated {rows_affected} user(s) role to 'buyer'")
        
        # Verify the change
        cursor.execute("SELECT id, email, role FROM users WHERE email = 'admin@admin.com';")
        result = cursor.fetchone()
        if result:
            print(f"Updated user: ID={result[0]}, Email={result[1]}, Role={result[2]}")
        
        conn.commit()
        cursor.close()
        conn.close()
        print("Role update completed!")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_user_role()