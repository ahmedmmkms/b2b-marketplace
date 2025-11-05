
--- T2 (App health) ---
Testing T2: Boot app skeleton + health
GET http://localhost:8080/actuator/health
Status Code: 200
Response: {"status":"UP","components":{"db":{"status":"UP","details":{"database":"PostgreSQL","validationQuery":"isValid()"}},"diskSpace":{"status":"UP","details":{"total":128869908480,"free":35748421632,"threshold":10485760,"path":"D:\\Projects\\b2b-marketplace\\backend\\.","exists":true}},"livenessState":{"status":"UP"},"ping":{"status":"UP"},"readiness":{"status":"UP","details":{"status":"Application is ready"}},"readinessState":{"status":"UP"}}}
[PASS] T2 PASSED: Health endpoint returns {'status':'UP'}

--- Authentication (admin) ---
Authenticating admin user: POST http://localhost:8080/auth/login
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3NjIzMjA1ODIsImV4cCI6MTc2MjQwNjk4Mn0.KmchPaX0gNq2dyf2TrclOZuXfSEoHz6NEUQDOKPbd3Y","type":"Bearer","id":"2DYRC8AVYQ2M53ETFSQE55DZ9K","email":"admin@admin.com","fullName":"admin","role":"vendor"}
Login successful, authentication token stored globally

--- T3 (Feature flags) ---
Testing T3: FeatureFlag repository + controller (read-only)
GET http://localhost:8080/flags
Status Code: 200
Response: [{"key":"catalog_search","value":"{\"scope\": \"public\", \"enabled\": true}","createdAt":"2025-10-30T07:09:58.458936Z","updatedAt":"2025-10-30T07:09:58.458936Z"},{"key":"rfq_workflow","value":"{\"scope\": \"public\", \"enabled\": true}","createdAt":"2025-10-30T07:09:58.458936Z","updatedAt":"2025-10-30T07:09:58.458936Z"},{"key":"quote_management","value":"{\"scope\": \"public\", \"enabled\": true}","createdAt":"2025-10-30T07:09:58.458936Z","updatedAt":"2025-10-30T07:09:58.458936Z"},{"key":"order_processing","value":"{\"scope\": \"public\", \"enabled\": true}","createdAt":"2025-10-30T07:09:58.458936Z","updatedAt":"2025-10-30T07:09:58.458936Z"},{"key":"wallet_payments","value":"{\"scope\": \"public\", \"enabled\": true}","createdAt":"2025-10-30T07:09:58.458936Z","updatedAt":"2025-10-30T07:09:58.458936Z"}]
[PASS] T3 PASSED: GET /flags returns an array as expected

--- T5 (Catalog browse) ---
Testing T5: Catalog browse endpoint
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-05T05:29:43.751+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[FAIL] T5 FAILED: Could not authenticate as buyer user

--- T6 (Catalog detail) ---
Testing T6: Catalog detail endpoint
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-05T05:29:44.041+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[FAIL] T6 FAILED: Could not authenticate as buyer user

--- T7 (Admin create vendor) ---
Testing T7: Admin create vendor
Creating vendor: POST http://localhost:8080/vendors
Payload: {'name': 'Test Vendor for API Test'}
Status Code: 201
Response: {"id":"01K997W3GZCWHB784Q4KYF7S44","name":"Test Vendor for API Test","role":"vendor"}
[PASS] T7 PASSED: Admin create vendor returns created vendor JSON

--- T8 (Admin create product) ---
Testing T8: Admin create product
Creating vendor first: POST http://localhost:8080/vendors
Created vendor with ID: 01K997W44XFH6HS2PB4QH1N2R8
Creating product: POST http://localhost:8080/products
Payload: {'vendorId': '01K997W44XFH6HS2PB4QH1N2R8', 'sku': 'TEST_SKU_2391', 'name': 'Test Product for API Test', 'description': 'Test product description', 'price': 100.0, 'category': 'test'}
Status Code: 201
Response: {"id":"01K997W55DNRK9ZD2ZPZBS082Z","vendorId":"01K997W44XFH6HS2PB4QH1N2R8","sku":"TEST_SKU_2391","name":"Test Product for API Test","description":"Test product description","category":"test","priceCurrency":"USD","referencePrice":null,"mediaUrls":null,"attributes":null,"isActive":true,"createdAt":"2025-11-05T07:29:46.0457204+02:00","updatedAt":"2025-11-05T07:29:46.0457204+02:00"}
[PASS] T8.1 PASSED: Admin create product returns 201 with product JSON

Testing duplicate product creation (should return 409): POST http://localhost:8080/products
Payload: {'vendorId': '01K997W44XFH6HS2PB4QH1N2R8', 'sku': 'TEST_SKU_2391', 'name': 'Test Product for API Test', 'description': 'Test product description', 'price': 100.0, 'category': 'test'}
Status Code: 409
Response: {"detail":"A product with vendorId '01K997W44XFH6HS2PB4QH1N2R8' and sku 'TEST_SKU_2391' already exists","type":"https://api.example.com/errors/product-conflict","title":"Product already exists","status":409,"timestamp":"2025-11-05T05:29:47.103342300Z"}
[PASS] T8.2 PASSED: Duplicate product creation returns 409 as expected

[PASS] T8 PASSED: Admin create product working correctly

--- T1 (DB migrations) ---

