# P4 Backend Features Re-Implementation Plan

## Project Overview
This document outlines the plan for re-implementing the P4 B2B marketplace backend features from scratch with tiny incremental tasks. Each task includes its own acceptance tests that can be run against the Azure deployment. The backend implementation will be located in the "./backend/" directory within the current repository.

## Technology Stack
- **Backend:** Java 21, Spring Boot 3
- **Database:** PostgreSQL 16 (Neon)
- **Cache:** Redis (Upstash)
- **Object Storage:** Backblaze B2
- **API:** REST/JSON with RFC7807 error responses
- **IDs:** ULID strings (sortable)
- **Security:** Spring Security with OAuth2/JWT
- **Documentation:** OpenAPI 3.0

## Environment Configuration
```
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
DB_USERNAME=neondb_owner
DB_PASSWORD=npg_QTE70VJgbcdp
REDIS_URL=redis://default:AUUnAAIncDI1ZWRkMmFkMDE2ZjA0MmYxYmEyNWVlYzM1Y2ExODMxNHAyMTc3MDM@adjusted-sunbird-17703.upstash.io:6379
B2_ACCOUNT_ID=43f8cd5d949d
B2_APPLICATION_KEY_ID=00543f8cd5d949d0000000001
B2_APPLICATION_KEY=K005iS73v7srQkqax39ZRy3ZJ/Yth+w
B2_BUCKET=64735f483c0da5ed9994091d
B2_ENDPOINT_URL=https://s3.us-east-005.backblazeb2.com

For all the tasks, we will test with production deployment on:
API_URL_BASE=https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net
```

## Feature Implementation Plan

### 1. Core Infrastructure & Configuration
**Task 1.1: Set up project structure and configuration**
- **Description:** Initialize Spring Boot project with all necessary dependencies
- **Acceptance Test:** Application starts successfully with minimal configuration
- **Acceptance Test Script:** N/A (infrastructure setup)
- **Dependencies:** None

**Task 1.2: Implement database configuration and Flyway migrations**
- **Description:** Set up PostgreSQL connection with connection pooling and Flyway for schema management
- **Acceptance Test:** Application connects to database and successfully runs baseline migration
- **Acceptance Test Script:** test_db_connection.py verifies database connectivity in Azure deployment
- **Dependencies:** Task 1.1

**Task 1.3: Implement ULID ID generator**
- **Description:** Create ULID generator service for all entities
- **Acceptance Test:** Service generates valid ULID strings that are sortable
- **Acceptance Test Script:** test_ulid_acceptance.py verifies ULID generation in Azure deployment
- **Dependencies:** Task 1.1

**Task 1.4: Implement configuration properties classes**
- **Description:** Create strongly-typed configuration classes for all services (B2, Redis, etc.)
- **Acceptance Test:** All configuration values are properly loaded and validated
- **Acceptance Test Script:** test_config_properties.py verifies configuration loading in Azure deployment
- **Dependencies:** Task 1.1

### 2. Common Components & Utilities
**Task 2.1: Implement Money value object**
- **Description:** Create Money class with currency and amount handling
- **Acceptance Test:** Money objects correctly handle arithmetic operations and currency conversions
- **Acceptance Test Script:** test_money_value_object.py verifies Money functionality in Azure deployment
- **Dependencies:** None

**Task 2.2: Implement TaxLine value object**
- **Description:** Create TaxLine class for tax calculations (jurisdiction, rate, base, amount)
- **Acceptance Test:** TaxLine correctly calculates tax amounts based on rate and base
- **Acceptance Test Script:** test_taxline_value_object.py verifies TaxLine calculations in Azure deployment
- **Dependencies:** Task 2.1

**Task 2.3: Implement API response wrapper**
- **Description:** Create standard response wrapper for API endpoints following RFC7807
- **Acceptance Test:** All API responses follow the RFC7807 standard format
- **Acceptance Test Script:** test_api_response_wrapper.py verifies RFC7807 compliance in Azure deployment
- **Dependencies:** None

**Task 2.4: Implement pagination with ULID cursor**
- **Description:** Create pagination utilities using ULID for keyset pagination
- **Acceptance Test:** Pagination works correctly with ULID-based cursor navigation
- **Acceptance Test Script:** test_ulid_pagination.py verifies pagination functionality in Azure deployment
- **Dependencies:** Task 1.3

### 3. Shared Kernel
**Task 3.1: Implement base entity and repository**
- **Description:** Create base entity with common fields (id, createdAt, updatedAt) and base repository
- **Acceptance Test:** All entities inherit from base entity with proper fields
- **Acceptance Test Script:** test_base_entity.py verifies base entity functionality in Azure deployment
- **Dependencies:** Task 1.3, Task 1.2

