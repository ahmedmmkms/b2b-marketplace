#!/usr/bin/env python3
"""
Direct test script to verify B2 credentials
"""
import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
import os

# B2 credentials
B2_ACCOUNT_ID = "43f8cd5d949d"
B2_APPLICATION_KEY_ID = "00543f8cd5d949d0000000001"
B2_APPLICATION_KEY = "K005iS73v7srQkqax39ZRy3ZJ/Yth+w"
B2_BUCKET = "p4-prod-assets"
B2_ENDPOINT_URL = "https://s3.us-east-005.backblazeb2.com"

def test_b2_connection():
    print("Testing direct B2 connection...")
    
    # Create S3 client configured for B2
    s3_client = boto3.client(
        's3',
        endpoint_url=B2_ENDPOINT_URL,
        aws_access_key_id=B2_APPLICATION_KEY_ID,
        aws_secret_access_key=B2_APPLICATION_KEY,
        config=Config(
            signature_version='s3v4',
            region_name='us-east-005'  # B2 specific region
        )
    )
    
    try:
        # Test 1: List buckets (should include our target bucket)
        print("\nTest 1: Listing buckets...")
        response = s3_client.list_buckets()
        buckets = [bucket['Name'] for bucket in response['Buckets']]
        print(f"Buckets accessible: {buckets}")
        
        if B2_BUCKET in buckets:
            print(f"SUCCESS: Target bucket '{B2_BUCKET}' is accessible")
        else:
            print(f"ERROR: Target bucket '{B2_BUCKET}' is NOT accessible")
            return False

        # Test 2: Try to access the specific bucket
        print(f"\nTest 2: Accessing bucket '{B2_BUCKET}'...")
        response = s3_client.list_objects_v2(Bucket=B2_BUCKET, MaxKeys=1)
        print("SUCCESS: Successfully accessed the bucket")
        
        # Test 3: Try to upload a test file
        print(f"\nTest 3: Uploading test file...")
        test_content = b"This is a test file for B2 connection verification."
        s3_client.put_object(
            Bucket=B2_BUCKET,
            Key='test_connection.txt',
            Body=test_content
        )
        print("SUCCESS: Successfully uploaded test file")
        
        # Test 4: Try to download the test file
        print(f"\nTest 4: Downloading test file...")
        response = s3_client.get_object(Bucket=B2_BUCKET, Key='test_connection.txt')
        retrieved_content = response['Body'].read()
        
        if retrieved_content == test_content:
            print("SUCCESS: Successfully downloaded and verified test file")
        else:
            print("ERROR: Downloaded content doesn't match uploaded content")
            return False
        
        # Test 5: Delete the test file
        print(f"\nTest 5: Deleting test file...")
        s3_client.delete_object(Bucket=B2_BUCKET, Key='test_connection.txt')
        print("SUCCESS: Successfully deleted test file")
        
        print("\nAll B2 connection tests passed! The B2 credentials are valid.")
        return True
        
    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']
        print(f"ERROR: B2 connection failed with error: {error_code} - {error_message}")
        return False
    except Exception as e:
        print(f"ERROR: Unexpected error during B2 connection test: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_b2_connection()
    exit(0 if success else 1)