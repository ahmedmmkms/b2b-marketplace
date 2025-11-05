#!/usr/bin/env python3
"""Shared helpers and state for API integration tests."""

import json
import os
import random
import re
import time
from functools import lru_cache
from pathlib import Path
from typing import Dict, Optional, Tuple

import requests

# Global authentication state reused across test modules
auth_token: Optional[str] = None
ROLE_TOKENS: Dict[str, str] = {}
TEST_USERS_PATH = Path(__file__).resolve().parent / "test-users.md"


@lru_cache(maxsize=1)
def load_test_users() -> Dict[str, Dict[str, str]]:
    """Load test user definitions from test/test-users.md."""
    if not TEST_USERS_PATH.exists():
        print(f"[FAIL] Test users file not found at {TEST_USERS_PATH}")
        return {}

    content = TEST_USERS_PATH.read_text(encoding="utf-8")
    match = re.search(r"```json\s*(\{.*?\})\s*```", content, re.DOTALL)
    if not match:
        print("[FAIL] Could not locate JSON credentials block in test-users.md")
        return {}

    try:
        return json.loads(match.group(1))
    except json.JSONDecodeError as exc:
        print(f"[FAIL] Unable to parse credentials JSON from test-users.md: {exc}")
        return {}


def get_user_credentials(role: str) -> Optional[Tuple[str, str]]:
    """Fetch email/password tuple for a role defined in test-users.md."""
    users = load_test_users()
    user_info = users.get(role)
    if not user_info:
        print(f"[FAIL] No credentials defined for role '{role}' in test-users.md")
        return None
    email = user_info.get("email")
    password = user_info.get("password")
    if not email or not password:
        print(f"[FAIL] Incomplete credentials for role '{role}' in test-users.md")
        return None
    return email, password


def get_api_base_url() -> str:
    """Get the API base URL from environment variable or use default."""
    return os.environ.get("API_URL_BASE", "http://localhost:8080")


def login_with_credentials(
    email: str,
    password: str,
    context: str = "user",
    cache_key: Optional[str] = None,
) -> bool:
    """Authenticate with explicit credentials and optionally cache the token."""
    global auth_token

    api_base = get_api_base_url()
    login_url = f"{api_base}/auth/login"
    login_data = {"email": email, "password": password}

    print(f"Authenticating {context}: POST {login_url}")
    try:
        login_response = requests.post(login_url, json=login_data, timeout=30)
        print(f"Status Code: {login_response.status_code}")
        print(f"Response: {login_response.text}")

        if login_response.status_code == 200:
            try:
                login_json = login_response.json()
                token = login_json.get("token")
                if not token:
                    print("[FAIL] Authentication failed: Login successful but no token returned")
                    return False
                auth_token = token
                if cache_key:
                    ROLE_TOKENS[cache_key] = token
                print("Login successful, authentication token stored globally")
                return True
            except ValueError:
                print("[FAIL] Authentication failed: Login response is not valid JSON")
                return False
        else:
            print(f"[FAIL] Authentication failed: Login failed with status code {login_response.status_code}")
            return False

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] Authentication failed: Request error - {exc}")
        return False


def authenticate_user(role: str = "admin") -> bool:
    """Authenticate using role-based credentials defined in test-users.md."""
    credentials = get_user_credentials(role)
    if not credentials:
        if role == "buyer":
            return provision_fallback_buyer_user()
        return False
    email, password = credentials
    if login_with_credentials(email, password, context=f"{role} user", cache_key=role):
        return True

    if role == "buyer":
        print("[INFO] Buyer login failed with configured credentials; attempting fallback provisioning")
        return provision_fallback_buyer_user()

    return False


def use_role(role: str) -> bool:
    """Ensure the global auth_token is set for the requested role."""
    global auth_token

    cached_token = ROLE_TOKENS.get(role)
    if cached_token:
        auth_token = cached_token
        return True
    return authenticate_user(role)


