# Complete Database Schema for P4 B2B Marketplace

This document provides comprehensive documentation for the database schema of the P4 GCC/MENA B2B Marketplace project, incorporating all entities described in the tasks from `@docs/architecture/plan2.md`.

## Overview

The database schema supports all the functionality required by the P4 B2B Marketplace, including:

- Identity and Access Management (Accounts, Users, RBAC)
- Catalog and Search (Products, Vendors, Attributes, Media)
- RFQ and Quotes
- Orders and Payments
- Wallet and Credit Controls
- Invoicing and VAT
- Loyalty Programs
- Feature Flags and Configuration
- Audit and Observability

## Entity Tables

### Feature Flags (`feature_flags`)
**Description:** Stores feature flags for controlling functionality rollout

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| flag_name | VARCHAR(255) | NOT NULL, UNIQUE | - | Unique name of the feature flag |
| is_enabled | BOOLEAN | NOT NULL | FALSE | Whether the feature is enabled |
| description | TEXT | - | - | Description of the feature flag |
| created_by | VARCHAR(255) | - | - | User who created the flag |
| updated_by | VARCHAR(255) | - | - | User who last updated the flag |

### Accounts (`accounts`)
**Description:** Represents business accounts (individual or company)

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| account_type | VARCHAR(20) | NOT NULL | - | Account type (INDIVIDUAL, COMPANY) |
| status | VARCHAR(20) | NOT NULL | 'PENDING' | Account status (PENDING, ACTIVE, INACTIVE, SUSPENDED, CLOSED) |
| company_name | VARCHAR(255) | - | - | Company name (for company accounts) |
| contact_person | VARCHAR(255) | NOT NULL | - | Primary contact person |
| email | VARCHAR(255) | NOT NULL, UNIQUE | - | Account email |
| phone | VARCHAR(20) | - | - | Contact phone |
| tax_id | VARCHAR(50) | - | - | Tax identification number |
| registration_date | DATE | - | CURRENT_DATE | Date of account registration |
| kyc_verified | BOOLEAN | - | FALSE | KYC verification status |
| credit_limit | DECIMAL(19,4) | - | 0.0000 | Credit limit for the account |
| available_credit | DECIMAL(19,4) | - | 0.0000 | Available credit amount |

### Users (`users`)
**Description:** Represents users within accounts

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| account_id | VARCHAR(26) | FOREIGN KEY | - | Associated account ID |
| first_name | VARCHAR(100) | NOT NULL | - | User's first name |
| last_name | VARCHAR(100) | NOT NULL | - | User's last name |
| email | VARCHAR(255) | NOT NULL, UNIQUE | - | User's email |
| phone | VARCHAR(20) | - | - | User's phone |
| job_title | VARCHAR(100) | - | - | User's job title |
| is_active | BOOLEAN | NOT NULL | TRUE | Whether the user is active |
| last_login_at | TIMESTAMP | - | - | Last login timestamp |
| password_hash | VARCHAR(255) | NOT NULL | - | Hashed password |
| salt | VARCHAR(255) | NOT NULL | - | Salt for password hashing |
| failed_login_attempts | INTEGER | - | 0 | Number of failed login attempts |
| locked_until | TIMESTAMP | - | - | Time until account is locked |

### Permissions (`permissions`)
**Description:** RBAC permissions for access control

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| permission_name | VARCHAR(100) | NOT NULL, UNIQUE | - | Unique permission name |
| description | VARCHAR(255) | - | - | Permission description |
| is_active | BOOLEAN | NOT NULL | TRUE | Whether permission is active |

### Roles (`roles`)
**Description:** RBAC roles for access control

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| role_name | VARCHAR(100) | NOT NULL, UNIQUE | - | Unique role name |
| description | VARCHAR(255) | - | - | Role description |
| is_active | BOOLEAN | NOT NULL | TRUE | Whether role is active |

### User Roles (`user_roles`)
**Description:** Junction table linking users to roles

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | gen_random_ulid() | ULID identifier |
| user_id | VARCHAR(26) | FOREIGN KEY | - | Associated user ID |
| role_id | VARCHAR(26) | FOREIGN KEY | - | Associated role ID |
| assigned_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Assignment timestamp |
| assigned_by | VARCHAR(26) | - | - | User who assigned the role |
| - | - | UNIQUE | (user_id, role_id) | Unique constraint on user-role pair |

### Role Permissions (`role_permissions`)
**Description:** Junction table linking roles to permissions

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | gen_random_ulid() | ULID identifier |
| role_id | VARCHAR(26) | FOREIGN KEY | - | Associated role ID |
| permission_id | VARCHAR(26) | FOREIGN KEY | - | Associated permission ID |
| assigned_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Assignment timestamp |
| assigned_by | VARCHAR(26) | - | - | User who assigned the permission |
| - | - | UNIQUE | (role_id, permission_id) | Unique constraint on role-permission pair |

