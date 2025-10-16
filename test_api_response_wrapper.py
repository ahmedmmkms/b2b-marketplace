#!/usr/bin/env python3
"""
Production acceptance test for Task 2.3: Implement API response wrapper
This script verifies that the API responses follow RFC7807 standards.
"""

import requests
import json
import sys
import os
from urllib.parse import urljoin


def test_api_response_wrapper():
    """
    Test script to verify RFC7807 compliance of API responses in production.
    This script tests the API endpoints to ensure they follow RFC7807 standards.
    """
    
    # Get the base API URL from environment or use default
    base_url = os.getenv('API_URL_BASE', 'https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net')
    print(f"Testing API response wrapper on: {base_url}")
    
    success_count = 0
    total_tests = 0
    
    # Test 1: Successful response format
    total_tests += 1
    print("\nTest 1: Checking successful response format...")
    try:
        url = urljoin(base_url, '/api/test/rfc7807/success')
        response = requests.get(url)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        # Parse the response
        data = response.json()
        
        # Check that the response has the expected structure
        assert 'data' in data, "Response should contain 'data' field"
        assert 'success' in data, "Response should contain 'success' field"
        assert data['success'] == True, "Success field should be True for successful response"
        assert 'timestamp' in data, "Response should contain 'timestamp' field"
        
        # Check that data field has expected content
        assert 'id' in data['data'], "Data should contain 'id' field"
        assert 'name' in data['data'], "Data should contain 'name' field"
        assert 'value' in data['data'], "Data should contain 'value' field"
        
        # Check that metadata is present
        assert 'metadata' in data, "Response should contain 'metadata' field"
        assert 'requestId' in data['metadata'], "Metadata should contain 'requestId' field"
        assert 'processingTime' in data['metadata'], "Metadata should contain 'processingTime' field"
        
        print("✅ SUCCESS: Successful response follows expected format")
        success_count += 1
        
    except Exception as e:
        print(f"❌ FAILED: Error testing successful response - {str(e)}")
    
    # Test 2: Error response format (RFC7807 compliant)
    total_tests += 1
    print("\nTest 2: Checking error response format (RFC7807 compliance)...")
    try:
        url = urljoin(base_url, '/api/test/rfc7807/error')
        response = requests.get(url)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        # Parse the response
        data = response.json()
        
        # Check that the response has error structure
        assert 'error' in data, "Response should contain 'error' field"
        assert 'success' in data, "Response should contain 'success' field"
        assert data['success'] == False, "Success field should be False for error response"
        assert 'timestamp' in data, "Response should contain 'timestamp' field"
        
        # Check RFC7807 fields
        error = data['error']
        assert 'type' in error, "Error should contain 'type' field"
        assert 'title' in error, "Error should contain 'title' field"
        assert 'status' in error, "Error should contain 'status' field"
        assert 'detail' in error, "Error should contain 'detail' field"
        assert 'instance' in error, "Error should contain 'instance' field"
        
        # Verify the values
        assert error['status'] == 400, f"Status should be 400, got {error['status']}"
        assert error['title'] == 'Invalid Request', f"Title should be 'Invalid Request', got {error['title']}"
        
        print("✅ SUCCESS: Error response follows RFC7807 format")
        success_count += 1
        
    except Exception as e:
        print(f"❌ FAILED: Error testing error response - {str(e)}")
    
    # Test 3: Exception handling (should produce RFC7807 error)
    total_tests += 1
    print("\nTest 3: Checking exception handling (should produce RFC7807 error)...")
    try:
        url = urljoin(base_url, '/api/test/rfc7807/exception')
        response = requests.get(url)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        # Parse the response
        data = response.json()
        
        # Check that the response has error structure
        assert 'error' in data, "Response should contain 'error' field"
        assert 'success' in data, "Response should contain 'success' field"
        assert data['success'] == False, "Success field should be False for error response"
        
        # Check RFC7807 fields
        error = data['error']
        assert 'type' in error, "Error should contain 'type' field"
        assert 'title' in error, "Error should contain 'title' field"
        assert 'status' in error, "Error should contain 'status' field"
        assert 'detail' in error, "Error should contain 'detail' field"
        
        # Verify the values (should be a 404 error for resource not found)
        assert error['status'] == 404, f"Status should be 404, got {error['status']}"
        
        print("✅ SUCCESS: Exception handling produces RFC7807-compliant error response")
        success_count += 1
        
    except Exception as e:
        print(f"❌ FAILED: Error testing exception handling - {str(e)}")
    
    # Test 4: Validation error response (should be RFC7807 compliant)
    total_tests += 1
    print("\nTest 4: Checking validation error response...")
    try:
        url = urljoin(base_url, '/api/test/rfc7807/validate')
        response = requests.post(url, json={})
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        # Parse the response
        data = response.json()
        
        # Check that the response has error structure
        assert 'error' in data, "Response should contain 'error' field"
        assert 'success' in data, "Response should contain 'success' field"
        assert data['success'] == False, "Success field should be False for error response"
        
        # Check RFC7807 fields
        error = data['error']
        assert 'type' in error, "Error should contain 'type' field"
        assert 'title' in error, "Error should contain 'title' field"
        assert 'status' in error, "Error should contain 'status' field"
        assert 'detail' in error, "Error should contain 'detail' field"
        
        # Verify the values (should be a 400 error for validation)
        assert error['status'] == 400, f"Status should be 400, got {error['status']}"
        assert error['title'] == 'Validation Failed', f"Title should be 'Validation Failed', got {error['title']}"
        
        print("✅ SUCCESS: Validation error response follows RFC7807 format")
        success_count += 1
        
    except Exception as e:
        print(f"❌ FAILED: Error testing validation error response - {str(e)}")
    
    # Test 5: Valid request to validation endpoint (should return success)
    total_tests += 1
    print("\nTest 5: Checking valid request to validation endpoint...")
    try:
        url = urljoin(base_url, '/api/test/rfc7807/validate')
        payload = {
            "value": "test value",
            "number": 50
        }
        response = requests.post(url, json=payload)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        # Parse the response
        data = response.json()
        
        # Check that the response has success structure
        assert 'data' in data, "Response should contain 'data' field"
        assert 'success' in data, "Response should contain 'success' field"
        assert data['success'] == True, "Success field should be True for successful response"
        
        print("✅ SUCCESS: Valid request returns success response with correct format")
        success_count += 1
        
    except Exception as e:
        print(f"❌ FAILED: Error testing valid request - {str(e)}")
    
    # Final results
    print(f"\n--- Test Results ---")
    print(f"Passed: {success_count}/{total_tests}")
    print(f"Success Rate: {(success_count/total_tests)*100:.1f}%")
    
    if success_count == total_tests:
        print("🎉 All tests passed! The API response wrapper follows RFC7807 standards.")
        return True
    else:
        print("⚠️  Some tests failed. Check the implementation for RFC7807 compliance.")
        return False


if __name__ == "__main__":
    success = test_api_response_wrapper()
    sys.exit(0 if success else 1)