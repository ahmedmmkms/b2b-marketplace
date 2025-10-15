# Neon Live Schema Snapshot

Generated from `information_schema.columns`.

## account
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
name | character varying | NO | 
type | character varying | NO | 'INDIVIDUAL'::character varying
legal_name | character varying | YES | 
tax_number | character varying | YES | 
status | character varying | YES | 'ACTIVE'::character varying
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
company_email | character varying | NO | 
company_phone | character varying | YES | 
company_address | text | YES | 
tax_id | character varying | YES | 
activated_at | timestamp without time zone | YES | 
credit_limit | numeric | YES | 
available_credit | numeric | YES | 

## account_tier
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
account_id | character varying | NO | 
tier_id | character varying | NO | 
start_date | date | NO | CURRENT_DATE
end_date | date | YES | 
status | character varying | YES | 'ACTIVE'::character varying
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## app_user
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
account_id | character varying | NO | 
first_name | character varying | NO | 
last_name | character varying | NO | 
email | character varying | NO | 
phone | character varying | YES | 
role | character varying | YES | 'USER'::character varying
status | character varying | YES | 'ACTIVE'::character varying
email_verified | boolean | YES | false
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## audit_log
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
user_id | character varying | YES | 
action | character varying | NO | 
resource_type | character varying | NO | 
resource_id | character varying | YES | 
old_values | jsonb | YES | 
new_values | jsonb | YES | 
metadata | jsonb | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
entity_id | character varying | NO | 
entity_type | character varying | NO | 

## credit_limit
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
account_id | character varying | NO | 
currency | character varying | YES | 'USD'::character varying
limit_amount | numeric | NO | 
available_amount | numeric | NO | 
used_amount | numeric | YES | 0.00
status | character varying | YES | 'ACTIVE'::character varying
approved_date | date | YES | 
approved_by | character varying | YES | 
notes | text | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## credit_note
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
tax_reg_id | character varying | NO | 
sequence_number | integer | NO | 
full_number | character varying | YES | 
invoice_id | character varying | NO | 
issued_date | date | NO | CURRENT_DATE
reason | character varying | NO | 
reason_details | text | YES | 
currency | character varying | YES | 'USD'::character varying
subtotal | numeric | YES | 
vat_amount | numeric | YES | 
total_amount | numeric | YES | 
status | character varying | YES | 'DRAFT'::character varying
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## credit_note_line
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
credit_note_id | character varying | NO | 
invoice_line_id | character varying | NO | 
quantity | integer | NO | 
unit_price | numeric | NO | 
vat_rate | numeric | NO | 
vat_amount | numeric | YES | 
total_amount | numeric | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## flyway_schema_history
Column | Type | Nullable | Default
--- | --- | --- | ---
installed_rank | integer | NO | 
version | character varying | YES | 
description | character varying | NO | 
type | character varying | NO | 
script | character varying | NO | 
checksum | integer | YES | 
installed_by | character varying | NO | 
installed_on | timestamp without time zone | NO | now()
execution_time | integer | NO | 
success | boolean | NO | 

## invoice
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
tax_reg_id | character varying | NO | 
sequence_number | integer | NO | 
full_number | character varying | YES | 
order_id | character varying | NO | 
issued_date | date | NO | CURRENT_DATE
due_date | date | NO | 
currency | character varying | YES | 'USD'::character varying
subtotal | numeric | YES | 
discount_amount | numeric | YES | 
vat_amount | numeric | YES | 
total_amount | numeric | YES | 
status | character varying | YES | 'DRAFT'::character varying
customer_name | character varying | NO | 
customer_tax_number | character varying | YES | 
customer_address | jsonb | YES | 
notes | text | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## invoice_line
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
invoice_id | character varying | NO | 
order_line_id | character varying | NO | 
product_name | character varying | NO | 
description | text | YES | 
unit_price | numeric | NO | 
quantity | integer | NO | 
vat_rate | numeric | NO | 
vat_amount | numeric | YES | 
total_amount | numeric | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## loyalty_program
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
name | character varying | NO | 
description | text | YES | 
start_date | date | NO | 
end_date | date | YES | 
status | character varying | YES | 'ACTIVE'::character varying
point_ratio | numeric | YES | 1.00
max_points_per_transaction | numeric | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## loyalty_txn
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
account_id | character varying | NO | 
txn_type | character varying | NO | 
points | numeric | NO | 
reference_type | character varying | YES | 
reference_id | character varying | YES | 
balance_after | numeric | YES | 
description | text | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## media_asset
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
name | character varying | NO | 
filename | character varying | NO | 
file_path | character varying | NO | 
mime_type | character varying | YES | 
file_size | bigint | YES | 
alt_text | character varying | YES | 
title | character varying | YES | 
caption | text | YES | 
tags | text | YES | 
media_type | character varying | NO | 
status | character varying | YES | 'ACTIVE'::character varying
is_primary | boolean | YES | false
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## order_line
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
order_id | character varying | NO | 
product_id | character varying | YES | 
product_name | character varying | NO | 
description | text | YES | 
unit_price | numeric | NO | 
quantity | integer | NO | 
total_price | numeric | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## order_table
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
account_id | character varying | NO | 
quote_id | character varying | YES | 
po_number | character varying | YES | 
status | character varying | YES | 'PENDING'::character varying
currency | character varying | YES | 'USD'::character varying
subtotal | numeric | YES | 
tax_amount | numeric | YES | 
shipping_amount | numeric | YES | 
discount_amount | numeric | YES | 
total_amount | numeric | YES | 
billing_address | jsonb | YES | 
shipping_address | jsonb | YES | 
notes | text | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## payment
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
order_id | character varying | NO | 
payment_method | character varying | NO | 
amount | numeric | NO | 
currency | character varying | YES | 'USD'::character varying
status | character varying | YES | 'PENDING'::character varying
transaction_id | character varying | YES | 
provider | character varying | YES | 
provider_response | jsonb | YES | 
captured_at | timestamp without time zone | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## product
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
name | character varying | NO | 
slug | character varying | YES | 
description | text | YES | 
short_description | character varying | YES | 
sku | character varying | YES | 
upc | character varying | YES | 
gtin | character varying | YES | 
mpn | character varying | YES | 
brand | character varying | YES | 
category_id | character varying | YES | 
vendor_id | character varying | NO | 
status | character varying | YES | 'DRAFT'::character varying
currency | character varying | YES | 'USD'::character varying
base_price | numeric | YES | 
tax_class | character varying | YES | 
meta_title | character varying | YES | 
meta_description | character varying | YES | 
meta_keywords | text | YES | 
weight | numeric | YES | 
dimensions | jsonb | YES | 
packaging_info | jsonb | YES | 
min_order_qty | integer | YES | 1
moq | integer | YES | 
inventory_tracking | boolean | YES | false
inventory_qty | integer | YES | 0
inventory_status | character varying | YES | 'IN_STOCK'::character varying
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## product_attribute
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
name | character varying | NO | 
display_name | character varying | NO | 
attribute_type | character varying | NO | 
is_required | boolean | YES | false
is_searchable | boolean | YES | false
is_filterable | boolean | YES | false
validation_rules | jsonb | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## product_attribute_value
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
product_id | character varying | NO | 
attribute_id | character varying | NO | 
value_text | text | YES | 
value_number | numeric | YES | 
value_boolean | boolean | YES | 
value_date | timestamp without time zone | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## product_media
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
product_id | character varying | NO | 
media_asset_id | character varying | NO | 
sort_order | integer | YES | 0
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## quote
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
rfq_id | character varying | NO | 
vendor_id | character varying | NO | 
title | character varying | NO | 
description | text | YES | 
status | character varying | YES | 'DRAFT'::character varying
total_amount | numeric | YES | 
currency | character varying | YES | 'USD'::character varying
validity_days | integer | YES | 30
expiry_date | timestamp without time zone | YES | 
accepted_at | timestamp without time zone | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
quoted_by | character varying | NO | 
quote_number | character varying | NO | 
valid_until | timestamp without time zone | NO | 
freight_included | boolean | NO | false
tax_included | boolean | NO | false

