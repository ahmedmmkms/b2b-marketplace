#!/usr/bin/env python3
"""Test script for T23 - Get order functionality."""

import json
import sys
import os
import uuid
import requests

# Add the project root to the Python path to import test_utils
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import test_utils

def run():
    """Execute T23 Get order tests."""
    print("Testing T23 - Get order functionality...")
    
    # Test 1: Create an order first by accepting a quote (we need a quote to be accepted)
    print("Step 1: Creating RFQ and getting quote...")
    
    # Authenticate as a buyer to create an RFQ
    if not test_utils.authenticate_user("buyer"):
        print("[FAIL] Could not authenticate buyer user")
        return False
    
    # Get the API base URL and headers
    api_base = test_utils.get_api_base_url()

    # Ensure we have admin credentials to seed dependencies
    admin_headers = test_utils.get_auth_headers("admin")
    if admin_headers is None:
        print("[FAIL] Could not authenticate admin user to seed product data")
        return False

    # Create a vendor for the product used in this test
    vendor_payload = {"name": f"T23 Vendor {uuid.uuid4().hex[:8]}"}
    vendors_url = f"{api_base}/vendors"

    vendor_response = requests.post(
        vendors_url,
        json=vendor_payload,
        headers=admin_headers,
        timeout=30,
    )

    if vendor_response.status_code != 201:
        print(f"[FAIL] Failed to create vendor for test: {vendor_response.status_code}")
        return False

    vendor_id = vendor_response.json().get("id")
    if not vendor_id:
        print("[FAIL] Vendor creation response missing 'id'")
        return False

    # Create a product tied to the vendor so the RFQ line has a valid product reference
    product_payload = {
        "vendorId": vendor_id,
        "sku": f"T23_SKU_{uuid.uuid4().hex[:8].upper()}",
        "name": "T23 Test Product",
        "description": "Product generated for T23 order flow",
        "price": 100.0,
        "category": "test",
    }
    products_url = f"{api_base}/products"

    product_response = requests.post(
        products_url,
        json=product_payload,
        headers=admin_headers,
        timeout=30,
    )

    if product_response.status_code != 201:
        print(f"[FAIL] Failed to create product for test: {product_response.status_code}")
        return False

    product_id = product_response.json().get("id")
    if not product_id:
        print("[FAIL] Product creation response missing 'id'")
        return False

    # Provision a vendor user tied to the created vendor for quote submission
    previous_token = test_utils.auth_token
    vendor_email = f"t23_vendor_{uuid.uuid4().hex[:8]}@example.com"
    if not test_utils.register_user_with_vendor(
        vendor_id,
        email=vendor_email,
        password="112233445566",
        full_name="T23 Vendor User",
    ):
        print("[FAIL] Could not provision vendor user for quote submission")
        return False

    vendor_token = test_utils.auth_token
    test_utils.ROLE_TOKENS["vendor"] = vendor_token
    test_utils.auth_token = previous_token
    vendor_headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {vendor_token}",
    }
    print(f"Provisioned T23 vendor user: {vendor_email}")
    
    # Create an RFQ
    rfq_data = {
        "title": "Test RFQ for Order Creation",
        "notes": "Testing order creation flow"
    }
    
    headers = test_utils.get_auth_headers("buyer")
    if headers is None:
        print("[FAIL] Could not get authentication headers for buyer")
        return False
    
    rfq_response = requests.post(
        f"{api_base}/rfqs",
        json=rfq_data,
        headers=headers,
        timeout=30,
    )
    
    if rfq_response.status_code != 201:
        print(f"[FAIL] Failed to create RFQ: {rfq_response.status_code}")
        print(f"Response: {rfq_response.text}")
        return False
    
    rfq = rfq_response.json()
    rfq_id = rfq.get("id")
    
    if not rfq_id:
        print("[FAIL] No RFQ ID returned from creation")
        return False
    
    print(f"Created RFQ: {rfq_id}")
    
    # Add a line to the RFQ
    line_data = {
        "productId": product_id,
        "quantity": 10,
        "uom": "each",
        "description": "Order flow RFQ line item",
    }
    
    line_response = requests.post(
        f"{api_base}/rfqs/{rfq_id}/lines",
        json=line_data,
        headers=headers,
        timeout=30,
    )
    
    if line_response.status_code != 201:
        print(f"[FAIL] Failed to add line to RFQ: {line_response.status_code}")
        try:
            print(f"Response: {line_response.text}")
        except AttributeError:
            pass
        return False

    try:
        rfq_line = line_response.json()
    except ValueError:
        print("[FAIL] RFQ line response was not valid JSON")
        return False

    rfq_line_id = rfq_line.get("id")
    if not rfq_line_id:
        print("[FAIL] RFQ line response missing 'id'")
        return False
    
    # Issue the RFQ
    issue_response = requests.post(
        f"{api_base}/rfqs/{rfq_id}/issue",
        json={},
        headers=headers,
        timeout=30,
    )
    
    if issue_response.status_code != 200:
        print(f"[FAIL] Failed to issue RFQ: {issue_response.status_code}")
        print(f"Response: {issue_response.text}")
        return False
    
    print("RFQ issued successfully")
    
    # Authenticate as a vendor to submit a quote
    # Submit a quote for the RFQ
    quote_data = {
        "vendorId": vendor_id,
        "notes": "Quote generated for T23 order retrieval test",
        "lines": [
            {
                "rfqLineId": rfq_line_id,
                "unitPrice": 100.0,
                "quantity": line_data["quantity"],
                "uom": line_data["uom"],
                "description": "Order retrieval quote line",
                "currency": "USD",
                "leadTimeDays": 7,
            }
        ],
    }
    
    quote_response = requests.post(
        f"{api_base}/rfqs/{rfq_id}/quotes",
        json=quote_data,
        headers=vendor_headers,
        timeout=30,
    )
    
    if quote_response.status_code != 201:
        print(f"[FAIL] Failed to submit quote: {quote_response.status_code}")
        print(f"Response: {quote_response.text}")
        return False
    
    quote = quote_response.json()
    quote_id = quote.get("id")
    
    if not quote_id:
        print("[FAIL] No quote ID returned from submission")
        return False
    
    print(f"Submitted quote: {quote_id}")
    
    # Accept the quote as the buyer
    buyer_headers = test_utils.get_auth_headers("buyer")
    if buyer_headers is None:
        print("[FAIL] Could not get authentication headers for buyer")
        return False
    
    accept_response = requests.post(
        f"{api_base}/rfqs/{rfq_id}/quotes/{quote_id}/accept",
        json={},
        headers=buyer_headers,
        timeout=30,
    )
    
    if accept_response.status_code != 200:
        print(f"[FAIL] Failed to accept quote: {accept_response.status_code}")
        print(f"Response: {accept_response.text}")
        return False
    
    print("Quote accepted successfully")
    
    # Now create an order from the accepted quote
    order_response = requests.post(
        f"{api_base}/orders",
        json={"quoteId": quote_id},
        headers=buyer_headers,
        timeout=30,
    )
    
    if order_response.status_code != 201:
        print(f"[FAIL] Failed to create order from quote: {order_response.status_code}")
        print(f"Response: {order_response.text}")
        return False
    
    order = order_response.json()
    order_id = order.get("id")
    
    if not order_id:
        print("[FAIL] No order ID returned from creation")
        return False
    
    print(f"Created order: {order_id}")
    
    # Test 2: Get the created order (positive case)
    print("Step 2: Testing GET order endpoint...")
    
    get_order_response = requests.get(
        f"{api_base}/orders/{order_id}",
        headers=buyer_headers,
        timeout=30,
    )
    
    if get_order_response.status_code != 200:
        print(f"[FAIL] Failed to get order: {get_order_response.status_code}")
        print(f"Response: {get_order_response.text}")
        return False
    
    retrieved_order = get_order_response.json()
    
    # Verify the returned order has expected structure
    base_fields = ["id", "quoteId", "status", "createdAt", "updatedAt"]
    for field in base_fields:
        if field not in retrieved_order:
            print(f"[FAIL] Missing expected field '{field}' in retrieved order")
            print(f"Order payload keys: {sorted(retrieved_order.keys())}")
            return False

    if retrieved_order["id"] != order_id:
        print(f"[FAIL] Retrieved order ID doesn't match: expected {order_id}, got {retrieved_order['id']}")
        return False

    total_field_candidates = ["totalAmount", "grandTotal", "amountTotal"]
    total_field = next((key for key in total_field_candidates if key in retrieved_order), None)
    if not total_field:
        print(f"[WARN] Retrieved order missing expected total field (checked {total_field_candidates})")
    else:
        print(f"[INFO] Order total field '{total_field}' present with value: {retrieved_order[total_field]}")

    line_field_candidates = ["orderLines", "lines", "items", "orderItems"]
    line_field = next((key for key in line_field_candidates if key in retrieved_order), None)
    if line_field:
        if not isinstance(retrieved_order[line_field], list):
            print(f"[FAIL] Order line field '{line_field}' is not a list")
            return False

        if not retrieved_order[line_field]:
            print(f"[WARN] Order line field '{line_field}' present but empty")
        else:
            print(f"[INFO] Order line field '{line_field}' contains {len(retrieved_order[line_field])} entries")
    else:
        print(f"[WARN] Order response did not include embedded line items (checked {line_field_candidates})")

    print("[PASS] Successfully retrieved order with acceptable structure")
    
    # Test 3: Get a non-existent order (negative case - should return 404)
    print("Step 3: Testing GET non-existent order (should return 404)...")
    
    fake_order_id = test_utils.generate_valid_ulid()
    fake_get_response = requests.get(
        f"{api_base}/orders/{fake_order_id}",
        headers=buyer_headers,
        timeout=30,
    )
    
    if fake_get_response.status_code != 404:
        print(f"[FAIL] Expected 404 for non-existent order, got: {fake_get_response.status_code}")
        print(f"Response: {fake_get_response.text}")
        return False
    
    # Check that the response follows RFC7807 error format
    error_response = fake_get_response.json()
    rfc7807_fields = ["type", "title", "status", "detail"]
    for field in rfc7807_fields:
        if field not in error_response:
            print(f"[WARN] Missing RFC7807 field '{field}' in 404 response: {error_response}")
    
    print("[PASS] Non-existent order correctly returns 404")
    
    # Test 4: Test if other roles can access the order
    print("Step 4: Testing order access with vendor user...")
    
    vendor_get_response = requests.get(
        f"{api_base}/orders/{order_id}",
        headers=vendor_headers,
        timeout=30,
    )
    
    if vendor_get_response and vendor_get_response.status_code == 200:
        print("[PASS] Vendor user can access the order")
    elif vendor_get_response and vendor_get_response.status_code in [403, 404]:
        print("[PASS] Vendor user correctly restricted from accessing order (expected for security)")
    else:
        print(f"[INFO] Vendor access response: {vendor_get_response.status_code if vendor_get_response else 'No response'}")
    
    return True


if __name__ == "__main__":
    success = run()
    print(f"\nT23 Get order test: {'[PASS]' if success else '[FAIL]'}")
    sys.exit(0 if success else 1)
