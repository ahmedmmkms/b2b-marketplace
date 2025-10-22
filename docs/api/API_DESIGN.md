# P4 B2B Marketplace REST API Design Document

## Overview

This document defines the REST API design for the P4 GCC/MENA B2B Marketplace. The API follows REST/JSON conventions with RFC7807 error responses and implements security best practices.

### API Base URL
```
https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/v1
```

### Common Headers
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer <JWT_TOKEN>` (for authenticated endpoints)
- `X-Request-ID: <unique-uuid>` (for request tracing)

### ID Format
All identifiers use ULID (Universally Unique Lexicographically Sortable Identifier) format: 26-character string (e.g., "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZK")

### Date/Time Format
- Dates: ISO 8601 format `YYYY-MM-DD`
- DateTimes: ISO 8601 format `YYYY-MM-DDTHH:MM:SS.SSSZ`

---

## 1. Health & Monitoring Endpoints

### Health Checks
```
GET /health
GET /health/readiness  
GET /health/liveness
```
**Purpose:** Monitor system health status
**Authentication:** Optional (no auth required for basic health)
**Response:**
```json
{
  "status": "UP|DOWN",
  "details": {
    "database": { "status": "UP" },
    "redis": { "status": "UP" },
    "b2Storage": { "status": "UP" }
  }
}
```

### Metrics
```
GET /actuator/metrics
GET /actuator/metrics/{metric-name}
```
**Purpose:** Application metrics in Prometheus format
**Authentication:** Admin only
**Response:** Prometheus metrics format

### Feature Flags
```
GET /feature-flags
```
**Purpose:** List all available feature flags
**Authentication:** Optional (admin for full details)
**Response:**
```json
{
  "featureFlags": [
    {
      "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZK",
      "flagName": "catalog.publicBrowse",
      "isEnabled": true,
      "description": "Allow public browsing of catalog"
    }
  ]
}
```

```
GET /feature-flags/{flagName}
```
**Purpose:** Get specific feature flag status
**Authentication:** Optional
**Response:**
```json
{
  "flagName": "catalog.publicBrowse",
  "isEnabled": true,
  "description": "Allow public browsing of catalog"
}
```

---

## 2. Identity & Access Management (Implemented: Tasks 4.1-4.4)

### Accounts
```
POST /accounts
```
**Purpose:** Create a new business account
**Authentication:** Not required (public signup)
**Request:**
```json
{
  "accountType": "COMPANY|INDIVIDUAL",
  "companyName": "string (required for COMPANY)",
  "contactPerson": "string",
  "email": "email@example.com",
  "phone": "+971501234567",
  "taxId": "string (optional)",
  "registrationDate": "2025-01-15"
}
```
**Response:** `201 Created`
```json
{
  "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZK",
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z",
  "accountType": "COMPANY",
  "status": "PENDING",
  "companyName": "Global Trading Co.",
  "contactPerson": "Ahmed Mohamed",
  "email": "ahmed@example.com",
  "phone": "+971501234567",
  "taxId": "VAT-123456789",
  "kycVerified": false,
  "creditLimit": 0.0000,
  "availableCredit": 0.0000
}
```

```
GET /accounts/{id}
```
**Purpose:** Get account details
**Authentication:** JWT required
**Authorization:** Account owner or admin
**Response:** `200 OK`
```json
{
  "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZK",
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z",
  "accountType": "COMPANY",
  "status": "ACTIVE",
  "companyName": "Global Trading Co.",
  "contactPerson": "Ahmed Mohamed",
  "email": "ahmed@example.com",
  "phone": "+971501234567",
  "taxId": "VAT-123456789",
  "registrationDate": "2025-01-15",
  "kycVerified": true,
  "creditLimit": 50000.0000,
  "availableCredit": 45000.0000
}
```

```
PUT /accounts/{id}
```
**Purpose:** Update account details
**Authentication:** JWT required
**Authorization:** Account owner or admin
**Request:** Partial update allowed
**Response:** `200 OK`

```
GET /accounts
```
**Purpose:** List accounts (admin only)
**Authentication:** JWT required
**Authorization:** Admin only
**Parameters:**
- `status`: Filter by status (PENDING|ACTIVE|INACTIVE|SUSPENDED|CLOSED)
- `accountType`: Filter by type (COMPANY|INDIVIDUAL)
- `cursor`: Pagination cursor
- `limit`: Page size (max 100, default 20)
**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZK",
      "accountType": "COMPANY",
      "status": "ACTIVE",
      "companyName": "Global Trading Co.",
      "contactPerson": "Ahmed Mohamed",
      "email": "ahmed@example.com",
      "kycVerified": true
    }
  ],
  "nextCursor": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZL",
  "hasNext": true
}
```

