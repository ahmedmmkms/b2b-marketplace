# P4 B2B Marketplace Backend API Design Document

This document provides a comprehensive overview of the API endpoints for the P4 B2B Marketplace backend, including both implemented and planned endpoints. Each endpoint follows REST/JSON principles with RFC7807 error responses and ULID-based pagination.

## API Base URL
```
https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net
```

## Common Headers
- `Content-Type: application/json`
- `Authorization: Bearer {jwt_token}` (for authenticated endpoints)

## Common Response Format (RFC7807)
```json
{
  "status": 200,
  "message": "Success message",
  "timestamp": "2024-01-01T10:00:00Z",
  "path": "/api/endpoint",
  "data": { /* actual response data */ },
  "meta": { /* additional metadata */ }
}
```

## Error Response Format (RFC7807)
```json
{
  "type": "https://api.example.com/errors/validation",
  "title": "Validation Error",
  "status": 400,
  "detail": "Error details",
  "instance": "/api/endpoint",
  "timestamp": "2024-01-01T10:00:00Z"
}
```

## Pagination Format
Most list endpoints return data in this format:
```json
{
  "content": [ /* items */ ],
  "pageable": {
    "sort": { "sorted": true, "unsorted": false, "empty": false },
    "offset": 0,
    "pageNumber": 0,
    "pageSize": 20,
    "paged": true,
    "unpaged": false
  },
  "totalElements": 100,
  "totalPages": 5,
  "last": false,
  "first": true,
  "sort": { "sorted": true, "unsorted": false, "empty": false },
  "numberOfElements": 20,
  "size": 20,
  "number": 0,
  "empty": false
}
```

---

## 1. Core Infrastructure & Configuration Endpoints

### Health Checks
- `GET /actuator/health`
  - Returns overall application health status
- `GET /actuator/health/db`
  - Returns database health status
- `GET /actuator/health/diskSpace`
  - Returns disk space health status

### Metrics
- `GET /actuator/metrics`
  - Returns application metrics
- `GET /actuator/metrics/jvm.memory.used`
  - Returns specific JVM memory metrics

---

## 2. Identity & Access Management Endpoints

