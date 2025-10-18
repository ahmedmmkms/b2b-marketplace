#!/usr/bin/env python3
"""
Production Acceptance Test Script for Account Entity
Task 4.1: Implement Account entity and repository
"""

import requests
import json
import sys
import time
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Configuration - Production API
API_BASE_URL = "https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net"
ACCOUNTS_API = f"{API_BASE_URL}/api/accounts"

# Headers for API requests
HEADERS = {
    "Content-Type": "application/json"
}

def create_test_account():
    """Create a test account"""
    account_data = {
        "accountType": "COMPANY",
        "companyName": "Test Company Ltd",
        "contactPerson": "Test User",
        "email": f"test{int(time.time())}@example.com",  # Use timestamp to ensure uniqueness
        "phone": "+1234567890",
        "taxId": "TAX123456789",
        "kycVerified": False
    }
    
    logger.info(f"Creating account with data: {json.dumps(account_data, indent=2)}")
    response = requests.post(ACCOUNTS_API, headers=HEADERS, json=account_data)
    
    logger.info(f"Create Account Response - Status: {response.status_code}")
    if response.status_code == 201:
        logger.info("✓ Account created successfully")
        return response.json()
    else:
        logger.error(f"✗ Failed to create account. Status: {response.status_code}, Response: {response.text}")
        return None

def get_account_by_id(account_id):
    """Retrieve an account by ID"""
    response = requests.get(f"{ACCOUNTS_API}/{account_id}", headers=HEADERS)
    
    logger.info(f"Get Account Response - Status: {response.status_code}")
    if response.status_code == 200:
        logger.info("✓ Account retrieved successfully")
        return response.json()
    else:
        logger.error(f"✗ Failed to retrieve account. Status: {response.status_code}, Response: {response.text}")
        return None

def update_account(account_id, updated_data):
    """Update an existing account"""
    response = requests.put(f"{ACCOUNTS_API}/{account_id}", headers=HEADERS, json=updated_data)
    
    logger.info(f"Update Account Response - Status: {response.status_code}")
    if response.status_code == 200:
        logger.info("✓ Account updated successfully")
        return response.json()
    else:
        logger.error(f"✗ Failed to update account. Status: {response.status_code}, Response: {response.text}")
        return None

def delete_account(account_id):
    """Delete an account by ID"""
    response = requests.delete(f"{ACCOUNTS_API}/{account_id}", headers=HEADERS)
    
    logger.info(f"Delete Account Response - Status: {response.status_code}")
    if response.status_code == 200:
        logger.info("✓ Account deleted successfully")
        return response.json()
    else:
        logger.error(f"✗ Failed to delete account. Status: {response.status_code}, Response: {response.text}")
        return None

def get_all_accounts():
    """Retrieve all accounts"""
    response = requests.get(ACCOUNTS_API, headers=HEADERS)
    
    logger.info(f"Get All Accounts Response - Status: {response.status_code}")
    if response.status_code == 200:
        logger.info("✓ Accounts retrieved successfully")
        return response.json()
    else:
        logger.error(f"✗ Failed to retrieve accounts. Status: {response.status_code}, Response: {response.text}")
        return None

