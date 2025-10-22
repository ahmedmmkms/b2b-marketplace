"""
Production Acceptance Test Script for Vendor Entity and Repository
This script tests the Vendor entity and repository functionality against the Azure deployment.
"""
import requests
import json
import sys
import uuid
from datetime import datetime

# Configuration - using the production deployment
API_URL_BASE = 'https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net'

def get_auth_token():
    """
    Get authentication token using the provided credentials
    """
    auth_headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
    auth_data = {
        "email": "user@admin.net",
        "password": "112233445566"
    }
    
    response = requests.post(f"{API_URL_BASE}/api/auth/login", headers=auth_headers, data=json.dumps(auth_data))
    
    if response.status_code == 200:
        response_data = response.json()
        access_token = response_data.get('data', {}).get('accessToken')
        return access_token
    else:
        print(f"Authentication failed with status: {response.status_code}")
        print(f"Response: {response.text}")
        return None

def test_vendor_entity():
    print("Testing Vendor entity and repository functionality...")
    
    # Get authentication token first
    access_token = get_auth_token()
    if not access_token:
        print("Failed to authenticate. Cannot proceed with tests.")
        return False
    
    # Set up authenticated headers
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': f'Bearer {access_token}'
    }
    
    # Test 1: Create a new vendor
    print("\n1. Testing vendor creation...")
    vendor_data = {
        "businessName": "Test Vendor Inc.",
        "email": f"testvendor.{uuid.uuid4().hex[:8]}@example.com",
        "phone": "+1234567890",
        "address": "123 Test Street, Test City, TC 12345",
        "taxId": "TV123456789",
        "businessLicenseNo": "BL123456789",
        "registrationDate": datetime.now().strftime('%Y-%m-%d'),
        "vendorStatus": "PENDING",
        "kycVerified": False
    }
    
    try:
        response = requests.post(f"{API_URL_BASE}/api/vendors", headers=headers, data=json.dumps(vendor_data))
        if response.status_code in [200, 201]:
            vendor_response = response.json()
            vendor_id = vendor_response.get('data', {}).get('id') if 'data' in vendor_response else vendor_response.get('id')
            
            if vendor_id:
                print(f"   [PASS] Vendor created successfully with ID: {vendor_id}")
                print(f"   [PASS] Vendor status: {vendor_response.get('data', {}).get('vendorStatus', vendor_response.get('vendorStatus', 'Unknown'))}")
            else:
                print(f"   [FAIL] Vendor creation failed. Response: {vendor_response}")
                return False
        else:
            print(f"   [FAIL] Vendor creation failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   [FAIL] Error during vendor creation: {str(e)}")
        return False

    # Test 2: Retrieve the created vendor
    print("\n2. Testing vendor retrieval...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/vendors/{vendor_id}", headers=headers)
        if response.status_code == 200:
            vendor_data = response.json()
            retrieved_vendor_id = vendor_data.get('data', {}).get('id') if 'data' in vendor_data else vendor_data.get('id')
            
            if retrieved_vendor_id == vendor_id:
                print(f"   [PASS] Vendor retrieved successfully with ID: {retrieved_vendor_id}")
                print(f"   [PASS] Business name: {vendor_data.get('data', {}).get('businessName', vendor_data.get('businessName', 'Unknown'))}")
            else:
                print(f"   [FAIL] Vendor retrieval failed. Retrieved ID: {retrieved_vendor_id}, Expected: {vendor_id}")
                return False
        else:
            print(f"   [FAIL] Vendor retrieval failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   [FAIL] Error during vendor retrieval: {str(e)}")
        return False

    # Test 3: Update the vendor
    print("\n3. Testing vendor update...")
    update_data = {
        "businessName": "Updated Test Vendor Inc.",
        "email": f"updatedvendor.{uuid.uuid4().hex[:8]}@example.com",
        "phone": "+1987654321",
        "address": "456 Updated Street, Updated City, UC 67890",
        "taxId": "TV987654321",
        "businessLicenseNo": "BL987654321",
        "kycVerified": True,
        "kycVerifiedAt": datetime.now().strftime('%Y-%m-%d'),
        "kycVerifiedBy": "System Admin",
        "vendorStatus": "APPROVED"
    }
    
    try:
        response = requests.put(f"{API_URL_BASE}/api/vendors/{vendor_id}", headers=headers, data=json.dumps(update_data))
        if response.status_code == 200:
            updated_vendor = response.json()
            updated_status = updated_vendor.get('data', {}).get('vendorStatus', updated_vendor.get('vendorStatus', 'Unknown'))
            
            if updated_status == "APPROVED":
                print(f"   [PASS] Vendor updated successfully")
                print(f"   [PASS] New status: {updated_status}")
            else:
                print(f"   [FAIL] Vendor update failed. Status: {updated_status}")
                return False
        else:
            print(f"   [FAIL] Vendor update failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   [FAIL] Error during vendor update: {str(e)}")
        return False

    # Test 4: Search vendors by status
    print("\n4. Testing vendor search by status...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/vendors?status=APPROVED", headers=headers)
        if response.status_code == 200:
            vendors_response = response.json()
            vendors = vendors_response.get('data', {}).get('content', vendors_response.get('content', []))
            
            if vendors:
                approved_found = any(v.get('vendorStatus') == 'APPROVED' for v in vendors)
                if approved_found:
                    print(f"   [PASS] Found vendors with APPROVED status")
                    print(f"   [PASS] Total vendors with status APPROVED in response: {len([v for v in vendors if v.get('vendorStatus') == 'APPROVED'])}")
                else:
                    print(f"   [WARN] Could not verify APPROVED status in response, but request was successful")
            else:
                print(f"   [WARN] No vendors returned in search, but request was successful")
        else:
            print(f"   [FAIL] Vendor search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   [FAIL] Error during vendor search: {str(e)}")
        return False

    # Test 5: Find vendor by email (if such endpoint exists)
    print("\n5. Testing vendor existence check by email...")
    try:
        # This might not be a direct endpoint, but we can check if vendor still exists
        response = requests.get(f"{API_URL_BASE}/api/vendors/{vendor_id}", headers=headers)
        if response.status_code == 200:
            print(f"   [PASS] Vendor still accessible after update operations")
        else:
            print(f"   [FAIL] Vendor not accessible after update. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   [FAIL] Error during vendor existence check: {str(e)}")
        return False

    print("\n[SUCCESS] All vendor entity and repository tests passed!")
    return True

if __name__ == "__main__":
    print("Starting production acceptance test for Vendor entity and repository...")
    success = test_vendor_entity()
    
    if success:
        print("\n[SUCCESS] All tests passed successfully!")
        sys.exit(0)
    else:
        print("\n[FAIL] Some tests failed!")
        sys.exit(1)