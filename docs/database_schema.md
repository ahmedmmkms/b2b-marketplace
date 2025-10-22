# Database Schema Documentation

This document provides a comprehensive overview of the database schema for the P4 GCC/MENA B2B Marketplace project.

## Overview

The database schema follows a modular monolith architecture with domain-oriented tables. It includes modules for:
- Identity/Access Management (Accounts, Users, RBAC)
- Catalog (Products, Vendors, Attributes, Media)
- RFQ/Quotes
- Orders & Payments
- Invoicing
- Wallet & Credit
- Loyalty
- Operations/Audit

## Table Reference

### Identity/Access Management

#### account
**Description:** Represents business accounts (both individual and company accounts)

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| name | character varying(255) | NOT NULL | - | Account name |
| type | character varying(50) | CHECK | 'INDIVIDUAL' | Account type: INDIVIDUAL or COMPANY |
| legal_name | character varying(255) | - | - | Legal business name |
| tax_number | character varying(100) | - | - | Tax registration number |
| status | character varying(20) | CHECK | 'ACTIVE' | Account status (ACTIVE, INACTIVE, SUSPENDED, REJECTED) |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |
| company_email | character varying(255) | UNIQUE | - | Company email address |
| company_phone | character varying(50) | - | - | Company phone number |
| company_address | text | - | - | Company address as text |
| tax_id | character varying(100) | - | - | Tax identifier |
| activated_at | timestamp | - | - | Account activation timestamp |
| credit_limit | numeric(19,4) | - | - | Credit limit amount |
| available_credit | numeric(19,4) | - | - | Available credit amount |

#### app_user
**Description:** Represents users within accounts

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| account_id | character varying(26) | FOREIGN KEY | - | Related account ID |
| first_name | character varying(100) | NOT NULL | - | User's first name |
| last_name | character varying(100) | NOT NULL | - | User's last name |
| email | character varying(255) | UNIQUE | - | User's email address |
| phone | character varying(50) | - | - | User's phone number |
| role | character varying(50) | - | 'USER' | User's role |
| status | character varying(20) | CHECK | 'ACTIVE' | User status (ACTIVE, SUSPENDED) |
| email_verified | boolean | - | false | Whether email is verified |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### permissions
**Description:** RBAC permissions table

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| permission_name | character varying(100) | UNIQUE | - | Name of the permission |
| description | character varying(255) | - | - | Description of the permission |
| is_active | boolean | - | true | Whether the permission is active |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### roles
**Description:** RBAC roles table

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| role_name | character varying(100) | UNIQUE | - | Name of the role |
| description | character varying(255) | - | - | Description of the role |
| is_active | boolean | - | true | Whether the role is active |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### user_roles
**Description:** Junction table for user-role relationships

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| user_id | character varying(26) | PRIMARY KEY, FOREIGN KEY | - | User ID |
| role_id | character varying(26) | PRIMARY KEY, FOREIGN KEY | - | Role ID |
| assigned_at | timestamp | - | CURRENT_TIMESTAMP | Assignment timestamp |
| assigned_by | character varying(26) | - | - | ID of user who assigned the role |

#### role_permissions
**Description:** Junction table for role-permission relationships

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| role_id | character varying(26) | PRIMARY KEY, FOREIGN KEY | - | Role ID |
| permission_id | character varying(26) | PRIMARY KEY, FOREIGN KEY | - | Permission ID |
| assigned_at | timestamp | - | CURRENT_TIMESTAMP | Assignment timestamp |
| assigned_by | character varying(26) | - | - | ID of user who assigned the permission |

### Catalog

