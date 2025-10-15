import os
import psycopg2
from dotenv import load_dotenv
from urllib.parse import urlparse

def load_db_config():
    """Load database configuration from .env file"""
    load_dotenv()
    
    # Parse the DB_URL from .env file
    db_url = os.getenv('DB_URL')
    if not db_url:
        raise ValueError("DB_URL not found in .env file")
    
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
            password = os.getenv('DB_PASSWORD')
        
        return {
            'host': result.hostname,
            'database': result.path[1:],  # Remove leading '/'
            'user': os.getenv('DB_USERNAME', result.username),
            'password': password,
            'port': result.port or 5432,
            'sslmode': 'require',
            'channel_binding': 'require'
        }
    else:
        # Standard PostgreSQL URL
        result = urlparse(db_url)
        
        # Extract credentials from URL components
        password = result.password
        # If password not in URL, try to get from environment
        if not password:
            password = os.getenv('DB_PASSWORD')
        
        return {
            'host': result.hostname,
            'database': result.path[1:],  # Remove leading '/'
            'user': os.getenv('DB_USERNAME', result.username),
            'password': password,
            'port': result.port or 5432,
            'sslmode': 'require',
            'channel_binding': 'require'
        }

def verify_seeded_data():
    """Verify that all data has been properly seeded in the database"""
    connection_params = load_db_config()
    
    try:
        # Connect to the database
        print("Connecting to the database for verification...")
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        print("Verifying seeded data...")
        
        # Comprehensive verification
        verification_queries = [
            ('vendor', 'Vendors', 'SELECT COUNT(*) FROM vendor;'),
            ('account', 'Accounts', 'SELECT COUNT(*) FROM account;'),
            ('app_user', 'Users', 'SELECT COUNT(*) FROM app_user;'),
            ('product', 'Products', 'SELECT COUNT(*) FROM product;'),
            ('product_attribute', 'Attributes', 'SELECT COUNT(*) FROM product_attribute;'),
            ('media_asset', 'Media Assets', 'SELECT COUNT(*) FROM media_asset;'),
            ('product_attribute_value', 'Product Attribute Values', 'SELECT COUNT(*) FROM product_attribute_value;'),
            ('product_media', 'Product Media Links', 'SELECT COUNT(*) FROM product_media;'),
            ('rfq', 'RFQs', 'SELECT COUNT(*) FROM rfq;'),
            ('rfq_line', 'RFQ Lines', 'SELECT COUNT(*) FROM rfq_line;'),
            ('quote', 'Quotes', 'SELECT COUNT(*) FROM quote;'),
            ('quote_line', 'Quote Lines', 'SELECT COUNT(*) FROM quote_line;'),
            ('order_table', 'Orders', 'SELECT COUNT(*) FROM order_table;'),
            ('order_line', 'Order Lines', 'SELECT COUNT(*) FROM order_line;'),
            ('payment', 'Payments', 'SELECT COUNT(*) FROM payment;'),
            ('wallet', 'Wallets', 'SELECT COUNT(*) FROM wallet;'),
            ('credit_limit', 'Credit Limits', 'SELECT COUNT(*) FROM credit_limit;'),
            ('loyalty_program', 'Loyalty Programs', 'SELECT COUNT(*) FROM loyalty_program;'),
            ('tier', 'Tiers', 'SELECT COUNT(*) FROM tier;'),
            ('loyalty_txn', 'Loyalty Transactions', 'SELECT COUNT(*) FROM loyalty_txn;'),
            ('audit_log', 'Audit Logs', 'SELECT COUNT(*) FROM audit_log;'),
            
            # Check for data consistency
            ('unique_skus', 'Unique SKUs', 'SELECT COUNT(DISTINCT sku) FROM product;'),
            ('published_products', 'Published Products', "SELECT COUNT(*) FROM product WHERE status = 'PUBLISHED';"),
            ('active_vendors', 'Active Vendors', "SELECT COUNT(*) FROM vendor WHERE status = 'ACTIVE';"),
            ('active_accounts', 'Active Accounts', "SELECT COUNT(*) FROM account WHERE status = 'ACTIVE';"),
        ]
        
        all_good = True
        
        for table_name, display_name, query in verification_queries:
            try:
                cursor.execute(query)
                count = cursor.fetchone()[0]
                
                # Basic validation - expect at least some records for core entities
                expected_min = 0
                if table_name in ['vendor', 'account', 'product', 'app_user']:
                    expected_min = 10  # Should have reasonable amounts for core tables
                
                if count < expected_min:
                    print(f"[WARN] {display_name}: {count} (expected at least {expected_min})")
                    all_good = False
                else:
                    print(f"[OK] {display_name}: {count}")
                    
            except Exception as e:
                print(f"[ERROR] Error checking {display_name}: {e}")
                all_good = False
        
        # Additional verification: check if foreign key relationships are working
        print("\nChecking foreign key relationships...")
        relationship_checks = [
            ("Products with valid vendors", "SELECT COUNT(*) FROM product p JOIN vendor v ON p.vendor_id = v.id;"),
            ("RFQs with valid accounts", "SELECT COUNT(*) FROM rfq r JOIN account a ON r.account_id = a.id;"),  # Fixed the query
            ("Orders with valid accounts", "SELECT COUNT(*) FROM order_table o JOIN account a ON o.account_id = a.id;")
        ]
        
        for check_name, check_query in relationship_checks:
            try:
                cursor.execute(check_query)
                count = cursor.fetchone()[0]
                print(f"[OK] {check_name}: {count}")
            except Exception as e:
                print(f"[WARN] Issue with {check_name}: {e}")
        
        if all_good:
            print("\n[SUCCESS] All verifications passed! Database seeding was successful.")
        else:
            print("\n[WARN] Some verifications failed. Please check the above warnings.")
        
        # Show some sample records for key tables
        print("\nSample records from key tables:")
        sample_queries = [
            ('vendor', 'SELECT id, name, status FROM vendor LIMIT 3;'),
            ('product', 'SELECT id, name, sku, status FROM product LIMIT 3;'),
            ('account', 'SELECT id, name, type, status FROM account LIMIT 3;'),
            ('app_user', 'SELECT id, first_name, last_name, email FROM app_user LIMIT 3;'),
        ]
        
        for table_name, query in sample_queries:
            print(f"\nSample from {table_name}:")
            try:
                cursor.execute(query)
                rows = cursor.fetchall()
                col_names = [desc[0] for desc in cursor.description]
                print(f"  {col_names}")
                for row in rows:
                    print(f"  {row}")
            except Exception as e:
                print(f"  Error retrieving samples from {table_name}: {e}")
        
    except psycopg2.Error as e:
        print(f"Database error during verification: {e}")
    except Exception as e:
        print(f"Error during verification: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        print("\nVerification completed. Database connection closed.")

if __name__ == "__main__":
    verify_seeded_data()