### Vendors (`vendors`)
**Description:** Represents vendors in the marketplace

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| business_name | VARCHAR(255) | NOT NULL | - | Vendor's business name |
| description | TEXT | - | - | Vendor description |
| email | VARCHAR(255) | - | - | Contact email |
| phone | VARCHAR(50) | - | - | Contact phone |
| address | JSONB | - | - | Contact address as JSON |
| tax_id | VARCHAR(100) | - | - | Tax identification number |
| vendor_status | VARCHAR(20) | NOT NULL | 'PENDING' | Vendor status (PENDING, APPROVED, REJECTED, SUSPENDED, CLOSED) |
| approval_date | DATE | - | - | Date of approval |
| business_license_no | VARCHAR(100) | - | - | Business license number |
| registration_date | DATE | - | - | Date of business registration |
| kyc_verified | BOOLEAN | NOT NULL | FALSE | KYC verification status |
| kyc_verified_at | DATE | - | - | Date of KYC verification |
| kyc_verified_by | VARCHAR(255) | - | - | User who verified KYC |

### Product Attributes (`product_attributes`)
**Description:** Defines attributes that products can have

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| name | VARCHAR(255) | NOT NULL | - | Attribute name (internal) |
| display_name | VARCHAR(255) | NOT NULL | - | Name for display purposes |
| description | TEXT | - | - | Attribute description |
| attribute_type | VARCHAR(50) | NOT NULL | - | Type of attribute (TEXT, NUMBER, BOOLEAN, DATE, SELECT, MULTI_SELECT) |
| is_required | BOOLEAN | - | FALSE | Whether the attribute is required |
| is_searchable | BOOLEAN | - | FALSE | Whether the attribute is searchable |
| is_filterable | BOOLEAN | - | FALSE | Whether the attribute is filterable |
| sort_order | INTEGER | - | 0 | Order for sorting in UI |
| validation_rules | JSONB | - | - | Validation rules as JSON |

### Product Attribute Values (`product_attribute_values`)
**Description:** Stores specific values for product attributes

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| product_attribute_id | VARCHAR(26) | FOREIGN KEY | - | Associated attribute ID |
| value | TEXT | NOT NULL | - | Attribute value |
| display_value | TEXT | - | - | Value for display purposes |
| is_default | BOOLEAN | - | FALSE | Whether this is the default value |
| sort_order | INTEGER | - | 0 | Order for sorting in UI |

### Product Attribute Assignments (`product_attribute_assignments`)
**Description:** Links products to attributes and captures selected or custom values

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| product_id | VARCHAR(26) | FOREIGN KEY, NOT NULL | - | Associated product ID |
| product_attribute_id | VARCHAR(26) | FOREIGN KEY, NOT NULL | - | Associated attribute ID |
| product_attribute_value_id | VARCHAR(26) | FOREIGN KEY | - | Linked attribute value ID when using predefined options |
| custom_value | TEXT | - | - | Free-form value for custom or numeric attributes |
| display_value | TEXT | - | - | Value formatted for display |
| is_default | BOOLEAN | - | FALSE | Indicates the default assignment for the attribute |

Unique constraint `uq_product_attribute_assignment` ensures a product can have only one assignment per attribute.

### Media Assets (`media_assets`)
**Description:** Stores media assets associated with products

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| name | VARCHAR(255) | NOT NULL | - | Asset name |
| original_filename | VARCHAR(255) | NOT NULL | - | Original file name |
| storage_path | VARCHAR(1000) | NOT NULL | - | Path in storage system |
| content_type | VARCHAR(100) | - | - | MIME content type |
| file_size | BIGINT | - | - | File size in bytes |
| alt_text | VARCHAR(255) | - | - | Alternative text for accessibility |
| title | VARCHAR(255) | - | - | Title for the asset |
| caption | TEXT | - | - | Caption for the asset |
| media_type | VARCHAR(20) | NOT NULL | - | Type (IMAGE, VIDEO, DOCUMENT, OTHER) |
| status | VARCHAR(20) | - | 'ACTIVE' | Asset status (ACTIVE, INACTIVE, DELETED) |
| is_primary | BOOLEAN | - | FALSE | Whether this is the primary media for the product |
| upload_date | TIMESTAMP | - | CURRENT_TIMESTAMP | Date the asset was uploaded |