#### vendor
**Description:** Represents vendors in the marketplace

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| name | character varying(255) | NOT NULL | - | Vendor business name |
| description | text | - | - | Vendor description |
| contact_person | character varying(255) | - | - | Contact person name |
| contact_email | character varying(255) | - | - | Contact email address |
| contact_phone | character varying(50) | - | - | Contact phone number |
| address | jsonb | - | - | Address as JSON object |
| tax_number | character varying(100) | - | - | Tax registration number |
| status | character varying(20) | CHECK | 'ACTIVE' | Vendor status (PENDING, ACTIVE, SUSPENDED, REJECTED) |
| approval_date | timestamp | - | - | Date of approval |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### product
**Description:** Represents products in the catalog

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| name | character varying(255) | NOT NULL | - | Product name |
| slug | character varying(255) | UNIQUE | - | URL-friendly slug |
| description | text | - | - | Detailed product description |
| short_description | character varying(500) | - | - | Brief product description |
| sku | character varying(100) | UNIQUE | - | Stock Keeping Unit |
| upc | character varying(50) | - | - | Universal Product Code |
| gtin | character varying(50) | - | - | Global Trade Item Number |
| mpn | character varying(100) | - | - | Manufacturer Part Number |
| brand | character varying(100) | - | - | Product brand |
| category_id | character varying(26) | - | - | Category ID |
| vendor_id | character varying(26) | FOREIGN KEY | - | Associated vendor ID |
| status | character varying(20) | CHECK | 'DRAFT' | Product status (DRAFT, PUBLISHED, UNPUBLISHED, SUSPENDED) |
| currency | character varying(3) | - | 'USD' | Currency code |
| base_price | numeric(19,4) | - | - | Base price of the product |
| tax_class | character varying(50) | - | - | Tax classification |
| meta_title | character varying(255) | - | - | SEO meta title |
| meta_description | character varying(500) | - | - | SEO meta description |
| meta_keywords | text | - | - | SEO meta keywords |
| weight | numeric(10,3) | - | - | Product weight |
| dimensions | jsonb | - | - | Product dimensions |
| packaging_info | jsonb | - | - | Packaging information |
| min_order_qty | integer | - | 1 | Minimum order quantity |
| moq | integer | - | - | Minimum Order Quantity |
| inventory_tracking | boolean | - | false | Whether inventory is tracked |
| inventory_qty | integer | - | 0 | Current inventory quantity |
| inventory_status | character varying(20) | CHECK | 'IN_STOCK' | Inventory status |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### product_attribute
**Description:** Defines attributes that products can have

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| name | character varying(255) | NOT NULL | - | Attribute name |
| display_name | character varying(255) | NOT NULL | - | Display name for UI |
| attribute_type | character varying(50) | CHECK | - | Type of attribute (TEXT, NUMBER, BOOLEAN, DATE, SELECT) |
| is_required | boolean | - | false | Whether attribute is required |
| is_searchable | boolean | - | false | Whether attribute is searchable |
| is_filterable | boolean | - | false | Whether attribute is filterable |
| validation_rules | jsonb | - | - | Validation rules as JSON |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### product_attribute_value
**Description:** Stores attribute values for specific products

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| product_id | character varying(26) | FOREIGN KEY | - | Associated product ID |
| attribute_id | character varying(26) | FOREIGN KEY | - | Associated attribute ID |
| value_text | text | - | - | Text value |
| value_number | numeric(19,4) | - | - | Numeric value |
| value_boolean | boolean | - | - | Boolean value |
| value_date | timestamp | - | - | Date value |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### media_asset
**Description:** Stores media assets (images, videos, documents)

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| name | character varying(255) | NOT NULL | - | Asset name |
| filename | character varying(255) | NOT NULL | - | Original filename |
| file_path | character varying(1000) | NOT NULL | - | Path to file |
| mime_type | character varying(100) | - | - | MIME type |
| file_size | bigint | - | - | File size in bytes |
| alt_text | character varying(255) | - | - | Alternative text |
| title | character varying(255) | - | - | Title |
| caption | text | - | - | Caption |
| tags | text | - | - | Tags |
| media_type | character varying(20) | CHECK | - | Type (IMAGE, VIDEO, DOCUMENT, OTHER) |
| status | character varying(20) | CHECK | 'ACTIVE' | Media status (ACTIVE, INACTIVE, DELETED) |
| is_primary | boolean | - | false | Whether this is the primary media |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### product_media
**Description:** Junction table for product-media relationships

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| product_id | character varying(26) | FOREIGN KEY | - | Associated product ID |
| media_asset_id | character varying(26) | FOREIGN KEY | - | Associated media asset ID |
| sort_order | integer | - | 0 | Sort order |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |

### RFQ/Quotes

