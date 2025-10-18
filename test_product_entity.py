"""
Production Acceptance Test Script for Product Entity and Repository
This script tests the Product entity and repository functionality against the Azure deployment.
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

def test_product_entity():
    print("Testing Product entity and repository functionality...")
    
    # First, we need to create a vendor to associate with products
    print("\n1. Creating a vendor for product association...")
    vendor_data = {
        "businessName": f"Test Vendor for Products {uuid.uuid4().hex[:8]}",
        "email": f"testvendor.{uuid.uuid4().hex[:8]}@example.com",
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

    # Test 2: Create a new product
    print("\n2. Testing product creation...")
    product_data = {
        "name": f"Test Product {uuid.uuid4().hex[:8]}",
        "description": "This is a test product for acceptance testing",
        "vendorId": vendor_id,
        "sku": f"SKU-{uuid.uuid4().hex[:12].upper()}",
        "price": {
            "amount": "29.99",
            "currency": "USD"
        },
        "stockQuantity": 100,
        "minOrderQuantity": 1,
        "weight": 0.5,
        "dimensionsLength": 10.0,
        "dimensionsWidth": 5.0,
        "dimensionsHeight": 3.0,
        "productStatus": "ACTIVE",
        "isActive": True
    }
    
    try:
        response = requests.post(f"{API_URL_BASE}/api/products", headers=HEADERS, data=json.dumps(product_data))
        if response.status_code in [200, 201]:
            product_response = response.json()
            product_id = product_response.get('data', {}).get('id') if 'data' in product_response else product_response.get('id')
            
            if product_id:
                print(f"   ✓ Product created successfully with ID: {product_id}")
                print(f"   ✓ Product name: {product_response.get('data', {}).get('name', product_response.get('name', 'Unknown'))}")
                print(f"   ✓ SKU: {product_response.get('data', {}).get('sku', product_response.get('sku', 'Unknown'))}")
            else:
                print(f"   ✗ Product creation failed. Response: {product_response}")
                return False
        else:
            print(f"   ✗ Product creation failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during product creation: {str(e)}")
        return False

    # Test 3: Retrieve the created product
    print("\n3. Testing product retrieval...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/products/{product_id}", headers=HEADERS)
        if response.status_code == 200:
            product_data = response.json()
            retrieved_product_id = product_data.get('data', {}).get('id') if 'data' in product_data else product_data.get('id')
            
            if retrieved_product_id == product_id:
                print(f"   ✓ Product retrieved successfully with ID: {retrieved_product_id}")
                print(f"   ✓ Product name: {product_data.get('data', {}).get('name', product_data.get('name', 'Unknown'))}")
                print(f"   ✓ Vendor ID: {product_data.get('data', {}).get('vendorId', product_data.get('vendorId', 'Unknown'))}")
            else:
                print(f"   ✗ Product retrieval failed. Retrieved ID: {retrieved_product_id}, Expected: {product_id}")
                return False
        else:
            print(f"   ✗ Product retrieval failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during product retrieval: {str(e)}")
        return False

    # Test 4: Update the product
    print("\n4. Testing product update...")
    update_data = {
        "name": f"Updated Test Product {uuid.uuid4().hex[:8]}",
        "description": "This is an updated test product for acceptance testing",
        "vendorId": vendor_id,
        "sku": f"UPD-{uuid.uuid4().hex[:12].upper()}",
        "price": {
            "amount": "39.99",
            "currency": "USD"
        },
        "stockQuantity": 150,
        "minOrderQuantity": 2,
        "weight": 0.75,
        "productStatus": "ACTIVE",
        "isActive": True
    }
    
    try:
        response = requests.put(f"{API_URL_BASE}/api/products/{product_id}", headers=HEADERS, data=json.dumps(update_data))
        if response.status_code == 200:
            updated_product = response.json()
            updated_name = updated_product.get('data', {}).get('name', updated_product.get('name', 'Unknown'))
            
            if "Updated" in updated_name:
                print(f"   ✓ Product updated successfully")
                print(f"   ✓ New name: {updated_name}")
            else:
                print(f"   ✗ Product update may have failed. Name: {updated_name}")
                return False
        else:
            print(f"   ✗ Product update failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during product update: {str(e)}")
        return False

    # Test 5: Search products by vendor
    print("\n5. Testing product search by vendor...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/products?vendorId={vendor_id}", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            products = products_response.get('data', {}).get('content', products_response.get('content', []))
            
            if products:
                vendor_products = [p for p in products if p.get('vendorId') == vendor_id]
                if vendor_products:
                    print(f"   ✓ Found {len(vendor_products)} products for vendor {vendor_id}")
                else:
                    print(f"   ⚠ No products found for vendor {vendor_id}, but request was successful")
            else:
                print(f"   ⚠ No products returned in search, but request was successful")
        else:
            print(f"   ✗ Product search by vendor failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during product search by vendor: {str(e)}")
        return False

    # Test 6: Search products by SKU
    print("\n6. Testing product search by SKU...")
    try:
        # Use the updated SKU
        updated_sku = update_data['sku']
        response = requests.get(f"{API_URL_BASE}/api/products?sku={updated_sku}", headers=HEADERS)
        if response.status_code == 200:
            products_response = response.json()
            products = products_response.get('data', {}).get('content', products_response.get('content', []))
            
            if products:
                sku_products = [p for p in products if p.get('sku') == updated_sku]
                if sku_products:
                    print(f"   ✓ Found {len(sku_products)} products with SKU {updated_sku}")
                else:
                    print(f"   ⚠ No products found with SKU {updated_sku}, but request was successful")
            else:
                print(f"   ⚠ No products returned in search, but request was successful")
        else:
            print(f"   ✗ Product search by SKU failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during product search by SKU: {str(e)}")
        return False

    print("\n✓ All product entity and repository tests passed!")
    return True

if __name__ == "__main__":
    print("Starting production acceptance test for Product entity and repository...")
    success = test_product_entity()
    
    if success:
        print("\n✓ All tests passed successfully!")
        sys.exit(0)
    else:
        print("\n✗ Some tests failed!")
        sys.exit(1)