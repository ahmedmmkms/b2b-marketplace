-- Migration for Catalog Schema Alignment (Tasks 5.1-5.6)
-- This migration aligns the catalog-related tables to match Java entity mappings

DO $$
BEGIN
    -- Create vendors table if it doesn't exist (matching the Vendor entity)
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'vendors' AND table_schema = 'public') THEN
        CREATE TABLE vendors (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            business_name VARCHAR(255) NOT NULL,
            description TEXT,
            email VARCHAR(255),
            phone VARCHAR(50),
            address JSONB,
            tax_id VARCHAR(100),
            vendor_status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED, SUSPENDED, CLOSED
            approval_date DATE,
            business_license_no VARCHAR(100),
            registration_date DATE,
            kyc_verified BOOLEAN NOT NULL DEFAULT FALSE,
            kyc_verified_at DATE,
            kyc_verified_by VARCHAR(255)
        );

        -- Create indexes for vendors table
        CREATE INDEX idx_vendors_status ON vendors(vendor_status);

        -- Create trigger for vendors table
        CREATE TRIGGER update_vendors_updated_at 
            BEFORE UPDATE ON vendors
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Create products table if it doesn't exist (matching the Product entity)
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'products' AND table_schema = 'public') THEN
        CREATE TABLE products (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            name VARCHAR(255) NOT NULL,
            slug VARCHAR(255) UNIQUE,
            description TEXT,
            short_description VARCHAR(500),
            sku VARCHAR(100) UNIQUE,
            upc VARCHAR(50),
            gtin VARCHAR(50),
            mpn VARCHAR(100),
            brand VARCHAR(100),
            category_id VARCHAR(26),
            vendor_id VARCHAR(26) NOT NULL,
            
            product_status VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, ACTIVE, INACTIVE, DISCONTINUED
            price_amount DECIMAL(19,4),
            price_currency VARCHAR(3) DEFAULT 'USD',
            
            tax_class VARCHAR(50),
            meta_title VARCHAR(255),
            meta_description VARCHAR(500),
            meta_keywords TEXT,
            
            weight DECIMAL(10,3),
            dimensions JSONB,
            packaging_info JSONB,
            
            min_order_quantity INTEGER DEFAULT 1,
            moq INTEGER,
            
            inventory_tracking BOOLEAN DEFAULT FALSE,
            stock_quantity INTEGER DEFAULT 0,
            inventory_status VARCHAR(20) DEFAULT 'IN_STOCK', -- IN_STOCK, OUT_OF_STOCK, BACKORDER, DISCONTINUED
            
            is_active BOOLEAN DEFAULT TRUE,
            
            -- Dimensions separated for better indexing and queries
            dimensions_length DECIMAL(10,3),
            dimensions_width DECIMAL(10,3),
            dimensions_height DECIMAL(10,3),
            
            FOREIGN KEY (vendor_id) REFERENCES vendors(id)
        );

        -- Create indexes for products table
        CREATE INDEX idx_products_name ON products USING gin(to_tsvector('english'::regconfig, name));
        CREATE INDEX idx_products_status ON products(product_status);
        CREATE INDEX idx_products_vendor_id ON products(vendor_id);
        CREATE INDEX idx_products_sku ON products(sku);
        CREATE INDEX idx_products_slug ON products(slug);
        CREATE INDEX idx_products_slug_gin ON products USING gin(to_tsvector('english'::regconfig, slug));

        -- Create trigger for products table
        CREATE TRIGGER update_products_updated_at 
            BEFORE UPDATE ON products
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Create product attributes table if it doesn't exist (matching the ProductAttribute entity)
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'product_attributes' AND table_schema = 'public') THEN
        CREATE TABLE product_attributes (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            name VARCHAR(255) NOT NULL,
            display_name VARCHAR(255) NOT NULL,
            description TEXT,
            attribute_type VARCHAR(50) NOT NULL, -- TEXT, NUMBER, BOOLEAN, DATE, SELECT, MULTI_SELECT
            is_required BOOLEAN DEFAULT FALSE,
            is_searchable BOOLEAN DEFAULT FALSE,
            is_filterable BOOLEAN DEFAULT FALSE,
            sort_order INTEGER DEFAULT 0,
            validation_rules JSONB
        );

        -- Create indexes for product attributes table
        CREATE INDEX idx_product_attributes_name ON product_attributes(name);
        CREATE INDEX idx_product_attributes_type ON product_attributes(attribute_type);

        -- Create trigger for product attributes table
        CREATE TRIGGER update_product_attributes_updated_at 
            BEFORE UPDATE ON product_attributes
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Create product attribute values table if it doesn't exist (matching the ProductAttributeValue entity)
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'product_attribute_values' AND table_schema = 'public') THEN
        CREATE TABLE product_attribute_values (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            product_attribute_id VARCHAR(26) NOT NULL,
            value TEXT NOT NULL,
            display_value TEXT,
            is_default BOOLEAN DEFAULT FALSE,
            sort_order INTEGER DEFAULT 0,
            
            FOREIGN KEY (product_attribute_id) REFERENCES product_attributes(id) ON DELETE CASCADE
        );

        -- Create indexes for product attribute values table
        CREATE INDEX idx_product_attr_values_attr_id ON product_attribute_values(product_attribute_id);

        -- Create trigger for product attribute values table
        CREATE TRIGGER update_product_attribute_values_updated_at 
            BEFORE UPDATE ON product_attribute_values
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Create media assets table if it doesn't exist (matching the MediaAsset entity)
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'media_assets' AND table_schema = 'public') THEN
        CREATE TABLE media_assets (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            name VARCHAR(255) NOT NULL,
            original_filename VARCHAR(255) NOT NULL,
            storage_path VARCHAR(1000) NOT NULL,
            content_type VARCHAR(100), -- MIME type
            file_size BIGINT,
            alt_text VARCHAR(255),
            title VARCHAR(255),
            caption TEXT,
            media_type VARCHAR(20) NOT NULL, -- IMAGE, VIDEO, DOCUMENT, OTHER
            status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, DELETED
            is_primary BOOLEAN DEFAULT FALSE,
            upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Create indexes for media assets table
        CREATE INDEX idx_media_assets_status ON media_assets(status);
        CREATE INDEX idx_media_assets_type ON media_assets(media_type);

        -- Create trigger for media assets table
        CREATE TRIGGER update_media_assets_updated_at 
            BEFORE UPDATE ON media_assets
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Create product media junction table if it doesn't exist (matching the ProductMedia entity)
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'product_media' AND table_schema = 'public') THEN
        CREATE TABLE product_media (
            id VARCHAR(26) PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            product_id VARCHAR(26) NOT NULL,
            media_asset_id VARCHAR(26) NOT NULL,
            display_order INTEGER DEFAULT 0,
            is_primary BOOLEAN DEFAULT FALSE,
            alt_text_override TEXT,
            
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE CASCADE,
            UNIQUE(product_id, media_asset_id)
        );

        -- Create indexes for product media table
        CREATE INDEX idx_product_media_product_id ON product_media(product_id);
        CREATE INDEX idx_product_media_asset_id ON product_media(media_asset_id);

        -- Create trigger for product media table
        CREATE TRIGGER update_product_media_updated_at 
            BEFORE UPDATE ON product_media
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Verify the foreign key constraint exists between products and vendors
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu 
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage ccu 
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.table_name = 'products' 
          AND tc.constraint_type = 'FOREIGN KEY'
          AND kcu.column_name = 'vendor_id'
          AND ccu.table_name = 'vendors'
    ) THEN
        ALTER TABLE products 
        ADD CONSTRAINT fk_products_vendor_id 
        FOREIGN KEY (vendor_id) REFERENCES vendors(id);
    END IF;

END $$;