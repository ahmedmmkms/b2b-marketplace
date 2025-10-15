-- Baseline schema captured from Neon production (2025-10-15)

-- Functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$;

-- Tables
CREATE TABLE public."account" (
    "id" character varying(26) NOT NULL,
    "name" character varying(255) NOT NULL,
    "type" character varying(50) DEFAULT 'INDIVIDUAL'::character varying NOT NULL,
    "legal_name" character varying(255),
    "tax_number" character varying(100),
    "status" character varying(20) DEFAULT 'ACTIVE'::character varying,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "company_email" character varying(255) NOT NULL,
    "company_phone" character varying(50),
    "company_address" text,
    "tax_id" character varying(100),
    "activated_at" timestamp without time zone,
    "credit_limit" numeric(19,4),
    "available_credit" numeric(19,4),
    CONSTRAINT "account_pkey" PRIMARY KEY (id),
    CONSTRAINT "uk_account_company_email" UNIQUE (company_email),
    CONSTRAINT "account_status_check" CHECK (status::text = ANY (ARRAY['PENDING'::character varying, 'ACTIVE'::character varying, 'SUSPENDED'::character varying, 'REJECTED'::character varying]::text[])),
    CONSTRAINT "account_type_check" CHECK (type::text = ANY (ARRAY['INDIVIDUAL'::character varying, 'COMPANY'::character varying]::text[]))
);

CREATE TABLE public."account_tier" (
    "id" character varying(26) NOT NULL,
    "account_id" character varying(26) NOT NULL,
    "tier_id" character varying(26) NOT NULL,
    "start_date" date DEFAULT CURRENT_DATE NOT NULL,
    "end_date" date,
    "status" character varying(20) DEFAULT 'ACTIVE'::character varying,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "account_tier_pkey" PRIMARY KEY (id),
    CONSTRAINT "account_tier_status_check" CHECK (status::text = ANY (ARRAY['ACTIVE'::character varying, 'EXPIRED'::character varying, 'REVOKED'::character varying]::text[]))
);

CREATE TABLE public."app_user" (
    "id" character varying(26) NOT NULL,
    "account_id" character varying(26) NOT NULL,
    "first_name" character varying(100) NOT NULL,
    "last_name" character varying(100) NOT NULL,
    "email" character varying(255) NOT NULL,
    "phone" character varying(50),
    "role" character varying(50) DEFAULT 'USER'::character varying,
    "status" character varying(20) DEFAULT 'ACTIVE'::character varying,
    "email_verified" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "app_user_pkey" PRIMARY KEY (id),
    CONSTRAINT "app_user_email_key" UNIQUE (email),
    CONSTRAINT "app_user_status_check" CHECK (status::text = ANY (ARRAY['ACTIVE'::character varying, 'SUSPENDED'::character varying]::text[]))
);

CREATE TABLE public."audit_log" (
    "id" character varying(26) NOT NULL,
    "user_id" character varying(26),
    "action" character varying(100) NOT NULL,
    "resource_type" character varying(50) NOT NULL,
    "resource_id" character varying(26),
    "old_values" jsonb,
    "new_values" jsonb,
    "metadata" jsonb,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "entity_id" character varying(255) NOT NULL,
    "entity_type" character varying(50) NOT NULL,
    CONSTRAINT "audit_log_pkey" PRIMARY KEY (id)
);

CREATE TABLE public."credit_limit" (
    "id" character varying(26) NOT NULL,
    "account_id" character varying(26) NOT NULL,
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "limit_amount" numeric(19,4) NOT NULL,
    "available_amount" numeric(19,4) NOT NULL,
    "used_amount" numeric(19,4) DEFAULT 0.00,
    "status" character varying(20) DEFAULT 'ACTIVE'::character varying,
    "approved_date" date,
    "approved_by" character varying(26),
    "notes" text,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "credit_limit_pkey" PRIMARY KEY (id),
    CONSTRAINT "credit_limit_status_check" CHECK (status::text = ANY (ARRAY['ACTIVE'::character varying, 'SUSPENDED'::character varying, 'EXCEEDED'::character varying]::text[]))
);