**Task 3.2: Implement audit trail functionality**
- **Description:** Create audit log functionality for tracking changes to entities
- **Acceptance Test:** All entity changes are properly logged with user context
- **Acceptance Test Script:** test_audit_trail.py verifies audit logging in Azure deployment
- **Dependencies:** Task 3.1, Task 1.2

**Task 3.3: Implement file upload utility with B2**
- **Description:** Create service for uploading files to Backblaze B2
- **Acceptance Test:** Files can be uploaded to B2 and retrieved with proper access controls
- **Acceptance Test Script:** test_file_upload.py verifies B2 integration in Azure deployment
- **Dependencies:** Task 1.4

### 4. Identity & Access Management
**Task 4.1: Implement Account entity and repository**
- **Description:** Create Account entity with individual/company types and status
- **Acceptance Test:** Can create, read, update, delete accounts with proper validation
- **Acceptance Test Script:** test_account_entity.py verifies account operations in Azure deployment
- **Dependencies:** Task 3.1, Task 1.2

**Task 4.2: Implement User entity and repository**
- **Description:** Create User entity linked to Account with authentication fields
- **Acceptance Test:** Users can be created with proper account associations
- **Acceptance Test Script:** test_user_entity.py verifies user operations in Azure deployment
- **Dependencies:** Task 4.1, Task 3.1

**Task 4.3: Implement JWT authentication**
- **Description:** Create JWT-based authentication with refresh tokens
- **Acceptance Test:** Users can authenticate and receive valid JWT tokens
- **Acceptance Test Script:** test_jwt_authentication.py verifies authentication flow in Azure deployment
- **Dependencies:** Task 4.2

**Task 4.4: Implement role-based access control (RBAC)**
- **Description:** Create role and permission system for access control
- **Acceptance Test:** Users with different roles have appropriate access levels
- **Acceptance Test Script:** test_rbac.py verifies access control in Azure deployment
- **Dependencies:** Task 4.2

### 5. Catalog & Search
**Task 5.1: Implement Vendor entity and repository**
- **Description:** Create Vendor entity with KYC fields and approval status
- **Acceptance Test:** Vendors can be created, approved, and managed
- **Acceptance Test Script:** test_vendor_entity.py verifies vendor operations in Azure deployment
- **Dependencies:** Task 3.1, Task 1.2

**Task 5.2: Implement Product entity and repository**
- **Description:** Create Product entity with attributes, inventory, and media
- **Acceptance Test:** Products can be created with all necessary fields and validation
- **Acceptance Test Script:** test_product_entity.py verifies product operations in Azure deployment
- **Dependencies:** Task 5.1, Task 3.1, Task 1.2

**Task 5.3: Implement Product Attribute entities**
- **Description:** Create ProductAttribute and ProductAttributeValue entities
- **Acceptance Test:** Products can have custom attributes with different types
- **Acceptance Test Script:** test_product_attributes.py verifies attribute functionality in Azure deployment
- **Dependencies:** Task 5.2

**Task 5.4: Implement Media Asset entities**
- **Description:** Create MediaAsset and ProductMedia entities for product images
- **Acceptance Test:** Media assets can be associated with products
- **Acceptance Test Script:** test_media_assets.py verifies media asset functionality in Azure deployment
- **Dependencies:** Task 5.2, Task 3.3

**Task 5.5: Implement catalog browsing API**
- **Description:** Create public API for browsing products with pagination
- **Acceptance Test:** Products can be browsed with search, filtering, and pagination
- **Acceptance Test Script:** test_catalog_browsing.py verifies browsing functionality in Azure deployment
- **Dependencies:** Task 5.2, Task 5.3, Task 5.4, Task 2.4

**Task 5.6: Implement full-text search**
- **Description:** Implement PostgreSQL full-text search for products
- **Acceptance Test:** Search returns relevant products based on name, description, and attributes
- **Acceptance Test Script:** test_fulltext_search.py verifies search functionality in Azure deployment
- **Dependencies:** Task 5.5

### 6. RFQ & Quotes
**Task 6.1: Implement RFQ entity and repository**
- **Description:** Create RFQ entity with related fields and status tracking
- **Acceptance Test:** RFQs can be created, updated, and managed
- **Acceptance Test Script:** test_rfq_entity.py verifies RFQ operations in Azure deployment
- **Dependencies:** Task 4.1, Task 3.1, Task 1.2

