-- Align catalog-related tables with current JPA entity mappings

-- ========================
-- Vendor table adjustments
-- ========================
ALTER TABLE vendor RENAME COLUMN name TO business_name;
ALTER TABLE vendor RENAME COLUMN contact_email TO email;
ALTER TABLE vendor RENAME COLUMN contact_phone TO phone;
ALTER TABLE vendor ALTER COLUMN address TYPE text
    USING COALESCE(address->>'full_address', address::text);
ALTER TABLE vendor RENAME COLUMN tax_number TO tax_id;
ALTER TABLE vendor RENAME COLUMN status TO vendor_status;
ALTER TABLE vendor DROP CONSTRAINT IF EXISTS vendor_status_check;
UPDATE vendor
SET vendor_status = CASE
        WHEN vendor_status = 'ACTIVE' THEN 'APPROVED'
        WHEN vendor_status IN ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED', 'CLOSED') THEN vendor_status
        ELSE 'PENDING'
    END;
ALTER TABLE vendor ALTER COLUMN vendor_status SET DEFAULT 'PENDING';
ALTER TABLE vendor ADD COLUMN IF NOT EXISTS business_license_no varchar(100);
ALTER TABLE vendor ADD COLUMN IF NOT EXISTS registration_date date;
ALTER TABLE vendor ADD COLUMN IF NOT EXISTS kyc_verified boolean DEFAULT false;
ALTER TABLE vendor ADD COLUMN IF NOT EXISTS kyc_verified_at date;
ALTER TABLE vendor ADD COLUMN IF NOT EXISTS kyc_verified_by varchar(255);
UPDATE vendor SET kyc_verified = COALESCE(kyc_verified, false);
ALTER TABLE vendor ALTER COLUMN kyc_verified SET DEFAULT false;
ALTER TABLE vendor ALTER COLUMN kyc_verified SET NOT NULL;
ALTER TABLE vendor ADD CONSTRAINT vendor_status_valid
    CHECK (vendor_status IN ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED', 'CLOSED'));
ALTER TABLE vendor ADD CONSTRAINT vendor_email_unique UNIQUE (email);
DROP INDEX IF EXISTS idx_vendor_status;
CREATE INDEX idx_vendor_vendor_status ON vendor (vendor_status);

-- =======================
-- Product table updates
-- =======================
ALTER TABLE product RENAME TO products;

ALTER TABLE products DROP CONSTRAINT IF EXISTS product_status_check;
ALTER TABLE products RENAME COLUMN status TO product_status;
UPDATE products
SET product_status = CASE
        WHEN product_status IN ('PUBLISHED', 'UNPUBLISHED', 'ACTIVE') THEN 'ACTIVE'
        WHEN product_status = 'SUSPENDED' THEN 'INACTIVE'
        WHEN product_status IN ('DRAFT', 'INACTIVE', 'DISCONTINUED') THEN product_status
        ELSE 'ACTIVE'
    END;
ALTER TABLE products ADD CONSTRAINT products_product_status_check
    CHECK (product_status IN ('DRAFT', 'ACTIVE', 'INACTIVE', 'DISCONTINUED'));
ALTER TABLE products ALTER COLUMN product_status SET DEFAULT 'ACTIVE';

ALTER TABLE products RENAME COLUMN base_price TO price_amount;
ALTER TABLE products RENAME COLUMN currency TO price_currency;
ALTER TABLE products RENAME COLUMN inventory_qty TO stock_quantity;
ALTER TABLE products RENAME COLUMN min_order_qty TO min_order_quantity;
ALTER TABLE products ALTER COLUMN price_currency SET DEFAULT 'USD';
UPDATE products SET price_currency = 'USD' WHERE price_currency IS NULL;
ALTER TABLE products ALTER COLUMN price_currency SET NOT NULL;

ALTER TABLE products ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;
UPDATE products SET is_active = true WHERE is_active IS NULL;
ALTER TABLE products ALTER COLUMN is_active SET NOT NULL;

ALTER TABLE products ADD COLUMN IF NOT EXISTS dimensions_length numeric(10,3);
ALTER TABLE products ADD COLUMN IF NOT EXISTS dimensions_width numeric(10,3);
ALTER TABLE products ADD COLUMN IF NOT EXISTS dimensions_height numeric(10,3);

ALTER TABLE products ALTER COLUMN stock_quantity SET DEFAULT 0;
UPDATE products SET stock_quantity = 0 WHERE stock_quantity IS NULL;
ALTER TABLE products ALTER COLUMN min_order_quantity SET DEFAULT 1;
UPDATE products SET min_order_quantity = 1 WHERE min_order_quantity IS NULL;

-- =================================
-- Product attribute table revisions
-- =================================
ALTER TABLE product_attribute RENAME TO product_attributes;
ALTER TABLE product_attributes RENAME COLUMN validation_rules TO description;
ALTER TABLE product_attributes ALTER COLUMN description TYPE text USING description::text;
ALTER TABLE product_attributes ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;
UPDATE product_attributes SET sort_order = COALESCE(sort_order, 0);
ALTER TABLE product_attributes DROP CONSTRAINT IF EXISTS product_attribute_attribute_type_check;
ALTER TABLE product_attributes ADD CONSTRAINT product_attributes_attribute_type_check
    CHECK (attribute_type IN ('TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'SELECT', 'MULTI_SELECT'));

-- ========================================
-- Product attribute value table adaptations
-- ========================================
ALTER TABLE product_attribute_value RENAME TO product_attribute_values;
ALTER TABLE product_attribute_values DROP CONSTRAINT IF EXISTS product_attribute_value_product_id_attribute_id_key;
ALTER TABLE product_attribute_values DROP CONSTRAINT IF EXISTS product_attribute_value_product_id_fkey;
ALTER TABLE product_attribute_values DROP CONSTRAINT IF EXISTS product_attribute_value_attribute_id_fkey;

ALTER TABLE product_attribute_values RENAME COLUMN attribute_id TO product_attribute_id;

ALTER TABLE product_attribute_values ADD COLUMN IF NOT EXISTS value text;
ALTER TABLE product_attribute_values ADD COLUMN IF NOT EXISTS display_value text;
ALTER TABLE product_attribute_values ADD COLUMN IF NOT EXISTS is_default boolean DEFAULT false;
ALTER TABLE product_attribute_values ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

UPDATE product_attribute_values
SET value = COALESCE(value, value_text, value_number::text, value_boolean::text, to_char(value_date, 'YYYY-MM-DD')),
    display_value = COALESCE(display_value, value_text, value_number::text, value_boolean::text, to_char(value_date, 'YYYY-MM-DD')),
    is_default = COALESCE(is_default, false),
    sort_order = COALESCE(sort_order, 0);

ALTER TABLE product_attribute_values DROP COLUMN IF EXISTS value_text;
ALTER TABLE product_attribute_values DROP COLUMN IF EXISTS value_number;
ALTER TABLE product_attribute_values DROP COLUMN IF EXISTS value_boolean;
ALTER TABLE product_attribute_values DROP COLUMN IF EXISTS value_date;
ALTER TABLE product_attribute_values DROP COLUMN IF EXISTS product_id;

ALTER TABLE product_attribute_values ALTER COLUMN value SET NOT NULL;

ALTER TABLE product_attribute_values
    ADD CONSTRAINT product_attribute_values_attribute_fk
    FOREIGN KEY (product_attribute_id)
    REFERENCES product_attributes(id)
    ON DELETE CASCADE;

CREATE UNIQUE INDEX IF NOT EXISTS ux_product_attribute_values_attribute_value
    ON product_attribute_values (product_attribute_id, value);

-- =============================
-- Media asset/table adjustments
-- =============================
ALTER TABLE media_asset RENAME TO media_assets;
ALTER TABLE media_assets RENAME COLUMN filename TO original_filename;
ALTER TABLE media_assets RENAME COLUMN file_path TO storage_path;
ALTER TABLE media_assets RENAME COLUMN mime_type TO content_type;
ALTER TABLE media_assets DROP CONSTRAINT IF EXISTS media_asset_status_check;
ALTER TABLE media_assets DROP CONSTRAINT IF EXISTS media_asset_media_type_check;
ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS upload_date timestamp without time zone;
UPDATE media_assets SET media_type = COALESCE(media_type, 'IMAGE');
ALTER TABLE media_assets ADD CONSTRAINT media_assets_media_type_check
    CHECK (media_type IN ('IMAGE', 'VIDEO', 'DOCUMENT', 'OTHER'));

-- =============================
-- Product media table alignment
-- =============================
ALTER TABLE product_media RENAME COLUMN sort_order TO display_order;
ALTER TABLE product_media ADD COLUMN IF NOT EXISTS is_primary boolean DEFAULT false;
ALTER TABLE product_media ADD COLUMN IF NOT EXISTS alt_text_override text;
UPDATE product_media SET is_primary = COALESCE(is_primary, false);
UPDATE product_media SET display_order = COALESCE(display_order, 0);
ALTER TABLE product_media ADD COLUMN IF NOT EXISTS updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP;
UPDATE product_media SET updated_at = COALESCE(updated_at, created_at, CURRENT_TIMESTAMP);
