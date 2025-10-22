import redis

# New Redis credentials
REDIS_URL = "redis://default:xMCD8IbVf3VNrkGOcxrSWxPnIup2HyG3@redis-14127.c56.east-us.azure.redns.redis-cloud.com:14127"

print(f"Attempting to connect to Redis: {REDIS_URL}")

try:
    # Parse the Redis URL to extract components
    from urllib.parse import urlparse
    parsed = urlparse(REDIS_URL)
    
    host = parsed.hostname
    port = parsed.port
    password = parsed.password
    username = parsed.username
    
    print(f"Connecting to Redis host: {host}:{port}")
    
    # Create Redis connection using individual components
    redis_client = redis.Redis(
        host=host,
        port=port,
        password=password,
        username=username,
        decode_responses=True,
        socket_connect_timeout=10,
        socket_timeout=10,
        health_check_interval=30
    )
    
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
    
    # Close connection
    redis_client.close()
    
except Exception as e:
    print(f"Error connecting to Redis: {str(e)}")
    import traceback
    traceback.print_exc()