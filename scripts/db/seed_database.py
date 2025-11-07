import psycopg2
import re
import random
from datetime import datetime, timedelta
from decimal import Decimal

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

print(f"Seeding database in: {host}:{port}, database: {database}")

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
    
    # Feature flags
    feature_flags = [
        ('catalog.publicBrowse', True, 'Allow public browsing of catalog'),
        ('search.enabled', True, 'Enable search functionality'),
        ('rfq.enabled', True, 'Enable RFQ functionality'),
        ('quote.vendorConsole', True, 'Enable vendor console for quotes'),
        ('orders.checkout', True, 'Enable checkout functionality'),
        ('payments.gateway1', True, 'Enable first payment gateway'),
        ('wallet.basic', True, 'Enable basic wallet functionality'),
        ('invoice.vat', True, 'Enable VAT invoicing'),
        ('loyalty.core', True, 'Enable core loyalty features'),
        ('credit.controls', True, 'Enable credit controls'),
    ]
    
    for flag in feature_flags:
        cursor.execute("""
        INSERT INTO feature_flags (id, flag_name, is_enabled, description)
        VALUES (gen_random_ulid(), %s, %s, %s)
        """, flag)
    print(f"Inserted {len(feature_flags)} feature flags")
    
    # Insert tax registrations
    tax_regs = [
        ('Global Trading Co.', 'VAT-123456789', '{"street": "123 Main St", "city": "Dubai", "country": "AE", "postalCode": "12345"}', True),
        ('Regional Supplies Ltd.', 'VAT-987654321', '{"street": "456 Trade Rd", "city": "Abu Dhabi", "country": "AE", "postalCode": "54321"}', True),
    ]
    
    for reg in tax_regs:
        cursor.execute("""
        INSERT INTO tax_registrations (id, legal_name, tax_number, address, is_active)
        VALUES (gen_random_ulid(), %s, %s, %s, %s)
        """, reg)
    print(f"Inserted {len(tax_regs)} tax registrations")
    
    # Insert sequence registries
    sequence_registries = [
        (tax_regs[0][0], 'INVOICE', 'INV', 2025, 1000),
        (tax_regs[0][0], 'CREDIT_NOTE', 'CN', 2025, 100),
        (tax_regs[1][0], 'INVOICE', 'RTS-INV', 2025, 500),
        (tax_regs[1][0], 'CREDIT_NOTE', 'RTS-CN', 2025, 50),
    ]
    
    for seq in sequence_registries:
        cursor.execute("""
        INSERT INTO sequence_registry (id, tax_reg_id, sequence_type, prefix, year, current_value, next_value)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s)
        """, (seq[0], seq[1], seq[2], seq[3], seq[4], seq[5], seq[5] + 1))
    print(f"Inserted {len(sequence_registries)} sequence registries")
    
    # Insert accounts
    accounts = []
    for i in range(50):
        account_type = random.choice(['COMPANY', 'INDIVIDUAL'])
        status = random.choice(['ACTIVE', 'PENDING', 'SUSPENDED'])
        credit_limit = Decimal(random.uniform(1000, 100000))
        
        accounts.append((
            f'Company {i+1}' if account_type == 'COMPANY' else f'User {i+1}',
            f'Contact {i+1}',
            f'contact{i+1}@example.com',
            f'+9715{i:08}',
            account_type,
            status,
            f'TAX-{i+1:03}',
            credit_limit,
            Decimal(credit_limit * random.uniform(0.5, 0.9))  # available credit
        ))
    
    for acc in accounts:
        cursor.execute("""
        INSERT INTO accounts (id, company_name, contact_person, email, phone, account_type, status, tax_id, credit_limit, available_credit)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, acc)
    print(f"Inserted {len(accounts)} accounts")
    
    # Insert users
    users = []
    for i in range(100):
        account_idx = random.randint(0, len(accounts)-1)
        status = random.choice([True, False])
        
        users.append((
            f'First{i+1}',
            f'Last{i+1}',
            f'user{i+1}@example.com',
            f'+9715{i+100:08}',
            f'Job Title {i+1}',
            accounts[account_idx][3],  # phone from account
            status  # is_active
        ))
    
    for user in users:
        cursor.execute("""
        INSERT INTO users (id, first_name, last_name, email, phone, job_title, account_id, is_active, password_hash, salt)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, 'hashed_password_placeholder', 'salt_placeholder')
        """, user)
    print(f"Inserted {len(users)} users")
    
    # Insert vendors
    vendor_names = [
        'Global Electronics', 'MENA Supplies', 'Premium Trading Co.', 'Gulf Industrial', 
        'Regional Manufacturing', 'Advanced Tech Solutions', 'Quality Parts Ltd.', 
        'Industrial Equipment Co.', 'Construction Materials', 'Office Supplies Group'
    ]
    
    vendors = []
    for i, name in enumerate(vendor_names):
        vendor_status = random.choice(['APPROVED', 'PENDING', 'SUSPENDED'])
        vendors.append((
            name,
            f'Description for {name}',
            f'contact@{name.lower().replace(" ", "")}.com',
            f'+9714{i+1:08}',
            f'{{"street": "{i+100} Business St", "city": "Dubai", "country": "AE", "postalCode": "{i+10000}"}}',
            f'TAX-VEN-{i+1:03}',
            vendor_status,
            datetime.now().date() - timedelta(days=random.randint(30, 365)) if vendor_status == 'APPROVED' else None,
            f'License-{i+1:03}',
            datetime.now().date() - timedelta(days=random.randint(365, 1095)),
            random.choice([True, False])
        ))
    
    for vendor in vendors:
        cursor.execute("""
        INSERT INTO vendors (id, business_name, description, email, phone, address, tax_id, vendor_status, approval_date, business_license_no, registration_date, kyc_verified)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, vendor)
    print(f"Inserted {len(vendors)} vendors")
    
    # Insert product attributes
    attributes = [
        ('Color', 'Product Color', 'TEXT', True, True, True, 1),
        ('Size', 'Product Size', 'TEXT', True, True, True, 2),
        ('Weight', 'Product Weight (kg)', 'NUMBER', False, True, True, 3),
        ('Material', 'Material Type', 'SELECT', False, True, True, 4),
        ('Power', 'Power Consumption (W)', 'NUMBER', False, True, False, 5),
    ]
    
    for attr in attributes:
        cursor.execute("""
        INSERT INTO product_attributes (id, name, display_name, attribute_type, is_required, is_searchable, is_filterable, sort_order)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s)
        """, attr)
    print(f"Inserted {len(attributes)} product attributes")
    
    # Insert product attribute values
    attr_values = [
        ('Color', 'Red', 'Red', False, 1),
        ('Color', 'Blue', 'Blue', False, 2),
        ('Color', 'Green', 'Green', True, 3),  # Default
        ('Size', 'Small', 'S', False, 1),
        ('Size', 'Medium', 'M', False, 2),
        ('Size', 'Large', 'L', False, 3),
        ('Material', 'Plastic', 'Plastic', False, 1),
        ('Material', 'Metal', 'Metal', False, 2),
        ('Material', 'Wood', 'Wood', False, 3),
    ]
    
    # First get the attribute IDs
    cursor.execute("SELECT id, name FROM product_attributes")
    attr_id_map = {name: id for id, name in cursor.fetchall()}
    
    for attr_val in attr_values:
        attr_id = attr_id_map[attr_val[0]]
        cursor.execute("""
        INSERT INTO product_attribute_values (id, product_attribute_id, value, display_value, is_default, sort_order)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s)
        """, (attr_id, attr_val[1], attr_val[2], attr_val[3], attr_val[4]))
    print(f"Inserted {len(attr_values)} product attribute values")
    
    # Insert products
    product_names = [
        'Smartphone X1', 'Laptop Pro 2023', 'Wireless Headphones', 'Tablet Max', 'Smart Watch Series 5',
        'Bluetooth Speaker', 'Digital Camera', 'Gaming Console', 'External Hard Drive', 'Wireless Mouse',
        'Mechanical Keyboard', 'Monitor 4K', 'Printer All-in-One', 'Router Gigabit', 'Smart TV 55"',
        'Refrigerator', 'Washing Machine', 'Microwave Oven', 'Air Conditioner', 'Vacuum Cleaner',
        'Office Chair', 'Desk Lamp', 'Coffee Maker', 'Blender', 'Toaster',
        'Electric Kettle', 'Hair Dryer', 'Shaver', 'Iron', 'Sewing Machine',
        'Drill Set', 'Screwdriver Kit', 'Wrench Set', 'Saw Set', 'Hammer Set',
        'Paint Brush', 'Sandpaper', 'Tape Measure', 'Level', 'Screw Kit',
        'Nail Kit', 'Bolt Kit', 'Nut Kit', 'Washer Kit', 'Fastener Kit',
        'Soldering Iron', 'Multimeter', 'Wire Strippers', 'Solder Wire', 'Heat Shrink Tubing',
        'Breadboard', 'Jumper Wires', 'Resistor Kit', 'Capacitor Kit', 'Diode Kit',
        'Transistor Kit', 'IC Kit', 'LED Kit', 'Battery Pack', 'Power Supply',
        'Oscilloscope', 'Function Generator', 'Logic Analyzer', 'Solder Paste', 'Helping Hands',
        'Solder Wick', 'Desoldering Braid', 'Soldering Station', 'Solder Sucker', 'Solder Wick'
    ]
    
    products = []
    for i, name in enumerate(product_names):
        vendor_idx = random.randint(0, len(vendors)-1)
        status = random.choice(['ACTIVE', 'DRAFT', 'INACTIVE'])
        price = Decimal(random.uniform(10, 2000))
        
        products.append((
            name,
            name.lower().replace(' ', '-'),
            f'Detailed description for {name}',
            f'Short desc for {name}',
            f'SKU-{i+1:04}',
            f'UPC-{i+1:012}',
            f'GTIN-{i+1:014}',
            f'MPN-{i+1:06}',
            'Generic Brand',
            vendors[vendor_idx][0],  # vendor_id
            status,
            price,
            'USD',
            f'Tax-{i+1}',
            f'{name} Meta Title',
            f'Meta description for {name}',
            f'meta,keywords,{name}',
            Decimal(random.uniform(0.1, 10)),
            f'{{"length": {random.uniform(5, 50)}, "width": {random.uniform(3, 30)}, "height": {random.uniform(2, 20)}}}',
            f'{{"box": "Individual", "packaging": "Cardboard"}}',
            random.randint(1, 10),
            random.randint(1, 100) if random.choice([True, False]) else None,
            random.choice([True, False]),
            random.randint(0, 1000),
            random.choice(['IN_STOCK', 'OUT_OF_STOCK', 'BACKORDER']),
            random.choice([True, False]),
            Decimal(random.uniform(1, 50)),
            Decimal(random.uniform(1, 30)),
            Decimal(random.uniform(1, 20))
        ))
    
    for product in products:
        cursor.execute("""
        INSERT INTO products (id, name, slug, description, short_description, sku, upc, gtin, mpn, brand, vendor_id, product_status, price_amount, price_currency, tax_class, meta_title, meta_description, meta_keywords, weight, dimensions, packaging_info, min_order_quantity, moq, inventory_tracking, stock_quantity, inventory_status, is_active, dimensions_length, dimensions_width, dimensions_height)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, product)
    print(f"Inserted {len(products)} products")
    
    # Insert media assets
    media_assets = []
    for i in range(100):
        media_assets.append((
            f'Image {i+1}',
            f'product_image_{i+1}.jpg',
            f'/media/product_images/{i+1}/product_image_{i+1}.jpg',
            'image/jpeg',
            random.randint(50000, 2000000),
            f'Alt text for image {i+1}',
            f'Title for image {i+1}',
            f'Caption for image {i+1}',
            'IMAGE',
            'ACTIVE',
            random.choice([True, False])
        ))
    
    for asset in media_assets:
        cursor.execute("""
        INSERT INTO media_assets (id, name, original_filename, storage_path, content_type, file_size, alt_text, title, caption, media_type, status, is_primary)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, asset)
    print(f"Inserted {len(media_assets)} media assets")
    
    # Link products with media assets
    for i in range(min(len(products), len(media_assets))):
        cursor.execute("""
        INSERT INTO product_media (id, product_id, media_asset_id, display_order, is_primary)
        VALUES (gen_random_ulid(), %s, %s, %s, %s)
        """, (products[i][0], media_assets[i][0], i, i == 0))  # First media asset is primary
    print(f"Linked {min(len(products), len(media_assets))} products with media assets")
    
    # Insert RFQs
    rfqs = []
    for i in range(20):
        account_idx = random.randint(0, len(accounts)-1)
        expiry_date = datetime.now() + timedelta(days=random.randint(7, 30))
        
        rfqs.append((
            accounts[account_idx][3],  # account_id
            f'RFQ-{i+1:03}: Procurement Request',
            f'Detailed requirements for procurement RFQ {i+1}',
            random.choice(['DRAFT', 'OPEN', 'CLOSED', 'EXPIRED']),
            expiry_date,
            'USD',
            random.choice([True, False]),
            f'Contact Person {i+1}',
            f'contact{i+1}@example.com',
            random.choice([True, False]),
            f'User-{i+1}'
        ))
    
    for rfq in rfqs:
        cursor.execute("""
        INSERT INTO rfqs (id, account_id, title, description, rfq_status, expiry_date, currency, is_public, contact_person, contact_email, tax_included, created_by)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, rfq)
    print(f"Inserted {len(rfqs)} RFQs")
    
    # Insert RFQ lines
    rfq_lines = []
    for i in range(50):
        rfq_idx = random.randint(0, len(rfqs)-1)
        product_idx = random.randint(0, len(products)-1)
        
        rfq_lines.append((
            rfqs[rfq_idx][0],  # rfq_id
            products[product_idx][0],  # product_id
            products[product_idx][1],  # product_name
            f'Specific requirements for {products[product_idx][1]}',
            random.randint(1, 100),
            'EA',
            datetime.now() + timedelta(days=random.randint(1, 30)),
            f'Specifications for {products[product_idx][1]}',
            random.choice(['Brand A', 'Brand B', 'Brand C']),
            f'Quality requirements for {products[product_idx][1]}'
        ))
    
    for line in rfq_lines:
        cursor.execute("""
        INSERT INTO rfq_lines (id, rfq_id, product_id, product_name, description, quantity, unit_of_measure, required_by, product_specifications, brand_preference, quality_requirements)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, line)
    print(f"Inserted {len(rfq_lines)} RFQ lines")
    
    # Insert quotes
    quotes = []
    for i in range(30):
        rfq_idx = random.randint(0, len(rfqs)-1)
        vendor_idx = random.randint(0, len(vendors)-1)
        validity_days = random.randint(15, 60)
        expiry_date = datetime.now() + timedelta(days=validity_days)
        
        quotes.append((
            rfqs[rfq_idx][0],  # rfq_id
            vendors[vendor_idx][0],  # vendor_id
            f'Quote-{i+1:03} for RFQ {rfq_idx+1}',
            f'Quote details for RFQ {rfq_idx+1}',
            random.choice(['DRAFT', 'SUBMITTED', 'ACCEPTED', 'REJECTED', 'EXPIRED']),
            Decimal(random.uniform(1000, 50000)),
            'USD',
            validity_days,
            expiry_date,
            datetime.now() - timedelta(days=random.randint(1, 30)) if random.choice([True, False]) else None,
            f'Quoted by Vendor {vendor_idx+1}',
            f'Q-{i+1:03}',
            expiry_date,
            random.choice([True, False]),
            random.choice([True, False])
        ))
    
    for quote in quotes:
        cursor.execute("""
        INSERT INTO quotes (id, rfq_id, vendor_id, title, description, quote_status, total_amount, currency, validity_days, expiry_date, accepted_at, quoted_by, quote_number, valid_until, freight_included, tax_included)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, quote)
    print(f"Inserted {len(quotes)} quotes")
    
    # Insert quote lines
    quote_lines = []
    for i in range(100):
        quote_idx = random.randint(0, len(quotes)-1)
        rfq_line_idx = random.randint(0, len(rfq_lines)-1)
        product_idx = random.randint(0, len(products)-1)
        
        unit_price = Decimal(random.uniform(10, 1000))
        quantity = random.randint(1, 50)
        line_total = unit_price * quantity
        
        quote_lines.append((
            quotes[quote_idx][0],  # quote_id
            rfq_lines[rfq_line_idx][0],  # rfq_line_id
            products[product_idx][0],  # product_id
            products[product_idx][1],  # product_name
            f'Quote line details for {products[product_idx][1]}',
            unit_price,
            quantity,
            line_total,
            random.randint(1, 10)
        ))
    
    for line in quote_lines:
        cursor.execute("""
        INSERT INTO quote_lines (id, quote_id, rfq_line_id, product_id, product_name, description, unit_price, quantity, line_total, moq)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, line)
    print(f"Inserted {len(quote_lines)} quote lines")
    
    # Insert orders
    orders = []
    for i in range(40):
        account_idx = random.randint(0, len(accounts)-1)
        quote_idx = random.randint(0, len(quotes)-1) if quotes else None
        status = random.choice(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
        
        # Calculate amounts based on quote if available
        subtotal = Decimal(random.uniform(500, 10000))
        tax_amount = subtotal * Decimal('0.05')  # 5% tax
        shipping_amount = Decimal(random.uniform(20, 200))
        discount_amount = subtotal * Decimal(random.uniform(0, 0.1))  # 0-10% discount
        total_amount = subtotal + tax_amount + shipping_amount - discount_amount
        
        orders.append((
            accounts[account_idx][0],  # account_id
            quotes[quote_idx][0] if quote_idx is not None else None,  # quote_id
            f'PO-{i+1:04}',
            status,
            'USD',
            subtotal,
            tax_amount,
            shipping_amount,
            discount_amount,
            total_amount,
            f'{{"street": "{i+100} Billing St", "city": "Dubai", "country": "AE", "postalCode": "{i+10000}"}}',
            f'{{"street": "{i+100} Shipping St", "city": "Dubai", "country": "AE", "postalCode": "{i+10000}"}}',
            f'Notes for order {i+1}'
        ))
    
    for order in orders:
        cursor.execute("""
        INSERT INTO orders (id, account_id, quote_id, po_number, order_status, currency, subtotal, tax_amount, shipping_amount, discount_amount, total_amount, billing_address, shipping_address, notes)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, order)
    print(f"Inserted {len(orders)} orders")
    
    # Insert order lines
    order_lines = []
    for i in range(120):
        order_idx = random.randint(0, len(orders)-1)
        product_idx = random.randint(0, len(products)-1)
        
        unit_price = Decimal(random.uniform(10, 500))
        quantity = random.randint(1, 20)
        total_price = unit_price * quantity
        
        order_lines.append((
            orders[order_idx][0],  # order_id
            products[product_idx][0],  # product_id
            products[product_idx][1],  # product_name
            f'Details for {products[product_idx][1]} in order',
            unit_price,
            quantity,
            total_price
        ))
    
    for line in order_lines:
        cursor.execute("""
        INSERT INTO order_lines (id, order_id, product_id, product_name, description, unit_price, quantity, total_price)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s)
        """, line)
    print(f"Inserted {len(order_lines)} order lines")
    
    # Insert payments
    payments = []
    for i in range(35):
        order_idx = random.randint(0, len(orders)-1)
        status = random.choice(['PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED'])
        
        payments.append((
            orders[order_idx][0],  # order_id
            random.choice(['CREDIT_CARD', 'BANK_TRANSFER', 'WALLET', 'CASH_ON_DELIVERY']),
            orders[order_idx][5],  # amount from order subtotal
            'USD',
            status,
            f'TXN-{i+1:05}',
            random.choice(['STRIPE', 'PAYPAL', 'BANK']),
            f'{{"status": "{status}", "ref": "TXN-{i+1:05}"}}',
            datetime.now() - timedelta(days=random.randint(0, 10)) if status in ['CAPTURED', 'REFUNDED'] else None
        ))
    
    for payment in payments:
        cursor.execute("""
        INSERT INTO payments (id, order_id, payment_method, amount, currency, payment_status, transaction_id, provider, provider_response, captured_at)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, payment)
    print(f"Inserted {len(payments)} payments")
    
    # Insert wallets
    wallets = []
    for i in range(40):
        account_idx = random.randint(0, len(accounts)-1)
        balance = Decimal(random.uniform(0, 10000))
        
        wallets.append((
            accounts[account_idx][0],  # account_id
            f'Wallet {i+1}',
            balance,
            'USD',
            'ACTIVE'
        ))
    
    for wallet in wallets:
        cursor.execute("""
        INSERT INTO wallets (id, account_id, name, balance, currency, wallet_status)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s)
        """, wallet)
    print(f"Inserted {len(wallets)} wallets")
    
    # Insert wallet transactions
    wallet_transactions = []
    for i in range(100):
        wallet_idx = random.randint(0, len(wallets)-1)
        txn_type = random.choice(['CREDIT', 'DEBIT'])
        amount = Decimal(random.uniform(10, 1000))
        
        wallet_transactions.append((
            wallets[wallet_idx][0],  # wallet_id
            txn_type,
            amount,
            random.choice(['ORDER', 'REFUND', 'TOPUP', 'PROMOTION']),
            f'ORDER-{random.randint(1, 40):03}',
            f'Description for wallet transaction {i+1}',
            Decimal(random.uniform(0, 10000))  # balance_after
        ))
    
    for txn in wallet_transactions:
        cursor.execute("""
        INSERT INTO wallet_transactions (id, wallet_id, transaction_type, amount, reference_type, reference_id, description, balance_after)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s)
        """, txn)
    print(f"Inserted {len(wallet_transactions)} wallet transactions")
    
    # Insert credit limits
    credit_limits = []
    for i in range(30):
        account_idx = random.randint(0, len(accounts)-1)
        limit_amount = Decimal(random.uniform(5000, 50000))
        used_amount = limit_amount * Decimal(random.uniform(0.1, 0.8))
        available_amount = limit_amount - used_amount
        
        credit_limits.append((
            accounts[account_idx][0],  # account_id
            'USD',
            limit_amount,
            available_amount,
            used_amount,
            'ACTIVE',
            datetime.now().date() - timedelta(days=random.randint(30, 365)),
            f'User-{random.randint(1, 50):02}'
        ))
    
    for limit in credit_limits:
        cursor.execute("""
        INSERT INTO credit_limits (id, account_id, currency, limit_amount, available_amount, used_amount, credit_status, approved_date, approved_by)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s)
        """, limit)
    print(f"Inserted {len(credit_limits)} credit limits")
    
    # Insert loyalty programs
    loyalty_programs = [
        ('VIP Customer Program', 'Premium loyalty program for our best customers', datetime.now().date(), datetime(2026, 12, 31).date(), 'ACTIVE', Decimal('1.00'), Decimal('1000.00')),
        ('Standard Rewards', 'Standard loyalty program for all customers', datetime.now().date(), datetime(2025, 12, 31).date(), 'ACTIVE', Decimal('0.50'), Decimal('500.00')),
    ]
    
    for program in loyalty_programs:
        cursor.execute("""
        INSERT INTO loyalty_programs (id, name, description, start_date, end_date, program_status, point_ratio, max_points_per_transaction)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s)
        """, program)
    print(f"Inserted {len(loyalty_programs)} loyalty programs")
    
    # Insert tiers
    tiers = [
        (loyalty_programs[0][0], 'Bronze Tier', 'Bronze membership tier', 0, Decimal('2.50'), False),
        (loyalty_programs[0][0], 'Silver Tier', 'Silver membership tier', 1000, Decimal('5.00'), True),
        (loyalty_programs[0][0], 'Gold Tier', 'Gold membership tier', 5000, Decimal('7.50'), True),
        (loyalty_programs[1][0], 'Standard Tier', 'Standard membership tier', 0, Decimal('1.00'), False),
        (loyalty_programs[1][0], 'Premium Tier', 'Premium membership tier', 2000, Decimal('3.00'), True),
    ]
    
    for tier in tiers:
        cursor.execute("""
        INSERT INTO tiers (id, loyalty_program_id, name, description, min_points_required, discount_percentage, priority_support)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s)
        """, tier)
    print(f"Inserted {len(tiers)} tiers")
    
    # Insert account tiers
    account_tiers = []
    for i in range(30):
        account_idx = random.randint(0, len(accounts)-1)
        tier_idx = random.randint(0, len(tiers)-1)
        
        account_tiers.append((
            accounts[account_idx][0],  # account_id
            tiers[tier_idx][0],  # tier_id
            datetime.now().date() - timedelta(days=random.randint(0, 365)),
            datetime.now().date() + timedelta(days=random.randint(30, 365)) if random.choice([True, False]) else None,
            'ACTIVE'
        ))
    
    for acc_tier in account_tiers:
        cursor.execute("""
        INSERT INTO account_tiers (id, account_id, tier_id, start_date, end_date, membership_status)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s)
        """, acc_tier)
    print(f"Inserted {len(account_tiers)} account tiers")
    
    # Insert rewards
    rewards = [
        (loyalty_programs[0][0], 'Free Shipping', 'Free shipping reward', 100, 100, 50, 'ACTIVE'),
        (loyalty_programs[0][0], '10% Discount', '10% discount on next purchase', 200, 50, 30, 'ACTIVE'),
        (loyalty_programs[0][0], '$50 Voucher', '$50 voucher for store credit', 300, 25, 15, 'ACTIVE'),
        (loyalty_programs[1][0], '5% Discount', '5% discount on next purchase', 150, 200, 150, 'ACTIVE'),
    ]
    
    for reward in rewards:
        cursor.execute("""
        INSERT INTO rewards (id, loyalty_program_id, name, description, points_required, redemption_limit, remaining_redemptions, reward_status)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s)
        """, reward)
    print(f"Inserted {len(rewards)} rewards")
    
    # Insert loyalty transactions
    loyalty_transactions = []
    for i in range(200):
        account_idx = random.randint(0, len(accounts)-1)
        txn_type = random.choice(['EARN', 'BURN', 'ADJUST'])
        points = Decimal(random.uniform(10, 500))
        
        loyalty_transactions.append((
            accounts[account_idx][0],  # account_id
            txn_type,
            points,
            random.choice(['ORDER', 'PROMOTION', 'REFUND', 'REWARD']),
            f'ORDER-{random.randint(1, 40):03}',
            Decimal(random.uniform(0, 5000)),  # balance_after
            f'Loyalty transaction {i+1}'
        ))
    
    for txn in loyalty_transactions:
        cursor.execute("""
        INSERT INTO loyalty_transactions (id, account_id, txn_type, points, reference_type, reference_id, balance_after, description)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s)
        """, txn)
    print(f"Inserted {len(loyalty_transactions)} loyalty transactions")
    
    # Insert invoices
    invoices = []
    for i in range(30):
        tax_reg_idx = random.randint(0, len(tax_regs)-1)
        order_idx = random.randint(0, len(orders)-1)
        
        # Calculate amounts
        subtotal = orders[order_idx][5]  # From order subtotal
        discount_amount = subtotal * Decimal(random.uniform(0, 0.1))  # 0-10% discount
        vat_amount = (subtotal - discount_amount) * Decimal('0.05')  # 5% VAT
        total_amount = subtotal - discount_amount + vat_amount
        
        invoices.append((
            tax_regs[tax_reg_idx][0],  # tax_reg_id
            sequence_registries[i % len(sequence_registries)][5] + i + 1,  # sequence number
            f'{sequence_registries[i % len(sequence_registries)][2]}-{sequence_registries[i % len(sequence_registries)][5] + i + 1:04}',
            orders[order_idx][0],  # order_id
            datetime.now().date() - timedelta(days=random.randint(0, 30)),
            datetime.now().date() + timedelta(days=random.randint(15, 60)),
            'USD',
            subtotal,
            discount_amount,
            vat_amount,
            total_amount,
            random.choice(['DRAFT', 'ISSUED', 'PAID', 'OVERDUE', 'CANCELLED']),
            f'{accounts[order_idx % len(accounts)][1]} {accounts[order_idx % len(accounts)][2]}',  # customer name
            accounts[order_idx % len(accounts)][6],  # customer tax number
            f'{{"street": "{order_idx+100} Customer St", "city": "Dubai", "country": "AE", "postalCode": "{order_idx+10000}"}}',
            f'Invoice {i+1} notes'
        ))
    
    for invoice in invoices:
        cursor.execute("""
        INSERT INTO invoices (id, tax_reg_id, sequence_number, full_number, order_id, issued_date, due_date, currency, subtotal, discount_amount, vat_amount, total_amount, invoice_status, customer_name, customer_tax_number, customer_address, notes)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, invoice)
    print(f"Inserted {len(invoices)} invoices")
    
    # Insert invoice lines
    invoice_lines = []
    for i in range(80):
        invoice_idx = random.randint(0, len(invoices)-1)
        order_line_idx = random.randint(0, len(order_lines)-1)
        
        # Use values from the corresponding order line
        unit_price = order_lines[order_line_idx][4]
        quantity = order_lines[order_line_idx][5]
        vat_rate = Decimal('5.00')  # 5% VAT
        vat_amount = (unit_price * quantity * vat_rate) / 100
        total_amount = (unit_price * quantity) + vat_amount
        
        invoice_lines.append((
            invoices[invoice_idx][0],  # invoice_id
            order_lines[order_line_idx][0],  # order_line_id
            order_lines[order_line_idx][2],  # product_name
            order_lines[order_line_idx][3],  # description
            unit_price,
            quantity,
            vat_rate,
            vat_amount,
            total_amount
        ))
    
    for line in invoice_lines:
        cursor.execute("""
        INSERT INTO invoice_lines (id, invoice_id, order_line_id, product_name, description, unit_price, quantity, vat_rate, vat_amount, total_amount)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, line)
    print(f"Inserted {len(invoice_lines)} invoice lines")
    
    # Insert credit notes
    credit_notes = []
    for i in range(10):
        tax_reg_idx = random.randint(0, len(tax_regs)-1)
        invoice_idx = random.randint(0, len(invoices)-1)
        
        # Calculate amounts (partial refund)
        subtotal = invoices[invoice_idx][7] * Decimal(random.uniform(0.1, 0.5))  # 10-50% of invoice
        vat_amount = subtotal * Decimal('0.05')  # 5% VAT
        total_amount = subtotal + vat_amount
        
        credit_notes.append((
            tax_regs[tax_reg_idx][0],  # tax_reg_id
            sequence_registries[i % len(sequence_registries)][5] + i + 1,  # sequence number
            f'{sequence_registries[i % len(sequence_registries)][2]}-CN-{sequence_registries[i % len(sequence_registries)][5] + i + 1:04}',
            invoices[invoice_idx][0],  # invoice_id
            datetime.now().date() - timedelta(days=random.randint(0, 15)),
            random.choice(['RETURN', 'CANCELLED_ORDER', 'DISCOUNT', 'ERROR', 'OTHER']),
            f'Credit note {i+1} reason details',
            'USD',
            subtotal,
            vat_amount,
            total_amount,
            'DRAFT'
        ))
    
    for note in credit_notes:
        cursor.execute("""
        INSERT INTO credit_notes (id, tax_reg_id, sequence_number, full_number, invoice_id, issued_date, reason, reason_details, currency, subtotal, vat_amount, total_amount, credit_status)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, note)
    print(f"Inserted {len(credit_notes)} credit notes")
    
    # Insert credit note lines
    credit_note_lines = []
    for i in range(25):
        credit_note_idx = random.randint(0, len(credit_notes)-1)
        invoice_line_idx = random.randint(0, len(invoice_lines)-1)
        
        # Use values from the corresponding invoice line with partial quantity
        quantity = min(int(invoice_lines[invoice_line_idx][5] * random.uniform(0.1, 0.8)), invoice_lines[invoice_line_idx][5])
        unit_price = invoice_lines[invoice_line_idx][4]
        vat_rate = invoice_lines[invoice_line_idx][6]
        vat_amount = (unit_price * quantity * vat_rate) / 100
        total_amount = (unit_price * quantity) + vat_amount
        
        credit_note_lines.append((
            credit_notes[credit_note_idx][0],  # credit_note_id
            invoice_lines[invoice_line_idx][0],  # invoice_line_id
            quantity,
            unit_price,
            vat_rate,
            vat_amount,
            total_amount
        ))
    
    for line in credit_note_lines:
        cursor.execute("""
        INSERT INTO credit_note_lines (id, credit_note_id, invoice_line_id, quantity, unit_price, vat_rate, vat_amount, total_amount)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s)
        """, line)
    print(f"Inserted {len(credit_note_lines)} credit note lines")
    
    # Insert audit log entries
    audit_logs = []
    for i in range(50):
        audit_logs.append((
            f'User-{random.randint(1, 100):03}',
            random.choice(['CREATE', 'UPDATE', 'DELETE', 'READ']),
            random.choice(['ACCOUNT', 'PRODUCT', 'ORDER', 'USER', 'VENDOR']),
            f'Entity-{i+1:03}',
            f'{{"old_field1": "old_value", "old_field2": {random.randint(1, 100)}}}',
            f'{{"new_field1": "new_value", "new_field2": {random.randint(101, 200)}}}',
            f'{{"session_id": "session_{i+1}", "ip": "192.168.1.{i+1}"}}',
            f'entity_{i+1}',
            random.choice(['Account', 'Product', 'Order', 'User', 'Vendor'])
        ))
    
    for log in audit_logs:
        cursor.execute("""
        INSERT INTO audit_log (id, user_id, action, resource_type, resource_id, old_values, new_values, metadata, entity_id, entity_type)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, log)
    print(f"Inserted {len(audit_logs)} audit log entries")
    
    # Insert idempotency keys
    idempotency_keys = []
    for i in range(20):
        idempotency_keys.append((
            f'idemp_key_{i+1}',
            random.choice(['POST', 'PUT', 'PATCH']),
            f'/api/{random.choice(["orders", "payments", "rfqs"])}/{i+1}',
            f'{{"data": "request_body_{i+1}"}}',
            random.choice([200, 201, 400, 401, 500]),
            f'{{"status": "success", "id": "{i+1}"}}',
            datetime.now() + timedelta(hours=random.randint(1, 24))
        ))
    
    for key in idempotency_keys:
        cursor.execute("""
        INSERT INTO idempotency_keys (id, key_value, request_method, request_path, request_body, response_status, response_body, expires_at)
        VALUES (gen_random_ulid(), %s, %s, %s, %s, %s, %s, %s)
        """, key)
    print(f"Inserted {len(idempotency_keys)} idempotency keys")
    
    # Commit all changes
    conn.commit()
    print("\nAll data inserted successfully!")
    
    # Close connections
    cursor.close()
    conn.close()
    
    print("Database seeding completed successfully!")
    
except Exception as e:
    print(f"Error seeding database: {str(e)}")
    if 'conn' in locals():
        conn.rollback()