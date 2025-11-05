#!/usr/bin/env python3
"""Test for T22 - Create order from accepted quote.

This test validates the endpoint that creates an order from an accepted quote.
Input: POST /orders with an accepted quote ID
Expected: 201 with order details, or 409 on duplicate attempt
"""

import random
import sys

import requests

import test_utils
from test_utils import get_api_base_url, get_auth_headers, register_user_with_vendor


def run() -> bool:
    """Execute the test for creating an order from an accepted quote."""
    print("Testing T22 - Create order from accepted quote...")

    api_base = get_api_base_url()

    # Set up vendor and product first
    admin_headers = get_auth_headers("admin")
    if admin_headers is None:
        print("[FAIL] T22 FAILED: Could not authenticate as admin user")
        return False

    vendors_url = f"{api_base}/vendors"
    vendor_data = {"name": "Test Vendor for T22 Order Creation"}

    print(f"Creating vendor for product: POST {vendors_url}")
    try:
        vendor_response = requests.post(vendors_url, json=vendor_data, timeout=30, headers=admin_headers)
        if vendor_response.status_code != 201:
            print(f"[FAIL] T22 FAILED: Could not create vendor for product - status {vendor_response.status_code}")
            return False
        vendor_id = vendor_response.json().get("id")
        if not vendor_id:
            print("[FAIL] T22 FAILED: Could not extract vendor ID from response")
            return False
        print(f"Created vendor with ID: {vendor_id}")

        previous_token = test_utils.auth_token
        vendor_email = f"t22_vendor_{random.randint(100000, 999999)}@example.com"
        if not register_user_with_vendor(
            vendor_id,
            email=vendor_email,
            password="112233445566",
            full_name="T22 Vendor User",
        ):
            print("[FAIL] T22 FAILED: Could not provision vendor user for quote submission")
            return False
        vendor_token = test_utils.auth_token
        test_utils.ROLE_TOKENS["vendor"] = vendor_token
        vendor_headers = {"Content-Type": "application/json", "Authorization": f"Bearer {vendor_token}"}
        test_utils.auth_token = previous_token

        products_url = f"{api_base}/products"
        product_sku = f"T22_SKU_{random.randint(1000, 9999)}"
        product_data = {
            "vendorId": vendor_id,
            "sku": product_sku,
            "name": "Test Product for T22 Order",
            "description": "Product for testing order creation from quote",
            "price": 50.00,
            "category": "test",
        }

        print(f"Creating product: POST {products_url}")
        product_response = requests.post(products_url, json=product_data, timeout=30, headers=admin_headers)
        if product_response.status_code != 201:
            print(f"[FAIL] T22 FAILED: Could not create product for testing - status {product_response.status_code}")
            return False
        product_id = product_response.json().get("id")
        if not product_id:
            print("[FAIL] T22 FAILED: Could not extract product ID from response")
            return False
        print(f"Created product with ID: {product_id}")

        # Create RFQ as buyer
        buyer_headers = get_auth_headers("buyer")
        if buyer_headers is None:
            print("[FAIL] T22 FAILED: Could not authenticate as buyer user")
            return False

        rfqs_url = f"{api_base}/rfqs"
        rfq_data = {
            "title": "Test RFQ for order creation from quote",
            "notes": "Testing order creation from accepted quote",
        }

        print(f"Creating RFQ: POST {rfqs_url}")
        rfq_response = requests.post(rfqs_url, json=rfq_data, timeout=30, headers=buyer_headers)
        if rfq_response.status_code != 201:
            print(f"[FAIL] T22 FAILED: Could not create RFQ for testing - status {rfq_response.status_code}")
            return False

        rfq_id = rfq_response.json().get("id")
        if not rfq_id:
            print("[FAIL] T22 FAILED: Could not extract RFQ ID from response")
            return False

        print(f"Created RFQ with ID: {rfq_id}")

        # Add line to RFQ
        rfq_lines_url = f"{api_base}/rfqs/{rfq_id}/lines"
        line_data = {
            "productId": product_id,
            "quantity": 5,
            "uom": "each",
            "description": "Test RFQ line for order creation test",
        }

        print(f"Adding line to RFQ: POST {rfq_lines_url}")
        line_response = requests.post(rfq_lines_url, json=line_data, timeout=30, headers=buyer_headers)
        if line_response.status_code != 201:
            print(f"[FAIL] T22 FAILED: Could not add line to RFQ - status {line_response.status_code}")
            print(f"Response: {line_response.text}")
            return False

        rfq_line_id = line_response.json().get("id")
        if not rfq_line_id:
            print("[FAIL] T22 FAILED: Could not extract RFQ line ID from response")
            return False

        print(f"Added line with ID: {rfq_line_id}")

        # Issue the RFQ
        issue_url = f"{api_base}/rfqs/{rfq_id}/issue"
        print(f"Issuing RFQ: POST {issue_url}")
        issue_response = requests.post(issue_url, timeout=30, headers=buyer_headers)
        if issue_response.status_code != 200:
            print(f"[FAIL] T22 FAILED: Could not issue RFQ - status {issue_response.status_code}")
            return False

        print("RFQ issued successfully")

        # Submit a quote as vendor
        quotes_url = f"{api_base}/rfqs/{rfq_id}/quotes"
        quote_data = {
            "vendorId": vendor_id,
            "notes": "Test quote for order creation",
            "lines": [
                {
                    "rfqLineId": rfq_line_id,
                    "unitPrice": 100.0,
                    "quantity": 5,
                    "uom": "each",
                    "description": "Quote line for order creation",
                    "currency": "USD",
                    "leadTimeDays": 5
                }
            ]
        }

        print(f"Submitting quote: POST {quotes_url}")
        quote_response = requests.post(quotes_url, json=quote_data, timeout=30, headers=vendor_headers)
        if quote_response.status_code != 201:
            print(f"[FAIL] T22 FAILED: Could not submit quote - status {quote_response.status_code}")
            return False

        quote_id = quote_response.json().get("id")
        if not quote_id:
            print("[FAIL] T22 FAILED: Could not extract quote ID from response")
            return False

        print(f"Submitted quote with ID: {quote_id}")

        # Accept the quote as buyer
        accept_url = f"{api_base}/rfqs/{rfq_id}/quotes/{quote_id}/accept"
        print(f"Accepting quote: POST {accept_url}")
        accept_response = requests.post(accept_url, timeout=30, headers=buyer_headers)
        if accept_response.status_code != 200:
            print(f"[FAIL] T22 FAILED: Could not accept quote - status {accept_response.status_code}")
            return False

        print("Quote accepted successfully")

        # Now create an order from the accepted quote
        orders_url = f"{api_base}/orders"
        order_data = {
            "quoteId": quote_id
        }

        print(f"Creating order from accepted quote: POST {orders_url}")
        order_response = requests.post(orders_url, json=order_data, timeout=30, headers=buyer_headers)
        print(f"Status Code: {order_response.status_code}")
        if order_response.status_code == 201:
            try:
                order_json = order_response.json()
                order_id = order_json.get("id")
                
                if order_id:
                    print(f"[PASS] T22.1 PASSED: Successfully created order from accepted quote. Order ID: {order_id}")

                    # Verify that re-attempting to create an order with the same quote returns 409
                    duplicate_response = requests.post(orders_url, json=order_data, timeout=30, headers=buyer_headers)
                    print(f"Duplicate order creation Status Code: {duplicate_response.status_code}")
                    
                    if duplicate_response.status_code == 409:
                        print("[PASS] T22.2 PASSED: Duplicate order creation correctly returns 409 Conflict")
                        
                        # Overall success
                        print("\n[PASS] T22 PASSED: Create order from accepted quote working correctly")
                        return True
                    else:
                        print(f"[FAIL] T22.2 FAILED: Duplicate order creation should return 409 but returned {duplicate_response.status_code}")
                        return False
                else:
                    print("[FAIL] T22.1 FAILED: Order creation 201 response didn't include an ID")
                    return False
            except ValueError:
                print("[FAIL] T22.1 FAILED: Order response is not valid JSON")
                return False
        else:
            print(f"[FAIL] T22.1 FAILED: Failed to create order from accepted quote - status {order_response.status_code}")
            return False

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T22 FAILED: Request error - {exc}")
        return False


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
