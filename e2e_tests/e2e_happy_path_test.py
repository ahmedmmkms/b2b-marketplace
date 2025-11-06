#!/usr/bin/env python3
"""
E2E Happy Path Test Script
Covers: seed → browse → RFQ → quote → accept → order → top-up → pay
"""

import json
import os
import random
import sys
import time
from datetime import datetime, timedelta, timezone

import requests

def get_api_base_url():
    """Get the API base URL from environment variable or use default."""
    return os.environ.get("API_URL_BASE", "http://localhost:8080")

def make_api_call(method, endpoint, data=None, headers=None, expected_status=200):
    """Make an API call and validate the response."""
    api_base = get_api_base_url()
    url = f"{api_base}{endpoint}"
    
    print(f"[{method}] {url}")
    if data:
        print(f"Payload: {json.dumps(data, indent=2)}")
    
    try:
        response = requests.request(method, url, json=data, headers=headers, timeout=30)
        print(f"Status Code: {response.status_code}")
        
        try:
            response_json = response.json()
            print(f"Response: {json.dumps(response_json, indent=2)}")
        except ValueError:
            print(f"Response: {response.text}")
            response_json = response.text
        
        if response.status_code == expected_status:
            print(f"✓ Expected status {expected_status} received")
            print("")
            return response_json
        else:
            print(f"X Expected status {expected_status}, got {response.status_code}")
            sys.exit(1)
    except requests.exceptions.RequestException as e:
        print(f"X Request failed: {e}")
        sys.exit(1)

