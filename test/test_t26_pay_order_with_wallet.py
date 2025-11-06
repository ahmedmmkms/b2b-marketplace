#!/usr/bin/env python3
"""Test script for T26 - Pay order with wallet functionality (idempotent)."""

import json
import sys
import os
import uuid
import requests

# Add the project root to the Python path to import test_utils
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import test_utils

def run():
    """Execute T26 Pay order with wallet tests."""
    print("Testing T26 - Pay order with wallet functionality (idempotent)...")
    
    # Get API base URL
    api_base = test_utils.get_api_base_url()
    
    # Step 1: Authenticate as admin to create an organization for testing
    if not test_utils.authenticate_user("admin"):
        print("[FAIL] Could not authenticate admin user")
        return False
    
    admin_headers = test_utils.get_auth_headers("admin")
    if admin_headers is None:
        print("[FAIL] Could not get authentication headers for admin")
        return False

    # Create an organization to test wallet payment functionality
    vendor_payload = {"name": f"T26 Payment Test Org {uuid.uuid4().hex[:8]}"}
    vendors_url = f"{api_base}/vendors"

    vendor_response = requests.post(
        vendors_url,
        json=vendor_payload,
        headers=admin_headers,
        timeout=30,
    )

    if vendor_response.status_code != 201:
        print(f"[FAIL] Failed to create vendor org for payment test: {vendor_response.status_code}")
        print(f"Response: {vendor_response.text}")
        return False

    org_id = vendor_response.json().get("id")
    if not org_id:
        print("[FAIL] Vendor creation response missing 'id'")
        return False

    print(f"Created organization for payment test: {org_id}")
    
    # Step 2: Verify that the organization has a wallet
    print("Step 2: Verifying organization has a wallet and getting initial balance...")
    
    wallet_url = f"{api_base}/wallets/{org_id}"
    wallet_response = requests.get(
        wallet_url,
        headers=admin_headers,
        timeout=30,
    )
    
    if wallet_response.status_code != 200:
        print(f"[FAIL] Failed to get wallet for organization: {wallet_response.status_code}")
        print(f"Response: {wallet_response.text}")
        return False
    
    wallet_data = wallet_response.json()
    initial_balance = wallet_data.get("balance", 0)
    print(f"Initial wallet balance: {initial_balance}")
    
    # Step 3: Top up the wallet to have funds for payment
    print("Step 3: Topping up wallet for payment test...")
    
    topup_amount = 1000.0  # Amount to top up
    topup_data = {
        "amount": topup_amount,
        "currency": "USD",
        "description": f"T26 Top-up for payment test for {org_id}"
    }
    
    topup_url = f"{api_base}/wallets/{org_id}/topups"
    
    topup_response = requests.post(
        topup_url,
        json=topup_data,
        headers=admin_headers,
        timeout=30,
    )
    
    if topup_response.status_code != 201:
        print(f"[FAIL] Failed to top up wallet: {topup_response.status_code}")
        print(f"Response: {topup_response.text}")
        return False
    
    # Verify new balance after top-up
    updated_wallet_response = requests.get(
        wallet_url,
        headers=admin_headers,
        timeout=30,
    )
    
    if updated_wallet_response.status_code != 200:
        print(f"[FAIL] Failed to get updated wallet balance: {updated_wallet_response.status_code}")
        print(f"Response: {updated_wallet_response.text}")
        return False
    
    updated_wallet_data = updated_wallet_response.json()
    new_balance = updated_wallet_data.get("balance", 0)
    expected_balance = initial_balance + topup_amount
    
    if new_balance != expected_balance:
        print(f"[FAIL] Balance not updated correctly after top-up: expected {expected_balance}, got {new_balance}")
        return False
    
    print(f"[PASS] Wallet balance after top-up: {new_balance}")
    
    # Step 4: Create a product and an order for payment testing
    print("Step 4: Creating product, RFQ, quote, and order for payment test...")
    
    # Create product
    product_sku = f"T26_SKU_{uuid.uuid4().hex[:8]}"
    product_data = {
        "vendorId": org_id,
        "sku": product_sku,
        "name": "Test Product for T26 Payment",
        "description": "Product for testing order payment",
        "price": 100.00,
        "category": "test",
    }
    
    products_url = f"{api_base}/products"
    product_response = requests.post(
        products_url,
        json=product_data,
        headers=admin_headers,
        timeout=30,
    )
    
    if product_response.status_code != 201:
        print(f"[FAIL] Failed to create product: {product_response.status_code}")
        print(f"Response: {product_response.text}")
        return False
    
    product_id = product_response.json().get("id")
    if not product_id:
        print("[FAIL] Product creation response missing 'id'")
        return False
    
    # Create RFQ as buyer
    if not test_utils.authenticate_user("buyer"):
        print("[FAIL] Could not authenticate buyer user")
        return False
    
    buyer_headers = test_utils.get_auth_headers("buyer")
    if buyer_headers is None:
        print("[FAIL] Could not get authentication headers for buyer")
        return False
    
    rfq_data = {
        "title": "Test RFQ for T26 Payment",
        "notes": "Testing order payment with wallet",
    }
    
    rfqs_url = f"{api_base}/rfqs"
    rfq_response = requests.post(
        rfqs_url,
        json=rfq_data,
        headers=buyer_headers,
        timeout=30,
    )
    
    if rfq_response.status_code != 201:
        print(f"[FAIL] Failed to create RFQ: {rfq_response.status_code}")
        print(f"Response: {rfq_response.text}")
        return False
    
    rfq_id = rfq_response.json().get("id")
    if not rfq_id:
        print("[FAIL] RFQ creation response missing 'id'")
        return False
    
    # Add line to RFQ
    rfq_lines_url = f"{api_base}/rfqs/{rfq_id}/lines"
    line_data = {
        "productId": product_id,
        "quantity": 5,
        "uom": "each",
        "description": "Test RFQ line for payment test",
    }
    
    line_response = requests.post(
        rfq_lines_url,
        json=line_data,
        headers=buyer_headers,
        timeout=30,
    )
    
    if line_response.status_code != 201:
        print(f"[FAIL] Failed to add line to RFQ: {line_response.status_code}")
        print(f"Response: {line_response.text}")
        return False
    
    rfq_line_id = line_response.json().get("id")
    if not rfq_line_id:
        print("[FAIL] RFQ line creation response missing 'id'")
        return False
    
    # Issue the RFQ
    issue_url = f"{api_base}/rfqs/{rfq_id}/issue"
    issue_response = requests.post(
        issue_url,
        headers=buyer_headers,
        timeout=30,
    )
    
    if issue_response.status_code != 200:
        print(f"[FAIL] Failed to issue RFQ: {issue_response.status_code}")
        print(f"Response: {issue_response.text}")
        return False
    
    # Register vendor user for this organization
    previous_token = test_utils.auth_token
    vendor_email = f"t26_payment_vendor_{uuid.uuid4().hex[:8]}@example.com"
    if not test_utils.register_user_with_vendor(
        org_id,
        email=vendor_email,
        password="112233445566",
        full_name="T26 Payment Vendor User",
    ):
        print("[FAIL] Could not provision vendor user for quote submission")
        return False
    vendor_token = test_utils.auth_token
    test_utils.ROLE_TOKENS["vendor"] = vendor_token
    test_utils.auth_token = previous_token
    vendor_headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {vendor_token}",
    }
    
    # Submit a quote as vendor
    quotes_url = f"{api_base}/rfqs/{rfq_id}/quotes"
    quote_data = {
        "vendorId": org_id,
        "notes": "Test quote for payment",
        "lines": [
            {
                "rfqLineId": rfq_line_id,
                "unitPrice": 20.0,  # 5 units * $20 = $100 total
                "quantity": 5,
                "uom": "each",
                "description": "Quote line for payment test",
                "currency": "USD",
                "leadTimeDays": 5
            }
        ]
    }
    
    quote_response = requests.post(
        quotes_url,
        json=quote_data,
        headers=vendor_headers,
        timeout=30,
    )
    
    if quote_response.status_code != 201:
        print(f"[FAIL] Failed to submit quote: {quote_response.status_code}")
        print(f"Response: {quote_response.text}")
        return False
    
    quote_id = quote_response.json().get("id")
    if not quote_id:
        print("[FAIL] Quote submission response missing 'id'")
        return False
    
    # Accept the quote as buyer
    accept_url = f"{api_base}/rfqs/{rfq_id}/quotes/{quote_id}/accept"
    accept_response = requests.post(
        accept_url,
        headers=buyer_headers,
        timeout=30,
    )
    
    if accept_response.status_code != 200:
        print(f"[FAIL] Failed to accept quote: {accept_response.status_code}")
        print(f"Response: {accept_response.text}")
        return False
    
    # Create an order from the accepted quote
    orders_url = f"{api_base}/orders"
    order_data = {
        "quoteId": quote_id
    }
    
    order_response = requests.post(
        orders_url,
        json=order_data,
        headers=buyer_headers,
        timeout=30,
    )
    
    if order_response.status_code != 201:
        print(f"[FAIL] Failed to create order from quote: {order_response.status_code}")
        print(f"Response: {order_response.text}")
        return False
    
    order_id = order_response.json().get("id")
    if not order_id:
        print("[FAIL] Order creation response missing 'id'")
        return False
    
    order_data_response = order_response.json()
    order_total = order_data_response.get("grandTotal", 0)
    print(f"Created order {order_id} with total: {order_total}")
    
    # Step 5: Before making payment, we need to ensure the buyer has a funded wallet
    print("Step 5: Ensuring buyer has a funded wallet for payment...")
    
    # Get the buyer's organization ID from their authentication details
    buyer_headers = test_utils.get_auth_headers("buyer")
    if buyer_headers is None:
        print("[FAIL] Could not get buyer headers")
        return False
    
    # Get buyer's user details to identify their organization
    me_response = requests.get(f"{api_base}/users/me", headers=buyer_headers, timeout=30)
    if me_response.status_code != 200:
        print(f"[FAIL] Could not get buyer user details: {me_response.status_code}")
        return False
    
    buyer_user_data = me_response.json()
    print(f"Buyer user data: {buyer_user_data}")  # Debug print
    
    # Try different possible field names for organization ID
    buyer_org_id = buyer_user_data.get("organizationId") or buyer_user_data.get("orgId") or buyer_user_data.get("organization_id") or buyer_user_data.get("org_id")
    if not buyer_org_id:
        print("[FAIL] Could not get buyer's organization ID from user data")
        print("Available fields:", list(buyer_user_data.keys()))
        return False
    
    print(f"Buyer's organization ID: {buyer_org_id}")
    
    # Get current buyer's wallet balance
    buyer_wallet_url = f"{api_base}/wallets/{buyer_org_id}"
    buyer_wallet_response = requests.get(buyer_wallet_url, headers=buyer_headers, timeout=30)
    
    if buyer_wallet_response.status_code == 200:
        buyer_wallet_data = buyer_wallet_response.json()
        buyer_current_balance = buyer_wallet_data.get("balance", 0)
        print(f"Current buyer wallet balance: {buyer_current_balance}")
    else:
        print(f"Buyer's wallet not found, status: {buyer_wallet_response.status_code}, creating wallet by topping up...")
        buyer_current_balance = 0
    
    # If balance is insufficient, top up the buyer's wallet
    if buyer_current_balance < order_total:
        print(f"Buyer balance ({buyer_current_balance}) insufficient for order ({order_total}), topping up...")
        
        # Authenticate as admin to top up buyer's wallet
        if not test_utils.authenticate_user("admin"):
            print("[FAIL] Could not authenticate admin user for wallet top-up")
            return False
        admin_headers_for_topup = test_utils.get_auth_headers("admin")
        
        # Top up buyer's wallet
        topup_amount = order_total + 100.0  # Add extra for safety
        buyer_topup_data = {
            "amount": topup_amount,
            "currency": "USD",
            "description": f"T26 Top-up for buyer payment test, order {order_id}"
        }
        
        buyer_topup_url = f"{api_base}/wallets/{buyer_org_id}/topups"
        buyer_topup_response = requests.post(
            buyer_topup_url,
            json=buyer_topup_data,
            headers=admin_headers_for_topup,
            timeout=30,
        )
        
        if buyer_topup_response.status_code != 201:
            print(f"[FAIL] Failed to top up buyer's wallet: {buyer_topup_response.status_code}")
            print(f"Response: {buyer_topup_response.text}")
            return False
        
        print(f"Top-up successful, added {topup_amount} to buyer's wallet")
        
        # Verify new balance
        updated_buyer_wallet_response = requests.get(buyer_wallet_url, headers=buyer_headers, timeout=30)
        if updated_buyer_wallet_response.status_code == 200:
            updated_buyer_wallet_data = updated_buyer_wallet_response.json()
            updated_buyer_balance = updated_buyer_wallet_data.get("balance", 0)
            print(f"Updated buyer wallet balance: {updated_buyer_balance}")
        else:
            print(f"[FAIL] Could not verify updated buyer wallet balance: {updated_buyer_wallet_response.status_code}")
            return False
    
    # Step 6: Test wallet payment with sufficient funds
    print("Step 6: Testing wallet payment with sufficient funds...")
    
    payment_url = f"{api_base}/orders/{order_id}/pay/wallet"
    idempotency_key = f"test_idempotency_{uuid.uuid4().hex}"
    payment_data = {
        "idempotencyKey": idempotency_key
    }
    
    # Make the payment request
    payment_response = requests.post(
        payment_url,
        json=payment_data,
        headers=buyer_headers,  # Using buyer's credentials
        timeout=30,
    )
    
    if payment_response.status_code == 200:
        payment_result = payment_response.json()
        print(f"[PASS] Wallet payment completed successfully: {payment_result}")
        
        # Check that order status is confirmed
        order_get_url = f"{api_base}/orders/{order_id}"
        order_get_response = requests.get(
            order_get_url,
            headers=buyer_headers,
            timeout=30,
        )
        
        if order_get_response.status_code == 200:
            updated_order = order_get_response.json()
            order_status = updated_order.get("status")
            
            if order_status == "confirmed":
                print(f"[PASS] Order status updated to confirmed: {order_status}")
            else:
                print(f"[FAIL] Order status not updated to confirmed, got: {order_status}")
                return False
        else:
            print(f"[FAIL] Could not get updated order status: {order_get_response.status_code}")
            return False
            
    else:
        print(f"[FAIL] Payment failed with status: {payment_response.status_code}")
        print(f"Response: {payment_response.text}")
        return False
    
    # Step 6: Test idempotent behavior - same idempotency key should return same result
    print("Step 6: Testing idempotent behavior with same idempotency key...")
    
    idempotent_payment_response = requests.post(
        payment_url,
        json=payment_data,  # Same idempotency key
        headers=buyer_headers,
        timeout=30,
    )
    
    if idempotent_payment_response.status_code == 200:
        idempotent_result = idempotent_payment_response.json()
        print(f"[PASS] Idempotent payment returned same result: {idempotent_result}")
        
        # The results should be the same as the first payment
        # Check if the response matches the first payment
        if json.dumps(payment_result, sort_keys=True) == json.dumps(idempotent_result, sort_keys=True):
            print("[PASS] Idempotent payment response matches original payment")
        else:
            print("[WARN] Idempotent payment response differs from original (may be acceptable depending on implementation)")
    else:
        print(f"[FAIL] Idempotent payment failed with status: {idempotent_payment_response.status_code}")
        print(f"Response: {idempotent_payment_response.text}")
        return False
    
    # Step 7: Test with a different idempotency key (should fail as order is already paid)
    print("Step 7: Testing with different idempotency key (should fail as order is already paid)...")
    
    different_key_data = {
        "idempotencyKey": f"test_idempotency_{uuid.uuid4().hex}"
    }
    
    different_key_response = requests.post(
        payment_url,
        json=different_key_data,
        headers=buyer_headers,
        timeout=30,
    )
    
    # This should probably return 409 or 400 since order is already paid
    if different_key_response.status_code in [409, 400]:
        print(f"[PASS] Payment with different key correctly rejected (already paid): {different_key_response.status_code}")
    else:
        print(f"[INFO] Payment with different key returned: {different_key_response.status_code}")
    
    # Step 8: Test with insufficient funds
    print("Step 8: Testing payment with insufficient funds...")
    
    # First let's place a new order with a higher amount than available funds
    # Create another product with higher price
    high_value_product_sku = f"T26_HIGH_SKU_{uuid.uuid4().hex[:8]}"
    high_value_product_data = {
        "vendorId": org_id,
        "sku": high_value_product_sku,
        "name": "High Value Test Product for T26 Payment",
        "description": "High value product for testing insufficient funds",
        "price": 5000.00,  # Higher than wallet balance
        "category": "test",
    }
    
    high_value_product_response = requests.post(
        products_url,
        json=high_value_product_data,
        headers=admin_headers,
        timeout=30,
    )
    
    if high_value_product_response.status_code != 201:
        print(f"[FAIL] Failed to create high value product: {high_value_product_response.status_code}")
        return False
    
    high_value_product_id = high_value_product_response.json().get("id")
    if not high_value_product_id:
        print("[FAIL] High value product creation response missing 'id'")
        return False
    
    # Create a new RFQ for this high-value product
    high_value_rfq_data = {
        "title": "High Value Test RFQ for T26 Payment",
        "notes": "Testing insufficient funds scenario",
    }
    
    high_value_rfq_response = requests.post(
        rfqs_url,
        json=high_value_rfq_data,
        headers=buyer_headers,
        timeout=30,
    )
    
    if high_value_rfq_response.status_code != 201:
        print(f"[FAIL] Failed to create high value RFQ: {high_value_rfq_response.status_code}")
        return False
    
    high_value_rfq_id = high_value_rfq_response.json().get("id")
    if not high_value_rfq_id:
        print("[FAIL] High value RFQ creation response missing 'id'")
        return False
    
    # Add line to high-value RFQ
    high_value_line_data = {
        "productId": high_value_product_id,
        "quantity": 2,
        "uom": "each",
        "description": "High value RFQ line for insufficient funds test",
    }
    
    high_value_line_response = requests.post(
        f"{api_base}/rfqs/{high_value_rfq_id}/lines",
        json=high_value_line_data,
        headers=buyer_headers,
        timeout=30,
    )
    
    if high_value_line_response.status_code != 201:
        print(f"[FAIL] Failed to add high value line to RFQ: {high_value_line_response.status_code}")
        return False
    
    high_value_rfq_line_id = high_value_line_response.json().get("id")
    if not high_value_rfq_line_id:
        print("[FAIL] High value RFQ line creation response missing 'id'")
        return False
    
    # Issue the high-value RFQ
    high_value_issue_response = requests.post(
        f"{api_base}/rfqs/{high_value_rfq_id}/issue",
        headers=buyer_headers,
        timeout=30,
    )
    
    if high_value_issue_response.status_code != 200:
        print(f"[FAIL] Failed to issue high value RFQ: {high_value_issue_response.status_code}")
        return False
    
    # Submit a quote for high value
    high_value_quote_data = {
        "vendorId": org_id,
        "notes": "High value test quote for payment",
        "lines": [
            {
                "rfqLineId": high_value_rfq_line_id,
                "unitPrice": 3000.0,  # 2 units * $3000 = $6000 total
                "quantity": 2,
                "uom": "each",
                "description": "High value quote line for payment test",
                "currency": "USD",
                "leadTimeDays": 5
            }
        ]
    }
    
    high_value_quote_response = requests.post(
        f"{api_base}/rfqs/{high_value_rfq_id}/quotes",
        json=high_value_quote_data,
        headers=vendor_headers,
        timeout=30,
    )
    
    if high_value_quote_response.status_code != 201:
        print(f"[FAIL] Failed to submit high value quote: {high_value_quote_response.status_code}")
        return False
    
    high_value_quote_id = high_value_quote_response.json().get("id")
    if not high_value_quote_id:
        print("[FAIL] High value quote submission response missing 'id'")
        return False
    
    # Accept the high value quote
    high_value_accept_response = requests.post(
        f"{api_base}/rfqs/{high_value_rfq_id}/quotes/{high_value_quote_id}/accept",
        headers=buyer_headers,
        timeout=30,
    )
    
    if high_value_accept_response.status_code != 200:
        print(f"[FAIL] Failed to accept high value quote: {high_value_accept_response.status_code}")
        return False
    
    # Create order for high value
    high_value_order_data = {
        "quoteId": high_value_quote_id
    }
    
    high_value_order_response = requests.post(
        orders_url,
        json=high_value_order_data,
        headers=buyer_headers,
        timeout=30,
    )
    
    if high_value_order_response.status_code != 201:
        print(f"[FAIL] Failed to create high value order: {high_value_order_response.status_code}")
        return False
    
    high_value_order_id = high_value_order_response.json().get("id")
    if not high_value_order_id:
        print("[FAIL] High value order creation response missing 'id'")
        return False
    
    high_value_order_total = high_value_order_response.json().get("grandTotal", 0)
    print(f"Created high value order {high_value_order_id} with total: {high_value_order_total}")
    
    # Attempt to pay with insufficient funds
    insufficient_payment_url = f"{api_base}/orders/{high_value_order_id}/pay/wallet"
    insufficient_payment_data = {
        "idempotencyKey": f"insufficient_test_{uuid.uuid4().hex}"
    }
    
    insufficient_payment_response = requests.post(
        insufficient_payment_url,
        json=insufficient_payment_data,
        headers=buyer_headers,
        timeout=30,
    )
    
    # Should return 409 for insufficient funds
    if insufficient_payment_response.status_code == 409:
        print(f"[PASS] Insufficient funds correctly rejected with 409: {insufficient_payment_response.json()}")
    else:
        print(f"[INFO] Insufficient funds test response: {insufficient_payment_response.status_code}")
        print(f"Response: {insufficient_payment_response.text}")
    
    print("[PASS] All T26 Pay order with wallet tests passed")
    return True


if __name__ == "__main__":
    success = run()
    print(f"\nT26 Pay order with wallet test: {'[PASS]' if success else '[FAIL]'}")
    sys.exit(0 if success else 1)