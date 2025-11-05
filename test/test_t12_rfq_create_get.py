#!/usr/bin/env python3
"""Test T12: RFQ create + get flows."""

import random
import sys

import requests

from test_utils import get_api_base_url, get_auth_headers


def run() -> bool:
    """Validate RFQ creation and retrieval for buyer users."""
    print("Testing T12: RFQ create + get")

    api_base = get_api_base_url()

    headers = get_auth_headers("buyer")
    if headers is None:
        print("[FAIL] T12 FAILED: Could not authenticate as buyer user")
        return False

    rfqs_url = f"{api_base}/rfqs"

    rfq_data = {
        "title": f"Test RFQ {random.randint(1000, 9999)}",
        "description": "Test RFQ for API validation",
        "notes": "Test notes for the RFQ",
    }

    print(f"Creating RFQ: POST {rfqs_url}")
    print(f"Payload: {rfq_data}")

    try:
        response = requests.post(rfqs_url, json=rfq_data, timeout=30, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")

        if response.status_code == 201:
            try:
                json_response = response.json()

                required_fields = ["id", "title", "description", "status", "lines"]
                has_required_fields = all(field in json_response for field in required_fields)

                if has_required_fields and json_response["title"] == rfq_data["title"]:
                    if json_response["status"] == "draft":
                        if isinstance(json_response["lines"], list) and len(json_response["lines"]) == 0:
                            print("[PASS] T12.1 PASSED: RFQ create returns 201 with RFQ JSON in 'draft' status and empty lines")
                            create_success = True
                            created_rfq_id = json_response["id"]
                        else:
                            print("[FAIL] T12.1 FAILED: RFQ create did not return empty lines array")
                            create_success = False
                            created_rfq_id = None
                    else:
                        print(f"[FAIL] T12.1 FAILED: RFQ create did not return 'draft' status, got '{json_response['status']}'")
                        create_success = False
                        created_rfq_id = None
                else:
                    print("[FAIL] T12.1 FAILED: RFQ response missing required fields or wrong values")
                    create_success = False
                    created_rfq_id = None
            except ValueError:
                print("[FAIL] T12.1 FAILED: RFQ response is not valid JSON")
                create_success = False
                created_rfq_id = None
        else:
            print(f"[FAIL] T12.1 FAILED: Expected status code 201, got {response.status_code}")
            create_success = False
            created_rfq_id = None

        if create_success and created_rfq_id:
            rfq_detail_url = f"{api_base}/rfqs/{created_rfq_id}"
            print(f"\nTesting RFQ get by ID: GET {rfq_detail_url}")

            detail_response = requests.get(rfq_detail_url, timeout=30, headers=headers)
            print(f"Status Code: {detail_response.status_code}")
            print(f"Response: {detail_response.text}")

            if detail_response.status_code == 200:
                try:
                    detail_json = detail_response.json()

                    required_fields = ["id", "title", "description", "status", "lines"]
                    has_required_fields = all(field in detail_json for field in required_fields)

                    if (
                        has_required_fields
                        and detail_json["id"] == created_rfq_id
                        and detail_json["title"] == rfq_data["title"]
                        and detail_json["status"] == "draft"
                    ):
                        if isinstance(detail_json["lines"], list) and len(detail_json["lines"]) == 0:
                            print("[PASS] T12.2 PASSED: RFQ get by ID returns 200 with correct RFQ data")
                            get_success = True
                        else:
                            print("[FAIL] T12.2 FAILED: RFQ get did not return empty lines array")
                            get_success = False
                    else:
                        print("[FAIL] T12.2 FAILED: RFQ get response missing required fields or wrong values")
                        get_success = False
                except ValueError:
                    print("[FAIL] T12.2 FAILED: RFQ get response is not valid JSON")
                    get_success = False
            else:
                print(f"[FAIL] T12.2 FAILED: Expected status code 200, got {detail_response.status_code}")
                get_success = False
        else:
            get_success = False

        t12_success = create_success and get_success
        if t12_success:
            print("\n[PASS] T12 PASSED: RFQ create + get working correctly")
        else:
            print("\n[FAIL] T12 FAILED: Some RFQ create + get tests failed")

        return t12_success

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] T12 FAILED: Request error - {exc}")
        return False


if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
