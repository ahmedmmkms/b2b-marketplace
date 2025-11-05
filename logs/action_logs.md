(base) D:\Projects\b2b-marketplace>python test/test_t24_get_wallet_balance.py
Testing T24 - Wallet API get balance functionality...
Authenticating admin user: POST http://localhost:8080/auth/login
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3NjIzNjMzODksImV4cCI6MTc2MjQ0OTc4OX0.PCt0U9O1jWFHJ8MVqCEHCmYwoITRzna563FE5RzrR1Y","type":"Bearer","id":"2DYRC8AVYQ2M53ETFSQE55DZ9K","email":"admin@admin.com","fullName":"admin","role":"vendor"}
Login successful, authentication token stored globally
Created organization for wallet test: 01K9AGPDWNWP0YFDAG9N9YBAQQ
Step 2: Testing GET wallet balance endpoint...
[PASS] Successfully retrieved wallet balance: 0
Step 3: Testing wallet access with different user roles...
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-05T17:23:11.638+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[INFO] Buyer login failed with configured credentials; attempting fallback provisioning
Registering user: POST http://localhost:8080/auth/register
Payload: {'email': 'auto_buyer_1762363392@example.com', 'password': '112233445566', 'fullName': 'Fallback Buyer User', 'orgId': '01K9AGPFTNG8ES98SQ999MYGG3'}
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhdXRvX2J1eWVyXzE3NjIzNjMzOTJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NjIzNjMzOTMsImV4cCI6MTc2MjQ0OTc5M30.tG-Vn1Go7JfQqml7ITOGclNqtjlv0j8EpmLvPyyWPA0","type":"Bearer","id":"01K9AGPGQWK9DR35JB7T2CXHH7","email":"auto_buyer_1762363392@example.com","fullName":"Fallback Buyer User","role":"vendor"}
[PASS] User registration successful, token stored globally
[INFO] Fallback buyer user registered and token cached
[PASS] Buyer user can access wallet balance: 0.0
Registering user: POST http://localhost:8080/auth/register
Payload: {'email': 't24_wallet_vendor_8ef36ad6@example.com', 'password': '112233445566', 'fullName': 'T24 Wallet Vendor User', 'orgId': '01K9AGPDWNWP0YFDAG9N9YBAQQ'}
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0MjRfd2FsbGV0X3ZlbmRvcl84ZWYzNmFkNkBleGFtcGxlLmNvbSIsImlhdCI6MTc2MjM2MzM5NCwiZXhwIjoxNzYyNDQ5Nzk0fQ.iS6e_Ip-peZ1BdOcf7akJYII0-hAicBR7U3dCYMWnNw","type":"Bearer","id":"01K9AGPJ8DRYYW5RVEYK19HWDR","email":"t24_wallet_vendor_8ef36ad6@example.com","fullName":"T24 Wallet Vendor User","role":"vendor"}
[PASS] User registration successful, token stored globally
[PASS] Vendor user can access wallet balance: 0.0
Step 4: Testing wallet access with non-existent organization ID...
[FAIL] Unexpected response for non-existent org: 500
Response: {"timestamp":"2025-11-05T17:23:16.179+00:00","status":500,"error":"Internal Server Error","path":"/wallets/G500K5PR4FJ1XX35N3MX0J7RVR"}

T24 Get wallet balance test: [FAIL]