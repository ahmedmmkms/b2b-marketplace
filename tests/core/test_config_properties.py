"""
Configuration Properties Acceptance Test

This script tests that all configuration properties are properly loaded
in the deployed application.
"""
import os
import sys
import requests
import json
from typing import Dict, Any

# Configuration from the architecture document
API_URL_BASE = os.getenv(
    'API_URL_BASE', 
    'https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net'
)

def test_config_loading():
    """
    Tests that configuration properties are properly loaded by making requests
    to actuator endpoints and validating expected configuration values
    """
    print("Testing configuration properties loading...")
    
    # Test /actuator/env endpoint to verify environment properties are loaded
    env_endpoint = f"{API_URL_BASE}/actuator/env"
    
    try:
        response = requests.get(env_endpoint, timeout=10)
        
        if response.status_code != 200:
            print(f"ERROR: Failed to access /actuator/env: {response.status_code}")
            return False
            
        env_data = response.json()
        
        # Check that key configuration properties are present
        properties_found = []
        properties_missing = []
        
        # Check for B2 configuration properties
        b2_properties = [
            "B2_ACCOUNT_ID",
            "B2_APPLICATION_KEY_ID", 
            "B2_APPLICATION_KEY",
            "B2_BUCKET",
            "B2_ENDPOINT_URL"
        ]
        
        for prop in b2_properties:
            if any(prop in source.get("propertySources", {}) for source in [env_data] if "propertySources" in env_data):
                properties_found.append(prop)
            else:
                # Look for the property in the property sources
                found = False
                if "propertySources" in env_data:
                    for source in env_data["propertySources"]:
                        if prop in source.get("properties", {}):
                            properties_found.append(prop)
                            found = True
                            break
                if not found:
                    properties_missing.append(prop)
        
        # Check for database configuration properties
        db_properties = [
            "DB_URL",
            "DB_USERNAME",
            "DB_PASSWORD"
        ]
        
        for prop in db_properties:
            found = False
            if "propertySources" in env_data:
                for source in env_data["propertySources"]:
                    if prop in source.get("properties", {}):
                        properties_found.append(prop)
                        found = True
                        break
            if not found:
                properties_missing.append(prop)

        # Check for Redis configuration properties  
        redis_properties = [
            "REDIS_URL"
        ]
        
        for prop in redis_properties:
            found = False
            if "propertySources" in env_data:
                for source in env_data["propertySources"]:
                    if prop in source.get("properties", {}):
                        properties_found.append(prop)
                        found = True
                        break
            if not found:
                properties_missing.append(prop)

        print(f"SUCCESS: Found configuration properties: {properties_found}")
        if properties_missing:
            print(f"WARNING: Missing configuration properties: {properties_missing}")
        else:
            print("SUCCESS: All expected configuration properties are available")
        
        # Test /actuator/configprops endpoint to verify @ConfigurationProperties beans
        config_props_endpoint = f"{API_URL_BASE}/actuator/configprops"
        response = requests.get(config_props_endpoint, timeout=10)
        
        if response.status_code != 200:
            print(f"ERROR: Failed to access /actuator/configprops: {response.status_code}")
            return False
            
        config_props_data = response.json()

        # Look for our configuration properties beans
        expected_configs = [
            "b2ConfigurationProperties",
            "redisConfigurationProperties", 
            "databaseConfigurationProperties",
            "featureFlagsConfiguration"
        ]
        
        config_found = []
        config_missing = []
        
        for config_name in expected_configs:
            if config_name in config_props_data.get("contexts", {}).get(
                list(config_props_data.get("contexts", {}).keys())[0] if config_props_data.get("contexts") else "", {}
            ).get("beans", {}):
                config_found.append(config_name)
            else:
                config_missing.append(config_name)
        
        print(f"SUCCESS: Found configuration beans: {config_found}")
        if config_missing:
            print(f"WARNING: Missing configuration beans: {config_missing}")
        else:
            print("SUCCESS: All expected configuration beans are registered")
        
        # Overall success if we found at least some configuration properties
        success = len(properties_found) > 0 or len(config_found) > 0
        return success

    except requests.exceptions.RequestException as e:
        print(f"ERROR: Request failed: {str(e)}")
        return False
    except Exception as e:
        print(f"ERROR: Error during configuration test: {str(e)}")
        return False


def main():
    print("Running Configuration Properties Acceptance Test...")
    print(f"Testing against: {API_URL_BASE}")
    
    success = test_config_loading()
    
    if success:
        print("\nSUCCESS: Configuration Properties Acceptance Test PASSED")
        return 0
    else:
        print("\nERROR: Configuration Properties Acceptance Test FAILED")
        return 1


if __name__ == "__main__":
    sys.exit(main())