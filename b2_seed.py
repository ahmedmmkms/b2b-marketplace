import os
import boto3
from botocore.config import Config
import psycopg2
from dotenv import load_dotenv
from urllib.parse import urlparse
import random
import string
from datetime import datetime

def load_db_config():
    """Load database configuration from .env file"""
    load_dotenv()
    
    # Parse the DB_URL from .env file
    db_url = os.getenv('DB_URL')
    if not db_url:
        raise ValueError("DB_URL not found in .env file")
    
    # Handle JDBC URL format (jdbc:postgresql://...)
    if db_url.startswith('jdbc:'):
        # Remove 'jdbc:' prefix to get standard PostgreSQL URL
        pg_url = db_url[5:]  # Remove 'jdbc:' prefix
        
        # Handle query parameters in JDBC URL
        if '?' in pg_url:
            pg_url, query_params = pg_url.split('?', 1)
        else:
            query_params = ""
            
        # Parse the PostgreSQL URL
        result = urlparse(pg_url)
        
        # Extract credentials from URL components
        password = result.password
        # If password not in URL, try to get from environment
        if not password:
            password = os.getenv('DB_PASSWORD')
        
        return {
            'host': result.hostname,
            'database': result.path[1:],  # Remove leading '/'
            'user': result.username,
            'password': password,
            'port': result.port or 5432,
            'sslmode': 'require',
            'channel_binding': 'require'
        }
    else:
        # Standard PostgreSQL URL
        result = urlparse(db_url)
        
        # Extract credentials from URL components
        password = result.password
        # If password not in URL, try to get from environment
        if not password:
            password = os.getenv('DB_PASSWORD')
        
        return {
            'host': result.hostname,
            'database': result.path[1:],  # Remove leading '/'
            'user': result.username,
            'password': password,
            'port': result.port or 5432,
            'sslmode': 'require',
            'channel_binding': 'require'
        }

def generate_sample_image():
    """Generate a simple 1x1 pixel PNG image"""
    # Simple 1x1 pixel PNG
    png_header = bytes([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,  # PNG header
        0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,  # IHDR chunk start
        0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,  # Image dimensions 1x1
        0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89,  # More header data
        0x00, 0x00, 0x00, 0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0xDA, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00, 0x01,  # IDAT chunk
        0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82  # IEND chunk
    ])
    return png_header

def seed_b2_storage():
    print("Starting Backblaze B2 storage seeding...")
    
    # Get B2 credentials from environment
    b2_account_id = os.getenv('B2_ACCOUNT_ID')
    b2_application_key_id = os.getenv('B2_APPLICATION_KEY_ID') 
    b2_application_key = os.getenv('B2_APPLICATION_KEY')
    b2_bucket_name = os.getenv('B2_BUCKET')
    b2_endpoint_url = os.getenv('B2_ENDPOINT_URL')
    
    if not all([b2_account_id, b2_application_key_id, b2_application_key, b2_bucket_name, b2_endpoint_url]):
        print("Missing B2 credentials in environment variables.")
        print("Expected environment variables:")
        print("- B2_ACCOUNT_ID")
        print("- B2_APPLICATION_KEY_ID") 
        print("- B2_APPLICATION_KEY")
        print("- B2_BUCKET")
        print("- B2_ENDPOINT_URL")
        return
    
    print(f"Using B2 endpoint: {b2_endpoint_url}")
    print(f"Target bucket: {b2_bucket_name}")
    
    try:
        # Create boto3 session with B2 credentials
        s3_client = boto3.client(
            's3',
            endpoint_url=b2_endpoint_url,
            aws_access_key_id=b2_application_key_id,
            aws_secret_access_key=b2_application_key,
            config=Config(signature_version='s3v4')
        )
        
        # Test bucket access by listing objects
        try:
            response = s3_client.list_objects_v2(Bucket=b2_bucket_name, MaxKeys=1)
            print(f"Successfully connected to B2 bucket '{b2_bucket_name}'")
            if 'Contents' in response:
                print(f"Bucket contains {response['KeyCount']} objects (sample: {response['Contents'][0]['Key']})")
            else:
                print("Bucket is empty")
        except s3_client.exceptions.NoSuchBucket:
            print(f"ERROR: Bucket '{b2_bucket_name}' does not exist.")
            print("Please create the bucket in your B2 account first.")
            return
        except Exception as e:
            print(f"Error accessing bucket: {e}")
            return
        
        # Create sample image content
        sample_image_content = generate_sample_image()
        
        # Connect to database to get media assets
        print("Connecting to database to get media assets...")
        connection_params = load_db_config()
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()
        
        # Get media assets from the database
        cursor.execute("SELECT id, filename, file_path FROM media_asset LIMIT 100;")
        media_assets = cursor.fetchall()
        
        print(f"Found {len(media_assets)} media assets in database. Starting upload...")
        
        success_count = 0
        error_count = 0
        
        for idx, (asset_id, filename, file_path) in enumerate(media_assets):
            try:
                # Upload the sample image to B2
                s3_client.put_object(
                    Bucket=b2_bucket_name,
                    Key=file_path,  # Use the file_path as the object key
                    Body=sample_image_content,
                    ContentType='image/png',
                    Metadata={
                        'asset-id': asset_id,
                        'original-filename': filename,
                        'uploaded-at': datetime.now().isoformat()
                    }
                )
                print(f"✓ Uploaded {file_path} ({idx+1}/{len(media_assets)})")
                success_count += 1
            except Exception as e:
                print(f"✗ Error uploading {file_path}: {e}")
                error_count += 1
                
                # Try to create the folder structure if it doesn't exist
                try:
                    if '/' in file_path:
                        folder_path = '/'.join(file_path.split('/')[:-1]) + '/'
                        s3_client.put_object(
                            Bucket=b2_bucket_name,
                            Key=folder_path,
                            Body=b'',
                            ContentType='application/x-directory'
                        )
                        print(f"  Created folder structure: {folder_path}")
                        
                        # Retry upload
                        s3_client.put_object(
                            Bucket=b2_bucket_name,
                            Key=file_path,
                            Body=sample_image_content,
                            ContentType='image/png',
                            Metadata={
                                'asset-id': asset_id,
                                'original-filename': filename,
                                'uploaded-at': datetime.now().isoformat()
                            }
                        )
                        print(f"  ✓ Retried and uploaded {file_path}")
                        success_count += 1
                        error_count -= 1
                except Exception as retry_error:
                    print(f"  Failed again: {retry_error}")
        
        cursor.close()
        conn.close()
        
        print(f"\nB2 seeding completed!")
        print(f"Successfully uploaded: {success_count} files")
        print(f"Failed uploads: {error_count} files")
        
    except Exception as e:
        print(f"Error during B2 seeding: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    seed_b2_storage()