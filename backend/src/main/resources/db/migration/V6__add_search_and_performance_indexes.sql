-- Add search and performance indexes for Sprint 6

-- Create GIN index for full-text search on product table
-- This will improve the performance of to_tsvector operations
CREATE INDEX IF NOT EXISTS idx_product_fts_gin ON product USING GIN (
    (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(sku, ''))
);

-- Create indexes for common search and filter operations
CREATE INDEX IF NOT EXISTS idx_product_name ON product (LOWER(name));
CREATE INDEX IF NOT EXISTS idx_product_sku ON product (LOWER(sku));
CREATE INDEX IF NOT EXISTS idx_product_category_id ON product (category_id);
CREATE INDEX IF NOT EXISTS idx_product_vendor_id ON product (vendor_id);
CREATE INDEX IF NOT EXISTS idx_product_status ON product (status);
CREATE INDEX IF NOT EXISTS idx_product_inventory_status ON product (inventory_status);

-- Create composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_product_status_inventory ON product (status, inventory_status);
CREATE INDEX IF NOT EXISTS idx_product_vendor_status ON product (vendor_id, status);
CREATE INDEX IF NOT EXISTS idx_product_category_status ON product (category_id, status);

-- Create index for sorting operations (if not already present)
CREATE INDEX IF NOT EXISTS idx_product_created_at ON product (created_at);
CREATE INDEX IF NOT EXISTS idx_product_updated_at ON product (updated_at);
CREATE INDEX IF NOT EXISTS idx_product_base_price ON product (base_price);

-- Create partial index for published products only (common query pattern)
CREATE INDEX IF NOT EXISTS idx_product_published_status ON product (id, name, sku) WHERE status = 'PUBLISHED';