CREATE TABLE public."credit_note" (
    "id" character varying(26) NOT NULL,
    "tax_reg_id" character varying(26) NOT NULL,
    "sequence_number" integer NOT NULL,
    "full_number" character varying(100),
    "invoice_id" character varying(26) NOT NULL,
    "issued_date" date DEFAULT CURRENT_DATE NOT NULL,
    "reason" character varying(50) NOT NULL,
    "reason_details" text,
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "subtotal" numeric(19,4),
    "vat_amount" numeric(19,4),
    "total_amount" numeric(19,4),
    "status" character varying(20) DEFAULT 'DRAFT'::character varying,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "credit_note_pkey" PRIMARY KEY (id),
    CONSTRAINT "credit_note_full_number_key" UNIQUE (full_number),
    CONSTRAINT "credit_note_reason_check" CHECK (reason::text = ANY (ARRAY['RETURN'::character varying, 'CANCELLED_ORDER'::character varying, 'DISCOUNT'::character varying, 'ERROR'::character varying, 'OTHER'::character varying]::text[])),
    CONSTRAINT "credit_note_status_check" CHECK (status::text = ANY (ARRAY['DRAFT'::character varying, 'ISSUED'::character varying, 'APPLIED'::character varying, 'CANCELLED'::character varying]::text[]))
);

CREATE TABLE public."credit_note_line" (
    "id" character varying(26) NOT NULL,
    "credit_note_id" character varying(26) NOT NULL,
    "invoice_line_id" character varying(26) NOT NULL,
    "quantity" integer NOT NULL,
    "unit_price" numeric(19,4) NOT NULL,
    "vat_rate" numeric(5,2) NOT NULL,
    "vat_amount" numeric(19,4) DEFAULT (((unit_price * (quantity)::numeric) * vat_rate) / (100)::numeric),
    "total_amount" numeric(19,4) DEFAULT ((unit_price * (quantity)::numeric) + (((unit_price * (quantity)::numeric) * vat_rate) / (100)::numeric)),
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "credit_note_line_pkey" PRIMARY KEY (id)
);

CREATE TABLE public."invoice" (
    "id" character varying(26) NOT NULL,
    "tax_reg_id" character varying(26) NOT NULL,
    "sequence_number" integer NOT NULL,
    "full_number" character varying(100),
    "order_id" character varying(26) NOT NULL,
    "issued_date" date DEFAULT CURRENT_DATE NOT NULL,
    "due_date" date NOT NULL,
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "subtotal" numeric(19,4),
    "discount_amount" numeric(19,4),
    "vat_amount" numeric(19,4),
    "total_amount" numeric(19,4),
    "status" character varying(20) DEFAULT 'DRAFT'::character varying,
    "customer_name" character varying(255) NOT NULL,
    "customer_tax_number" character varying(100),
    "customer_address" jsonb,
    "notes" text,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "invoice_pkey" PRIMARY KEY (id),
    CONSTRAINT "invoice_full_number_key" UNIQUE (full_number),
    CONSTRAINT "invoice_status_check" CHECK (status::text = ANY (ARRAY['DRAFT'::character varying, 'ISSUED'::character varying, 'PAID'::character varying, 'OVERDUE'::character varying, 'CANCELLED'::character varying]::text[]))
);

CREATE TABLE public."invoice_line" (
    "id" character varying(26) NOT NULL,
    "invoice_id" character varying(26) NOT NULL,
    "order_line_id" character varying(26) NOT NULL,
    "product_name" character varying(255) NOT NULL,
    "description" text,
    "unit_price" numeric(19,4) NOT NULL,
    "quantity" integer NOT NULL,
    "vat_rate" numeric(5,2) NOT NULL,
    "vat_amount" numeric(19,4) DEFAULT (((unit_price * (quantity)::numeric) * vat_rate) / (100)::numeric),
    "total_amount" numeric(19,4) DEFAULT ((unit_price * (quantity)::numeric) + (((unit_price * (quantity)::numeric) * vat_rate) / (100)::numeric)),
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "invoice_line_pkey" PRIMARY KEY (id)
);