def get_auth_headers(role: str, include_content_type: bool = True) -> Optional[Dict[str, str]]:
    """Return authorization headers for the specified role."""
    if not use_role(role):
        return None

    headers: Dict[str, str] = {}
    if include_content_type:
        headers["Content-Type"] = "application/json"
    headers["Authorization"] = f"Bearer {auth_token}"
    return headers


def generate_valid_ulid() -> str:
    """Generate a valid ULID format string that doesn't exist in the database."""
    allowed_chars = "0123456789ABCDEFGHJKMNPRTVWXYZ"
    timestamp_part = "".join(random.choice(allowed_chars) for _ in range(10))
    random_part = "".join(random.choice(allowed_chars) for _ in range(16))
    return timestamp_part + random_part


def register_user_with_vendor(
    vendor_id: str,
    email: str = "vendor1@vendor.com",
    password: str = "112233445566",
    full_name: str = "Vendor User 1",
) -> bool:
    """Register a new user associated with the specified organization (vendor)."""
    global auth_token

    api_base = get_api_base_url()
    register_url = f"{api_base}/auth/register"
    register_data = {
        "email": email,
        "password": password,
        "fullName": full_name,
        "orgId": vendor_id,
    }

    print(f"Registering user: POST {register_url}")
    print(f"Payload: {register_data}")

    try:
        response = requests.post(register_url, json=register_data, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")

        if response.status_code in (200, 201):
            try:
                json_response = response.json()
                token = json_response.get("token")
                if token:
                    auth_token = token
                    print("[PASS] User registration successful, token stored globally")
                    return True
                print("[FAIL] Registration succeeded but no token returned")
                return False
            except ValueError:
                print("[FAIL] Registration failed: Response is not valid JSON")
                return False
        print(f"[FAIL] Registration failed: Expected status code 200 or 201, got {response.status_code}")
        return False

    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] Registration failed: Request error - {exc}")
        return False


def login_user(email: str = "vendor1@vendor.com", password: str = "112233445566") -> bool:
    """Login user with provided credentials."""
    return login_with_credentials(email, password, context="vendor user")


def provision_fallback_buyer_user() -> bool:
    """Provision a fallback buyer (vendor-role) user when static buyer credentials fail."""
    global auth_token

    api_base = get_api_base_url()

    admin_headers = get_auth_headers("admin")
    if admin_headers is None:
        print("[FAIL] Fallback buyer provisioning failed: could not authenticate admin to seed organization")
        return False

    fallback_vendor_name = "Fallback Buyer Org"
    vendors_url = f"{api_base}/vendors"

    try:
        vendor_response = requests.post(
            vendors_url, json={"name": fallback_vendor_name}, timeout=30, headers=admin_headers
        )
        if vendor_response.status_code != 201:
            print(f"[FAIL] Fallback buyer provisioning failed: vendor creation returned {vendor_response.status_code}")
            return False

        vendor_id = vendor_response.json().get("id")
        if not vendor_id:
            print("[FAIL] Fallback buyer provisioning failed: vendor response missing 'id'")
            return False
    except requests.exceptions.RequestException as exc:
        print(f"[FAIL] Fallback buyer provisioning failed: vendor creation error - {exc}")
        return False

    previous_token = auth_token
    unique_email = f"auto_buyer_{int(time.time())}@example.com"

    if register_user_with_vendor(
        vendor_id,
        email=unique_email,
        password="112233445566",
        full_name="Fallback Buyer User",
    ):
        ROLE_TOKENS["buyer"] = auth_token  # type: ignore[index]
        print("[INFO] Fallback buyer user registered and token cached")
        return True

    auth_token = previous_token
    print("[FAIL] Fallback buyer provisioning failed: registration did not succeed")
    return False


def logout_user() -> bool:
    """Logout user by clearing the auth token."""
    global auth_token
    print("Logging out user")
    auth_token = None
    print("User logged out, authentication token cleared")
    return True
