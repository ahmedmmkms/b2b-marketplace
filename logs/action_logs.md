Testing T17: Accept quote
Creating first vendor: POST http://localhost:8080/vendors
Created first vendor with ID: 01K986Q7PER34Y30DYZKCTFQBY
Creating second vendor: POST http://localhost:8080/vendors
Created second vendor with ID: 01K986Q89ZV20P1Y392CE006E1
Registering vendor user: POST http://localhost:8080/auth/register
Payload: {'fullName': 'T17 Vendor User 1', 'email': 't17vendor1_1762285822@example.com', 'password': '112233445566', 'orgId': '01K986Q7PER34Y30DYZKCTFQBY'}
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0MTd2ZW5kb3IxXzE3NjIyODU4MjJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NjIyODU4MjMsImV4cCI6MTc2MjM3MjIyM30.rKFlYGzZiY3ev4RcUjQSn-AIIB6nO2co9CWeJNUh6xo","type":"Bearer","id":"01K986Q95GNBED3KQ96WB01RBW","email":"t17vendor1_1762285822@example.com","fullName":"T17 Vendor User 1","role":"vendor"}
User registered successfully, authentication token stored globally
Registered first vendor user with token
Registering vendor user: POST http://localhost:8080/auth/register
Payload: {'fullName': 'T17 Vendor User 2', 'email': 't17vendor2_1762285822@example.com', 'password': '112233445566', 'orgId': '01K986Q89ZV20P1Y392CE006E1'}
Status Code: 200
Response: {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0MTd2ZW5kb3IyXzE3NjIyODU4MjJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NjIyODU4MjQsImV4cCI6MTc2MjM3MjIyNH0.lPzkpQfQMaLjlwG2owhXS2D3s5IXXcRWQWDoYKRwSgk","type":"Bearer","id":"01K986QA5P1MK32R5CB6HH72XC","email":"t17vendor2_1762285822@example.com","fullName":"T17 Vendor User 2","role":"vendor"}
User registered successfully, authentication token stored globally
Registered second vendor user with token
Creating product for first vendor: POST http://localhost:8080/products
Created first product with ID: 01K986QBBGP2S2277XYRXHMJ4N
Creating product for second vendor: POST http://localhost:8080/products
Created second product with ID: 01K986QCCEABYYH663TH3B2N87
Creating RFQ: POST http://localhost:8080/rfqs
Created RFQ with ID: 01K986QD96M12NPGV0H5JJXFPB
Adding line to RFQ: POST http://localhost:8080/rfqs/01K986QD96M12NPGV0H5JJXFPB/lines
Successfully added line with ID: 01K986QE2BMSN6WA26RJYFAQT5
Issuing RFQ: POST http://localhost:8080/rfqs/01K986QD96M12NPGV0H5JJXFPB/issue
Successfully issued RFQ
Submitting first quote: POST http://localhost:8080/rfqs/01K986QD96M12NPGV0H5JJXFPB/quotes
First quote status: 201
Created first quote with ID: 01K986QGH0CBZE6AP00SHF08MX
Submitting second quote: POST http://localhost:8080/rfqs/01K986QD96M12NPGV0H5JJXFPB/quotes
Second quote status: 201
Created second quote with ID: 01K986QJDNXW308TV25XVNQ17R
\nTesting T17: Accept quote: POST http://localhost:8080/rfqs/01K986QD96M12NPGV0H5JJXFPB/quotes/01K986QGH0CBZE6AP00SHF08MX/accept
Status Code: 200
Response: 
[PASS] T17.1 PASSED: Accept quote returns 200
\nVerifying quote 1 status after acceptance: GET http://localhost:8080/rfqs/01K986QD96M12NPGV0H5JJXFPB/quotes/01K986QGH0CBZE6AP00SHF08MX       
[FAIL] T17.2 FAILED: Could not get quote 1 details - status 404
\nVerifying quote 2 status after quote 1 acceptance: GET http://localhost:8080/rfqs/01K986QD96M12NPGV0H5JJXFPB/quotes/01K986QJDNXW308TV25XVNQ17R
[FAIL] T17.3 FAILED: Could not get quote 2 details - status 404
\nVerifying RFQ status after acceptance: GET http://localhost:8080/rfqs/01K986QD96M12NPGV0H5JJXFPB
[PASS] T17.4 PASSED: RFQ is marked as 'awarded'
\nTesting T17: Idempotency - accept same quote again: POST http://localhost:8080/rfqs/01K986QD96M12NPGV0H5JJXFPB/quotes/01K986QGH0CBZE6AP00SHF08MX/accept
Status Code: 200
Response: 
[PASS] T17.5 PASSED: Accepting same quote again returns 200 (idempotent)
\n[FAIL] T17 FAILED: Some accept quote tests failed
\n======================================================================