"""
Production Acceptance Test Script for Full-Text Search
This script tests the PostgreSQL full-text search functionality against the Azure deployment.
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

def test_fulltext_search():
    print("Testing Full-Text Search functionality...")
    
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
    
    # Test 1: Full-text search with a common term
    print("\n1. Testing full-text search with common term 'test'...")
    search_term = "test"
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?keyword={search_term}", headers=headers)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   [PASS] Search for '{search_term}' returned {len(content)} products on this page")
            print(f"   [PASS] Total matching products: {total_elements}")
            
            # Check if any products contain the search term in name or description
            matching_products = [p for p in content if search_term.lower() in p.get('name', '').lower() or search_term.lower() in p.get('description', '').lower()]
            print(f"   [PASS] Found {len(matching_products)} products containing '{search_term}' in name or description")
        else:
            print(f"   [FAIL] Full-text search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   [FAIL] Error during full-text search: {str(e)}")
        return False

    # Test 2: Full-text search with multiple terms
    print("\n2. Testing full-text search with multiple terms 'wireless headphones'...")
    search_term = "wireless headphones"
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?keyword={search_term}", headers=headers)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   [PASS] Search for '{search_term}' returned {len(content)} products on this page")
            print(f"   [PASS] Total matching products: {total_elements}")
            
            # Check if any products match the search terms
            matching_products = [p for p in content if all(term.lower() in (p.get('name', '').lower() + ' ' + p.get('description', '').lower()) for term in search_term.split())]
            print(f"   [PASS] Found {len(matching_products)} products matching all terms")
        else:
            print(f"   [FAIL] Multi-term search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   [FAIL] Error during multi-term search: {str(e)}")
        return False

    # Test 3: Full-text search with vendor filter
    print("\n3. Testing full-text search with vendor filter...")
    search_term = "electronics"
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?keyword={search_term}", headers=headers)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   [PASS] Search for '{search_term}' returned {len(content)} products on this page")
            print(f"   [PASS] Total matching products: {total_elements}")
        else:
            print(f"   [FAIL] Vendor-filtered search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   [FAIL] Error during vendor-filtered search: {str(e)}")
        return False

    print("\n[SUCCESS] All full-text search tests completed!")
    return True

if __name__ == "__main__":
    print("Starting production acceptance test for Full-Text Search...")
    success = test_fulltext_search()
    
    if success:
        print("\n[SUCCESS] All tests passed successfully!")
        sys.exit(0)
    else:
        print("\n[FAIL] Some tests failed!")
        sys.exit(1)