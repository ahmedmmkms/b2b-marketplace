#!/usr/bin/env python3
"""Test T8: Admin create product endpoint."""

import random
import sys

import requests

from test_utils import get_api_base_url, get_auth_headers


def run() -> bool:
    """Verify admin create product endpoint works correctly."""
    print("Testing T8: Admin create product")

    api_base = get_api_base_url()
    products_url = f"{api_base}/products"

    admin_headers = get_auth_headers("admin")
    if admin_headers is None:
        print("[FAIL] T8 FAILED: Could not authenticate as admin user")
        return False

    vendors_url = f"{api_base}/vendors"
    vendor_data = {"name": "Test Vendor for Product Creation"}

    print(f"Creating vendor first: POST {vendors_url}")
    try:
        vendor_response = requests.post(vendors_url, json=vendor_data, timeout=30, headers=admin_headers)
        if vendor_response.status_code != 201:
            print(f"[FAIL] T8 FAILED: Could not create vendor for product test - status {vendor_response.status_code}")
            return False

        vendor_data_response = vendor_response.json()
        vendor_id = vendor_data_response.get("id")

        if not vendor_id:
            print("[FAIL] T8 FAILED: Could not extract vendor ID from response")
            return False

        print(f"Created vendor with ID: {vendor_id}")

        product_sku = f"TEST_SKU_{random.randint(1000, 9999)}"
        product_data = {
            "vendorId": vendor_id,
            "sku": product_sku,
            "name": "Test Product for API Test",
            "description": "Test product description",
            "price": 100.00,
            "category": "test",
        }

        print(f"Creating product: POST {products_url}")
        print(f"Payload: {product_data}")

        product_response = requests.post(products_url, json=product_data, timeout=30, headers=admin_headers)
        print(f"Status Code: {product_response.status_code}")
        print(f"Response: {product_response.text}")

        if product_response.status_code == 201:
            try:
                json_response = product_response.json()
                required_fields = ["id", "vendorId", "sku", "name"]
                has_required_fields = all(field in json_response for field in required_fields)

                if (
                    has_required_fields
                    and json_response["vendorId"] == vendor_id
                    and json_response["sku"] == product_sku
                    and json_response["name"] == product_data["name"]
                ):
                    print("[PASS] T8.1 PASSED: Admin create product returns 201 with product JSON")
                    create_success = True
                else:
                    print("[FAIL] T8.1 FAILED: Product response missing required fields or wrong values")
                    create_success = False
            except ValueError:
                print("[FAIL] T8.1 FAILED: Product response is not valid JSON")
                create_success = False
        else:
            print(f"[FAIL] T8.1 FAILED: Expected status code 201, got {product_response.status_code}")
            create_success = False

        if create_success:
            print(f"\nTesting duplicate product creation (should return 409): POST {products_url}")
            print(f"Payload: {product_data}")

            duplicate_response = requests.post(products_url, json=product_data, timeout=30, headers=admin_headers)
            print(f"Status Code: {duplicate_response.status_code}")
            print(f"Response: {duplicate_response.text}")

            if duplicate_response.status_code == 409:
                print("[PASS] T8.2 PASSED: Duplicate product creation returns 409 as expected")
                duplicate_success = True
            else:
                print(f"[FAIL] T8.2 FAILED: Expected status code 409 for duplicate, got {duplicate_response.status_code}")
                duplicate_success = False
        else:
            duplicate_success = True

        t8_success = create_success and duplicate_success
        if t8_success:
            print("\n[PASS] T8 PASSED: Admin create product working correctly")
        else:
            print("\n[FAIL] T8 FAILED: Some product creation tests failed")

        return t8_success

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T8 FAILED: Request error - {exc}")
        return False


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