def run_e2e_test():
    """Execute the complete E2E flow."""
    print("=" * 60)
    print("E2E Happy Path Test - Complete Flow")
    print("=" * 60)
    
    api_base = get_api_base_url()
    print(f"Testing against API: {api_base}")
    
    # Step 1: Health check
    print("1. Health check...")
    make_api_call("GET", "/actuator/health", expected_status=200)
    
    # Step 2: Authenticate admin user
    print("2. Authenticating admin user...")
    admin_login_response = requests.post(
        f"{api_base}/auth/login",
        json={"email": "admin@admin.com", "password": "112233445566"},
        timeout=30
    )
    
    if admin_login_response.status_code != 200:
        print(f"✗ Admin login failed: {admin_login_response.status_code}")
        print(f"Response: {admin_login_response.text}")
        sys.exit(1)
    
    admin_token = admin_login_response.json().get("token")
    if not admin_token:
        print("✗ No admin token returned from login")
        sys.exit(1)
    
    admin_headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {admin_token}"
    }
    print(f"Admin token: {admin_token[:10]}...")
    
    # Step 3: Create vendor organization
    print("3. Creating vendor organization...")
    vendor_response = make_api_call(
        "POST", 
        "/vendors", 
        {"name": f"Test Vendor {random.randint(1000, 9999)}"}, 
        admin_headers, 
        201
    )
    vendor_id = vendor_response["id"]
    print(f"Created vendor ID: {vendor_id}")
    
    # Step 4: Create a product
    print("4. Creating a product...")
    product_response = make_api_call(
        "POST", 
        "/products", 
        {
            "vendorId": vendor_id,
            "sku": f"TEST-PROD-{random.randint(1000, 9999)}",
            "name": "Test Product for E2E",
            "description": "Test product for end-to-end testing",
            "category": "test",
            "referencePrice": 99.99
        }, 
        admin_headers, 
        201
    )
    product_id = product_response["id"]
    print(f"Created product ID: {product_id}")
    
    # Step 5: Browse products (public endpoint)
    print("5. Browsing products...")
    browse_response = make_api_call("GET", "/products", expected_status=200)
    print(f"Found {browse_response['total']} products")
    
    # Step 6: Get product detail (public endpoint)
    print("6. Getting product detail...")
    make_api_call("GET", f"/products/{product_id}", expected_status=200)
    
    # Step 7: Authenticate buyer user
    print("7. Authenticating buyer user...")
    buyer_login_response = requests.post(
        f"{api_base}/auth/login",
        json={"email": "buyer@test.example", "password": "112233445566"},
        timeout=30
    )
    
    if buyer_login_response.status_code != 200:
        print(f"✗ Buyer login failed: {buyer_login_response.status_code}")
        print(f"Response: {buyer_login_response.text}")
        
        # Create a fallback buyer as admin
        print("  Creating fallback buyer user...")
        fallback_vendor_response = make_api_call(
            "POST", 
            "/vendors", 
            {"name": f"Fallback Buyer Org {random.randint(1000, 9999)}"}, 
            admin_headers, 
            201
        )
        fallback_vendor_id = fallback_vendor_response["id"]
        
        # Register buyer user with fallback org
        register_response = requests.post(
            f"{api_base}/auth/register",
            json={
                "email": f"auto_buyer_{int(time.time())}@example.com",
                "password": "112233445566",
                "fullName": "Auto Buyer User",
                "orgId": fallback_vendor_id
            },
            timeout=30
        )
        
        if register_response.status_code not in [200, 201]:
            print(f"✗ Buyer registration failed: {register_response.status_code}")
            sys.exit(1)
        
        buyer_token = register_response.json().get("token")
        if not buyer_token:
            print("✗ No buyer token after registration")
            sys.exit(1)
    else:
        buyer_token = buyer_login_response.json().get("token")
        if not buyer_token:
            print("✗ No buyer token returned from login")
            sys.exit(1)
    
    buyer_headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {buyer_token}"
    }
    print(f"Buyer token: {buyer_token[:10]}...")
    
    # Step 8: Create RFQ
    print("8. Creating RFQ...")
    rfq_response = make_api_call(
        "POST", 
        "/rfqs", 
        {
            "title": f"Test RFQ for E2E {random.randint(1000, 9999)}",
            "notes": "Testing end-to-end flow"
        }, 
        buyer_headers, 
        201
    )
    rfq_id = rfq_response["id"]
    print(f"Created RFQ ID: {rfq_id}")
    
    # Step 9: Add RFQ line
    print("9. Adding RFQ line...")
    rfq_line_response = make_api_call(
        "POST", 
        f"/rfqs/{rfq_id}/lines", 
        {
            "productId": product_id,
            "description": "Test product line",
            "quantity": 10,
            "uom": "EA",
            "targetPrice": 100.00
        }, 
        buyer_headers, 
        201
    )
    rfq_line_id = rfq_line_response["id"]
    print(f"Created RFQ line ID: {rfq_line_id}")
    
    # Step 10: Issue the RFQ
    print("10. Issuing the RFQ...")
    make_api_call("POST", f"/rfqs/{rfq_id}/issue", headers=buyer_headers, expected_status=200)
    print("RFQ issued successfully")
    
    # Step 11: Authenticate vendor user
    print("11. Authenticating vendor user...")
    vendor_login_response = requests.post(
        f"{api_base}/auth/login",
        json={"email": "vendor@test.example", "password": "112233445566"},
        timeout=30
    )
    
    if vendor_login_response.status_code != 200:
        print(f"✗ Vendor login failed: {vendor_login_response.status_code}")
        print(f"Creating vendor user for organization {vendor_id}...")
        
        # Create vendor user
        vendor_email = f"vendor_user_{random.randint(1000, 9999)}@test.com"
        vendor_register_response = requests.post(
            f"{api_base}/auth/register",
            json={
                "email": vendor_email,
                "password": "112233445566",
                "fullName": "Vendor User",
                "orgId": vendor_id
            },
            headers=admin_headers,
            timeout=30
        )
        
        if vendor_register_response.status_code not in [200, 201]:
            print(f"✗ Vendor registration failed: {vendor_register_response.status_code}")
            sys.exit(1)
        
        # Login newly created vendor
        vendor_login_response = requests.post(
            f"{api_base}/auth/login",
            json={"email": vendor_email, "password": "112233445566"},
            timeout=30
        )
        
        if vendor_login_response.status_code != 200:
            print(f"✗ Vendor login after registration failed: {vendor_login_response.status_code}")
            sys.exit(1)
    
    vendor_token = vendor_login_response.json().get("token")
    if not vendor_token:
        print("✗ No vendor token returned from login")
        sys.exit(1)
    
    vendor_headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {vendor_token}"
    }
    print(f"Vendor token: {vendor_token[:10]}...")
    
    # Step 12: Submit quote for the RFQ
    print("12. Submitting quote for the RFQ...")
    quote_response = make_api_call(
        "POST", 
        f"/rfqs/{rfq_id}/quotes", 
        {
            "vendorId": vendor_id,
            "currency": "USD",
            "validUntil": (datetime.now(timezone.utc) + timedelta(days=30)).isoformat(),
            "notes": "Test quote for E2E",
            "lines": [
                {
                    "rfqLineId": rfq_line_id,
                    "productId": product_id,
                    "description": "Test product quote",
                    "quantity": 10,
                    "uom": "EA",
                    "unitPrice": 95.00,
                    "moq": 5,
                    "leadTimeDays": 14
                }
            ]
        }, 
        vendor_headers, 
        201
    )
    quote_id = quote_response["id"]
    print(f"Created quote ID: {quote_id}")
    
    # Step 13: List quotes for the RFQ (as buyer)
    print("13. Listing quotes for the RFQ...")
    quotes_list = make_api_call("GET", f"/rfqs/{rfq_id}/quotes", headers=buyer_headers, expected_status=200)
    print(f"Found {len(quotes_list)} quote(s)")
    
    # Step 14: Accept the quote (as buyer)
    print("14. Accepting the quote...")
    make_api_call("POST", f"/rfqs/{rfq_id}/quotes/{quote_id}/accept", headers=buyer_headers, expected_status=200)
    print("Quote accepted successfully")
    
    # Step 15: Create order from accepted quote
    print("15. Creating order from accepted quote...")
    order_response = make_api_call(
        "POST", 
        "/orders", 
        {"quoteId": quote_id}, 
        buyer_headers, 
        201
    )
    order_id = order_response["id"]
    print(f"Created order ID: {order_id}")
    
    # Step 16: Get order details
    print("16. Getting order details...")
    make_api_call("GET", f"/orders/{order_id}", headers=buyer_headers, expected_status=200)
    
    # Step 17: Get buyer's organization ID to get their wallet
    print("17. Finding buyer's organization ID...")
    current_user_response = make_api_call("GET", "/users/me", headers=buyer_headers, expected_status=200)
    buyer_org_id = current_user_response["orgId"]
    print(f"Buyer organization ID: {buyer_org_id}")
    
    # Step 18: Get buyer wallet balance
    print("18. Getting buyer wallet balance...")
    wallet_response = make_api_call("GET", f"/wallets/{buyer_org_id}", headers=buyer_headers, expected_status=200)
    wallet_id = wallet_response["id"]
    print(f"Wallet ID: {wallet_id}, Balance: {wallet_response['balance']}")
    
    # Step 19: Top-up wallet (as admin/support)
    print("19. Topping up wallet...")
    topup_response = make_api_call(
        "POST", 
        f"/wallets/{buyer_org_id}/topups", 
        {"amount": 1000.00, "currency": "USD"}, 
        admin_headers, 
        201
    )
    print(f"Wallet topped up. New balance: {topup_response.get('balance', 'N/A')}")
    
    # Step 20: Pay the order using wallet
    print("20. Paying the order using wallet...")
    payment_response = make_api_call(
        "POST", 
        f"/orders/{order_id}/pay/wallet", 
        {"idempotencyKey": f"e2e-test-{int(time.time())}"}, 
        buyer_headers, 
        200
    )
    print(f"Order payment successful: {payment_response.get('status', 'N/A')}")
    
    print("=" * 60)
    print("E2E Happy Path Test - COMPLETE SUCCESS")
    print("=" * 60)
    print("Flow executed successfully:")
    print("- Health check")
    print("- Authenticated admin user")
    print("- Created vendor organization")
    print("- Created product")
    print("- Browsed products")
    print("- Got product detail")
    print("- Authenticated buyer user")
    print("- Created RFQ and added line")
    print("- Issued RFQ")
    print("- Authenticated vendor user")
    print("- Submitted quote")
    print("- Listed quotes") 
    print("- Accepted quote")
    print("- Created order")
    print("- Got order details")
    print("- Got wallet details")
    print("- Topped-up wallet")
    print("- Paid order")
    print("")
    print("All steps passed with no failures!")
    
    return True

if __name__ == "__main__":
    success = run_e2e_test()
    sys.exit(0 if success else 1)