CREATE TABLE public."loyalty_program" (
    "id" character varying(26) NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" text,
    "start_date" date NOT NULL,
    "end_date" date,
    "status" character varying(20) DEFAULT 'ACTIVE'::character varying,
    "point_ratio" numeric(5,2) DEFAULT 1.00,
    "max_points_per_transaction" numeric(10,2),
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "loyalty_program_pkey" PRIMARY KEY (id),
    CONSTRAINT "loyalty_program_status_check" CHECK (status::text = ANY (ARRAY['DRAFT'::character varying, 'ACTIVE'::character varying, 'SUSPENDED'::character varying, 'COMPLETED'::character varying, 'CANCELLED'::character varying]::text[]))
);

CREATE TABLE public."loyalty_txn" (
    "id" character varying(26) NOT NULL,
    "account_id" character varying(26) NOT NULL,
    "txn_type" character varying(20) NOT NULL,
    "points" numeric(10,2) NOT NULL,
    "reference_type" character varying(50),
    "reference_id" character varying(26),
    "balance_after" numeric(10,2),
    "description" text,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "loyalty_txn_pkey" PRIMARY KEY (id),
    CONSTRAINT "loyalty_txn_txn_type_check" CHECK (txn_type::text = ANY (ARRAY['EARN'::character varying, 'BURN'::character varying, 'ADJUST'::character varying]::text[]))
);

CREATE TABLE public."media_asset" (
    "id" character varying(26) NOT NULL,
    "name" character varying(255) NOT NULL,
    "filename" character varying(255) NOT NULL,
    "file_path" character varying(1000) NOT NULL,
    "mime_type" character varying(100),
    "file_size" bigint,
    "alt_text" character varying(255),
    "title" character varying(255),
    "caption" text,
    "tags" text,
    "media_type" character varying(20) NOT NULL,
    "status" character varying(20) DEFAULT 'ACTIVE'::character varying,
    "is_primary" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "media_asset_pkey" PRIMARY KEY (id),
    CONSTRAINT "media_asset_media_type_check" CHECK (media_type::text = ANY (ARRAY['IMAGE'::character varying, 'VIDEO'::character varying, 'DOCUMENT'::character varying, 'OTHER'::character varying]::text[])),
    CONSTRAINT "media_asset_status_check" CHECK (status::text = ANY (ARRAY['ACTIVE'::character varying, 'INACTIVE'::character varying, 'DELETED'::character varying]::text[]))
);

CREATE TABLE public."order_line" (
    "id" character varying(26) NOT NULL,
    "order_id" character varying(26) NOT NULL,
    "product_id" character varying(26),
    "product_name" character varying(255) NOT NULL,
    "description" text,
    "unit_price" numeric(19,4) NOT NULL,
    "quantity" integer NOT NULL,
    "total_price" numeric(19,4) DEFAULT (unit_price * (quantity)::numeric),
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "order_line_pkey" PRIMARY KEY (id)
);

CREATE TABLE public."order_table" (
    "id" character varying(26) NOT NULL,
    "account_id" character varying(26) NOT NULL,
    "quote_id" character varying(26),
    "po_number" character varying(100),
    "status" character varying(30) DEFAULT 'PENDING'::character varying,
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "subtotal" numeric(19,4),
    "tax_amount" numeric(19,4),
    "shipping_amount" numeric(19,4),
    "discount_amount" numeric(19,4),
    "total_amount" numeric(19,4),
    "billing_address" jsonb,
    "shipping_address" jsonb,
    "notes" text,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "order_table_pkey" PRIMARY KEY (id),
    CONSTRAINT "order_table_status_check" CHECK (status::text = ANY (ARRAY['PENDING'::character varying, 'CONFIRMED'::character varying, 'PROCESSING'::character varying, 'SHIPPED'::character varying, 'DELIVERED'::character varying, 'CANCELLED'::character varying, 'RETURNED'::character varying]::text[]))
);

