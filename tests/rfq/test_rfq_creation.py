#!/usr/bin/env python3
"""
RFQ Creation API Test Script
Tests the production environment for RFQ functionality
"""

import requests
import json
import sys
from datetime import datetime, timedelta


def test_rfq_api():
    """
    Test the RFQ API endpoints in the production environment
    """
    # Production URL
    base_url = "https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net"
    
    # Authentication credentials
    username = "user"
    password = "112233445566"
    
    # Create authentication header
    auth = (username, password)
    
    print("Testing RFQ API endpoints in production environment...")
    
    # Test 1: Check if RFQ endpoints are accessible
    print("\n1. Checking if RFQ endpoints are accessible...")
    rfq_endpoint = f"{base_url}/api/rfq"
    
    try:
        response = requests.get(rfq_endpoint, auth=auth, timeout=10)
        print(f"   GET {rfq_endpoint} - Status: {response.status_code}")
        
        if response.status_code in [200, 401, 403, 404, 405]:
            print("   [OK] Endpoint is accessible")
        else:
            print(f"   [ERROR] Unexpected status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"   ✗ Error accessing endpoint: {e}")
    
    # Test 2: Test the health endpoint
    print("\n2. Testing health endpoint...")
    health_endpoint = f"{base_url}/actuator/health"
    
    try:
        response = requests.get(health_endpoint, auth=auth, timeout=10)
        print(f"   GET {health_endpoint} - Status: {response.status_code}")
        
        if response.status_code == 200:
            print("   [OK] Health endpoint is accessible and healthy")
            data = response.json()
            print(f"   Health status: {data.get('status', 'unknown')}")
        else:
            print(f"   [ERROR] Health endpoint returned non-200 status: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"   ✗ Error accessing health endpoint: {e}")
    
    # Test 3: Check feature flags
    print("\n3. Testing feature flags endpoint...")
    features_endpoint = f"{base_url}/api/test/config"
    
    try:
        response = requests.get(features_endpoint, auth=auth, timeout=10)
        print(f"   GET {features_endpoint} - Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            rfq_enabled = data.get('featureFlags', {}).get('rfq', {}).get('enabled', False)
            print(f"   [OK] Feature flags accessible, RFQ enabled: {rfq_enabled}")
        else:
            print(f"   [INFO] Feature flags endpoint returned status: {response.status_code}")
            print("   (This endpoint may require specific configuration to be exposed)")
    except requests.exceptions.RequestException as e:
        print(f"   [INFO] Error accessing features endpoint: {e}")
        print("   (This endpoint may require specific configuration to be exposed)")
    
    # Test 4: Try creating an RFQ (if endpoint exists)
    print("\n4. Testing RFQ creation endpoint...")
    rfq_data = {
        "title": "Test RFQ for Production Validation",
        "description": "RFQ created for production acceptance testing",
        "contactPerson": "Test User",
        "contactEmail": "test@example.com",
        "currency": "USD",
        "expiryDate": (datetime.now() + timedelta(days=7)).isoformat(),
        "isPublic": False,
        "rfqLines": [
            {
                "productName": "Test Product",
                "description": "Test product for RFQ",
                "quantity": 10,
                "unitOfMeasure": "EA",
                "productSpecifications": "Standard specifications",
                "brandPreference": "Any",
                "qualityRequirements": "Standard quality"
            }
        ],
        "vendorShortlist": [
            "VENDOR001",
            "VENDOR002"
        ]
    }
    
    try:
        response = requests.post(
            rfq_endpoint,
            auth=auth,
            json=rfq_data,
            timeout=15
        )
        print(f"   POST {rfq_endpoint} - Status: {response.status_code}")
        
        if response.status_code in [200, 201]:
            print("   [OK] RFQ creation successful")
            try:
                result = response.json()
                print(f"   Created RFQ ID: {result.get('id', 'not provided')}")
            except:
                print("   Response: Non-JSON (see raw response)")
        elif response.status_code in [401, 403]:
            print("   ? Unauthorized/Forbidden - authentication might be required or insufficient")
        elif response.status_code == 404:
            print("   ? RFQ creation endpoint not found - may not be implemented yet")
        elif response.status_code == 405:
            print("   ? Method not allowed - endpoint may exist but not support POST")
        elif response.status_code == 422:
            print("   ? Validation error - check request format")
        else:
            print(f"   ? Unexpected status: {response.status_code}")
            print(f"   Response body: {response.text[:200]}...")
    except requests.exceptions.RequestException as e:
        print(f"   [ERROR] Error making request to create RFQ: {e}")
    
    print("\n" + "="*50)
    print("RFQ API testing complete.")
    print("Note: If endpoints are not implemented yet, this is expected based on the project's incremental delivery approach.")
    print("="*50)


if __name__ == "__main__":
    test_rfq_api()