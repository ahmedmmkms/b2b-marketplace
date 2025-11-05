-- Orders table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'orders') THEN
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
    END IF;
END $$;

-- Order Lines table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'order_lines') THEN
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
    END IF;
END $$;

-- Wallets table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'wallets') THEN
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
    END IF;
END $$;

-- Wallet Transactions table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'wallet_transactions') THEN
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
    END IF;
END $$;

-- Simple payments table to log method & status (even for wallet)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'payments') THEN
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
    END IF;
END $$;