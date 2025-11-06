#!/bin/bash
# E2E Happy Path Test Script
# Covers: seed → browse → RFQ → quote → accept → order → top-up → pay

set -e  # Exit on any error

API_BASE_URL="${API_URL_BASE:-http://localhost:8080}"
echo "Testing against API: $API_BASE_URL"

echo "==========================================="
echo "E2E Happy Path Test - Complete Flow"
echo "==========================================="

# Function to make API calls and extract JSON values
api_call() {
    local method=$1
    local endpoint=$2
    local data=$3
    local headers=$4
    local expected_status=$5
    
    echo "[$method] $API_BASE_URL$endpoint"
    
    if [ -n "$data" ]; then
        echo "Payload: $data"
        response=$(curl -s -w "\n%{http_code}" -X $method "$API_BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -H "$headers" \
            -d "$data")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$API_BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -H "$headers")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    response_body=$(echo "$response" | sed '$d')
    
    echo "Status: $http_code"
    echo "Response: $response_body"
    
    if [ "$http_code" -eq "$expected_status" ]; then
        echo "✓ Expected status $expected_status received"
        echo ""
        echo "$response_body"
        return 0
    else
        echo "✗ Expected status $expected_status, got $http_code"
        exit 1
    fi
}

# Step 1: Seed the database 
echo "1. Seeding the database (simulated)..."
# In a real scenario, we would run the seed script here
echo "Database seeded with organizations, users, products, etc."

# Step 2: Health check
echo "2. Health check..."
api_call "GET" "/actuator/health" "" "" 200

# Step 3: Register and authenticate admin user
echo "3. Register and authenticate admin user..."
# We'll use the default admin credentials from test-users.md
ADMIN_EMAIL="admin@admin.com"
ADMIN_PASSWORD="112233445566"

# Login as admin
login_response=$(curl -s -X POST "$API_BASE_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$ADMIN_EMAIL\", \"password\":\"$ADMIN_PASSWORD\"}")

if [ $? -ne 0 ]; then
    echo "✗ Login failed"
    exit 1
fi

admin_token=$(echo "$login_response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
echo "Admin token: $admin_token"

if [ -z "$admin_token" ]; then
    echo "✗ No token returned from login"
    exit 1
fi

admin_auth_header="Authorization: Bearer $admin_token"

# Step 4: Create vendor organization
echo "4. Create vendor organization..."
vendor_response=$(api_call "POST" "/vendors" '{"name":"Test Vendor Inc."}' "$admin_auth_header" 201)
vendor_id=$(echo "$vendor_response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Created vendor ID: $vendor_id"

# Step 5: Create a product
echo "5. Create a product..."
product_response=$(api_call "POST" "/products" "{\"vendorId\":\"$vendor_id\", \"sku\":\"TEST-PROD-001\", \"name\":\"Test Product\", \"description\":\"Test product for E2E\", \"category\":\"test\", \"referencePrice\":99.99}" "$admin_auth_header" 201)
product_id=$(echo "$product_response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Created product ID: $product_id"

# Step 6: Browse products (public endpoint)
echo "6. Browse products..."
browse_response=$(api_call "GET" "/products" "" "" 200)
echo "Products browsed successfully"

# Step 7: Get product detail (public endpoint)
echo "7. Get product detail..."
api_call "GET" "/products/$product_id" "" "" 200

# Step 8: Register and authenticate buyer user
echo "8. Register and authenticate buyer user..."
BUYER_EMAIL="buyer@test.example"
BUYER_PASSWORD="112233445566"

# Login as buyer
login_response=$(curl -s -X POST "$API_BASE_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$BUYER_EMAIL\", \"password\":\"$BUYER_PASSWORD\"}")

buyer_token=$(echo "$login_response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
echo "Buyer token: $buyer_token"

if [ -z "$buyer_token" ]; then
    echo "✗ Buyer login failed"
    exit 1
fi

buyer_auth_header="Authorization: Bearer $buyer_token"

# Step 9: Create RFQ
echo "9. Create RFQ..."
rfq_response=$(api_call "POST" "/rfqs" "{\"title\":\"Test RFQ for E2E\", \"notes\":\"Testing end-to-end flow\"}" "$buyer_auth_header" 201)
rfq_id=$(echo "$rfq_response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Created RFQ ID: $rfq_id"

# Step 10: Add RFQ line 
echo "10. Add RFQ line..."
rfq_line_response=$(api_call "POST" "/rfqs/$rfq_id/lines" "{\"productId\":\"$product_id\", \"description\":\"Test product line\", \"quantity\":10, \"uom\":\"EA\", \"targetPrice\":100.00}" "$buyer_auth_header" 201)
rfq_line_id=$(echo "$rfq_line_response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Created RFQ line ID: $rfq_line_id"

# Step 11: Issue the RFQ
echo "11. Issue the RFQ..."
api_call "POST" "/rfqs/$rfq_id/issue" "" "$buyer_auth_header" 200
echo "RFQ issued successfully"

# Step 12: Register and authenticate vendor user
echo "12. Register and authenticate vendor user..."
VENDOR_USER_EMAIL="vendor@test.example"

# Login as vendor
login_response=$(curl -s -X POST "$API_BASE_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$VENDOR_USER_EMAIL\", \"password\":\"$VENDOR_PASSWORD\"}")

vendor_token=$(echo "$login_response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

# Use different token for vendor
if [ -z "$vendor_token" ]; then
    echo "✗ Vendor login failed - trying with buyer creds for vendor test"
    # Use admin to create vendor user
    vendor_register_response=$(curl -s -X POST "$API_BASE_URL/auth/register" \
        -H "Content-Type: application/json" \
        -H "$admin_auth_header" \
        -d "{\"email\":\"vendor1@vendor.com\", \"password\":\"112233445566\", \"fullName\":\"Vendor User\", \"orgId\":\"$vendor_id\"}")
    
    vendor_login_response=$(curl -s -X POST "$API_BASE_URL/auth/login" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"vendor1@vendor.com\", \"password\":\"112233445566\"}")
    
    vendor_token=$(echo "$vendor_login_response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    
    if [ -z "$vendor_token" ]; then
        echo "✗ Could not authenticate vendor user"
        exit 1
    fi
fi

vendor_auth_header="Authorization: Bearer $vendor_token"

# Step 13: Submit quote for the RFQ
echo "13. Submit quote for the RFQ..."
quote_response=$(api_call "POST" "/rfqs/$rfq_id/quotes" "{\"vendorId\":\"$vendor_id\", \"currency\":\"USD\", \"validUntil\":\"$(date -d '+30 days' -u +%Y-%m-%dT%H:%M:%S.%3NZ)\", \"notes\":\"Test quote for E2E\", \"lines\":[{\"rfqLineId\":\"$rfq_line_id\", \"productId\":\"$product_id\", \"description\":\"Test product quote\", \"quantity\":10, \"uom\":\"EA\", \"unitPrice\":95.00, \"moq\":5, \"leadTimeDays\":14}]}" "$vendor_auth_header" 201)
quote_id=$(echo "$quote_response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Created quote ID: $quote_id"

# Step 14: List quotes for the RFQ (as buyer)
echo "14. List quotes for the RFQ..."
api_call "GET" "/rfqs/$rfq_id/quotes" "" "$buyer_auth_header" 200

# Step 15: Accept the quote (as buyer)
echo "15. Accept the quote..."
api_call "POST" "/rfqs/$rfq_id/quotes/$quote_id/accept" "" "$buyer_auth_header" 200
echo "Quote accepted successfully"

# Step 16: Create order from accepted quote
echo "16. Create order from accepted quote..."
order_response=$(api_call "POST" "/orders" "{\"quoteId\":\"$quote_id\"}" "$buyer_auth_header" 201)
order_id=$(echo "$order_response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Created order ID: $order_id"

# Step 17: Get order details
echo "17. Get order details..."
api_call "GET" "/orders/$order_id" "" "$buyer_auth_header" 200

# Step 18: Get buyer wallet balance
echo "18. Get buyer wallet balance..."
wallet_response=$(api_call "GET" "/wallets/$(echo $login_response | grep -o '"id":"[^"]*"' | cut -d'"' -f4)" "" "$buyer_auth_header" 200)
wallet_id=$(echo "$wallet_response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Wallet ID: $wallet_id"

# Step 19: Top-up wallet (as admin/support)
echo "19. Top-up wallet..."
api_call "POST" "/wallets/$wallet_id/topups" "{\"amount\":1000.00, \"currency\":\"USD\"}" "$admin_auth_header" 201

# Step 20: Pay the order using wallet
echo "20. Pay the order using wallet..."
payment_response=$(api_call "POST" "/orders/$order_id/pay/wallet" "{\"idempotencyKey\":\"e2e-test-$(date +%s)\"}" "$buyer_auth_header" 200)
echo "Order payment successful"

echo "==========================================="
echo "E2E Happy Path Test - COMPLETE SUCCESS"
echo "==========================================="
echo "Flow executed successfully:"
echo "- Seeded database (simulated)"
echo "- Browsed products"
echo "- Created RFQ and added line"
echo "- Issued RFQ"
echo "- Submitted quote"
echo "- Accepted quote" 
echo "- Created order"
echo "- Topped-up wallet"
echo "- Paid order"
echo ""
echo "All steps passed with no failures!"