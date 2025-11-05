#!/usr/bin/env python3
"""Test T14: RFQ issue lifecycle."""

import random
import sys

import requests

from test_utils import get_api_base_url, get_auth_headers


def run() -> bool:
    """Validate issuing RFQs with and without lines behaves per specification."""
    print("Testing T14: RFQ issue")

    api_base = get_api_base_url()

    admin_headers = get_auth_headers("admin")
    if admin_headers is None:
        print("[FAIL] T14 FAILED: Could not authenticate as admin user")
        return False

    vendors_url = f"{api_base}/vendors"
    vendor_data = {"name": "Test Vendor for T14 RFQ Issue"}

    print(f"Creating vendor for product: POST {vendors_url}")
    try:
        vendor_response = requests.post(vendors_url, json=vendor_data, timeout=30, headers=admin_headers)
        if vendor_response.status_code != 201:
            print(f"[FAIL] T14 FAILED: Could not create vendor for product - status {vendor_response.status_code}")
            return False
        vendor_id = vendor_response.json().get("id")
        print(f"Created vendor with ID: {vendor_id}")

        products_url = f"{api_base}/products"
        product_sku = f"T14_SKU_{random.randint(1000, 9999)}"
        product_data = {
            "vendorId": vendor_id,
            "sku": product_sku,
            "name": "Test Product for T14 RFQ",
            "description": "Product for testing RFQ issue functionality",
            "price": 75.00,
            "category": "test",
        }

        print(f"Creating product: POST {products_url}")
        product_response = requests.post(products_url, json=product_data, timeout=30, headers=admin_headers)
        if product_response.status_code != 201:
            print(f"[FAIL] T14 FAILED: Could not create product for testing - status {product_response.status_code}")
            return False
        product_id = product_response.json().get("id")
        print(f"Created product with ID: {product_id}")

        buyer_headers = get_auth_headers("buyer")
        if buyer_headers is None:
            print("[FAIL] T14 FAILED: Could not authenticate as buyer user")
            return False

        rfqs_url = f"{api_base}/rfqs"
        rfq_data = {
            "title": "Test RFQ with no lines",
            "description": "Test RFQ for T14 validation - no lines",
            "notes": "Test notes for RFQ without lines",
        }

        print(f"\nCreating RFQ with no lines: POST {rfqs_url}")
        rfq_response = requests.post(rfqs_url, json=rfq_data, timeout=30, headers=buyer_headers)
        if rfq_response.status_code != 201:
            print(f"[FAIL] T14 FAILED: Could not create RFQ for no-lines test - status {rfq_response.status_code}")
            return False

        rfq_id_no_lines = rfq_response.json().get("id")
        if not rfq_id_no_lines:
            print("[FAIL] T14 FAILED: Could not extract RFQ ID from response")
            return False

        print(f"Created RFQ with ID: {rfq_id_no_lines}")

        issue_url = f"{api_base}/rfqs/{rfq_id_no_lines}/issue"
        print(f"\nTesting issue on RFQ with no lines: POST {issue_url}")

        issue_response = requests.post(issue_url, timeout=30, headers=buyer_headers)
        print(f"Status Code: {issue_response.status_code}")
        print(f"Response: {issue_response.text}")

        no_lines_success = False
        if issue_response.status_code == 409:
            try:
                json_response = issue_response.json()
                has_rfc7807_fields = all(field in json_response for field in ["type", "title", "status", "detail"])

                if has_rfc7807_fields and json_response["status"] == 409:
                    print("[PASS] T14.1 PASSED: Attempting to issue RFQ with no lines returns 409 with RFC7807 format")
                    no_lines_success = True
                else:
                    print("[FAIL] T14.1 FAILED: 409 response doesn't match RFC7807 format")
            except ValueError:
                print("[FAIL] T14.1 FAILED: 409 response is not valid JSON")
        else:
            print(f"[FAIL] T14.1 FAILED: Expected status code 409 for no-lines issue, got {issue_response.status_code}")

        rfq_data_with_lines = {
            "title": "Test RFQ with lines",
            "description": "Test RFQ for T14 validation with lines",
            "notes": "Test notes for RFQ with lines",
        }

        print(f"\nCreating RFQ with lines: POST {rfqs_url}")
        rfq_response_with_lines = requests.post(
            rfqs_url, json=rfq_data_with_lines, timeout=30, headers=buyer_headers
        )
        if rfq_response_with_lines.status_code != 201:
            print(
                f"[FAIL] T14 FAILED: Could not create RFQ for with-lines test - status {rfq_response_with_lines.status_code}"
            )
            return False

        rfq_id_with_lines = rfq_response_with_lines.json().get("id")
        if not rfq_id_with_lines:
            print("[FAIL] T14 FAILED: Could not extract RFQ ID from response")
            return False

        print(f"Created RFQ with ID: {rfq_id_with_lines}")

        rfq_lines_url = f"{api_base}/rfqs/{rfq_id_with_lines}/lines"
        line_data = {
            "productId": product_id,
            "quantity": 3,
            "uom": "each",
            "description": "Test RFQ line item for issue test",
        }

        print(f"Adding line to RFQ: POST {rfq_lines_url}")
        line_response = requests.post(rfq_lines_url, json=line_data, timeout=30, headers=buyer_headers)
        if line_response.status_code != 201:
            print(f"[FAIL] T14 FAILED: Could not add line to RFQ - status {line_response.status_code}")
            return False

        print("Successfully added line to RFQ")

        issue_url_with_lines = f"{api_base}/rfqs/{rfq_id_with_lines}/issue"
        print(f"\nTesting issue on RFQ with lines: POST {issue_url_with_lines}")

        issue_response_with_lines = requests.post(issue_url_with_lines, timeout=30, headers=buyer_headers)
        print(f"Status Code: {issue_response_with_lines.status_code}")
        print(f"Response: {issue_response_with_lines.text}")

        successful_issue_success = False
        if issue_response_with_lines.status_code == 200:
            print("[PASS] T14.2 PASSED: Successfully issuing RFQ with lines returns 200")
            successful_issue_success = True
        else:
            print(
                f"[FAIL] T14.2 FAILED: Expected status code 200 for successful issue, got {issue_response_with_lines.status_code}"
            )

        rfq_detail_url = f"{api_base}/rfqs/{rfq_id_with_lines}"
        print(f"\nTesting RFQ status after issue: GET {rfq_detail_url}")

        detail_response = requests.get(rfq_detail_url, timeout=30, headers=buyer_headers)
        print(f"Status Code: {detail_response.status_code}")

        status_check_success = False
        if detail_response.status_code == 200:
            try:
                detail_json = detail_response.json()
                if detail_json.get("status") == "issued":
                    print("[PASS] T14.3 PASSED: RFQ status correctly updated to 'issued'")
                    status_check_success = True
                else:
                    print(f"[FAIL] T14.3 FAILED: Expected status 'issued', got '{detail_json.get('status')}'")
            except ValueError:
                print("[FAIL] T14.3 FAILED: RFQ detail response is not valid JSON")
        else:
            print(f"[FAIL] T14.3 FAILED: Expected status code 200, got {detail_response.status_code}")

        t14_success = no_lines_success and successful_issue_success and status_check_success
        if t14_success:
            print("\n[PASS] T14 PASSED: RFQ issue working correctly")
        else:
            print("\n[FAIL] T14 FAILED: Some RFQ issue tests failed")

        return t14_success

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T14 FAILED: Request error - {exc}")
        return False


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