### Products (`products`)
**Description:** Represents products in the catalog

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| name | VARCHAR(255) | NOT NULL | - | Product name |
| slug | VARCHAR(255) | - | - | URL-friendly slug (UNIQUE) |
| description | TEXT | - | - | Product description |
| short_description | VARCHAR(500) | - | - | Brief product description |
| sku | VARCHAR(100) | - | - | Stock Keeping Unit (UNIQUE) |
| upc | VARCHAR(50) | - | - | Universal Product Code |
| gtin | VARCHAR(50) | - | - | Global Trade Item Number |
| mpn | VARCHAR(100) | - | - | Manufacturer Part Number |
| brand | VARCHAR(100) | - | - | Product brand |
| category_id | VARCHAR(26) | - | - | Category identifier |
| vendor_id | VARCHAR(26) | FOREIGN KEY | - | Associated vendor ID |
| product_status | VARCHAR(20) | - | 'DRAFT' | Product status (DRAFT, ACTIVE, INACTIVE, DISCONTINUED) |
| price_amount | DECIMAL(19,4) | - | - | Price amount |
| price_currency | VARCHAR(3) | - | 'USD' | Price currency |
| tax_class | VARCHAR(50) | - | - | Tax classification |
| meta_title | VARCHAR(255) | - | - | SEO meta title |
| meta_description | VARCHAR(500) | - | - | SEO meta description |
| meta_keywords | TEXT | - | - | SEO meta keywords |
| weight | DECIMAL(10,3) | - | - | Product weight |
| dimensions | JSONB | - | - | Product dimensions as JSON |
| packaging_info | JSONB | - | - | Packaging information as JSON |
| min_order_quantity | INTEGER | - | 1 | Minimum order quantity |
| moq | INTEGER | - | - | Minimum Order Quantity |
| inventory_tracking | BOOLEAN | - | FALSE | Whether inventory is tracked |
| stock_quantity | INTEGER | - | 0 | Current stock quantity |
| inventory_status | VARCHAR(20) | - | 'IN_STOCK' | Inventory status (IN_STOCK, OUT_OF_STOCK, BACKORDER, DISCONTINUED) |
| is_active | BOOLEAN | - | TRUE | Whether the product is active |
| dimensions_length | DECIMAL(10,3) | - | - | Length (for better indexing) |
| dimensions_width | DECIMAL(10,3) | - | - | Width (for better indexing) |
| dimensions_height | DECIMAL(10,3) | - | - | Height (for better indexing) |

### Product Media (`product_media`)
**Description:** Junction table linking products to media assets

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| product_id | VARCHAR(26) | FOREIGN KEY | - | Associated product ID |
| media_asset_id | VARCHAR(26) | FOREIGN KEY | - | Associated media asset ID |
| display_order | INTEGER | - | 0 | Order for displaying media |
| is_primary | BOOLEAN | - | FALSE | Whether this is the primary media |
| alt_text_override | TEXT | - | - | Override for alt text |
| - | - | UNIQUE | (product_id, media_asset_id) | Unique constraint on product-media pair |

### RFQs (`rfqs`)
**Description:** Request for Quotation entities

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| account_id | VARCHAR(26) | FOREIGN KEY | - | Requesting account ID |
| title | VARCHAR(255) | NOT NULL | - | RFQ title |
| description | TEXT | - | - | RFQ description |
| rfq_status | VARCHAR(20) | - | 'DRAFT' | RFQ status (DRAFT, OPEN, CLOSED, EXPIRED) |
| expiry_date | TIMESTAMP | - | - | Date when RFQ expires |
| currency | VARCHAR(3) | - | 'USD' | Currency for RFQ |
| is_public | BOOLEAN | - | FALSE | Whether RFQ is public |
| contact_person | VARCHAR(255) | NOT NULL | - | Contact person for RFQ |
| contact_email | VARCHAR(255) | NOT NULL | - | Contact email for RFQ |
| tax_included | BOOLEAN | - | FALSE | Whether tax is included in prices |
| created_by | VARCHAR(255) | NOT NULL | - | User who created the RFQ |
| - | - | FOREIGN KEY | (account_id) REFERENCES accounts(id) | Foreign key constraint |

### RFQ Lines (`rfq_lines`)
**Description:** Individual line items in an RFQ

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| rfq_id | VARCHAR(26) | FOREIGN KEY | - | Associated RFQ ID |
| product_id | VARCHAR(26) | FOREIGN KEY | - | Associated product ID |
| product_name | VARCHAR(255) | NOT NULL | - | Product name |
| description | TEXT | - | - | Description of the line item |
| quantity | INTEGER | NOT NULL | - | Requested quantity |
| unit_of_measure | VARCHAR(20) | - | 'EA' | Unit of measure (each) |
| required_by | TIMESTAMP | - | - | Date when items are required by |
| product_specifications | TEXT | - | - | Product specifications |
| brand_preference | VARCHAR(255) | - | - | Preferred brand |
| quality_requirements | TEXT | - | - | Quality requirements |
| - | - | FOREIGN KEY | (rfq_id) REFERENCES rfqs(id) | Foreign key constraint to RFQ |
| - | - | FOREIGN KEY | (product_id) REFERENCES products(id) | Foreign key constraint to product |