def test_account_entity():
    """Main test function for Account entity"""
    logger.info("Starting Account Entity Production Acceptance Tests...")
    
    # Test 1: Create an account
    logger.info("\n--- Test 1: Create Account ---")
    account_response = create_test_account()
    if not account_response or not account_response.get('success'):
        logger.error("✗ Create Account Test Failed")
        return False
    
    account_id = account_response.get('data', {}).get('id')
    if not account_id:
        logger.error("✗ Account creation did not return a valid ID")
        return False
    
    logger.info(f"✓ Created account with ID: {account_id}")
    
    # Test 2: Retrieve the created account
    logger.info("\n--- Test 2: Retrieve Account ---")
    retrieved_account = get_account_by_id(account_id)
    if not retrieved_account or not retrieved_account.get('success'):
        logger.error("✗ Retrieve Account Test Failed")
        return False
    
    retrieved_data = retrieved_account.get('data', {})
    if retrieved_data.get('id') != account_id:
        logger.error("✗ Retrieved account ID doesn't match created account ID")
        return False
    
    logger.info(f"✓ Retrieved account matches expected ID: {account_id}")
    
    # Test 3: Update the account
    logger.info("\n--- Test 3: Update Account ---")
    update_data = {
        "accountType": "COMPANY",
        "companyName": "Updated Test Company Ltd",
        "contactPerson": "Updated Test User",
        "email": retrieved_data.get('email'),
        "phone": "+9876543210",
        "taxId": "TAX987654321",
        "kycVerified": True,
        "status": "ACTIVE"
    }
    
    updated_account = update_account(account_id, update_data)
    if not updated_account or not updated_account.get('success'):
        logger.error("✗ Update Account Test Failed")
        return False
    
    updated_data_response = updated_account.get('data', {})
    if updated_data_response.get('companyName') != "Updated Test Company Ltd":
        logger.error("✗ Account update was not successful")
        return False
    
    logger.info("✓ Account updated successfully")
    
    # Test 4: Retrieve the updated account
    logger.info("\n--- Test 4: Retrieve Updated Account ---")
    retrieved_updated = get_account_by_id(account_id)
    if not retrieved_updated or not retrieved_updated.get('success'):
        logger.error("✗ Retrieve Updated Account Test Failed")
        return False
    
    retrieved_updated_data = retrieved_updated.get('data', {})
    if retrieved_updated_data.get('companyName') != "Updated Test Company Ltd":
        logger.error("✗ Retrieved updated account doesn't reflect changes")
        return False
    
    if retrieved_updated_data.get('phone') != "+9876543210":
        logger.error("✗ Phone number was not updated properly")
        return False
    
    logger.info("✓ Updated account retrieved successfully with correct values")
    
    # Test 5: Delete the account
    logger.info("\n--- Test 5: Delete Account ---")
    delete_result = delete_account(account_id)
    if not delete_result or not delete_result.get('success'):
        logger.error("✗ Delete Account Test Failed")
        return False
    
    logger.info(f"✓ Account with ID {account_id} deleted successfully")
    
    # Test 6: Verify the account is gone
    logger.info("\n--- Test 6: Verify Account Deletion ---")
    after_delete = get_account_by_id(account_id)
    if after_delete and after_delete.get('success'):
        logger.error("✗ Account still exists after deletion")
        return False
    
    if after_delete and after_delete.get('error') and after_delete['error'].get('status') == 404:
        logger.info("✓ Account correctly deleted (not found after deletion)")
    else:
        logger.warning("Account not found but not with expected 404 error")
    
    logger.info("\n✓ All Account Entity Production Acceptance Tests Passed!")
    return True

def test_validation():
    """Test validation scenarios"""
    logger.info("\n--- Validation Tests ---")
    
    # Test creating account with duplicate email (if possible, we'll try to reuse a recent email)
    account_data = {
        "accountType": "INDIVIDUAL",
        "contactPerson": "Test Individual",
        "email": f"individual{int(time.time())}@example.com",  # Use timestamp for uniqueness
        "phone": "+1122334455",
        "kycVerified": False
    }
    
    # Test individual account without company name (should work)
    logger.info("Testing individual account without company name...")
    response = requests.post(ACCOUNTS_API, headers=HEADERS, json=account_data)
    logger.info(f"Individual account creation - Status: {response.status_code}")
    
    if response.status_code != 201:
        logger.error(f"✗ Individual account creation failed: {response.text}")
        return False
    
    individual_account_response = response.json()
    individual_account_id = individual_account_response.get('data', {}).get('id')
    
    if individual_account_id:
        # Clean up the individual account
        delete_account(individual_account_id)
        logger.info("✓ Individual account validation test passed")
    
    return True

def main():
    """Main function to run all tests"""
    logger.info("Running Account Entity Production Acceptance Tests...")
    
    # Test account entity functionality
    entity_test_result = test_account_entity()
    if not entity_test_result:
        logger.error("Account Entity tests failed!")
        sys.exit(1)
    
    # Test validation
    validation_test_result = test_validation()
    if not validation_test_result:
        logger.error("Validation tests failed!")
        sys.exit(1)
    
    logger.info("\n🎉 All Account Entity Production Acceptance Tests completed successfully!")
    logger.info("Task 4.1: Account entity and repository implementation verified!")

if __name__ == "__main__":
    main()