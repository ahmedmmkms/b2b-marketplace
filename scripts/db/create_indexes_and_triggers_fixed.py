import psycopg2
import re

# Database credentials
DB_URL = "jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
DB_USERNAME = "neondb_owner"
DB_PASSWORD = "npg_QTE70VJgbcdp"

# Extract host, port, and database name from the JDBC URL
jdbc_match = re.match(r"jdbc:postgresql://([^:/]+)(?::(\d+))?/([^?]+)", DB_URL)
if jdbc_match:
    host = jdbc_match.group(1)
    port = jdbc_match.group(2) or "5432"
    database = jdbc_match.group(3).split('?')[0]
else:
    raise ValueError("Invalid JDBC URL format")

print(f"Creating indexes and triggers in: {host}:{port}, database: {database}")

try:
    # Establish connection
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=DB_USERNAME,
        password=DB_PASSWORD
    )
    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    
    cursor = conn.cursor()
    
    # Create indexes as specified in the schema document
    print("Creating indexes...")
    
    cursor.execute("CREATE INDEX idx_users_email ON users(email);")
    print("Created index: idx_users_email")
    
    cursor.execute("CREATE INDEX idx_users_account_id ON users(account_id);")
    print("Created index: idx_users_account_id")
    
    cursor.execute("CREATE INDEX idx_users_account_active ON users(account_id, is_active);")
    print("Created index: idx_users_account_active")
    
    cursor.execute("CREATE INDEX idx_accounts_email ON accounts(email);")
    print("Created index: idx_accounts_email")
    
    cursor.execute("CREATE INDEX idx_accounts_status ON accounts(status);")
    print("Created index: idx_accounts_status")
    
    cursor.execute("CREATE INDEX idx_accounts_account_type ON accounts(account_type);")
    print("Created index: idx_accounts_account_type")
    
    cursor.execute("CREATE INDEX idx_permissions_name ON permissions(permission_name);")
    print("Created index: idx_permissions_name")
    
    cursor.execute("CREATE INDEX idx_permissions_active ON permissions(is_active);")
    print("Created index: idx_permissions_active")
    
    cursor.execute("CREATE INDEX idx_roles_name ON roles(role_name);")
    print("Created index: idx_roles_name")
    
    cursor.execute("CREATE INDEX idx_roles_active ON roles(is_active);")
    print("Created index: idx_roles_active")
    
    cursor.execute("CREATE INDEX idx_products_name ON products USING GIN(to_tsvector('english', name));")
    print("Created index: idx_products_name")
    
    cursor.execute("CREATE INDEX idx_products_status ON products(product_status);")
    print("Created index: idx_products_status")
    
    cursor.execute("CREATE INDEX idx_products_vendor_id ON products(vendor_id);")
    print("Created index: idx_products_vendor_id")
    
    cursor.execute("CREATE INDEX idx_products_sku ON products(sku);")
    print("Created index: idx_products_sku")
    
    cursor.execute("CREATE INDEX idx_products_slug ON products(slug);")
    print("Created index: idx_products_slug")
    
    cursor.execute("CREATE INDEX idx_products_slug_gin ON products USING GIN(to_tsvector('english', slug));")
    print("Created index: idx_products_slug_gin")
    
    cursor.execute("CREATE INDEX idx_vendors_status ON vendors(vendor_status);")
    print("Created index: idx_vendors_status")
    
    cursor.execute("CREATE INDEX idx_rfqs_account_id ON rfqs(account_id);")
    print("Created index: idx_rfqs_account_id")
    
    cursor.execute("CREATE INDEX idx_rfqs_status ON rfqs(rfq_status);")
    print("Created index: idx_rfqs_status")
    
    cursor.execute("CREATE INDEX idx_quotes_rfq_id ON quotes(rfq_id);")
    print("Created index: idx_quotes_rfq_id")
    
    cursor.execute("CREATE INDEX idx_quotes_vendor_id ON quotes(vendor_id);")
    print("Created index: idx_quotes_vendor_id")
    
    cursor.execute("CREATE INDEX idx_orders_account_id ON orders(account_id);")
    print("Created index: idx_orders_account_id")
    
    cursor.execute("CREATE INDEX idx_orders_status ON orders(order_status);")
    print("Created index: idx_orders_status")
    
    cursor.execute("CREATE INDEX idx_invoices_order_id ON invoices(order_id);")
    print("Created index: idx_invoices_order_id")
    
    cursor.execute("CREATE INDEX idx_invoices_status ON invoices(invoice_status);")
    print("Created index: idx_invoices_status")
    
    cursor.execute("CREATE INDEX idx_payments_order_id ON payments(order_id);")
    print("Created index: idx_payments_order_id")
    
    cursor.execute("CREATE INDEX idx_payments_status ON payments(payment_status);")
    print("Created index: idx_payments_status")
    
    cursor.execute("CREATE INDEX idx_media_assets_status ON media_assets(status);")
    print("Created index: idx_media_assets_status")
    
    cursor.execute("CREATE INDEX idx_media_assets_type ON media_assets(media_type);")
    print("Created index: idx_media_assets_type")
    
    cursor.execute("CREATE INDEX idx_feature_flags_name ON feature_flags(flag_name);")
    print("Created index: idx_feature_flags_name")
    
    # Create triggers to automatically update the 'updated_at' field on all tables
    print("\nCreating triggers...")
    
    cursor.execute("""
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ language 'plpgsql';
    """)
    print("Created update_updated_at_column function")
    
    # Create triggers for all tables that have 'updated_at' column
    trigger_tables = [
        'feature_flags', 'accounts', 'users', 'permissions', 'roles',
        'vendors', 'products', 'product_attributes', 'product_attribute_values',
        'media_assets', 'rfqs', 'quotes', 'orders', 'invoices', 'credit_limits',
        'wallets', 'loyalty_programs', 'tiers', 'rewards', 'sequence_registry',
        'tax_registrations'
    ]
    
    for table in trigger_tables:
        trigger_name = f"update_{table}_updated_at"
        try:
            cursor.execute(f"""
            CREATE TRIGGER {trigger_name}
            BEFORE UPDATE ON {table}
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
            """)
            print(f"Created trigger: {trigger_name}")
        except psycopg2.Error as e:
            print(f"Could not create trigger for {table}: {e}")
    
    print("\nAll indexes and triggers created successfully!")
    
    # Close connections
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"Error creating indexes and triggers: {str(e)}")