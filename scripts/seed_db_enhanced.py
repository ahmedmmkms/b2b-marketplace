import os
import psycopg2
from dotenv import load_dotenv
import uuid
from datetime import datetime, timedelta
import random
import string
import json
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

def generate_ulid():
    """Generate a ULID (Universally Unique Lexicographically Sortable Identifier) - 26 chars"""
    # Generate timestamp part (10 characters)
    timestamp = '{:0>10}'.format(int(datetime.now().timestamp()))
    # Generate random part (16 characters)
    random_part = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
    return timestamp + random_part

def insert_mock_data():
    """Insert comprehensive mock data into all tables of the database"""
    connection_params = load_db_config()
    
    try:
        # Connect to the database
        print("Connecting to the database...")
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        print("Inserting comprehensive mock data...")
        
        # Step 1: Insert mock vendors (20 vendors)
        vendors = []
        vendor_names = [
            "Global Electronics", "Premium Supplies Co.", "Trade Hub Limited", "Mega Parts Inc.",
            "Industrial Solutions", "Quality Components", "Advanced Machinery", "Tech Materials",
            "Electro Dynamics", "Precision Tools", "Global Traders", "Resource Plus", 
            "Industrial Equipment", "Tech Supplies", "Electronics Direct", "Machinery Works",
            "Advanced Components", "Supply Chain Pro", "Global Parts", "Premium Tech"
        ]
        
        for i in range(20):
            vendor_id = generate_ulid()
            vendor_data = {
                'id': vendor_id,
                'name': vendor_names[i],
                'description': f'Description for {vendor_names[i]}',
                'contact_person': f'Contact Person {i+1}',
                'contact_email': f'contact{i+1}@{vendor_names[i].lower().replace(" ", "")}.com',
                'contact_phone': f'+{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}',
                'tax_number': f'TAX{i+1}23456',
                'status': random.choice(['ACTIVE', 'PENDING', 'SUSPENDED'])
            }
            vendors.append(vendor_data)
            
            cursor.execute("""
                INSERT INTO vendor (id, name, description, contact_person, contact_email, 
                                   contact_phone, address, tax_number, status, approval_date, 
                                   created_at, updated_at)
                VALUES (%(id)s, %(name)s, %(description)s, %(contact_person)s, %(contact_email)s, 
                        %(contact_phone)s, '{"country": "Egypt", "city": "Cairo", "address_line1": "123 Vendor Street", "postal_code": "12345"}', 
                        %(tax_number)s, %(status)s, NOW(), NOW(), NOW())
            """, vendor_data)
        
        # Step 2: Insert mock accounts (15 accounts)
        accounts = []
        account_names = [
            "Corporate Solutions", "Business Enterprise", "Trading Company", "Manufacturing Inc.",
            "Service Providers", "Tech Innovations", "Distributor Group", "Retail Holdings",
            "Wholesale Partners", "Industry Leaders", "Market Experts", "Supply Chain Group",
            "Enterprise Group", "Business Solutions", "Trade Partners"
        ]
        
        for i in range(15):
            account_id = generate_ulid()
            account_type = random.choice(['INDIVIDUAL', 'COMPANY'])
            account_data = {
                'id': account_id,
                'name': account_names[i],
                'type': account_type,
                'legal_name': f'{account_names[i]} {"LLC" if account_type == "COMPANY" else "Individual"}',
                'tax_number': f'TAX-A{i+1}23456',
                'status': random.choice(['ACTIVE', 'PENDING', 'SUSPENDED'])
            }
            accounts.append(account_data)
            
            cursor.execute("""
                INSERT INTO account (id, name, type, legal_name, tax_number, status, created_at, updated_at)
                VALUES (%(id)s, %(name)s, %(type)s, %(legal_name)s, %(tax_number)s, %(status)s, NOW(), NOW())
            """, account_data)
        
        # Step 3: Insert mock users (30 users)
        users = []
        for i in range(30):
            user_id = generate_ulid()
            account = random.choice(accounts)
            user_data = {
                'id': user_id,
                'account_id': account['id'],
                'first_name': f'FirstName{i+1}',
                'last_name': f'LastName{i+1}',
                'email': f'user{i+1}_{generate_ulid()}@{account["name"].lower().replace(" ", "")}.com',  # Make email unique
                'phone': f'+{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}',
                'role': random.choice(['USER', 'ADMIN', 'BUYER', 'VENDOR']),
                'status': 'ACTIVE'
            }
            users.append(user_data)
            
            cursor.execute("""
                INSERT INTO app_user (id, account_id, first_name, last_name, email, 
                                     phone, role, status, email_verified, created_at, updated_at)
                VALUES (%(id)s, %(account_id)s, %(first_name)s, %(last_name)s, %(email)s,
                        %(phone)s, %(role)s, %(status)s, true, NOW(), NOW())
            """, user_data)
        
        # Step 4: Insert mock product attributes (20 attributes)
        attributes = []
        attr_types = ['TEXT', 'NUMBER', 'BOOLEAN', 'SELECT', 'DATE']
        base_attr_names = ['color', 'size', 'weight', 'material', 'brand', 'model', 'warranty', 'power', 'voltage', 'capacity']
        for i in range(20):
            attr_id = generate_ulid()
            attr_name = f'{base_attr_names[i % len(base_attr_names)]}_{i+1}'
            attr_data = {
                'id': attr_id,
                'name': attr_name,
                'display_name': f'{base_attr_names[i % len(base_attr_names)].title()} {i+1}',
                'attribute_type': random.choice(attr_types),
                'is_required': random.choice([True, False]),
                'is_searchable': random.choice([True, False]),
                'is_filterable': random.choice([True, False])
            }
            attributes.append(attr_data)
            
            cursor.execute("""
                INSERT INTO product_attribute (id, name, display_name, attribute_type,
                                              is_required, is_searchable, is_filterable,
                                              validation_rules, created_at, updated_at)
                VALUES (%(id)s, %(name)s, %(display_name)s, %(attribute_type)s,
                        %(is_required)s, %(is_searchable)s, %(is_filterable)s, 
                        NULL, NOW(), NOW())
            """, attr_data)
        
        # Step 5: Insert mock products (100 products)
        products = []
        product_names = [
            "Smartphone", "Laptop", "Tablet", "Wireless Headphones", "Smart Watch", 
            "Camera", "Gaming Console", "Router", "Printer", "Monitor", 
            "Keyboard", "Mouse", "External Hard Drive", "USB Cable", "Power Bank",
            "Bluetooth Speaker", "TV", "Refrigerator", "Washing Machine", "Microwave",
            "Air Conditioner", "Vacuum Cleaner", "Toaster", "Coffee Maker", "Blender",
            "Drill", "Saw", "Screwdriver Set", "Wrench Set", "Pliers",
            "Hammer", "Flashlight", "Ladder", "Soldering Iron", "Multimeter",
            "Screw Set", "Nail Gun", "Circular Saw", "Jigsaw", "Angle Grinder",
            "Welding Machine", "Generator", "Compressor", "Pressure Washer", "Leaf Blower",
            "Lawn Mower", "Hedge Trimmer", "Chainsaw", "Pump", "Heater",
            "Fan", "Dehumidifier", "Humidifier", "Air Purifier", "Water Filter",
            "Coffee Grinder", "Food Processor", "Stand Mixer", "Rice Cooker", "Slow Cooker",
            "Pressure Cooker", "Bread Maker", "Electric Kettle", "Toaster Oven", "Air Fryer",
            "Sewing Machine", "Iron", "Steamer", "Vacuum Sealer", "Meat Grinder",
            "Juicer", "Ice Maker", "Wine Cooler", "Keurig", "Espresso Machine",
            "Water Heater", "Thermostat", "Security Camera", "Door Lock", "Light Switch",
            "Outlet", "Dimmer", "Timer", "Motion Sensor", "Smoke Detector",
            "Carbon Monoxide Detector", "Security System", "Smart Home Hub", "Thermostat", "Security Camera",
            "Drone", "VR Headset", "Electric Scooter", "Electric Bike", "Hoverboard"
        ]
        
        for i in range(100):
            product_id = generate_ulid()
            vendor = random.choice(vendors)
            product_name = random.choice(product_names)
            product_data = {
                'id': product_id,
                'name': f'{product_name} Model {random.randint(100, 999)}',
                'slug': f'{product_name.lower().replace(" ", "-")}-model-{random.randint(100, 999)}',
                'description': f'Detailed description for {product_name} Model {random.randint(100, 999)}',
                'short_description': f'Short description for {product_name}',
                'sku': f'SKU-{generate_ulid()}',  # Use full ULID for guaranteed uniqueness
                'brand': f'Brand {random.randint(1, 10)}',
                'vendor_id': vendor['id'],
                'status': random.choice(['DRAFT', 'PUBLISHED', 'UNPUBLISHED', 'SUSPENDED']),
                'currency': 'USD',
                'base_price': round(random.uniform(10.0, 2000.0), 2),
                'weight': round(random.uniform(0.1, 50.0), 3),
                'min_order_qty': random.randint(1, 10),
                'moq': random.randint(1, 5),
                'inventory_tracking': True,
                'inventory_qty': random.randint(0, 500),
                'inventory_status': random.choice(['IN_STOCK', 'OUT_OF_STOCK', 'BACKORDER'])
            }
            products.append(product_data)
            
            cursor.execute("""
                INSERT INTO product (id, name, slug, description, short_description, 
                                    sku, brand, vendor_id, status, currency, base_price,
                                    weight, dimensions, min_order_qty, moq, 
                                    inventory_tracking, inventory_qty, inventory_status,
                                    created_at, updated_at)
                VALUES (%(id)s, %(name)s, %(slug)s, %(description)s, %(short_description)s,
                        %(sku)s, %(brand)s, %(vendor_id)s, %(status)s, %(currency)s, %(base_price)s,
                        %(weight)s, '{"length": 10, "width": 5, "height": 3}', %(min_order_qty)s, %(moq)s,
                        %(inventory_tracking)s, %(inventory_qty)s, %(inventory_status)s,
                        NOW(), NOW())
            """, product_data)
        
        # Step 6: Insert mock product attribute values
        for product in products:
            # Each product gets 2-5 random attributes
            num_attrs = random.randint(2, 5)
            selected_attrs = random.sample(attributes, num_attrs)
            
            for attr in selected_attrs:
                pav_id = generate_ulid()
                
                # Generate appropriate value based on attribute type
                if attr['attribute_type'] == 'TEXT':
                    value_text = f"Value for {attr['display_name']}"
                    value_number, value_boolean, value_date = None, None, None
                elif attr['attribute_type'] == 'NUMBER':
                    value_number = round(random.uniform(1.0, 100.0), 2)
                    value_text, value_boolean, value_date = None, None, None
                elif attr['attribute_type'] == 'BOOLEAN':
                    value_boolean = random.choice([True, False])
                    value_text, value_number, value_date = None, None, None
                elif attr['attribute_type'] == 'DATE':
                    value_date = datetime.now() - timedelta(days=random.randint(1, 365))
                    value_text, value_number, value_boolean = None, None, None
                else:  # SELECT or other
                    value_text = f"Option {random.randint(1, 3)}"
                    value_number, value_boolean, value_date = None, None, None
                
                cursor.execute("""
                    INSERT INTO product_attribute_value (id, product_id, attribute_id,
                                                        value_text, value_number, value_boolean, value_date,
                                                        created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
                """, (generate_ulid(), product['id'], attr['id'], 
                      value_text, value_number, value_boolean, value_date))
        
        # Step 7: Insert mock media assets
        media_assets = []
        for i in range(200):
            media_id = generate_ulid()
            media_data = {
                'id': media_id,
                'name': f'Media Asset {i+1}',
                'filename': f'product_image_{i+1}.jpg',
                'file_path': f'media/products/product_image_{i+1}.jpg',
                'mime_type': 'image/jpeg',
                'file_size': random.randint(50000, 5000000),  # 50KB to 5MB
                'alt_text': f'Alt text for image {i+1}',
                'title': f'Title for image {i+1}',
                'media_type': 'IMAGE',
                'status': 'ACTIVE',
                'is_primary': i % 5 == 0  # Every 5th image is primary
            }
            media_assets.append(media_data)
            
            cursor.execute("""
                INSERT INTO media_asset (id, name, filename, file_path, mime_type,
                                        file_size, alt_text, title, caption, tags,
                                        media_type, status, is_primary, created_at, updated_at)
                VALUES (%(id)s, %(name)s, %(filename)s, %(file_path)s, %(mime_type)s,
                        %(file_size)s, %(alt_text)s, %(title)s, %(name)s, 'tag1,tag2,tag3',
                        %(media_type)s, %(status)s, %(is_primary)s, NOW(), NOW())
            """, media_data)
        
        # Step 8: Associate media assets with products
        for product in products:
            # Each product gets 1-3 media assets
            num_media = random.randint(1, 3)
            selected_media = random.sample(media_assets, num_media)
            
            for idx, media in enumerate(selected_media):
                cursor.execute("""
                    INSERT INTO product_media (id, product_id, media_asset_id, sort_order, created_at)
                    VALUES (%s, %s, %s, %s, NOW())
                """, (generate_ulid(), product['id'], media['id'], idx))
        
        # Step 9: Insert mock RFQs (20 RFQs)
        rfqs = []
        for i in range(20):
            rfq_id = generate_ulid()
            account = random.choice(accounts)
            expiry_date = datetime.now() + timedelta(days=random.randint(7, 30))
            rfq_data = {
                'id': rfq_id,
                'account_id': account['id'],
                'title': f'RFQ for {account["name"]} - {i+1}',
                'description': f'Detailed description for RFQ {i+1}',
                'status': random.choice(['DRAFT', 'OPEN', 'CLOSED', 'EXPIRED']),
                'expiry_date': expiry_date,
                'currency': 'USD'
            }
            rfqs.append(rfq_data)
            
            cursor.execute("""
                INSERT INTO rfq (id, account_id, title, description, status, 
                                expiry_date, currency, is_public, created_at, updated_at)
                VALUES (%(id)s, %(account_id)s, %(title)s, %(description)s, %(status)s,
                        %(expiry_date)s, %(currency)s, false, NOW(), NOW())
            """, rfq_data)
        
        # Step 10: Insert mock RFQ lines (50 lines)
        rfq_lines = []
        for i in range(50):
            rfq_line_id = generate_ulid()
            rfq = random.choice(rfqs)
            product = random.choice(products)
            rfq_line_data = {
                'id': rfq_line_id,
                'rfq_id': rfq['id'],
                'product_id': product['id'],
                'product_name': product['name'],
                'description': f'Description for {product["name"]} in RFQ',
                'quantity': random.randint(10, 100),
                'unit_of_measure': random.choice(['EA', 'BOX', 'PKG', 'SET', 'LOT'])
            }
            rfq_lines.append(rfq_line_data)
            
            cursor.execute("""
                INSERT INTO rfq_line (id, rfq_id, product_id, product_name, description,
                                     quantity, unit_of_measure, created_at, updated_at)
                VALUES (%(id)s, %(rfq_id)s, %(product_id)s, %(product_name)s, %(description)s,
                        %(quantity)s, %(unit_of_measure)s, NOW(), NOW())
            """, rfq_line_data)
        
        # Step 11: Insert mock quotes (30 quotes)
        quotes = []
        for i in range(30):
            quote_id = generate_ulid()
            rfq = random.choice(rfqs)
            vendor = random.choice(vendors)
            expiry_date = datetime.now() + timedelta(days=30)
            quote_data = {
                'id': quote_id,
                'rfq_id': rfq['id'],
                'vendor_id': vendor['id'],
                'title': f'Quote for {vendor["name"]} - RFQ {rfq["id"]}',
                'description': f'Quote description for RFQ {rfq["id"]}',
                'status': random.choice(['DRAFT', 'SUBMITTED', 'ACCEPTED', 'REJECTED', 'EXPIRED']),
                'total_amount': round(random.uniform(100.0, 5000.0), 2),
                'expiry_date': expiry_date
            }
            quotes.append(quote_data)
            
            cursor.execute("""
                INSERT INTO quote (id, rfq_id, vendor_id, title, description, status,
                                  total_amount, currency, expiry_date, created_at, updated_at)
                VALUES (%(id)s, %(rfq_id)s, %(vendor_id)s, %(title)s, %(description)s, %(status)s,
                        %(total_amount)s, 'USD', %(expiry_date)s, NOW(), NOW())
            """, quote_data)
        
        # Step 12: Insert mock quote lines (80 lines)
        for i in range(80):
            quote_line_id = generate_ulid()
            quote = random.choice(quotes)
            # Get RFQ lines that belong to the same RFQ as the quote
            matching_rfq_lines = [rl for rl in rfq_lines if rl['rfq_id'] == quote['rfq_id']]
            
            if matching_rfq_lines:
                # Use an existing RFQ line
                rfq_line = random.choice(matching_rfq_lines)
                rfq_line_id = rfq_line['id']
                quantity = rfq_line['quantity']
            else:
                # Create a new RFQ line for this quote's RFQ
                rfq_line_id_new = generate_ulid()
                product = random.choice(products)
                rfq_line_data = {
                    'id': rfq_line_id_new,
                    'rfq_id': quote['rfq_id'],
                    'product_id': product['id'],
                    'product_name': product['name'],
                    'description': f'Description for {product["name"]} in RFQ',
                    'quantity': random.randint(10, 100),
                    'unit_of_measure': random.choice(['EA', 'BOX', 'PKG', 'SET', 'LOT'])
                }
                
                cursor.execute("""
                    INSERT INTO rfq_line (id, rfq_id, product_id, product_name, description,
                                         quantity, unit_of_measure, created_at, updated_at)
                    VALUES (%(id)s, %(rfq_id)s, %(product_id)s, %(product_name)s, %(description)s,
                            %(quantity)s, %(unit_of_measure)s, NOW(), NOW())
                """, rfq_line_data)
                
                rfq_line_id = rfq_line_id_new
                quantity = rfq_line_data['quantity']
                
            product = random.choice(products)
            
            unit_price = round(random.uniform(10.0, 500.0), 2)
            
            cursor.execute("""
                INSERT INTO quote_line (id, quote_id, rfq_line_id, product_id, product_name,
                                      description, unit_price, quantity, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
            """, (generate_ulid(), quote['id'], rfq_line_id, product['id'], product['name'],
                  f'Quote line for {product["name"]}', unit_price, quantity))
        
        # Step 13: Insert mock orders (40 orders)
        orders = []
        for i in range(40):
            order_id = generate_ulid()
            account = random.choice(accounts)
            quote = random.choice(quotes) if random.choice([True, False]) else None
            order_data = {
                'id': order_id,
                'account_id': account['id'],
                'quote_id': quote['id'] if quote else None,
                'po_number': f'PO-{i+1:06d}',
                'status': random.choice(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
                'subtotal': round(random.uniform(100.0, 10000.0), 2),
                'tax_amount': round(random.uniform(10.0, 500.0), 2),
                'shipping_amount': round(random.uniform(10.0, 200.0), 2),
                'discount_amount': round(random.uniform(0.0, 500.0), 2),
                'total_amount': round(random.uniform(100.0, 12000.0), 2)
            }
            orders.append(order_data)
            
            cursor.execute("""
                INSERT INTO order_table (id, account_id, quote_id, po_number, status,
                                        currency, subtotal, tax_amount, shipping_amount,
                                        discount_amount, total_amount, billing_address,
                                        shipping_address, notes, created_at, updated_at)
                VALUES (%(id)s, %(account_id)s, %(quote_id)s, %(po_number)s, %(status)s,
                        'USD', %(subtotal)s, %(tax_amount)s, %(shipping_amount)s,
                        %(discount_amount)s, %(total_amount)s,
                        '{"country": "Egypt", "city": "Cairo", "address_line1": "123 Billing St", "postal_code": "12345"}',
                        '{"country": "Egypt", "city": "Cairo", "address_line1": "456 Shipping St", "postal_code": "12345"}',
                        'Order notes', NOW(), NOW())
            """, order_data)
        
        # Step 14: Insert mock order lines (100 lines)
        for i in range(100):
            order_line_id = generate_ulid()
            order = random.choice(orders)
            product = random.choice(products)
            
            unit_price = round(random.uniform(10.0, 500.0), 2)
            quantity = random.randint(1, 10)
            
            cursor.execute("""
                INSERT INTO order_line (id, order_id, product_id, product_name, description,
                                      unit_price, quantity, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
            """, (generate_ulid(), order['id'], product['id'], product['name'],
                  f'Order line for {product["name"]}', unit_price, quantity))
        
        # Step 15: Insert mock payments (35 payments)
        for i in range(35):
            payment_id = generate_ulid()
            order = random.choice(orders)
            status = random.choice(['PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED', 'CANCELLED'])
            
            cursor.execute("""
                INSERT INTO payment (id, order_id, payment_method, amount, currency,
                                   status, transaction_id, provider, captured_at, created_at)
                VALUES (%s, %s, %s, %s, 'USD', %s, %s, %s, %s, NOW())
            """, (generate_ulid(), order['id'], 
                  random.choice(['credit_card', 'bank_transfer', 'wallet', 'paypal', 'stripe']),
                  round(random.uniform(50.0, 5000.0), 2), status,
                  f'TXN-{i+1:010d}', random.choice(['stripe', 'paypal', 'internal']), 
                  datetime.now() if status == 'CAPTURED' else None))
        
        # Step 16: Insert tax registration records
        tax_regs = []
        for i in range(5):
            tax_reg_id = generate_ulid()
            tax_reg_data = {
                'id': tax_reg_id,
                'legal_name': f'Tax Registration Entity {i+1}',
                'tax_number': f'VAT-{i+1:06d}',
                'address': json.dumps({"country": "Egypt", "city": "Cairo", "address_line1": "Tax Office", "postal_code": "12345"})
            }
            tax_regs.append(tax_reg_data)
            
            cursor.execute("""
                INSERT INTO tax_reg (id, legal_name, tax_number, address, created_at, updated_at)
                VALUES (%(id)s, %(legal_name)s, %(tax_number)s, %(address)s, NOW(), NOW())
            """, tax_reg_data)
        
        # Step 17: Insert sequence registry records
        for tax_reg in tax_regs:
            for seq_type in ['INVOICE', 'CREDIT_NOTE']:
                cursor.execute("""
                    INSERT INTO sequence_registry (id, tax_reg_id, sequence_type, prefix, 
                                                 current_value, next_value, year, created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
                """, (generate_ulid(), tax_reg['id'], seq_type, 
                      'INV' if seq_type == 'INVOICE' else 'CN',
                      random.randint(100, 200), random.randint(201, 300), 
                      datetime.now().year))
        
        # Step 18: Insert mock invoices (25 invoices)
        for i in range(25):
            invoice_id = generate_ulid()
            tax_reg = random.choice(tax_regs)
            order = random.choice(orders)
            due_date = datetime.now() + timedelta(days=random.randint(15, 45))
            
            cursor.execute("""
                INSERT INTO invoice (id, tax_reg_id, sequence_number, full_number, order_id,
                                   issued_date, due_date, currency, subtotal, discount_amount,
                                   vat_amount, total_amount, status, customer_name,
                                   customer_address, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, 'USD', %s, %s, %s, %s, %s, %s, %s, NOW())
            """, (generate_ulid(), tax_reg['id'], 
                  random.randint(1000, 9999), 
                  f'INV-{datetime.now().year}-{random.randint(1000, 9999):06d}',
                  order['id'], 
                  datetime.now() - timedelta(days=random.randint(1, 30)),
                  due_date,
                  round(random.uniform(100.0, 5000.0), 2),
                  round(random.uniform(0.0, 500.0), 2),
                  round(random.uniform(10.0, 500.0), 2),
                  round(random.uniform(100.0, 6000.0), 2),
                  random.choice(['DRAFT', 'ISSUED', 'PAID', 'OVERDUE', 'CANCELLED']),
                  f'Customer {i+1}',
                  json.dumps({"country": "Egypt", "city": "Cairo", "address_line1": f"Customer {i+1} Address"})))
        
        # Step 19: Insert wallets (20 wallets)
        for i in range(20):
            wallet_id = generate_ulid()
            account = random.choice(accounts)
            
            cursor.execute("""
                INSERT INTO wallet (id, account_id, name, balance, currency, status, created_at)
                VALUES (%s, %s, %s, %s, 'USD', %s, NOW())
            """, (generate_ulid(), account['id'], 
                  f'{account["name"]} Wallet {i+1}',
                  round(random.uniform(0.0, 10000.0), 2),
                  random.choice(['ACTIVE', 'SUSPENDED', 'CLOSED'])))
        
        # Step 20: Insert credit limits (15 credit limits)
        for i in range(15):
            credit_limit_id = generate_ulid()
            account = random.choice(accounts)
            limit_amount = round(random.uniform(1000.0, 50000.0), 2)
            used_amount = round(random.uniform(0.0, limit_amount * 0.8), 2)
            available_amount = limit_amount - used_amount
            
            cursor.execute("""
                INSERT INTO credit_limit (id, account_id, currency, limit_amount, 
                                        available_amount, used_amount, status, approved_date, notes, created_at)
                VALUES (%s, %s, 'USD', %s, %s, %s, %s, %s, %s, NOW())
            """, (generate_ulid(), account['id'], limit_amount, available_amount, 
                  used_amount, random.choice(['ACTIVE', 'SUSPENDED', 'EXCEEDED']),
                  datetime.now() - timedelta(days=random.randint(1, 180)),
                  f'Credit limit for {account["name"]}'))
        
        # Step 21: Insert loyalty programs (5 programs)
        loyalty_programs = []
        for i in range(5):
            program_id = generate_ulid()
            program_data = {
                'id': program_id,
                'name': f'Loyalty Program {i+1}',
                'description': f'Description for Loyalty Program {i+1}',
                'start_date': datetime.now() - timedelta(days=random.randint(0, 180)),
                'end_date': None if random.choice([True, False]) else (datetime.now() + timedelta(days=random.randint(30, 365))),
                'status': random.choice(['DRAFT', 'ACTIVE', 'SUSPENDED', 'COMPLETED', 'CANCELLED'])
            }
            loyalty_programs.append(program_data)
            
            point_ratio = round(random.uniform(0.5, 2.0), 2)
            max_points = random.randint(100, 1000)
            
            cursor.execute("""
                INSERT INTO loyalty_program (id, name, description, start_date, end_date,
                                           status, point_ratio, max_points_per_transaction, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())
            """, (program_data['id'], program_data['name'], program_data['description'], 
                  program_data['start_date'], program_data['end_date'], program_data['status'],
                  point_ratio, max_points))
        
        # Step 22: Insert tiers (15 tiers)
        for i in range(15):
            tier_id = generate_ulid()
            program = random.choice(loyalty_programs)
            
            cursor.execute("""
                INSERT INTO tier (id, loyalty_program_id, name, description, min_points_required,
                                discount_percentage, priority_support, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
            """, (generate_ulid(), program['id'], 
                  random.choice(['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']),
                  f'Description for {random.choice(["Bronze", "Silver", "Gold", "Platinum", "Diamond"])} tier',
                  random.randint(0, 10000),
                  round(random.uniform(1.0, 15.0), 2),
                  random.choice([True, False])))
        
        # Step 23: Insert rewards (20 rewards)
        for i in range(20):
            reward_id = generate_ulid()
            program = random.choice(loyalty_programs)
            
            cursor.execute("""
                INSERT INTO reward (id, loyalty_program_id, name, description, points_required,
                                  redemption_limit, remaining_redemptions, status, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())
            """, (generate_ulid(), program['id'], 
                  f'Reward {i+1}',
                  f'Description for Reward {i+1}',
                  random.randint(100, 5000),
                  random.randint(10, 100) if random.choice([True, False]) else None,
                  random.randint(0, 50) if random.choice([True, False]) else None,
                  random.choice(['DRAFT', 'ACTIVE', 'SUSPENDED', 'EXPIRED'])))
        
        # Step 24: Insert loyalty transactions (60 transactions)
        for i in range(60):
            account = random.choice(accounts)
            
            cursor.execute("""
                INSERT INTO loyalty_txn (id, account_id, txn_type, points, reference_type,
                                       reference_id, description, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
            """, (generate_ulid(), account['id'],
                  random.choice(['EARN', 'BURN', 'ADJUST']),
                  round(random.uniform(10.0, 500.0), 2),
                  random.choice(['PURCHASE', 'PROMOTION', 'REFUND', 'RETURN']),
                  generate_ulid(),
                  f'Loyalty transaction for {account["name"]}'))
        
        # Step 25: Insert audit logs (100 logs)
        for i in range(100):
            user = random.choice(users) if random.choice([True, False]) else None
            resource_types = ['PRODUCT', 'ORDER', 'USER', 'VENDOR', 'RFQ', 'QUOTE', 'INVOICE']
            
            user_id = user['id'] if user else None
            cursor.execute("""
                INSERT INTO audit_log (id, user_id, action, resource_type, resource_id, created_at)
                VALUES (%s, %s, %s, %s, %s, NOW())
            """, (generate_ulid(), user_id,
                  random.choice(['CREATE', 'UPDATE', 'DELETE', 'VIEW']),
                  random.choice(resource_types),
                  generate_ulid()))
        
        # Commit the changes
        conn.commit()
        print("Comprehensive mock data insertion completed successfully!")
        
        # Verify data insertion
        print("\\nVerifying data insertion...")
        tables_to_check = [
            ('vendor', 'Vendors'),
            ('account', 'Accounts'), 
            ('app_user', 'Users'),
            ('product', 'Products'),
            ('product_attribute', 'Attributes'),
            ('media_asset', 'Media Assets'),
            ('product_attribute_value', 'Product Attribute Values'),
            ('product_media', 'Product Media Links'),
            ('rfq', 'RFQs'),
            ('rfq_line', 'RFQ Lines'),
            ('quote', 'Quotes'),
            ('quote_line', 'Quote Lines'),
            ('order_table', 'Orders'),
            ('order_line', 'Order Lines'),
            ('payment', 'Payments'),
            ('wallet', 'Wallets'),
            ('credit_limit', 'Credit Limits'),
            ('loyalty_program', 'Loyalty Programs'),
            ('tier', 'Tiers'),
            ('loyalty_txn', 'Loyalty Transactions'),
            ('audit_log', 'Audit Logs')
        ]
        
        for table_name, display_name in tables_to_check:
            cursor.execute(f"SELECT COUNT(*) FROM {table_name};")
            count = cursor.fetchone()[0]
            print(f"{display_name}: {count}")
        
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

def seed_backblaze_b2():
    """Seed the Backblaze B2 storage with mock files"""
    import boto3
    from botocore.config import Config
    
    # Get B2 credentials from environment
    b2_account_id = os.getenv('B2_ACCOUNT_ID')
    b2_application_key_id = os.getenv('B2_APPLICATION_KEY_ID')
    b2_application_key = os.getenv('B2_APPLICATION_KEY')
    b2_bucket_name = os.getenv('B2_BUCKET')
    b2_endpoint_url = os.getenv('B2_ENDPOINT_URL')
    
    if not all([b2_account_id, b2_application_key_id, b2_application_key, b2_bucket_name, b2_endpoint_url]):
        print("Missing B2 credentials in environment variables. Skipping B2 seeding.")
        return
    
    try:
        # Create boto3 session with B2 credentials
        s3_client = boto3.client(
            's3',
            endpoint_url=b2_endpoint_url,
            aws_access_key_id=b2_application_key_id,
            aws_secret_access_key=b2_application_key,
            config=Config(signature_version='s3v4')
        )
        
        print("Connecting to Backblaze B2...")
        
        # Create a sample image file content (a simple 1x1 pixel PNG)
        sample_image_content = bytes([
            0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,  # PNG header
            0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,  # IHDR chunk start
            0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,  # Image dimensions 1x1
            0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89,  # More header data
            0x00, 0x00, 0x00, 0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0xDA, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00, 0x01,  # IDAT chunk
            0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82  # IEND chunk
        ])
        
        # Upload sample files for each media asset in the database
        connection_params = load_db_config()
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        # Get all media assets from the database
        cursor.execute("SELECT id, filename, file_path FROM media_asset LIMIT 100;")  # Limit to first 100
        media_assets = cursor.fetchall()
        
        print(f"Uploading {len(media_assets)} sample files to B2...")
        
        for idx, (asset_id, filename, file_path) in enumerate(media_assets):
            try:
                # Use the sample image content for demonstration
                s3_client.put_object(
                    Bucket=b2_bucket_name,
                    Key=file_path,  # Use the file_path as the object key
                    Body=sample_image_content,
                    ContentType='image/png',
                    Metadata={
                        'asset-id': asset_id,
                        'original-filename': filename
                    }
                )
                print(f"Uploaded {file_path} ({idx+1}/{len(media_assets)})")
            except Exception as e:
                print(f"Error uploading {file_path}: {e}")
        
        cursor.close()
        conn.close()
        
        print("Backblaze B2 seeding completed successfully!")
        
    except ImportError:
        print("boto3 library not available. Please install with 'pip install boto3' to seed B2 storage.")
    except Exception as e:
        print(f"Error connecting to B2: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    insert_mock_data()
    print("\\nStarting Backblaze B2 seeding...")
    seed_backblaze_b2()
