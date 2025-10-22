# Account Entity Production Acceptance Test

## Task Description
Task 4.1: Implement Account entity and repository with individual/company types and status.

## Test Purpose
This test script verifies that the Account entity and repository implementation works correctly in the production environment. It tests all CRUD operations and validation rules.

## Test Coverage
- Account creation with individual/company types
- Account retrieval by ID
- Account updates
- Account deletion
- Validation rules for required fields
- Email uniqueness constraint
- Status tracking

## Files
- `test_account_entity.py`: Main acceptance test script

## How to Run
```bash
python test_account_entity.py
```

## Expected Results
All test cases should pass, confirming that:
- Accounts can be created with required validation
- Accounts can be retrieved, updated, and deleted
- Proper validation is enforced (e.g., company name for company accounts)
- Data integrity is maintained

## Note on Production Deployment
The Account entity has been implemented in the codebase but requires database migration
to create the necessary table structure in the production environment. After running 
the appropriate database migrations, the acceptance tests should pass completely.

## Required Database Migration
Flyway migration V4__Create_accounts_table.sql has been created and needs to be 
executed in the production environment for the Account entity to function properly.

## Environment Configuration
The test runs against the production API:
- Base URL: `https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net`
- Endpoints: `/api/accounts`

## Implementation Details
The Account entity includes:
- Individual/Company account type distinction
- Account status tracking (PENDING, ACTIVE, INACTIVE, SUSPENDED, CLOSED)
- Validation for required fields
- Email uniqueness constraint
- KYC verification status