import os
import psycopg2
from dotenv import load_dotenv
import uuid
from datetime import datetime
import random
import string
from urllib.parse import urlparse

def load_db_config():
    """Load database configuration from .env file"""
    load_dotenv()
    
    # Parse the DB_URL from .env file
    db_url = os.getenv('DB_URL')
    if not db_url:
        raise ValueError("DB_URL not found in .env file")
    
    # Parse the PostgreSQL URL
    result = urlparse(db_url)
    
    return {
        'host': result.hostname,
        'database': result.path[1:],  # Remove leading '/'
        'user': result.username,
        'password': result.password,
        'port': result.port,
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
    """Insert mock data into the database"""
    connection_params = load_db_config()
    
    try:
        # Connect to the database
        print("Connecting to the database...")
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        print("Inserting mock data...")
        
        # Insert mock vendors
        vendors = []
        for i in range(5):
            vendor_id = generate_ulid()
            vendor_data = {
                'id': vendor_id,
                'name': f'Mock Vendor {i+1}',
                'description': f'Description for Mock Vendor {i+1}',
                'contact_person': f'Contact Person {i+1}',
                'contact_email': f'contact{i+1}@mockvendor.com',
                'contact_phone': f'+123456789{i+1}',
                'tax_number': f'TAX{i+1}23456',
                'status': 'ACTIVE'
            }
            vendors.append(vendor_data)
            
            cursor.execute("""
                INSERT INTO vendor (id, name, description, contact_person, contact_email, 
                                   contact_phone, address, tax_number, status, approval_date, 
                                   created_at, updated_at)
                VALUES (%(id)s, %(name)s, %(description)s, %(contact_person)s, %(contact_email)s, 
                        %(contact_phone)s, '{"country": "Egypt", "city": "Cairo", "address_line1": "123 Mock Street"}', 
                        %(tax_number)s, %(status)s, NOW(), NOW(), NOW())
            """, vendor_data)
        
        # Insert mock product attributes
        attributes = []
        attr_types = ['TEXT', 'NUMBER', 'BOOLEAN', 'SELECT']
        for i in range(10):
            attr_id = generate_ulid()
            attr_data = {
                'id': attr_id,
                'name': f'attr_{chr(97+i)}',  # 'attr_a', 'attr_b', etc.
                'display_name': f'Attribute {chr(65+i)}',
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
        
        # Insert mock products
        products = []
        for i in range(20):
            product_id = generate_ulid()
            vendor = random.choice(vendors)
            product_data = {
                'id': product_id,
                'name': f'Mock Product {i+1}',
                'slug': f'mock-product-{i+1}',
                'description': f'Detailed description for Mock Product {i+1}',
                'short_description': f'Short description for Mock Product {i+1}',
                'sku': f'SKU-{i+1:04d}',
                'brand': f'Brand {random.randint(1, 5)}',
                'vendor_id': vendor['id'],
                'status': 'PUBLISHED',
                'currency': 'USD',
                'base_price': round(random.uniform(10.0, 500.0), 2),
                'weight': round(random.uniform(0.1, 10.0), 3),
                'min_order_qty': random.randint(1, 10),
                'moq': random.randint(1, 5),
                'inventory_tracking': True,
                'inventory_qty': random.randint(0, 100),
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
        
        # Insert mock product attribute values
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
        
        # Insert mock media assets
        media_assets = []
        for i in range(30):
            media_id = generate_ulid()
            media_data = {
                'id': media_id,
                'name': f'Media Asset {i+1}',
                'filename': f'product_image_{i+1}.jpg',
                'file_path': f'media/products/product_image_{i+1}.jpg',
                'mime_type': 'image/jpeg',
                'file_size': random.randint(50000, 2000000),  # 50KB to 2MB
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
                        %(file_size)s, %(alt_text)s, %(title)s, %(name)s, 'tag1,tag2',
                        %(media_type)s, %(status)s, %(is_primary)s, NOW(), NOW())
            """, media_data)
        
        # Associate media assets with products
        for product in products:
            # Each product gets 1-3 media assets
            num_media = random.randint(1, 3)
            selected_media = random.sample(media_assets, num_media)
            
            for idx, media in enumerate(selected_media):
                cursor.execute("""
                    INSERT INTO product_media (id, product_id, media_asset_id, sort_order, created_at)
                    VALUES (%s, %s, %s, %s, NOW())
                """, (generate_ulid(), product['id'], media['id'], idx))
        
        # Commit the changes
        conn.commit()
        print("Mock data insertion completed successfully!")
        
        # Verify data insertion
        print("\nVerifying data insertion...")
        cursor.execute("SELECT COUNT(*) FROM vendor;")
        vendor_count = cursor.fetchone()[0]
        print(f"Vendors: {vendor_count}")
        
        cursor.execute("SELECT COUNT(*) FROM product;")
        product_count = cursor.fetchone()[0]
        print(f"Products: {product_count}")
        
        cursor.execute("SELECT COUNT(*) FROM product_attribute;")
        attr_count = cursor.fetchone()[0]
        print(f"Attributes: {attr_count}")
        
        cursor.execute("SELECT COUNT(*) FROM media_asset;")
        media_count = cursor.fetchone()[0]
        print(f"Media Assets: {media_count}")
        
        cursor.execute("SELECT COUNT(*) FROM product_attribute_value;")
        pav_count = cursor.fetchone()[0]
        print(f"Product Attribute Values: {pav_count}")
        
        cursor.execute("SELECT COUNT(*) FROM product_media;")
        pm_count = cursor.fetchone()[0]
        print(f"Product Media Links: {pm_count}")
        
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
    insert_mock_data()