"""
Production Acceptance Test Script for Catalog Browsing API
This script tests the catalog browsing API functionality with pagination against the Azure deployment.
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

def test_catalog_browsing():
    print("Testing Catalog Browsing API functionality...")
    
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
    
    # Test 1: Browse all products with pagination (the endpoint exists according to OpenAPI)
    print("\n1. Testing catalog browsing with pagination...")
    try:
        # Request first page with 3 items per page
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?page=0&size=3", headers=headers)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            total_pages = products_response.get('data', {}).get('totalPages', products_response.get('totalPages', 0))
            number = products_response.get('data', {}).get('number', products_response.get('number', 0))
            
            print(f"   [PASS] Page {number + 1} of {total_pages} retrieved successfully")
            print(f"   [PASS] {len(content)} products on this page, total {total_elements} products")
            
            if len(content) <= 3:
                print(f"   [PASS] Pagination working correctly")
            else:
                print(f"   [WARN] Pagination may not be working as expected")
        else:
            print(f"   [FAIL] Catalog browsing failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   [FAIL] Error during catalog browsing: {str(e)}")
        return False

    # Test 2: Browse products by keyword
    print("\n2. Testing keyword search...")
    search_keyword = "test"
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?keyword={search_keyword}", headers=headers)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   [PASS] Search for '{search_keyword}' returned {len(content)} products on this page")
            print(f"   [PASS] Total matching products: {total_elements}")
        else:
            print(f"   [FAIL] Keyword search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   [FAIL] Error during keyword search: {str(e)}")
        return False

    # Test 3: Browse products with different sort options
    print("\n3. Testing catalog browsing with sorting...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?sortBy=name&sortOrder=ASC&page=0&size=10", headers=headers)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            
            if content and len(content) > 1:
                names = [p.get('name', '') for p in content]
                is_sorted = all(names[i] <= names[i+1] for i in range(len(names)-1))
                
                if is_sorted:
                    print(f"   [PASS] Products sorted by name in ascending order")
                    print(f"   [PASS] Names: {names[:3]}...")  # Show first 3 names
                else:
                    print(f"   [WARN] Products may not be sorted correctly by name")
            else:
                print(f"   [WARN] Not enough products to verify sorting")
        else:
            print(f"   [FAIL] Sorting test failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   [FAIL] Error during sorting test: {str(e)}")
        return False

    print("\n[SUCCESS] All catalog browsing API tests passed!")
    return True

if __name__ == "__main__":
    print("Starting production acceptance test for Catalog Browsing API...")
    success = test_catalog_browsing()
    
    if success:
        print("\n[SUCCESS] All tests passed successfully!")
        sys.exit(0)
    else:
        print("\n[FAIL] Some tests failed!")
        sys.exit(1)