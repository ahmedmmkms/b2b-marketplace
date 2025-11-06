#!/usr/bin/env python3
"""Test script for T25 - Wallet API top-up functionality."""

import json
import sys
import os
import uuid
import requests

# Add the project root to the Python path to import test_utils
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import test_utils

def run():
    """Execute T25 Wallet API top-up tests."""
    print("Testing T25 - Wallet API top-up functionality...")
    
    # Get API base URL
    api_base = test_utils.get_api_base_url()
    
    # Step 1: Authenticate as admin to create an organization for testing
    if not test_utils.authenticate_user("admin"):
        print("[FAIL] Could not authenticate admin user")
        return False
    
    admin_headers = test_utils.get_auth_headers("admin")
    if admin_headers is None:
        print("[FAIL] Could not get authentication headers for admin")
        return False

    # Create an organization to test wallet top-up functionality
    vendor_payload = {"name": f"T25 Topup Test Org {uuid.uuid4().hex[:8]}"}
    vendors_url = f"{api_base}/vendors"

    vendor_response = requests.post(
        vendors_url,
        json=vendor_payload,
        headers=admin_headers,
        timeout=30,
    )

    if vendor_response.status_code != 201:
        print(f"[FAIL] Failed to create vendor org for topup test: {vendor_response.status_code}")
        print(f"Response: {vendor_response.text}")
        return False

    org_id = vendor_response.json().get("id")
    if not org_id:
        print("[FAIL] Vendor creation response missing 'id'")
        return False

    print(f"Created organization for topup test: {org_id}")
    
    # Step 2: Get initial wallet balance
    print("Step 2: Getting initial wallet balance...")
    
    wallet_url = f"{api_base}/wallets/{org_id}"
    
    get_wallet_response = requests.get(
        wallet_url,
        headers=admin_headers,
        timeout=30,
    )
    
    if get_wallet_response.status_code != 200:
        print(f"[FAIL] Failed to get initial wallet balance: {get_wallet_response.status_code}")
        print(f"Response: {get_wallet_response.text}")
        return False
    
    initial_wallet_data = get_wallet_response.json()
    initial_balance = initial_wallet_data.get("balance", 0)
    
    print(f"Initial wallet balance: {initial_balance}")
    
    # Step 3: Perform wallet top-up
    print("Step 3: Testing POST wallet top-up endpoint...")
    
    topup_amount = 500.0  # Amount to top up
    topup_data = {
        "amount": topup_amount,
        "currency": "USD",
        "description": f"T25 Top-up test transaction for {org_id}"
    }
    
    topup_url = f"{api_base}/wallets/{org_id}/topups"
    
    topup_response = requests.post(
        topup_url,
        json=topup_data,
        headers=admin_headers,
        timeout=30,
    )
    
    if topup_response.status_code != 201:
        print(f"[FAIL] Failed to perform wallet top-up: {topup_response.status_code}")
        print(f"Response: {topup_response.text}")
        return False
    
    topup_data_response = topup_response.json()
    
    # Check that response contains expected transaction fields
    expected_fields = ["id", "type", "amount", "createdAt", "walletId", "reference"]
    for field in expected_fields:
        if field not in topup_data_response:
            print(f"[FAIL] Missing expected field '{field}' in top-up response")
            print(f"Response keys: {sorted(topup_data_response.keys())}")
            return False
    
    # Verify transaction type is 'topup'
    if topup_data_response["type"] != "topup":
        print(f"[FAIL] Transaction type is not 'topup', got: {topup_data_response['type']}")
        return False
    
    # Verify amount matches what we sent
    if topup_data_response["amount"] != topup_amount:
        print(f"[FAIL] Top-up amount mismatch: expected {topup_amount}, got {topup_data_response['amount']}")
        return False
    
    print(f"[PASS] Wallet successfully topped up with {topup_amount}, transaction ID: {topup_data_response['id']}")
    
    # Step 4: Verify that wallet balance has increased by the top-up amount
    print("Step 4: Verifying wallet balance increased by top-up amount...")
    
    updated_wallet_response = requests.get(
        wallet_url,
        headers=admin_headers,
        timeout=30,
    )
    
    if updated_wallet_response.status_code != 200:
        print(f"[FAIL] Failed to get updated wallet balance: {updated_wallet_response.status_code}")
        print(f"Response: {updated_wallet_response.text}")
        return False
    
    updated_wallet_data = updated_wallet_response.json()
    updated_balance = updated_wallet_data.get("balance", 0)
    
    expected_new_balance = initial_balance + topup_amount
    if updated_balance != expected_new_balance:
        print(f"[FAIL] Balance not updated correctly: expected {expected_new_balance}, got {updated_balance}")
        print(f"Initial balance: {initial_balance}, Top-up amount: {topup_amount}")
        return False
    
    print(f"[PASS] Wallet balance correctly updated: {initial_balance} + {topup_amount} = {updated_balance}")
    
    # Step 5: Test with other user roles to verify access permissions
    print("Step 5: Testing top-up access with different user roles...")
    
    # Test with buyer user
    if not test_utils.authenticate_user("buyer"):
        print("[INFO] Could not authenticate buyer user, skipping buyer test")
    else:
        buyer_headers = test_utils.get_auth_headers("buyer")
        if buyer_headers is None:
            print("[INFO] Buyer user authentication failed, skipping buyer test")
        else:
            buyer_topup_data = {
                "amount": 100.0,
                "currency": "USD",
                "description": f"Buyer top-up test for {org_id}"
            }
            
            buyer_topup_response = requests.post(
                topup_url,
                json=buyer_topup_data,
                headers=buyer_headers,
                timeout=30,
            )
            
            # The response could be 201 (allowed) or 403 (access denied) depending on business logic
            if buyer_topup_response.status_code == 201:
                print(f"[PASS] Buyer user can perform wallet top-up")
            elif buyer_topup_response.status_code == 403:
                print(f"[PASS] Buyer user correctly restricted from wallet top-up (status: {buyer_topup_response.status_code})")
            else:
                print(f"[INFO] Buyer top-up response: {buyer_topup_response.status_code}")
    
    # Test with vendor user
    # First, register a vendor user for this organization
    previous_token = test_utils.auth_token
    vendor_email = f"t25_topup_vendor_{uuid.uuid4().hex[:8]}@example.com"
    if not test_utils.register_user_with_vendor(
        org_id,
        email=vendor_email,
        password="112233445566",
        full_name="T25 Topup Vendor User",
    ):
        print("[INFO] Could not provision vendor user for top-up test, skipping vendor test")
    else:
        vendor_token = test_utils.auth_token
        test_utils.ROLE_TOKENS["vendor"] = vendor_token
        test_utils.auth_token = previous_token
        vendor_headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {vendor_token}",
        }
        
        vendor_topup_data = {
            "amount": 200.0,
            "currency": "USD",
            "description": f"Vendor top-up test for {org_id}"
        }
        
        vendor_topup_response = requests.post(
            topup_url,
            json=vendor_topup_data,
            headers=vendor_headers,
            timeout=30,
        )
        
        if vendor_topup_response.status_code == 201:
            print(f"[PASS] Vendor user can perform wallet top-up")
        elif vendor_topup_response.status_code == 403:
            print(f"[PASS] Vendor user correctly restricted from wallet top-up (status: {vendor_topup_response.status_code})")
        else:
            print(f"[INFO] Vendor top-up response: {vendor_topup_response.status_code}")
    
    # Step 6: Test invalid top-up amounts (negative, zero, etc.)
    print("Step 6: Testing invalid top-up amounts...")
    
    # Test with negative amount
    invalid_topup_data = {
        "amount": -50.0,
        "currency": "USD",
        "description": f"Invalid negative top-up test for {org_id}"
    }
    
    invalid_topup_response = requests.post(
        topup_url,
        json=invalid_topup_data,
        headers=admin_headers,
        timeout=30,
    )
    
    # Should return 400 for invalid amount
    if invalid_topup_response.status_code == 400:
        print(f"[PASS] Negative top-up amount correctly rejected with {invalid_topup_response.status_code}")
    else:
        print(f"[FAIL] Negative top-up amount should be rejected, got: {invalid_topup_response.status_code}")
        print(f"Response: {invalid_topup_response.text}")
        return False
    
    # Test with zero amount
    zero_topup_data = {
        "amount": 0.0,
        "currency": "USD",
        "description": f"Zero top-up test for {org_id}"
    }
    
    zero_topup_response = requests.post(
        topup_url,
        json=zero_topup_data,
        headers=admin_headers,
        timeout=30,
    )
    
    # Should return 400 for zero amount
    if zero_topup_response.status_code == 400:
        print(f"[PASS] Zero top-up amount correctly rejected with {zero_topup_response.status_code}")
    else:
        print(f"[FAIL] Zero top-up amount should be rejected, got: {zero_topup_response.status_code}")
        print(f"Response: {zero_topup_response.text}")
        return False
    
    # Step 7: Test with non-existent organization ID (should return 404)
    print("Step 7: Testing top-up with non-existent organization ID...")
    
    fake_org_id = test_utils.generate_valid_ulid()
    fake_topup_url = f"{api_base}/wallets/{fake_org_id}/topups"
    
    fake_topup_data = {
        "amount": 300.0,
        "currency": "USD",
        "description": f"Top-up test for non-existent org {fake_org_id}"
    }
    
    fake_topup_response = requests.post(
        fake_topup_url,
        json=fake_topup_data,
        headers=admin_headers,
        timeout=30,
    )
    
    # Should return 404 for non-existent org
    if fake_topup_response.status_code == 404:
        print(f"[PASS] Top-up endpoint correctly returns 404 for non-existent org")
        
        # Check that the response follows RFC7807 error format
        error_response = fake_topup_response.json()
        rfc7807_fields = ["type", "title", "status", "detail"]
        for field in rfc7807_fields:
            if field not in error_response:
                print(f"[WARN] Missing RFC7807 field '{field}' in 404 response: {error_response}")
        
        if error_response.get("status") == 404:
            print(f"[PASS] 404 response contains correct status code in RFC7807 format")
        else:
            print(f"[WARN] 404 response has unexpected status: {error_response.get('status')}")
    else:
        print(f"[FAIL] Expected 404 for non-existent org, got: {fake_topup_response.status_code}")
        print(f"Response: {fake_topup_response.text}")
        return False
    
    print("[PASS] All T25 Wallet API top-up tests passed")
    return True


if __name__ == "__main__":
    success = run()
    print(f"\nT25 Wallet top-up test: {'[PASS]' if success else '[FAIL]'}")
    sys.exit(0 if success else 1)