CREATE TABLE public."payment" (
    "id" character varying(26) NOT NULL,
    "order_id" character varying(26) NOT NULL,
    "payment_method" character varying(50) NOT NULL,
    "amount" numeric(19,4) NOT NULL,
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "status" character varying(20) DEFAULT 'PENDING'::character varying,
    "transaction_id" character varying(255),
    "provider" character varying(50),
    "provider_response" jsonb,
    "captured_at" timestamp without time zone,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "payment_pkey" PRIMARY KEY (id),
    CONSTRAINT "payment_status_check" CHECK (status::text = ANY (ARRAY['PENDING'::character varying, 'AUTHORIZED'::character varying, 'CAPTURED'::character varying, 'FAILED'::character varying, 'REFUNDED'::character varying, 'CANCELLED'::character varying]::text[]))
);

CREATE TABLE public."product" (
    "id" character varying(26) NOT NULL,
    "name" character varying(255) NOT NULL,
    "slug" character varying(255),
    "description" text,
    "short_description" character varying(500),
    "sku" character varying(100),
    "upc" character varying(50),
    "gtin" character varying(50),
    "mpn" character varying(100),
    "brand" character varying(100),
    "category_id" character varying(26),
    "vendor_id" character varying(26) NOT NULL,
    "status" character varying(20) DEFAULT 'DRAFT'::character varying,
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "base_price" numeric(19,4),
    "tax_class" character varying(50),
    "meta_title" character varying(255),
    "meta_description" character varying(500),
    "meta_keywords" text,
    "weight" numeric(10,3),
    "dimensions" jsonb,
    "packaging_info" jsonb,
    "min_order_qty" integer DEFAULT 1,
    "moq" integer,
    "inventory_tracking" boolean DEFAULT false,
    "inventory_qty" integer DEFAULT 0,
    "inventory_status" character varying(20) DEFAULT 'IN_STOCK'::character varying,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "product_pkey" PRIMARY KEY (id),
    CONSTRAINT "product_sku_key" UNIQUE (sku),
    CONSTRAINT "product_slug_key" UNIQUE (slug),
    CONSTRAINT "product_inventory_status_check" CHECK (inventory_status::text = ANY (ARRAY['IN_STOCK'::character varying, 'OUT_OF_STOCK'::character varying, 'BACKORDER'::character varying, 'DISCONTINUED'::character varying]::text[])),
    CONSTRAINT "product_status_check" CHECK (status::text = ANY (ARRAY['DRAFT'::character varying, 'PUBLISHED'::character varying, 'UNPUBLISHED'::character varying, 'SUSPENDED'::character varying]::text[]))
);

CREATE TABLE public."product_attribute" (
    "id" character varying(26) NOT NULL,
    "name" character varying(255) NOT NULL,
    "display_name" character varying(255) NOT NULL,
    "attribute_type" character varying(50) NOT NULL,
    "is_required" boolean DEFAULT false,
    "is_searchable" boolean DEFAULT false,
    "is_filterable" boolean DEFAULT false,
    "validation_rules" jsonb,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "product_attribute_pkey" PRIMARY KEY (id),
    CONSTRAINT "product_attribute_attribute_type_check" CHECK (attribute_type::text = ANY (ARRAY['TEXT'::character varying, 'NUMBER'::character varying, 'BOOLEAN'::character varying, 'DATE'::character varying, 'SELECT'::character varying]::text[]))
);

CREATE TABLE public."product_attribute_value" (
    "id" character varying(26) NOT NULL,
    "product_id" character varying(26) NOT NULL,
    "attribute_id" character varying(26) NOT NULL,
    "value_text" text,
    "value_number" numeric(19,4),
    "value_boolean" boolean,
    "value_date" timestamp without time zone,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "product_attribute_value_pkey" PRIMARY KEY (id),
    CONSTRAINT "product_attribute_value_product_id_attribute_id_key" UNIQUE (product_id, attribute_id)
);

CREATE TABLE public."product_media" (
    "id" character varying(26) NOT NULL,
    "product_id" character varying(26) NOT NULL,
    "media_asset_id" character varying(26) NOT NULL,
    "sort_order" integer DEFAULT 0,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "product_media_pkey" PRIMARY KEY (id),
    CONSTRAINT "product_media_product_id_media_asset_id_key" UNIQUE (product_id, media_asset_id)
);

