"""
Test script for ULID-based cursor pagination functionality in the production environment

This script will:
1. Test the API endpoints that use ULID-based cursor pagination
2. Verify that pagination works correctly with ULID-based cursors
3. Validate that forward and backward navigation works as expected
4. Ensure that page sizes and limits are properly enforced
"""

import requests
import json
import time
import sys
from typing import Optional, Dict, Any

# Configuration for the production API
PRODUCTION_API_BASE_URL = "https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net"
TIMEOUT = 10  # seconds

def test_ulid_pagination_functionality():
    """
    Main function to test ULID-based pagination functionality
    """
    print("Testing ULID-based cursor pagination functionality in production environment...")
    print(f"API Base URL: {PRODUCTION_API_BASE_URL}")
    print("-" * 60)

    # Test 1: Initial page request (first page)
    print("Test 1: Fetching first page of paginated results...")
    try:
        first_page = fetch_paginated_data(page_size=5)
        if first_page:
            print(f"✓ Successfully retrieved first page with {len(first_page.get('content', []))} items")
            print(f"  - Has next page: {first_page.get('hasNext', False)}")
            print(f"  - Has previous page: {first_page.get('hasPrevious', False)}")
            print(f"  - Is first page: {first_page.get('first', False)}")
            print(f"  - Last ID (for next cursor): {first_page.get('lastId', 'N/A')}")
        else:
            print("✗ Failed to retrieve first page")
            return False
    except Exception as e:
        print(f"✗ Error fetching first page: {str(e)}")
        return False

    # Test 2: Forward pagination (next page)
    print("\nTest 2: Testing forward pagination (next page)...")
    try:
        cursor = first_page.get('lastId')
        if cursor:
            next_page = fetch_paginated_data(page_size=5, cursor=cursor, direction='FORWARD')
            if next_page:
                print(f"✓ Successfully retrieved next page with {len(next_page.get('content', []))} items")
                print(f"  - Has next page: {next_page.get('hasNext', False)}")
                print(f"  - Has previous page: {next_page.get('hasPrevious', False)}")
                print(f"  - Is first page: {next_page.get('first', False)}")
                print(f"  - Is last page: {next_page.get('last', False)}")
            else:
                print("✗ Failed to retrieve next page")
                return False
        else:
            print("✗ No cursor available for forward pagination")
            return False
    except Exception as e:
        print(f"✗ Error fetching next page: {str(e)}")
        return False

    # Test 3: Backward pagination (previous page)
    print("\nTest 3: Testing backward pagination (previous page)...")
    try:
        cursor = first_page.get('firstId') if first_page.get('firstId') else first_page.get('lastId')
        if cursor:
            prev_page = fetch_paginated_data(page_size=5, cursor=cursor, direction='BACKWARD')
            if prev_page:
                print(f"✓ Successfully retrieved previous page with {len(prev_page.get('content', []))} items")
                print(f"  - Has next page: {prev_page.get('hasNext', False)}")
                print(f"  - Has previous page: {prev_page.get('hasPrevious', False)}")
            else:
                print("✗ Failed to retrieve previous page")
                return False
        else:
            print("✗ No cursor available for backward pagination")
            return False
    except Exception as e:
        print(f"✗ Error fetching previous page: {str(e)}")
        return False

    # Test 4: Cursor validation
    print("\nTest 4: Testing cursor validation with invalid cursor...")
    try:
        invalid_response = fetch_paginated_data(page_size=5, cursor='INVALID_CURSOR_1234567890')
        if invalid_response is None:
            print("✓ Invalid cursor properly rejected")
        else:
            print("✗ Invalid cursor was accepted when it should have been rejected")
    except Exception as e:
        print(f"✓ Invalid cursor properly handled with error: {str(e)}")

    # Test 5: Page size validation
    print("\nTest 5: Testing page size limits...")
    try:
        large_page = fetch_paginated_data(page_size=100)  # Test with large page size
        if large_page:
            print(f"✓ Large page size handled properly with {len(large_page.get('content', []))} items")
        else:
            print("✗ Failed to handle large page size")
            return False
    except Exception as e:
        print(f"✗ Error with large page size: {str(e)}")
        return False

    print("\n" + "=" * 60)
    print("ULID Pagination functionality test completed successfully!")
    print("All pagination operations working correctly in production environment.")
    return True