**Task 6.2: Implement RFQ Line entity and repository**
- **Description:** Create RFQ Line entity for product requirements
- **Acceptance Test:** RFQs can have multiple line items with quantities and requirements
- **Acceptance Test Script:** test_rfq_line_entity.py verifies RFQ line operations in Azure deployment
- **Dependencies:** Task 6.1, Task 5.2

**Task 6.3: Implement Quote entity and repository**
- **Description:** Create Quote entity with relationship to RFQ and vendor
- **Acceptance Test:** Quotes can be submitted for RFQs by vendors
- **Acceptance Test Script:** test_quote_entity.py verifies quote operations in Azure deployment
- **Dependencies:** Task 6.1, Task 5.1, Task 3.1

**Task 6.4: Implement Quote Line entity and repository**
- **Description:** Create Quote Line entity for quoted items
- **Acceptance Test:** Quotes can have multiple line items with pricing
- **Acceptance Test Script:** test_quote_line_entity.py verifies quote line operations in Azure deployment
- **Dependencies:** Task 6.3, Task 6.2

**Task 6.5: Implement RFQ creation API**
- **Description:** Create API for buyers to submit new RFQs
- **Acceptance Test:** Buyers can create RFQs with proper validation and business rules
- **Acceptance Test Script:** test_rfq_api.py verifies RFQ creation API in Azure deployment
- **Dependencies:** Task 6.1, Task 6.2

**Task 6.6: Implement Quote submission API**
- **Description:** Create API for vendors to submit quotes for RFQs
- **Acceptance Test:** Vendors can submit quotes for RFQs they're invited to
- **Acceptance Test Script:** test_quote_submission_api.py verifies quote submission in Azure deployment
- **Dependencies:** Task 6.3, Task 6.4, Task 6.5

**Task 6.7: Implement quote comparison functionality**
- **Description:** Create functionality to compare multiple quotes for the same RFQ
- **Acceptance Test:** Buyers can view and compare multiple quotes for an RFQ
- **Acceptance Test Script:** test_quote_comparison.py verifies comparison functionality in Azure deployment
- **Dependencies:** Task 6.6

### 7. Orders
**Task 7.1: Implement Order entity and repository**
- **Description:** Create Order entity with status tracking and line items
- **Acceptance Test:** Orders can be created and tracked through the lifecycle
- **Acceptance Test Script:** test_order_entity.py verifies order operations in Azure deployment
- **Dependencies:** Task 4.1, Task 3.1, Task 1.2

**Task 7.2: Implement Order Line entity and repository**
- **Description:** Create Order Line entity for order items
- **Acceptance Test:** Orders can have multiple line items with pricing
- **Acceptance Test Script:** test_order_line_entity.py verifies order line operations in Azure deployment
- **Dependencies:** Task 7.1, Task 5.2

**Task 7.3: Implement order creation from accepted quotes**
- **Description:** Create functionality to convert accepted quotes to purchase orders
- **Acceptance Test:** Accepted quotes can be converted to formal purchase orders
- **Acceptance Test Script:** test_order_creation.py verifies quote-to-order conversion in Azure deployment
- **Dependencies:** Task 6.7, Task 7.1, Task 7.2

**Task 7.4: Implement order management API**
- **Description:** Create API for managing orders through the lifecycle
- **Acceptance Test:** Orders can be viewed, updated, and tracked with appropriate permissions
- **Acceptance Test Script:** test_order_management_api.py verifies order management in Azure deployment
- **Dependencies:** Task 7.3

### 8. Payments
**Task 8.1: Implement Payment entity and repository**
- **Description:** Create Payment entity for tracking payment transactions
- **Acceptance Test:** Payments can be recorded with proper status tracking
- **Acceptance Test Script:** test_payment_entity.py verifies payment operations in Azure deployment
- **Dependencies:** Task 7.1, Task 3.1, Task 1.2

**Task 8.2: Implement payment gateway service**
- **Description:** Create abstract payment gateway service with concrete implementations
- **Acceptance Test:** Payment gateway can process transactions (sandbox mode)
- **Acceptance Test Script:** test_payment_gateway.py verifies payment processing in Azure deployment
- **Dependencies:** Task 8.1

**Task 8.3: Implement idempotency keys**
- **Description:** Add idempotency support for payment and order endpoints
- **Acceptance Test:** Duplicate requests with same idempotency key return same result
- **Acceptance Test Script:** test_idempotency_keys.py verifies idempotency in Azure deployment
- **Dependencies:** Task 8.2

