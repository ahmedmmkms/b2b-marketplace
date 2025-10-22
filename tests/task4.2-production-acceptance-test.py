import os
import requests
import json
import sys
from datetime import datetime


# Configuration from the architecture plan
API_URL_BASE = os.getenv('API_URL_BASE', 'https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net')
SECURITY_USER_NAME = os.getenv('SECURITY_USER_NAME', 'user')
SECURITY_USER_PASSWORD = os.getenv('SECURITY_USER_PASSWORD', '112233445566')
TIMEOUT = 30


def create_test_account():
    """Create a test account for user association testing"""
    print("Creating test account...")
    
    account_data = {
        "accountType": "COMPANY",
        "companyName": "Test Company for Users",
        "contactPerson": "Test User Creator",
        "email": f"test_user_{int(datetime.now().timestamp())}@example.com",
        "phone": "+1234567890",
        "taxId": "TAX123456",
        "kycVerified": True
    }
    
    try:
        response = requests.post(
            f"{API_URL_BASE}/api/accounts",
            json=account_data,
            auth=(SECURITY_USER_NAME, SECURITY_USER_PASSWORD),
            timeout=TIMEOUT
        )
        
        if response.status_code in [200, 201]:
            print("+ Test account created successfully")
            return response.json()['data']  # Return the actual account object from the 'data' field
        else:
            print(f"X Failed to create test account: {response.status_code} - {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"- Request error while creating test account: {str(e)}")
        return None


def create_test_user(account_id):
    """Create a test user associated with the test account"""
    print("Creating test user...")
    
    # First, get the full account details to include in the user creation
    try:
        account_response = requests.get(
            f"{API_URL_BASE}/api/accounts/{account_id}",
            auth=(SECURITY_USER_NAME, SECURITY_USER_PASSWORD),
            timeout=TIMEOUT
        )
        
        if account_response.status_code != 200:
            print(f"- Failed to retrieve account details: {account_response.status_code} - {account_response.text}")
            return None
            
        account_details = account_response.json()['data']
    except requests.exceptions.RequestException as e:
        print(f"- Request error while retrieving account details: {str(e)}")
        return None
    
    user_data = {
        "account": account_details,
        "firstName": "John",
        "lastName": "Doe",
        "email": f"john_doe_{int(datetime.now().timestamp())}@example.com",
        "phone": "+1234567890",
        "jobTitle": "Test Engineer",
        "passwordHash": "hashed_password_placeholder",
        "salt": "salt_placeholder"
    }
    
    try:
        response = requests.post(
            f"{API_URL_BASE}/api/users",
            json=user_data,
            auth=(SECURITY_USER_NAME, SECURITY_USER_PASSWORD),
            timeout=TIMEOUT
        )
        
        if response.status_code in [200, 201]:
            print("+ Test user created successfully")
            return response.json()['data']  # Return the actual user object from the 'data' field
        else:
            print(f"- Failed to create test user: {response.status_code} - {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"- Request error while creating test user: {str(e)}")
        return None


def get_user_by_id(user_id):
    """Retrieve a user by ID to verify it was created with proper account association"""
    print(f"Retrieving user with ID: {user_id}")
    
    try:
        response = requests.get(
            f"{API_URL_BASE}/api/users/{user_id}",
            auth=(SECURITY_USER_NAME, SECURITY_USER_PASSWORD),
            timeout=TIMEOUT
        )
        
        if response.status_code == 200:
            print("+ User retrieved successfully")
            return response.json()['data']  # Return the actual user object from the 'data' field
        else:
            print(f"- Failed to retrieve user: {response.status_code} - {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"- Request error while retrieving user: {str(e)}")
        return None


def get_user_by_email(email):
    """Retrieve a user by email to verify the find operation works"""
    print(f"Retrieving user with email: {email}")
    
    try:
        response = requests.get(
            f"{API_URL_BASE}/api/users/email/{email}",
            auth=(SECURITY_USER_NAME, SECURITY_USER_PASSWORD),
            timeout=TIMEOUT
        )
        
        if response.status_code == 200:
            print("+ User retrieved by email successfully")
            return response.json()['data']  # Return the actual user object from the 'data' field
        else:
            print(f"- Failed to retrieve user by email: {response.status_code} - {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"- Request error while retrieving user by email: {str(e)}")
        return None


def update_user(user_id):
    """Update a user to test the update functionality"""
    print(f"Updating user with ID: {user_id}")
    
    # First, retrieve the current user to get all current values
    try:
        current_response = requests.get(
            f"{API_URL_BASE}/api/users/{user_id}",
            auth=(SECURITY_USER_NAME, SECURITY_USER_PASSWORD),
            timeout=TIMEOUT
        )
        
        if current_response.status_code != 200:
            print(f"- Failed to retrieve current user for update: {current_response.status_code} - {current_response.text}")
            return None
            
        current_user = current_response.json()['data']
    except requests.exceptions.RequestException as e:
        print(f"- Request error while retrieving current user for update: {str(e)}")
        return None
    
    # Update only the fields we want to change, keeping all required fields
    # For the account, only send the ID reference
    update_data = {
        "account": {"id": current_user["account"]["id"]},  # Only send account ID
        "firstName": "Jane",                  # Changed value
        "lastName": current_user["lastName"], # Keep original
        "email": current_user["email"],       # Keep original (required field)
        "phone": current_user["phone"],       # Keep original
        "jobTitle": "Senior Test Engineer",   # Changed value
        "passwordHash": current_user["passwordHash"],  # Keep original (required field)
        "salt": current_user["salt"],                    # Keep original (required field)
        "isActive": True                      # Changed value
    }
    
    try:
        response = requests.put(
            f"{API_URL_BASE}/api/users/{user_id}",
            json=update_data,
            auth=(SECURITY_USER_NAME, SECURITY_USER_PASSWORD),
            timeout=TIMEOUT
        )
        
        if response.status_code == 200:
            print("+ User updated successfully")
            return response.json()['data']  # Return the actual user object from the 'data' field
        else:
            print(f"- Failed to update user: {response.status_code} - {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"- Request error while updating user: {str(e)}")
        return None


def find_users_by_account(account_id):
    """Find all users associated with an account"""
    print(f"Finding users for account ID: {account_id}")
    
    try:
        response = requests.get(
            f"{API_URL_BASE}/api/users/account/{account_id}",
            auth=(SECURITY_USER_NAME, SECURITY_USER_PASSWORD),
            timeout=TIMEOUT
        )
        
        if response.status_code == 200:
            print("+ Users found successfully")
            return response.json()['data']  # Return the list of users from the 'data' field
        else:
            print(f"- Failed to find users: {response.status_code} - {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"- Request error while finding users: {str(e)}")
        return None


def delete_test_user(user_id):
    """Delete the test user"""
    print(f"Deleting test user with ID: {user_id}")
    
    try:
        response = requests.delete(
            f"{API_URL_BASE}/api/users/{user_id}",
            auth=(SECURITY_USER_NAME, SECURITY_USER_PASSWORD),
            timeout=TIMEOUT
        )
        
        if response.status_code in [200, 204]:
            print("+ Test user deleted successfully")
            return True
        else:
            print(f"- Failed to delete user: {response.status_code} - {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"- Request error while deleting user: {str(e)}")
        return False


def delete_test_account(account_id):
    """Delete the test account"""
    print(f"Deleting test account with ID: {account_id}")
    
    try:
        response = requests.delete(
            f"{API_URL_BASE}/api/accounts/{account_id}",
            auth=(SECURITY_USER_NAME, SECURITY_USER_PASSWORD),
            timeout=TIMEOUT
        )
        
        if response.status_code in [200, 204]:
            print("+ Test account deleted successfully")
            return True
        else:
            print(f"- Failed to delete account: {response.status_code} - {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"- Request error while deleting account: {str(e)}")
        return False


def run_acceptance_tests():
    """Run all acceptance tests for User entity operations"""
    print("Starting User Entity Production Acceptance Tests...")
    print(f"Target API: {API_URL_BASE}")
    print("-" * 60)
    
    # Step 1: Create a test account
    account = create_test_account()
    if not account or 'id' not in account:
        print("- Test failed: Could not create test account")
        return False
    
    account_id = account['id']
    print(f"Created account with ID: {account_id}")
    
    # Step 2: Create a test user associated with the account
    user = create_test_user(account_id)
    if not user or 'id' not in user:
        print("- Test failed: Could not create test user")
        delete_test_account(account_id)  # Cleanup
        return False
    
    user_id = user['id']
    print(f"Created user with ID: {user_id}")
    
    # Step 3: Verify that user can be retrieved by ID
    retrieved_user = get_user_by_id(user_id)
    if not retrieved_user:
        print("- Test failed: Could not retrieve user by ID")
        delete_test_user(user_id)  # Cleanup
        delete_test_account(account_id)  # Cleanup
        return False
    
    # Verify the account association exists
    if 'account' not in retrieved_user or retrieved_user['account']['id'] != account_id:
        print("- Test failed: User is not properly associated with the account")
        delete_test_user(user_id)  # Cleanup
        delete_test_account(account_id)  # Cleanup
        return False
    
    print("+ User is properly associated with account")
    
    # Step 4: Verify that user can be retrieved by email
    retrieved_by_email = get_user_by_email(user['email'])
    if not retrieved_by_email:
        print("- Test failed: Could not retrieve user by email")
        delete_test_user(user_id)  # Cleanup
        delete_test_account(account_id)  # Cleanup
        return False
    
    # Check that the retrieved user is the same as the created user
    if retrieved_by_email['id'] != user_id:
        print("- Test failed: User retrieved by email is different from created user")
        delete_test_user(user_id)  # Cleanup
        delete_test_account(account_id)  # Cleanup
        return False
    
    print("+ User can be retrieved by email")
    
    # Step 5: Test update functionality
    updated_user = update_user(user_id)
    if not updated_user:
        print("- Test failed: Could not update user")
        delete_test_user(user_id)  # Cleanup
        delete_test_account(account_id)  # Cleanup
        return False
    
    # Verify the update worked
    if updated_user['firstName'] != 'Jane':
        print("- Test failed: User update did not persist")
        delete_test_user(user_id)  # Cleanup
        delete_test_account(account_id)  # Cleanup
        return False
    
    print("+ User update functionality works")
    
    # Step 6: Test finding users by account
    users_by_account = find_users_by_account(account_id)
    if not users_by_account:
        print("- Test failed: Could not find users by account")
        delete_test_user(user_id)  # Cleanup
        delete_test_account(account_id)  # Cleanup
        return False
    
    # Verify our user is in the list
    user_found = any(u['id'] == user_id for u in users_by_account)
    if not user_found:
        print("- Test failed: Created user was not found in users by account")
        delete_test_user(user_id)  # Cleanup
        delete_test_account(account_id)  # Cleanup
        return False
    
    print("+ Find users by account functionality works")
    
    # Step 7: Cleanup - delete the test user and account
    user_deleted = delete_test_user(user_id)
    account_deleted = delete_test_account(account_id)
    
    if not user_deleted or not account_deleted:
        print("- Warning: Could not clean up test data")
        return False
    
    print("+ All cleanup operations completed successfully")
    
    print("-" * 60)
    print("+ All User Entity Production Acceptance Tests PASSED")
    return True


if __name__ == "__main__":
    success = run_acceptance_tests()
    
    if not success:
        print("\n- Some tests failed. Check the logs above for details.")
        sys.exit(1)
    else:
        print("\n+ All tests passed successfully!")
        sys.exit(0)