-- P4-S1-T002: Complete catalog schema - update existing tables and create new ones
-- This migration adds columns to existing tables and creates new tables for the catalog feature

-- Add missing columns to the existing product table (from V1)
-- Only add columns that don't already exist, using conditional logic

-- Add slug column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'slug') THEN
      ALTER TABLE product ADD COLUMN slug VARCHAR(255);
      ALTER TABLE product ADD CONSTRAINT uk_product_slug UNIQUE (slug);
   END IF;
END
$$;

-- Add short_description column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'short_description') THEN
      ALTER TABLE product ADD COLUMN short_description VARCHAR(500);
   END IF;
END
$$;

-- Add sku column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'sku') THEN
      ALTER TABLE product ADD COLUMN sku VARCHAR(100);
      ALTER TABLE product ADD CONSTRAINT uk_product_sku UNIQUE (sku);
   END IF;
END
$$;

-- Add upc column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'upc') THEN
      ALTER TABLE product ADD COLUMN upc VARCHAR(50);
   END IF;
END
$$;

-- Add gtin column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'gtin') THEN
      ALTER TABLE product ADD COLUMN gtin VARCHAR(50);
   END IF;
END
$$;

-- Add mpn column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'mpn') THEN
      ALTER TABLE product ADD COLUMN mpn VARCHAR(100);
   END IF;
END
$$;

-- Add brand column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'brand') THEN
      ALTER TABLE product ADD COLUMN brand VARCHAR(100);
   END IF;
END
$$;

-- Add category_id column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'category_id') THEN
      ALTER TABLE product ADD COLUMN category_id VARCHAR(26);
   END IF;
END
$$;

-- Add vendor_id column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'vendor_id') THEN
      ALTER TABLE product ADD COLUMN vendor_id VARCHAR(26);
   END IF;
END
$$;

-- Add status column to product if not exists
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'status') THEN
      ALTER TABLE product ADD COLUMN status VARCHAR(20) DEFAULT 'DRAFT';
      -- Note: Adding check constraint separately due to complexity
   END IF;
END
$$;

-- Add currency column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'currency') THEN
      ALTER TABLE product ADD COLUMN currency VARCHAR(3) DEFAULT 'USD';
   END IF;
END
$$;

-- Add base_price column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'base_price') THEN
      ALTER TABLE product ADD COLUMN base_price DECIMAL(19, 4);
   END IF;
END
$$;

-- Add tax_class column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'tax_class') THEN
      ALTER TABLE product ADD COLUMN tax_class VARCHAR(50);
   END IF;
END
$$;

-- Add meta_title column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'meta_title') THEN
      ALTER TABLE product ADD COLUMN meta_title VARCHAR(255);
   END IF;
END
$$;

-- Add meta_description column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'meta_description') THEN
      ALTER TABLE product ADD COLUMN meta_description VARCHAR(500);
   END IF;
END
$$;

-- Add meta_keywords column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'meta_keywords') THEN
      ALTER TABLE product ADD COLUMN meta_keywords TEXT;
   END IF;
END
$$;

-- Add weight column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'weight') THEN
      ALTER TABLE product ADD COLUMN weight DECIMAL(10, 3);
   END IF;
END
$$;

-- Add dimensions column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'dimensions') THEN
      ALTER TABLE product ADD COLUMN dimensions JSONB;
   END IF;
END
$$;

-- Add packaging_info column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'packaging_info') THEN
      ALTER TABLE product ADD COLUMN packaging_info JSONB;
   END IF;
END
$$;

-- Add min_order_qty column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'min_order_qty') THEN
      ALTER TABLE product ADD COLUMN min_order_qty INTEGER DEFAULT 1;
   END IF;
END
$$;

-- Add moq column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'moq') THEN
      ALTER TABLE product ADD COLUMN moq INTEGER;
   END IF;
END
$$;

-- Add inventory_tracking column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'inventory_tracking') THEN
      ALTER TABLE product ADD COLUMN inventory_tracking BOOLEAN DEFAULT FALSE;
   END IF;
END
$$;

-- Add inventory_qty column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'inventory_qty') THEN
      ALTER TABLE product ADD COLUMN inventory_qty INTEGER DEFAULT 0;
   END IF;
END
$$;

-- Add inventory_status column if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'inventory_status') THEN
      ALTER TABLE product ADD COLUMN inventory_status VARCHAR(20) DEFAULT 'IN_STOCK';
   END IF;