### 9. Wallet & Credit Controls
**Task 9.1: Implement Wallet entity and repository**
- **Description:** Create Wallet entity for corporate credit accounts
- **Acceptance Test:** Wallets can be created and managed for accounts
- **Acceptance Test Script:** test_wallet_entity.py verifies wallet operations in Azure deployment
- **Dependencies:** Task 4.1, Task 3.1, Task 1.2

**Task 9.2: Implement Wallet Transaction entity and repository**
- **Description:** Create WalletTransaction for tracking wallet movements
- **Acceptance Test:** Wallet transactions are properly recorded and balance is calculated
- **Acceptance Test Script:** test_wallet_transaction.py verifies transaction operations in Azure deployment
- **Dependencies:** Task 9.1

**Task 9.3: Implement Credit Limit entity and repository**
- **Description:** Create CreditLimit entity for managing credit controls
- **Acceptance Test:** Credit limits can be set and enforced for accounts
- **Acceptance Test Script:** test_credit_limit.py verifies credit controls in Azure deployment
- **Dependencies:** Task 4.1, Task 3.1

### 10. Invoicing & VAT
**Task 10.1: Implement Tax Registration entity and repository**
- **Description:** Create TaxReg entity for managing tax obligations
- **Acceptance Test:** Tax registrations can be configured for proper tax compliance
- **Acceptance Test Script:** test_tax_registration.py verifies tax registration in Azure deployment
- **Dependencies:** Task 3.1, Task 1.2

**Task 10.2: Implement Sequence Registry entity and repository**
- **Description:** Create SequenceRegistry for managing invoice numbering
- **Acceptance Test:** Sequential invoice numbers are properly generated per tax jurisdiction
- **Acceptance Test Script:** test_sequence_registry.py verifies sequence generation in Azure deployment
- **Dependencies:** Task 10.1

**Task 10.3: Implement Invoice entity and repository**
- **Description:** Create Invoice entity with VAT calculations
- **Acceptance Test:** Invoices can be created with proper tax calculations
- **Acceptance Test Script:** test_invoice_entity.py verifies invoice operations in Azure deployment
- **Dependencies:** Task 10.1, Task 10.2, Task 7.1, Task 7.2

**Task 10.4: Implement Invoice Line entity and repository**
- **Description:** Create InvoiceLine entity for invoice items
- **Acceptance Test:** Invoices can have multiple line items with tax breakdowns
- **Acceptance Test Script:** test_invoice_line.py verifies invoice line operations in Azure deployment
- **Dependencies:** Task 10.3, Task 7.2

**Task 10.5: Implement VAT calculation engine**
- **Description:** Create service for calculating VAT based on tax rules
- **Acceptance Test:** VAT is correctly calculated for different rates and jurisdictions
- **Acceptance Test Script:** test_vat_calculation.py verifies VAT calculations in Azure deployment
- **Dependencies:** Task 10.3

**Task 10.6: Implement invoice PDF generation**
- **Description:** Create service for generating invoice PDFs
- **Acceptance Test:** Invoice PDFs are correctly generated and stored in B2
- **Acceptance Test Script:** test_invoice_pdf_generation.py verifies PDF generation in Azure deployment
- **Dependencies:** Task 10.3, Task 3.3

### 11. Loyalty Program
**Task 11.1: Implement Loyalty Program entity and repository**
- **Description:** Create LoyaltyProgram for managing loyalty rules
- **Acceptance Test:** Loyalty programs can be configured with earning rules
- **Acceptance Test Script:** test_loyalty_program.py verifies loyalty program operations in Azure deployment
- **Dependencies:** Task 3.1, Task 1.2

**Task 11.2: Implement Tier entity and repository**
- **Description:** Create Tier entity for loyalty tier management
- **Acceptance Test:** Tiers can be configured with requirements and benefits
- **Acceptance Test Script:** test_tier_entity.py verifies tier operations in Azure deployment
- **Dependencies:** Task 11.1

**Task 11.3: Implement Reward entity and repository**
- **Description:** Create Reward entity for loyalty rewards
- **Acceptance Test:** Rewards can be configured for point redemption
- **Acceptance Test Script:** test_reward_entity.py verifies reward operations in Azure deployment
- **Dependencies:** Task 11.1

**Task 11.4: Implement Loyalty Transaction entity and repository**
- **Description:** Create LoyaltyTxn for tracking loyalty point movements
- **Acceptance Test:** Loyalty transactions properly track point balances
- **Acceptance Test Script:** test_loyalty_transaction.py verifies loyalty transactions in Azure deployment
- **Dependencies:** Task 4.1, Task 11.1

**Task 11.5: Implement loyalty earning engine**
- **Description:** Create service for calculating and awarding loyalty points
- **Acceptance Test:** Points are properly earned based on transaction amounts
- **Acceptance Test Script:** test_loyalty_earning.py verifies point earning in Azure deployment
- **Dependencies:** Task 11.4

