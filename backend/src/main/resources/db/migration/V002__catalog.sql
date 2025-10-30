-- ========== Catalog Tables ==========

CREATE TABLE IF NOT EXISTS products (
  id            ulid PRIMARY KEY,
  vendor_id     ulid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  sku           text NOT NULL,
  name          text NOT NULL,
  description   text,
  category      text,
  price_currency char(3) DEFAULT 'USD',
  -- optional reference price for browsing; quotes carry final prices
  reference_price numeric(18,4),
  media_urls    jsonb DEFAULT '[]'::jsonb, -- array of object-storage URLs/keys
  attributes    jsonb DEFAULT '{}'::jsonb, -- free-form facets
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS products_vendor_sku_uniq ON products(vendor_id, sku);
CREATE INDEX IF NOT EXISTS products_name_trgm ON products USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS products_attrs_gin ON products USING gin (attributes);
DO $$ 
BEGIN 
   IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'products_set_updated_at') THEN 
      CREATE TRIGGER products_set_updated_at
      BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION set_updated_at();
   END IF; 
END $$;