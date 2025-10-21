import redis

# Redis credentials
REDIS_URL = "redis://default:AUUnAAIncDI1ZWRkMmFkMDE2ZjA0MmYxYmEyNWVlYzM1Y2ExODMxNHAyMTc3MDM @adjusted-sunbird-17703.upstash.io:6379"

print(f"Attempting to connect to Redis: {REDIS_URL}")

try:
    # Create Redis connection
    redis_client = redis.from_url(REDIS_URL, decode_responses=True, socket_connect_timeout=5)
    
    # Test connection with a simple ping
    response = redis_client.ping()
    print(f"Redis connection successful! Ping response: {response}")
    
    # Test setting and getting a value
    test_key = "p4_test_connection"
    test_value = "Connected successfully at " + str(__import__('datetime').datetime.now())
    
    redis_client.set(test_key, test_value)
    retrieved_value = redis_client.get(test_key)
    
    print(f"Test key-value set and retrieved: {test_key} = {retrieved_value}")
    
    # Clean up test key
    redis_client.delete(test_key)
    
    print("Redis connection and basic operations verified successfully!")
    
except Exception as e:
    print(f"Error connecting to Redis: {str(e)}")