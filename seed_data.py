import psycopg2
from dotenv import load_dotenv
import os
from urllib.parse import urlparse
import uuid
from datetime import datetime, timedelta
import random
import string

def generate_ulid():
    """Generate a ULID string - for demonstration purposes using random chars"""
    # In a real app, we'd use a proper ULID generation library
    # Here we'll simulate a ULID with valid format
    ulid_chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
    return ''.join(random.choices(ulid_chars, k=26))

def load_db_config():
    """Load database configuration from .env file"""
    load_dotenv()
    
    # Parse the DB_URL from .env file
    db_url = os.getenv('DB_URL')
    if not db_url:
        # Use direct connection if DB_URL not in .env
        db_url = 'jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
    
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
            password = os.getenv('DB_PASSWORD', 'npg_QTE70VJgbcdp')
        
        return {
            'host': result.hostname,
            'database': result.path[1:],  # Remove leading '/'
            'user': os.getenv('DB_USERNAME', result.username) or 'neondb_owner',
            'password': password,
            'port': result.port or 5432,
            'sslmode': 'require'
        }
    else:
        # Standard PostgreSQL URL
        result = urlparse(db_url)
        
        # Extract credentials from URL components
        password = result.password
        # If password not in URL, try to get from environment
        if not password:
            password = os.getenv('DB_PASSWORD', 'npg_QTE70VJgbcdp')
        
        return {
            'host': result.hostname,
            'database': result.path[1:],  # Remove leading '/'
            'user': os.getenv('DB_USERNAME', result.username) or 'neondb_owner',
            'password': password,
            'port': result.port or 5432,
            'sslmode': 'require'
        }