### Quotes (`quotes`)
**Description:** Vendor responses to RFQs

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| rfq_id | VARCHAR(26) | FOREIGN KEY | - | Associated RFQ ID |
| vendor_id | VARCHAR(26) | FOREIGN KEY | - | Associated vendor ID |
| title | VARCHAR(255) | NOT NULL | - | Quote title |
| description | TEXT | - | - | Quote description |
| quote_status | VARCHAR(20) | - | 'DRAFT' | Quote status (DRAFT, SUBMITTED, ACCEPTED, REJECTED, EXPIRED) |
| total_amount | DECIMAL(19,4) | - | - | Total quoted amount |
| currency | VARCHAR(3) | - | 'USD' | Currency |
| validity_days | INTEGER | - | 30 | Validity period in days |
| expiry_date | TIMESTAMP | - | - | Expiration date |
| accepted_at | TIMESTAMP | - | - | Date when quote was accepted |
| quoted_by | VARCHAR(255) | NOT NULL | - | Person who created the quote |
| quote_number | VARCHAR(255) | NOT NULL | - | Unique quote number (UNIQUE) |
| valid_until | TIMESTAMP | NOT NULL | - | Date until which the quote is valid |
| freight_included | BOOLEAN | - | FALSE | Whether freight is included |
| tax_included | BOOLEAN | - | FALSE | Whether tax is included |
| - | - | FOREIGN KEY | (rfq_id) REFERENCES rfqs(id) | Foreign key constraint to RFQ |
| - | - | FOREIGN KEY | (vendor_id) REFERENCES vendors(id) | Foreign key constraint to vendor |

### Quote Lines (`quote_lines`)
**Description:** Individual line items in a quote

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| quote_id | VARCHAR(26) | FOREIGN KEY | - | Associated quote ID |
| rfq_line_id | VARCHAR(26) | FOREIGN KEY | - | Associated RFQ line ID |
| product_id | VARCHAR(26) | FOREIGN KEY | - | Associated product ID |
| product_name | VARCHAR(255) | NOT NULL | - | Product name |
| description | TEXT | - | - | Description of the line item |
| unit_price | DECIMAL(19,4) | NOT NULL | - | Unit price quoted |
| quantity | INTEGER | NOT NULL | - | Quoted quantity |
| line_total | DECIMAL(19,4) | NOT NULL | - | Total amount for this line |
| moq | INTEGER | - | 1 | Minimum Order Quantity |
| - | - | FOREIGN KEY | (quote_id) REFERENCES quotes(id) | Foreign key constraint to quote |
| - | - | FOREIGN KEY | (rfq_line_id) REFERENCES rfq_lines(id) | Foreign key constraint to RFQ line |
| - | - | FOREIGN KEY | (product_id) REFERENCES products(id) | Foreign key constraint to product |

### Orders (`orders`)
**Description:** Order entities for purchase transactions

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| account_id | VARCHAR(26) | FOREIGN KEY | - | Associated account ID |
| quote_id | VARCHAR(26) | FOREIGN KEY | - | Associated quote ID |
| po_number | VARCHAR(100) | - | - | Purchase order number |
| order_status | VARCHAR(30) | - | 'PENDING' | Order status (PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, RETURNED) |
| currency | VARCHAR(3) | - | 'USD' | Currency |
| subtotal | DECIMAL(19,4) | - | - | Subtotal amount |
| tax_amount | DECIMAL(19,4) | - | - | Tax amount |
| shipping_amount | DECIMAL(19,4) | - | - | Shipping cost |
| discount_amount | DECIMAL(19,4) | - | - | Discount amount |
| total_amount | DECIMAL(19,4) | - | - | Total order amount |
| billing_address | JSONB | - | - | Billing address as JSON |
| shipping_address | JSONB | - | - | Shipping address as JSON |
| notes | TEXT | - | - | Order notes |
| - | - | FOREIGN KEY | (account_id) REFERENCES accounts(id) | Foreign key constraint to account |
| - | - | FOREIGN KEY | (quote_id) REFERENCES quotes(id) | Foreign key constraint to quote |

### Order Lines (`order_lines`)
**Description:** Individual line items in an order

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| order_id | VARCHAR(26) | FOREIGN KEY | - | Associated order ID |
| product_id | VARCHAR(26) | FOREIGN KEY | - | Associated product ID |
| product_name | VARCHAR(255) | NOT NULL | - | Product name |
| description | TEXT | - | - | Description of the line item |
| unit_price | DECIMAL(19,4) | NOT NULL | - | Unit price |
| quantity | INTEGER | NOT NULL | - | Ordered quantity |
| total_price | DECIMAL(19,4) | - | (unit_price * quantity) | Total price for this line (computed) |
| - | - | FOREIGN KEY | (order_id) REFERENCES orders(id) | Foreign key constraint to order |
| - | - | FOREIGN KEY | (product_id) REFERENCES products(id) | Foreign key constraint to product |

