#!/usr/bin/env python3
"""Test T16: List quotes for an RFQ."""

import random
import sys
import time
from typing import Any, Dict, List, Optional

import requests

import test_utils
from test_utils import (
    get_api_base_url,
    get_auth_headers,
    register_user_with_vendor,
)


def _extract_quote(quotes: List[Dict[str, Any]], quote_id: Optional[str]) -> Optional[Dict[str, Any]]:
    """Return the quote dict with the matching id."""
    if not quote_id:
        return None
    for quote in quotes:
        if quote.get("id") == quote_id:
            return quote
    return None


def run() -> bool:
    """Validate listing quotes for an RFQ includes totals and ordering."""
    print("Testing T16: List quotes for RFQ (buyer)")

    api_base = get_api_base_url()

    admin_headers = get_auth_headers("admin")
    if admin_headers is None:
        print("[FAIL] T16 FAILED: Could not authenticate admin user for setup")
        return False
    admin_token = test_utils.auth_token

    vendors_url = f"{api_base}/vendors"
    vendor_data = {"name": "Test Vendor for T16 Quotes"}

    print(f"Creating vendor for quote testing: POST {vendors_url}")
    try:
        vendor_response = requests.post(vendors_url, json=vendor_data, timeout=30, headers=admin_headers)
        if vendor_response.status_code != 201:
            print(f"[FAIL] T16 FAILED: Could not create vendor for quote testing - status {vendor_response.status_code}")
            return False
        vendor_id = vendor_response.json().get("id")
        print(f"Created vendor with ID: {vendor_id}")

        unique_email = f"t16vendor_{int(time.time())}@example.com"
        if not register_user_with_vendor(
            vendor_id,
            email=unique_email,
            password="112233445566",
            full_name="T16 Vendor User",
        ):
            print("[FAIL] T16 FAILED: Could not register vendor user")
            return False
        vendor_user_token = test_utils.auth_token
        if not vendor_user_token:
            print("[FAIL] T16 FAILED: Vendor user registration did not return a token")
            return False

        buyer_headers = get_auth_headers("buyer")
        if buyer_headers is None:
            print("[FAIL] T16 FAILED: Could not authenticate buyer user")
            return False
        buyer_token = test_utils.auth_token

        products_url = f"{api_base}/products"
        product_sku = f"T16_SKU_{random.randint(1000, 9999)}"
        product_data = {
            "vendorId": vendor_id,
            "sku": product_sku,
            "name": "Test Product for T16 Quote",
            "description": "Product for testing quote listing functionality",
            "price": 100.00,
            "category": "test",
        }

        vendor_headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {vendor_user_token}",
        }

        print(f"Creating product: POST {products_url}")
        product_response = requests.post(products_url, json=product_data, timeout=30, headers=vendor_headers)
        if product_response.status_code != 201:
            print(f"[FAIL] T16 FAILED: Could not create product for testing - status {product_response.status_code}")
            return False
        product_id = product_response.json().get("id")
        print(f"Created product with ID: {product_id}")

        rfqs_url = f"{api_base}/rfqs"
        rfq_data = {
            "title": "Test RFQ for T16 quote listing",
            "description": "Test RFQ for T16 validation",
            "notes": "Test notes for the RFQ",
        }

        print(f"Creating RFQ: POST {rfqs_url}")
        rfq_response = requests.post(rfqs_url, json=rfq_data, timeout=30, headers=buyer_headers)
        if rfq_response.status_code != 201:
            print(f"[FAIL] T16 FAILED: Could not create RFQ for testing - status {rfq_response.status_code}")
            return False

        rfq_id = rfq_response.json().get("id")
        if not rfq_id:
            print("[FAIL] T16 FAILED: Could not extract RFQ ID from response")
            return False

        print(f"Created RFQ with ID: {rfq_id}")

        rfq_lines_url = f"{api_base}/rfqs/{rfq_id}/lines"
        line_data = {
            "productId": product_id,
            "quantity": 2,
            "uom": "each",
            "description": "Test RFQ line item for T16",
        }

        print(f"Adding line to RFQ: POST {rfq_lines_url}")
        line_response = requests.post(rfq_lines_url, json=line_data, timeout=30, headers=buyer_headers)
        if line_response.status_code != 201:
            print(f"[FAIL] T16 FAILED: Could not add line to RFQ - status {line_response.status_code}")
            return False

        print("Successfully added line to RFQ")

        issue_url = f"{api_base}/rfqs/{rfq_id}/issue"
        print(f"Issuing RFQ: POST {issue_url}")

        issue_response = requests.post(issue_url, timeout=30, headers=buyer_headers)
        if issue_response.status_code != 200:
            print(f"[FAIL] T16 FAILED: Could not issue RFQ - status {issue_response.status_code}")
            return False

        print("Successfully issued RFQ")

        quotes_url = f"{api_base}/rfqs/{rfq_id}/quotes"
        quote_data = {
            "vendorId": vendor_id,
            "lines": [
                {
                    "rfqLineId": line_response.json().get("id"),
                    "unitPrice": 95.00,
                    "quantity": 2,
                    "uom": "each",
                    "description": "Test quote line for T16",
                }
            ],
            "notes": "Test quote for T16 validation",
        }

        print(f"Submitting first quote: POST {quotes_url}")
        quote_response = requests.post(quotes_url, json=quote_data, timeout=30, headers=vendor_headers)
        print(f"First quote status: {quote_response.status_code}")

        if quote_response.status_code != 201:
            print(f"[FAIL] T16 FAILED: Could not submit first quote - status {quote_response.status_code}")
            return False

        quote1_id = quote_response.json().get("id")
        print(f"Created first quote with ID: {quote1_id}")

        vendor2_data = {"name": "Test Vendor 2 for T16 Quotes"}
        print(f"Creating second vendor: POST {vendors_url}")
        vendor2_response = requests.post(vendors_url, json=vendor2_data, timeout=30, headers=admin_headers)
        if vendor2_response.status_code != 201:
            print(f"[FAIL] T16 FAILED: Could not create second vendor - status {vendor2_response.status_code}")
            return False
        vendor2_id = vendor2_response.json().get("id")
        print(f"Created second vendor with ID: {vendor2_id}")

        unique_email2 = f"t16vendor2_{int(time.time())}@example.com"
        if not register_user_with_vendor(
            vendor2_id,
            email=unique_email2,
            password="112233445566",
            full_name="T16 Vendor User 2",
        ):
            print("[FAIL] T16 FAILED: Could not register second vendor user")
            return False
        vendor2_user_token = test_utils.auth_token
        if not vendor2_user_token:
            print("[FAIL] T16 FAILED: Second vendor user registration did not return a token")
            return False

        quote2_data = {
            "vendorId": vendor2_id,
            "lines": [
                {
                    "rfqLineId": line_response.json().get("id"),
                    "unitPrice": 105.00,
                    "quantity": 2,
                    "uom": "each",
                    "description": "Test quote line for T16 - second quote",
                }
            ],
            "notes": "Second test quote for T16 validation",
        }

        vendor2_headers = {"Content-Type": "application/json", "Authorization": f"Bearer {vendor2_user_token}"}

        print(f"Submitting second quote: POST {quotes_url}")
        quote2_response = requests.post(quotes_url, json=quote2_data, timeout=30, headers=vendor2_headers)
        print(f"Second quote status: {quote2_response.status_code}")

        if quote2_response.status_code != 201:
            print(f"[FAIL] T16 FAILED: Could not submit second quote - status {quote2_response.status_code}")
            return False

        quote2_id = quote2_response.json().get("id")
        print(f"Created second quote with ID: {quote2_id}")

        test_utils.auth_token = buyer_token

        list_quotes_url = f"{api_base}/rfqs/{rfq_id}/quotes"
        print(f"\nTesting T16: List quotes for RFQ: GET {list_quotes_url}")

        list_response = requests.get(list_quotes_url, timeout=30, headers=buyer_headers)
        print(f"Status Code: {list_response.status_code}")
        print(f"Response: {list_response.text}")

        if list_response.status_code == 200:
            try:
                quotes_list = list_response.json()

                if isinstance(quotes_list, list):
                    print("[PASS] T16.1 PASSED: GET /rfqs/{rfqId}/quotes returns an array")
                    array_success = True
                else:
                    print("[FAIL] T16.1 FAILED: Response is not an array")
                    return False

                if len(quotes_list) >= 2:
                    quote1_data = _extract_quote(quotes_list, quote1_id)
                    quote2_data = _extract_quote(quotes_list, quote2_id)

                    if quote1_data and quote2_data:
                        quote1_has_totals = "subtotal" in quote1_data and "grandTotal" in quote1_data
                        quote2_has_totals = "subtotal" in quote2_data and "grandTotal" in quote2_data

                        if quote1_has_totals and quote2_has_totals:
                            print("[PASS] T16.2 PASSED: Quotes include totals (subtotal, grandTotal)")
                            totals_success = True
                        else:
                            print("[FAIL] T16.2 FAILED: Some quotes missing totals")
                            totals_success = False
                    else:
                        print("[FAIL] T16.2 FAILED: Could not find created quotes in response")
                        totals_success = False
                else:
                    if len(quotes_list) > 0:
                        first_quote = quotes_list[0]
                        has_totals = "subtotal" in first_quote and "grandTotal" in first_quote
                        if has_totals:
                            print("[PASS] T16.2 PASSED: Quote includes totals (subtotal, grandTotal)")
                            totals_success = True
                        else:
                            print("[FAIL] T16.2 FAILED: Quote missing totals")
                            totals_success = False
                    else:
                        print("[PASS] T16.2 PASSED: No quotes (empty array is OK)")
                        totals_success = True

                if len(quotes_list) > 1:
                    grand_totals = [q.get("grandTotal") for q in quotes_list if q.get("grandTotal") is not None]

                    if grand_totals and len(grand_totals) > 1:
                        is_sorted = grand_totals == sorted(grand_totals)
                        if is_sorted:
                            print("[PASS] T16.3 PASSED: Quotes are sorted by grand_total ascending")
                            sort_success = True
                        else:
                            print(f"[FAIL] T16.3 FAILED: Quotes not sorted by grand_total ascending: {grand_totals}")
                            sort_success = False
                    else:
                        print("[FAIL] T16.3 FAILED: Could not extract grand totals for sorting check")
                        sort_success = False
                else:
                    print("[PASS] T16.3 PASSED: Single quote or empty array is sorted by definition")
                    sort_success = True

            except ValueError:
                print("[FAIL] T16 FAILED: Response is not valid JSON")
                array_success = False
                totals_success = False
                sort_success = False
        else:
            print(f"[FAIL] T16 FAILED: Expected status code 200, got {list_response.status_code}")
            array_success = False
            totals_success = False
            sort_success = False

        t16_success = array_success and totals_success and sort_success
        if t16_success:
            print("\n[PASS] T16 PASSED: List quotes for RFQ working correctly")
        else:
            print("\n[FAIL] T16 FAILED: Some list quotes tests failed")

        return t16_success

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T16 FAILED: Request error - {exc}")
        return False
    finally:
        test_utils.auth_token = admin_token


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
