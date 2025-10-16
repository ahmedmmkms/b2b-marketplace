#!/usr/bin/env python3
"""
Production acceptance test for Task 3.2: Audit Trail Functionality

This script tests the audit trail functionality in the Azure deployment.
It verifies that audit logs are properly created when entities are modified.
"""

import os
import sys
import requests
import json
import time
from datetime import datetime, timedelta

# Configuration from environment or defaults
API_BASE_URL = os.getenv('API_URL_BASE', 'https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net')
TEST_TIMEOUT = int(os.getenv('TEST_TIMEOUT', '30'))
API_KEY = os.getenv('API_KEY', None)  # In production, you might need authentication

# Headers for requests
HEADERS = {
    'Content-Type': 'application/json'
}

if API_KEY:
    HEADERS['Authorization'] = f'Bearer {API_KEY}'

def create_test_user():
    """Create a test user for audit trail testing"""
    # This might require different endpoints depending on the actual API
    # For this test, we'll assume we can make calls directly to the audit functionality
    
    # Create a test audit log
    audit_data = {
        "userId": "TEST_USER",
        "action": "TEST_ACTION",
        "entityType": "TestEntity",
        "entityId": "TEST_ENTITY_123",
        "metadata": {
            "test_scenario": "audit_trail_verification",
            "timestamp": datetime.utcnow().isoformat()
        }
    }
    
    url = f"{API_BASE_URL}/api/audit/log-custom-action"
    params = {
        'userId': 'TEST_USER',
        'action': 'TEST_ACTION',
        'entityName': 'TestEntity',
        'entityId': 'TEST_ENTITY_123'
    }
    response = requests.post(url, json=audit_data.get('metadata', {}), params=params, headers=HEADERS)
    
    return response

def get_audit_logs(entity_type, entity_id):
    """Get audit logs for a specific entity"""
    url = f"{API_BASE_URL}/api/audit/logs/{entity_type}/{entity_id}"
    
    response = requests.get(url, headers=HEADERS)
    return response

def get_recent_logs():
    """Get recent audit logs"""
    url = f"{API_BASE_URL}/api/audit/recent-logs"
    
    response = requests.get(url, headers=HEADERS)
    return response

def test_audit_trail_creation():
    """Test that audit logs can be created"""
    print("Testing audit trail creation...")
    
    response = create_test_user()
    
    if response.status_code == 200:
        print("✓ Audit log creation successful")
        return True
    else:
        print(f"✗ Audit log creation failed: {response.status_code} - {response.text}")
        return False

def test_audit_trail_retrieval():
    """Test that audit logs can be retrieved"""
    print("Testing audit trail retrieval...")
    
    response = get_audit_logs("TestEntity", "TEST_ENTITY_123")
    
    if response.status_code == 200:
        logs = response.json()
        print(f"✓ Retrieved {len(logs)} audit logs for TestEntity")
        return True
    else:
        print(f"✗ Audit log retrieval failed: {response.status_code} - {response.text}")
        return False

def test_recent_logs():
    """Test retrieval of recent logs"""
    print("Testing recent audit logs retrieval...")
    
    response = get_recent_logs()
    
    if response.status_code == 200:
        logs = response.json()
        print(f"✓ Retrieved {len(logs)} recent audit logs")
        return True
    else:
        print(f"✗ Recent audit logs retrieval failed: {response.status_code} - {response.text}")
        return False

def run_tests():
    """Run all audit trail functionality tests"""
    print("Starting Audit Trail Production Acceptance Tests...")
    print(f"Target API: {API_BASE_URL}")
    print("-" * 60)
    
    tests = [
        ("Audit Log Creation", test_audit_trail_creation),
        ("Audit Log Retrieval", test_audit_trail_retrieval),
        ("Recent Logs Retrieval", test_recent_logs),
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\nRunning: {test_name}")
        try:
            result = test_func()
            results.append((test_name, result))
            status = "PASS" if result else "FAIL"
            print(f"Status: {status}")
        except Exception as e:
            print(f"ERROR: {str(e)}")
            results.append((test_name, False))
    
    print("\n" + "="*60)
    print("Audit Trail Production Acceptance Test Results:")
    
    all_passed = True
    for test_name, result in results:
        status = "PASS" if result else "FAIL"
        print(f"{test_name}: {status}")
        if not result:
            all_passed = False
    
    print("="*60)
    
    if all_passed:
        print("✓ All audit trail tests PASSED")
        return 0
    else:
        print("✗ Some audit trail tests FAILED")
        return 1

if __name__ == "__main__":
    exit_code = run_tests()
    sys.exit(exit_code)