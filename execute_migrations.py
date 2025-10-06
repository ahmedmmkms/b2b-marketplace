import psycopg2
import sys

def execute_migration_scripts():
    # Database connection parameters
    connection_params = {
        'host': 'ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech',
        'database': 'neondb',
        'user': 'neondb_owner',
        'password': '***REMOVED***',
        'sslmode': 'require',
        'channel_binding': 'require'
    }

    # Migration scripts to execute
    migrations = [
        """
        CREATE TABLE product (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(19, 2),
            vendor_id VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """,
        """
        -- Function to update the 'updated_at' column
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$ language 'plpgsql';

        -- Create trigger for the product table
        CREATE TRIGGER update_product_updated_at 
            BEFORE UPDATE ON product 
            FOR EACH ROW 
            EXECUTE FUNCTION update_updated_at_column();
        """
    ]

    try:
        # Connect to the database
        print("Connecting to the database...")
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        print("Executing migration scripts...")
        
        # Execute each migration script
        for i, migration in enumerate(migrations, 1):
            print(f"Executing migration {i}...")
            cursor.execute(migration)
            print(f"Migration {i} executed successfully.")
        
        # Commit the changes
        conn.commit()
        print("All migrations executed successfully!")
        
    except psycopg2.Error as e:
        print(f"Database error: {e}")
        if conn:
            conn.rollback()
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        print("Database connection closed.")

if __name__ == "__main__":
    execute_migration_scripts()