CREATE TABLE public."quote" (
    "id" character varying(26) NOT NULL,
    "rfq_id" character varying(26) NOT NULL,
    "vendor_id" character varying(26) NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" text,
    "status" character varying(20) DEFAULT 'DRAFT'::character varying,
    "total_amount" numeric(19,4),
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "validity_days" integer DEFAULT 30,
    "expiry_date" timestamp without time zone,
    "accepted_at" timestamp without time zone,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "quoted_by" character varying(255) NOT NULL,
    "quote_number" character varying(255) NOT NULL,
    "valid_until" timestamp without time zone NOT NULL,
    "freight_included" boolean DEFAULT false NOT NULL,
    "tax_included" boolean DEFAULT false NOT NULL,
    CONSTRAINT "quote_pkey" PRIMARY KEY (id),
    CONSTRAINT "uk_quote_number" UNIQUE (quote_number),
    CONSTRAINT "quote_status_check" CHECK (status::text = ANY (ARRAY['DRAFT'::character varying, 'SUBMITTED'::character varying, 'ACCEPTED'::character varying, 'REJECTED'::character varying, 'EXPIRED'::character varying]::text[]))
);

CREATE TABLE public."quote_line" (
    "id" character varying(26) NOT NULL,
    "quote_id" character varying(26) NOT NULL,
    "rfq_line_id" character varying(26) NOT NULL,
    "product_id" character varying(26),
    "product_name" character varying(255) NOT NULL,
    "description" text,
    "unit_price" numeric(19,4) NOT NULL,
    "quantity" integer NOT NULL,
    "total_price" numeric(19,4) DEFAULT (unit_price * (quantity)::numeric),
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "line_total" numeric(19,4) NOT NULL,
    "moq" integer DEFAULT 1 NOT NULL,
    CONSTRAINT "quote_line_pkey" PRIMARY KEY (id)
);

CREATE TABLE public."reward" (
    "id" character varying(26) NOT NULL,
    "loyalty_program_id" character varying(26) NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" text,
    "points_required" integer NOT NULL,
    "redemption_limit" integer,
    "remaining_redemptions" integer,
    "status" character varying(20) DEFAULT 'ACTIVE'::character varying,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reward_pkey" PRIMARY KEY (id),
    CONSTRAINT "reward_status_check" CHECK (status::text = ANY (ARRAY['DRAFT'::character varying, 'ACTIVE'::character varying, 'SUSPENDED'::character varying, 'EXPIRED'::character varying]::text[]))
);

CREATE TABLE public."rfq" (
    "id" character varying(26) NOT NULL,
    "account_id" character varying(26) NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" text,
    "status" character varying(20) DEFAULT 'DRAFT'::character varying,
    "expiry_date" timestamp without time zone,
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "is_public" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "contact_person" character varying(255) NOT NULL,
    "contact_email" character varying(255) NOT NULL,
    "tax_included" boolean DEFAULT false NOT NULL,
    "created_by" character varying(255) NOT NULL,
    CONSTRAINT "rfq_pkey" PRIMARY KEY (id),
    CONSTRAINT "rfq_status_check" CHECK (status::text = ANY (ARRAY['DRAFT'::character varying, 'OPEN'::character varying, 'CLOSED'::character varying, 'EXPIRED'::character varying]::text[]))
);

CREATE TABLE public."rfq_line" (
    "id" character varying(26) NOT NULL,
    "rfq_id" character varying(26) NOT NULL,
    "product_id" character varying(26),
    "product_name" character varying(255) NOT NULL,
    "description" text,
    "quantity" integer NOT NULL,
    "unit_of_measure" character varying(20) DEFAULT 'EA'::character varying,
    "required_by" timestamp without time zone,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "product_specifications" text,
    "brand_preference" character varying(255),
    "quality_requirements" text,
    CONSTRAINT "rfq_line_pkey" PRIMARY KEY (id)
);

