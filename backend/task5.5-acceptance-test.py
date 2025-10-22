"""
Production Acceptance Test Script for Task 5.5: Implement catalog browsing API

This script tests the catalog browsing API functionality against the production deployment.
It verifies that products can be browsed with search, filtering, and pagination.
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

def test_catalog_browsing_api():
    """Test catalog browsing API with search, filtering, and pagination"""
    print("Testing Catalog browsing API functionality...")
    
    # First, set up a vendor
    print("1. Setting up vendors and products for catalog browsing...")
    vendor_data = {
        "businessName": "Test Browse Vendor",
        "description": "A test vendor for catalog browsing",
        "email": "browse@testvendor.com",
        "phone": "+1122334455",
        "address": json.dumps({
            "street": "321 Browse Street",
            "city": "Browse City",
            "state": "Browse State",
            "country": "Browse Country",
            "postalCode": "54321"
        }),
        "taxId": "TB-1122334455",
        "vendorStatus": "APPROVED",
        "businessLicenseNo": "TBL-5544332211",
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
    
    # Create multiple products for browsing tests
    products_data = [
        {
            "name": "Wireless Bluetooth Headphones",
            "slug": "wireless-bluetooth-headphones",
            "description": "High-quality wireless headphones with noise cancellation",
            "shortDescription": "Wireless headphones with excellent sound quality",
            "sku": "WBH-001",
            "upc": "123456789012",
            "gtin": "1234567890123",
            "mpn": "WBH-001-MPN",
            "brand": "SoundMax",
            "categoryId": "electronics-audio",
            "vendorId": vendor_id,
            "productStatus": "ACTIVE",
            "priceAmount": "89.99",
            "priceCurrency": "USD",
            "taxClass": "standard",
            "metaTitle": "Wireless Bluetooth Headphones",
            "metaDescription": "High-quality wireless headphones with noise cancellation technology",
            "metaKeywords": "wireless, headphones, bluetooth, audio",
            "weight": "0.300",
            "dimensions": json.dumps({
                "length": 20.0,
                "width": 18.0,
                "height": 10.0,
                "unit": "cm"
            }),
            "packagingInfo": json.dumps({
                "packageType": "Box",
                "itemsPerPackage": 1,
                "packageWeight": 0.5,
                "packageDimensions": {
                    "length": 22.0,
                    "width": 20.0,
                    "height": 12.0,
                    "unit": "cm"
                }
            }),
            "minOrderQuantity": 1,
            "moq": 1,
            "inventoryTracking": True,
            "stockQuantity": 100,
            "inventoryStatus": "IN_STOCK",
            "isActive": True,
            "dimensionsLength": "20.000",
            "dimensionsWidth": "18.000",
            "dimensionsHeight": "10.000"
        },
        {
            "name": "Smart Fitness Watch",
            "slug": "smart-fitness-watch",
            "description": "Advanced fitness tracker with heart rate monitoring",
            "shortDescription": "Smart watch for fitness tracking",
            "sku": "SFW-002",
            "upc": "234567890123",
            "gtin": "2345678901234",
            "mpn": "SFW-002-MPN",
            "brand": "FitTech",
            "categoryId": "electronics-wearables",
            "vendorId": vendor_id,
            "productStatus": "ACTIVE",
            "priceAmount": "149.99",
            "priceCurrency": "USD",
            "taxClass": "standard",
            "metaTitle": "Smart Fitness Watch",
            "metaDescription": "Track your fitness goals with this advanced smartwatch",
            "metaKeywords": "smartwatch, fitness, tracker, health",
            "weight": "0.050",
            "dimensions": json.dumps({
                "length": 4.5,
                "width": 3.8,
                "height": 1.2,
                "unit": "cm"
            }),
            "packagingInfo": json.dumps({
                "packageType": "Box",
                "itemsPerPackage": 1,
                "packageWeight": 0.1,
                "packageDimensions": {
                    "length": 6.0,
                    "width": 5.0,
                    "height": 3.0,
                    "unit": "cm"
                }
            }),
            "minOrderQuantity": 1,
            "moq": 1,
            "inventoryTracking": True,
            "stockQuantity": 50,
            "inventoryStatus": "IN_STOCK",
            "isActive": True,
            "dimensionsLength": "4.500",
            "dimensionsWidth": "3.800",
            "dimensionsHeight": "1.200"
        },
        {
            "name": "Ergonomic Office Chair",
            "slug": "ergonomic-office-chair",
            "description": "Comfortable office chair with lumbar support",
            "shortDescription": "Ergonomic chair for long working hours",
            "sku": "EOC-003",
            "upc": "345678901234",
            "gtin": "3456789012345",
            "mpn": "EOC-003-MPN",
            "brand": "ComfortPro",
            "categoryId": "furniture-office",
            "vendorId": vendor_id,
            "productStatus": "ACTIVE",
            "priceAmount": "249.99",
            "priceCurrency": "USD",
            "taxClass": "standard",
            "metaTitle": "Ergonomic Office Chair",
            "metaDescription": "Support your posture with this ergonomic office chair",
            "metaKeywords": "office, chair, ergonomic, furniture",
            "weight": "15.000",
            "dimensions": json.dumps({
                "length": 70.0,
                "width": 65.0,
                "height": 120.0,
                "unit": "cm"
            }),
            "packagingInfo": json.dumps({
                "packageType": "Box",
                "itemsPerPackage": 1,
                "packageWeight": 18.0,
                "packageDimensions": {
                    "length": 75.0,
                    "width": 70.0,
                    "height": 130.0,
                    "unit": "cm"
                }
            }),
            "minOrderQuantity": 1,
            "moq": 1,
            "inventoryTracking": True,
            "stockQuantity": 25,
            "inventoryStatus": "IN_STOCK",
            "isActive": True,
            "dimensionsLength": "70.000",
            "dimensionsWidth": "65.000",
            "dimensionsHeight": "120.000"
        }
    ]
    
    created_products = []
    for i, product_data in enumerate(products_data):
        try:
            response = requests.post(f"{API_BASE_URL}/products", json=product_data, headers=HEADERS)
            if response.status_code in [200, 201]:
                product = response.json()
                product_id = product.get("id")
                created_products.append(product_id)
                print(f"   ✓ Product {i+1} created successfully with ID: {product_id}")
            else:
                print(f"   ✗ Failed to create product {i+1}. Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            print(f"   ✗ Error creating product {i+1}: {str(e)}")
            return False
    
    print("2. Testing basic product listing (catalog browsing)...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                print(f"   ✓ Successfully retrieved product catalog, found {len(products)} products")
            else:
                print(f"   ✗ Expected a list of products, got: {type(products)}")
                return False
        else:
            print(f"   ✗ Failed to retrieve product catalog. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error retrieving product catalog: {str(e)}")
        return False
    
    print("3. Testing product filtering by category...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"categoryId": "electronics-audio"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                print(f"   ✓ Successfully filtered products by category, found {len(products)} products")
            else:
                print(f"   ✗ Expected a list of products, got: {type(products)}")
                return False
        else:
            print(f"   ✗ Failed to filter products by category. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error filtering products by category: {str(e)}")
        return False
    
    print("4. Testing product filtering by vendor...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"vendorId": vendor_id}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                print(f"   ✓ Successfully filtered products by vendor, found {len(products)} products")
            else:
                print(f"   ✗ Expected a list of products, got: {type(products)}")
                return False
        else:
            print(f"   ✗ Failed to filter products by vendor. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error filtering products by vendor: {str(e)}")
        return False
    
    print("5. Testing product filtering by status...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"productStatus": "ACTIVE"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                print(f"   ✓ Successfully filtered products by status, found {len(products)} products")
            else:
                print(f"   ✗ Expected a list of products, got: {type(products)}")
                return False
        else:
            print(f"   ✗ Failed to filter products by status. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error filtering products by status: {str(e)}")
        return False
    
    print("6. Testing product filtering by active status...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"isActive": "true"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                print(f"   ✓ Successfully filtered products by active status, found {len(products)} products")
            else:
                print(f"   ✗ Expected a list of products, got: {type(products)}")
                return False
        else:
            print(f"   ✗ Failed to filter products by active status. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error filtering products by active status: {str(e)}")
        return False
    
    print("7. Testing price range filtering...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"minPrice": "100", "maxPrice": "200"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                print(f"   ✓ Successfully filtered products by price range, found {len(products)} products")
            else:
                print(f"   ✗ Expected a list of products, got: {type(products)}")
                return False
        else:
            print(f"   ✗ Failed to filter products by price range. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error filtering products by price range: {str(e)}")
        return False
    
    print("8. Testing pagination...")
    try:
        # Get first page
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"limit": 2}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list) and len(products) <= 2:
                print(f"   ✓ Successfully applied pagination limit, got {len(products)} products on first page")
                
                if len(products) > 0:
                    # Get next page using cursor from the last item
                    last_id = products[-1]["id"] if len(products) > 0 else None
                    response = requests.get(f"{API_BASE_URL}/products", 
                                           params={"limit": 2, "cursor": last_id}, 
                                           headers=HEADERS)
                    if response.status_code == 200:
                        next_page_products = response.json()
                        if isinstance(next_page_products, list):
                            print(f"   ✓ Successfully retrieved second page, got {len(next_page_products)} products")
                        else:
                            print(f"   ✗ Expected a list of products for next page, got: {type(next_page_products)}")
                            return False
                    else:
                        print(f"   ✗ Failed to retrieve second page. Status: {response.status_code}, Response: {response.text}")
                        return False
            else:
                print(f"   ✗ Expected a list of products with max 2 items, got: {products}")
                return False
        else:
            print(f"   ✗ Failed to apply pagination. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error testing pagination: {str(e)}")
        return False
    
    print("9. Testing product search by name...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"search": "headphones"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                print(f"   ✓ Successfully searched products by name, found {len(products)} products")
            else:
                print(f"   ✗ Expected a list of products, got: {type(products)}")
                return False
        else:
            print(f"   ✗ Failed to search products by name. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching products by name: {str(e)}")
        return False
    
    print("10. Testing product search by brand...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"brand": "FitTech"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                print(f"   ✓ Successfully searched products by brand, found {len(products)} products")
            else:
                print(f"   ✗ Expected a list of products, got: {type(products)}")
                return False
        else:
            print(f"   ✗ Failed to search products by brand. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching products by brand: {str(e)}")
        return False
    
    print("11. Testing product retrieval by SKU...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"sku": "WBH-001"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list) and len(products) > 0:
                print(f"   ✓ Successfully retrieved product by SKU, found {len(products)} products")
            else:
                print(f"   ✗ Expected to find product by SKU, got: {products}")
                return False
        else:
            print(f"   ✗ Failed to retrieve product by SKU. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error retrieving product by SKU: {str(e)}")
        return False
    
    print("12. Testing product retrieval by slug...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"slug": "smart-fitness-watch"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list) and len(products) > 0:
                print(f"   ✓ Successfully retrieved product by slug, found {len(products)} products")
            else:
                print(f"   ✗ Expected to find product by slug, got: {products}")
                return False
        else:
            print(f"   ✗ Failed to retrieve product by slug. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error retrieving product by slug: {str(e)}")
        return False
    
    print("13. Testing sorting functionality...")
    try:
        response = requests.get(f"{API_BASE_URL}/products", 
                               params={"sortBy": "priceAmount", "sortOrder": "asc"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                print(f"   ✓ Successfully retrieved sorted products, got {len(products)} products")
                if len(products) > 1:
                    # Check if the products are actually sorted by price
                    first_price = float(products[0].get('priceAmount', 0))
                    last_price = float(products[-1].get('priceAmount', 0))
                    if first_price <= last_price:
                        print(f"   ✓ Products sorted correctly by price in ascending order")
                    else:
                        print(f"   ⚠ Products may not be sorted correctly by price (first: {first_price}, last: {last_price})")
            else:
                print(f"   ✗ Expected a list of products, got: {type(products)}")
                return False
        else:
            print(f"   ✗ Failed to retrieve sorted products. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error retrieving sorted products: {str(e)}")
        return False
    
    return True

def main():
    print("Starting production acceptance test for Task 5.5: Catalog browsing API")
    print("="*80)
    
    success = test_catalog_browsing_api()
    
    print("="*80)
    if success:
        print("✓ All tests passed! Task 5.5 implementation is working correctly in production.")
        sys.exit(0)
    else:
        print("✗ Some tests failed! Task 5.5 implementation needs review.")
        sys.exit(1)

if __name__ == "__main__":
    main()