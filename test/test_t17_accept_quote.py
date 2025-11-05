#!/usr/bin/env python3
"""Test T17: Accept quote workflow."""

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
    """Validate accepting a quote updates related entities and is idempotent."""
    print("Testing T17: Accept quote")

    original_auth_token = test_utils.auth_token
    api_base = get_api_base_url()

    try:
        admin_headers = get_auth_headers("admin")
        if admin_headers is None:
            print("[FAIL] T17 FAILED: Could not authenticate admin user for setup")
            return False

        vendors_url = f"{api_base}/vendors"
        vendor1_data = {"name": "Test Vendor 1 for T17 Accept Quote"}
        vendor2_data = {"name": "Test Vendor 2 for T17 Accept Quote"}

        print(f"Creating first vendor: POST {vendors_url}")
        vendor1_response = requests.post(vendors_url, json=vendor1_data, timeout=30, headers=admin_headers)
        if vendor1_response.status_code != 201:
            print(f"[FAIL] T17 FAILED: Could not create first vendor - status {vendor1_response.status_code}")
            return False
        vendor1_id = vendor1_response.json().get("id")
        print(f"Created first vendor with ID: {vendor1_id}")

        print(f"Creating second vendor: POST {vendors_url}")
        vendor2_response = requests.post(vendors_url, json=vendor2_data, timeout=30, headers=admin_headers)
        if vendor2_response.status_code != 201:
            print(f"[FAIL] T17 FAILED: Could not create second vendor - status {vendor2_response.status_code}")
            return False
        vendor2_id = vendor2_response.json().get("id")
        print(f"Created second vendor with ID: {vendor2_id}")

        unique_email1 = f"t17vendor1_{int(time.time())}@example.com"
        unique_email2 = f"t17vendor2_{int(time.time())}@example.com"

        if not register_user_with_vendor(
            vendor1_id,
            email=unique_email1,
            password="112233445566",
            full_name="T17 Vendor User 1",
        ):
            print("[FAIL] T17 FAILED: Could not register first vendor user")
            return False
        vendor1_user_token = test_utils.auth_token
        print("Registered first vendor user with token")

        if not register_user_with_vendor(
            vendor2_id,
            email=unique_email2,
            password="112233445566",
            full_name="T17 Vendor User 2",
        ):
            print("[FAIL] T17 FAILED: Could not register second vendor user")
            return False
        vendor2_user_token = test_utils.auth_token
        print("Registered second vendor user with token")

        products_url = f"{api_base}/products"
        product1_sku = f"T17_SKU1_{random.randint(1000, 9999)}"
        product1_data = {
            "vendorId": vendor1_id,
            "sku": product1_sku,
            "name": "Test Product 1 for T17 Quote",
            "description": "Product for testing quote acceptance functionality",
            "price": 100.00,
            "category": "test",
        }

        vendor1_headers = {"Content-Type": "application/json", "Authorization": f"Bearer {vendor1_user_token}"}

        print(f"Creating product for first vendor: POST {products_url}")
        product1_response = requests.post(products_url, json=product1_data, timeout=30, headers=vendor1_headers)
        if product1_response.status_code != 201:
            print(f"[FAIL] T17 FAILED: Could not create first product - status {product1_response.status_code}")
            return False
        product1_id = product1_response.json().get("id")
        print(f"Created first product with ID: {product1_id}")

        product2_sku = f"T17_SKU2_{random.randint(1000, 9999)}"
        product2_data = {
            "vendorId": vendor2_id,
            "sku": product2_sku,
            "name": "Test Product 2 for T17 Quote",
            "description": "Product for testing quote acceptance functionality",
            "price": 120.00,
            "category": "test",
        }

        vendor2_headers = {"Content-Type": "application/json", "Authorization": f"Bearer {vendor2_user_token}"}

        print(f"Creating product for second vendor: POST {products_url}")
        product2_response = requests.post(products_url, json=product2_data, timeout=30, headers=vendor2_headers)
        if product2_response.status_code != 201:
            print(f"[FAIL] T17 FAILED: Could not create second product - status {product2_response.status_code}")
            return False
        product2_id = product2_response.json().get("id")
        print(f"Created second product with ID: {product2_id}")

        buyer_headers = get_auth_headers("buyer")
        if buyer_headers is None:
            print("[FAIL] T17 FAILED: Could not authenticate buyer user for RFQ actions")
            return False

        rfqs_url = f"{api_base}/rfqs"
        rfq_data = {
            "title": "Test RFQ for T17 acceptance",
            "description": "Test RFQ for T17 validation",
            "notes": "Test notes for the RFQ",
        }

        print(f"Creating RFQ: POST {rfqs_url}")
        rfq_response = requests.post(rfqs_url, json=rfq_data, timeout=30, headers=buyer_headers)
        if rfq_response.status_code != 201:
            print(f"[FAIL] T17 FAILED: Could not create RFQ for testing - status {rfq_response.status_code}")
            return False

        rfq_id = rfq_response.json().get("id")
        if not rfq_id:
            print("[FAIL] T17 FAILED: Could not extract RFQ ID from response")
            return False

        print(f"Created RFQ with ID: {rfq_id}")

        rfq_lines_url = f"{api_base}/rfqs/{rfq_id}/lines"
        line_data = {
            "productId": product1_id,
            "quantity": 2,
            "uom": "each",
            "description": "Test RFQ line item for T17",
        }

        print(f"Adding line to RFQ: POST {rfq_lines_url}")
        line_response = requests.post(rfq_lines_url, json=line_data, timeout=30, headers=buyer_headers)
        if line_response.status_code != 201:
            print(f"[FAIL] T17 FAILED: Could not add line to RFQ - status {line_response.status_code}")
            return False

        line_id = line_response.json().get("id")
        print(f"Created RFQ line with ID: {line_id}")

        issue_url = f"{api_base}/rfqs/{rfq_id}/issue"
        print(f"Issuing RFQ: POST {issue_url}")

        issue_response = requests.post(issue_url, timeout=30, headers=buyer_headers)
        if issue_response.status_code != 200:
            print(f"[FAIL] T17 FAILED: Could not issue RFQ - status {issue_response.status_code}")
            return False

        print("Successfully issued RFQ")

        quotes_url = f"{api_base}/rfqs/{rfq_id}/quotes"

        quote1_data = {
            "vendorId": vendor1_id,
            "lines": [
                {
                    "rfqLineId": line_id,
                    "unitPrice": 90.00,
                    "quantity": 2,
                    "uom": "each",
                    "description": "Test quote line for T17 - first vendor",
                }
            ],
            "notes": "First test quote for T17 validation",
        }

        print(f"Submitting first quote: POST {quotes_url}")
        quote1_response = requests.post(quotes_url, json=quote1_data, timeout=30, headers=vendor1_headers)
        print(f"First quote status: {quote1_response.status_code}")

        if quote1_response.status_code != 201:
            print(f"[FAIL] T17 FAILED: Could not submit first quote - status {quote1_response.status_code}")
            return False

        quote1_id = quote1_response.json().get("id")
        print(f"Created first quote with ID: {quote1_id}")

        quote2_data = {
            "vendorId": vendor2_id,
            "lines": [
                {
                    "rfqLineId": line_id,
                    "unitPrice": 95.00,
                    "quantity": 2,
                    "uom": "each",
                    "description": "Test quote line for T17 - second vendor",
                }
            ],
            "notes": "Second test quote for T17 validation",
        }

        print(f"Submitting second quote: POST {quotes_url}")
        quote2_response = requests.post(quotes_url, json=quote2_data, timeout=30, headers=vendor2_headers)
        print(f"Second quote status: {quote2_response.status_code}")

        if quote2_response.status_code != 201:
            print(f"[FAIL] T17 FAILED: Could not submit second quote - status {quote2_response.status_code}")
            return False

        quote2_id = quote2_response.json().get("id")
        print(f"Created second quote with ID: {quote2_id}")

        accept_url = f"{api_base}/rfqs/{rfq_id}/quotes/{quote1_id}/accept"
        print(f"\nTesting T17: Accept quote: POST {accept_url}")

        accept_response = requests.post(accept_url, timeout=30, headers=buyer_headers)
        print(f"Status Code: {accept_response.status_code}")
        print(f"Response: {accept_response.text}")

        accept_success = False
        if accept_response.status_code == 200:
            print("[PASS] T17.1 PASSED: Accept quote returns 200")
            accept_success = True
        else:
            print(f"[FAIL] T17.1 FAILED: Expected status code 200, got {accept_response.status_code}")

        quote1_detail_url = f"{api_base}/rfqs/{rfq_id}/quotes/{quote1_id}"
        print(f"\nVerifying quote 1 status after acceptance: GET {quote1_detail_url}")

        quote1_detail_response = requests.get(quote1_detail_url, timeout=30, headers=buyer_headers)
        if quote1_detail_response.status_code == 200:
            quote1_detail = quote1_detail_response.json()
            if quote1_detail.get("status") == "accepted":
                print("[PASS] T17.2 PASSED: Accepted quote is marked as 'accepted'")
                quote1_status_success = True
            else:
                print(f"[FAIL] T17.2 FAILED: Expected quote status 'accepted', got '{quote1_detail.get('status')}'")
                quote1_status_success = False
        else:
            print(f"[FAIL] T17.2 FAILED: Could not get quote 1 details - status {quote1_detail_response.status_code}")
            quote1_status_success = False

        quote2_detail_url = f"{api_base}/rfqs/{rfq_id}/quotes/{quote2_id}"
        print(f"\nVerifying quote 2 status after quote 1 acceptance: GET {quote2_detail_url}")

        quote2_detail_response = requests.get(quote2_detail_url, timeout=30, headers=buyer_headers)
        if quote2_detail_response.status_code == 200:
            quote2_detail = quote2_detail_response.json()
            if quote2_detail.get("status") == "rejected":
                print("[PASS] T17.3 PASSED: Other quote is marked as 'rejected'")
                quote2_status_success = True
            else:
                print(f"[FAIL] T17.3 FAILED: Expected quote status 'rejected', got '{quote2_detail.get('status')}'")
                quote2_status_success = False
        else:
            print(f"[FAIL] T17.3 FAILED: Could not get quote 2 details - status {quote2_detail_response.status_code}")
            quote2_status_success = False

        rfq_detail_url = f"{api_base}/rfqs/{rfq_id}"
        print(f"\nVerifying RFQ status after acceptance: GET {rfq_detail_url}")

        rfq_detail_response = requests.get(rfq_detail_url, timeout=30, headers=buyer_headers)
        if rfq_detail_response.status_code == 200:
            rfq_detail = rfq_detail_response.json()
            if rfq_detail.get("status") == "awarded":
                print("[PASS] T17.4 PASSED: RFQ is marked as 'awarded'")
                rfq_status_success = True
            else:
                print(f"[FAIL] T17.4 FAILED: Expected RFQ status 'awarded', got '{rfq_detail.get('status')}'")
                rfq_status_success = False
        else:
            print(f"[FAIL] T17.4 FAILED: Could not get RFQ details - status {rfq_detail_response.status_code}")
            rfq_status_success = False

        print(f"\nTesting T17: Idempotency - accept same quote again: POST {accept_url}")

        idempotent_response = requests.post(accept_url, timeout=30, headers=buyer_headers)
        print(f"Status Code: {idempotent_response.status_code}")
        print(f"Response: {idempotent_response.text}")

        idempotent_success = False
        if idempotent_response.status_code == 200:
            print("[PASS] T17.5 PASSED: Accepting same quote again returns 200 (idempotent)")
            idempotent_success = True
        else:
            print(f"[FAIL] T17.5 FAILED: Expected status code 200 for idempotent call, got {idempotent_response.status_code}")

        t17_success = (
            accept_success and quote1_status_success and quote2_status_success and rfq_status_success and idempotent_success
        )
        if t17_success:
            print("\n[PASS] T17 PASSED: Accept quote working correctly")
        else:
            print("\n[FAIL] T17 FAILED: Some accept quote tests failed")

        return t17_success

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T17 FAILED: Request error - {exc}")
        return False
    finally:
        test_utils.auth_token = original_auth_token


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
