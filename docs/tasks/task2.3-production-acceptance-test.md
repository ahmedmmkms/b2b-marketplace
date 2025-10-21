# Task 2.3 Production Deployment Acceptance Test

## Objective
Verify that the RFQ creation functionality works correctly in the production environment. This includes validating that users can create RFQs with attachments, specify a vendor shortlist, and set validity dates as per P4-S2-T003 requirements.

## Pre-requisites
- Production deployment is accessible at: `https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net`
- The backend application includes the RFQ domain entities and controllers
- The RFQ feature flag is enabled: `rfq.enabled=true`
- User authentication is working (credentials provided: user/112233445566)
- The database contains RFQ-related tables as defined in the schema

## Test Steps

### 1. Verify RFQ Creation Endpoint
Make a test request to create a new RFQ with the following details:
- Title: "Test RFQ for Production Validation"
- Description: "RFQ created for production acceptance testing"
- Status: "OPEN" (default)
- Expiry date: 7 days from creation
- Contact person: "Test User"
- Contact email: "test@example.com"
- Currency: "USD"
- Vendor shortlist: Include vendors with IDs from the database

```bash
curl -X POST https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/rfq \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic dXNlcjoxMTIyMzM0NDU1NjY=" \
  -d '{
    "title": "Test RFQ for Production Validation",
    "description": "RFQ created for production acceptance testing",
    "contactPerson": "Test User",
    "contactEmail": "test@example.com",
    "currency": "USD",
    "expiryDate": "2025-10-23T23:59:59Z",
    "isPublic": false,
    "rfqLines": [
      {
        "productName": "Test Product",
        "description": "Test product for RFQ",
        "quantity": 10,
        "unitOfMeasure": "EA",
        "productSpecifications": "Standard specifications",
        "brandPreference": "Any",
        "qualityRequirements": "Standard quality"
      }
    ],
    "vendorShortlist": [
      "VENDOR001",
      "VENDOR002"
    ]
  }'
```

### 2. Verify Attachment Support
Test creating an RFQ with an attachment file uploaded separately:
```bash
curl -X POST https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/rfq/attachments \
  -H "Authorization: Basic dXNlcjoxMTIyMzM0NDU1NjY=" \
  -F "file=@rfq-specifications.pdf" \
  -F "rfqId=RFQ001"
```

### 3. Test Vendor Shortlist Functionality
- Create an RFQ with a specific vendor shortlist
- Verify that only vendors in the shortlist can respond to the RFQ
- Ensure that vendors outside the shortlist cannot see or respond to the RFQ

### 4. Validate Expiry Date Logic
- Create an RFQ with a future expiry date
- Verify that the RFQ remains active until the expiry date
- Create an RFQ with a past expiry date
- Verify that the RFQ status is set to "EXPIRED"

### 5. Test RFQ Retrieval
Retrieve the created RFQ to verify all data was stored correctly:
```bash
curl -X GET https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/rfq/{rfqId} \
  -H "Authorization: Basic dXNlcjoxMTIyMzM0NDU1NjY="
```

### 6. Test RFQ Line Items
- Verify that all line items were correctly associated with the RFQ
- Check that product specifications, brand preferences, and quality requirements are properly stored

### 7. Test Authorization and Access Control
- Verify that only authorized users can create RFQs
- Verify that users can only view RFQs they have created or have access to

## Expected Results
- RFQ creation endpoint successfully accepts the request and returns a 201 Created status
- RFQ object is properly stored in the database with all specified fields
- RFQ ID is a valid ULID string (sortable)
- Vendor shortlist is properly stored and enforced
- Expiry date logic is correctly implemented
- All RFQ line items are correctly associated with the RFQ
- Attachment functionality works as expected
- Proper validation occurs for required fields
- Authorization and access controls are properly enforced
- Response follows API standards with proper error handling

## Success Criteria
- [ ] RFQ can be created with required fields via the API
- [ ] RFQ creation endpoint returns appropriate response body
- [ ] Created RFQ is persisted in the database correctly
- [ ] Vendor shortlist is properly stored and enforced
- [ ] Expiry date is correctly validated and applied
- [ ] RFQ line items are properly stored
- [ ] Attachments can be associated with RFQs
- [ ] Authorization and access controls are working properly
- [ ] All related entities (RFQ lines, vendor shortlist) are correctly linked
- [ ] Error handling works for invalid inputs

## Production Validation Tests
Run the production acceptance test script:

```bash
python test_rfq_creation.py
```

This script will:
1. Connect to the production API
2. Create an RFQ with test data
3. Verify that all expected functionality is working
4. Validate that the RFQ is properly stored in the database
5. Clean up test data after validation

## Test Scenarios to Verify

### Scenario 1: Standard RFQ Creation
- Input: Complete RFQ with multiple line items and vendor shortlist
- Expected: Valid RFQ created with all data preserved

### Scenario 2: RFQ with Expiry Date
- Input: RFQ with expiry date set to 10 days from creation
- Expected: RFQ created with correct expiry date and status

### Scenario 3: RFQ with Attachments
- Input: RFQ with attached specification document
- Expected: RFQ created with attachment properly linked

## Troubleshooting
If issues occur:
- Verify that all required fields are provided in the request
- Check that the user has appropriate permissions to create RFQs
- Ensure the database connection is working properly
- Validate that feature flags are properly configured
- Confirm that vendor IDs in the shortlist exist in the database
- Verify that the RFQ creation endpoint is accessible and returning appropriate responses