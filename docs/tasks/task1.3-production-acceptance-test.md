# Production Acceptance Test for Task 1.3: ULID ID Generator Service

## Background
The system needs to generate ULID (Universally Unique Lexicographically Sortable Identifier) strings for all entities in the production environment. This test verifies that ULID generation works correctly in the Azure deployment.

## Production Environment
- Base URL: https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net

## Prerequisites
- Access to the deployed application
- Understanding of available endpoints that use ULIDs
- Tools for making HTTP requests (curl, Postman, etc.)

## Test Scenarios

### Test 1: Verify ULID Generation in Entity Creation
**Given** the production application is available at the Azure endpoint
**When** I create an entity that should have a ULID identifier (e.g., Account, Product, RFQ)
**Then** the response contains a valid ULID in the `id` field
**And** the ULID is 26 characters long
**And** the ULID contains only valid base32 characters (0-9, A-V)

**Example API Call:**
```bash
# Example: Creating an account (adjust endpoint as needed)
curl -X POST \
  'https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/accounts' \
  -H 'Content-Type: application/json' \
  -d '{"name": "Test Account", "type": "COMPANY"}'
```

### Test 2: Verify ULID Format Consistency
**Given** I have retrieved an entity from the production API
**When** I examine the ID field
**Then** it should be a 26-character ULID string
**And** it should match the pattern: `^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$`

### Test 3: Verify ULID is Used Across Different Entity Types
**Given** the production application is available
**When** I create or retrieve different entity types (Account, Product, RFQ, etc.)
**Then** all entities use ULIDs for their identifiers
**And** all ULIDs follow the same 26-character format

## Manual Testing Steps

1. **Create an entity:**
   - Send a POST request to an entity creation endpoint
   - Verify the response ID field contains a valid ULID

2. **Retrieve an existing entity:**
   - Send a GET request to retrieve an existing entity
   - Verify the ID field is a valid ULID

3. **Create multiple entities in sequence:**
   - Create multiple entities in quick succession
   - Retrieve their IDs and verify they're unique
   - Check that their timestamp components reflect creation order

## Validation Functions (for automation)

```javascript
function isValidULID(ulid) {
  if (!ulid || ulid.length !== 26) {
    return false;
  }
  
  // Check if ULID contains only valid base32 characters
  const validULIDRegex = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/;
  return validULIDRegex.test(ulid);
}

function extractTimestamp(ulid) {
  if (!isValidULID(ulid)) {
    return null;
  }
  
  // Extract the first 10 characters (time component) and convert from base32 to decimal
  const timeComponent = ulid.substring(0, 10);
  return parseInt(timeComponent, 32);
}

function testULIDSortability(ulids) {
  // Check if ULIDs maintain chronological order when sorted lexicographically
  const sortedUlids = [...ulids].sort();
  return JSON.stringify(ulids) === JSON.stringify(sortedUlids);
}
```

## Expected Results
- All entity IDs are valid ULIDs (26 characters, base32 format)
- ULIDs are unique across all entities
- ULIDs maintain chronological order when sorted lexicographically
- ULIDs follow the time component + random component structure