END
$$;

-- Create vendor table (if it doesn't already exist)
CREATE TABLE IF NOT EXISTS vendor (
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

-- Update the vendor_id column in product table to reference the vendor table
-- Add the foreign key constraint if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'fk_product_vendor' 
                   AND table_name = 'product') THEN
        ALTER TABLE product ADD CONSTRAINT fk_product_vendor FOREIGN KEY (vendor_id) REFERENCES vendor(id);
    END IF;
END
$$;

-- Add check constraint for product status if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'chk_product_status' 
                   AND table_name = 'product') THEN
        ALTER TABLE product ADD CONSTRAINT chk_product_status CHECK (status IN ('DRAFT', 'PUBLISHED', 'UNPUBLISHED', 'SUSPENDED'));
    END IF;
END
$$;

-- Add check constraint for product inventory_status if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'chk_product_inventory_status' 
                   AND table_name = 'product') THEN
        ALTER TABLE product ADD CONSTRAINT chk_product_inventory_status CHECK (inventory_status IN ('IN_STOCK', 'OUT_OF_STOCK', 'BACKORDER', 'DISCONTINUED'));
    END IF;
END
$$;

-- Create product_attribute table to store attribute definitions
CREATE TABLE IF NOT EXISTS product_attribute (
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

-- Create product_attribute_value table to store actual attribute values for products
CREATE TABLE IF NOT EXISTS product_attribute_value (
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

-- Create media_asset table for storing product images and other media
CREATE TABLE IF NOT EXISTS media_asset (
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

-- Create product_media table for linking products to their media assets
CREATE TABLE IF NOT EXISTS product_media (
    id VARCHAR(26) PRIMARY KEY,  -- ULID format
    product_id VARCHAR(26) NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    media_asset_id VARCHAR(26) NOT NULL REFERENCES media_asset(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,  -- Order in which to display media
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, media_asset_id)
);

-- Create indexes for better performance (using CREATE INDEX IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_product_vendor_id ON product(vendor_id);
CREATE INDEX IF NOT EXISTS idx_product_status ON product(status);
CREATE INDEX IF NOT EXISTS idx_product_category ON product(category_id);
CREATE INDEX IF NOT EXISTS idx_product_sku ON product(sku);
CREATE INDEX IF NOT EXISTS idx_product_slug ON product(slug);
CREATE INDEX IF NOT EXISTS idx_vendor_status ON vendor(status);
CREATE INDEX IF NOT EXISTS idx_media_asset_type ON media_asset(media_type);
CREATE INDEX IF NOT EXISTS idx_media_asset_status ON media_asset(status);
CREATE INDEX IF NOT EXISTS idx_product_attribute_name ON product_attribute(name);
CREATE INDEX IF NOT EXISTS idx_product_attribute_type ON product_attribute(attribute_type);

-- Add full-text search support (using CREATE INDEX IF NOT EXISTS)
-- Only create these indexes after all required columns exist
CREATE INDEX IF NOT EXISTS idx_product_name_gin ON product USING gin(to_tsvector('english', COALESCE(name, '')));
CREATE INDEX IF NOT EXISTS idx_product_description_gin ON product USING gin(to_tsvector('english', COALESCE(description, '')));
CREATE INDEX IF NOT EXISTS idx_product_slug_gin ON product USING gin(to_tsvector('english', COALESCE(slug, '')));

-- Create function to automatically update the updated_at column (if it doesn't exist)
-- This function is likely already created by V2, but we'll recreate if needed
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Attach the trigger to relevant tables (triggers can't use IF NOT EXISTS, so we'll drop and recreate)
DROP TRIGGER IF EXISTS update_vendor_updated_at ON vendor;
DROP TRIGGER IF EXISTS update_product_updated_at ON product;
DROP TRIGGER IF EXISTS update_product_attribute_updated_at ON product_attribute;
DROP TRIGGER IF EXISTS update_media_asset_updated_at ON media_asset;
DROP TRIGGER IF EXISTS update_product_attribute_value_updated_at ON product_attribute_value;

-- Create triggers
CREATE TRIGGER update_vendor_updated_at BEFORE UPDATE ON vendor FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON product FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_attribute_updated_at BEFORE UPDATE ON product_attribute FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_asset_updated_at BEFORE UPDATE ON media_asset FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_attribute_value_updated_at BEFORE UPDATE ON product_attribute_value FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();