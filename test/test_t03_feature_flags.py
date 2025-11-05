#!/usr/bin/env python3
"""Test T3: FeatureFlag repository + controller (read-only)."""

import sys

import requests

from test_utils import get_api_base_url, get_auth_headers


def run() -> bool:
    """Verify FeatureFlag repository + controller works correctly."""
    print("Testing T3: FeatureFlag repository + controller (read-only)")

    api_base = get_api_base_url()
    flags_url = f"{api_base}/flags"
    headers = get_auth_headers("admin", include_content_type=False)
    if headers is None:
        print("[FAIL] T3 FAILED: Could not authenticate as admin user")
        return False

    try:
        response = requests.get(flags_url, timeout=30, headers=headers)
        print(f"GET {flags_url}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")

        if response.status_code == 200:
            try:
                json_response = response.json()
                if isinstance(json_response, list):
                    print("[PASS] T3 PASSED: GET /flags returns an array as expected")
                    return True
                print(f"[FAIL] T3 FAILED: Expected array response, got {type(json_response)}")
                return False
            except ValueError:
                print("[FAIL] T3 FAILED: Response is not valid JSON")
                return False
        print(f"[FAIL] T3 FAILED: Expected status code 200, got {response.status_code}")
        return False

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T3 FAILED: Request error - {exc}")
        return False


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
