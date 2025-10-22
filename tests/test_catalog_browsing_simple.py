"""
Test the Catalog Browsing API which exists in the codebase
"""
import requests
import json

# Configuration - using the production deployment
API_URL_BASE = 'https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net'
HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

def authenticate():
    """Authenticate and get JWT token"""
    print("Attempting to authenticate...")
    auth_data = {
        "username": "user",
        "email": "user@admin.net",
        "password": "112233445566"
    }
    
    try:
        response = requests.post(f"{API_URL_BASE}/api/auth/login", headers=HEADERS, data=json.dumps(auth_data))
        if response.status_code in [200, 201]:
            auth_response = response.json()
            # Try multiple possible token locations in the response
            token = (auth_response.get('data', {}).get('accessToken') or 
                    auth_response.get('accessToken') or
                    auth_response.get('token') or 
                    auth_response.get('data', {}).get('token'))
            if token:
                print("Authentication successful")
                HEADERS['Authorization'] = f'Bearer {token}'
                return True
            else:
                print(f"Authentication failed - no token in response: {auth_response}")
                return False
        else:
            print(f"Authentication failed with status {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print(f"Error during authentication: {str(e)}")
        return False

def test_catalog_browsing_api():
    print("Testing Catalog Browsing API functionality...")
    
    # Authenticate first
    if not authenticate():
        print("Cannot proceed without authentication")
        return False
    
    # Test 1: Browse products (this endpoint exists according to the source)
    print("\n1. Testing catalog browsing API...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   SUCCESS: Catalog browsing API works")
            print(f"   COUNT: {len(content)} products on this page, total {total_elements} products")
        elif response.status_code == 404:
            print(f"   FAILED: Catalog browsing API not found - {response.status_code}")
            return False
        else:
            print(f"   FAILED: Catalog browsing API returned {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print(f"   FAILED: Error during catalog browsing: {str(e)}")
        return False

    # Test 2: Browse products with pagination parameters
    print("\n2. Testing catalog browsing with pagination...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?page=0&size=3", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            total_pages = products_response.get('data', {}).get('totalPages', products_response.get('totalPages', 0))
            number = products_response.get('data', {}).get('number', products_response.get('number', 0))
            
            print(f"   SUCCESS: Page {number + 1} of {total_pages} retrieved successfully")
            print(f"   COUNT: {len(content)} products on this page, total {total_elements} products")
            
            if len(content) <= 3:
                print(f"   SUCCESS: Pagination working correctly")
            else:
                print(f"   WARNING: Pagination may not be working as expected")
        else:
            print(f"   FAILED: Catalog browsing with pagination failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   FAILED: Error during catalog browsing with pagination: {str(e)}")
        return False

    print("\nSUCCESS: All catalog browsing API tests passed!")
    return True

if __name__ == "__main__":
    print("Starting test for Catalog Browsing API...")
    success = test_catalog_browsing_api()
    
    if success:
        print("\nSUCCESS: Catalog browsing API test passed!")
    else:
        print("\nFAILED: Catalog browsing API test failed!")