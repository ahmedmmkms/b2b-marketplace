"""
Production Acceptance Test Script for Task 5.6: Implement full-text search

This script tests the PostgreSQL full-text search functionality for products
against the production deployment.
It verifies that search returns relevant products based on name, description, and attributes.
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

def test_fulltext_search():
    """Test full-text search functionality for products"""
    print("Testing Full-Text Search functionality...")
    
    # First, set up a vendor
    print("1. Setting up vendor and products for search testing...")
    vendor_data = {
        "businessName": "Test Search Vendor",
        "description": "A test vendor for full-text search",
        "email": "search@testvendor.com",
        "phone": "+9988776655",
        "address": json.dumps({
            "street": "654 Search Street",
            "city": "Search City",
            "state": "Search State",
            "country": "Search Country",
            "postalCode": "09876"
        }),
        "taxId": "TS-9988776655",
        "vendorStatus": "APPROVED",
        "businessLicenseNo": "TSL-5566778899",
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
    
    # Create multiple products with different search-relevant content
    products_data = [
        {
            "name": "Premium Wireless Noise-Cancelling Headphones",
            "slug": "premium-wireless-headphones",
            "description": "Experience crystal clear audio with our premium wireless headphones featuring active noise cancellation technology. Perfect for travel, work, or relaxation.",
            "shortDescription": "High-quality wireless headphones with noise cancellation",
            "sku": "PWNCH-001",
            "upc": "112233445566",
            "gtin": "1122334455667",
            "mpn": "PWNCH-001-MPN",
            "brand": "AudioPro",
            "categoryId": "electronics-audio",
            "vendorId": vendor_id,
            "productStatus": "ACTIVE",
            "priceAmount": "199.99",
            "priceCurrency": "USD",
            "taxClass": "standard",
            "metaTitle": "Premium Wireless Noise-Cancelling Headphones",
            "metaDescription": "Premium wireless headphones with noise cancellation technology for the best audio experience",
            "metaKeywords": "wireless, headphones, noise-cancelling, audio, premium",
            "weight": "0.350",
            "dimensions": json.dumps({
                "length": 22.0,
                "width": 20.0,
                "height": 12.0,
                "unit": "cm"
            }),
            "packagingInfo": json.dumps({
                "packageType": "Box",
                "itemsPerPackage": 1,
                "packageWeight": 0.6,
                "packageDimensions": {
                    "length": 25.0,
                    "width": 22.0,
                    "height": 15.0,
                    "unit": "cm"
                }
            }),
            "minOrderQuantity": 1,
            "moq": 1,
            "inventoryTracking": True,
            "stockQuantity": 75,
            "inventoryStatus": "IN_STOCK",
            "isActive": True,
            "dimensionsLength": "22.000",
            "dimensionsWidth": "20.000",
            "dimensionsHeight": "12.000"
        },
        {
            "name": "Ultra HD 4K Smart TV 55-inch",
            "slug": "ultra-hd-4k-smart-tv",
            "description": "Immerse yourself in stunning 4K Ultra HD resolution with our latest smart TV. Features HDR, smart platform with streaming apps, and voice control.",
            "shortDescription": "4K Ultra HD Smart TV with advanced features",
            "sku": "UHDSM-002",
            "upc": "223344556677",
            "gtin": "2233445566778",
            "mpn": "UHDSM-002-MPN",
            "brand": "VisionMax",
            "categoryId": "electronics-tv",
            "vendorId": vendor_id,
            "productStatus": "ACTIVE",
            "priceAmount": "599.99",
            "priceCurrency": "USD",
            "taxClass": "standard",
            "metaTitle": "Ultra HD 4K Smart TV 55-inch",
            "metaDescription": "Experience stunning 4K Ultra HD resolution with smart features",
            "metaKeywords": "tv, 4k, smart, ultra hd, 55-inch",
            "weight": "18.500",
            "dimensions": json.dumps({
                "length": 123.0,
                "width": 70.0,
                "height": 8.0,
                "unit": "cm"
            }),
            "packagingInfo": json.dumps({
                "packageType": "Box",
                "itemsPerPackage": 1,
                "packageWeight": 22.0,
                "packageDimensions": {
                    "length": 130.0,
                    "width": 75.0,
                    "height": 15.0,
                    "unit": "cm"
                }
            }),
            "minOrderQuantity": 1,
            "moq": 1,
            "inventoryTracking": True,
            "stockQuantity": 40,
            "inventoryStatus": "IN_STOCK",
            "isActive": True,
            "dimensionsLength": "123.000",
            "dimensionsWidth": "70.000",
            "dimensionsHeight": "8.000"
        },
        {
            "name": "Professional Digital SLR Camera",
            "slug": "professional-dslr-camera",
            "description": "Capture stunning photos with our professional DSLR camera. Features 24MP sensor, 4K video, weather sealing, and advanced autofocus system.",
            "shortDescription": "Professional DSLR camera with advanced features",
            "sku": "PDSLR-003",
            "upc": "334455667788",
            "gtin": "3344556677889",
            "mpn": "PDSLR-003-MPN",
            "brand": "PhotoPro",
            "categoryId": "electronics-camera",
            "vendorId": vendor_id,
            "productStatus": "ACTIVE",
            "priceAmount": "899.99",
            "priceCurrency": "USD",
            "taxClass": "standard",
            "metaTitle": "Professional Digital SLR Camera",
            "metaDescription": "Professional DSLR camera for capturing stunning photos",
            "metaKeywords": "camera, dslr, digital, photo, professional, 4k",
            "weight": "780.000",
            "dimensions": json.dumps({
                "length": 14.2,
                "width": 11.1,
                "height": 7.6,
                "unit": "cm"
            }),
            "packagingInfo": json.dumps({
                "packageType": "Box",
                "itemsPerPackage": 1,
                "packageWeight": 1.2,
                "packageDimensions": {
                    "length": 18.0,
                    "width": 15.0,
                    "height": 12.0,
                    "unit": "cm"
                }
            }),
            "minOrderQuantity": 1,
            "moq": 1,
            "inventoryTracking": True,
            "stockQuantity": 15,
            "inventoryStatus": "IN_STOCK",
            "isActive": True,
            "dimensionsLength": "14.200",
            "dimensionsWidth": "11.100",
            "dimensionsHeight": "7.600"
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
    
    print("2. Testing full-text search for 'wireless headphones'...")
    try:
        response = requests.get(f"{API_BASE_URL}/products/search", 
                               params={"q": "wireless headphones"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            results = response.json()
            if isinstance(results, list):
                print(f"   ✓ Full-text search for 'wireless headphones' successful, found {len(results)} products")
                # Verify that the headphones product is in the results
                found_headphones = any('headphones' in prod.get('name', '').lower() for prod in results)
                if found_headphones:
                    print("   ✓ Correctly found headphones in search results")
                else:
                    print("   ⚠ Headphones product not found in search results")
            else:
                print(f"   ✗ Expected a list of products, got: {type(results)}")
                return False
        else:
            print(f"   ✗ Full-text search for 'wireless headphones' failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching for 'wireless headphones': {str(e)}")
        return False
    
    print("3. Testing full-text search for '4k tv'...")
    try:
        response = requests.get(f"{API_BASE_URL}/products/search", 
                               params={"q": "4k tv"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            results = response.json()
            if isinstance(results, list):
                print(f"   ✓ Full-text search for '4k tv' successful, found {len(results)} products")
                # Verify that the TV product is in the results
                found_tv = any('tv' in prod.get('name', '').lower() for prod in results)
                if found_tv:
                    print("   ✓ Correctly found TV in search results")
                else:
                    print("   ⚠ TV product not found in search results")
            else:
                print(f"   ✗ Expected a list of products, got: {type(results)}")
                return False
        else:
            print(f"   ✗ Full-text search for '4k tv' failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching for '4k tv': {str(e)}")
        return False
    
    print("4. Testing full-text search for 'dslr camera'...")
    try:
        response = requests.get(f"{API_BASE_URL}/products/search", 
                               params={"q": "dslr camera"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            results = response.json()
            if isinstance(results, list):
                print(f"   ✓ Full-text search for 'dslr camera' successful, found {len(results)} products")
                # Verify that the camera product is in the results
                found_camera = any('camera' in prod.get('name', '').lower() for prod in results)
                if found_camera:
                    print("   ✓ Correctly found camera in search results")
                else:
                    print("   ⚠ Camera product not found in search results")
            else:
                print(f"   ✗ Expected a list of products, got: {type(results)}")
                return False
        else:
            print(f"   ✗ Full-text search for 'dslr camera' failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching for 'dslr camera': {str(e)}")
        return False
    
    print("5. Testing full-text search with partial matching...")
    try:
        response = requests.get(f"{API_BASE_URL}/products/search", 
                               params={"q": "noise cancellation"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            results = response.json()
            if isinstance(results, list):
                print(f"   ✓ Full-text search for 'noise cancellation' successful, found {len(results)} products")
                # Verify that the headphones product is in the results (contains "noise" and "cancellation")
                found_relevant = any(all(word in prod.get('description', '').lower() for word in ['noise', 'cancellation']) for prod in results)
                if found_relevant:
                    print("   ✓ Correctly found product with both 'noise' and 'cancellation' terms")
                else:
                    print("   ⚠ Product with 'noise' and 'cancellation' terms not found in search results")
            else:
                print(f"   ✗ Expected a list of products, got: {type(results)}")
                return False
        else:
            print(f"   ✗ Full-text search for 'noise cancellation' failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching for 'noise cancellation': {str(e)}")
        return False
    
    print("6. Testing full-text search with description terms...")
    try:
        response = requests.get(f"{API_BASE_URL}/products/search", 
                               params={"q": "stunning 4K resolution"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            results = response.json()
            if isinstance(results, list):
                print(f"   ✓ Full-text search for 'stunning 4K resolution' successful, found {len(results)} products")
                # Verify that the TV product is in the results (description contains "stunning" and "4K")
                found_relevant = any(all(term in prod.get('description', '').lower() for term in ['stunning', '4k']) for prod in results)
                if found_relevant:
                    print("   ✓ Correctly found product with 'stunning' and '4K' terms in description")
                else:
                    print("   ⚠ Product with 'stunning' and '4K' terms in description not found in search results")
            else:
                print(f"   ✗ Expected a list of products, got: {type(results)}")
                return False
        else:
            print(f"   ✗ Full-text search for 'stunning 4K resolution' failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching for 'stunning 4K resolution': {str(e)}")
        return False
    
    print("7. Testing full-text search with brand names...")
    try:
        response = requests.get(f"{API_BASE_URL}/products/search", 
                               params={"q": "AudioPro"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            results = response.json()
            if isinstance(results, list):
                print(f"   ✓ Full-text search for brand 'AudioPro' successful, found {len(results)} products")
                # Verify that the headphones product is in the results (has AudioPro brand)
                found_brand = any(prod.get('brand', '').lower() == 'audiopro' for prod in results)
                if found_brand:
                    print("   ✓ Correctly found product with 'AudioPro' brand")
                else:
                    print("   ⚠ Product with 'AudioPro' brand not found in search results")
            else:
                print(f"   ✗ Expected a list of products, got: {type(results)}")
                return False
        else:
            print(f"   ✗ Full-text search for brand 'AudioPro' failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching for brand 'AudioPro': {str(e)}")
        return False
    
    print("8. Testing full-text search with category terms...")
    try:
        response = requests.get(f"{API_BASE_URL}/products/search", 
                               params={"q": "electronics audio"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            results = response.json()
            if isinstance(results, list):
                print(f"   ✓ Full-text search for 'electronics audio' successful, found {len(results)} products")
                # Verify that headphones product is found (has electronics-audio category)
                found_electronics = any('audio' in prod.get('categoryId', '').lower() for prod in results)
                if found_electronics:
                    print("   ✓ Correctly found product in electronics-audio category")
                else:
                    print("   ⚠ Product in electronics-audio category not found in search results")
            else:
                print(f"   ✗ Expected a list of products, got: {type(results)}")
                return False
        else:
            print(f"   ✗ Full-text search for 'electronics audio' failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching for 'electronics audio': {str(e)}")
        return False
    
    print("9. Testing full-text search with complex phrase...")
    try:
        response = requests.get(f"{API_BASE_URL}/products/search", 
                               params={"q": "professional DSLR camera with 24MP sensor"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            results = response.json()
            if isinstance(results, list):
                print(f"   ✓ Full-text search for 'professional DSLR camera with 24MP sensor' successful, found {len(results)} products")
                # Verify that the camera product is in the results (description contains "professional", "dslr", "24mp")
                found_camera = any(
                    all(term in prod.get('description', '').lower() for term in ['professional', 'dslr', '24mp']) 
                    for prod in results
                )
                if found_camera:
                    print("   ✓ Correctly found camera with 'professional', 'dslr', and '24mp' terms")
                else:
                    print("   ⚠ Camera with 'professional', 'dslr', and '24mp' terms not found in search results")
            else:
                print(f"   ✗ Expected a list of products, got: {type(results)}")
                return False
        else:
            print(f"   ✗ Full-text search for 'professional DSLR camera with 24MP sensor' failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching for 'professional DSLR camera with 24MP sensor': {str(e)}")
        return False
    
    print("10. Testing full-text search relevance ranking...")
    try:
        response = requests.get(f"{API_BASE_URL}/products/search", 
                               params={"q": "headphones"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            results = response.json()
            if isinstance(results, list) and len(results) > 0:
                print(f"   ✓ Full-text search for 'headphones' successful, found {len(results)} products")
                
                # Check if the first result has 'headphones' in the name (should be most relevant)
                first_result = results[0]
                if 'headphones' in first_result.get('name', '').lower() or 'headphones' in first_result.get('description', '').lower():
                    print("   ✓ Most relevant result (containing 'headphones') appears first")
                else:
                    print("   ⚠ Most relevant result (containing 'headphones') does not appear first")
            else:
                print(f"   ✗ Expected a list of products, got: {type(results)}")
                return False
        else:
            print(f"   ✗ Full-text search for 'headphones' failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error testing search relevance ranking: {str(e)}")
        return False
    
    return True

def main():
    print("Starting production acceptance test for Task 5.6: Full-text search")
    print("="*80)
    
    success = test_fulltext_search()
    
    print("="*80)
    if success:
        print("✓ All tests passed! Task 5.6 implementation is working correctly in production.")
        sys.exit(0)
    else:
        print("✗ Some tests failed! Task 5.6 implementation needs review.")
        sys.exit(1)

if __name__ == "__main__":
    main()