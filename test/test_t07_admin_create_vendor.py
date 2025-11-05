#!/usr/bin/env python3
"""Test T7: Admin create vendor endpoint."""

import sys

import requests

from test_utils import get_api_base_url, get_auth_headers


def run() -> bool:
    """Verify admin create vendor endpoint works correctly."""
    print("Testing T7: Admin create vendor")

    api_base = get_api_base_url()
    vendors_url = f"{api_base}/vendors"

    vendor_data = {"name": "Test Vendor for API Test"}

    headers = get_auth_headers("admin")
    if headers is None:
        print("[FAIL] T7 FAILED: Could not authenticate as admin user")
        return False

    print(f"Creating vendor: POST {vendors_url}")
    print(f"Payload: {vendor_data}")

    try:
        response = requests.post(vendors_url, json=vendor_data, timeout=30, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")

        if response.status_code == 201:
            try:
                vendor_json = response.json()
                required_fields = ["id", "name"]
                has_required_fields = all(field in vendor_json for field in required_fields)

                if has_required_fields and vendor_json["name"] == vendor_data["name"]:
                    print("[PASS] T7 PASSED: Admin create vendor returns created vendor JSON")
                    return True
                print("[FAIL] T7 FAILED: Vendor response missing required fields or mismatched name")
                return False
            except ValueError:
                print("[FAIL] T7 FAILED: Response is not valid JSON")
                return False
        print(f"[FAIL] T7 FAILED: Expected status code 201, got {response.status_code}")
        return False

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T7 FAILED: Request error - {exc}")
        return False


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
