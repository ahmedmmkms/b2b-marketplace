-- V6__Create_orders_tables.sql
-- Create orders table
CREATE TABLE orders (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    quote_id VARCHAR(26) NOT NULL,
    buyer_account_id VARCHAR(26) NOT NULL,
    vendor_account_id VARCHAR(26) NOT NULL,
    po_number VARCHAR(50) UNIQUE NOT NULL, -- Purchase Order number
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    total_amount DECIMAL(19, 4), -- Amount in lowest currency unit (e.g., cents)
    total_currency VARCHAR(3) NOT NULL, -- ISO 4217 currency code
    placed_at TIMESTAMP NOT NULL,
    confirmed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create order_lines table
CREATE TABLE order_lines (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    order_id VARCHAR(26) NOT NULL,
    product_id VARCHAR(26) NOT NULL,
    product_name VARCHAR(255) NOT NULL, -- Store product name to preserve even if product changes
    quantity INTEGER NOT NULL,
    unit_price_amount DECIMAL(19, 4), -- Amount in lowest currency unit (e.g., cents)
    unit_price_currency VARCHAR(3) NOT NULL, -- ISO 4217 currency code
    line_total_amount DECIMAL(19, 4), -- Amount in lowest currency unit (e.g., cents)
    line_total_currency VARCHAR(3) NOT NULL, -- ISO 4217 currency code
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Create payments table
CREATE TABLE payments (
    id VARCHAR(26) PRIMARY KEY, -- ULID
    order_id VARCHAR(26) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- e.g., CREDIT_CARD, WALLET, BANK_TRANSFER
    payment_gateway_id VARCHAR(100), -- ID from the payment processor (Stripe, etc.)
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    amount_amount DECIMAL(19, 4), -- Amount in lowest currency unit (e.g., cents)
    amount_currency VARCHAR(3) NOT NULL, -- ISO 4217 currency code
    idempotency_key VARCHAR(255) UNIQUE, -- For idempotent requests
    processed_at TIMESTAMP,
    gateway_response TEXT, -- JSON response from payment gateway
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_orders_quote_id ON orders(quote_id);
CREATE INDEX idx_orders_buyer_account_id ON orders(buyer_account_id);
CREATE INDEX idx_orders_vendor_account_id ON orders(vendor_account_id);
CREATE INDEX idx_orders_po_number ON orders(po_number);
CREATE INDEX idx_orders_status ON orders(status);

CREATE INDEX idx_order_lines_order_id ON order_lines(order_id);
CREATE INDEX idx_order_lines_product_id ON order_lines(product_id);

CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_idempotency_key ON payments(idempotency_key);
CREATE INDEX idx_payments_payment_gateway_id ON payments(payment_gateway_id);
CREATE INDEX idx_payments_status ON payments(status);