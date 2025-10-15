import psycopg2

def verify_table():
    connection_params = {
        'host': 'ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech',
        'database': 'neondb',
        'user': 'neondb_owner',
        'password': os.getenv('DB_PASSWORD', ''),
        'sslmode': 'require',
        'channel_binding': 'require'
    }

    try:
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        # Check if the product table exists
        cursor.execute("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product');")
        table_exists = cursor.fetchone()[0]
        print(f'Product table exists: {table_exists}')
        
        if table_exists:
            # Describe the table structure
            cursor.execute("SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'product' ORDER BY ordinal_position;")
            columns = cursor.fetchall()
            print('Product table structure:')
            for col in columns:
                print(f'  {col[0]}: {col[1]}, nullable: {col[2]}')
        
        conn.close()
        print("Verification completed successfully.")
    except Exception as e:
        print(f'Error: {e}')

if __name__ == "__main__":
    verify_table()