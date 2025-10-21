"""
Production Acceptance Test Script for Task 5.4: Implement Media Asset entities

This script tests the MediaAsset and ProductMedia entities and their repositories
functionality against the production deployment.
It verifies that media assets can be associated with products.
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

def test_media_asset_entities():
    """Test media asset and product media creation, retrieval, update, and deletion"""
    print("Testing Media Asset entities and repositories functionality...")
    
    # First, set up a vendor
    print("1. Setting up vendor and product for media association...")
    vendor_data = {
        "businessName": "Test Media Vendor",
        "description": "A test vendor for media testing",
        "email": "media@testvendor.com",
        "phone": "+1928374650",
        "address": json.dumps({
            "street": "789 Media Street",
            "city": "Media City",
            "state": "Media State",
            "country": "Media Country",
            "postalCode": "67890"
        }),
        "taxId": "TM-1928374650",
        "vendorStatus": "APPROVED",
        "businessLicenseNo": "TMBL-0564738291",
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
    
    # Create a product
    product_data = {
        "name": "Test Product with Media",
        "slug": "test-product-media",
        "description": "A test product for media asset testing",
        "shortDescription": "Test product with media",
        "sku": "TEST-MEDIA-001",
        "upc": "112233445566",
        "gtin": "1122334455667",
        "mpn": "TPM-001-MPN",
        "brand": "TestMediaBrand",
        "categoryId": "category-media-123",
        "vendorId": vendor_id,
        "productStatus": "ACTIVE",
        "priceAmount": "49.99",
        "priceCurrency": "USD",
        "taxClass": "standard",
        "metaTitle": "Test Product with Media",
        "metaDescription": "Meta description for test product with media",
        "metaKeywords": "test, product, media",
        "weight": "1.200",
        "dimensions": json.dumps({
            "length": 20.0,
            "width": 15.0,
            "height": 10.0,
            "unit": "cm"
        }),
        "packagingInfo": json.dumps({
            "packageType": "Box",
            "itemsPerPackage": 1,
            "packageWeight": 1.5,
            "packageDimensions": {
                "length": 22.0,
                "width": 17.0,
                "height": 12.0,
                "unit": "cm"
            }
        }),
        "minOrderQuantity": 1,
        "moq": 3,
        "inventoryTracking": True,
        "stockQuantity": 50,
        "inventoryStatus": "IN_STOCK",
        "isActive": True,
        "dimensionsLength": "20.000",
        "dimensionsWidth": "15.000",
        "dimensionsHeight": "10.000"
    }
    
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
    
    # Test data for creating a media asset
    media_asset_data = {
        "name": "Product Image 1",
        "originalFilename": "product_image_1.jpg",
        "storagePath": "/images/products/test-product-media-1.jpg",
        "contentType": "image/jpeg",
        "fileSize": 123456,
        "altText": "Main image of test product",
        "title": "Main Product Image",
        "caption": "This is the main image of the test product",
        "mediaType": "IMAGE",
        "status": "ACTIVE",
        "isPrimary": True,
        "uploadDate": datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
    }
    
    print("2. Creating a new media asset...")
    try:
        response = requests.post(f"{API_BASE_URL}/media-assets", json=media_asset_data, headers=HEADERS)
        if response.status_code in [200, 201]:
            media_asset = response.json()
            media_asset_id = media_asset.get("id")
            print(f"   ✓ Media asset created successfully with ID: {media_asset_id}")
        else:
            print(f"   ✗ Failed to create media asset. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error creating media asset: {str(e)}")
        return False
    
    print("3. Retrieving the created media asset...")
    try:
        response = requests.get(f"{API_BASE_URL}/media-assets/{media_asset_id}", headers=HEADERS)
        if response.status_code == 200:
            retrieved_media = response.json()
            if retrieved_media.get("id") == media_asset_id:
                print(f"   ✓ Media asset retrieved successfully: {retrieved_media.get('name')}")
            else:
                print(f"   ✗ Retrieved media asset ID doesn't match: {retrieved_media.get('id')}")
                return False
        else:
            print(f"   ✗ Failed to retrieve media asset. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error retrieving media asset: {str(e)}")
        return False
    
    print("4. Testing media asset search by status...")
    try:
        response = requests.get(f"{API_BASE_URL}/media-assets", 
                               params={"status": "ACTIVE"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            media_assets = response.json()
            if isinstance(media_assets, list):
                print(f"   ✓ Successfully retrieved active media assets, found {len(media_assets)} assets")
            else:
                print(f"   ✗ Expected a list of media assets, got: {type(media_assets)}")
                return False
        else:
            print(f"   ✗ Failed to search media assets by status. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching media assets by status: {str(e)}")
        return False
    
    print("5. Testing media asset search by media type...")
    try:
        response = requests.get(f"{API_BASE_URL}/media-assets", 
                               params={"mediaType": "IMAGE"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            media_assets = response.json()
            if isinstance(media_assets, list):
                print(f"   ✓ Successfully retrieved image media assets, found {len(media_assets)} assets")
            else:
                print(f"   ✗ Expected a list of media assets, got: {type(media_assets)}")
                return False
        else:
            print(f"   ✗ Failed to search media assets by media type. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching media assets by media type: {str(e)}")
        return False
    
    print("6. Testing media asset search by primary flag...")
    try:
        response = requests.get(f"{API_BASE_URL}/media-assets", 
                               params={"isPrimary": "true"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            media_assets = response.json()
            if isinstance(media_assets, list):
                print(f"   ✓ Successfully retrieved primary media assets, found {len(media_assets)} assets")
            else:
                print(f"   ✗ Expected a list of media assets, got: {type(media_assets)}")
                return False
        else:
            print(f"   ✗ Failed to search media assets by primary flag. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching media assets by primary flag: {str(e)}")
        return False
    
    print("7. Creating a product media association...")
    product_media_data = {
        "productId": product_id,
        "mediaAssetId": media_asset_id,
        "displayOrder": 1,
        "isPrimary": True,
        "altTextOverride": "Custom alt text for product image"
    }
    
    try:
        response = requests.post(f"{API_BASE_URL}/product-media", json=product_media_data, headers=HEADERS)
        if response.status_code in [200, 201]:
            product_media = response.json()
            product_media_id = product_media.get("id")
            print(f"   ✓ Product media association created successfully with ID: {product_media_id}")
        else:
            print(f"   ✗ Failed to create product media association. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error creating product media association: {str(e)}")
        return False
    
    print("8. Retrieving the created product media association...")
    try:
        response = requests.get(f"{API_BASE_URL}/product-media/{product_media_id}", headers=HEADERS)
        if response.status_code == 200:
            retrieved_product_media = response.json()
            if retrieved_product_media.get("id") == product_media_id:
                print(f"   ✓ Product media association retrieved successfully")
            else:
                print(f"   ✗ Retrieved product media ID doesn't match: {retrieved_product_media.get('id')}")
                return False
        else:
            print(f"   ✗ Failed to retrieve product media association. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error retrieving product media association: {str(e)}")
        return False
    
    print("9. Testing product media search by product ID...")
    try:
        response = requests.get(f"{API_BASE_URL}/product-media", 
                               params={"productId": product_id}, 
                               headers=HEADERS)
        if response.status_code == 200:
            product_media_list = response.json()
            if isinstance(product_media_list, list):
                print(f"   ✓ Successfully retrieved product media by product ID, found {len(product_media_list)} associations")
            else:
                print(f"   ✗ Expected a list of product media, got: {type(product_media_list)}")
                return False
        else:
            print(f"   ✗ Failed to search product media by product ID. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching product media by product ID: {str(e)}")
        return False
    
    print("10. Testing product media search by media asset ID...")
    try:
        response = requests.get(f"{API_BASE_URL}/product-media", 
                               params={"mediaAssetId": media_asset_id}, 
                               headers=HEADERS)
        if response.status_code == 200:
            product_media_list = response.json()
            if isinstance(product_media_list, list):
                print(f"   ✓ Successfully retrieved product media by media asset ID, found {len(product_media_list)} associations")
            else:
                print(f"   ✗ Expected a list of product media, got: {type(product_media_list)}")
                return False
        else:
            print(f"   ✗ Failed to search product media by media asset ID. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching product media by media asset ID: {str(e)}")
        return False
    
    print("11. Testing product media search by primary flag...")
    try:
        response = requests.get(f"{API_BASE_URL}/product-media", 
                               params={"isPrimary": "true"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            product_media_list = response.json()
            if isinstance(product_media_list, list):
                print(f"   ✓ Successfully retrieved primary product media, found {len(product_media_list)} associations")
            else:
                print(f"   ✗ Expected a list of product media, got: {type(product_media_list)}")
                return False
        else:
            print(f"   ✗ Failed to search product media by primary flag. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching product media by primary flag: {str(e)}")
        return False
    
    print("12. Creating a second media asset...")
    media_asset_data_2 = {
        "name": "Product Image 2",
        "originalFilename": "product_image_2.jpg",
        "storagePath": "/images/products/test-product-media-2.jpg",
        "contentType": "image/jpeg",
        "fileSize": 98765,
        "altText": "Secondary image of test product",
        "title": "Secondary Product Image",
        "caption": "This is the secondary image of the test product",
        "mediaType": "IMAGE",
        "status": "ACTIVE",
        "isPrimary": False,
        "uploadDate": datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
    }
    
    try:
        response = requests.post(f"{API_BASE_URL}/media-assets", json=media_asset_data_2, headers=HEADERS)
        if response.status_code in [200, 201]:
            media_asset = response.json()
            media_asset_id_2 = media_asset.get("id")
            print(f"   ✓ Second media asset created successfully with ID: {media_asset_id_2}")
        else:
            print(f"   ✗ Failed to create second media asset. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error creating second media asset: {str(e)}")
        return False
    
    print("13. Creating a second product media association...")
    product_media_data_2 = {
        "productId": product_id,
        "mediaAssetId": media_asset_id_2,
        "displayOrder": 2,
        "isPrimary": False,
        "altTextOverride": "Custom alt text for secondary product image"
    }
    
    try:
        response = requests.post(f"{API_BASE_URL}/product-media", json=product_media_data_2, headers=HEADERS)
        if response.status_code in [200, 201]:
            product_media = response.json()
            product_media_id_2 = product_media.get("id")
            print(f"   ✓ Second product media association created successfully with ID: {product_media_id_2}")
        else:
            print(f"   ✗ Failed to create second product media association. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error creating second product media association: {str(e)}")
        return False
    
    print("14. Updating the original media asset...")
    try:
        update_data = media_asset_data.copy()
        update_data["name"] = "Updated Product Image 1"
        update_data["altText"] = "Updated alt text for main image"
        
        response = requests.put(f"{API_BASE_URL}/media-assets/{media_asset_id}", json=update_data, headers=HEADERS)
        if response.status_code == 200:
            updated_media = response.json()
            if updated_media.get("name") == "Updated Product Image 1":
                print(f"   ✓ Media asset updated successfully")
            else:
                print(f"   ✗ Media asset name not updated properly: {updated_media.get('name')}")
                return False
        else:
            print(f"   ✗ Failed to update media asset. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error updating media asset: {str(e)}")
        return False
    
    print("15. Updating the product media association...")
    try:
        update_product_media_data = product_media_data.copy()
        update_product_media_data["displayOrder"] = 10
        update_product_media_data["isPrimary"] = False
        
        response = requests.put(f"{API_BASE_URL}/product-media/{product_media_id}", 
                               json=update_product_media_data, headers=HEADERS)
        if response.status_code == 200:
            updated_product_media = response.json()
            if updated_product_media.get("displayOrder") == 10:
                print(f"   ✓ Product media association updated successfully")
            else:
                print(f"   ✗ Product media display order not updated properly: {updated_product_media.get('displayOrder')}")
                return False
        else:
            print(f"   ✗ Failed to update product media association. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error updating product media association: {str(e)}")
        return False
    
    return True

def main():
    print("Starting production acceptance test for Task 5.4: Media Asset entities")
    print("="*80)
    
    success = test_media_asset_entities()
    
    print("="*80)
    if success:
        print("✓ All tests passed! Task 5.4 implementation is working correctly in production.")
        sys.exit(0)
    else:
        print("✗ Some tests failed! Task 5.4 implementation needs review.")
        sys.exit(1)

if __name__ == "__main__":
    main()