## quote_line
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
quote_id | character varying | NO | 
rfq_line_id | character varying | NO | 
product_id | character varying | YES | 
product_name | character varying | NO | 
description | text | YES | 
unit_price | numeric | NO | 
quantity | integer | NO | 
total_price | numeric | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
line_total | numeric | NO | 
moq | integer | NO | 1

## reward
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
loyalty_program_id | character varying | NO | 
name | character varying | NO | 
description | text | YES | 
points_required | integer | NO | 
redemption_limit | integer | YES | 
remaining_redemptions | integer | YES | 
status | character varying | YES | 'ACTIVE'::character varying
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## rfq
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
account_id | character varying | NO | 
title | character varying | NO | 
description | text | YES | 
status | character varying | YES | 'DRAFT'::character varying
expiry_date | timestamp without time zone | YES | 
currency | character varying | YES | 'USD'::character varying
is_public | boolean | YES | false
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
contact_person | character varying | NO | 
contact_email | character varying | NO | 
tax_included | boolean | NO | false
created_by | character varying | NO | 

## rfq_line
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
rfq_id | character varying | NO | 
product_id | character varying | YES | 
product_name | character varying | NO | 
description | text | YES | 
quantity | integer | NO | 
unit_of_measure | character varying | YES | 'EA'::character varying
required_by | timestamp without time zone | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
product_specifications | text | YES | 
brand_preference | character varying | YES | 
quality_requirements | text | YES | 

## sequence_registry
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
tax_reg_id | character varying | NO | 
sequence_type | character varying | NO | 
prefix | character varying | NO | 
current_value | integer | NO | 0
next_value | integer | NO | 1
year | integer | NO | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## tax_reg
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
legal_name | character varying | NO | 
tax_number | character varying | NO | 
address | jsonb | NO | 
is_active | boolean | YES | true
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## tier
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
loyalty_program_id | character varying | NO | 
name | character varying | NO | 
description | text | YES | 
min_points_required | integer | YES | 0
discount_percentage | numeric | YES | 0.00
priority_support | boolean | YES | false
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## vendor
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
name | character varying | NO | 
description | text | YES | 
contact_person | character varying | YES | 
contact_email | character varying | YES | 
contact_phone | character varying | YES | 
address | jsonb | YES | 
tax_number | character varying | YES | 
status | character varying | YES | 'ACTIVE'::character varying
approval_date | timestamp without time zone | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## wallet
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
account_id | character varying | NO | 
name | character varying | NO | 
balance | numeric | YES | 0.00
currency | character varying | YES | 'USD'::character varying
status | character varying | YES | 'ACTIVE'::character varying
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
updated_at | timestamp without time zone | YES | CURRENT_TIMESTAMP

## wallet_txn
Column | Type | Nullable | Default
--- | --- | --- | ---
id | character varying | NO | 
wallet_id | character varying | NO | 
transaction_type | character varying | NO | 
amount | numeric | NO | 
reference_type | character varying | NO | 
reference_id | character varying | YES | 
description | text | YES | 
balance_after | numeric | YES | 
created_at | timestamp without time zone | YES | CURRENT_TIMESTAMP
