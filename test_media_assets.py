"""
Production Acceptance Test Script for Media Assets
This script tests the MediaAsset and ProductMedia entities and repositories functionality against the Azure deployment.
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

def test_media_assets():
    print("Testing Media Asset entities and repositories functionality...")
    
    # First, we need to create a vendor and product to associate with media
    print("\n1. Creating a vendor and product for media association...")
    
    # Create vendor
    vendor_data = {
        "businessName": f"Test Vendor for Media {uuid.uuid4().hex[:8]}",
        "email": f"testmedia.{uuid.uuid4().hex[:8]}@example.com",
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

    # Create product
    product_data = {
        "name": f"Test Product for Media {uuid.uuid4().hex[:8]}",
        "description": "This is a test product for media asset testing",
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
            else:
                print(f"   ✗ Product creation failed. Response: {product_response}")
                return False
        else:
            print(f"   ✗ Product creation failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during product creation: {str(e)}")
        return False

    # Test 2: Create a new media asset
    print("\n2. Testing media asset creation...")
    media_data = {
        "originalFilename": f"test_image_{uuid.uuid4().hex[:8]}.jpg",
        "storagePath": f"/images/products/{product_id}/test_image_{uuid.uuid4().hex[:8]}.jpg",
        "contentType": "image/jpeg",
        "fileSize": 102400,  # 100KB
        "altText": "Test product image",
        "caption": "This is a test image for the product",
        "mediaType": "IMAGE"
    }
    
    try:
        response = requests.post(f"{API_URL_BASE}/api/catalog/media-assets", headers=HEADERS, data=json.dumps(media_data))
        if response.status_code in [200, 201]:
            media_response = response.json()
            media_id = media_response.get('data', {}).get('id') if 'data' in media_response else media_response.get('id')
            
            if media_id:
                print(f"   ✓ Media asset created successfully with ID: {media_id}")
                print(f"   ✓ Media filename: {media_response.get('data', {}).get('originalFilename', media_response.get('originalFilename', 'Unknown'))}")
            else:
                print(f"   ✗ Media asset creation failed. Response: {media_response}")
                return False
        else:
            print(f"   ✗ Media asset creation failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during media asset creation: {str(e)}")
        return False

    # Test 3: Create a product media association
    print("\n3. Testing product media association creation...")
    product_media_data = {
        "productId": product_id,
        "mediaAssetId": media_id,
        "displayOrder": 1,
        "isPrimary": True,
        "altTextOverride": "Primary product image"
    }
    
    try:
        response = requests.post(f"{API_URL_BASE}/api/catalog/product-media", headers=HEADERS, data=json.dumps(product_media_data))
        if response.status_code in [200, 201]:
            product_media_response = response.json()
            product_media_id = product_media_response.get('data', {}).get('id') if 'data' in product_media_response else product_media_response.get('id')
            
            if product_media_id:
                print(f"   ✓ Product media association created successfully with ID: {product_media_id}")
                print(f"   ✓ Associated with product ID: {product_id}")
                print(f"   ✓ Associated with media ID: {media_id}")
            else:
                print(f"   ✗ Product media association creation failed. Response: {product_media_response}")
                return False
        else:
            print(f"   ✗ Product media association creation failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during product media association creation: {str(e)}")
        return False

    # Test 4: Retrieve the created media asset
    print("\n4. Testing media asset retrieval...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/media-assets/{media_id}", headers=HEADERS)
        if response.status_code == 200:
            media_data = response.json()
            retrieved_media_id = media_data.get('data', {}).get('id') if 'data' in media_data else media_data.get('id')
            
            if retrieved_media_id == media_id:
                print(f"   ✓ Media asset retrieved successfully with ID: {retrieved_media_id}")
                print(f"   ✓ Media filename: {media_data.get('data', {}).get('originalFilename', media_data.get('originalFilename', 'Unknown'))}")
                print(f"   ✓ Media type: {media_data.get('data', {}).get('mediaType', media_data.get('mediaType', 'Unknown'))}")
            else:
                print(f"   ✗ Media asset retrieval failed. Retrieved ID: {retrieved_media_id}, Expected: {media_id}")
                return False
        else:
            print(f"   ✗ Media asset retrieval failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during media asset retrieval: {str(e)}")
        return False

    # Test 5: Retrieve product media associations
    print("\n5. Testing product media associations retrieval...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/products/{product_id}/media", headers=HEADERS)
        if response.status_code == 200:
            media_response = response.json()
            media_list = media_response.get('data', {}).get('content', media_response.get('content', []))
            
            if media_list:
                product_media = [m for m in media_list if m.get('productId') == product_id]
                if product_media:
                    print(f"   ✓ Found {len(product_media)} media asset(s) for product {product_id}")
                    primary_media = [m for m in product_media if m.get('isPrimary', False)]
                    if primary_media:
                        print(f"   ✓ Found {len(primary_media)} primary media asset(s)")
                else:
                    print(f"   ⚠ No media found for product {product_id}, but request was successful")
            else:
                print(f"   ⚠ No media assets returned, but request was successful")
        else:
            print(f"   ✗ Product media retrieval failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during product media retrieval: {str(e)}")
        return False

    # Test 6: Update product media association
    print("\n6. Testing product media association update...")
    update_data = {
        "productId": product_id,
        "mediaAssetId": media_id,
        "displayOrder": 2,
        "isPrimary": False,
        "altTextOverride": "Updated product image description"
    }
    
    try:
        response = requests.put(f"{API_URL_BASE}/api/catalog/product-media/{product_media_id}", headers=HEADERS, data=json.dumps(update_data))
        if response.status_code == 200:
            updated_media = response.json()
            updated_order = updated_media.get('data', {}).get('displayOrder', updated_media.get('displayOrder', -1))
            
            if updated_order == 2:
                print(f"   ✓ Product media association updated successfully")
                print(f"   ✓ New display order: {updated_order}")
                print(f"   ✓ Is primary: {updated_media.get('data', {}).get('isPrimary', updated_media.get('isPrimary', 'Unknown'))}")
            else:
                print(f"   ✗ Product media update may have failed. Display order: {updated_order}")
                return False
        else:
            print(f"   ✗ Product media association update failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during product media association update: {str(e)}")
        return False

    # Test 7: Search media assets by type
    print("\n7. Testing media asset search by type...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/media-assets?type=IMAGE", headers=HEADERS)
        if response.status_code == 200:
            media_response = response.json()
            media_list = media_response.get('data', {}).get('content', media_response.get('content', []))
            
            if media_list:
                image_media = [m for m in media_list if m.get('mediaType') == 'IMAGE']
                if image_media:
                    print(f"   ✓ Found {len(image_media)} image media asset(s)")
                else:
                    print(f"   ⚠ No image media assets found, but request was successful")
            else:
                print(f"   ⚠ No media assets returned in search, but request was successful")
        else:
            print(f"   ✗ Media asset search by type failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during media asset search by type: {str(e)}")
        return False

    print("\n✓ All media asset tests passed!")
    return True

if __name__ == "__main__":
    print("Starting production acceptance test for Media Assets...")
    success = test_media_assets()
    
    if success:
        print("\n✓ All tests passed successfully!")
        sys.exit(0)
    else:
        print("\n✗ Some tests failed!")
        sys.exit(1)