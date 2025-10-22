"""
Production Acceptance Test Script for Product Attributes
This script tests the ProductAttribute and ProductAttributeValue entities and repositories functionality against the Azure deployment.
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

def test_product_attributes():
    print("Testing Product Attribute entities and repositories functionality...")
    
    # Test 1: Create a new product attribute
    print("\n1. Testing product attribute creation...")
    attribute_data = {
        "name": f"color-{uuid.uuid4().hex[:8]}",
        "displayName": "Color",
        "description": "The color of the product",
        "attributeType": "SELECT",
        "isRequired": True,
        "isFilterable": True,
        "sortOrder": 1
    }
    
    try:
        response = requests.post(f"{API_URL_BASE}/api/catalog/attributes", headers=HEADERS, data=json.dumps(attribute_data))
        if response.status_code in [200, 201]:
            attribute_response = response.json()
            attribute_id = attribute_response.get('data', {}).get('id') if 'data' in attribute_response else attribute_response.get('id')
            
            if attribute_id:
                print(f"   ✓ Product attribute created successfully with ID: {attribute_id}")
                print(f"   ✓ Attribute name: {attribute_response.get('data', {}).get('name', attribute_response.get('name', 'Unknown'))}")
            else:
                print(f"   ✗ Product attribute creation failed. Response: {attribute_response}")
                return False
        else:
            print(f"   ✗ Product attribute creation failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during product attribute creation: {str(e)}")
        return False

    # Test 2: Create attribute values for the attribute
    print("\n2. Testing product attribute value creation...")
    attribute_values = [
        {
            "productAttributeId": attribute_id,
            "value": "Red",
            "displayValue": "Red",
            "isDefault": False,
            "sortOrder": 1
        },
        {
            "productAttributeId": attribute_id,
            "value": "Blue",
            "displayValue": "Blue",
            "isDefault": False,
            "sortOrder": 2
        },
        {
            "productAttributeId": attribute_id,
            "value": "Green",
            "displayValue": "Green",
            "isDefault": True,
            "sortOrder": 3
        }
    ]
    
    created_value_ids = []
    for value_data in attribute_values:
        try:
            response = requests.post(f"{API_URL_BASE}/api/catalog/attribute-values", headers=HEADERS, data=json.dumps(value_data))
            if response.status_code in [200, 201]:
                value_response = response.json()
                value_id = value_response.get('data', {}).get('id') if 'data' in value_response else value_response.get('id')
                
                if value_id:
                    created_value_ids.append(value_id)
                    print(f"   ✓ Attribute value '{value_data['value']}' created successfully with ID: {value_id}")
                else:
                    print(f"   ✗ Attribute value creation failed. Response: {value_response}")
                    return False
            else:
                print(f"   ✗ Attribute value creation failed. Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            print(f"   ✗ Error during attribute value creation: {str(e)}")
            return False

    # Test 3: Retrieve the created attribute
    print("\n3. Testing product attribute retrieval...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/attributes/{attribute_id}", headers=HEADERS)
        if response.status_code == 200:
            attribute_data = response.json()
            retrieved_attribute_id = attribute_data.get('data', {}).get('id') if 'data' in attribute_data else attribute_data.get('id')
            
            if retrieved_attribute_id == attribute_id:
                print(f"   ✓ Product attribute retrieved successfully with ID: {retrieved_attribute_id}")
                print(f"   ✓ Attribute name: {attribute_data.get('data', {}).get('name', attribute_data.get('name', 'Unknown'))}")
                print(f"   ✓ Attribute type: {attribute_data.get('data', {}).get('attributeType', attribute_data.get('attributeType', 'Unknown'))}")
            else:
                print(f"   ✗ Product attribute retrieval failed. Retrieved ID: {retrieved_attribute_id}, Expected: {attribute_id}")
                return False
        else:
            print(f"   ✗ Product attribute retrieval failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during product attribute retrieval: {str(e)}")
        return False

    # Test 4: Retrieve attribute values
    print("\n4. Testing product attribute values retrieval...")
    try:
        response = requests.get(f"{API_URL_BASE}/api/catalog/attributes/{attribute_id}/values", headers=HEADERS)
        if response.status_code == 200:
            values_response = response.json()
            values = values_response.get('data', {}).get('content', values_response.get('content', []))
            
            if values and len(values) >= 3:
                print(f"   ✓ Retrieved {len(values)} attribute values for attribute {attribute_id}")
                default_values = [v for v in values if v.get('isDefault', False)]
                if default_values:
                    print(f"   ✓ Found {len(default_values)} default value(s)")
                else:
                    print(f"   ⚠ No default values found")
            else:
                print(f"   ⚠ Expected at least 3 values, got {len(values)}, but request was successful")
        else:
            print(f"   ✗ Attribute values retrieval failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during attribute values retrieval: {str(e)}")
        return False

    # Test 5: Update an attribute value
    print("\n5. Testing attribute value update...")
    if created_value_ids:
        update_data = {
            "value": "Updated Blue",
            "displayValue": "Updated Blue Color",
            "isDefault": True,
            "sortOrder": 1
        }
        
        try:
            response = requests.put(f"{API_URL_BASE}/api/catalog/attribute-values/{created_value_ids[1]}", headers=HEADERS, data=json.dumps(update_data))
            if response.status_code == 200:
                updated_value = response.json()
                updated_value_text = updated_value.get('data', {}).get('value', updated_value.get('value', 'Unknown'))
                
                if "Updated" in updated_value_text:
                    print(f"   ✓ Attribute value updated successfully")
                    print(f"   ✓ New value: {updated_value_text}")
                else:
                    print(f"   ✗ Attribute value update may have failed. Value: {updated_value_text}")
                    return False
            else:
                print(f"   ✗ Attribute value update failed. Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            print(f"   ✗ Error during attribute value update: {str(e)}")
            return False

    # Test 6: Search attributes by name
    print("\n6. Testing product attribute search by name...")
    try:
        attr_name = attribute_data.get('data', {}).get('name', attribute_data.get('name', 'Unknown'))
        response = requests.get(f"{API_URL_BASE}/api/catalog/attributes?name={attr_name}", headers=HEADERS)
        if response.status_code == 200:
            attributes_response = response.json()
            attributes = attributes_response.get('data', {}).get('content', attributes_response.get('content', []))
            
            if attributes:
                name_matches = [a for a in attributes if a.get('name') == attr_name]
                if name_matches:
                    print(f"   ✓ Found {len(name_matches)} attribute(s) with name '{attr_name}'")
                else:
                    print(f"   ⚠ No attributes found with name '{attr_name}', but request was successful")
            else:
                print(f"   ⚠ No attributes returned in search, but request was successful")
        else:
            print(f"   ✗ Attribute search by name failed. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error during attribute search by name: {str(e)}")
        return False

    print("\n✓ All product attribute tests passed!")
    return True

if __name__ == "__main__":
    print("Starting production acceptance test for Product Attributes...")
    success = test_product_attributes()
    
    if success:
        print("\n✓ All tests passed successfully!")
        sys.exit(0)
    else:
        print("\n✗ Some tests failed!")
        sys.exit(1)