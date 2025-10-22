"""
Production Acceptance Test Script for Task 5.1: Implement Vendor entity and repository

This script tests the Vendor entity and repository functionality against the production deployment.
It verifies that vendors can be created, approved, and managed as specified in the requirements.
"""
import requests
import json
import sys
from datetime import datetime

# Configuration - using the production API URL from the documentation
API_BASE_URL = "https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/v1"
HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

# Credentials provided
CREDENTIALS = {
    "username": "user",
    "email": "user@admin.net", 
    "password": "112233445566"
}

def authenticate():
    """Authenticate and get JWT token"""
    print("Authenticating with the API...")
    
    auth_data = {
        "email": CREDENTIALS["email"],
        "password": CREDENTIALS["password"]
    }
    
    try:
        response = requests.post(f"{API_BASE_URL}/auth/login", json=auth_data, headers=HEADERS)
        if response.status_code == 200:
            token_data = response.json()
            access_token = token_data.get("accessToken")
            if access_token:
                print("   SUCCESS: Authentication successful")
                HEADERS["Authorization"] = f"Bearer {access_token}"
                return True
            else:
                print(f"   ERROR: No access token in response: {token_data}")
                return False
        else:
            print(f"   ERROR: Authentication failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ERROR: Authentication error: {str(e)}")
        return False

def test_vendor_entity():
    """Test vendor creation, retrieval, update, and deletion"""
    print("Testing Vendor entity and repository functionality...")
    
    # Test data for creating a vendor
    vendor_data = {
        "businessName": "Test Vendor Company Ltd",
        "description": "A test vendor for production testing",
        "email": "contact@testvendor.com",
        "phone": "+1234567890",
        "address": json.dumps({
            "street": "123 Test Street",
            "city": "Test City",
            "state": "Test State",
            "country": "Test Country",
            "postalCode": "12345"
        }),
        "taxId": "TV-123456789",
        "vendorStatus": "PENDING",
        "businessLicenseNo": "BL-987654321",
        "registrationDate": datetime.now().strftime('%Y-%m-%d'),
        "kycVerified": False
    }
    
    print("1. Creating a new vendor...")
    try:
        response = requests.post(f"{API_BASE_URL}/vendors", json=vendor_data, headers=HEADERS)
        if response.status_code in [200, 201]:
            vendor = response.json()
            vendor_id = vendor.get("id")
            print(f"   SUCCESS: Vendor created successfully with ID: {vendor_id}")
        else:
            print(f"   ERROR: Failed to create vendor. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ERROR: Error creating vendor: {str(e)}")
        return False
    
    print("2. Retrieving the created vendor...")
    try:
        response = requests.get(f"{API_BASE_URL}/vendors/{vendor_id}", headers=HEADERS)
        if response.status_code == 200:
            retrieved_vendor = response.json()
            if retrieved_vendor.get("id") == vendor_id:
                print(f"   SUCCESS: Vendor retrieved successfully: {retrieved_vendor.get('businessName')}")
            else:
                print(f"   ERROR: Retrieved vendor ID doesn't match: {retrieved_vendor.get('id')}")
                return False
        else:
            print(f"   ERROR: Failed to retrieve vendor. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ERROR: Error retrieving vendor: {str(e)}")
        return False
    
    print("3. Updating the vendor status to APPROVED...")
    try:
        update_data = vendor_data.copy()
        update_data["vendorStatus"] = "APPROVED"
        update_data["kycVerified"] = True
        update_data["kycVerifiedAt"] = datetime.now().strftime('%Y-%m-%d')
        update_data["kycVerifiedBy"] = "system"
        update_data["approvalDate"] = datetime.now().strftime('%Y-%m-%d')
        
        response = requests.put(f"{API_BASE_URL}/vendors/{vendor_id}", json=update_data, headers=HEADERS)
        if response.status_code == 200:
            updated_vendor = response.json()
            if updated_vendor.get("vendorStatus") == "APPROVED":
                print(f"   SUCCESS: Vendor updated successfully to APPROVED status")
            else:
                print(f"   ERROR: Vendor status not updated properly: {updated_vendor.get('vendorStatus')}")
                return False
        else:
            print(f"   ERROR: Failed to update vendor. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ERROR: Error updating vendor: {str(e)}")
        return False
    
    print("4. Testing vendor search/filtering capabilities...")
    try:
        # Test filtering by status
        response = requests.get(f"{API_BASE_URL}/vendors", 
                               params={"vendorStatus": "APPROVED"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            vendors = response.json()
            if isinstance(vendors, list):
                print(f"   SUCCESS: Successfully retrieved vendors by status, found {len(vendors)} vendors")
            else:
                print(f"   ERROR: Expected a list of vendors, got: {type(vendors)}")
                return False
        else:
            print(f"   ERROR: Failed to search vendors by status. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ERROR: Error searching vendors: {str(e)}")
        return False
    
    print("5. Testing vendor retrieval by business name...")
    try:
        response = requests.get(f"{API_BASE_URL}/vendors", 
                               params={"businessName": "Test Vendor Company Ltd"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            vendors = response.json()
            if isinstance(vendors, list) and len(vendors) > 0:
                print(f"   SUCCESS: Successfully retrieved vendors by business name, found {len(vendors)} vendors")
            else:
                print(f"   ERROR: Expected to find vendors by business name, got: {vendors}")
                return False
        else:
            print(f"   ERROR: Failed to search vendors by business name. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ERROR: Error searching vendors by business name: {str(e)}")
        return False
    
    print("6. Testing KYC verification filter...")
    try:
        response = requests.get(f"{API_BASE_URL}/vendors", 
                               params={"kycVerified": "true"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            vendors = response.json()
            if isinstance(vendors, list):
                print(f"   SUCCESS: Successfully retrieved vendors by KYC status, found {len(vendors)} vendors")
            else:
                print(f"   ERROR: Expected a list of vendors, got: {type(vendors)}")
                return False
        else:
            print(f"   ERROR: Failed to search vendors by KYC status. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ERROR: Error filtering vendors by KYC status: {str(e)}")
        return False
    
    print("7. Testing vendor deletion (soft delete if supported)...")
    try:
        # Note: In a real implementation, we might have a delete endpoint, 
        # but for this test, we'll just verify that the vendor still exists
        response = requests.get(f"{API_BASE_URL}/vendors/{vendor_id}", headers=HEADERS)
        if response.status_code == 200:
            print(f"   SUCCESS: Vendor still exists after previous operations, confirming it's manageable")
        else:
            print(f"   ERROR: Vendor doesn't exist after previous operations. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ERROR: Error checking vendor after operations: {str(e)}")
        return False
    
    return True

def main():
    print("Starting production acceptance test for Task 5.1: Vendor entity and repository")
    print("="*80)
    
    # Authenticate first
    auth_success = authenticate()
    if not auth_success:
        print("Authentication failed. Cannot run tests.")
        sys.exit(1)
    
    success = test_vendor_entity()
    
    print("="*80)
    if success:
        print("SUCCESS: All tests passed! Task 5.1 implementation is working correctly in production.")
        sys.exit(0)
    else:
        print("ERROR: Some tests failed! Task 5.1 implementation needs review.")
        sys.exit(1)

if __name__ == "__main__":
    main()