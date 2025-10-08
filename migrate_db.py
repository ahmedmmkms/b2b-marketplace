import psycopg2
import sys
from dotenv import load_dotenv
import os
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
        'password': os.getenv('DB_PASSWORD', result.password),
        'port': result.port,
        'sslmode': 'require',
        'channel_binding': 'require'
    }

def execute_migration_scripts():
    # Load database connection parameters from .env
    connection_params = load_db_config()

    # Migration scripts to execute
    migrations = [
        """
        -- Drop existing tables if they exist (to start fresh)
        DROP TABLE IF EXISTS product_media;
        DROP TABLE IF EXISTS product_attribute_value;
        DROP TABLE IF EXISTS media_asset;
        DROP TABLE IF EXISTS product;
        DROP TABLE IF EXISTS product_attribute;
        DROP TABLE IF EXISTS vendor;
        
        -- Create vendor table
        CREATE TABLE vendor (
            id VARCHAR(26) PRIMARY KEY,  -- ULID format
            name VARCHAR(255) NOT NULL,
            description TEXT,
            contact_person VARCHAR(255),
            contact_email VARCHAR(255),
            contact_phone VARCHAR(50),
            address JSONB,  -- Flexible address structure
            tax_number VARCHAR(100),  -- VAT/Tax registration number
            status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('PENDING', 'ACTIVE', 'SUSPENDED', 'REJECTED')),
            approval_date TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """,
        """
        -- Create product_attribute table to store attribute definitions
        CREATE TABLE product_attribute (
            id VARCHAR(26) PRIMARY KEY,  -- ULID format
            name VARCHAR(255) NOT NULL,
            display_name VARCHAR(255) NOT NULL,
            attribute_type VARCHAR(50) NOT NULL CHECK (attribute_type IN ('TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'SELECT')),
            is_required BOOLEAN DEFAULT FALSE,
            is_searchable BOOLEAN DEFAULT FALSE,
            is_filterable BOOLEAN DEFAULT FALSE,
            validation_rules JSONB,  -- Store validation constraints as JSON
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """,
        """
        -- Create product table
        CREATE TABLE product (
            id VARCHAR(26) PRIMARY KEY,  -- ULID format
            name VARCHAR(255) NOT NULL,
            slug VARCHAR(255) UNIQUE,  -- URL-friendly identifier
            description TEXT,
            short_description VARCHAR(500),
            sku VARCHAR(100) UNIQUE,  -- Stock Keeping Unit
            upc VARCHAR(50),  -- Universal Product Code
            gtin VARCHAR(50),  -- Global Trade Item Number
            mpn VARCHAR(100),  -- Manufacturer Part Number
            brand VARCHAR(100),
            category_id VARCHAR(26),  -- Reference to category table if exists
            vendor_id VARCHAR(26) NOT NULL REFERENCES vendor(id),
            status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'UNPUBLISHED', 'SUSPENDED')),
            currency VARCHAR(3) DEFAULT 'USD',  -- Default currency
            base_price DECIMAL(19, 4),  -- Base price without currency
            tax_class VARCHAR(50),  -- Tax classification
            meta_title VARCHAR(255),
            meta_description VARCHAR(500),
            meta_keywords TEXT,
            weight DECIMAL(10, 3),  -- Weight in kg
            dimensions JSONB,  -- Length, width, height as JSON
            packaging_info JSONB,  -- Packaging details
            min_order_qty INTEGER DEFAULT 1,
            moq INTEGER,  -- Minimum Order Quantity
            inventory_tracking BOOLEAN DEFAULT FALSE,
            inventory_qty INTEGER DEFAULT 0,
            inventory_status VARCHAR(20) DEFAULT 'IN_STOCK' CHECK (inventory_status IN ('IN_STOCK', 'OUT_OF_STOCK', 'BACKORDER', 'DISCONTINUED')),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """,
        """
        -- Create product_attribute_value table to store actual attribute values for products
        CREATE TABLE product_attribute_value (
            id VARCHAR(26) PRIMARY KEY,  -- ULID format
            product_id VARCHAR(26) NOT NULL REFERENCES product(id) ON DELETE CASCADE,
            attribute_id VARCHAR(26) NOT NULL REFERENCES product_attribute(id),
            value_text TEXT,
            value_number DECIMAL(19, 4),
            value_boolean BOOLEAN,
            value_date TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(product_id, attribute_id)
        );
        """,
        """
        -- Create media_asset table for storing product images and other media
        CREATE TABLE media_asset (
            id VARCHAR(26) PRIMARY KEY,  -- ULID format
            name VARCHAR(255) NOT NULL,  -- Display name
            filename VARCHAR(255) NOT NULL,  -- Original filename
            file_path VARCHAR(1000) NOT NULL,  -- Path in storage (e.g., R2 bucket path)
            mime_type VARCHAR(100),  -- MIME type of the file
            file_size BIGINT,  -- File size in bytes
            alt_text VARCHAR(255),  -- Alt text for accessibility
            title VARCHAR(255),  -- Title for the media
            caption TEXT,  -- Caption or description
            tags TEXT,  -- Comma-separated tags for search
            media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('IMAGE', 'VIDEO', 'DOCUMENT', 'OTHER')),  -- Type of media
            status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'DELETED')),
            is_primary BOOLEAN DEFAULT FALSE,  -- Primary image for product
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """,
        """
        -- Create product_media table for linking products to their media assets
        CREATE TABLE product_media (
            id VARCHAR(26) PRIMARY KEY,  -- ULID format
            product_id VARCHAR(26) NOT NULL REFERENCES product(id) ON DELETE CASCADE,
            media_asset_id VARCHAR(26) NOT NULL REFERENCES media_asset(id) ON DELETE CASCADE,
            sort_order INTEGER DEFAULT 0,  -- Order in which to display media
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(product_id, media_asset_id)
        );
        """,
        """
        -- Create indexes for better performance
        CREATE INDEX idx_product_vendor_id ON product(vendor_id);
        CREATE INDEX idx_product_status ON product(status);
        CREATE INDEX idx_product_category ON product(category_id);
        CREATE INDEX idx_product_sku ON product(sku);
        CREATE INDEX idx_product_slug ON product(slug);
        CREATE INDEX idx_vendor_status ON vendor(status);
        CREATE INDEX idx_media_asset_type ON media_asset(media_type);
        CREATE INDEX idx_media_asset_status ON media_asset(status);
        CREATE INDEX idx_product_attribute_name ON product_attribute(name);
        CREATE INDEX idx_product_attribute_type ON product_attribute(attribute_type);

        -- Add full-text search support
        CREATE INDEX idx_product_name_gin ON product USING gin(to_tsvector('english', name));
        CREATE INDEX idx_product_description_gin ON product USING gin(to_tsvector('english', description));
        CREATE INDEX idx_product_slug_gin ON product USING gin(to_tsvector('english', slug));
        """,
        """
        -- Create function to automatically update the updated_at column
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$ language 'plpgsql';

        -- Create triggers
        CREATE TRIGGER update_vendor_updated_at BEFORE UPDATE ON vendor FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON product FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        CREATE TRIGGER update_product_attribute_updated_at BEFORE UPDATE ON product_attribute FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        CREATE TRIGGER update_media_asset_updated_at BEFORE UPDATE ON media_asset FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        CREATE TRIGGER update_product_attribute_value_updated_at BEFORE UPDATE ON product_attribute_value FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
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