#### rfq
**Description:** Request for Quotation

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| account_id | character varying(26) | FOREIGN KEY | - | Requester account ID |
| title | character varying(255) | NOT NULL | - | RFQ title |
| description | text | - | - | RFQ description |
| status | character varying(20) | CHECK | 'DRAFT' | RFQ status (DRAFT, OPEN, CLOSED, EXPIRED) |
| expiry_date | timestamp | - | - | RFQ expiry date |
| currency | character varying(3) | - | 'USD' | Currency |
| is_public | boolean | - | false | Whether RFQ is public |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |
| contact_person | character varying(255) | NOT NULL | - | Contact person |
| contact_email | character varying(255) | NOT NULL | - | Contact email |
| tax_included | boolean | - | false | Whether tax is included |
| created_by | character varying(255) | NOT NULL | - | Creator identifier |

#### rfq_line
**Description:** Individual line items in an RFQ

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| rfq_id | character varying(26) | FOREIGN KEY | - | Associated RFQ ID |
| product_id | character varying(26) | FOREIGN KEY | - | Associated product ID |
| product_name | character varying(255) | NOT NULL | - | Product name |
| description | text | - | - | Line description |
| quantity | integer | NOT NULL | - | Requested quantity |
| unit_of_measure | character varying(20) | - | 'EA' | Unit of measure |
| required_by | timestamp | - | - | Required by date |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |
| product_specifications | text | - | - | Product specifications |
| brand_preference | character varying(255) | - | - | Brand preference |
| quality_requirements | text | - | - | Quality requirements |

#### quote
**Description:** Vendor's response to an RFQ

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| rfq_id | character varying(26) | FOREIGN KEY | - | Associated RFQ ID |
| vendor_id | character varying(26) | FOREIGN KEY | - | Vendor ID |
| title | character varying(255) | NOT NULL | - | Quote title |
| description | text | - | - | Quote description |
| status | character varying(20) | CHECK | 'DRAFT' | Quote status (DRAFT, SUBMITTED, ACCEPTED, REJECTED, EXPIRED) |
| total_amount | numeric(19,4) | - | - | Total quoted amount |
| currency | character varying(3) | - | 'USD' | Currency |
| validity_days | integer | - | 30 | Validity period in days |
| expiry_date | timestamp | - | - | Expiry date |
| accepted_at | timestamp | - | - | When accepted |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |
| quoted_by | character varying(255) | NOT NULL | - | Person who created quote |
| quote_number | character varying(255) | UNIQUE | - | Unique quote number |
| valid_until | timestamp | NOT NULL | - | Valid until date |
| freight_included | boolean | - | false | Whether freight is included |
| tax_included | boolean | - | false | Whether tax is included |

#### quote_line
**Description:** Individual line items in a quote

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| quote_id | character varying(26) | FOREIGN KEY | - | Associated quote ID |
| rfq_line_id | character varying(26) | FOREIGN KEY | - | Associated RFQ line ID |
| product_id | character varying(26) | FOREIGN KEY | - | Associated product ID |
| product_name | character varying(255) | NOT NULL | - | Product name |
| description | text | - | - | Line description |
| unit_price | numeric(19,4) | NOT NULL | - | Unit price |
| quantity | integer | NOT NULL | - | Quoted quantity |
| total_price | numeric(19,4) | - | (unit_price * quantity) | Total price |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |
| line_total | numeric(19,4) | NOT NULL | - | Line total amount |
| moq | integer | - | 1 | Minimum order quantity |

### Orders & Payments