**Task 11.6: Implement loyalty redemption**
- **Description:** Create functionality for redeeming loyalty points
- **Acceptance Test:** Points can be redeemed for rewards at checkout
- **Acceptance Test Script:** test_loyalty_redemption.py verifies point redemption in Azure deployment
- **Dependencies:** Task 11.5, Task 11.3

### 12. Feature Flags & Configuration
**Task 12.1: Implement feature flag system**
- **Description:** Create feature flag system with database storage
- **Acceptance Test:** Features can be toggled on/off via flags
- **Acceptance Test Script:** test_feature_flags_system.py verifies feature flag operations in Azure deployment
- **Dependencies:** Task 1.2

**Task 12.2: Implement feature flag endpoints**
- **Description:** Create API endpoints for managing feature flags
- **Acceptance Test:** Admins can update feature flags via API
- **Acceptance Test Script:** test_feature_flag_endpoints.py verifies flag management in Azure deployment
- **Dependencies:** Task 12.1

### 13. Observability & Monitoring
**Task 13.1: Implement structured logging**
- **Description:** Set up structured JSON logging with correlation IDs
- **Acceptance Test:** Logs are properly formatted with request correlation IDs
- **Acceptance Test Script:** test_structured_logging.py verifies logging functionality in Azure deployment
- **Dependencies:** Task 1.1

**Task 13.2: Implement metrics collection**
- **Description:** Set up Micrometer metrics with Prometheus endpoint
- **Acceptance Test:** Application metrics are available at /actuator/metrics
- **Acceptance Test Script:** test_metrics_collection.py verifies metrics in Azure deployment
- **Dependencies:** Task 1.1

**Task 13.3: Implement health checks**
- **Description:** Create health checks for all major components
- **Acceptance Test:** Health endpoints return proper status for all dependencies
- **Acceptance Test Script:** test_health_checks.py verifies health check functionality in Azure deployment
- **Dependencies:** Task 1.1

### 14. Operations & Security
**Task 14.1: Implement rate limiting**
- **Description:** Create rate limiting for API endpoints using Redis
- **Acceptance Test:** API endpoints are properly rate-limited
- **Acceptance Test Script:** test_rate_limiting.py verifies rate limiting in Azure deployment
- **Dependencies:** Task 1.1, Task 1.4

**Task 14.2: Implement security headers**
- **Description:** Add security headers to all responses
- **Acceptance Test:** Responses include proper security headers (HSTS, CSP, etc.)
- **Acceptance Test Script:** test_security_headers.py verifies security headers in Azure deployment
- **Dependencies:** Task 1.1

**Task 14.3: Implement data seeding**
- **Description:** Create data seeding functionality for development
- **Acceptance Test:** Sample data can be seeded for development and testing
- **Acceptance Test Script:** test_data_seeding.py verifies seeding functionality in Azure deployment
- **Dependencies:** All above tasks

## Database Schema
For complete documentation of the database schema that supports all tasks in this plan, see [Database Schema Documentation](../../docs/database_schema_complete.md).

## Quality Assurance & Testing

### Unit Tests
- Achieve 80%+ code coverage for all services
- Test all business logic with edge cases
- Test all validation and error handling

### Integration Tests
- Test all repository methods with real database
- Test API endpoints with complete request/response cycle
- Test external service integrations with test doubles

### End-to-End Tests
- Test complete user workflows from UI to database
- Test feature flag functionality
- Test performance requirements (search p95 < 500ms, checkout median < 2s)

### Production Acceptance Tests
- Each task must have acceptance tests that can be run against the Azure deployment
- Tests should be implemented as executable scripts that verify functionality in production
- All tests should be automated and integrated into the CI/CD pipeline
- Production tests must verify that features work as expected in the live environment

## Acceptance Criteria
- All features implemented with tiny incremental tasks
- Each task has its own acceptance tests that can run on Azure deployment
- All acceptance tests are provided as executable scripts
- All environment variables from production are properly configured
- All security and performance requirements are met
- Feature flags control each major functionality
- Proper logging and monitoring in place
- CI/CD pipeline integrated with Azure and Cloudflare

## Acceptance Test Scripts
For each task in this plan, acceptance tests will be provided as executable scripts that can be run against the Azure deployment. These scripts will:
- Verify the functionality works correctly in the production environment
- Validate that the feature meets its acceptance criteria
- Check integration with other components of the system
- Generate reports on the test results
- Be designed for integration into the CI/CD pipeline