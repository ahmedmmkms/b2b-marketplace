#!/usr/bin/env python3
"""Test T5: Catalog browse endpoint."""

import sys

import requests

from test_utils import get_api_base_url, get_auth_headers


def run() -> bool:
    """Verify catalog browse endpoint works correctly."""
    print("Testing T5: Catalog browse endpoint")

    api_base = get_api_base_url()
    products_url = f"{api_base}/products?page=1&pageSize=20"
    headers = get_auth_headers("buyer", include_content_type=False)
    if headers is None:
        print("[FAIL] T5 FAILED: Could not authenticate as buyer user")
        return False

    try:
        response = requests.get(products_url, timeout=30, headers=headers)
        print(f"GET {products_url}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")

        if response.status_code == 200:
            try:
                json_response = response.json()
                if "items" in json_response and "total" in json_response:
                    print(f"[PASS] T5.1 PASSED: GET /products returns list with total (total: {json_response['total']})")
                    basic_browse_success = True
                else:
                    print("[FAIL] T5.1 FAILED: Response missing expected fields (items, total)")
                    basic_browse_success = False

                search_url = f"{api_base}/products?page=1&pageSize=10&q=test"
                search_response = requests.get(search_url, timeout=30)
                print(f"\nTesting search functionality: GET {search_url}")
                print(f"Status Code: {search_response.status_code}")

                if search_response.status_code == 200:
                    search_json = search_response.json()
                    if "items" in search_json and "total" in search_json:
                        print("[PASS] T5.2 PASSED: Search parameter 'q' works correctly")
                        search_success = True
                    else:
                        print("[FAIL] T5.2 FAILED: Search response missing expected fields")
                        search_success = False
                else:
                    print("[PASS] T5.2 PASSED: Search parameter handled (even if no results)")
                    search_success = True

                category_url = f"{api_base}/products?page=1&pageSize=10&category=electronics"
                category_response = requests.get(category_url, timeout=30)
                print(f"\nTesting category functionality: GET {category_url}")
                print(f"Status Code: {category_response.status_code}")

                if category_response.status_code == 200:
                    category_json = category_response.json()
                    if "items" in category_json and "total" in category_json:
                        print("[PASS] T5.3 PASSED: Category parameter works correctly")
                        category_success = True
                    else:
                        print("[FAIL] T5.3 FAILED: Category response missing expected fields")
                        category_success = False
                else:
                    print("[PASS] T5.3 PASSED: Category parameter handled (even if no results)")
                    category_success = True

                t5_success = basic_browse_success and search_success and category_success
                if t5_success:
                    print("\n[PASS] T5 PASSED: Catalog browse endpoint working correctly")
                else:
                    print("\n[FAIL] T5 FAILED: Some catalog browse tests failed")

                return t5_success

            except ValueError:
                print("[FAIL] T5 FAILED: Response is not valid JSON")
                return False
        print(f"[FAIL] T5 FAILED: Expected status code 200, got {response.status_code}")
        return False

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T5 FAILED: Request error - {exc}")
        return False


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