#### order_table
**Description:** Order information

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| account_id | character varying(26) | FOREIGN KEY | - | Associated account ID |
| quote_id | character varying(26) | FOREIGN KEY | - | Associated quote ID |
| po_number | character varying(100) | - | - | Purchase Order number |
| status | character varying(30) | CHECK | 'PENDING' | Order status |
| currency | character varying(3) | - | 'USD' | Currency |
| subtotal | numeric(19,4) | - | - | Subtotal amount |
| tax_amount | numeric(19,4) | - | - | Tax amount |
| shipping_amount | numeric(19,4) | - | - | Shipping amount |
| discount_amount | numeric(19,4) | - | - | Discount amount |
| total_amount | numeric(19,4) | - | - | Total amount |
| billing_address | jsonb | - | - | Billing address |
| shipping_address | jsonb | - | - | Shipping address |
| notes | text | - | - | Order notes |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### order_line
**Description:** Individual line items in an order

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| order_id | character varying(26) | FOREIGN KEY | - | Associated order ID |
| product_id | character varying(26) | FOREIGN KEY | - | Associated product ID |
| product_name | character varying(255) | NOT NULL | - | Product name |
| description | text | - | - | Line description |
| unit_price | numeric(19,4) | NOT NULL | - | Unit price |
| quantity | integer | NOT NULL | - | Ordered quantity |
| total_price | numeric(19,4) | - | (unit_price * quantity) | Total price |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### payment
**Description:** Payment information for orders

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| order_id | character varying(26) | FOREIGN KEY | - | Associated order ID |
| payment_method | character varying(50) | NOT NULL | - | Payment method |
| amount | numeric(19,4) | NOT NULL | - | Payment amount |
| currency | character varying(3) | - | 'USD' | Currency |
| status | character varying(20) | CHECK | 'PENDING' | Payment status |
| transaction_id | character varying(255) | - | - | Transaction ID from provider |
| provider | character varying(50) | - | - | Payment provider |
| provider_response | jsonb | - | - | Provider response as JSON |
| captured_at | timestamp | - | - | When payment was captured |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

### Invoicing

#### tax_reg
**Description:** Tax registration information

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| legal_name | character varying(255) | NOT NULL | - | Legal business name |
| tax_number | character varying(100) | NOT NULL | - | Tax registration number |
| address | jsonb | NOT NULL | - | Business address as JSON |
| is_active | boolean | - | true | Whether tax registration is active |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### invoice
**Description:** Invoices generated from orders

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| tax_reg_id | character varying(26) | FOREIGN KEY | - | Associated tax registration ID |
| sequence_number | integer | NOT NULL | - | Sequential number for the tax reg |
| full_number | character varying(100) | UNIQUE | - | Full invoice number |
| order_id | character varying(26) | FOREIGN KEY | - | Associated order ID |
| issued_date | date | - | CURRENT_DATE | Invoice issued date |
| due_date | date | NOT NULL | - | Invoice due date |
| currency | character varying(3) | - | 'USD' | Currency |
| subtotal | numeric(19,4) | - | - | Invoice subtotal |
| discount_amount | numeric(19,4) | - | - | Discount amount |
| vat_amount | numeric(19,4) | - | - | VAT amount |
| total_amount | numeric(19,4) | - | - | Total amount |
| status | character varying(20) | CHECK | 'DRAFT' | Invoice status |
| customer_name | character varying(255) | NOT NULL | - | Customer name |
| customer_tax_number | character varying(100) | - | - | Customer tax number |
| customer_address | jsonb | - | - | Customer address as JSON |
| notes | text | - | - | Invoice notes |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### invoice_line
**Description:** Individual line items in an invoice

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| invoice_id | character varying(26) | FOREIGN KEY | - | Associated invoice ID |
| order_line_id | character varying(26) | FOREIGN KEY | - | Associated order line ID |
| product_name | character varying(255) | NOT NULL | - | Product name |
| description | text | - | - | Line description |
| unit_price | numeric(19,4) | NOT NULL | - | Unit price |
| quantity | integer | NOT NULL | - | Invoice quantity |
| vat_rate | numeric(5,2) | NOT NULL | - | VAT rate percentage |
| vat_amount | numeric(19,4) | - | ((unit_price * quantity) * vat_rate / 100) | VAT amount |
| total_amount | numeric(19,4) | - | (unit_price * quantity + vat_amount) | Total including VAT |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### credit_note
**Description:** Credit notes for invoice adjustments

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| tax_reg_id | character varying(26) | FOREIGN KEY | - | Associated tax registration ID |
| sequence_number | integer | NOT NULL | - | Sequential number for the tax reg |
| full_number | character varying(100) | UNIQUE | - | Full credit note number |
| invoice_id | character varying(26) | FOREIGN KEY | - | Associated invoice ID |
| issued_date | date | - | CURRENT_DATE | Credit note issued date |
| reason | character varying(50) | CHECK | - | Reason for credit note |
| reason_details | text | - | - | Additional details about reason |
| currency | character varying(3) | - | 'USD' | Currency |
| subtotal | numeric(19,4) | - | - | Credit note subtotal |
| vat_amount | numeric(19,4) | - | - | VAT amount |
| total_amount | numeric(19,4) | - | - | Total amount |
| status | character varying(20) | CHECK | 'DRAFT' | Credit note status |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### credit_note_line
**Description:** Individual line items in a credit note

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| credit_note_id | character varying(26) | FOREIGN KEY | - | Associated credit note ID |
| invoice_line_id | character varying(26) | FOREIGN KEY | - | Associated invoice line ID |
| quantity | integer | NOT NULL | - | Credited quantity |
| unit_price | numeric(19,4) | NOT NULL | - | Unit price |
| vat_rate | numeric(5,2) | NOT NULL | - | VAT rate percentage |
| vat_amount | numeric(19,4) | - | ((unit_price * quantity) * vat_rate / 100) | VAT amount |
| total_amount | numeric(19,4) | - | (unit_price * quantity + vat_amount) | Total including VAT |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### sequence_registry
**Description:** Invoice and credit note sequence registry

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| tax_reg_id | character varying(26) | FOREIGN KEY | - | Associated tax registration ID |
| sequence_type | character varying(20) | CHECK | - | Type of sequence (INVOICE or CREDIT_NOTE) |
| prefix | character varying(20) | NOT NULL | - | Prefix for sequence |
| current_value | integer | - | 0 | Current sequence value |
| next_value | integer | - | 1 | Next sequence value |
| year | integer | NOT NULL | - | Year of sequence |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

