#!/usr/bin/env python3
"""
Production Acceptance Test Script for JWT Authentication (Task 4.3)
This script tests the JWT authentication implementation in the production environment.
"""

import os
import sys
import json
import requests
import time
from typing import Optional

# Environment configuration
BASE_URL = os.getenv("API_URL_BASE", "https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net")
JWT_SECRET = os.getenv("JWT_SECRET", "mySecretKeyMustBeLongerThan256BitsForHS512Algorithm")
TEST_EMAIL = "testuser@example.com"
TEST_PASSWORD = "SecurePassword123!"
TEST_FIRST_NAME = "Test"
TEST_LAST_NAME = "User"

# Headers for API requests
HEADERS = {
    "Content-Type": "application/json"
}

def print_status(step: str, status: str, details: str = ""):
    """Print test status with consistent formatting"""
    print(f"[{status}] {step}")
    if details:
        print(f"  Details: {details}")
    print()

def create_test_user() -> Optional[str]:
    """Create a test user account for authentication testing"""
    url = f"{BASE_URL}/api/users"
    
    # First create an account
    account_data = {
        "accountType": "INDIVIDUAL",
        "contactPerson": f"{TEST_FIRST_NAME} {TEST_LAST_NAME}",
        "email": "testaccount@example.com",
        "status": "ACTIVE"
    }
    
    try:
        response = requests.post(url.replace('/users', '/accounts'), 
                               json=account_data, headers=HEADERS, timeout=10)
        if response.status_code != 201:
            print_status("Create Account", "FAIL", f"Status: {response.status_code}, Response: {response.text}")
            return None
            
        account_response = response.json()
        account_id = account_response['data']['id']
        print_status("Create Account", "PASS", f"Account ID: {account_id}")
    except Exception as e:
        print_status("Create Account", "FAIL", str(e))
        return None

    # Create the user associated with the account
    user_data = {
        "accountId": account_id,
        "firstName": TEST_FIRST_NAME,
        "lastName": TEST_LAST_NAME,
        "email": TEST_EMAIL,
        "phone": "+1234567890",
        "isActive": True,
        "passwordHash": TEST_PASSWORD  # This will be encoded by the controller
    }
    
    try:
        response = requests.post(url, json=user_data, headers=HEADERS, timeout=10)
        if response.status_code != 201:
            print_status("Create Test User", "FAIL", f"Status: {response.status_code}, Response: {response.text}")
            return None
            
        user_response = response.json()
        user_id = user_response['data']['id']
        print_status("Create Test User", "PASS", f"User ID: {user_id}")
        return user_id
    except Exception as e:
        print_status("Create Test User", "FAIL", str(e))
        return None

def test_login_endpoint():
    """Test the login endpoint to get JWT tokens"""
    url = f"{BASE_URL}/api/auth/login"
    auth_data = {
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    }
    
    try:
        response = requests.post(url, json=auth_data, headers=HEADERS, timeout=10)
        if response.status_code != 200:
            print_status("Login Endpoint Test", "FAIL", f"Status: {response.status_code}, Response: {response.text}")
            return None
            
        auth_response = response.json()
        access_token = auth_response['data']['accessToken']
        refresh_token = auth_response['data']['refreshToken']
        
        print_status("Login Endpoint Test", "PASS", "Successfully obtained JWT tokens")
        return access_token, refresh_token
    except Exception as e:
        print_status("Login Endpoint Test", "FAIL", str(e))
        return None

def test_protected_endpoint(access_token: str):
    """Test accessing a protected endpoint with JWT token"""
    url = f"{BASE_URL}/api/users"  # Any protected endpoint will work

    headers_with_auth = HEADERS.copy()
    headers_with_auth["Authorization"] = f"Bearer {access_token}"
    
    try:
        response = requests.get(url, headers=headers_with_auth, timeout=10)
        if response.status_code != 200:
            print_status("Protected Endpoint Test", "FAIL", f"Status: {response.status_code}, Response: {response.text}")
            return False
            
        print_status("Protected Endpoint Test", "PASS", "Successfully accessed protected endpoint with JWT")
        return True
    except Exception as e:
        print_status("Protected Endpoint Test", "FAIL", str(e))
        return False

def test_refresh_token_endpoint(refresh_token: str):
    """Test the refresh token endpoint to get a new access token"""
    url = f"{BASE_URL}/api/auth/refresh"
    refresh_data = {
        "refreshToken": refresh_token
    }
    
    try:
        response = requests.post(url, json=refresh_data, headers=HEADERS, timeout=10)
        if response.status_code != 200:
            print_status("Refresh Token Test", "FAIL", f"Status: {response.status_code}, Response: {response.text}")
            return None
            
        refresh_response = response.json()
        new_access_token = refresh_response['data']['accessToken']
        
        print_status("Refresh Token Test", "PASS", "Successfully refreshed access token")
        return new_access_token
    except Exception as e:
        print_status("Refresh Token Test", "FAIL", str(e))
        return None

def main():
    """Main function to execute the JWT authentication tests"""
    print("Starting JWT Authentication Production Acceptance Test...")
    print(f"Target URL: {BASE_URL}")
    print()
    
    # Step 1: Create a test user
    user_id = create_test_user()
    if not user_id:
        print("Cannot proceed without a test user")
        sys.exit(1)
    
    time.sleep(2)  # Wait a bit for user to be properly created
    
    # Step 2: Test login endpoint
    tokens = test_login_endpoint()
    if not tokens:
        print("Cannot proceed without valid JWT tokens")
        sys.exit(1)
    
    access_token, refresh_token = tokens
    
    # Step 3: Test protected endpoint
    if not test_protected_endpoint(access_token):
        print("Protected endpoint test failed")
        sys.exit(1)
    
    # Step 4: Test refresh token
    new_access_token = test_refresh_token_endpoint(refresh_token)
    if not new_access_token:
        print("Refresh token test failed")
        sys.exit(1)
    
    # Step 5: Test new access token from refresh
    if not test_protected_endpoint(new_access_token):
        print("New access token from refresh test failed")
        sys.exit(1)
    
    print()
    print("="*60)
    print("JWT Authentication Production Acceptance Test: PASSED")
    print("All JWT authentication functionality working correctly in production")
    print("="*60)

if __name__ == "__main__":
    main()