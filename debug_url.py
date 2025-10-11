from urllib.parse import urlparse
import os

# Test JDBC URL format
db_url = 'jdbc:postgresql://neondb_owner:npg_QTE70VJgbcdp@ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

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
    
print('Hostname:', result.hostname)
print('Username:', result.username)
print('Password:', result.password)
print('Path:', result.path)
print('Port:', result.port)
print('Query params:', query_params)