CREATE TABLE public."sequence_registry" (
    "id" character varying(26) NOT NULL,
    "tax_reg_id" character varying(26) NOT NULL,
    "sequence_type" character varying(20) NOT NULL,
    "prefix" character varying(20) NOT NULL,
    "current_value" integer DEFAULT 0 NOT NULL,
    "next_value" integer DEFAULT 1 NOT NULL,
    "year" integer NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sequence_registry_pkey" PRIMARY KEY (id),
    CONSTRAINT "sequence_registry_tax_reg_id_sequence_type_year_key" UNIQUE (tax_reg_id, sequence_type, year),
    CONSTRAINT "sequence_registry_sequence_type_check" CHECK (sequence_type::text = ANY (ARRAY['INVOICE'::character varying, 'CREDIT_NOTE'::character varying]::text[]))
);

CREATE TABLE public."tax_reg" (
    "id" character varying(26) NOT NULL,
    "legal_name" character varying(255) NOT NULL,
    "tax_number" character varying(100) NOT NULL,
    "address" jsonb NOT NULL,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tax_reg_pkey" PRIMARY KEY (id)
);

CREATE TABLE public."tier" (
    "id" character varying(26) NOT NULL,
    "loyalty_program_id" character varying(26) NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" text,
    "min_points_required" integer DEFAULT 0,
    "discount_percentage" numeric(5,2) DEFAULT 0.00,
    "priority_support" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tier_pkey" PRIMARY KEY (id)
);

CREATE TABLE public."vendor" (
    "id" character varying(26) NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" text,
    "contact_person" character varying(255),
    "contact_email" character varying(255),
    "contact_phone" character varying(50),
    "address" jsonb,
    "tax_number" character varying(100),
    "status" character varying(20) DEFAULT 'ACTIVE'::character varying,
    "approval_date" timestamp without time zone,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "vendor_pkey" PRIMARY KEY (id),
    CONSTRAINT "vendor_status_check" CHECK (status::text = ANY (ARRAY['PENDING'::character varying, 'ACTIVE'::character varying, 'SUSPENDED'::character varying, 'REJECTED'::character varying]::text[]))
);

CREATE TABLE public."wallet" (
    "id" character varying(26) NOT NULL,
    "account_id" character varying(26) NOT NULL,
    "name" character varying(255) NOT NULL,
    "balance" numeric(19,4) DEFAULT 0.00,
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "status" character varying(20) DEFAULT 'ACTIVE'::character varying,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "wallet_pkey" PRIMARY KEY (id),
    CONSTRAINT "wallet_status_check" CHECK (status::text = ANY (ARRAY['ACTIVE'::character varying, 'SUSPENDED'::character varying, 'CLOSED'::character varying]::text[]))
);

CREATE TABLE public."wallet_txn" (
    "id" character varying(26) NOT NULL,
    "wallet_id" character varying(26) NOT NULL,
    "transaction_type" character varying(20) NOT NULL,
    "amount" numeric(19,4) NOT NULL,
    "reference_type" character varying(50) NOT NULL,
    "reference_id" character varying(26),
    "description" text,
    "balance_after" numeric(19,4),
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "wallet_txn_pkey" PRIMARY KEY (id),
    CONSTRAINT "wallet_txn_transaction_type_check" CHECK (transaction_type::text = ANY (ARRAY['CREDIT'::character varying, 'DEBIT'::character varying]::text[]))
);