### Authentication
- `POST /api/auth/login`
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "securePassword"
    }
    ```
  - Response: JWT tokens and user information

- `POST /api/auth/refresh`
  - Request body:
    ```json
    {
      "refreshToken": "refreshTokenString"
    }
    ```
  - Response: New access token

- `POST /api/auth/logout`
  - Invalidates current session

### Accounts
- `GET /api/accounts`
  - List accounts (admin only)
  - Query parameters: page, size, sort

- `POST /api/accounts`
  - Create a new account
  - Request body: account details

- `GET /api/accounts/{id}`
  - Get account details by ID

- `PUT /api/accounts/{id}`
  - Update account details
  - Requires admin rights or owner permissions

- `DELETE /api/accounts/{id}`
  - Delete account (admin only)

### Users
- `GET /api/users`
  - List users (admin only)
  - Query parameters: page, size, sort

- `POST /api/users`
  - Create a new user under the authenticated account

- `GET /api/users/{id}`
  - Get user details by ID

- `PUT /api/users/{id}`
  - Update user details

- `DELETE /api/users/{id}`
  - Delete user (admin only)

### Role-Based Access Control (RBAC)
- `GET /api/rbac/roles`
  - List all roles

- `POST /api/rbac/roles`
  - Create a new role
  - Requires admin permissions

- `GET /api/rbac/roles/{id}`
  - Get role details

- `PUT /api/rbac/roles/{id}`
  - Update role permissions

- `DELETE /api/rbac/roles/{id}`
  - Delete role

- `GET /api/rbac/permissions`
  - List all permissions

---

## 3. Catalog & Search Endpoints

### Vendors
- `GET /api/vendors`
  - List vendors with pagination
  - Query parameters: page, size, status, search

- `POST /api/vendors`
  - Create a new vendor profile
  - Requires vendor registration authentication

- `GET /api/vendors/{id}`
  - Get vendor details by ID

- `PUT /api/vendors/{id}`
  - Update vendor details
  - Requires vendor owner or admin permissions

- `GET /api/vendors/{id}/products`
  - Get all products for a vendor
  - Query parameters: page, size, status

### Products
- `GET /api/products`
  - List products with pagination and filtering
  - Query parameters: page, size, vendorId, category, minPrice, maxPrice

- `POST /api/products`
  - Create a new product
  - Requires vendor authentication and permissions

- `GET /api/products/{id}`
  - Get product details by ID

- `PUT /api/products/{id}`
  - Update product details
  - Requires vendor owner or admin permissions

- `DELETE /api/products/{id}`
  - Delete product
  - Requires vendor owner or admin permissions

### Catalog Browsing
- `GET /api/catalog/products`
  - Public endpoint to browse products
  - Query parameters: page, size, search, category, sort
  - Available when `catalog.publicBrowse` feature flag is enabled

- `GET /api/catalog/products/{id}`
  - Public endpoint to view product details
  - Available when `catalog.publicBrowse` feature flag is enabled

### Product Attributes
- `GET /api/products/{id}/attributes`
  - Get all attributes for a product

- `POST /api/products/{id}/attributes`
  - Add an attribute to a product

- `PUT /api/products/{id}/attributes/{attrId}`
  - Update an attribute value

- `DELETE /api/products/{id}/attributes/{attrId}`
  - Remove an attribute from a product

### Media Assets
- `POST /api/media`
  - Upload a media asset
  - Requires authentication and proper permissions
  - Form-data request with file

- `GET /api/media/{id}`
  - Get media asset details

- `DELETE /api/media/{id}`
  - Delete media asset
  - Requires owner or admin permissions

### Product Media
- `POST /api/products/{productId}/media`
  - Associate media with a product

- `GET /api/products/{productId}/media`
  - Get all media for a product

- `DELETE /api/products/{productId}/media/{mediaId}`
  - Remove media association from a product

### Search
- `POST /api/search`
  - Advanced search endpoint
  - Request body:
    ```json
    {
      "query": "search term",
      "filters": {
        "category": "electronics",
        "vendorId": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
        "priceRange": {
          "min": 10,
          "max": 100
        }
      },
      "sort": "price_asc",
      "page": 0,
      "size": 20
    }
    ```
  - Available when `search.enabled` feature flag is enabled

---

## 4. RFQ & Quotes Endpoints

### RFQs (To be implemented)
- `GET /api/rfqs`
  - List RFQs for authenticated user
  - Query parameters: page, size, status
  - Available when `rfq.enabled` feature flag is enabled

- `POST /api/rfqs`
  - Create a new RFQ
  - Request body:
    ```json
    {
      "buyerAccountId": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
      "title": "RFQ for Electronics",
      "description": "RFQ for electronic components",
      "validUntil": "2024-12-31T23:59:59Z",
      "lines": [
        {
          "productId": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
          "quantity": 100,
          "requirements": "Must be certified"
        }
      ]
    }
    ```
  - Available when `rfq.enabled` feature flag is enabled

- `GET /api/rfqs/{id}`
  - Get RFQ details by ID
  - Available when `rfq.enabled` feature flag is enabled

- `PUT /api/rfqs/{id}`
  - Update RFQ details (only draft status)
  - Available when `rfq.enabled` feature flag is enabled

### RFQ Lines (To be implemented)
- `GET /api/rfqs/{rfqId}/lines`
  - Get all lines for an RFQ

- `POST /api/rfqs/{rfqId}/lines`
  - Add a new line to the RFQ

- `PUT /api/rfqs/{rfqId}/lines/{lineId}`
  - Update a specific RFQ line

- `DELETE /api/rfqs/{rfqId}/lines/{lineId}`
  - Remove a line from the RFQ

### Quotes (To be implemented)
- `GET /api/quotes`
  - List quotes for authenticated vendor
  - Query parameters: page, size, status
  - Available when `quote.vendorConsole` feature flag is enabled

- `POST /api/rfqs/{rfqId}/quotes`
  - Submit a quote for an RFQ
  - Available when `quote.vendorConsole` feature flag is enabled

- `GET /api/quotes/{id}`
  - Get quote details by ID
  - Available when `quote.vendorConsole` feature flag is enabled

- `PUT /api/quotes/{id}`
  - Update quote details (only draft status)
  - Available when `quote.vendorConsole` feature flag is enabled

### Quote Lines (To be implemented)
- `GET /api/quotes/{quoteId}/lines`
  - Get all lines for a quote

- `POST /api/quotes/{quoteId}/lines`
  - Add a new line to the quote

- `PUT /api/quotes/{quoteId}/lines/{lineId}`
  - Update a specific quote line

### Quote Comparison (To be implemented)
- `GET /api/rfqs/{rfqId}/quotes/compare`
  - Compare all quotes for a specific RFQ
  - Available when `quote.vendorConsole` feature flag is enabled

---

## 5. Orders Endpoints

### Orders (To be implemented)
- `GET /api/orders`
  - List orders for authenticated user
  - Query parameters: page, size, status
  - Available when `orders.checkout` feature flag is enabled

- `POST /api/orders`
  - Create a new order (from cart or accepted quote)
  - Available when `orders.checkout` feature flag is enabled

- `GET /api/orders/{id}`
  - Get order details by ID
  - Available when `orders.checkout` feature flag is enabled

- `PUT /api/orders/{id}/status`
  - Update order status (vendor/fulfillment only)
  - Available when `orders.checkout` feature flag is enabled

### Order Lines (To be implemented)
- `GET /api/orders/{orderId}/lines`
  - Get all lines for an order

---

## 6. Payments Endpoints

### Payments (To be implemented)
- `POST /api/payments`
  - Process payment for an order
  - Available when `payments.gateway1` feature flag is enabled
  - Supports idempotency keys via `Idempotency-Key` header

- `GET /api/payments/{id}`
  - Get payment details by ID
  - Available when `payments.gateway1` feature flag is enabled

---

## 7. Wallet & Credit Controls Endpoints

### Wallets (To be implemented)
- `GET /api/wallets`
  - Get wallet details for authenticated account
  - Available when `wallet.basic` feature flag is enabled

- `GET /api/wallets/{id}`
  - Get specific wallet details
  - Available when `wallet.basic` feature flag is enabled

### Wallet Transactions (To be implemented)
- `GET /api/wallets/{walletId}/transactions`
  - Get transaction history for a wallet
  - Available when `wallet.basic` feature flag is enabled

### Credit Limits (To be implemented)
- `GET /api/credit/limits/{accountId}`
  - Get credit limit for an account
  - Available when `credit.controls` feature flag is enabled

- `POST /api/credit/limits`
  - Update credit limit (admin only)
  - Available when `credit.controls` feature flag is enabled

---

## 8. Invoicing & VAT Endpoints

### Invoices (To be implemented)
- `GET /api/invoices`
  - List invoices for authenticated account
  - Query parameters: page, size, status, date range
  - Available when `invoice.vat` feature flag is enabled

- `GET /api/invoices/{id}`
  - Get invoice details by ID
  - Available when `invoice.vat` feature flag is enabled

- `GET /api/invoices/{id}/download`
  - Download invoice as PDF
  - Available when `invoice.vat` feature flag is enabled

### Credit Notes (To be implemented)
- `GET /api/invoices/{id}/credit-notes`
  - Get credit notes for an invoice
  - Available when `invoice.vat` feature flag is enabled

- `POST /api/invoices/{id}/credit-notes`
  - Issue a credit note for an invoice
  - Available when `invoice.vat` feature flag is enabled

---

## 9. Loyalty Program Endpoints

### Loyalty Programs (To be implemented)
- `GET /api/loyalty/programs`
  - List available loyalty programs
  - Available when `loyalty.core` feature flag is enabled

- `GET /api/loyalty/programs/{id}`
  - Get loyalty program details
  - Available when `loyalty.core` feature flag is enabled

### Tier Management (To be implemented)
- `GET /api/loyalty/tiers`
  - List loyalty tiers
  - Available when `loyalty.core` feature flag is enabled

- `GET /api/loyalty/my-tier`
  - Get authenticated user's current tier
  - Available when `loyalty.core` feature flag is enabled

### Reward Management (To be implemented)
- `GET /api/loyalty/rewards`
  - List available rewards
  - Available when `loyalty.core` feature flag is enabled

- `POST /api/loyalty/rewards/{id}/redeem`
  - Redeem reward for points
  - Available when `loyalty.core` feature flag is enabled

### Loyalty Transactions (To be implemented)
- `GET /api/loyalty/transactions`
  - Get loyalty point transaction history
  - Available when `loyalty.core` feature flag is enabled

---

## 10. Feature Flags Management Endpoints

### Feature Flags (To be implemented)
- `GET /api/feature-flags`
  - List all feature flags with their current status
  - Requires admin permissions

- `PUT /api/feature-flags/{flagName}`
  - Update the status of a specific feature flag
  - Request body:
    ```json
    {
      "enabled": true
    }
    ```
  - Requires admin permissions

---

## 11. Audit Trail Endpoints

### Audit Logs
- `GET /api/audit/logs`
  - List audit logs with filtering options
  - Query parameters: page, size, entity, action, date range
  - Requires admin permissions