### Wallet & Credit

#### credit_limit
**Description:** Credit limits for accounts

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| account_id | character varying(26) | FOREIGN KEY | - | Associated account ID |
| currency | character varying(3) | - | 'USD' | Currency |
| limit_amount | numeric(19,4) | NOT NULL | - | Maximum credit limit |
| available_amount | numeric(19,4) | NOT NULL | - | Available credit |
| used_amount | numeric(19,4) | - | 0.00 | Amount of credit used |
| status | character varying(20) | CHECK | 'ACTIVE' | Credit limit status |
| approved_date | date | - | - | Date credit limit was approved |
| approved_by | character varying(26) | - | - | User who approved |
| notes | text | - | - | Approval notes |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### wallet
**Description:** Wallet accounts for payments

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| account_id | character varying(26) | FOREIGN KEY | - | Associated account ID |
| name | character varying(255) | NOT NULL | - | Wallet name |
| balance | numeric(19,4) | - | 0.00 | Current balance |
| currency | character varying(3) | - | 'USD' | Currency |
| status | character varying(20) | CHECK | 'ACTIVE' | Wallet status |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### wallet_txn
**Description:** Wallet transaction records

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| wallet_id | character varying(26) | FOREIGN KEY | - | Associated wallet ID |
| transaction_type | character varying(20) | CHECK | - | Type (CREDIT or DEBIT) |
| amount | numeric(19,4) | NOT NULL | - | Transaction amount |
| reference_type | character varying(50) | NOT NULL | - | What the transaction references |
| reference_id | character varying(26) | - | - | ID of the referenced entity |
| description | text | - | - | Transaction description |
| balance_after | numeric(19,4) | - | - | Balance after transaction |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |

### Loyalty

#### loyalty_program
**Description:** Loyalty programs

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| name | character varying(255) | NOT NULL | - | Program name |
| description | text | - | - | Program description |
| start_date | date | NOT NULL | - | Program start date |
| end_date | date | - | - | Program end date |
| status | character varying(20) | CHECK | 'ACTIVE' | Program status |
| point_ratio | numeric(5,2) | - | 1.00 | Points earned per currency unit |
| max_points_per_transaction | numeric(10,2) | - | - | Max points per transaction |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### tier
**Description:** Loyalty program tiers

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| loyalty_program_id | character varying(26) | FOREIGN KEY | - | Associated program ID |
| name | character varying(255) | NOT NULL | - | Tier name |
| description | text | - | - | Tier description |
| min_points_required | integer | - | 0 | Minimum points to reach tier |
| discount_percentage | numeric(5,2) | - | 0.00 | Discount percentage for tier |
| priority_support | boolean | - | false | Whether tier gets priority support |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### account_tier
**Description:** Account membership in loyalty tiers

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| account_id | character varying(26) | FOREIGN KEY | - | Associated account ID |
| tier_id | character varying(26) | FOREIGN KEY | - | Associated tier ID |
| start_date | date | - | CURRENT_DATE | Tier membership start date |
| end_date | date | - | - | Tier membership end date |
| status | character varying(20) | CHECK | 'ACTIVE' | Membership status |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

