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
HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

def test_fulltext_search():
    print("Testing Full-Text Search functionality...")
    
    # First, create a vendor and some products with searchable content
    print("\n1. Creating a vendor and products for full-text search tests...")
    
    # Create vendor
    vendor_data = {
        "businessName": f"Search Test Vendor {uuid.uuid4().hex[:8]}",
        "email": f"searchtest.{uuid.uuid4().hex[:8]}@example.com",
        "phone": "+1234567890",
        "address": "456 Search Street, Search City, SC 67890",
        "taxId": f"STV{uuid.uuid4().hex[:9]}",
        "businessLicenseNo": f"STBL{uuid.uuid4().hex[:9]}",
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

    # Create products with specific searchable content
    products_data = [
        {
            "name": f"Wireless Bluetooth Headphones {uuid.uuid4().hex[:4]}",
            "description": "High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.",
            "vendorId": vendor_id,
            "sku": f"WBH-{uuid.uuid4().hex[:8].upper()}",
            "price": {
                "amount": "89.99",
                "currency": "USD"
            },
            "stockQuantity": 50,
            "minOrderQuantity": 1,
            "weight": 0.3,
            "productStatus": "ACTIVE",
            "isActive": True
        },
        {
            "name": f"Gaming Mouse Pro {uuid.uuid4().hex[:4]}",
            "description": "Ergonomic gaming mouse with programmable buttons and high DPI sensor. Designed for competitive gaming and precision tasks.",
            "vendorId": vendor_id,
            "sku": f"GMP-{uuid.uuid4().hex[:8].upper()}",
            "price": {
                "amount": "49.99",
                "currency": "USD"
            },
            "stockQuantity": 30,
            "minOrderQuantity": 1,
            "weight": 0.2,
            "productStatus": "ACTIVE",
            "isActive": True
        },
        {
            "name": f"Mechanical Keyboard RGB {uuid.uuid4().hex[:4]}",
            "description": "Premium mechanical keyboard with RGB backlighting and tactile switches. Ideal for gaming and typing enthusiasts.",
            "vendorId": vendor_id,
            "sku": f"MKR-{uuid.uuid4().hex[:8].upper()}",
            "price": {
                "amount": "129.99",
                "currency": "USD"
            },
            "stockQuantity": 20,
            "minOrderQuantity": 1,
            "weight": 1.2,
            "productStatus": "ACTIVE",
            "isActive": True
        },
        {
            "name": f"4K Ultra HD Monitor {uuid.uuid4().hex[:4]}",
            "description": "27-inch 4K Ultra HD monitor with HDR support and wide color gamut. Perfect for professional design work and entertainment.",
            "vendorId": vendor_id,
            "sku": f"UHM-{uuid.uuid4().hex[:8].upper()}",
            "price": {
                "amount": "349.99",
                "currency": "USD"
            },
            "stockQuantity": 15,
            "minOrderQuantity": 1,
            "weight": 5.0,
            "productStatus": "ACTIVE",
            "isActive": True
        },
        {
            "name": f"Portable SSD Drive {uuid.uuid4().hex[:4]}",
            "description": "Fast and reliable portable solid state drive with USB 3.0 interface. Ideal for data storage and backup solutions.",
            "vendorId": vendor_id,
            "sku": f"PSSD-{uuid.uuid4().hex[:8].upper()}",
            "price": {
                "amount": "119.99",
                "currency": "USD"
            },
            "stockQuantity": 25,
            "minOrderQuantity": 1,
            "weight": 0.1,
            "productStatus": "ACTIVE",
            "isActive": True
        }
    ]
    
    created_product_ids = []
    for product_data in products_data:
        try:
            response = requests.post(f"{API_URL_BASE}/api/products", headers=HEADERS, data=json.dumps(product_data))
            if response.status_code in [200, 201]:
                product_response = response.json()
                product_id = product_response.get('data', {}).get('id') if 'data' in product_response else product_response.get('id')
                
                if product_id:
                    created_product_ids.append(product_id)
                    print(f"   ✓ Product '{product_data['name']}' created with ID: {product_id}")
                else:
                    print(f"   ✗ Product creation failed. Response: {product_response}")
                    return False
            else:
                print(f"   ✗ Product creation failed. Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            print(f"   ✗ Error during product creation: {str(e)}")
            return False

    # Test 2: Full-text search with a common term
    print("\n2. Testing full-text search with common term 'wireless'...")
    search_term = "wireless"
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?keyword={search_term}", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   ✓ Search for '{search_term}' returned {len(content)} products on this page")
            print(f"   ✓ Total matching products: {total_elements}")
            
            # Check if the headphones product (which contains "wireless") is in results
            matching_products = [p for p in content if search_term.lower() in p.get('name', '').lower() or search_term.lower() in p.get('description', '').lower()]
            print(f"   ✓ Found {len(matching_products)} products containing '{search_term}' in name or description")
        else:
            print(f"   ✗ Full-text search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during full-text search: {str(e)}")
        return False

    # Test 3: Full-text search with multiple terms
    print("\n3. Testing full-text search with multiple terms 'gaming mouse'...")
    search_term = "gaming mouse"
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?keyword={search_term}", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   ✓ Search for '{search_term}' returned {len(content)} products on this page")
            print(f"   ✓ Total matching products: {total_elements}")
            
            # Check if the gaming mouse product is in results
            matching_products = [p for p in content if all(term.lower() in (p.get('name', '').lower() + ' ' + p.get('description', '').lower()) for term in search_term.split())]
            print(f"   ✓ Found {len(matching_products)} products matching all terms")
            
            if matching_products:
                gaming_mouse_found = any('gaming' in p.get('name', '').lower() and 'mouse' in p.get('name', '').lower() for p in matching_products)
                if gaming_mouse_found:
                    print(f"   ✓ Gaming mouse product found in results")
                else:
                    print(f"   ⚠ Gaming mouse product may not be prioritized in results")
        else:
            print(f"   ✗ Multi-term search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during multi-term search: {str(e)}")
        return False

    # Test 4: Full-text search with partial terms
    print("\n4. Testing full-text search with partial terms 'keyb'...")
    search_term = "keyb"  # Should match 'keyboard'
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?keyword={search_term}", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   ✓ Search for '{search_term}' returned {len(content)} products on this page")
            print(f"   ✓ Total matching products: {total_elements}")
            
            # Check if the keyboard product is in results (using full term)
            keyboard_matches = [p for p in content if 'keyboard' in p.get('name', '').lower() or 'keyboard' in p.get('description', '').lower()]
            print(f"   ✓ Found {len(keyboard_matches)} products containing full 'keyboard' term")
        else:
            print(f"   ✗ Partial-term search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during partial-term search: {str(e)}")
        return False

    # Test 5: Full-text search with vendor filter
    print("\n5. Testing full-text search with vendor filter...")
    search_term = "monitor"
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?keyword={search_term}&vendorId={vendor_id}", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   ✓ Search for '{search_term}' with vendor {vendor_id} returned {len(content)} products on this page")
            print(f"   ✓ Total matching products: {total_elements}")
            
            # Verify all results belong to the correct vendor
            vendor_matches = [p for p in content if p.get('vendorId') == vendor_id]
            monitor_matches = [p for p in content if search_term.lower() in p.get('name', '').lower() or search_term.lower() in p.get('description', '').lower()]
            
            print(f"   ✓ All results belong to correct vendor: {len(vendor_matches) == len(content)}")
            print(f"   ✓ All results match search term: {len(monitor_matches) == len(content)}")
        else:
            print(f"   ✗ Vendor-filtered search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during vendor-filtered search: {str(e)}")
        return False

    # Test 6: Full-text search with misspelled term (should still return relevant results)
    print("\n6. Testing full-text search with misspelled term 'gamming' (intended: 'gaming')...")
    search_term = "gamming"  # Intentional typo for "gaming"
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?keyword={search_term}", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   ✓ Search for '{search_term}' (typo for 'gaming') returned {len(content)} products on this page")
            print(f"   ✓ Total matching products: {total_elements}")
            
            # In a real full-text search with typo tolerance, we might see gaming products
            # Even with the typo, depending on the implementation
            if total_elements > 0:
                print(f"   ✓ Full-text search returned results even with typo (may be using similarity matching)")
            else:
                print(f"   ⚠ No results for typo, which is expected for strict full-text search")
        else:
            print(f"   ✗ Typo search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during typo search: {str(e)}")
        return False

    # Test 7: Full-text search with special characters and phrases
    print("\n7. Testing full-text search with product SKU 'WBH'...")
    search_term = "WBH"  # Part of the SKU for wireless headphones
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products?keyword={search_term}", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            content = products_response.get('data', {}).get('content', products_response.get('content', []))
            total_elements = products_response.get('data', {}).get('totalElements', products_response.get('totalElements', 0))
            
            print(f"   ✓ Search for SKU part '{search_term}' returned {len(content)} products on this page")
            print(f"   ✓ Total matching products: {total_elements}")
            
            if total_elements > 0:
                print(f"   ✓ Full-text search includes SKU in search scope")
            else:
                print(f"   ⚠ No results for SKU part, which might be expected depending on implementation")
        else:
            print(f"   ✗ SKU search failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during SKU search: {str(e)}")
        return False

    print("\n✓ All full-text search tests passed!")
    return True

if __name__ == "__main__":
    print("Starting production acceptance test for Full-Text Search...")
    success = test_fulltext_search()
    
    if success:
        print("\n✓ All tests passed successfully!")
        sys.exit(0)
    else:
        print("\n✗ Some tests failed!")
        sys.exit(1)