### Payments (`payments`)
**Description:** Payment transactions for orders

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| order_id | VARCHAR(26) | FOREIGN KEY | - | Associated order ID |
| payment_method | VARCHAR(50) | NOT NULL | - | Payment method |
| amount | DECIMAL(19,4) | NOT NULL | - | Payment amount |
| currency | VARCHAR(3) | - | 'USD' | Currency |
| payment_status | VARCHAR(20) | - | 'PENDING' | Payment status (PENDING, AUTHORIZED, CAPTURED, FAILED, REFUNDED, CANCELLED) |
| transaction_id | VARCHAR(255) | - | - | Transaction ID from payment provider |
| provider | VARCHAR(50) | - | - | Payment provider |
| provider_response | JSONB | - | - | Response from payment provider |
| captured_at | TIMESTAMP | - | - | Time when payment was captured |
| - | - | FOREIGN KEY | (order_id) REFERENCES orders(id) | Foreign key constraint to order |

### Wallets (`wallets`)
**Description:** Wallet accounts for corporate credit

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| account_id | VARCHAR(26) | FOREIGN KEY | - | Associated account ID |
| name | VARCHAR(255) | NOT NULL | - | Wallet name |
| balance | DECIMAL(19,4) | - | 0.0000 | Current wallet balance |
| currency | VARCHAR(3) | - | 'USD' | Currency |
| wallet_status | VARCHAR(20) | - | 'ACTIVE' | Wallet status (ACTIVE, SUSPENDED, CLOSED) |
| - | - | FOREIGN KEY | (account_id) REFERENCES accounts(id) | Foreign key constraint to account |

### Wallet Transactions (`wallet_transactions`)
**Description:** Transactions affecting wallet balances

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| wallet_id | VARCHAR(26) | FOREIGN KEY | - | Associated wallet ID |
| transaction_type | VARCHAR(20) | NOT NULL | - | Transaction type (CREDIT, DEBIT) |
| amount | DECIMAL(19,4) | NOT NULL | - | Transaction amount |
| reference_type | VARCHAR(50) | NOT NULL | - | Type of reference (ORDER, REFUND, etc.) |
| reference_id | VARCHAR(26) | - | - | ID of the referenced entity |
| description | TEXT | - | - | Transaction description |
| balance_after | DECIMAL(19,4) | - | - | Balance after transaction |
| - | - | FOREIGN KEY | (wallet_id) REFERENCES wallets(id) | Foreign key constraint to wallet |

### Credit Limits (`credit_limits`)
**Description:** Credit limit information for accounts

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| account_id | VARCHAR(26) | FOREIGN KEY | - | Associated account ID |
| currency | VARCHAR(3) | - | 'USD' | Currency |
| limit_amount | DECIMAL(19,4) | NOT NULL | - | Maximum credit limit |
| available_amount | DECIMAL(19,4) | NOT NULL | - | Available credit amount |
| used_amount | DECIMAL(19,4) | - | 0.0000 | Amount of credit used |
| credit_status | VARCHAR(20) | - | 'ACTIVE' | Credit status (ACTIVE, SUSPENDED, EXCEEDED) |
| approved_date | DATE | - | - | Date credit limit was approved |
| approved_by | VARCHAR(26) | - | - | User who approved the limit |
| notes | TEXT | - | - | Approval notes |
| - | - | FOREIGN KEY | (account_id) REFERENCES accounts(id) | Foreign key constraint to account |

### Tax Registrations (`tax_registrations`)
**Description:** Tax registration information for VAT compliance

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| legal_name | VARCHAR(255) | NOT NULL | - | Legal business name |
| tax_number | VARCHAR(100) | NOT NULL | - | Tax registration number |
| address | JSONB | NOT NULL | - | Business address as JSON |
| is_active | BOOLEAN | - | TRUE | Whether tax registration is active |

### Sequence Registry (`sequence_registry`)
**Description:** Registry for invoice and credit note sequences

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| tax_reg_id | VARCHAR(26) | FOREIGN KEY | - | Associated tax registration ID |
| sequence_type | VARCHAR(20) | NOT NULL | - | Type of sequence (INVOICE, CREDIT_NOTE) |
| prefix | VARCHAR(20) | NOT NULL | - | Prefix for sequence |
| current_value | INTEGER | NOT NULL | 0 | Current sequence value |
| next_value | INTEGER | NOT NULL | 1 | Next sequence value |
| year | INTEGER | NOT NULL | - | Year of sequence |
| - | - | FOREIGN KEY | (tax_reg_id) REFERENCES tax_registrations(id) | Foreign key constraint to tax registration |
| - | - | UNIQUE | (tax_reg_id, sequence_type, year) | Unique constraint on tax reg, type, and year |

