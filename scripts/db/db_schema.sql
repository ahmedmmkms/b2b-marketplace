-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ULID generator (if generated at DB), else generated at app.
-- For simplicity we accept app-generated ULIDs; enforce format via CHECK.
CREATE DOMAIN ulid AS char(26)
  CHECK (VALUE ~ '^[0-9A-HJKMNP-TV-Z]{26}$');

-- Updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END$$;

-- ========== Core ==========

CREATE TABLE organizations (
  id            ulid PRIMARY KEY,
  name          text NOT NULL,
  role          text NOT NULL CHECK (role IN ('buyer','vendor','ops')),
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER organizations_set_updated_at
BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE users (
  id            ulid PRIMARY KEY,
  org_id        ulid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  email         citext UNIQUE NOT NULL,
  full_name     text NOT NULL,
  role          text NOT NULL CHECK (role IN ('buyer','vendor','ops','admin')),
  password_hash text,         -- if using local auth; can be NULL when using SSO
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX users_org_idx ON users(org_id);
CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========== Catalog ==========

CREATE TABLE products (
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
CREATE UNIQUE INDEX products_vendor_sku_uniq ON products(vendor_id, sku);
CREATE INDEX products_name_trgm ON products USING gin (name gin_trgm_ops);
CREATE INDEX products_attrs_gin ON products USING gin (attributes);
CREATE TRIGGER products_set_updated_at
BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========== RFQ / Quotes ==========

CREATE TABLE rfqs (
  id            ulid PRIMARY KEY,
  buyer_id      ulid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  buyer_user_id ulid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  title         text NOT NULL,
  notes         text,
  status        text NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft','issued','closed','awarded','cancelled')),
  attachments   jsonb DEFAULT '[]'::jsonb, -- array of {key,url,filename}
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX rfqs_buyer_idx ON rfqs(buyer_id);
CREATE TRIGGER rfqs_set_updated_at
BEFORE UPDATE ON rfqs FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE rfq_lines (
  id            ulid PRIMARY KEY,
  rfq_id        ulid NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  product_id    ulid, -- optional: template product; vendors can substitute
  description   text NOT NULL,
  quantity      numeric(18,3) NOT NULL CHECK (quantity > 0),
  uom           text NOT NULL, -- unit of measure
  target_price  numeric(18,4),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX rfq_lines_rfq_idx ON rfq_lines(rfq_id);
CREATE TRIGGER rfq_lines_set_updated_at
BEFORE UPDATE ON rfq_lines FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE quotes (
  id            ulid PRIMARY KEY,
  rfq_id        ulid NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  vendor_id     ulid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  vendor_user_id ulid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  currency      char(3) NOT NULL DEFAULT 'USD',
  valid_until   timestamptz,
  status        text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','submitted','accepted','rejected','expired')),
  subtotal      numeric(18,4) DEFAULT 0,
  tax_total     numeric(18,4) DEFAULT 0,
  grand_total   numeric(18,4) DEFAULT 0,
  notes         text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE(rfq_id, vendor_id) -- one quote per vendor per RFQ in MVP
);
CREATE INDEX quotes_rfq_idx ON quotes(rfq_id);
CREATE TRIGGER quotes_set_updated_at
BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE quote_lines (
  id            ulid PRIMARY KEY,
  quote_id      ulid NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  rfq_line_id   ulid NOT NULL REFERENCES rfq_lines(id) ON DELETE RESTRICT,
  product_id    ulid,
  description   text NOT NULL,
  quantity      numeric(18,3) NOT NULL CHECK (quantity > 0),
  uom           text NOT NULL,
  unit_price    numeric(18,4) NOT NULL CHECK (unit_price >= 0),
  line_total    numeric(18,4) NOT NULL CHECK (line_total >= 0),
  moq           numeric(18,3),
  lead_time_days integer,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX quote_lines_quote_idx ON quote_lines(quote_id);
CREATE TRIGGER quote_lines_set_updated_at
BEFORE UPDATE ON quote_lines FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========== Orders ==========

CREATE TABLE orders (
  id            ulid PRIMARY KEY,
  buyer_id      ulid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  quote_id      ulid NOT NULL REFERENCES quotes(id) ON DELETE RESTRICT,
  status        text NOT NULL DEFAULT 'placed'
                  CHECK (status IN ('placed','confirmed','cancelled','fulfilled')),
  currency      char(3) NOT NULL DEFAULT 'USD',
  subtotal      numeric(18,4) NOT NULL,
  tax_total     numeric(18,4) NOT NULL DEFAULT 0,
  grand_total   numeric(18,4) NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX orders_quote_unique ON orders(quote_id);
CREATE INDEX orders_buyer_idx ON orders(buyer_id);
CREATE TRIGGER orders_set_updated_at
BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE order_lines (
  id            ulid PRIMARY KEY,
  order_id      ulid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  quote_line_id ulid NOT NULL REFERENCES quote_lines(id) ON DELETE RESTRICT,
  description   text NOT NULL,
  quantity      numeric(18,3) NOT NULL,
  uom           text NOT NULL,
  unit_price    numeric(18,4) NOT NULL,
  line_total    numeric(18,4) NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX order_lines_order_idx ON order_lines(order_id);
CREATE TRIGGER order_lines_set_updated_at
BEFORE UPDATE ON order_lines FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========== Wallet Payments (MVP path) ==========

CREATE TABLE wallets (
  id            ulid PRIMARY KEY,
  org_id        ulid NOT NULL UNIQUE REFERENCES organizations(id) ON DELETE CASCADE,
  currency      char(3) NOT NULL DEFAULT 'USD',
  balance       numeric(18,4) NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX wallets_org_idx ON wallets(org_id);
CREATE TRIGGER wallets_set_updated_at
BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE wallet_transactions (
  id            ulid PRIMARY KEY,
  wallet_id     ulid NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  type          text NOT NULL CHECK (type IN ('topup','debit','refund')),
  amount        numeric(18,4) NOT NULL CHECK (amount >= 0),
  reference     text, -- order id, payment id, etc.
  created_by    ulid, -- user id
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX wallet_tx_wallet_idx ON wallet_transactions(wallet_id);

-- Simple payments table to log method & status (even for wallet)
CREATE TABLE payments (
  id            ulid PRIMARY KEY,
  order_id      ulid NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  method        text NOT NULL CHECK (method IN ('wallet','gateway1')),
  status        text NOT NULL CHECK (status IN ('initiated','succeeded','failed')),
  amount        numeric(18,4) NOT NULL,
  currency      char(3) NOT NULL DEFAULT 'USD',
  idempotency_key text UNIQUE,
  raw_payload   jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ========== Feature Flags (simple) ==========

CREATE TABLE feature_flags (
  key           text PRIMARY KEY,
  value         jsonb NOT NULL,  -- e.g., {"enabled":true,"scope":"public"}
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER feature_flags_set_updated_at
BEFORE UPDATE ON feature_flags FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========== Helpful Views ==========

CREATE VIEW rfq_quote_summary AS
SELECT
  r.id AS rfq_id,
  count(q.id) AS quote_count,
  min(q.grand_total) AS best_price,
  max(q.grand_total) AS worst_price
FROM rfqs r
LEFT JOIN quotes q ON q.rfq_id = r.id AND q.status IN ('submitted','accepted')
GROUP BY r.id;