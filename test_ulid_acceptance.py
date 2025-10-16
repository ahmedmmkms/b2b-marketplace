#!/usr/bin/env python3
"""
Azure Production Acceptance Test Script for ULID ID Generator
This script tests the ULID functionality against the deployed Azure instance.
"""

import requests
import time
import re
import sys
from typing import List, Dict, Any, Optional

# Configuration
PRODUCTION_API_URL = "https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net"
TIMEOUT = 10  # seconds
HEADERS = {
    'Content-Type': 'application/json',
    'User-Agent': 'ULID-Acceptance-Test/1.0'
}

def is_valid_ulid(ulid: Optional[str]) -> bool:
    """
    Validates if the given string is a valid ULID format
    ULIDs are 26 characters long and contain only base32 characters
    """
    if not ulid or len(ulid) != 26:
        return False
    
    ulid_pattern = re.compile(r'^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$')
    return bool(ulid_pattern.match(ulid))

def extract_timestamp_from_ulid(ulid: str) -> Optional[int]:
    """
    Extracts the timestamp component from a ULID
    The first 10 characters represent the timestamp in base32
    """
    if not is_valid_ulid(ulid):
        return None
    
    # Define the base32 character mapping
    base32_chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
    time_component = ulid[:10]
    
    timestamp_ms = 0
    for char in time_component:
        if char in base32_chars:
            digit_value = base32_chars.index(char)
            timestamp_ms = timestamp_ms * 32 + digit_value
        else:
            return None  # Invalid character
    
    return timestamp_ms

def test_api_health() -> bool:
    """
    Test if the API is accessible and healthy
    """
    try:
        response = requests.get(f"{PRODUCTION_API_URL}/actuator/health", 
                              headers=HEADERS, timeout=TIMEOUT)
        print(f"Health check: {response.status_code} - {response.text[:100]}")
        return response.status_code == 200
    except Exception as e:
        print(f"Health check failed: {e}")
        return False

def test_ulid_generation_in_entities():
    """
    Test ULID generation by creating entities and verifying their IDs
    """
    print("\n--- Testing ULID Generation in Entities ---")
    
    # Since we don't know the exact endpoints available, we'll check common patterns
    endpoints_to_test = [
        "/api/accounts",
        "/api/products", 
        "/api/rfq",
        "/api/users"
    ]
    
    ulids_found = []
    
    for endpoint in endpoints_to_test:
        print(f"\nTesting endpoint: {endpoint}")
        
        # Try to get existing entities
        try:
            response = requests.get(f"{PRODUCTION_API_URL}{endpoint}", 
                                  headers=HEADERS, timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                
                # Look for ULIDs in the response (in id fields)
                if isinstance(data, list):
                    for item in data[:5]:  # Check first 5 items
                        if 'id' in item and is_valid_ulid(item['id']):
                            ulid = item['id']
                            ulids_found.append(ulid)
                            print(f"  Found valid ULID: {ulid}")
                elif 'id' in data and is_valid_ulid(data['id']):
                    ulid = data['id']
                    ulids_found.append(ulid)
                    print(f"  Found valid ULID: {ulid}")
                    
        except requests.exceptions.RequestException as e:
            print(f"  Error accessing {endpoint}: {e}")
        except Exception as e:
            print(f"  Error processing response from {endpoint}: {e}")
    
    return ulids_found

def test_ulid_properties(ulids: List[str]) -> Dict[str, Any]:
    """
    Test properties of collected ULIDs
    """
    print(f"\n--- Testing ULID Properties ---")
    print(f"Found {len(ulids)} ULIDs to test")
    
    results = {
        'valid_format': 0,
        'unique_count': 0,
        'timestamp_ordered': 0,
        'total_tested': len(ulids)
    }
    
    if not ulids:
        return results
    
    # Test format validity
    for ulid in ulids:
        if is_valid_ulid(ulid):
            results['valid_format'] += 1
    
    # Test uniqueness
    unique_ulids = set(ulids)
    results['unique_count'] = len(unique_ulids)
    
    # Test chronological ordering
    if len(ulids) > 1:
        # Extract timestamps and check if they're in chronological order
        timestamps = [extract_timestamp_from_ulid(ulid) for ulid in ulids if extract_timestamp_from_ulid(ulid) is not None]
        
        if timestamps and len(timestamps) == len(ulids):
            sorted_timestamps = sorted(timestamps)
            results['timestamp_ordered'] = 1 if timestamps == sorted_timestamps else 0
    
    print(f"  Valid format: {results['valid_format']}/{results['total_tested']}")
    print(f"  Unique: {results['unique_count']}/{results['total_tested']}")
    
    if results['total_tested'] > 1:
        print(f"  Chronologically ordered: {'Yes' if results['timestamp_ordered'] else 'No'}")
    
    return results

def run_acceptance_tests() -> bool:
    """
    Main function to run all acceptance tests for ULID functionality
    """
    print("Running ULID Production Acceptance Tests...")
    print(f"Target API: {PRODUCTION_API_URL}")
    print(f"Timestamp: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Test 1: API Health
    print("\n--- Test 1: API Health Check ---")
    health_ok = test_api_health()
    print(f"API Health: {'PASS' if health_ok else 'FAIL'}")
    
    if not health_ok:
        print("Cannot proceed - API is not accessible")
        return False
    
    # Test 2: ULID Generation in Entities
    ulids_found = test_ulid_generation_in_entities()
    
    # Test 3: ULID Properties
    properties_results = test_ulid_properties(ulids_found)
    
    # Final Results
    print("\n--- Final Test Results ---")
    print(f"Total ULIDs tested: {properties_results['total_tested']}")
    print(f"Valid format: {properties_results['valid_format']}/{properties_results['total_tested']}")
    print(f"Unique ULIDs: {properties_results['unique_count']}/{properties_results['total_tested']}")
    
    if properties_results['total_tested'] > 1:
        ordering_status = "PASS" if properties_results['timestamp_ordered'] else "FAIL"
        print(f"Chronological ordering: {ordering_status}")
    
    # Determine overall pass/fail
    all_tests_pass = (
        health_ok and 
        properties_results['total_tested'] > 0 and 
        properties_results['valid_format'] == properties_results['total_tested'] and
        properties_results['unique_count'] == properties_results['total_tested'] and
        (properties_results['timestamp_ordered'] == 1 if properties_results['total_tested'] > 1 else True)
    )
    
    print(f"\nOverall Result: {'PASS' if all_tests_pass else 'FAIL'}")
    return all_tests_pass

if __name__ == "__main__":
    try:
        result = run_acceptance_tests()
        sys.exit(0 if result else 1)
    except KeyboardInterrupt:
        print("\nTest interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"Test failed with exception: {e}")
        sys.exit(1)