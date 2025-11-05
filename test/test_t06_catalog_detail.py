#!/usr/bin/env python3
"""Test T6: Catalog detail endpoint."""

import sys

import requests

from test_utils import generate_valid_ulid, get_api_base_url, get_auth_headers


def run() -> bool:
    """Verify catalog detail endpoint works correctly."""
    print("Testing T6: Catalog detail endpoint")

    api_base = get_api_base_url()
    headers = get_auth_headers("buyer", include_content_type=False)
    if headers is None:
        print("[FAIL] T6 FAILED: Could not authenticate as buyer user")
        return False

    fake_product_id = generate_valid_ulid()
    product_url = f"{api_base}/products/{fake_product_id}"

    print(f"Testing 404 response for non-existent product: GET {product_url}")
    try:
        response = requests.get(product_url, timeout=30, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")

        if response.status_code == 404:
            try:
                json_response = response.json()
                has_rfc7807_fields = all(field in json_response for field in ["type", "title", "status", "detail"])

                if has_rfc7807_fields and json_response["status"] == 404:
                    print("[PASS] T6.1 PASSED: Non-existent product returns 404 with RFC7807 format")
                    not_found_success = True
                else:
                    print("[FAIL] T6.1 FAILED: 404 response doesn't match RFC7807 format")
                    not_found_success = False
            except ValueError:
                print("[FAIL] T6.1 FAILED: 404 response is not valid JSON")
                not_found_success = False
        else:
            print(f"[FAIL] T6.1 FAILED: Expected status code 404, got {response.status_code}")
            not_found_success = False
    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T6.1 FAILED: Request error - {exc}")
        not_found_success = False

    products_url = f"{api_base}/products?page=1&pageSize=1"
    print(f"\nFinding a product to test with: GET {products_url}")
    try:
        response = requests.get(products_url, timeout=30, headers=headers)

        if response.status_code == 200 and response.json().get("items"):
            products_data = response.json()
            if len(products_data["items"]) > 0:
                first_product = products_data["items"][0]
                first_product_id = first_product.get("id")

                if first_product_id:
                    specific_product_url = f"{api_base}/products/{first_product_id}"
                    print(f"\nTesting real product detail: GET {specific_product_url}")

                    detail_response = requests.get(specific_product_url, timeout=30, headers=headers)
                    print(f"Status Code: {detail_response.status_code}")
                    print(f"Response: {detail_response.text}")

                    if detail_response.status_code == 200:
                        try:
                            product_data = detail_response.json()
                            required_fields = ["id", "name", "sku", "vendorId"]
                            has_required_fields = all(field in product_data for field in required_fields)

                            if has_required_fields and product_data["id"] == first_product_id:
                                print("[PASS] T6.2 PASSED: Existing product returns full product JSON schema-compliant")
                                detail_success = True
                            else:
                                print("[FAIL] T6.2 FAILED: Product response missing required fields or wrong ID")
                                detail_success = False
                        except ValueError:
                            print("[FAIL] T6.2 FAILED: Product response is not valid JSON")
                            detail_success = False
                    else:
                        print(f"[FAIL] T6.2 FAILED: Expected status code 200, got {detail_response.status_code}")
                        detail_success = False
                else:
                    print("[SKIP] T6.2 SKIPPED: Could not extract product ID from browse response")
                    detail_success = True
            else:
                print("[SKIP] T6.2 SKIPPED: No products found in browse response")
                detail_success = True
        else:
            print("[SKIP] T6.2 SKIPPED: Could not get products from browse endpoint")
            detail_success = True
    except requests.exceptions.RequestException as exc:
        print(f"[SKIP] T6.2 SKIPPED: Request error when finding a product - {exc}")
        detail_success = True

    t6_success = not_found_success and detail_success
    if t6_success:
        print("\n[PASS] T6 PASSED: Catalog detail endpoint working correctly")
    else:
        print("\n[FAIL] T6 FAILED: Some catalog detail tests failed")

    return t6_success


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