### Users
```
POST /users
```
**Purpose:** Create a new user within an account
**Authentication:** JWT required
**Authorization:** Account admin or system admin
**Request:**
```json
{
  "accountId": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZK",
  "firstName": "Ahmed",
  "lastName": "Mohamed",
  "email": "ahmed@company.com",
  "phone": "+971501234567",
  "jobTitle": "Procurement Manager"
}
```
**Response:** `201 Created`
```json
{
  "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZM",
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z",
  "accountId": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZK",
  "firstName": "Ahmed",
  "lastName": "Mohamed",
  "email": "ahmed@company.com",
  "phone": "+971501234567",
  "jobTitle": "Procurement Manager",
  "isActive": true,
  "lastLoginAt": null
}
```

```
GET /users/{id}
```
**Purpose:** Get user details
**Authentication:** JWT required
**Authorization:** User owner, account admin, or system admin
**Response:** `200 OK`
```json
{
  "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZM",
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z",
  "accountId": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZK",
  "firstName": "Ahmed",
  "lastName": "Mohamed",
  "email": "ahmed@company.com",
  "phone": "+971501234567",
  "jobTitle": "Procurement Manager",
  "isActive": true,
  "lastLoginAt": "2025-01-15T09:15:00Z"
}
```

```
GET /users
```
**Purpose:** List users with optional filtering
**Authentication:** JWT required
**Authorization:** Account admin or system admin
**Parameters:**
- `accountId`: Filter by account
- `isActive`: Filter by active status (true|false)
- `cursor`: Pagination cursor
- `limit`: Page size (max 100, default 20)
**Response:** `200 OK`

### Authentication
```
POST /auth/login
```
**Purpose:** Authenticate user and issue JWT tokens
**Authentication:** Not required
**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
**Response:** `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refreshTokenString...",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "user": {
    "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZM",
    "email": "user@example.com",
    "firstName": "Ahmed",
    "lastName": "Mohamed",
    "accountId": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZK",
    "accountType": "COMPANY",
    "companyName": "Global Trading Co.",
    "permissions": ["accounts:read", "products:read", "rfqs:create"],
    "roles": ["buyer"]
  }
}
```

```
POST /auth/refresh
```
**Purpose:** Refresh access token using refresh token
**Authentication:** Not required (uses refresh token)
**Request:**
```json
{
  "refreshToken": "refreshTokenString..."
}
```
**Response:** `200 OK`
```json
{
  "accessToken": "newAccessToken...",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

```
POST /auth/logout
```
**Purpose:** Logout and invalidate refresh token
**Authentication:** JWT required
**Request:**
```json
{
  "refreshToken": "refreshTokenString..."
}
```
**Response:** `200 OK`
```json
{
  "message": "Successfully logged out"
}
```

### Roles & Permissions (RBAC)
```
GET /permissions
```
**Purpose:** List all available permissions
**Authentication:** JWT required
**Authorization:** Admin only
**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZN",
      "createdAt": "2025-01-15T10:30:00Z",
      "updatedAt": "2025-01-15T10:30:00Z",
      "permissionName": "products:create",
      "description": "Create new products",
      "isActive": true
    }
  ],
  "nextCursor": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZO",
  "hasNext": true
}
```

```
GET /roles
```
**Purpose:** List all roles
**Authentication:** JWT required
**Authorization:** Admin only
**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZP",
      "createdAt": "2025-01-15T10:30:00Z",
      "updatedAt": "2025-01-15T10:30:00Z",
      "roleName": "buyer",
      "description": "Standard buyer role",
      "isActive": true,
      "permissions": [
        {
          "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZN",
          "permissionName": "products:read"
        }
      ]
    }
  ],
  "nextCursor": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZQ",
  "hasNext": true
}
```

```
POST /users/{userId}/roles
```
**Purpose:** Assign role to user
**Authentication:** JWT required
**Authorization:** Admin only
**Request:**
```json
{
  "roleId": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZP"
}
```
**Response:** `200 OK`
```json
{
  "message": "Role assigned successfully",
  "roleAssignment": {
    "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZR",
    "userId": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZM",
    "roleId": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZP",
    "assignedAt": "2025-01-15T10:30:00Z"
  }
}
```

```
DELETE /users/{userId}/roles/{roleId}
```
**Purpose:** Remove role from user
**Authentication:** JWT required
**Authorization:** Admin only
**Response:** `200 OK`
```json
{
  "message": "Role removed successfully"
}
```

```
GET /users/{userId}/roles
```
**Purpose:** List roles assigned to user
**Authentication:** JWT required
**Authorization:** User owner, account admin, or system admin
**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZP",
      "roleName": "buyer",
      "description": "Standard buyer role",
      "permissions": [
        "products:read",
        "rfqs:create",
        "quotes:read"
      ]
    }
  ]
}
```