### Invoices (`invoices`)
**Description:** VAT invoices generated from orders

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| tax_reg_id | VARCHAR(26) | FOREIGN KEY | - | Associated tax registration ID |
| sequence_number | INTEGER | NOT NULL | - | Sequential number for the tax reg |
| full_number | VARCHAR(100) | - | - | Full invoice number (UNIQUE) |
| order_id | VARCHAR(26) | FOREIGN KEY | - | Associated order ID |
| issued_date | DATE | - | CURRENT_DATE | Date invoice was issued |
| due_date | DATE | NOT NULL | - | Date when invoice is due |
| currency | VARCHAR(3) | - | 'USD' | Currency |
| subtotal | DECIMAL(19,4) | - | - | Invoice subtotal |
| discount_amount | DECIMAL(19,4) | - | - | Discount amount |
| vat_amount | DECIMAL(19,4) | - | - | VAT amount |
| total_amount | DECIMAL(19,4) | - | - | Total invoice amount |
| invoice_status | VARCHAR(20) | - | 'DRAFT' | Invoice status (DRAFT, ISSUED, PAID, OVERDUE, CANCELLED) |
| customer_name | VARCHAR(255) | NOT NULL | - | Customer name |
| customer_tax_number | VARCHAR(100) | - | - | Customer tax number |
| customer_address | JSONB | - | - | Customer address as JSON |
| notes | TEXT | - | - | Invoice notes |
| - | - | FOREIGN KEY | (tax_reg_id) REFERENCES tax_registrations(id) | Foreign key constraint to tax registration |
| - | - | FOREIGN KEY | (order_id) REFERENCES orders(id) | Foreign key constraint to order |

### Invoice Lines (`invoice_lines`)
**Description:** Individual line items in an invoice

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| invoice_id | VARCHAR(26) | FOREIGN KEY | - | Associated invoice ID |
| order_line_id | VARCHAR(26) | FOREIGN KEY | - | Associated order line ID |
| product_name | VARCHAR(255) | NOT NULL | - | Product name |
| description | TEXT | - | - | Description of the line item |
| unit_price | DECIMAL(19,4) | NOT NULL | - | Unit price |
| quantity | INTEGER | NOT NULL | - | Invoice quantity |
| vat_rate | DECIMAL(5,2) | NOT NULL | - | VAT rate percentage |
| vat_amount | DECIMAL(19,4) | - | ((unit_price * quantity) * vat_rate) / 100 | VAT amount for this line (computed) |
| total_amount | DECIMAL(19,4) | - | (unit_price * quantity) + vat_amount | Total including VAT (computed) |
| - | - | FOREIGN KEY | (invoice_id) REFERENCES invoices(id) | Foreign key constraint to invoice |
| - | - | FOREIGN KEY | (order_line_id) REFERENCES order_lines(id) | Foreign key constraint to order line |

### Credit Notes (`credit_notes`)
**Description:** Credit notes for invoice adjustments

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| tax_reg_id | VARCHAR(26) | FOREIGN KEY | - | Associated tax registration ID |
| sequence_number | INTEGER | NOT NULL | - | Sequential number for the tax reg |
| full_number | VARCHAR(100) | - | - | Full credit note number (UNIQUE) |
| invoice_id | VARCHAR(26) | FOREIGN KEY | - | Associated invoice ID |
| issued_date | DATE | - | CURRENT_DATE | Date credit note was issued |
| reason | VARCHAR(50) | NOT NULL | - | Reason for credit note (RETURN, CANCELLED_ORDER, DISCOUNT, ERROR, OTHER) |
| reason_details | TEXT | - | - | Additional details about the reason |
| currency | VARCHAR(3) | - | 'USD' | Currency |
| subtotal | DECIMAL(19,4) | - | - | Credit note subtotal |
| vat_amount | DECIMAL(19,4) | - | - | VAT amount |
| total_amount | DECIMAL(19,4) | - | - | Total amount |
| credit_status | VARCHAR(20) | - | 'DRAFT' | Credit note status (DRAFT, ISSUED, APPLIED, CANCELLED) |
| - | - | FOREIGN KEY | (tax_reg_id) REFERENCES tax_registrations(id) | Foreign key constraint to tax registration |
| - | - | FOREIGN KEY | (invoice_id) REFERENCES invoices(id) | Foreign key constraint to invoice |

### Credit Note Lines (`credit_note_lines`)
**Description:** Individual line items in a credit note

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| credit_note_id | VARCHAR(26) | FOREIGN KEY | - | Associated credit note ID |
| invoice_line_id | VARCHAR(26) | FOREIGN KEY | - | Associated invoice line ID |
| quantity | INTEGER | NOT NULL | - | Credited quantity |
| unit_price | DECIMAL(19,4) | NOT NULL | - | Unit price |
| vat_rate | DECIMAL(5,2) | NOT NULL | - | VAT rate percentage |
| vat_amount | DECIMAL(19,4) | - | ((unit_price * quantity) * vat_rate) / 100 | VAT amount for this line (computed) |
| total_amount | DECIMAL(19,4) | - | (unit_price * quantity) + vat_amount | Total including VAT (computed) |
| - | - | FOREIGN KEY | (credit_note_id) REFERENCES credit_notes(id) | Foreign key constraint to credit note |
| - | - | FOREIGN KEY | (invoice_line_id) REFERENCES invoice_lines(id) | Foreign key constraint to invoice line |

