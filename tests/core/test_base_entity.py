#!/usr/bin/env python3
"""
Production Acceptance Test Script for Base Entity (Task 3.1)
Verifies that the Base entity with common fields (id, createdAt, updatedAt) works properly in Azure deployment.

This script tests:
1. Creating an entity that extends Base
2. Verifying that ULID ID is generated properly
3. Verifying that createdAt and updatedAt are automatically set
4. Testing update operations to confirm updatedAt changes
5. Testing retrieval of entities
"""

import os
import sys
import requests
import time
import json
from datetime import datetime
from requests.auth import HTTPBasicAuth

# Configuration
BASE_URL = os.environ.get("API_URL_BASE", "https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net")

# Get credentials from environment variables with the actual production values
USERNAME = os.environ.get("SECURITY_USER_NAME", "user")
PASSWORD = os.environ.get("SECURITY_USER_PASSWORD", "112233445566")

HEADERS = {
    "Content-Type": "application/json"
}
AUTH = HTTPBasicAuth(USERNAME, PASSWORD)

def test_base_entity_functionality():
    print("Testing Base Entity functionality in Azure deployment...")
    
    # Step 1: Create a test entity to verify Base functionality
    print("\n1. Creating a test entity...")
    
    test_data = {
        "name": f"Test Entity - {int(time.time())}",
        "description": "Test entity to verify Base class functionality"
    }
    
    create_response = requests.post(f"{BASE_URL}/api/test-entities", json=test_data, headers=HEADERS, auth=AUTH)
    
    if create_response.status_code != 200:
        print(f"X Failed to create test entity: Status {create_response.status_code}")
        print(f"Response: {create_response.text}")
        return False
    
    created_entity = create_response.json()
    print(f"OK Test entity created successfully with ID: {created_entity.get('id')}")
    
    # Step 2: Verify that the ID is a ULID (26 characters)
    entity_id = created_entity.get('id')
    if not entity_id or len(entity_id) != 26:
        print(f"X Invalid ID format. Expected ULID (26 chars), got: {entity_id}")
        return False
    
    print(f"OK ID is properly formatted as ULID: {entity_id}")
    
    # Step 3: Verify that createdAt and updatedAt are present
    created_at = created_entity.get('createdAt')
    updated_at = created_entity.get('updatedAt')
    
    if not created_at:
        print("X createdAt field is missing")
        return False
    
    if not updated_at:
        print("X updatedAt field is missing")
        return False
    
    print(f"OK createdAt: {created_at}")
    print(f"OK updatedAt: {updated_at}")
    
    # Step 4: Test update operation to verify updatedAt changes
    print("\n2. Testing update operation...")
    
    update_data = {
        "name": f"Updated Test Entity - {int(time.time())}",
        "description": "Updated test entity description"
    }
    
    update_response = requests.put(f"{BASE_URL}/api/test-entities/{entity_id}", 
                                  json=update_data, headers=HEADERS, auth=AUTH)
    
    if update_response.status_code != 200:
        print(f"X Failed to update test entity: Status {update_response.status_code}")
        print(f"Response: {update_response.text}")
        return False
    
    updated_entity = update_response.json()
    print("OK Test entity updated successfully")
    
    # Step 5: Verify that updatedAt has changed after update
    new_updated_at = updated_entity.get('updatedAt')
    old_updated_at = updated_at  # from the create response
    
    # Compare timestamps (they should be different after update)
    if new_updated_at == old_updated_at:
        print("X updatedAt did not change after update operation")
        return False
    
    print(f"OK updatedAt changed after update: {old_updated_at} -> {new_updated_at}")
    
    # Step 6: Test retrieval of the entity
    print("\n3. Testing retrieval of the entity...")
    
    get_response = requests.get(f"{BASE_URL}/api/test-entities/{entity_id}", headers=HEADERS, auth=AUTH)
    
    if get_response.status_code != 200:
        print(f"X Failed to retrieve test entity: Status {get_response.status_code}")
        return False
    
    retrieved_entity = get_response.json()
    
    if retrieved_entity.get('id') != entity_id:
        print("X Retrieved entity ID doesn't match created entity ID")
        return False
    
    print("OK Entity retrieved successfully with correct ID")
    
    # Step 7: Verify all Base fields are present in retrieved entity
    base_fields = ['id', 'createdAt', 'updatedAt']
    for field in base_fields:
        if field not in retrieved_entity:
            print(f"X Required Base field '{field}' is missing from retrieved entity")
            return False
    
    print("OK All Base fields are present in retrieved entity")
    
    # Step 8: Test list operation to verify Base fields are included
    print("\n4. Testing list operation...")
    
    list_response = requests.get(f"{BASE_URL}/api/test-entities", headers=HEADERS, auth=AUTH)
    
    if list_response.status_code != 200:
        print(f"X Failed to retrieve test entities list: Status {list_response.status_code}")
        return False
    
    entities_list = list_response.json()
    found_entity = None
    
    for entity in entities_list:
        if entity.get('id') == entity_id:
            found_entity = entity
            break
    
    if not found_entity:
        print("X Created entity not found in list response")
        return False
    
    print("OK Entity found in list response")
    
    # Step 9: Verify that the entity from list also has all Base fields
    for field in base_fields:
        if field not in found_entity:
            print(f"X Required Base field '{field}' is missing from entity in list")
            return False
    
    print("OK All Base fields are present in entity from list")
    
    # Step 10: Cleanup - delete the test entity
    print("\n5. Cleaning up - deleting test entity...")
    
    delete_response = requests.delete(f"{BASE_URL}/api/test-entities/{entity_id}", headers=HEADERS)
    
    if delete_response.status_code not in [204, 200]:
        print(f"! Cleanup failed, but not failing test: Status {delete_response.status_code}")
    else:
        print("OK Test entity deleted successfully")
    
    print("\nOK All Base Entity functionality tests passed!")
    return True

def main():
    print("Starting Production Acceptance Test for Base Entity (Task 3.1)")
    print(f"Target URL: {BASE_URL}")
    
    success = test_base_entity_functionality()
    
    if success:
        print("\nBase Entity Production Acceptance Test PASSED")
        sys.exit(0)
    else:
        print("\nBase Entity Production Acceptance Test FAILED")
        sys.exit(1)

if __name__ == "__main__":
    main()