def seed_data():
    connection_params = load_db_config()
    
    try:
        # Connect to the database
        print("Connecting to the database...")
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        print("Seeding data...")
        
        # Organizations
        organizations_data = [
            (generate_ulid(), "ABC Manufacturing Inc.", "vendor", True),
            (generate_ulid(), "XYZ Electronics Ltd.", "vendor", True),
            (generate_ulid(), "Global Components Co.", "vendor", True),
            (generate_ulid(), "TechParts Distributors", "vendor", True),
            (generate_ulid(), "MegaBuy Corp", "buyer", True),
            (generate_ulid(), "Industry Solutions Ltd.", "buyer", True),
            (generate_ulid(), "Innovative Procurement Inc.", "buyer", True),
            (generate_ulid(), "Industrial Supplies Co.", "buyer", True),
        ]
        
        cursor.executemany(
            "INSERT INTO organizations (id, name, role, is_active) VALUES (%s, %s, %s, %s)",
            organizations_data
        )
        
        # Users
        users_data = [
            (generate_ulid(), organizations_data[0][0], "contact@abc-manufacturing.com", "John Smith", "vendor", "$2b$12$hashed_password", True),
            (generate_ulid(), organizations_data[1][0], "info@xyz-electronics.com", "Sarah Johnson", "vendor", "$2b$12$hashed_password", True),
            (generate_ulid(), organizations_data[2][0], "sales@global-components.com", "Michael Chen", "vendor", "$2b$12$hashed_password", True),
            (generate_ulid(), organizations_data[3][0], "orders@techparts.com", "Emma Davis", "vendor", "$2b$12$hashed_password", True),
            
            (generate_ulid(), organizations_data[4][0], "procurement@megabuy.com", "Robert Wilson", "buyer", "$2b$12$hashed_password", True),
            (generate_ulid(), organizations_data[4][0], "admin@megabuy.com", "Lisa Anderson", "admin", "$2b$12$hashed_password", True),
            (generate_ulid(), organizations_data[5][0], "purchasing@industry-solutions.com", "David Brown", "buyer", "$2b$12$hashed_password", True),
            (generate_ulid(), organizations_data[6][0], "orders@innovative-procurement.com", "Jennifer Lee", "buyer", "$2b$12$hashed_password", True),
            (generate_ulid(), organizations_data[7][0], "req@industrial-supplies.com", "Thomas Miller", "buyer", "$2b$12$hashed_password", True),
        ]
        
        cursor.executemany(
            "INSERT INTO users (id, org_id, email, full_name, role, password_hash, is_active) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            users_data
        )
        
        # Products
        products_data = [
            (generate_ulid(), organizations_data[0][0], "MOT-001", "Industrial Motor 10kW", "High-efficiency industrial motor", "motors", "USD", 1200.00, '[]', '{}', True),
            (generate_ulid(), organizations_data[0][0], "MOT-002", "Servo Motor 5kW", "Precision servo motor", "motors", "USD", 850.00, '[]', '{}', True),
            (generate_ulid(), organizations_data[1][0], "IC-74HC", "Logic IC 74HC Series", "Digital logic integrated circuits", "electronics", "USD", 0.45, '[]', '{}', True),
            (generate_ulid(), organizations_data[1][0], "MCU-32", "32-bit Microcontroller", "ARM Cortex-based microcontroller", "electronics", "USD", 12.75, '[]', '{}', True),
            (generate_ulid(), organizations_data[2][0], "BRG-1234", "Ball Bearing 12x34x10mm", "Precision ball bearing", "bearings", "USD", 5.25, '[]', '{"material": "chrome steel", "load_rating": "2.5kN"}', True),
            (generate_ulid(), organizations_data[2][0], "BRG-2448", "Ball Bearing 24x48x20mm", "Heavy-duty ball bearing", "bearings", "USD", 18.90, '[]', '{"material": "chrome steel", "load_rating": "8.2kN"}', True),
            (generate_ulid(), organizations_data[3][0], "CON-20P", "20-Pin Connector", "High-reliability connector", "connectors", "USD", 2.10, '[]', '{}', True),
            (generate_ulid(), organizations_data[3][0], "REL-SPDT", "SPDT Relay 12V", "Electromagnetic relay", "relays", "USD", 3.75, '[]', '{}', True),
        ]
        
        cursor.executemany(
            "INSERT INTO products (id, vendor_id, sku, name, description, category, price_currency, reference_price, media_urls, attributes, is_active) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            products_data
        )
        
        # RFQs
        rfqs_data = [
            (generate_ulid(), organizations_data[4][0], users_data[4][0], "Motor Components Q4", "Request for industrial motors and components for Q4 production", "issued", '[]', datetime.now() - timedelta(days=5)),
            (generate_ulid(), organizations_data[5][0], users_data[6][0], "Electronic Components", "Sourcing request for electronic components for new product line", "issued", '[]', datetime.now() - timedelta(days=3)),
            (generate_ulid(), organizations_data[6][0], users_data[7][0], "Bearings and Mechanical", "Annual request for bearings and mechanical components", "draft", '[]', datetime.now()),
        ]
        
        cursor.executemany(
            "INSERT INTO rfqs (id, buyer_id, buyer_user_id, title, notes, status, attachments, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            rfqs_data
        )
        
        # RFQ Lines
        rfq_lines_data = [
            (generate_ulid(), rfqs_data[0][0], products_data[0][0], "High-efficiency industrial motors", 50, "EA", 1150.00),
            (generate_ulid(), rfqs_data[0][0], products_data[1][0], "Precision servo motors", 100, "EA", 800.00),
            (generate_ulid(), rfqs_data[1][0], products_data[2][0], "Logic ICs 74HC series", 10000, "EA", 0.42),
            (generate_ulid(), rfqs_data[1][0], products_data[3][0], "32-bit microcontrollers", 2000, "EA", 12.00),
            (generate_ulid(), rfqs_data[2][0], products_data[4][0], "Precision ball bearings 12x34x10mm", 500, "EA", 5.00),
            (generate_ulid(), rfqs_data[2][0], products_data[5][0], "Heavy-duty ball bearings 24x48x20mm", 200, "EA", 17.50),
        ]
        
        cursor.executemany(
            "INSERT INTO rfq_lines (id, rfq_id, product_id, description, quantity, uom, target_price) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            rfq_lines_data
        )
        
        # Quotes
        quotes_data = [
            (generate_ulid(), rfqs_data[0][0], organizations_data[0][0], users_data[0][0], "USD", datetime.now() + timedelta(days=30), "submitted", 65000.00, 3250.00, 68250.00, "Best pricing for long-term partnership", datetime.now() - timedelta(days=4)),
            (generate_ulid(), rfqs_data[1][0], organizations_data[1][0], users_data[1][0], "USD", datetime.now() + timedelta(days=30), "submitted", 6400.00, 320.00, 6720.00, "Competitive pricing for bulk order", datetime.now() - timedelta(days=2)),
            (generate_ulid(), rfqs_data[2][0], organizations_data[2][0], users_data[2][0], "USD", datetime.now() + timedelta(days=30), "draft", 3250.00, 162.50, 3412.50, "Standard pricing for annual contract", datetime.now() - timedelta(days=1)),
        ]
        
        cursor.executemany(
            "INSERT INTO quotes (id, rfq_id, vendor_id, vendor_user_id, currency, valid_until, status, subtotal, tax_total, grand_total, notes, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            quotes_data
        )
        
        # Quote Lines
        quote_lines_data = [
            (generate_ulid(), quotes_data[0][0], rfq_lines_data[0][0], products_data[0][0], "High-efficiency industrial motors", 50, "EA", 1300.00, 65000.00, 10, 15),
            (generate_ulid(), quotes_data[0][0], rfq_lines_data[1][0], products_data[1][0], "Precision servo motors", 100, "EA", 800.00, 80000.00, 5, 20),
            (generate_ulid(), quotes_data[1][0], rfq_lines_data[2][0], products_data[2][0], "Logic ICs 74HC series", 10000, "EA", 0.40, 4000.00, 1000, 25),
            (generate_ulid(), quotes_data[1][0], rfq_lines_data[3][0], products_data[3][0], "32-bit microcontrollers", 2000, "EA", 12.00, 24000.00, 500, 30),
            (generate_ulid(), quotes_data[2][0], rfq_lines_data[4][0], products_data[4][0], "Precision ball bearings 12x34x10mm", 500, "EA", 5.25, 2625.00, 50, 14),
            (generate_ulid(), quotes_data[2][0], rfq_lines_data[5][0], products_data[5][0], "Heavy-duty ball bearings 24x48x20mm", 200, "EA", 18.90, 3780.00, 25, 21),
        ]
        
        cursor.executemany(
            "INSERT INTO quote_lines (id, quote_id, rfq_line_id, product_id, description, quantity, uom, unit_price, line_total, moq, lead_time_days) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            quote_lines_data
        )
        
        # Orders (based on accepted quotes)
        orders_data = [
            (generate_ulid(), organizations_data[4][0], quotes_data[0][0], "placed", "USD", 65000.00, 3250.00, 68250.00),
            (generate_ulid(), organizations_data[5][0], quotes_data[1][0], "placed", "USD", 6400.00, 320.00, 6720.00),
        ]
        
        cursor.executemany(
            "INSERT INTO orders (id, buyer_id, quote_id, status, currency, subtotal, tax_total, grand_total) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            orders_data
        )
        
        # Order Lines
        order_lines_data = [
            (generate_ulid(), orders_data[0][0], quote_lines_data[0][0], "High-efficiency industrial motors", 50, "EA", 1300.00, 65000.00),
            (generate_ulid(), orders_data[0][0], quote_lines_data[1][0], "Precision servo motors", 100, "EA", 800.00, 80000.00),
            (generate_ulid(), orders_data[1][0], quote_lines_data[2][0], "Logic ICs 74HC series", 10000, "EA", 0.40, 4000.00),
            (generate_ulid(), orders_data[1][0], quote_lines_data[3][0], "32-bit microcontrollers", 2000, "EA", 12.00, 24000.00),
        ]
        
        cursor.executemany(
            "INSERT INTO order_lines (id, order_id, quote_line_id, description, quantity, uom, unit_price, line_total) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            order_lines_data
        )
        
        # Wallets
        wallets_data = [
            (generate_ulid(), organizations_data[4][0], "USD", 100000.00),
            (generate_ulid(), organizations_data[5][0], "USD", 50000.00),
            (generate_ulid(), organizations_data[6][0], "USD", 75000.00),
            (generate_ulid(), organizations_data[7][0], "USD", 60000.00),
        ]
        
        cursor.executemany(
            "INSERT INTO wallets (id, org_id, currency, balance) VALUES (%s, %s, %s, %s)",
            wallets_data
        )
        
        # Wallet Transactions
        wallet_transactions_data = [
            (generate_ulid(), wallets_data[0][0], "topup", 100000.00, "initial_funding", users_data[4][0]),
            (generate_ulid(), wallets_data[1][0], "topup", 50000.00, "initial_funding", users_data[6][0]),
            (generate_ulid(), wallets_data[2][0], "topup", 75000.00, "initial_funding", users_data[7][0]),
            (generate_ulid(), wallets_data[3][0], "topup", 60000.00, "initial_funding", users_data[8][0]),
            (generate_ulid(), wallets_data[0][0], "debit", 68250.00, orders_data[0][0], users_data[4][0]),
            (generate_ulid(), wallets_data[1][0], "debit", 6720.00, orders_data[1][0], users_data[6][0]),
        ]
        
        cursor.executemany(
            "INSERT INTO wallet_transactions (id, wallet_id, type, amount, reference, created_by) VALUES (%s, %s, %s, %s, %s, %s)",
            wallet_transactions_data
        )
        
        # Payments
        payments_data = [
            (generate_ulid(), orders_data[0][0], "wallet", "succeeded", 68250.00, "USD", "pay_" + generate_ulid()[:16], '{}'),
            (generate_ulid(), orders_data[1][0], "wallet", "succeeded", 6720.00, "USD", "pay_" + generate_ulid()[:16], '{}'),
        ]
        
        cursor.executemany(
            "INSERT INTO payments (id, order_id, method, status, amount, currency, idempotency_key, raw_payload) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            payments_data
        )
        
        # Feature Flags
        feature_flags_data = [
            ("catalog_search", '{"enabled": true, "scope": "public"}'),
            ("rfq_workflow", '{"enabled": true, "scope": "public"}'),
            ("quote_management", '{"enabled": true, "scope": "public"}'),
            ("order_processing", '{"enabled": true, "scope": "public"}'),
            ("wallet_payments", '{"enabled": true, "scope": "public"}'),
        ]
        
        cursor.executemany(
            "INSERT INTO feature_flags (key, value) VALUES (%s, %s)",
            feature_flags_data
        )
        
        # Commit the changes
        conn.commit()
        print("Data seeded successfully!")
        
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
    seed_data()