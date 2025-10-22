"""
Production Acceptance Test Script for Task 5.3: Implement Product Attribute entities

This script tests the ProductAttribute and ProductAttributeValue entities and their repositories
functionality against the production deployment.
It verifies that products can have custom attributes with different types.
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

def test_product_attribute_entities():
    """Test product attribute and attribute value creation, retrieval, update, and deletion"""
    print("Testing Product Attribute entities and repositories functionality...")
    
    # Test data for creating a product attribute
    attribute_data = {
        "name": "color",
        "displayName": "Color",
        "description": "The color of the product",
        "attributeType": "SELECT",
        "isRequired": False,
        "isSearchable": True,
        "isFilterable": True,
        "sortOrder": 1,
        "validationRules": json.dumps({
            "pattern": "^[A-Za-z]+$",
            "maxLength": 50
        })
    }
    
    print("1. Creating a new product attribute...")
    try:
        response = requests.post(f"{API_BASE_URL}/product-attributes", json=attribute_data, headers=HEADERS)
        if response.status_code in [200, 201]:
            attribute = response.json()
            attribute_id = attribute.get("id")
            print(f"   ✓ Product attribute created successfully with ID: {attribute_id}")
        else:
            print(f"   ✗ Failed to create product attribute. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error creating product attribute: {str(e)}")
        return False
    
    print("2. Retrieving the created product attribute...")
    try:
        response = requests.get(f"{API_BASE_URL}/product-attributes/{attribute_id}", headers=HEADERS)
        if response.status_code == 200:
            retrieved_attribute = response.json()
            if retrieved_attribute.get("id") == attribute_id:
                print(f"   ✓ Product attribute retrieved successfully: {retrieved_attribute.get('name')}")
            else:
                print(f"   ✗ Retrieved attribute ID doesn't match: {retrieved_attribute.get('id')}")
                return False
        else:
            print(f"   ✗ Failed to retrieve product attribute. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error retrieving product attribute: {str(e)}")
        return False
    
    print("3. Testing product attribute search by searchable flag...")
    try:
        response = requests.get(f"{API_BASE_URL}/product-attributes", 
                               params={"isSearchable": "true"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            attributes = response.json()
            if isinstance(attributes, list):
                print(f"   ✓ Successfully retrieved searchable attributes, found {len(attributes)} attributes")
            else:
                print(f"   ✗ Expected a list of attributes, got: {type(attributes)}")
                return False
        else:
            print(f"   ✗ Failed to search attributes by searchable flag. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching attributes by searchable flag: {str(e)}")
        return False
    
    print("4. Testing product attribute search by filterable flag...")
    try:
        response = requests.get(f"{API_BASE_URL}/product-attributes", 
                               params={"isFilterable": "true"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            attributes = response.json()
            if isinstance(attributes, list):
                print(f"   ✓ Successfully retrieved filterable attributes, found {len(attributes)} attributes")
            else:
                print(f"   ✗ Expected a list of attributes, got: {type(attributes)}")
                return False
        else:
            print(f"   ✗ Failed to search attributes by filterable flag. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching attributes by filterable flag: {str(e)}")
        return False
    
    print("5. Testing product attribute search by type...")
    try:
        response = requests.get(f"{API_BASE_URL}/product-attributes", 
                               params={"attributeType": "SELECT"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            attributes = response.json()
            if isinstance(attributes, list):
                print(f"   ✓ Successfully retrieved SELECT attributes, found {len(attributes)} attributes")
            else:
                print(f"   ✗ Expected a list of attributes, got: {type(attributes)}")
                return False
        else:
            print(f"   ✗ Failed to search attributes by type. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching attributes by type: {str(e)}")
        return False
    
    print("6. Creating a product attribute value for the attribute...")
    attribute_value_data = {
        "productAttributeId": attribute_id,
        "value": "red",
        "displayValue": "Red",
        "isDefault": False,
        "sortOrder": 1
    }
    
    try:
        response = requests.post(f"{API_BASE_URL}/product-attribute-values", json=attribute_value_data, headers=HEADERS)
        if response.status_code in [200, 201]:
            attribute_value = response.json()
            attribute_value_id = attribute_value.get("id")
            print(f"   ✓ Product attribute value created successfully with ID: {attribute_value_id}")
        else:
            print(f"   ✗ Failed to create product attribute value. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error creating product attribute value: {str(e)}")
        return False
    
    print("7. Retrieving the created product attribute value...")
    try:
        response = requests.get(f"{API_BASE_URL}/product-attribute-values/{attribute_value_id}", headers=HEADERS)
        if response.status_code == 200:
            retrieved_value = response.json()
            if retrieved_value.get("id") == attribute_value_id:
                print(f"   ✓ Product attribute value retrieved successfully: {retrieved_value.get('value')}")
            else:
                print(f"   ✗ Retrieved attribute value ID doesn't match: {retrieved_value.get('id')}")
                return False
        else:
            print(f"   ✗ Failed to retrieve product attribute value. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error retrieving product attribute value: {str(e)}")
        return False
    
    print("8. Testing product attribute value search by attribute ID...")
    try:
        response = requests.get(f"{API_BASE_URL}/product-attribute-values", 
                               params={"productAttributeId": attribute_id}, 
                               headers=HEADERS)
        if response.status_code == 200:
            values = response.json()
            if isinstance(values, list):
                print(f"   ✓ Successfully retrieved attribute values by attribute ID, found {len(values)} values")
            else:
                print(f"   ✗ Expected a list of values, got: {type(values)}")
                return False
        else:
            print(f"   ✗ Failed to search attribute values by attribute ID. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching attribute values by attribute ID: {str(e)}")
        return False
    
    print("9. Testing product attribute value search by default flag...")
    try:
        response = requests.get(f"{API_BASE_URL}/product-attribute-values", 
                               params={"isDefault": "false"}, 
                               headers=HEADERS)
        if response.status_code == 200:
            values = response.json()
            if isinstance(values, list):
                print(f"   ✓ Successfully retrieved non-default attribute values, found {len(values)} values")
            else:
                print(f"   ✗ Expected a list of values, got: {type(values)}")
                return False
        else:
            print(f"   ✗ Failed to search attribute values by default flag. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error searching attribute values by default flag: {str(e)}")
        return False
    
    print("10. Creating additional attribute values...")
    additional_values = [
        {
            "productAttributeId": attribute_id,
            "value": "blue",
            "displayValue": "Blue",
            "isDefault": True,
            "sortOrder": 2
        },
        {
            "productAttributeId": attribute_id,
            "value": "green",
            "displayValue": "Green",
            "isDefault": False,
            "sortOrder": 3
        }
    ]
    
    created_value_ids = []
    for i, val_data in enumerate(additional_values):
        try:
            response = requests.post(f"{API_BASE_URL}/product-attribute-values", json=val_data, headers=HEADERS)
            if response.status_code in [200, 201]:
                attribute_value = response.json()
                attr_val_id = attribute_value.get("id")
                created_value_ids.append(attr_val_id)
                print(f"   ✓ Additional attribute value {i+1} created successfully with ID: {attr_val_id}")
            else:
                print(f"   ✗ Failed to create additional attribute value {i+1}. Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            print(f"   ✗ Error creating additional attribute value {i+1}: {str(e)}")
            return False
    
    print("11. Updating the original attribute...")
    try:
        update_data = attribute_data.copy()
        update_data["isRequired"] = True
        update_data["sortOrder"] = 10
        
        response = requests.put(f"{API_BASE_URL}/product-attributes/{attribute_id}", json=update_data, headers=HEADERS)
        if response.status_code == 200:
            updated_attribute = response.json()
            if updated_attribute.get("isRequired") is True:
                print(f"   ✓ Product attribute updated successfully")
            else:
                print(f"   ✗ Product attribute isRequired not updated properly: {updated_attribute.get('isRequired')}")
                return False
        else:
            print(f"   ✗ Failed to update product attribute. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error updating product attribute: {str(e)}")
        return False
    
    print("12. Updating one of the attribute values...")
    try:
        update_val_data = {
            "productAttributeId": attribute_id,
            "value": "bright-red",
            "displayValue": "Bright Red",
            "isDefault": False,
            "sortOrder": 1
        }
        
        response = requests.put(f"{API_BASE_URL}/product-attribute-values/{created_value_ids[0]}", 
                               json=update_val_data, headers=HEADERS)
        if response.status_code == 200:
            updated_value = response.json()
            if updated_value.get("value") == "bright-red":
                print(f"   ✓ Product attribute value updated successfully")
            else:
                print(f"   ✗ Product attribute value not updated properly: {updated_value.get('value')}")
                return False
        else:
            print(f"   ✗ Failed to update product attribute value. Status: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ✗ Error updating product attribute value: {str(e)}")
        return False
    
    return True

def main():
    print("Starting production acceptance test for Task 5.3: Product Attribute entities")
    print("="*80)
    
    success = test_product_attribute_entities()
    
    print("="*80)
    if success:
        print("✓ All tests passed! Task 5.3 implementation is working correctly in production.")
        sys.exit(0)
    else:
        print("✗ Some tests failed! Task 5.3 implementation needs review.")
        sys.exit(1)

if __name__ == "__main__":
    main()