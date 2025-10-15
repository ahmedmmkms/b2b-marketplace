# P4 Backend Features Re-Implementation Plan

## Project Overview
This document outlines the plan for re-implementing the P4 B2B marketplace backend features from scratch with tiny incremental tasks. Each task includes its own acceptance tests. The backend implementation will be located in the "./backend/" directory within the current repository.

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
API_URL_BASE=https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net
```

## Feature Implementation Plan

### 1. Core Infrastructure & Configuration
**Task 1.1: Set up project structure and configuration**
- **Description:** Initialize Spring Boot project with all necessary dependencies
- **Acceptance Test:** Application starts successfully with minimal configuration
- **Dependencies:** None

**Task 1.2: Implement database configuration and Flyway migrations**
- **Description:** Set up PostgreSQL connection with connection pooling and Flyway for schema management
- **Acceptance Test:** Application connects to database and successfully runs baseline migration
- **Dependencies:** Task 1.1

**Task 1.3: Implement ULID ID generator**
- **Description:** Create ULID generator service for all entities
- **Acceptance Test:** Service generates valid ULID strings that are sortable
- **Dependencies:** Task 1.1

**Task 1.4: Implement configuration properties classes**
- **Description:** Create strongly-typed configuration classes for all services (B2, Redis, etc.)
- **Acceptance Test:** All configuration values are properly loaded and validated
- **Dependencies:** Task 1.1

### 2. Common Components & Utilities
**Task 2.1: Implement Money value object**
- **Description:** Create Money class with currency and amount handling
- **Acceptance Test:** Money objects correctly handle arithmetic operations and currency conversions
- **Dependencies:** None

**Task 2.2: Implement TaxLine value object**
- **Description:** Create TaxLine class for tax calculations (jurisdiction, rate, base, amount)
- **Acceptance Test:** TaxLine correctly calculates tax amounts based on rate and base
- **Dependencies:** Task 2.1

**Task 2.3: Implement API response wrapper**
- **Description:** Create standard response wrapper for API endpoints following RFC7807
- **Acceptance Test:** All API responses follow the RFC7807 standard format
- **Dependencies:** None

**Task 2.4: Implement pagination with ULID cursor**
- **Description:** Create pagination utilities using ULID for keyset pagination
- **Acceptance Test:** Pagination works correctly with ULID-based cursor navigation
- **Dependencies:** Task 1.3

### 3. Shared Kernel
**Task 3.1: Implement base entity and repository**
- **Description:** Create base entity with common fields (id, createdAt, updatedAt) and base repository
- **Acceptance Test:** All entities inherit from base entity with proper fields
- **Dependencies:** Task 1.3, Task 1.2

**Task 3.2: Implement audit trail functionality**
- **Description:** Create audit log functionality for tracking changes to entities
- **Acceptance Test:** All entity changes are properly logged with user context
- **Dependencies:** Task 3.1, Task 1.2

**Task 3.3: Implement file upload utility with B2**
- **Description:** Create service for uploading files to Backblaze B2
- **Acceptance Test:** Files can be uploaded to B2 and retrieved with proper access controls
- **Dependencies:** Task 1.4

### 4. Identity & Access Management
**Task 4.1: Implement Account entity and repository**
- **Description:** Create Account entity with individual/company types and status
- **Acceptance Test:** Can create, read, update, delete accounts with proper validation
- **Dependencies:** Task 3.1, Task 1.2

**Task 4.2: Implement User entity and repository**
- **Description:** Create User entity linked to Account with authentication fields
- **Acceptance Test:** Users can be created with proper account associations
- **Dependencies:** Task 4.1, Task 3.1

**Task 4.3: Implement JWT authentication**
- **Description:** Create JWT-based authentication with refresh tokens
- **Acceptance Test:** Users can authenticate and receive valid JWT tokens
- **Dependencies:** Task 4.2

**Task 4.4: Implement role-based access control (RBAC)**
- **Description:** Create role and permission system for access control
- **Acceptance Test:** Users with different roles have appropriate access levels
- **Dependencies:** Task 4.2

### 5. Catalog & Search
**Task 5.1: Implement Vendor entity and repository**
- **Description:** Create Vendor entity with KYC fields and approval status
- **Acceptance Test:** Vendors can be created, approved, and managed
- **Dependencies:** Task 3.1, Task 1.2

**Task 5.2: Implement Product entity and repository**
- **Description:** Create Product entity with attributes, inventory, and media
- **Acceptance Test:** Products can be created with all necessary fields and validation
- **Dependencies:** Task 5.1, Task 3.1, Task 1.2

**Task 5.3: Implement Product Attribute entities**
- **Description:** Create ProductAttribute and ProductAttributeValue entities
- **Acceptance Test:** Products can have custom attributes with different types
- **Dependencies:** Task 5.2

**Task 5.4: Implement Media Asset entities**
- **Description:** Create MediaAsset and ProductMedia entities for product images
- **Acceptance Test:** Media assets can be associated with products
- **Dependencies:** Task 5.2, Task 3.3

**Task 5.5: Implement catalog browsing API**
- **Description:** Create public API for browsing products with pagination
- **Acceptance Test:** Products can be browsed with search, filtering, and pagination
- **Dependencies:** Task 5.2, Task 5.3, Task 5.4, Task 2.4

**Task 5.6: Implement full-text search**
- **Description:** Implement PostgreSQL full-text search for products
- **Acceptance Test:** Search returns relevant products based on name, description, and attributes
- **Dependencies:** Task 5.5

### 6. RFQ & Quotes
**Task 6.1: Implement RFQ entity and repository**
- **Description:** Create RFQ entity with related fields and status tracking
- **Acceptance Test:** RFQs can be created, updated, and managed
- **Dependencies:** Task 4.1, Task 3.1, Task 1.2

**Task 6.2: Implement RFQ Line entity and repository**
- **Description:** Create RFQ Line entity for product requirements
- **Acceptance Test:** RFQs can have multiple line items with quantities and requirements
- **Dependencies:** Task 6.1, Task 5.2

**Task 6.3: Implement Quote entity and repository**
- **Description:** Create Quote entity with relationship to RFQ and vendor
- **Acceptance Test:** Quotes can be submitted for RFQs by vendors
- **Dependencies:** Task 6.1, Task 5.1, Task 3.1

**Task 6.4: Implement Quote Line entity and repository**
- **Description:** Create Quote Line entity for quoted items
- **Acceptance Test:** Quotes can have multiple line items with pricing
- **Dependencies:** Task 6.3, Task 6.2

**Task 6.5: Implement RFQ creation API**
- **Description:** Create API for buyers to submit new RFQs
- **Acceptance Test:** Buyers can create RFQs with proper validation and business rules
- **Dependencies:** Task 6.1, Task 6.2

**Task 6.6: Implement Quote submission API**
- **Description:** Create API for vendors to submit quotes for RFQs
- **Acceptance Test:** Vendors can submit quotes for RFQs they're invited to
- **Dependencies:** Task 6.3, Task 6.4, Task 6.5

**Task 6.7: Implement quote comparison functionality**
- **Description:** Create functionality to compare multiple quotes for the same RFQ
- **Acceptance Test:** Buyers can view and compare multiple quotes for an RFQ
- **Dependencies:** Task 6.6

### 7. Orders
**Task 7.1: Implement Order entity and repository**
- **Description:** Create Order entity with status tracking and line items
- **Acceptance Test:** Orders can be created and tracked through the lifecycle
- **Dependencies:** Task 4.1, Task 3.1, Task 1.2

**Task 7.2: Implement Order Line entity and repository**
- **Description:** Create Order Line entity for order items
- **Acceptance Test:** Orders can have multiple line items with pricing
- **Dependencies:** Task 7.1, Task 5.2

**Task 7.3: Implement order creation from accepted quotes**
- **Description:** Create functionality to convert accepted quotes to purchase orders
- **Acceptance Test:** Accepted quotes can be converted to formal purchase orders
- **Dependencies:** Task 6.7, Task 7.1, Task 7.2

**Task 7.4: Implement order management API**
- **Description:** Create API for managing orders through the lifecycle
- **Acceptance Test:** Orders can be viewed, updated, and tracked with appropriate permissions
- **Dependencies:** Task 7.3

### 8. Payments
**Task 8.1: Implement Payment entity and repository**
- **Description:** Create Payment entity for tracking payment transactions
- **Acceptance Test:** Payments can be recorded with proper status tracking
- **Dependencies:** Task 7.1, Task 3.1, Task 1.2

**Task 8.2: Implement payment gateway service**
- **Description:** Create abstract payment gateway service with concrete implementations
- **Acceptance Test:** Payment gateway can process transactions (sandbox mode)
- **Dependencies:** Task 8.1

**Task 8.3: Implement idempotency keys**
- **Description:** Add idempotency support for payment and order endpoints
- **Acceptance Test:** Duplicate requests with same idempotency key return same result
- **Dependencies:** Task 8.2

### 9. Wallet & Credit Controls
**Task 9.1: Implement Wallet entity and repository**
- **Description:** Create Wallet entity for corporate credit accounts
- **Acceptance Test:** Wallets can be created and managed for accounts
- **Dependencies:** Task 4.1, Task 3.1, Task 1.2

**Task 9.2: Implement Wallet Transaction entity and repository**
- **Description:** Create WalletTransaction for tracking wallet movements
- **Acceptance Test:** Wallet transactions are properly recorded and balance is calculated
- **Dependencies:** Task 9.1

**Task 9.3: Implement Credit Limit entity and repository**
- **Description:** Create CreditLimit entity for managing credit controls
- **Acceptance Test:** Credit limits can be set and enforced for accounts
- **Dependencies:** Task 4.1, Task 3.1

### 10. Invoicing & VAT
**Task 10.1: Implement Tax Registration entity and repository**
- **Description:** Create TaxReg entity for managing tax obligations
- **Acceptance Test:** Tax registrations can be configured for proper tax compliance
- **Dependencies:** Task 3.1, Task 1.2

**Task 10.2: Implement Sequence Registry entity and repository**
- **Description:** Create SequenceRegistry for managing invoice numbering
- **Acceptance Test:** Sequential invoice numbers are properly generated per tax jurisdiction
- **Dependencies:** Task 10.1

**Task 10.3: Implement Invoice entity and repository**
- **Description:** Create Invoice entity with VAT calculations
- **Acceptance Test:** Invoices can be created with proper tax calculations
- **Dependencies:** Task 10.1, Task 10.2, Task 7.1, Task 7.2

**Task 10.4: Implement Invoice Line entity and repository**
- **Description:** Create InvoiceLine entity for invoice items
- **Acceptance Test:** Invoices can have multiple line items with tax breakdowns
- **Dependencies:** Task 10.3, Task 7.2

**Task 10.5: Implement VAT calculation engine**
- **Description:** Create service for calculating VAT based on tax rules
- **Acceptance Test:** VAT is correctly calculated for different rates and jurisdictions
- **Dependencies:** Task 10.3

**Task 10.6: Implement invoice PDF generation**
- **Description:** Create service for generating invoice PDFs
- **Acceptance Test:** Invoice PDFs are correctly generated and stored in B2
- **Dependencies:** Task 10.3, Task 3.3

### 11. Loyalty Program
**Task 11.1: Implement Loyalty Program entity and repository**
- **Description:** Create LoyaltyProgram for managing loyalty rules
- **Acceptance Test:** Loyalty programs can be configured with earning rules
- **Dependencies:** Task 3.1, Task 1.2

**Task 11.2: Implement Tier entity and repository**
- **Description:** Create Tier entity for loyalty tier management
- **Acceptance Test:** Tiers can be configured with requirements and benefits
- **Dependencies:** Task 11.1

**Task 11.3: Implement Reward entity and repository**
- **Description:** Create Reward entity for loyalty rewards
- **Acceptance Test:** Rewards can be configured for point redemption
- **Dependencies:** Task 11.1

**Task 11.4: Implement Loyalty Transaction entity and repository**
- **Description:** Create LoyaltyTxn for tracking loyalty point movements
- **Acceptance Test:** Loyalty transactions properly track point balances
- **Dependencies:** Task 4.1, Task 11.1

**Task 11.5: Implement loyalty earning engine**
- **Description:** Create service for calculating and awarding loyalty points
- **Acceptance Test:** Points are properly earned based on transaction amounts
- **Dependencies:** Task 11.4

**Task 11.6: Implement loyalty redemption**
- **Description:** Create functionality for redeeming loyalty points
- **Acceptance Test:** Points can be redeemed for rewards at checkout
- **Dependencies:** Task 11.5, Task 11.3

### 12. Feature Flags & Configuration
**Task 12.1: Implement feature flag system**
- **Description:** Create feature flag system with database storage
- **Acceptance Test:** Features can be toggled on/off via flags
- **Dependencies:** Task 1.2

**Task 12.2: Implement feature flag endpoints**
- **Description:** Create API endpoints for managing feature flags
- **Acceptance Test:** Admins can update feature flags via API
- **Dependencies:** Task 12.1

### 13. Observability & Monitoring
**Task 13.1: Implement structured logging**
- **Description:** Set up structured JSON logging with correlation IDs
- **Acceptance Test:** Logs are properly formatted with request correlation IDs
- **Dependencies:** Task 1.1

**Task 13.2: Implement metrics collection**
- **Description:** Set up Micrometer metrics with Prometheus endpoint
- **Acceptance Test:** Application metrics are available at /actuator/metrics
- **Dependencies:** Task 1.1

**Task 13.3: Implement health checks**
- **Description:** Create health checks for all major components
- **Acceptance Test:** Health endpoints return proper status for all dependencies
- **Dependencies:** Task 1.1

### 14. Operations & Security
**Task 14.1: Implement rate limiting**
- **Description:** Create rate limiting for API endpoints using Redis
- **Acceptance Test:** API endpoints are properly rate-limited
- **Dependencies:** Task 1.1, Task 1.4

**Task 14.2: Implement security headers**
- **Description:** Add security headers to all responses
- **Acceptance Test:** Responses include proper security headers (HSTS, CSP, etc.)
- **Dependencies:** Task 1.1

**Task 14.3: Implement data seeding**
- **Description:** Create data seeding functionality for development
- **Acceptance Test:** Sample data can be seeded for development and testing
- **Dependencies:** All above tasks

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

## Acceptance Criteria
- All features implemented with tiny incremental tasks
- Each task has its own acceptance tests
- All environment variables from production are properly configured
- All security and performance requirements are met
- Feature flags control each major functionality
- Proper logging and monitoring in place
- CI/CD pipeline integrated with Azure and Cloudflare