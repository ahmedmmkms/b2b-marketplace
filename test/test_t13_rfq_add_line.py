#!/usr/bin/env python3
"""Test T13: RFQ add line workflow."""

import random
import sys

import requests

from test_utils import get_api_base_url, get_auth_headers


def run() -> bool:
    """Validate adding a line to an RFQ and verifying persistence."""
    print("Testing T13: RFQ add line")

    api_base = get_api_base_url()

    admin_headers = get_auth_headers("admin")
    if admin_headers is None:
        print("[FAIL] T13 FAILED: Could not authenticate as admin user")
        return False

    vendors_url = f"{api_base}/vendors"
    vendor_data = {"name": "Test Vendor for T13 RFQ Line"}

    print(f"Creating vendor for product: POST {vendors_url}")
    try:
        vendor_response = requests.post(vendors_url, json=vendor_data, timeout=30, headers=admin_headers)
        if vendor_response.status_code != 201:
            print(f"[FAIL] T13 FAILED: Could not create vendor for product - status {vendor_response.status_code}")
            return False
        vendor_id = vendor_response.json().get("id")
        print(f"Created vendor with ID: {vendor_id}")

        products_url = f"{api_base}/products"
        product_sku = f"T13_SKU_{random.randint(1000, 9999)}"
        product_data = {
            "vendorId": vendor_id,
            "sku": product_sku,
            "name": "Test Product for T13 RFQ",
            "description": "Product for testing RFQ line addition",
            "price": 50.00,
            "category": "test",
        }

        print(f"Creating product: POST {products_url}")
        product_response = requests.post(products_url, json=product_data, timeout=30, headers=admin_headers)
        if product_response.status_code != 201:
            print(f"[FAIL] T13 FAILED: Could not create product for testing - status {product_response.status_code}")
            return False
        product_id = product_response.json().get("id")
        print(f"Created product with ID: {product_id}")

        buyer_headers = get_auth_headers("buyer")
        if buyer_headers is None:
            print("[FAIL] T13 FAILED: Could not authenticate as buyer user")
            return False

        rfqs_url = f"{api_base}/rfqs"
        rfq_data = {
            "title": "Test RFQ for adding lines",
            "description": "Test RFQ for T13 validation",
            "notes": "Test notes for the RFQ",
        }

        print(f"Creating RFQ: POST {rfqs_url}")
        rfq_response = requests.post(rfqs_url, json=rfq_data, timeout=30, headers=buyer_headers)
        if rfq_response.status_code != 201:
            print(f"[FAIL] T13 FAILED: Could not create RFQ for testing - status {rfq_response.status_code}")
            return False

        rfq_id = rfq_response.json().get("id")
        if not rfq_id:
            print("[FAIL] T13 FAILED: Could not extract RFQ ID from response")
            return False

        print(f"Created RFQ with ID: {rfq_id}")

        rfq_lines_url = f"{api_base}/rfqs/{rfq_id}/lines"
        line_data = {
            "productId": product_id,
            "quantity": 5,
            "uom": "each",
            "description": "Test RFQ line item",
        }

        print(f"Adding line to RFQ: POST {rfq_lines_url}")
        print(f"Payload: {line_data}")

        line_response = requests.post(rfq_lines_url, json=line_data, timeout=30, headers=buyer_headers)
        print(f"Status Code: {line_response.status_code}")
        print(f"Response: {line_response.text}")

        if line_response.status_code == 201:
            try:
                line_json_response = line_response.json()

                required_fields = ["id", "productId", "quantity", "uom"]
                has_required_fields = all(field in line_json_response for field in required_fields)

                if (
                    has_required_fields
                    and line_json_response["quantity"] == line_data["quantity"]
                    and line_json_response["uom"] == line_data["uom"]
                ):
                    print("[PASS] T13.1 PASSED: RFQ add line returns 201 with created line")
                    add_line_success = True
                else:
                    print("[FAIL] T13.1 FAILED: Line response missing required fields or wrong values")
                    add_line_success = False
            except ValueError:
                print("[FAIL] T13.1 FAILED: Line response is not valid JSON")
                add_line_success = False
        else:
            print(f"[FAIL] T13.1 FAILED: Expected status code 201, got {line_response.status_code}")
            add_line_success = False

        if add_line_success:
            rfq_detail_url = f"{api_base}/rfqs/{rfq_id}"
            print(f"\nTesting RFQ has line after adding: GET {rfq_detail_url}")

            detail_response = requests.get(rfq_detail_url, timeout=30, headers=buyer_headers)
            print(f"Status Code: {detail_response.status_code}")

            if detail_response.status_code == 200:
                try:
                    detail_json = detail_response.json()

                    if "lines" in detail_json and isinstance(detail_json["lines"], list):
                        if len(detail_json["lines"]) > 0:
                            print("[PASS] T13.2 PASSED: RFQ GET shows lines array including new line")
                            rfq_has_line_success = True
                        else:
                            print("[FAIL] T13.2 FAILED: RFQ GET still has empty lines array")
                            rfq_has_line_success = False
                    else:
                        print("[FAIL] T13.2 FAILED: RFQ response missing 'lines' field or not a list")
                        rfq_has_line_success = False
                except ValueError:
                    print("[FAIL] T13.2 FAILED: RFQ get response is not valid JSON")
                    rfq_has_line_success = False
            else:
                print(f"[FAIL] T13.2 FAILED: Expected status code 200, got {detail_response.status_code}")
                rfq_has_line_success = False
        else:
            rfq_has_line_success = False

        t13_success = add_line_success and rfq_has_line_success
        if t13_success:
            print("\n[PASS] T13 PASSED: RFQ add line working correctly")
        else:
            print("\n[FAIL] T13 FAILED: Some RFQ add line tests failed")

        return t13_success

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T13 FAILED: Request error - {exc}")
        return False


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