-- Foreign Keys
ALTER TABLE public."account_tier" ADD CONSTRAINT "account_tier_account_id_fkey" FOREIGN KEY (account_id) REFERENCES account(id);
ALTER TABLE public."account_tier" ADD CONSTRAINT "account_tier_tier_id_fkey" FOREIGN KEY (tier_id) REFERENCES tier(id);
ALTER TABLE public."app_user" ADD CONSTRAINT "app_user_account_id_fkey" FOREIGN KEY (account_id) REFERENCES account(id);
ALTER TABLE public."credit_limit" ADD CONSTRAINT "credit_limit_account_id_fkey" FOREIGN KEY (account_id) REFERENCES account(id);
ALTER TABLE public."credit_note" ADD CONSTRAINT "credit_note_invoice_id_fkey" FOREIGN KEY (invoice_id) REFERENCES invoice(id);
ALTER TABLE public."credit_note" ADD CONSTRAINT "credit_note_tax_reg_id_fkey" FOREIGN KEY (tax_reg_id) REFERENCES tax_reg(id);
ALTER TABLE public."credit_note_line" ADD CONSTRAINT "credit_note_line_credit_note_id_fkey" FOREIGN KEY (credit_note_id) REFERENCES credit_note(id) ON DELETE CASCADE;
ALTER TABLE public."credit_note_line" ADD CONSTRAINT "credit_note_line_invoice_line_id_fkey" FOREIGN KEY (invoice_line_id) REFERENCES invoice_line(id);
ALTER TABLE public."invoice" ADD CONSTRAINT "invoice_order_id_fkey" FOREIGN KEY (order_id) REFERENCES order_table(id);
ALTER TABLE public."invoice" ADD CONSTRAINT "invoice_tax_reg_id_fkey" FOREIGN KEY (tax_reg_id) REFERENCES tax_reg(id);
ALTER TABLE public."invoice_line" ADD CONSTRAINT "invoice_line_invoice_id_fkey" FOREIGN KEY (invoice_id) REFERENCES invoice(id) ON DELETE CASCADE;
ALTER TABLE public."invoice_line" ADD CONSTRAINT "invoice_line_order_line_id_fkey" FOREIGN KEY (order_line_id) REFERENCES order_line(id);
ALTER TABLE public."loyalty_txn" ADD CONSTRAINT "loyalty_txn_account_id_fkey" FOREIGN KEY (account_id) REFERENCES account(id);
ALTER TABLE public."order_line" ADD CONSTRAINT "order_line_order_id_fkey" FOREIGN KEY (order_id) REFERENCES order_table(id) ON DELETE CASCADE;
ALTER TABLE public."order_line" ADD CONSTRAINT "order_line_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id);
ALTER TABLE public."order_table" ADD CONSTRAINT "order_table_account_id_fkey" FOREIGN KEY (account_id) REFERENCES account(id);
ALTER TABLE public."order_table" ADD CONSTRAINT "order_table_quote_id_fkey" FOREIGN KEY (quote_id) REFERENCES quote(id);
ALTER TABLE public."payment" ADD CONSTRAINT "payment_order_id_fkey" FOREIGN KEY (order_id) REFERENCES order_table(id);
ALTER TABLE public."product" ADD CONSTRAINT "product_vendor_id_fkey" FOREIGN KEY (vendor_id) REFERENCES vendor(id);
ALTER TABLE public."product_attribute_value" ADD CONSTRAINT "product_attribute_value_attribute_id_fkey" FOREIGN KEY (attribute_id) REFERENCES product_attribute(id);
ALTER TABLE public."product_attribute_value" ADD CONSTRAINT "product_attribute_value_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE;
ALTER TABLE public."product_media" ADD CONSTRAINT "product_media_media_asset_id_fkey" FOREIGN KEY (media_asset_id) REFERENCES media_asset(id) ON DELETE CASCADE;
ALTER TABLE public."product_media" ADD CONSTRAINT "product_media_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE;
ALTER TABLE public."quote" ADD CONSTRAINT "quote_rfq_id_fkey" FOREIGN KEY (rfq_id) REFERENCES rfq(id);
ALTER TABLE public."quote" ADD CONSTRAINT "quote_vendor_id_fkey" FOREIGN KEY (vendor_id) REFERENCES vendor(id);
ALTER TABLE public."quote_line" ADD CONSTRAINT "quote_line_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id);
ALTER TABLE public."quote_line" ADD CONSTRAINT "quote_line_quote_id_fkey" FOREIGN KEY (quote_id) REFERENCES quote(id) ON DELETE CASCADE;
ALTER TABLE public."quote_line" ADD CONSTRAINT "quote_line_rfq_line_id_fkey" FOREIGN KEY (rfq_line_id) REFERENCES rfq_line(id);
ALTER TABLE public."reward" ADD CONSTRAINT "reward_loyalty_program_id_fkey" FOREIGN KEY (loyalty_program_id) REFERENCES loyalty_program(id);
ALTER TABLE public."rfq" ADD CONSTRAINT "rfq_account_id_fkey" FOREIGN KEY (account_id) REFERENCES account(id);
ALTER TABLE public."rfq_line" ADD CONSTRAINT "rfq_line_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id);
ALTER TABLE public."rfq_line" ADD CONSTRAINT "rfq_line_rfq_id_fkey" FOREIGN KEY (rfq_id) REFERENCES rfq(id) ON DELETE CASCADE;
ALTER TABLE public."sequence_registry" ADD CONSTRAINT "sequence_registry_tax_reg_id_fkey" FOREIGN KEY (tax_reg_id) REFERENCES tax_reg(id);
ALTER TABLE public."tier" ADD CONSTRAINT "tier_loyalty_program_id_fkey" FOREIGN KEY (loyalty_program_id) REFERENCES loyalty_program(id);
ALTER TABLE public."wallet" ADD CONSTRAINT "wallet_account_id_fkey" FOREIGN KEY (account_id) REFERENCES account(id);
ALTER TABLE public."wallet_txn" ADD CONSTRAINT "wallet_txn_wallet_id_fkey" FOREIGN KEY (wallet_id) REFERENCES wallet(id);

