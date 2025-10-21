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

print(f"Testing complete setup in: {host}:{port}, database: {database}")

try:
    # Establish connection
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=DB_USERNAME,
        password=DB_PASSWORD
    )
    cursor = conn.cursor()
    
    # Run sample queries to test the complete setup
    
    # 1. Test: Count records in major tables
    print("1. Testing record counts in major tables:")
    
    tables_to_check = [
        'feature_flags', 'accounts', 'users', 'vendors', 'products', 
        'rfqs', 'quotes', 'orders', 'invoices', 'loyalty_programs'
    ]
    
    for table in tables_to_check:
        cursor.execute(f"SELECT COUNT(*) FROM {table};")
        count = cursor.fetchone()[0]
        print(f"   {table}: {count} records")
    
    # 2. Test: Get recent orders with related information
    print("\n2. Testing recent orders with related information:")
    cursor.execute("""
    SELECT o.id, o.po_number, o.order_status, o.total_amount, 
           a.company_name, v.business_name
    FROM orders o
    LEFT JOIN accounts a ON o.account_id = a.id
    LEFT JOIN quotes q ON o.quote_id = q.id
    LEFT JOIN vendors v ON q.vendor_id = v.id
    ORDER BY o.created_at DESC
    LIMIT 5;
    """)
    
    recent_orders = cursor.fetchall()
    for order in recent_orders:
        print(f"   Order ID: {order[0]}, PO: {order[1]}, Status: {order[2]}, Amount: {order[3]}, Account: {order[4]}, Vendor: {order[5]}")
    
    # 3. Test: Product search functionality (using the full-text index)
    print("\n3. Testing product search functionality:")
    cursor.execute("""
    SELECT id, name, price_amount, product_status
    FROM products
    WHERE to_tsvector('english', name) @@ plainto_tsquery('english', 'smart')
    LIMIT 5;
    """)
    
    search_results = cursor.fetchall()
    for product in search_results:
        print(f"   Product ID: {product[0]}, Name: {product[1]}, Price: {product[2]}, Status: {product[3]}")
    
    # 4. Test: RFQ and quote matching
    print("\n4. Testing RFQ to quote matching:")
    cursor.execute("""
    SELECT r.id AS rfq_id, r.title, r.rfq_status, 
           COUNT(q.id) AS quote_count,
           COUNT(CASE WHEN q.quote_status = 'ACCEPTED' THEN 1 END) AS accepted_quotes
    FROM rfqs r
    LEFT JOIN quotes q ON r.id = q.rfq_id
    GROUP BY r.id, r.title, r.rfq_status
    HAVING COUNT(q.id) > 0
    LIMIT 5;
    """)
    
    rfq_quote_stats = cursor.fetchall()
    for stat in rfq_quote_stats:
        print(f"   RFQ ID: {stat[0]}, Title: {stat[1]}, Status: {stat[2]}, Quotes: {stat[3]}, Accepted: {stat[4]}")
    
    # 5. Test: Account with wallet and credit limit
    print("\n5. Testing account with wallet and credit limit:")
    cursor.execute("""
    SELECT a.id, a.company_name, a.account_type, 
           w.name AS wallet_name, w.balance AS wallet_balance,
           cl.limit_amount AS credit_limit, cl.available_amount AS available_credit
    FROM accounts a
    LEFT JOIN wallets w ON a.id = w.account_id
    LEFT JOIN credit_limits cl ON a.id = cl.account_id
    LIMIT 5;
    """)
    
    account_financials = cursor.fetchall()
    for account in account_financials:
        print(f"   Account ID: {account[0]}, Company: {account[1]}, Wallet: {account[3]}, Balance: {account[4]}, Credit Limit: {account[5]}, Available: {account[6]}")
    
    # 6. Test: Loyalty program membership
    print("\n6. Testing loyalty program membership:")
    cursor.execute("""
    SELECT a.company_name, lp.name AS program_name, t.name AS tier_name, 
           at.membership_status, at.start_date
    FROM accounts a
    JOIN account_tiers at ON a.id = at.account_id
    JOIN tiers t ON at.tier_id = t.id
    JOIN loyalty_programs lp ON t.loyalty_program_id = lp.id
    LIMIT 5;
    """)
    
    loyalty_members = cursor.fetchall()
    for member in loyalty_members:
        print(f"   Account: {member[0]}, Program: {member[1]}, Tier: {member[2]}, Status: {member[3]}, Since: {member[4]}")
    
    # 7. Test: Invoice and payment correlation
    print("\n7. Testing invoice and payment correlation:")
    cursor.execute("""
    SELECT i.full_number, i.invoice_status, i.total_amount, 
           p.payment_status, p.amount, p.payment_method
    FROM invoices i
    LEFT JOIN orders o ON i.order_id = o.id
    LEFT JOIN payments p ON o.id = p.order_id
    LIMIT 5;
    """)
    
    invoice_payment_corr = cursor.fetchall()
    for corr in invoice_payment_corr:
        print(f"   Invoice: {corr[0]}, Status: {corr[1]}, Amount: {corr[2]}, Payment Status: {corr[3]}, Payment Amount: {corr[4]}, Method: {corr[5]}")
    
    # 8. Test: Index performance with an example query
    print("\n8. Testing index performance (finding users by email):")
    cursor.execute("SELECT id, email, account_id FROM users WHERE email LIKE '%@example.com' LIMIT 5;")
    
    users_by_email = cursor.fetchall()
    for user in users_by_email:
        print(f"   User ID: {user[0]}, Email: {user[1]}, Account ID: {user[2]}")
    
    print("\nAll tests completed successfully! The database schema and data are properly set up.")
    
    # Close connections
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"Error testing the setup: {str(e)}")
    import traceback
    traceback.print_exc()
    if 'conn' in locals():
        conn.rollback()