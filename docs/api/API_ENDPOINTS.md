# P4 B2B Marketplace REST API Endpoints

## Overview
This document outlines the REST API endpoints for the P4 B2B Marketplace, covering features completed up to task 4.4 (Role-based Access Control). The API follows REST/JSON standards with RFC7807 error responses and uses ULID strings for all identifiers.

## API Base URL
```
https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/v1
```

## Common Headers
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer <JWT_TOKEN>` (for authenticated endpoints)

## Authentication & Authorization
JWT-based authentication with refresh tokens and role-based access control (RBAC).

---

## 1. Core Infrastructure & Configuration (Tasks 1.1-1.4)

### Health Checks
```
GET /health
GET /health/readiness
GET /health/liveness
```
- **Description:** Provides system health status
- **Authentication:** Not required
- **Response:** Health status for all system components

### Metrics
```
GET /metrics
```
- **Description:** Provides application metrics in Prometheus format
- **Authentication:** Admin only
- **Response:** System metrics

### Feature Flags
```
GET /feature-flags
```
- **Description:** Lists all available feature flags and their status
- **Authentication:** None required, but admin may have more detailed view
- **Response:** List of feature flags with enabled/disabled status

```
GET /feature-flags/{flagName}
```
- **Description:** Get specific feature flag status
- **Authentication:** None required
- **Response:** Feature flag details

---

## 2. Common Components & Utilities (Tasks 2.1-2.4)

### Pagination
Many endpoints support cursor-based pagination using ULID keys:
- `cursor`: ULID of the last returned item
- `limit`: Number of items to return (max 100, default 20)

---

## 3. Shared Kernel (Tasks 3.1-3.3)

### Audit Trail
```
GET /audit-log
```
- **Description:** Retrieve audit logs for entities
- **Authentication:** Admin required
- **Parameters:**
  - `resourceType`: Filter by resource type
  - `resourceId`: Filter by specific resource ID
  - `userId`: Filter by user who performed action
  - `action`: Filter by action type
  - `fromDate`: Filter logs from specific date
  - `toDate`: Filter logs to specific date
- **Response:** Paginated audit log entries

---

## 4. Identity & Access Management (Tasks 4.1-4.4)

### Accounts
```
POST /accounts
```
- **Description:** Create a new account
- **Authentication:** None required (for signup)
- **Request Body:**
```json
{
  "accountType": "COMPANY|INDIVIDUAL",
  "companyName": "string (required for COMPANY type)",
  "contactPerson": "string",
  "email": "string",
  "phone": "string",
  "taxId": "string",
  "registrationDate": "date in YYYY-MM-DD format"
}
```
- **Response:** Created account details
- **Authorization:** None (public endpoint)

```
GET /accounts/{id}
```
- **Description:** Get account details by ID
- **Authentication:** JWT required
- **Response:** Account details
- **Authorization:** Account owner or admin

```
PUT /accounts/{id}
```
- **Description:** Update account details
- **Authentication:** JWT required
- **Request Body:** Updated fields (similar to create)
- **Response:** Updated account details
- **Authorization:** Account owner or admin

```
GET /accounts
```
- **Description:** List accounts (admin only)
- **Authentication:** JWT required
- **Response:** Paginated list of accounts
- **Authorization:** Admin only

### Users
```
POST /users
```
- **Description:** Create a new user within an account
- **Authentication:** JWT required
- **Request Body:**
```json
{
  "accountId": "ULID of account",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "jobTitle": "string"
}
```
- **Response:** Created user details (excluding password)
- **Authorization:** Account admin or system admin

```
GET /users/{id}
```
- **Description:** Get user details by ID
- **Authentication:** JWT required
- **Response:** User details (excluding password)
- **Authorization:** User owner, account admin, or system admin

```
GET /users
```
- **Description:** List users with optional account filter
- **Authentication:** JWT required
- **Parameters:**
  - `accountId`: Filter by account
  - `isActive`: Filter by active status
- **Response:** Paginated list of users
- **Authorization:** Account admin or system admin

```
PUT /users/{id}
```
- **Description:** Update user details
- **Authentication:** JWT required
- **Request Body:** Updated fields
- **Response:** Updated user details
- **Authorization:** User owner, account admin, or system admin

```
DELETE /users/{id}
```
- **Description:** Delete user (soft delete)
- **Authentication:** JWT required
- **Response:** Success confirmation
- **Authorization:** Account admin or system admin

### Authentication
```
POST /auth/login
```
- **Description:** Authenticate user and get JWT tokens
- **Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response:**
```json
{
  "accessToken": "JWT token",
  "refreshToken": "Refresh token",
  "expiresIn": "seconds until expiration",
  "user": {
    "id": "ULID",
    "email": "email",
    "firstName": "string",
    "lastName": "string",
    "accountId": "ULID",
    "accountType": "COMPANY|INDIVIDUAL",
    "companyName": "string",
    "permissions": ["array of permissions"],
    "roles": ["array of roles"]
  }
}
```
- **Authorization:** None required

```
POST /auth/refresh
```
- **Description:** Refresh JWT token using refresh token
- **Request Body:**
```json
{
  "refreshToken": "string"
}
```
- **Response:** Same as login response
- **Authorization:** None required (uses refresh token)

```
POST /auth/logout
```
- **Description:** Logout and invalidate refresh token
- **Authentication:** JWT required
- **Request Body:**
```json
{
  "refreshToken": "string"
}
```
- **Response:** Success confirmation
- **Authorization:** Any authenticated user

### Roles and Permissions (RBAC)
```
GET /permissions
```
- **Description:** List all available permissions
- **Authentication:** JWT required
- **Response:** Paginated list of permissions
- **Authorization:** Admin required

```
GET /roles
```
- **Description:** List all roles
- **Authentication:** JWT required
- **Response:** Paginated list of roles
- **Authorization:** Admin required

```
GET /roles/{id}
```
- **Description:** Get role details by ID
- **Authentication:** JWT required
- **Response:** Role details with assigned permissions
- **Authorization:** Admin required

```
POST /roles
```
- **Description:** Create a new role
- **Authentication:** JWT required
- **Request Body:**
```json
{
  "roleName": "string",
  "description": "string",
  "permissions": ["permission IDs"]
}
```
- **Response:** Created role details
- **Authorization:** Admin required

```
PUT /roles/{id}
```
- **Description:** Update role details
- **Authentication:** JWT required
- **Request Body:** Updated fields
- **Response:** Updated role details
- **Authorization:** Admin required

```
POST /users/{id}/roles
```
- **Description:** Assign role to user
- **Authentication:** JWT required
- **Request Body:**
```json
{
  "roleId": "ULID of role"
}
```
- **Response:** Success confirmation with assigned role details
- **Authorization:** Admin required

```
DELETE /users/{id}/roles/{roleId}
```
- **Description:** Remove role from user
- **Authentication:** JWT required
- **Response:** Success confirmation
- **Authorization:** Admin required

```
GET /users/{id}/roles
```
- **Description:** List roles assigned to user
- **Authentication:** JWT required
- **Response:** List of roles assigned to user
- **Authorization:** User owner, account admin, or system admin

---

## Error Response Format (RFC7807)
All error responses follow RFC7807 format:
```json
{
  "type": "https://api.p4b2b.com/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "Request validation failed",
  "instance": "/api/v1/accounts",
  "timestamp": "2025-10-20T12:00:00Z",
  "errors": {
    "email": ["Must be a valid email address"],
    "accountType": ["Must be COMPANY or INDIVIDUAL"]
  }
}
```

## Implemented vs. Not Yet Implemented (as of Task 4.4)

### ✅ Implemented (Completed Tasks 1.1-4.4):
- Core infrastructure setup (project structure, configuration)
- Database configuration with PostgreSQL and Flyway
- ULID ID generation
- Configuration properties classes
- Money and TaxLine value objects
- API response wrapper with RFC7807 compliance
- ULID-based pagination
- Base entity and repository pattern
- Audit trail functionality
- File upload utility with B2 integration
- Account entity and repository
- User entity and repository
- JWT authentication system
- Role-based access control (RBAC)

### ❌ Not Yet Implemented (Tasks 5.1-14.3):
- Vendors and products (Catalog & Search)
- RFQ and Quotes functionality
- Order management
- Payments system
- Wallet and credit controls
- Invoicing and VAT system
- Loyalty program
- Advanced feature flags
- Observability features
- Operations and security enhancements

## Rate Limiting
All endpoints are subject to rate limiting based on user roles:
- Anonymous users: 100 requests/hour
- Authenticated users: 1000 requests/hour
- Admin users: 5000 requests/hour

Rate limit headers:
- `X-RateLimit-Limit`: The maximum number of requests allowed
- `X-RateLimit-Remaining`: The number of requests remaining
- `X-RateLimit-Reset`: The time at which the rate limit resets