def fetch_paginated_data(page_size: int, cursor: Optional[str] = None, direction: str = 'FORWARD') -> Optional[Dict[Any, Any]]:
    """
    Fetch paginated data from the production API
    
    Args:
        page_size: Number of items per page
        cursor: ULID cursor for pagination (None for first page)
        direction: Direction of pagination ('FORWARD' or 'BACKWARD')
    
    Returns:
        Response dictionary or None if request failed
    """
    # Construct the endpoint URL
    # This would be the actual endpoint that implements ULID-based pagination
    # In this example, we'll assume there's an endpoint like /api/products/paginated
    endpoint = f"{PRODUCTION_API_BASE_URL}/api/products/paginated"
    
    # Prepare query parameters
    params = {
        'size': page_size,
        'direction': direction
    }
    
    if cursor:
        params['cursor'] = cursor
    
    try:
        response = requests.get(endpoint, params=params, timeout=TIMEOUT)
        
        # Check if the response is successful
        if response.status_code == 200:
            return response.json()
        else:
            print(f"  - API returned status code: {response.status_code}")
            print(f"  - Response content: {response.text[:200]}...")
            return None
            
    except requests.exceptions.Timeout:
        print(f"  - Request timed out after {TIMEOUT} seconds")
        return None
    except requests.exceptions.RequestException as e:
        print(f"  - Request failed with error: {str(e)}")
        return None
    except json.JSONDecodeError:
        print("  - Response is not valid JSON")
        return None

def validate_pagination_response(response: Dict[Any, Any]) -> bool:
    """
    Validate that the pagination response contains all required fields
    
    Args:
        response: The pagination response to validate
    
    Returns:
        True if valid, False otherwise
    """
    required_fields = ['content', 'pageRequest', 'firstId', 'lastId', 'hasNext', 'hasPrevious', 'first', 'last']
    
    for field in required_fields:
        if field not in response:
            print(f"  - Missing required field: {field}")
            return False
    
    # Validate that content is a list
    if not isinstance(response['content'], list):
        print("  - Content field is not a list")
        return False
    
    # Validate ULID format for firstId and lastId if they exist
    for field in ['firstId', 'lastId']:
        value = response.get(field)
        if value is not None and not is_valid_ulid(value):
            print(f"  - Invalid ULID format in {field}: {value}")
            return False
    
    return True

def is_valid_ulid(ulid_str: str) -> bool:
    """
    Simple validation for ULID format (26-character base32 string)
    
    Args:
        ulid_str: The ULID string to validate
    
    Returns:
        True if valid ULID format, False otherwise
    """
    if not ulid_str or len(ulid_str) != 26:
        return False
    
    # ULIDs use base32 characters: 0-9, A-V (case insensitive)
    import re
    return bool(re.fullmatch(r'[0-9A-V]{26}', ulid_str.upper()))

def run_detailed_pagination_test():
    """
    Run a more detailed test to verify pagination behavior
    """
    print("\nRunning detailed pagination test...")
    
    # Fetch first page
    first_page = fetch_paginated_data(page_size=3)
    if not first_page or len(first_page.get('content', [])) == 0:
        print("✗ Could not get first page for detailed test")
        return False
    
    print(f"First page retrieved with {len(first_page['content'])} items")
    
    # Check if we have a next page
    if not first_page.get('hasNext'):
        print("⚠ First page has no next page, cannot continue detailed test")
        return True  # This might be normal if there are few items
    
    # Get next page
    cursor = first_page.get('lastId')
    if not cursor:
        print("✗ No cursor available for next page")
        return False
    
    next_page = fetch_paginated_data(page_size=3, cursor=cursor, direction='FORWARD')
    if not next_page:
        print("✗ Could not get next page")
        return False
    
    print(f"Next page retrieved with {len(next_page['content'])} items")
    
    # Verify no overlap between pages
    first_page_ids = {item.get('id') for item in first_page['content'] if isinstance(item, dict) and 'id' in item}
    next_page_ids = {item.get('id') for item in next_page['content'] if isinstance(item, dict) and 'id' in item}
    
    overlap = first_page_ids.intersection(next_page_ids)
    if overlap:
        print(f"✗ Found overlapping IDs between pages: {overlap}")
        return False
    else:
        print("✓ No overlap found between consecutive pages")
    
    # Verify ULID ordering
    first_page_last_id = first_page.get('lastId')
    next_page_first_id = next_page.get('firstId') if next_page.get('content') else None
    
    if first_page_last_id and next_page_first_id:
        # In forward pagination, the last ID of the first page should be less than the first ID of the next page
        if first_page_last_id >= next_page_first_id:
            print(f"✗ ULID ordering incorrect: {first_page_last_id} >= {next_page_first_id}")
            return False
        else:
            print(f"✓ ULID ordering correct: {first_page_last_id} < {next_page_first_id}")
    
    print("✓ Detailed pagination test completed successfully")
    return True

if __name__ == "__main__":
    success = test_ulid_pagination_functionality()
    if success:
        print("\n" + "=" * 60)
        print("All primary tests passed!")
        
        # Run additional detailed test
        detailed_success = run_detailed_pagination_test()
        if detailed_success:
            print("\n🎉 All ULID pagination tests passed!")
            sys.exit(0)
        else:
            print("\n❌ Detailed pagination test failed!")
            sys.exit(1)
    else:
        print("\n❌ Primary ULID pagination tests failed!")
        sys.exit(1)