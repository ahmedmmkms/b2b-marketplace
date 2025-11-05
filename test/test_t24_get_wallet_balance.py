#!/usr/bin/env python3
"""Test script for T24 - Wallet API get balance functionality."""

import json
import sys
import os
import uuid
import requests

# Add the project root to the Python path to import test_utils
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import test_utils

def run():
    """Execute T24 Wallet API get balance tests."""
    print("Testing T24 - Wallet API get balance functionality...")
    
    # Get API base URL
    api_base = test_utils.get_api_base_url()
    
    # Step 1: Ensure we can authenticate as admin to create an organization
    if not test_utils.authenticate_user("admin"):
        print("[FAIL] Could not authenticate admin user")
        return False
    
    admin_headers = test_utils.get_auth_headers("admin")
    if admin_headers is None:
        print("[FAIL] Could not get authentication headers for admin")
        return False

    # Create an organization to test wallet functionality
    vendor_payload = {"name": f"T24 Wallet Test Org {uuid.uuid4().hex[:8]}"}
    vendors_url = f"{api_base}/vendors"

    vendor_response = requests.post(
        vendors_url,
        json=vendor_payload,
        headers=admin_headers,
        timeout=30,
    )

    if vendor_response.status_code != 201:
        print(f"[FAIL] Failed to create vendor org for wallet test: {vendor_response.status_code}")
        print(f"Response: {vendor_response.text}")
        return False

    org_id = vendor_response.json().get("id")
    if not org_id:
        print("[FAIL] Vendor creation response missing 'id'")
        return False

    print(f"Created organization for wallet test: {org_id}")
    
    # Step 2: Test GET wallet balance for the organization
    print("Step 2: Testing GET wallet balance endpoint...")
    
    wallet_url = f"{api_base}/wallets/{org_id}"
    
    # Test with admin user first (since wallet functionality might require specific permissions)
    admin_headers_with_auth = test_utils.get_auth_headers("admin")
    if admin_headers_with_auth is None:
        print("[FAIL] Could not get authentication headers for admin to access wallet")
        return False
    
    get_wallet_response = requests.get(
        wallet_url,
        headers=admin_headers_with_auth,
        timeout=30,
    )
    
    if get_wallet_response.status_code != 200:
        print(f"[FAIL] Failed to get wallet balance: {get_wallet_response.status_code}")
        print(f"Response: {get_wallet_response.text}")
        return False
    
    wallet_data = get_wallet_response.json()
    
    # Check that response contains balance field
    if "balance" not in wallet_data:
        print(f"[FAIL] Missing 'balance' field in wallet response")
        print(f"Response: {wallet_data}")
        return False
    
    balance = wallet_data["balance"]
    
    # Verify balance is a number
    if not isinstance(balance, (int, float)):
        print(f"[FAIL] Balance field is not a number, got: {type(balance)} - {balance}")
        return False
    
    print(f"[PASS] Successfully retrieved wallet balance: {balance}")
    
    # Step 3: Test with other user roles to verify access permissions
    print("Step 3: Testing wallet access with different user roles...")
    
    # Test with buyer user
    if not test_utils.authenticate_user("buyer"):
        print("[FAIL] Could not authenticate buyer user")
        return False
    
    buyer_headers = test_utils.get_auth_headers("buyer")
    if buyer_headers is None:
        print("[INFO] Buyer user authentication failed, skipping buyer test")
    else:
        buyer_wallet_response = requests.get(
            wallet_url,
            headers=buyer_headers,
            timeout=30,
        )
        
        # The response could be 200 (allowed) or 403/404 (access denied) depending on business logic
        if buyer_wallet_response.status_code == 200:
            buyer_wallet_data = buyer_wallet_response.json()
            if "balance" in buyer_wallet_data:
                print(f"[PASS] Buyer user can access wallet balance: {buyer_wallet_data['balance']}")
            else:
                print(f"[FAIL] Buyer user could access wallet but response missing 'balance': {buyer_wallet_data}")
                return False
        elif buyer_wallet_response.status_code in [403, 404]:
            print(f"[PASS] Buyer user correctly restricted from accessing wallet (status: {buyer_wallet_response.status_code})")
        else:
            print(f"[FAIL] Unexpected response for buyer wallet access: {buyer_wallet_response.status_code}")
            print(f"Response: {buyer_wallet_response.text}")
            return False
    
    # Test with vendor user
    # First, register a vendor user for this organization
    previous_token = test_utils.auth_token
    vendor_email = f"t24_wallet_vendor_{uuid.uuid4().hex[:8]}@example.com"
    if not test_utils.register_user_with_vendor(
        org_id,
        email=vendor_email,
        password="112233445566",
        full_name="T24 Wallet Vendor User",
    ):
        print("[INFO] Could not provision vendor user for wallet test, skipping vendor test")
    else:
        vendor_token = test_utils.auth_token
        test_utils.ROLE_TOKENS["vendor"] = vendor_token
        test_utils.auth_token = previous_token
        vendor_headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {vendor_token}",
        }
        
        vendor_wallet_response = requests.get(
            wallet_url,
            headers=vendor_headers,
            timeout=30,
        )
        
        if vendor_wallet_response.status_code == 200:
            vendor_wallet_data = vendor_wallet_response.json()
            if "balance" in vendor_wallet_data:
                print(f"[PASS] Vendor user can access wallet balance: {vendor_wallet_data['balance']}")
            else:
                print(f"[FAIL] Vendor user could access wallet but response missing 'balance': {vendor_wallet_data}")
                return False
        elif vendor_wallet_response.status_code in [403, 404]:
            print(f"[PASS] Vendor user correctly restricted from accessing wallet (status: {vendor_wallet_response.status_code})")
        else:
            print(f"[FAIL] Unexpected response for vendor wallet access: {vendor_wallet_response.status_code}")
            print(f"Response: {vendor_wallet_response.text}")
            return False
    
    # Step 4: Test with non-existent organization ID (should return 404)
    print("Step 4: Testing wallet access with non-existent organization ID...")
    
    fake_org_id = test_utils.generate_valid_ulid()
    fake_wallet_url = f"{api_base}/wallets/{fake_org_id}"
    
    fake_wallet_response = requests.get(
        fake_wallet_url,
        headers=admin_headers,
        timeout=30,
    )
    
    # According to the updated requirement, API should return 404 for unknown org IDs
    # rather than creating a wallet for non-existent organizations
    if fake_wallet_response.status_code == 404:
        print(f"[PASS] Wallet endpoint correctly returns 404 for non-existent org")
        
        # Check that the response follows RFC7807 error format
        error_response = fake_wallet_response.json()
        rfc7807_fields = ["type", "title", "status", "detail"]
        for field in rfc7807_fields:
            if field not in error_response:
                print(f"[WARN] Missing RFC7807 field '{field}' in 404 response: {error_response}")
        
        if error_response.get("status") == 404:
            print(f"[PASS] 404 response contains correct status code in RFC7807 format")
        else:
            print(f"[WARN] 404 response has unexpected status: {error_response.get('status')}")
    else:
        print(f"[FAIL] Expected 404 for non-existent org, got: {fake_wallet_response.status_code}")
        print(f"Response: {fake_wallet_response.text}")
        return False
    
    print("[PASS] All T24 Wallet API get balance tests passed")
    return True


if __name__ == "__main__":
    success = run()
    print(f"\nT24 Get wallet balance test: {'[PASS]' if success else '[FAIL]'}")
    sys.exit(0 if success else 1)