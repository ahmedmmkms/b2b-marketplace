base) D:\Projects\b2b-marketplace>python test/aggregate_success_test.py
Running tests for T1 (DB migrations), T2 (App health), T3 (Feature flags), T5 (Catalog browse), T6 (Catalog detail), T7 (Admin create vendor), T8 (Admin create product), T10 (Toggle exposure via flags), T12 (RFQ create + get), T13 (RFQ add line), T14 (RFQ issue), and T15 (Submit quote)
======================================================================
Testing T2: Boot app skeleton + health
GET http://localhost:8080/actuator/health
Status Code: 200
Response: {"status":"UP","components":{"db":{"status":"UP","details":{"database":"PostgreSQL","validationQuery":"isValid()"}},"diskSpace":{"status":"UP","details":{"total":128869908480,"free":35695169536,"threshold":10485760,"path":"D:\\Projects\\b2b-marketplace\\backend\\.","exists":true}},"livenessState":{"status":"UP"},"ping":{"status":"UP"},"readiness":{"status":"UP","details":{"status":"Application is ready"}},"readinessState":{"status":"UP"}}}
[PASS] T2 PASSED: Health endpoint returns {'status':'UP'}
Authenticating admin user: POST http://localhost:8080/auth/login
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3NjIyODIzMDAsImV4cCI6MTc2MjM2ODcwMH0.ywNXeQJ69R7oA66ipnK_f4Tl8QELn2xxD9h1jBi-71E","type":"Bearer","id":"2DYRC8AVYQ2M53ETFSQE55DZ9K","email":"admin@admin.com","fullName":"admin","role":"vendor"}
Login successful, authentication token stored globally
Testing T3: FeatureFlag repository + controller (read-only)
GET http://localhost:8080/flags
Status Code: 200
Response: [{"key":"catalog_search","value":"{\"scope\": \"public\", \"enabled\": true}","createdAt":"2025-10-30T07:09:58.458936Z","updatedAt":"2025-10-30T07:09:58.458936Z"},{"key":"rfq_workflow","value":"{\"scope\": \"public\", \"enabled\": true}","createdAt":"2025-10-30T07:09:58.458936Z","updatedAt":"2025-10-30T07:09:58.458936Z"},{"key":"quote_management","value":"{\"scope\": \"public\", \"enabled\": true}","createdAt":"2025-10-30T07:09:58.458936Z","updatedAt":"2025-10-30T07:09:58.458936Z"},{"key":"order_processing","value":"{\"scope\": \"public\", \"enabled\": true}","createdAt":"2025-10-30T07:09:58.458936Z","updatedAt":"2025-10-30T07:09:58.458936Z"},{"key":"wallet_payments","value":"{\"scope\": \"public\", \"enabled\": true}","createdAt":"2025-10-30T07:09:58.458936Z","updatedAt":"2025-10-30T07:09:58.458936Z"}]
[PASS] T3 PASSED: GET /flags returns an array as expected
Testing T5: Catalog browse endpoint
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-04T18:51:41.782+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[FAIL] T5 FAILED: Could not authenticate as buyer user
Testing T6: Catalog detail endpoint
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-04T18:51:42.187+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[FAIL] T6 FAILED: Could not authenticate as buyer user
Testing T7: Admin create vendor
Creating vendor: POST http://localhost:8080/vendors
Payload: {'name': 'Test Vendor for API Test'}
Status Code: 201
Response: {"id":"02MHBX4X3WWG1GXNCF8T2FR0ZM","name":"Test Vendor for API Test","role":"vendor"}
[PASS] T7 PASSED: Admin create vendor returns 201 with created vendor JSON
Testing T8: Admin create product
Creating vendor first: POST http://localhost:8080/vendors
Created vendor with ID: 02MHBX4YDRWM4VYBFECRKH8NRD
Creating product: POST http://localhost:8080/products
Payload: {'vendorId': '02MHBX4YDRWM4VYBFECRKH8NRD', 'sku': 'TEST_SKU_2922', 'name': 'Test Product for API Test', 'description': 'Test product description', 'price': 100.0, 'category': 'test'}
Status Code: 201
Response: {"id":"02MHBX4ZXCNTRTCZN63X2MZ5GJ","vendorId":"02MHBX4YDRWM4VYBFECRKH8NRD","sku":"TEST_SKU_2922","name":"Test Product for API Test","description":"Test product description","category":"test","priceCurrency":"USD","referencePrice":null,"mediaUrls":null,"attributes":null,"isActive":true,"createdAt":"2025-11-04T20:51:45.080974+02:00","updatedAt":"2025-11-04T20:51:45.080974+02:00"}
[PASS] T8.1 PASSED: Admin create product returns 201 with product JSON
\nTesting duplicate product creation (should return 409): POST http://localhost:8080/products
Payload: {'vendorId': '02MHBX4YDRWM4VYBFECRKH8NRD', 'sku': 'TEST_SKU_2922', 'name': 'Test Product for API Test', 'description': 'Test product description', 'price': 100.0, 'category': 'test'}
Status Code: 409
Response: {"detail":"A product with vendorId '02MHBX4YDRWM4VYBFECRKH8NRD' and sku 'TEST_SKU_2922' already exists","type":"https://api.example.com/errors/product-conflict","title":"Product already exists","status":409,"timestamp":"2025-11-04T18:51:46.222448300Z"}
[PASS] T8.2 PASSED: Duplicate product creation returns 409 as expected
\n[PASS] T8 PASSED: Admin create product working correctly
\nTesting T1: DB migrations applied successfully
Testing feature flags endpoint: GET http://localhost:8080/flags
Status Code: 200
[PASS] T1.1 PASSED: Feature flags endpoint works (feature_flags table exists)
\nTesting products endpoint: GET http://localhost:8080/products?page=1&pageSize=1
Status Code: 200
[PASS] T1.2 PASSED: Products endpoint works (products table exists)
\nTesting vendors endpoint exists: GET http://localhost:8080/vendors
Status Code: 405
[PASS] T1.3 PASSED: Vendors endpoint exists (supports expected HTTP methods)
\n[PASS] T1 PASSED: All DB migration tests passed - tables appear to exist
Testing T10: Toggle exposure via flags
Checking feature flags: GET http://localhost:8080/flags
Status Code: 200
Found catalog.publicBrowse flag: False
Found search.enabled flag: False
\nTesting access to product endpoints: GET http://localhost:8080/products?page=1&pageSize=10
Status Code: 200
Response: {"total":213,"pageSize":10,"page":1,"items":[{"id":"EY4E8EGWWBXCRRFB0RJD8K6HYF","vendorId":"M80EAQMQAXV7N94AD1B6T5879C","sku":"CON-20P","name":"20-Pin Connector","description":"High-reliability connec...
[INFO] Product endpoints are accessible (flags likely enabled)
\nTesting search functionality: GET http://localhost:8080/products?page=1&pageSize=10&q=test
Status Code: 200
[INFO] Search functionality is accessible (search flag likely enabled)
[PASS] T10.1 PASSED: Feature flags endpoint is accessible
\n[PASS] T10 PASSED: Feature flag infrastructure appears to be in place
Note: Complete flag toggle testing requires manual verification of enabling/disabling flags
Testing T12: RFQ create + get
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-04T18:51:50.297+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[FAIL] T12 FAILED: Could not authenticate as buyer user
Testing T13: RFQ add line
Creating vendor for product: POST http://localhost:8080/vendors
Created vendor with ID: 02MHBX562CH04G02HAV6FYZD9C
Creating product: POST http://localhost:8080/products
Created product with ID: 02MHBX576F0EDGEKTCEX0KBKHD
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-04T18:51:52.227+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[FAIL] T13 FAILED: Could not authenticate as buyer user
Testing T14: RFQ issue
Creating vendor for product: POST http://localhost:8080/vendors
Created vendor with ID: 02MHBX586KX90PTDN54MXMGK2Y
Creating product: POST http://localhost:8080/products
Created product with ID: 02MHBX59A8C3E0XTCG2XRB4907
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-04T18:51:54.171+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[FAIL] T14 FAILED: Could not authenticate as buyer user
\n--- Starting T15 Test: Register and Login User Associated with Vendor ---
Creating vendor for T15 user association: POST http://localhost:8080/vendors
Created vendor with ID: 02MHBX5AC5Y6X3FKRAK3ZZN4G8
Registering vendor user: POST http://localhost:8080/auth/register
Payload: {'fullName': 'T15 Vendor User', 'email': 't15vendor_1762282314@example.com', 'password': '112233445566', 'orgId': '02MHBX5AC5Y6X3FKRAK3ZZN4G8'}
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0MTV2ZW5kb3JfMTc2MjI4MjMxNEBleGFtcGxlLmNvbSIsImlhdCI6MTc2MjI4MjMxNSwiZXhwIjoxNzYyMzY4NzE1fQ.tv0dPL2B966kZIRv9kyIGLeHMhBYYSagGROQyozsuKo","type":"Bearer","id":"02MHBX5BAG11C812WHBZ7N5TAM","email":"t15vendor_1762282314@example.com","fullName":"T15 Vendor User","role":"vendor"}
User registered successfully, authentication token stored globally
Successfully registered user associated with vendor
Logging out user
User logged out, authentication token cleared
Authenticating user t15vendor_1762282314@example.com: POST http://localhost:8080/auth/login
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0MTV2ZW5kb3JfMTc2MjI4MjMxNEBleGFtcGxlLmNvbSIsImlhdCI6MTc2MjI4MjMxNiwiZXhwIjoxNzYyMzY4NzE2fQ.teaQP51lvsSHXJUNnpBtV2H9XqZS3uWNR_tBoNBs_fc","type":"Bearer","id":"02MHBX5BAG11C812WHBZ7N5TAM","email":"t15vendor_1762282314@example.com","fullName":"T15 Vendor User","role":"vendor"}
Login successful, authentication token stored globally
Successfully logged in with registered user
Testing T15: Submit quote
Creating vendor for quote: POST http://localhost:8080/vendors
Traceback (most recent call last):
  File "D:\Projects\b2b-marketplace\test\aggregate_success_test.py", line 2084, in <module>
    success = run_tests()
  File "D:\Projects\b2b-marketplace\test\aggregate_success_test.py", line 2043, in run_tests
    t15_success = test_submit_quote()
  File "D:\Projects\b2b-marketplace\test\aggregate_success_test.py", line 1364, in test_submit_quote
    vendor_response = requests.post(vendors_url, json=vendor_data, timeout=30, headers=headers)
                                                                                       ^^^^^^^
NameError: name 'headers' is not defined