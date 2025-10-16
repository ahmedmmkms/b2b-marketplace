# Task 2.2 Production Deployment Acceptance Test

## Objective
Verify that the TaxLine value object works correctly in the production environment. This includes validating that TaxLine can correctly calculate tax amounts based on rate and base, and that all required functionality is accessible through the test endpoint.

## Pre-requisites
- Production deployment is accessible at: `https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net`
- The backend application includes the TaxLine value object implementation
- The TaxLine test endpoint is available at `/api/test/taxline`

## Test Steps

### 1. Verify TaxLine Implementation in Codebase
- Confirm that the `TaxLine.java` file exists in the shared kernel
- Verify that it includes fields for jurisdiction, rate, base amount, and tax amount
- Check that it includes methods for calculating tax amount and total amount
- Ensure proper validation for negative rates and null values

### 2. Build and Deploy the Application
```bash
cd backend
./mvnw clean package -DskipTests
```

### 3. Verify TaxLine Test Endpoint
Make a test request to the TaxLine test endpoint to validate functionality:

```bash
curl -X POST https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/test/taxline \
  -H "Content-Type: application/json" \
  -d '{
    "jurisdiction": "SA",
    "rate": 0.15,
    "baseAmount": 100.00,
    "currencyCode": "USD"
  }'
```

### 4. Validate Tax Calculation Accuracy
- Base amount: 100.00 USD
- Tax rate: 0.15 (15%)
- Expected tax amount: 15.00 USD
- Expected total amount: 115.00 USD

### 5. Test Multiple Tax Scenarios
Test with different tax rates and jurisdictions:

```bash
# UAE VAT (5%)
curl -X POST https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/test/taxline \
  -H "Content-Type: application/json" \
  -d '{
    "jurisdiction": "UAE",
    "rate": 0.05,
    "baseAmount": 200.00,
    "currencyCode": "AED"
  }'
```

### 6. Test Error Handling
Verify that the TaxLine properly handles invalid inputs:

```bash
# Test with negative rate (should fail)
curl -X POST https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/test/taxline \
  -H "Content-Type: application/json" \
  -d '{
    "jurisdiction": "SA",
    "rate": -0.15,
    "baseAmount": 100.00,
    "currencyCode": "USD"
  }'
```

## Expected Results
- TaxLine object successfully calculates tax amounts based on rate and base
- For 15% tax on 100.00 USD, the tax amount should be 15.00 USD
- Total amount (base + tax) should be correctly calculated
- Tax rate can be accessed both as decimal and percentage
- Proper validation prevents invalid inputs (negative rates, null values)
- TaxLine is immutable and follows value object patterns
- API response includes all necessary tax calculation fields

## Success Criteria
- [ ] TaxLine value object is properly implemented in the shared kernel
- [ ] TaxLine correctly calculates tax amounts based on rate and base
- [ ] TaxLine test endpoint returns expected values for valid inputs
- [ ] TaxLine properly validates inputs and rejects invalid ones
- [ ] TaxLine includes methods for getting rate as percentage and total amount
- [ ] All fields (jurisdiction, rate, base amount, tax amount) are accessible
- [ ] API response includes all required tax calculation information
- [ ] Tax calculations are mathematically accurate
- [ ] Error handling works correctly for invalid inputs

## Production Validation Tests
Run the production acceptance test script:

```bash
python test_taxline_value_object.py
```

This script will:
1. Validate TaxLine operations concept locally
2. Test TaxLine functionality via the dedicated API endpoint
3. Verify various TaxLine scenarios (different rates)
4. Confirm that all required functionality is working in the production environment

## Test Scenarios to Verify

### Scenario 1: Standard VAT Calculation
- Input: Jurisdiction "SA", Rate 0.15, Base Amount 100.00 USD
- Expected: Tax Amount 15.00 USD, Total Amount 115.00 USD

### Scenario 2: Different VAT Rate
- Input: Jurisdiction "UAE", Rate 0.05, Base Amount 200.00 AED
- Expected: Tax Amount 10.00 AED, Total Amount 210.00 AED

### Scenario 3: Zero Rate
- Input: Jurisdiction "EXEMPT", Rate 0.0, Base Amount 150.00 USD
- Expected: Tax Amount 0.00 USD, Total Amount 150.00 USD

## Troubleshooting
If issues occur:
- Verify that the TaxLine.java file has been properly implemented
- Check that the TaxLineTestController is correctly configured
- Ensure the endpoint is accessible and returning appropriate responses
- Confirm that all required dependencies are available
- Validate that the Money value object (dependency) is working correctly