(base) D:\Projects\b2b-marketplace>python test/test_t26_pay_order_with_wallet.py
Testing T26 - Pay order with wallet functionality (idempotent)...
Authenticating admin user: POST http://localhost:8080/auth/login
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3NjI0MTUxNzAsImV4cCI6MTc2MjUwMTU3MH0.C-plJlcT_SlOL0--3Ugdp7SOjfhNWpUGHEgAqlPRSTc","type":"Bearer","id":"2DYRC8AVYQ2M53ETFSQE55DZ9K","email":"admin@admin.com","fullName":"admin","role":"vendor"}
Login successful, authentication token stored globally
Created organization for payment test: 01K9C22N6V9AQVEE1875NQ190H
Step 2: Verifying organization has a wallet and getting initial balance...
Initial wallet balance: 0
Step 3: Topping up wallet for payment test...
[PASS] Wallet balance after top-up: 1000.0
Step 4: Creating product, RFQ, quote, and order for payment test...
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-06T07:46:15.903+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[INFO] Buyer login failed with configured credentials; attempting fallback provisioning
Registering user: POST http://localhost:8080/auth/register
Payload: {'email': 'auto_buyer_1762415176@example.com', 'password': '112233445566', 'fullName': 'Fallback Buyer User', 'orgId': '01K9C22TCDTDJP7H1P5DYTB7EB'}
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhdXRvX2J1eWVyXzE3NjI0MTUxNzZAZXhhbXBsZS5jb20iLCJpYXQiOjE3NjI0MTUxNzcsImV4cCI6MTc2MjUwMTU3N30.WfVGnuJGyIzNkLg4fw7b6SBfKUqWTHwdSMhy-DOkQE0","type":"Bearer","id":"01K9C22V9308CX0NGGXWHH99S2","email":"auto_buyer_1762415176@example.com","fullName":"Fallback Buyer User","role":"vendor"}
[PASS] User registration successful, token stored globally
[INFO] Fallback buyer user registered and token cached
Registering user: POST http://localhost:8080/auth/register
Payload: {'email': 't26_payment_vendor_bfcd1f25@example.com', 'password': '112233445566', 'fullName': 'T26 Payment Vendor User', 'orgId': '01K9C22N6V9AQVEE1875NQ190H'}
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0MjZfcGF5bWVudF92ZW5kb3JfYmZjZDFmMjVAZXhhbXBsZS5jb20iLCJpYXQiOjE3NjI0MTUxODEsImV4cCI6MTc2MjUwMTU4MX0.jmARsUHtCHN0E_aECbMY5Vmej6D1yU0KjFcHlL1XljY","type":"Bearer","id":"01K9C22YY5C4K84PBHS733Q6NQ","email":"t26_payment_vendor_bfcd1f25@example.com","fullName":"T26 Payment Vendor User","role":"vendor"}
[PASS] User registration successful, token stored globally
Created order 01K9C2333CXDZ5V48B8HK1NADR with total: 100.0
Step 5: Ensuring buyer has a funded wallet for payment...
Buyer user data: {'id': '01K9C22V9308CX0NGGXWHH99S2', 'orgId': '01K9C22TCDTDJP7H1P5DYTB7EB', 'email': 'auto_buyer_1762415176@example.com', 'fullName': 'Fallback Buyer User', 'role': 'vendor', 'passwordHash': '$2a$10$d2QDbh60mZiY1L/vOE8orOu4qSVivX40UpjPPLxnsRgx.Se4aV2zi', 'isActive': True, 'createdAt': '2025-11-06T07:46:17.270043Z', 'updatedAt': '2025-11-06T07:46:17.270043Z', 'enabled': True, 'authorities': [{'authority': 'ROLE_vendor'}], 'password': '$2a$10$d2QDbh60mZiY1L/vOE8orOu4qSVivX40UpjPPLxnsRgx.Se4aV2zi', 'username': 'auto_buyer_1762415176@example.com', 'accountNonLocked': True, 'accountNonExpired': True, 'credentialsNonExpired': True}
Buyer's organization ID: 01K9C22TCDTDJP7H1P5DYTB7EB
Current buyer wallet balance: 0
Buyer balance (0) insufficient for order (100.0), topping up...
Authenticating admin user: POST http://localhost:8080/auth/login
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3NjI0MTUxODcsImV4cCI6MTc2MjUwMTU4N30.jZorOUhB2dzjTMrFXVCxl8ht81cpisk4gEpcH9bzlPY","type":"Bearer","id":"2DYRC8AVYQ2M53ETFSQE55DZ9K","email":"admin@admin.com","fullName":"admin","role":"vendor"}
Login successful, authentication token stored globally
Top-up successful, added 200.0 to buyer's wallet
Updated buyer wallet balance: 200.0
Step 6: Testing wallet payment with sufficient funds...
[FAIL] Payment failed with status: 500
Response: {"timestamp":"2025-11-06T07:46:30.565+00:00","status":500,"error":"Internal Server Error","path":"/orders/01K9C2333CXDZ5V48B8HK1NADR/pay/wallet"}

T26 Pay order with wallet test: [FAIL]