Testing T1: DB migrations applied successfully
Testing feature flags endpoint: GET http://localhost:8080/flags
Status Code: 200
[PASS] T1.1 PASSED: Feature flags endpoint works (feature_flags table exists)

Testing products endpoint: GET http://localhost:8080/products?page=1&pageSize=1
Status Code: 200
[PASS] T1.2 PASSED: Products endpoint works (products table exists)

Testing vendors endpoint exists: GET http://localhost:8080/vendors
Status Code: 405
[PASS] T1.3 PASSED: Vendors endpoint exists (supports expected HTTP methods)

[PASS] T1 PASSED: All DB migration tests passed - tables appear to exist

--- T10 (Toggle exposure via flags) ---
Testing T10: Toggle exposure via flags
Checking feature flags: GET http://localhost:8080/flags
Status Code: 200
Found catalog.publicBrowse flag: False
Found search.enabled flag: False

Testing access to product endpoints: GET http://localhost:8080/products?page=1&pageSize=10
Status Code: 200
Response: {"total":256,"pageSize":10,"page":1,"items":[{"id":"EY4E8EGWWBXCRRFB0RJD8K6HYF","vendorId":"M80EAQMQAXV7N94AD1B6T5879C","sku":"CON-20P","name":"20-Pin Connector","description":"High-reliability connec...
[INFO] Product endpoints are accessible (flags likely enabled)

Testing search functionality: GET http://localhost:8080/products?page=1&pageSize=10&q=test
Status Code: 200
[INFO] Search functionality is accessible (search flag likely enabled)
[PASS] T10.1 PASSED: Feature flags endpoint is accessible

[PASS] T10 PASSED: Feature flag endpoint reachable; specific flags not detected

--- T12 (RFQ create + get) ---
Testing T12: RFQ create + get
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-05T05:29:50.991+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[FAIL] T12 FAILED: Could not authenticate as buyer user

--- T13 (RFQ add line) ---
Testing T13: RFQ add line
Creating vendor for product: POST http://localhost:8080/vendors
Created vendor with ID: 01K997WA9FC2SBD3X3HFW3WVRD
Creating product: POST http://localhost:8080/products
Created product with ID: 01K997WB9YYXTM22FE763AYXGJ
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-05T05:29:52.964+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[FAIL] T13 FAILED: Could not authenticate as buyer user

--- T14 (RFQ issue) ---
Testing T14: RFQ issue
Creating vendor for product: POST http://localhost:8080/vendors
Created vendor with ID: 01K997WC7KWNJJ39DZ2MAQ3NX4
Creating product: POST http://localhost:8080/products
Created product with ID: 01K997WD7D3TAPTQ3N70T3ZVBT
Authenticating buyer user: POST http://localhost:8080/auth/login
Status Code: 403
Response: {"timestamp":"2025-11-05T05:29:54.865+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
[FAIL] Authentication failed: Login failed with status code 403
[FAIL] T14 FAILED: Could not authenticate as buyer user

--- T15 (Submit quote) ---
Testing T15: Submit quote
Creating vendor for quote: POST http://localhost:8080/vendors
Created vendor with ID: 01K997WE2F060TE2KYEWEJE4C9
Registering a user associated with the vendor...
Registering user: POST http://localhost:8080/auth/register
Payload: {'email': 't15vendor_1762320595@example.com', 'password': '112233445566', 'fullName': 'T15 Vendor User', 'vendorId': '01K997WE2F060TE2KYEWEJE4C9'}
Status Code: 400
Response: {"timestamp":"2025-11-05T05:29:55.508+00:00","status":400,"error":"Bad Request","path":"/auth/register"}
[FAIL] Registration failed: Expected status code 201, got 400
[FAIL] T15 FAILED: Could not register user associated with vendor

--- T16 (List quotes for RFQ) ---
Testing T16: List quotes for RFQ (buyer)
Creating vendor for quote testing: POST http://localhost:8080/vendors
Created vendor with ID: 01K997WEQ2YYQE6QB6SX2NN1AK
Registering user: POST http://localhost:8080/auth/register
Payload: {'email': 't16vendor_1762320596@example.com', 'password': '112233445566', 'fullName': 'T16 Vendor User', 'vendorId': '01K997WEQ2YYQE6QB6SX2NN1AK'}
Status Code: 400
Response: {"timestamp":"2025-11-05T05:29:56.122+00:00","status":400,"error":"Bad Request","path":"/auth/register"}
[FAIL] Registration failed: Expected status code 201, got 400
[FAIL] T16 FAILED: Could not register vendor user

--- T17 (Accept quote) ---
Testing T17: Accept quote
Creating first vendor: POST http://localhost:8080/vendors
Created first vendor with ID: 01K997WFA5S9D4WMFQMFRJ1AC4
Creating second vendor: POST http://localhost:8080/vendors
Created second vendor with ID: 01K997WFWT57XWQ2SQJ19RKVNC
Registering user: POST http://localhost:8080/auth/register
Payload: {'email': 't17vendor1_1762320597@example.com', 'password': '112233445566', 'fullName': 'T17 Vendor User 1', 'vendorId': '01K997WFA5S9D4WMFQMFRJ1AC4'}
Status Code: 400
Response: {"timestamp":"2025-11-05T05:29:57.333+00:00","status":400,"error":"Bad Request","path":"/auth/register"}
[FAIL] Registration failed: Expected status code 201, got 400
[FAIL] T17 FAILED: Could not register first vendor user