---

## 3. Common Components (Implemented: Tasks 2.1-2.4)

### Pagination
All list endpoints support cursor-based pagination using ULID keys:
- `cursor`: ULID of the last returned item (optional)
- `limit`: Number of items to return (default: 20, max: 100)

### API Response Wrapper (RFC7807)
Standardized response format for all API endpoints following RFC7807:

Success Response:
```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "status": 200,
  "message": "Success message",
  "data": { /* actual response data */ }
}
```

Error Response (RFC7807):
```json
{
  "type": "https://api.p4b2b.com/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "Request validation failed",
  "instance": "/api/v1/accounts",
  "timestamp": "2025-01-15T10:30:00Z",
  "errors": {
    "email": ["Must be a valid email address"],
    "accountType": ["Must be COMPANY or INDIVIDUAL"]
  }
}
```

---

## 4. File Upload (Implemented: Task 3.3)

```
POST /uploads
```
**Purpose:** Upload file to B2 storage
**Authentication:** JWT required
**Content-Type:** multipart/form-data
**Response:** `200 OK`
```json
{
  "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZS",
  "name": "product-image.jpg",
  "originalFilename": "image.jpg",
  "storagePath": "/assets/products/01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZT/image.jpg",
  "contentType": "image/jpeg",
  "fileSize": 1024000,
  "mediaType": "IMAGE",
  "status": "ACTIVE"
}
```

---

## 5. Audit Trail (Implemented: Task 3.2)

```
GET /audit-log
```
**Purpose:** Retrieve audit logs
**Authentication:** JWT required
**Authorization:** Admin only
**Parameters:**
- `resourceType`: Type of resource (e.g., "Account", "User")
- `resourceId`: Specific resource ID
- `userId`: Filter by user who performed action
- `action`: Type of action (CREATE, UPDATE, DELETE, READ)
- `fromDate`: Filter from date
- `toDate`: Filter to date
- `cursor`: Pagination cursor
- `limit`: Page size
**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZU",
      "createdAt": "2025-01-15T10:30:00Z",
      "userId": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZM",
      "action": "CREATE",
      "resourceType": "Account",
      "resourceId": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZK",
      "oldValues": null,
      "newValues": {
        "id": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZK",
        "companyName": "Global Trading Co."
      }
    }
  ],
  "nextCursor": "01F1ZK6Z7ZCQ07ZK6Z7ZCQ07ZV",
  "hasNext": true
}
```

---

## Security Considerations

### Authentication
- JWT-based authentication with refresh tokens
- 1-hour access token expiration
- 7-day refresh token expiration
- Automatic refresh token rotation

### Authorization
- Role-based access control (RBAC)
- Permission-based access control
- Resource-level access control

### Rate Limiting
- Anonymous users: 100 requests/hour
- Authenticated users: 1000 requests/hour
- Admin users: 5000 requests/hour
- Implemented using Redis

### Input Validation
- All inputs are validated server-side
- SQL injection protection through parameterized queries
- XSS protection through proper encoding

---

## Implementation Status

### ✅ Completed Endpoints (Tasks 1.1-4.4)
- Health & monitoring endpoints
- Configuration and feature flags
- Account management
- User management
- Authentication & authorization
- Role-based access control
- Audit logging
- File uploads
- Common components (Money, TaxLine, pagination)

### ❌ Pending Endpoints (Tasks 5.1-14.3)
- Vendor and product management
- Catalog browsing and search
- RFQ and quote management
- Order processing
- Payment processing
- Wallet and credit controls
- Invoicing and VAT
- Loyalty program
- Advanced monitoring and operations

---

## Error Codes

| HTTP Code | Error Type | Description |
|-----------|------------|-------------|
| 400 | Validation Error | Request validation failed |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Requested resource does not exist |
| 409 | Conflict | Resource conflict (e.g., duplicate email) |
| 422 | Unprocessable Entity | Business logic validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |
| 503 | Service Unavailable | Dependency unavailable |

---

## Response Times

- 50th percentile (median): < 200ms
- 95th percentile: < 500ms
- 99th percentile: < 1000ms