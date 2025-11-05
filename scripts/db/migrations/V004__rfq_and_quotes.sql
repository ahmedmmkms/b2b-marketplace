-- RFQs table
-- Check if table exists before creating
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'rfqs') THEN
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
    END IF;
END $$;

-- RFQ Lines table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'rfq_lines') THEN
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
    END IF;
END $$;

-- Quotes table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'quotes') THEN
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
    END IF;
END $$;

-- Quote Lines table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'quote_lines') THEN
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
    END IF;
END $$;

-- RFQ Quote Summary View
DO $$
BEGIN
    -- Check if view exists and drop it if it does
    IF EXISTS (SELECT FROM information_schema.views WHERE table_name = 'rfq_quote_summary') THEN
        DROP VIEW rfq_quote_summary;
    END IF;

    -- Create the view
    CREATE VIEW rfq_quote_summary AS
    SELECT
      r.id AS rfq_id,
      count(q.id) AS quote_count,
      min(q.grand_total) AS best_price,
      max(q.grand_total) AS worst_price
    FROM rfqs r
    LEFT JOIN quotes q ON q.rfq_id = r.id AND q.status IN ('submitted','accepted')
    GROUP BY r.id;
END $$;