-- Indexes
CREATE INDEX idx_invoice_order_id ON public.invoice USING btree (order_id);
CREATE INDEX idx_invoice_status ON public.invoice USING btree (status);
CREATE INDEX idx_media_asset_status ON public.media_asset USING btree (status);
CREATE INDEX idx_media_asset_type ON public.media_asset USING btree (media_type);
CREATE INDEX idx_order_account_id ON public.order_table USING btree (account_id);
CREATE INDEX idx_order_status ON public.order_table USING btree (status);
CREATE INDEX idx_payment_order_id ON public.payment USING btree (order_id);
CREATE INDEX idx_payment_status ON public.payment USING btree (status);
CREATE INDEX idx_product_category ON public.product USING btree (category_id);
CREATE INDEX idx_product_description_gin ON public.product USING gin (to_tsvector('english'::regconfig, description));
CREATE INDEX idx_product_name_gin ON public.product USING gin (to_tsvector('english'::regconfig, (name)::text));
CREATE INDEX idx_product_sku ON public.product USING btree (sku);
CREATE INDEX idx_product_slug ON public.product USING btree (slug);
CREATE INDEX idx_product_slug_gin ON public.product USING gin (to_tsvector('english'::regconfig, (slug)::text));
CREATE INDEX idx_product_status ON public.product USING btree (status);
CREATE INDEX idx_product_vendor_id ON public.product USING btree (vendor_id);
CREATE INDEX idx_product_attribute_name ON public.product_attribute USING btree (name);
CREATE INDEX idx_product_attribute_type ON public.product_attribute USING btree (attribute_type);
CREATE INDEX idx_quote_rfq_id ON public.quote USING btree (rfq_id);
CREATE INDEX idx_quote_vendor_id ON public.quote USING btree (vendor_id);
CREATE INDEX idx_rfq_account_id ON public.rfq USING btree (account_id);
CREATE INDEX idx_rfq_status ON public.rfq USING btree (status);
CREATE INDEX idx_vendor_status ON public.vendor USING btree (status);

-- Triggers
CREATE TRIGGER update_account_updated_at BEFORE UPDATE ON account FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_app_user_updated_at BEFORE UPDATE ON app_user FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_credit_limit_updated_at BEFORE UPDATE ON credit_limit FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoice_updated_at BEFORE UPDATE ON invoice FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loyalty_program_updated_at BEFORE UPDATE ON loyalty_program FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_asset_updated_at BEFORE UPDATE ON media_asset FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_order_updated_at BEFORE UPDATE ON order_table FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON product FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_attribute_updated_at BEFORE UPDATE ON product_attribute FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_attribute_value_updated_at BEFORE UPDATE ON product_attribute_value FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quote_updated_at BEFORE UPDATE ON quote FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rfq_updated_at BEFORE UPDATE ON rfq FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tier_updated_at BEFORE UPDATE ON tier FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vendor_updated_at BEFORE UPDATE ON vendor FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallet_updated_at BEFORE UPDATE ON wallet FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