### Loyalty Programs (`loyalty_programs`)
**Description:** Loyalty programs for the marketplace

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| name | VARCHAR(255) | NOT NULL | - | Program name |
| description | TEXT | - | - | Program description |
| start_date | DATE | NOT NULL | - | Program start date |
| end_date | DATE | - | - | Program end date |
| program_status | VARCHAR(20) | - | 'ACTIVE' | Program status (DRAFT, ACTIVE, SUSPENDED, COMPLETED, CANCELLED) |
| point_ratio | DECIMAL(5,2) | - | 1.00 | Points earned per currency unit |
| max_points_per_transaction | DECIMAL(10,2) | - | - | Max points per transaction |

### Tiers (`tiers`)
**Description:** Loyalty program tiers

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| loyalty_program_id | VARCHAR(26) | FOREIGN KEY | - | Associated loyalty program ID |
| name | VARCHAR(255) | NOT NULL | - | Tier name |
| description | TEXT | - | - | Tier description |
| min_points_required | INTEGER | - | 0 | Minimum points required for this tier |
| discount_percentage | DECIMAL(5,2) | - | 0.00 | Discount percentage for this tier |
| priority_support | BOOLEAN | - | FALSE | Whether tier gets priority support |
| - | - | FOREIGN KEY | (loyalty_program_id) REFERENCES loyalty_programs(id) | Foreign key constraint to loyalty program |

### Account Tiers (`account_tiers`)
**Description:** Junction table linking accounts to loyalty tiers

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| account_id | VARCHAR(26) | FOREIGN KEY | - | Associated account ID |
| tier_id | VARCHAR(26) | FOREIGN KEY | - | Associated tier ID |
| start_date | DATE | - | CURRENT_DATE | Tier membership start date |
| end_date | DATE | - | - | Tier membership end date |
| membership_status | VARCHAR(20) | - | 'ACTIVE' | Membership status (ACTIVE, EXPIRED, REVOKED) |
| - | - | FOREIGN KEY | (account_id) REFERENCES accounts(id) | Foreign key constraint to account |
| - | - | FOREIGN KEY | (tier_id) REFERENCES tiers(id) | Foreign key constraint to tier |

### Rewards (`rewards`)
**Description:** Rewards available in loyalty programs

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| loyalty_program_id | VARCHAR(26) | FOREIGN KEY | - | Associated loyalty program ID |
| name | VARCHAR(255) | NOT NULL | - | Reward name |
| description | TEXT | - | - | Reward description |
| points_required | INTEGER | NOT NULL | - | Points required to redeem |
| redemption_limit | INTEGER | - | - | Redemption limit |
| remaining_redemptions | INTEGER | - | - | Remaining redemptions |
| reward_status | VARCHAR(20) | - | 'ACTIVE' | Reward status (DRAFT, ACTIVE, SUSPENDED, EXPIRED) |
| - | - | FOREIGN KEY | (loyalty_program_id) REFERENCES loyalty_programs(id) | Foreign key constraint to loyalty program |

### Loyalty Transactions (`loyalty_transactions`)
**Description:** Transactions for loyalty points

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| account_id | VARCHAR(26) | FOREIGN KEY | - | Associated account ID |
| txn_type | VARCHAR(20) | NOT NULL | - | Transaction type (EARN, BURN, ADJUST) |
| points | DECIMAL(10,2) | NOT NULL | - | Points amount |
| reference_type | VARCHAR(50) | - | - | Type of reference |
| reference_id | VARCHAR(26) | - | - | ID of the referenced entity |
| balance_after | DECIMAL(10,2) | - | - | Balance after transaction |
| description | TEXT | - | - | Transaction description |
| - | - | FOREIGN KEY | (account_id) REFERENCES accounts(id) | Foreign key constraint to account |

### Audit Log (`audit_log`)
**Description:** Audit trail for tracking changes to entities

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| user_id | VARCHAR(26) | - | - | ID of user who performed action |
| action | VARCHAR(100) | NOT NULL | - | Type of action performed |
| resource_type | VARCHAR(50) | NOT NULL | - | Type of resource acted upon |
| resource_id | VARCHAR(26) | - | - | ID of resource acted upon |
| old_values | JSONB | - | - | Previous values as JSON |
| new_values | JSONB | - | - | New values as JSON |
| metadata | JSONB | - | - | Additional metadata as JSON |
| entity_id | VARCHAR(255) | NOT NULL | - | ID of the entity being audited |
| entity_type | VARCHAR(50) | NOT NULL | - | Type of the entity being audited |

