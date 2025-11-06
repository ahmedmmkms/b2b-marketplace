# E2E Happy Path Test Script

This script performs an end-to-end test of the complete business flow: **seed → browse → RFQ → quote → accept → order → top-up → pay**.

## Files Included

1. `e2e_happy_path_test.py` - Python-based E2E test script using requests library
2. `e2e_happy_path_test.sh` - Bash script with curl commands (Unix/Linux/Mac compatible)
3. `e2e_happy_path_test.bat` - Batch script for Windows (simplified version)

## Test Flow

The script covers the following sequence:

1. **Health Check** - Verify API is running
2. **Authentication** - Login as admin user
3. **Vendor Creation** - Create vendor organization
4. **Product Creation** - Create a product in the catalog
5. **Browse Products** - Public endpoint to browse products
6. **Product Detail** - Get specific product details
7. **Buyer Authentication** - Login as buyer user
8. **RFQ Creation** - Create a Request for Quotation
9. **RFQ Line Addition** - Add product lines to the RFQ
10. **RFQ Issuing** - Issue the RFQ to move from draft to issued state
11. **Vendor Authentication** - Login as vendor user
12. **Quote Submission** - Submit a quote for the RFQ
13. **Quote Listing** - List all quotes for the RFQ
14. **Quote Acceptance** - Accept the vendor's quote
15. **Order Creation** - Create an order from the accepted quote
16. **Order Details** - Get order information
17. **Wallet Balance** - Check buyer's wallet balance
18. **Wallet Top-up** - Add funds to the buyer's wallet
19. **Payment Processing** - Pay the order using wallet funds

## Prerequisites

- Running backend service (default: http://localhost:8080)
- Database with seeded test data
- Note: If test users don't exist in the database, the script will automatically create fallback users during execution (this is normal behavior)

## Expected Behavior

The E2E script includes robust fallback mechanisms:
- If admin login fails, it will fail gracefully
- If buyer/vendor login fails, it will automatically provision fallback users 
- The script handles authentication failures by creating new users as needed, following the same pattern as the existing test utilities

## Usage

### Python Script (Recommended)
```bash
# Using default API URL (http://localhost:8080)
python e2e_happy_path_test.py

# Using custom API URL
API_URL_BASE=https://your-api.com python e2e_happy_path_test.py
```

### Bash Script (Unix/Linux/Mac)
```bash
# Make executable
chmod +x e2e_happy_path_test.sh

# Run with default API URL
./e2e_happy_path_test.sh

# Run with custom API URL
API_URL_BASE=https://your-api.com ./e2e_happy_path_test.sh
```

### Batch Script (Windows)
```cmd
REM Using default API URL
e2e_happy_path_test.bat

REM Using custom API URL (set environment variable first)
set API_URL_BASE=https://your-api.com
e2e_happy_path_test.bat
```

## Expected Results

Upon successful execution, the script will complete all steps in the flow and output:
```
==========================================
E2E Happy Path Test - COMPLETE SUCCESS
==========================================
Flow executed successfully:
- Health check
- Authenticated admin user
- Created vendor organization
- Created product
- Browsed products
- Got product detail
- Authenticated buyer user
- Created RFQ and added line
- Issued RFQ
- Authenticated vendor user
- Submitted quote
- Listed quotes
- Accepted quote
- Created order
- Got order details
- Got wallet details
- Topped-up wallet
- Paid order

All steps passed with no failures!
```