#### loyalty_txn
**Description:** Loyalty point transactions

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| account_id | character varying(26) | FOREIGN KEY | - | Associated account ID |
| txn_type | character varying(20) | CHECK | - | Type (EARN, BURN, ADJUST) |
| points | numeric(10,2) | NOT NULL | - | Points amount |
| reference_type | character varying(50) | - | - | What the transaction references |
| reference_id | character varying(26) | - | - | ID of the referenced entity |
| balance_after | numeric(10,2) | - | - | Balance after transaction |
| description | text | - | - | Transaction description |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |

#### reward
**Description:** Rewards available in loyalty programs

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| loyalty_program_id | character varying(26) | FOREIGN KEY | - | Associated program ID |
| name | character varying(255) | NOT NULL | - | Reward name |
| description | text | - | - | Reward description |
| points_required | integer | NOT NULL | - | Points needed to redeem |
| redemption_limit | integer | - | - | Max redemptions allowed |
| remaining_redemptions | integer | - | - | Remaining redemptions |
| status | character varying(20) | CHECK | 'ACTIVE' | Reward status |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

### Operations/Audit

#### audit_log
**Description:** Audit trail of system actions

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| user_id | character varying(26) | - | - | ID of user who performed action |
| action | character varying(100) | NOT NULL | - | Type of action performed |
| resource_type | character varying(50) | NOT NULL | - | Type of resource acted upon |
| resource_id | character varying(26) | - | - | ID of resource acted upon |
| old_values | jsonb | - | - | Previous values as JSON |
| new_values | jsonb | - | - | New values as JSON |
| metadata | jsonb | - | - | Additional metadata as JSON |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| entity_id | character varying(255) | NOT NULL | - | ID of the entity being audited |
| entity_type | character varying(50) | NOT NULL | - | Type of the entity being audited |

### Shared Kernel

#### test_entity
**Description:** Test entity for Base functionality validation

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | character varying(26) | PRIMARY KEY | - | ULID identifier |
| name | character varying(255) | NOT NULL | - | Test entity name |
| description | text | - | - | Test entity description |
| created_at | timestamp | - | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | - | CURRENT_TIMESTAMP | Last update timestamp |

## Triggers

The schema includes triggers to automatically update `updated_at` columns:

- `update_account_updated_at`: For `account` table
- `update_app_user_updated_at`: For `app_user` table
- `update_credit_limit_updated_at`: For `credit_limit` table
- `update_invoice_updated_at`: For `invoice` table
- `update_loyalty_program_updated_at`: For `loyalty_program` table
- `update_media_asset_updated_at`: For `media_asset` table
- `update_order_updated_at`: For `order_table` table
- `update_product_updated_at`: For `product` table
- `update_product_attribute_updated_at`: For `product_attribute` table
- `update_product_attribute_value_updated_at`: For `product_attribute_value` table
- `update_quote_updated_at`: For `quote` table
- `update_rfq_updated_at`: For `rfq` table
- `update_tier_updated_at`: For `tier` table
- `update_vendor_updated_at`: For `vendor` table
- `update_wallet_updated_at`: For `wallet` table
- `update_test_entity_updated_at`: For `test_entity` table

## Indexes

Multiple indexes exist to improve query performance:

- **Product indexes**: On name, slug, SKU, status, vendor_id, category_id
- **RFQ indexes**: On account_id, status
- **Quote indexes**: On rfq_id, vendor_id
- **Order indexes**: On account_id, status
- **Invoice indexes**: On order_id, status
- **Payment indexes**: On order_id, status
- **Media asset indexes**: On status, media_type
- **Vendor indexes**: On status
- **User indexes**: On email, account_id
- **Permission indexes**: On permission_name, is_active
- **Role indexes**: On role_name, is_active

## Functions

- `update_updated_at_column()`: Function that updates the `updated_at` field with the current timestamp