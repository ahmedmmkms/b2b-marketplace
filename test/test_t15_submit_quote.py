#!/usr/bin/env python3
"""Test T15: Submit quote end-to-end."""

import random
import sys
import time

import requests

import test_utils
from test_utils import (
    get_api_base_url,
    get_auth_headers,
    register_user_with_vendor,
)


def run() -> bool:
    """Validate quote submission computes totals and enforces vendor uniqueness."""
    print("Testing T15: Submit quote")

    api_base = get_api_base_url()

    admin_headers = get_auth_headers("admin")
    if admin_headers is None:
        print("[FAIL] T15 FAILED: Could not authenticate admin user for setup")
        return False

    vendors_url = f"{api_base}/vendors"
    vendor_data = {"name": "Test Vendor for T15 Quote Submission"}

    print(f"Creating vendor for quote: POST {vendors_url}")
    try:
        vendor_response = requests.post(vendors_url, json=vendor_data, timeout=30, headers=admin_headers)
        if vendor_response.status_code != 201:
            print(f"[FAIL] T15 FAILED: Could not create vendor for quote - status {vendor_response.status_code}")
            return False
        vendor_id = vendor_response.json().get("id")

        print(f"Created vendor with ID: {vendor_id}")

        unique_email = f"t15vendor_{int(time.time())}@example.com"
        print("Registering a user associated with the vendor...")
        if not register_user_with_vendor(
            vendor_id,
            email=unique_email,
            password="112233445566",
            full_name="T15 Vendor User",
        ):
            print("[FAIL] T15 FAILED: Could not register user associated with vendor")
            return False

        vendor_token = test_utils.auth_token
        if not vendor_token:
            print("[FAIL] T15 FAILED: Vendor user registration did not return a token")
            return False

        products_url = f"{api_base}/products"
        product_sku = f"T15_SKU_{random.randint(1000, 9999)}"
        product_data = {
            "vendorId": vendor_id,
            "sku": product_sku,
            "name": "Test Product for T15 Quote",
            "description": "Product for testing quote submission functionality",
            "price": 50.00,
            "category": "test",
        }

        vendor_headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {vendor_token}",
        }

        print(f"Creating product with vendor user: POST {products_url}")
        product_response = requests.post(products_url, json=product_data, timeout=30, headers=vendor_headers)
        if product_response.status_code != 201:
            print(f"[FAIL] T15 FAILED: Could not create product for testing - status {product_response.status_code}")
            return False
        product_id = product_response.json().get("id")
        print(f"Created product with ID: {product_id}")

        buyer_headers = get_auth_headers("buyer")
        if buyer_headers is None:
            print("[FAIL] T15 FAILED: Could not authenticate buyer user for RFQ actions")
            return False

        rfqs_url = f"{api_base}/rfqs"
        rfq_data = {
            "title": "Test RFQ for quote submission",
            "description": "Test RFQ for T15 validation",
            "notes": "Test notes for the RFQ",
        }

        print(f"Creating RFQ: POST {rfqs_url}")
        rfq_response = requests.post(rfqs_url, json=rfq_data, timeout=30, headers=buyer_headers)
        if rfq_response.status_code != 201:
            print(f"[FAIL] T15 FAILED: Could not create RFQ for testing - status {rfq_response.status_code}")
            return False

        rfq_id = rfq_response.json().get("id")
        if not rfq_id:
            print("[FAIL] T15 FAILED: Could not extract RFQ ID from response")
            return False

        print(f"Created RFQ with ID: {rfq_id}")

        rfq_lines_url = f"{api_base}/rfqs/{rfq_id}/lines"
        line_data = {
            "productId": product_id,
            "quantity": 2,
            "uom": "each",
            "description": "Test RFQ line item for quote submission",
        }

        print(f"Adding line to RFQ: POST {rfq_lines_url}")
        line_response = requests.post(rfq_lines_url, json=line_data, timeout=30, headers=buyer_headers)
        if line_response.status_code != 201:
            print(f"[FAIL] T15 FAILED: Could not add line to RFQ - status {line_response.status_code}")
            return False

        print("Successfully added line to RFQ")

        issue_url = f"{api_base}/rfqs/{rfq_id}/issue"
        print(f"Issuing RFQ: POST {issue_url}")

        issue_response = requests.post(issue_url, timeout=30, headers=buyer_headers)
        if issue_response.status_code != 200:
            print(f"[FAIL] T15 FAILED: Could not issue RFQ - status {issue_response.status_code}")
            return False

        print("Successfully issued RFQ")

        vendor_headers_with_token = {"Content-Type": "application/json"}
        if vendor_token:
            vendor_headers_with_token["Authorization"] = f"Bearer {vendor_token}"

        quotes_url = f"{api_base}/rfqs/{rfq_id}/quotes"

        quote_data = {
            "vendorId": vendor_id,
            "lines": [
                {
                    "rfqLineId": line_response.json().get("id"),
                    "unitPrice": 45.00,
                    "quantity": 2,
                    "uom": "each",
                    "description": "Test quote line for T15",
                }
            ],
            "notes": "Test quote for T15 validation",
        }

        print(f"Submitting quote with vendor token: POST {quotes_url}")
        print(f"Payload: {quote_data}")

        quote_response = requests.post(quotes_url, json=quote_data, timeout=30, headers=vendor_headers_with_token)
        print(f"Status Code: {quote_response.status_code}")
        print(f"Response: {quote_response.text}")

        create_quote_success = False
        if quote_response.status_code == 201:
            try:
                quote_json_response = quote_response.json()

                required_fields = ["id", "vendorId", "lines", "subtotal", "grandTotal"]
                has_required_fields = all(field in quote_json_response for field in required_fields)

                if has_required_fields and quote_json_response["vendorId"] == vendor_id:
                    subtotal = quote_json_response.get("subtotal")
                    grand_total = quote_json_response.get("grandTotal")

                    if subtotal is not None and grand_total is not None:
                        expected_total = 90.00
                        if abs(subtotal - expected_total) < 0.01 and abs(grand_total - expected_total) < 0.01:
                            print("[PASS] T15.1 PASSED: Submit quote returns 201 with computed totals")
                            create_quote_success = True
                        else:
                            print(
                                f"[FAIL] T15.1 FAILED: Expected totals {expected_total}, got subtotal={subtotal}, grandTotal={grand_total}"
                            )
                    else:
                        print("[FAIL] T15.1 FAILED: Quote response missing computed totals")
                else:
                    print("[FAIL] T15.1 FAILED: Quote response missing required fields or wrong vendorId")
            except ValueError:
                print("[FAIL] T15.1 FAILED: Quote response is not valid JSON")
        else:
            print(f"[FAIL] T15.1 FAILED: Expected status code 201, got {quote_response.status_code}")

        duplicate_quote_success = False
        if create_quote_success:
            print(f"\nTesting duplicate quote submission from same vendor (should return 409): POST {quotes_url}")
            print(f"Payload: {quote_data}")

            duplicate_quote_response = requests.post(
                quotes_url, json=quote_data, timeout=30, headers=vendor_headers_with_token
            )
            print(f"Status Code: {duplicate_quote_response.status_code}")
            print(f"Response: {duplicate_quote_response.text}")

            if duplicate_quote_response.status_code == 409:
                try:
                    json_response = duplicate_quote_response.json()
                    has_rfc7807_fields = all(
                        field in json_response for field in ["type", "title", "status", "detail"]
                    )

                    if has_rfc7807_fields and json_response["status"] == 409:
                        print("[PASS] T15.2 PASSED: Duplicate quote from same vendor returns 409 with RFC7807 format")
                        duplicate_quote_success = True
                    else:
                        print("[FAIL] T15.2 FAILED: 409 response doesn't match RFC7807 format")
                except ValueError:
                    print("[FAIL] T15.2 FAILED: 409 response is not valid JSON")
            else:
                print(
                    f"[FAIL] T15.2 FAILED: Expected status code 409 for duplicate quote, got {duplicate_quote_response.status_code}"
                )
        else:
            duplicate_quote_success = True

        t15_success = create_quote_success and duplicate_quote_success
        if t15_success:
            print("\n[PASS] T15 PASSED: Submit quote working correctly")
        else:
            print("\n[FAIL] T15 FAILED: Some submit quote tests failed")

        return t15_success

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T15 FAILED: Request error - {exc}")
        return False


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
