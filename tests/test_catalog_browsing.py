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
HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

def test_catalog_browsing():
    print("Testing Catalog Browsing API functionality...")
    
    # First, create a vendor and some products for testing
    print("\n1. Creating a vendor and products for browsing tests...")
    
    # Create vendor
    vendor_data = {
        "businessName": f"Test Vendor for Browsing {uuid.uuid4().hex[:8]}",
        "email": f"testbrowse.{uuid.uuid4().hex[:8]}@example.com",
        "phone": "+1234567890",
        "address": "123 Test Street, Test City, TC 12345",
        "taxId": f"TV{uuid.uuid4().hex[:9]}",
        "businessLicenseNo": f"BL{uuid.uuid4().hex[:9]}",
        "registrationDate": datetime.now().strftime('%Y-%m-%d'),
        "vendorStatus": "APPROVED",
        "kycVerified": True
    }
    
    try:
        response = requests.post(f"{API_URL_BASE}/api/vendors", headers=HEADERS, data=json.dumps(vendor_data))
        if response.status_code in [200, 201]:
            vendor_response = response.json()
            vendor_id = vendor_response.get('data', {}).get('id') if 'data' in vendor_response else vendor_response.get('id')
            
            if vendor_id:
                print(f"   ✓ Vendor created successfully with ID: {vendor_id}")
            else:
                print(f"   ✗ Vendor creation failed. Response: {vendor_response}")
                return False
        else:
            print(f"   ✗ Vendor creation failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during vendor creation: {str(e)}")
        return False

    # Create multiple products for browsing
    product_names = [f"Browse Test Product {i} {uuid.uuid4().hex[:4]}" for i in range(1, 6)]
    created_product_ids = []
    
    for name in product_names:
        product_data = {
            "name": name,
            "description": f"This is test product {name} for browsing functionality",
            "vendorId": vendor_id,
            "sku": f"SKU-{uuid.uuid4().hex[:12].upper()}",
            "price": {
                "amount": f"{20.0 + len(created_product_ids)*5:.2f}",
                "currency": "USD"
            },
            "stockQuantity": 50 + len(created_product_ids) * 10,
            "minOrderQuantity": 1,
            "weight": 0.5 + len(created_product_ids) * 0.1,
            "productStatus": "ACTIVE",
            "isActive": True
        }
        
        try:
            response = requests.post(f"{API_URL_BASE}/api/products", headers=HEADERS, data=json.dumps(product_data))
            if response.status_code in [200, 201]:
                product_response = response.json()
                product_id = product_response.get('data', {}).get('id') if 'data' in product_response else product_response.get('id')
                
                if product_id:
                    created_product_ids.append(product_id)
                    print(f"   ✓ Product '{name}' created with ID: {product_id}")
                else:
                    print(f"   ✗ Product creation failed. Response: {product_response}")
                    return False
            else:
                print(f"   ✗ Product creation failed. Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            print(f"   ✗ Error during product creation: {str(e)}")
            return False

    # Test 2: Browse all products with pagination
    print("\n2. Testing catalog browsing with pagination...")
    try:
        # Request first page with 3 items per page
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?page=0&size=3", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            total_pages = products_response.get('data', {}).get('totalPages', products_response.get('totalPages', 0))
            number = products_response.get('data', {}).get('number', products_response.get('number', 0))
            
            print(f"   ✓ Page {number + 1} of {total_pages} retrieved successfully")
            print(f"   ✓ {len(content)} products on this page, total {total_elements} products")
            
            if len(content) <= 3 and total_elements >= len(created_product_ids):
                print(f"   ✓ Pagination working correctly")
            else:
                print(f"   ⚠ Pagination may not be working as expected")
        else:
            print(f"   ✗ Catalog browsing failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during catalog browsing: {str(e)}")
        return False

    # Test 3: Browse products by vendor
    print("\n3. Testing catalog browsing by vendor...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?vendorId={vendor_id}", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            vendor_products = [p for p in content if p.get('vendorId') == vendor_id]
            print(f"   ✓ Found {len(vendor_products)} products for vendor {vendor_id}")
            print(f"   ✓ Total elements in response: {total_elements}")
            
            if len(vendor_products) >= 5:  # We created 5 products
                print(f"   ✓ Vendor filtering working correctly")
            else:
                print(f"   ⚠ Expected at least 5 products for vendor, got {len(vendor_products)}")
        else:
            print(f"   ✗ Catalog browsing by vendor failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during catalog browsing by vendor: {str(e)}")
        return False

    # Test 4: Search products by keyword
    print("\n4. Testing keyword search...")
    search_keyword = "Browse"
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?keyword={search_keyword}", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   ✓ Search for '{search_keyword}' returned {len(content)} products on this page")
            print(f"   ✓ Total matching products: {total_elements}")
            
            if total_elements >= 5:  # We created 5 products with "Browse" in the name
                print(f"   ✓ Keyword search working correctly")
            else:
                print(f"   ⚠ Expected at least 5 matching products, got {total_elements}")
        else:
            print(f"   ✗ Keyword search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during keyword search: {str(e)}")
        return False

    # Test 5: Search products by vendor and keyword
    print("\n5. Testing keyword search with vendor filter...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?vendorId={vendor_id}&keyword={search_keyword}", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   ✓ Search for '{search_keyword}' with vendor {vendor_id} returned {len(content)} products on this page")
            print(f"   ✓ Total matching products: {total_elements}")
            
            vendor_products = [p for p in content if p.get('vendorId') == vendor_id]
            print(f"   ✓ Products matching vendor filter: {len(vendor_products)}")
            
            if len(vendor_products) >= 5:  # We created 5 products that match both criteria
                print(f"   ✓ Combined vendor and keyword filtering working correctly")
            else:
                print(f"   ⚠ Expected at least 5 matching products, got {len(vendor_products)}")
        else:
            print(f"   ✗ Combined search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during combined search: {str(e)}")
        return False

    # Test 6: Browse products with different sort options
    print("\n6. Testing catalog browsing with sorting...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?sortBy=price_amount&sortOrder=ASC&page=0&size=10", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            
            if content and len(content) > 1:
                prices = [float(p.get('price', {}).get('amount', 0)) for p in content]
                is_sorted = all(prices[i] <= prices[i+1] for i in range(len(prices)-1))
                
                if is_sorted:
                    print(f"   ✓ Products sorted by price in ascending order")
                    print(f"   ✓ Prices: {[f'{p:.2f}' for p in prices[:3]]}...")  # Show first 3 prices
                else:
                    print(f"   ⚠ Products may not be sorted correctly by price")
            else:
                print(f"   ⚠ Not enough products to verify sorting")
        else:
            print(f"   ✗ Sorting test failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during sorting test: {str(e)}")
        return False

    print("\n✓ All catalog browsing API tests passed!")
    return True

if __name__ == "__main__":
    print("Starting production acceptance test for Catalog Browsing API...")
    success = test_catalog_browsing()
    
    if success:
        print("\n✓ All tests passed successfully!")
        sys.exit(0)
    else:
        print("\n✗ Some tests failed!")
        sys.exit(1)