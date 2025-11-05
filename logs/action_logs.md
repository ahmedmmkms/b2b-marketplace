(base) D:\Projects\b2b-marketplace>python test/test_t23_get_order.py
Testing T23 - Get order functionality...
Step 1: Creating RFQ and getting quote...
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-05T14:24:59.951+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[INFO] Buyer login failed with configured credentials; attempting fallback provisioning
Authenticating admin user: POST http://localhost:8080/auth/login
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3NjIzNTI3MDAsImV4cCI6MTc2MjQzOTEwMH0.KN52s_lA2Na2oPOBP4pp8pxWABYw7HwH4UXo1Zr430Y","type":"Bearer","id":"2DYRC8AVYQ2M53ETFSQE55DZ9K","email":"admin@admin.com","fullName":"admin","role":"vendor"}
Login successful, authentication token stored globally
Registering user: POST http://localhost:8080/auth/register
Payload: {'email': 'auto_buyer_1762352700@example.com', 'password': '112233445566', 'fullName': 'Fallback Buyer User', 'orgId': '01K9A6G6ZEQGPMZHX80R0QNARA'}
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhdXRvX2J1eWVyXzE3NjIzNTI3MDBAZXhhbXBsZS5jb20iLCJpYXQiOjE3NjIzNTI3MDEsImV4cCI6MTc2MjQzOTEwMX0.V1Q_XuWPg2JpevBbPk6-0sBVOPAbgrYY0e0235x6Tuk","type":"Bearer","id":"01K9A6G7VXDS86VM1NX311VFM0","email":"auto_buyer_1762352700@example.com","fullName":"Fallback Buyer User","role":"vendor"}
[PASS] User registration successful, token stored globally
[INFO] Fallback buyer user registered and token cached
Registering user: POST http://localhost:8080/auth/register
Payload: {'email': 't23_vendor_0203fd68@example.com', 'password': '112233445566', 'fullName': 'T23 Vendor User', 'orgId': '01K9A6G8JS6380JD0M37XS6VDS'}
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0MjNfdmVuZG9yXzAyMDNmZDY4QGV4YW1wbGUuY29tIiwiaWF0IjoxNzYyMzUyNzA0LCJleHAiOjE3NjI0MzkxMDR9.cNMi3ewS-dFSqIXkfHDSLbJrbVrTYEoHclG0hNCBtGE","type":"Bearer","id":"01K9A6GAG66XRMR0G1A65S9SZ8","email":"t23_vendor_0203fd68@example.com","fullName":"T23 Vendor User","role":"vendor"}
[PASS] User registration successful, token stored globally
Provisioned T23 vendor user: t23_vendor_0203fd68@example.com
Created RFQ: 01K9A6GBFSFVA9R2W7REHC1787
RFQ issued successfully
Submitted quote: 01K9A6GEQX7WPS7RP6J1PBE1Q9
Quote accepted successfully
Created order: 01K9A6GH381KER24WA3GVYDQR3
Step 2: Testing GET order endpoint...
[WARN] Retrieved order missing 'totalAmount' field; continuing with remaining assertions
[FAIL] Retrieved order missing line collection field (checked ['orderLines', 'lines', 'items', 'orderItems'])
Order payload keys: ['buyerId', 'createdAt', 'currency', 'grandTotal', 'id', 'quoteId', 'status', 'subtotal', 'taxTotal', 'updatedAt']