### Idempotency Keys (`idempotency_keys`)
**Description:** Idempotency keys for safe retries on payment/order endpoints

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | VARCHAR(26) | PRIMARY KEY | - | ULID identifier |
| created_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | Last update timestamp |
| key_value | VARCHAR(255) | NOT NULL, UNIQUE | - | Idempotency key value |
| request_method | VARCHAR(10) | NOT NULL | - | HTTP method of the request |
| request_path | TEXT | NOT NULL | - | Path of the request |
| request_body | TEXT | - | - | Body of the original request |
| response_status | INTEGER | - | - | Status code of the response |
| response_body | TEXT | - | - | Body of the response |
| expires_at | TIMESTAMP | NOT NULL | - | When the key expires |

## Indexes

The schema includes the following important indexes for performance:

- `idx_users_email`: On `users(email)` for efficient user lookup
- `idx_users_account_id`: On `users(account_id)` for user-account relationships
- `idx_users_account_active`: On `users(account_id, is_active)` for active user queries
- `idx_accounts_email`: On `accounts(email)` for account lookup
- `idx_accounts_status`: On `accounts(status)` for status-based queries
- `idx_accounts_account_type`: On `accounts(account_type)` for account type queries
- `idx_permissions_name`: On `permissions(permission_name)` for permission lookup
- `idx_permissions_active`: On `permissions(is_active)` for active permissions
- `idx_roles_name`: On `roles(role_name)` for role lookup
- `idx_roles_active`: On `roles(is_active)` for active roles
- `idx_products_name`: Full-text index on `products(name)` for search
- `idx_products_status`: On `products(product_status)` for status queries
- `idx_products_vendor_id`: On `products(vendor_id)` for vendor-product relationships
- `idx_products_sku`: On `products(sku)` for product lookup
- `idx_products_slug`: On `products(slug)` for product lookup
- `idx_products_slug_gin`: Full-text index on `products(slug)` for search
- `idx_product_attribute_assignments_product_id`: On `product_attribute_assignments(product_id)` for retrieving attributes per product
- `idx_product_attribute_assignments_attribute_id`: On `product_attribute_assignments(product_attribute_id)` for attribute-centric lookups
- `idx_vendors_status`: On `vendors(vendor_status)` for vendor status queries
- `idx_rfqs_account_id`: On `rfqs(account_id)` for account-RFQ relationships
- `idx_rfqs_status`: On `rfqs(rfq_status)` for RFQ status queries
- `idx_quotes_rfq_id`: On `quotes(rfq_id)` for RFQ-quote relationships
- `idx_quotes_vendor_id`: On `quotes(vendor_id)` for vendor-quote relationships
- `idx_orders_account_id`: On `orders(account_id)` for account-order relationships
- `idx_orders_status`: On `orders(order_status)` for order status queries
- `idx_invoices_order_id`: On `invoices(order_id)` for order-invoice relationships
- `idx_invoices_status`: On `invoices(invoice_status)` for invoice status queries
- `idx_payments_order_id`: On `payments(order_id)` for order-payment relationships
- `idx_payments_status`: On `payments(payment_status)` for payment status queries
- `idx_media_assets_status`: On `media_assets(status)` for media asset status
- `idx_media_assets_type`: On `media_assets(media_type)` for media type filtering
- `idx_feature_flags_name`: On `feature_flags(flag_name)` for feature flag lookup

## Triggers

The schema includes triggers to automatically update the `updated_at` field on all tables that have this column:

- `update_accounts_updated_at` for `accounts` table
- `update_users_updated_at` for `users` table
- `update_permissions_updated_at` for `permissions` table
- `update_roles_updated_at` for `roles` table
- `update_vendors_updated_at` for `vendors` table
- `update_products_updated_at` for `products` table
- `update_product_attributes_updated_at` for `product_attributes` table
- `update_product_attribute_values_updated_at` for `product_attribute_values` table
- `update_product_attribute_assignments_updated_at` for `product_attribute_assignments` table
- `update_media_assets_updated_at` for `media_assets` table
- `update_rfqs_updated_at` for `rfqs` table
- `update_quotes_updated_at` for `quotes` table
- `update_orders_updated_at` for `orders` table
- `update_invoices_updated_at` for `invoices` table
- `update_credit_limits_updated_at` for `credit_limits` table
- `update_wallets_updated_at` for `wallets` table
- `update_loyalty_programs_updated_at` for `loyalty_programs` table
- `update_tiers_updated_at` for `tiers` table
- `update_rewards_updated_at` for `rewards` table
- `update_sequence_registry_updated_at` for `sequence_registry` table
- `update_tax_registrations_updated_at` for `tax_registrations` table
- `update_feature_flags_updated_at` for `feature_flags` table

This schema supports all the functionality required by the P4 B2B Marketplace system as defined in the task plan, providing a robust and scalable foundation for the application.
