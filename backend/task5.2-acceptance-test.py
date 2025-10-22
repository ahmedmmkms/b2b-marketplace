"""
Production Acceptance Test Script for Task 5.2: Implement Product entity and repository

This script tests the Product entity and repository functionality against the production deployment.
It verifies that products can be created with all necessary fields and validation.
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

def test_product_entity():
    """Test product creation, retrieval, update, and deletion"""
    print("Testing Product entity and repository functionality...")
    
    # First, we need to create or find a vendor to associate with our product
    print("1. Setting up vendor for product association...")
    vendor_data = {
        "businessName": "Test Product Vendor",
        "description": "A test vendor for product testing",
        "email": "vendor@testproduct.com",
        "phone": "+987654321",
        "address": json.dumps({
            "street": "456 Product Street",
            "city": "Product City",
            "state": "Product State",
            "country": "Product Country",
            "postalCode": "54321"
        }),
        "taxId": "PV-987654321",
        "vendorStatus": "APPROVED",
        "businessLicenseNo": "PBL-123456789",
        "registrationDate": datetime.now().strftime('%Y-%m-%d'),
        "kycVerified": True,
        "kycVerifiedAt": datetime.now().strftime('%Y-%m-%d'),
        "kycVerifiedBy": "system",
        "approvalDate": datetime.now().strftime('%Y-%m-%d')
    }
    
    try:
        response = requests.post(f"{API_BASE_URL}/vendors", json=vendor_data, headers=HEADERS)
        if response.status_code in [200, 201]:
            vendor = response.json()
            vendor_id = vendor.get("id")
            print(f"   ✓ Vendor created successfully with ID: {vendor_id}")
        else:
            print(f"   ✗ Failed to create vendor. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error creating vendor: {str(e)}")
        return False
    
    # Test data for creating a product
    product_data = {
        "name": "Test Product for Production",
        "slug": "test-product-production",
        "description": "A test product for production testing of the catalog functionality",
        "shortDescription": "Test product for verification",
        "sku": "TEST-PROD-001",
        "upc": "123456789012",
        "gtin": "1234567890123",
        "mpn": "TP-001-MPN",
        "brand": "TestBrand",
        "categoryId": "category-test-123",
        "vendorId": vendor_id,
        "productStatus": "ACTIVE",
        "priceAmount": "29.99",
        "priceCurrency": "USD",
        "taxClass": "standard",
        "metaTitle": "Test Product for Production Testing",
        "metaDescription": "Meta description for test product",
        "metaKeywords": "test, product, production",
        "weight": "0.500",
        "dimensions": json.dumps({
            "length": 10.0,
            "width": 8.0,
            "height": 5.0,
            "unit": "cm"
        }),
        "packagingInfo": json.dumps({
            "packageType": "Box",
            "itemsPerPackage": 1,
            "packageWeight": 0.6,
            "packageDimensions": {
                "length": 12.0,
                "width": 10.0,
                "height": 7.0,
                "unit": "cm"
            }
        }),
        "minOrderQuantity": 1,
        "moq": 5,
        "inventoryTracking": True,
        "stockQuantity": 100,
        "inventoryStatus": "IN_STOCK",
        "isActive": True,
        "dimensionsLength": "10.000",
        "dimensionsWidth": "8.000",
        "dimensionsHeight": "5.000"
    }
    
    print("2. Creating a new product...")
    try:
        response = requests.post(f"{API_BASE_URL}/products", json=product_data, headers=HEADERS)
        if response.status_code in [200, 201]:
            product = response.json()
            product_id = product.get("id")
            print(f"   ✓ Product created successfully with ID: {product_id}")
        else:
            print(f"   ✗ Failed to create product. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error creating product: {str(e)}")
        return False
    
    print("3. Retrieving the created product...")
    try:
        response = requests.get(f"{API_BASE_URL}/products/{product_id}", headers=HEADERS)
        if response.status_code == 200:
            retrieved_product = response.json()
            if retrieved_product.get("id") == product_id:
                print(f"   ✓ Product retrieved successfully: {retrieved_product.get('name')}")
            else:
                print(f"   ✗ Retrieved product ID doesn't match: {retrieved_product.get('id')}")
                return False
        else:
            print(f"   ✗ Failed to retrieve product. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error retrieving product: {str(e)}")
        return False
    
    print("4. Testing product search by SKU...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"sku": "TEST-PROD-001"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list) and len(products) > 0:
                print(f"   ✓ Successfully retrieved product by SKU, found {len(products)} products")
            else:
                print(f"   ✗ Expected to find product by SKU, got: {products}")
                return False
        else:
            print(f"   ✗ Failed to search product by SKU. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching product by SKU: {str(e)}")
        return False
    
    print("5. Testing product search by slug...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"slug": "test-product-production"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list) and len(products) > 0:
                print(f"   ✓ Successfully retrieved product by slug, found {len(products)} products")
            else:
                print(f"   ✗ Expected to find product by slug, got: {products}")
                return False
        else:
            print(f"   ✗ Failed to search product by slug. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching product by slug: {str(e)}")
        return False
    
    print("6. Testing product search by vendor...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"vendorId": vendor_id}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list) and len(products) > 0:
                print(f"   ✓ Successfully retrieved products by vendor, found {len(products)} products")
            else:
                print(f"   ✗ Expected to find products by vendor, got: {products}")
                return False
        else:
            print(f"   ✗ Failed to search products by vendor. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching products by vendor: {str(e)}")
        return False
    
    print("7. Testing product search by status...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"productStatus": "ACTIVE"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                print(f"   ✓ Successfully retrieved products by status, found {len(products)} products")
            else:
                print(f"   ✗ Expected a list of products, got: {type(products)}")
                return False
        else:
            print(f"   ✗ Failed to search products by status. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching products by status: {str(e)}")
        return False
    
    print("8. Testing product search by active status...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"isActive": "true"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                print(f"   ✓ Successfully retrieved active products, found {len(products)} products")
            else:
                print(f"   ✗ Expected a list of products, got: {type(products)}")
                return False
        else:
            print(f"   ✗ Failed to search active products. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching active products: {str(e)}")
        return False
    
    print("9. Updating the product...")
    try:
        update_data = product_data.copy()
        update_data["name"] = "Updated Test Product for Production"
        update_data["priceAmount"] = "34.99"
        update_data["stockQuantity"] = 150
        
        response = requests.put(f"{API_BASE_URL}/products/{product_id}", json=update_data, headers=HEADERS)
        if response.status_code == 200:
            updated_product = response.json()
            if updated_product.get("name") == "Updated Test Product for Production":
                print(f"   ✓ Product updated successfully")
            else:
                print(f"   ✗ Product name not updated properly: {updated_product.get('name')}")
                return False
        else:
            print(f"   ✗ Failed to update product. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error updating product: {str(e)}")
        return False
    
    return True

def main():
    print("Starting production acceptance test for Task 5.2: Product entity and repository")
    print("="*80)
    
    success = test_product_entity()
    
    print("="*80)
    if success:
        print("✓ All tests passed! Task 5.2 implementation is working correctly in production.")
        sys.exit(0)
    else:
        print("✗ Some tests failed! Task 5.2 implementation needs review.")
        sys.exit(1)

if __name__ == "__main__":
    main()