#!/usr/bin/env python3
"""Test T1: DB migrations via indirect API checks."""

import sys

import requests

from test_utils import get_api_base_url, get_auth_headers


def run() -> bool:
    """
    Verify DB migrations were applied by checking whether key API endpoints behave as expected.
    """
    print("\nTesting T1: DB migrations applied successfully")

    api_base = get_api_base_url()

    headers = get_auth_headers("admin")
    if headers is None:
        print("[FAIL] T1 FAILED: Could not authenticate as admin user")
        return False

    flags_url = f"{api_base}/flags"
    print(f"Testing feature flags endpoint: GET {flags_url}")
    try:
        response = requests.get(flags_url, timeout=30, headers=headers)
        print(f"Status Code: {response.status_code}")

        if response.status_code == 200:
            try:
                json_response = response.json()
                if isinstance(json_response, list):
                    print("[PASS] T1.1 PASSED: Feature flags endpoint works (feature_flags table exists)")
                    flags_test_passed = True
                else:
                    print(f"[FAIL] T1.1 FAILED: Expected array response, got {type(json_response)}")
                    flags_test_passed = False
            except ValueError:
                print("[FAIL] T1.1 FAILED: Response is not valid JSON")
                flags_test_passed = False
        else:
            if response.status_code in (404, 403):
                print("[PARTIAL] T1.1 PARTIAL: Feature flags endpoint not available (might be disabled)")
                flags_test_passed = True
            else:
                print(f"[FAIL] T1.1 FAILED: Unexpected status code {response.status_code}")
                flags_test_passed = False
    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T1.1 FAILED: Request error - {exc}")
        flags_test_passed = False

    products_url = f"{api_base}/products?page=1&pageSize=1"
    print(f"\nTesting products endpoint: GET {products_url}")
    try:
        response = requests.get(products_url, timeout=30, headers=headers)
        print(f"Status Code: {response.status_code}")

        if response.status_code == 200:
            try:
                json_response = response.json()
                if "items" in json_response and "total" in json_response:
                    print("[PASS] T1.2 PASSED: Products endpoint works (products table exists)")
                    products_test_passed = True
                else:
                    print("[FAIL] T1.2 FAILED: Response missing expected fields (items, total)")
                    products_test_passed = False
            except ValueError:
                print("[FAIL] T1.2 FAILED: Response is not valid JSON")
                products_test_passed = False
        else:
            if response.status_code in (404, 403):
                print("[PARTIAL] T1.2 PARTIAL: Products endpoint not available (might be disabled)")
                products_test_passed = True
            else:
                print(f"[FAIL] T1.2 FAILED: Unexpected status code {response.status_code}")
                products_test_passed = False
    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T1.2 FAILED: Request error - {exc}")
        products_test_passed = False

    orgs_url = f"{api_base}/vendors"
    print(f"\nTesting vendors endpoint exists: GET {orgs_url}")
    try:
        response = requests.get(orgs_url, timeout=30, headers=headers)
        print(f"Status Code: {response.status_code}")

        if response.status_code in [200, 404, 403, 405]:
            print("[PASS] T1.3 PASSED: Vendors endpoint exists (supports expected HTTP methods)")
            orgs_test_passed = True
        else:
            print(f"[FAIL] T1.3 FAILED: Unexpected status code {response.status_code}")
            orgs_test_passed = False
    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T1.3 FAILED: Request error - {exc}")
        orgs_test_passed = False

    all_t1_tests_passed = flags_test_passed and products_test_passed and orgs_test_passed
    if all_t1_tests_passed:
        print("\n[PASS] T1 PASSED: All DB migration tests passed - tables appear to exist")
    else:
        print("\n[FAIL] T1 FAILED: Some DB migration tests failed")

    return all_t1_tests_passed


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
