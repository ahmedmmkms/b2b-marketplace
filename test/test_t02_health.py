#!/usr/bin/env python3
"""Test T2: Boot app skeleton + health endpoint."""

import sys

import requests

from test_utils import get_api_base_url


def run() -> bool:
    """Verify health endpoint returns status UP."""
    print("Testing T2: Boot app skeleton + health")

    api_base = get_api_base_url()
    health_url = f"{api_base}/actuator/health"

    try:
        response = requests.get(health_url, timeout=30)
        print(f"GET {health_url}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")

        if response.status_code == 200:
            try:
                json_response = response.json()
                if json_response.get("status") == "UP":
                    print("[PASS] T2 PASSED: Health endpoint returns {'status':'UP'}")
                    return True
                print(f"[FAIL] T2 FAILED: Expected status 'UP', got '{json_response.get('status')}'")
                return False
            except ValueError:
                print("[FAIL] T2 FAILED: Response is not valid JSON")
                return False
        print(f"[FAIL] T2 FAILED: Expected status code 200, got {response.status_code}")
        return False

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T2 FAILED: Request error - {exc}")
        return False


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
