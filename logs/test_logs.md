(base) D:\Projects\b2b-marketplace\e2e_tests>python e2e_happy_path_test.py
============================================================
E2E Happy Path Test - Complete Flow
============================================================
Testing against API: http://localhost:8080
1. Health check...
[GET] http://localhost:8080/actuator/health
Status Code: 200
Response: {
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "PostgreSQL",
        "validationQuery": "isValid()"
      }
    },
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": 128869908480,
        "free": 35744624640,
        "threshold": 10485760,
        "path": "D:\\Projects\\b2b-marketplace\\backend\\.",
        "exists": true
      }
    },
    "livenessState": {
      "status": "UP"
    },
    "ping": {
      "status": "UP"
    },
    "readiness": {
      "status": "UP",
      "details": {
        "status": "Application is ready"
      }
    },
    "readinessState": {
      "status": "UP"
    }
  }
}
✓ Expected status 200 received

2. Authenticating admin user...
Admin token: eyJhbGciOi...
3. Creating vendor organization...
[POST] http://localhost:8080/vendors
Payload: {
  "name": "Test Vendor 3135"
}
Status Code: 201
Response: {
  "id": "01K9CHACB6M3JE9M6DSSJAAD40",
  "name": "Test Vendor 3135",
  "role": "vendor"
}
✓ Expected status 201 received

Created vendor ID: 01K9CHACB6M3JE9M6DSSJAAD40
4. Creating a product...
[POST] http://localhost:8080/products
Payload: {
  "vendorId": "01K9CHACB6M3JE9M6DSSJAAD40",
  "sku": "TEST-PROD-8390",
  "name": "Test Product for E2E",
  "description": "Test product for end-to-end testing",
  "category": "test",
  "referencePrice": 99.99
}
Status Code: 201
Response: {
  "id": "01K9CHADBVC9ZF1XNKSMQM9B9K",
  "vendorId": "01K9CHACB6M3JE9M6DSSJAAD40",
  "sku": "TEST-PROD-8390",
  "name": "Test Product for E2E",
  "description": "Test product for end-to-end testing",
  "category": "test",
  "priceCurrency": "USD",
  "referencePrice": 99.99,
  "mediaUrls": null,
  "attributes": null,
  "isActive": true,
  "createdAt": "2025-11-06T14:12:33.6764964+02:00",
  "updatedAt": "2025-11-06T14:12:33.6764964+02:00"
}
✓ Expected status 201 received

Created product ID: 01K9CHADBVC9ZF1XNKSMQM9B9K
5. Browsing products...
[GET] http://localhost:8080/products
Status Code: 200
Response: {
  "total": 349,
  "pageSize": 20,
  "page": 1,
  "items": [
    {
      "id": "EY4E8EGWWBXCRRFB0RJD8K6HYF",
      "vendorId": "M80EAQMQAXV7N94AD1B6T5879C",
      "sku": "CON-20P",
      "name": "20-Pin Connector",
      "description": "High-reliability connector",
      "category": "connectors",
      "priceCurrency": "USD",
      "referencePrice": 2.1,
      "mediaUrls": [],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T07:09:58.458936Z",
      "updatedAt": "2025-10-30T07:09:58.458936Z"
    },
    {
      "id": "H07WR4DXXTW49TYSC7ESTE5TZG",
      "vendorId": "9QGCSGBWAEQG2SPFR0612Q3GVA",
      "sku": "MCU-32",
      "name": "32-bit Microcontroller",
      "description": "ARM Cortex-based microcontroller",
      "category": "electronics",
      "priceCurrency": "USD",
      "referencePrice": 12.75,
      "mediaUrls": [],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T07:09:58.458936Z",
      "updatedAt": "2025-10-30T07:09:58.458936Z"
    },
    {
      "id": "RKRTGA6EHSTA2VH4C410SRRK1T",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD012",
      "name": "3D Printer Desktop",
      "description": "Desktop 3D printer for prototyping",
      "category": "Manufacturing",
      "priceCurrency": "USD",
      "referencePrice": 1499.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1542838132-926582b15c60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:26:58.321605Z",
      "updatedAt": "2025-10-30T11:26:58.321605Z"
    },
    {
      "id": "S5MA28M822R1XQTC30885WNEXY",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD044",
      "name": "Adjustable Monitor Stand",
      "description": "Adjustable height monitor stand",
      "category": "Furniture",
      "priceCurrency": "USD",
      "referencePrice": 89.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1594908485284-1e3540d2fc47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:27:08.97514Z",
      "updatedAt": "2025-10-30T11:27:08.97514Z"
    },
    {
      "id": "Z5WA5BVNG78QA55KQEZR6K98KB",
      "vendorId": "94W8P7A8DKJ2CCTV8FE9MKN4NZ",
      "sku": "BRG-1234",
      "name": "Ball Bearing 12x34x10mm",
      "description": "Precision ball bearing",
      "category": "bearings",
      "priceCurrency": "USD",
      "referencePrice": 5.25,
      "mediaUrls": [],
      "attributes": {
        "material": "chrome steel",
        "load_rating": "2.5kN"
      },
      "isActive": true,
      "createdAt": "2025-10-30T07:09:58.458936Z",
      "updatedAt": "2025-10-30T07:09:58.458936Z"
    },
    {
      "id": "ZSYJVPNESNZ7A6J22B4FG3YAF2",
      "vendorId": "94W8P7A8DKJ2CCTV8FE9MKN4NZ",
      "sku": "BRG-2448",
      "name": "Ball Bearing 24x48x20mm",
      "description": "Heavy-duty ball bearing",
      "category": "bearings",
      "priceCurrency": "USD",
      "referencePrice": 18.9,
      "mediaUrls": [],
      "attributes": {
        "material": "chrome steel",
        "load_rating": "8.2kN"
      },
      "isActive": true,
      "createdAt": "2025-10-30T07:09:58.458936Z",
      "updatedAt": "2025-10-30T07:09:58.458936Z"
    },
    {
      "id": "ENR97MZ1V05QKYY5EQC2JDG6NN",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD024",
      "name": "Barcode Label Maker",
      "description": "Industrial label maker for inventory",
      "category": "Office Equipment",
      "priceCurrency": "USD",
      "referencePrice": 249.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1585123334904-845d60e97b29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:27:02.633477Z",
      "updatedAt": "2025-10-30T11:27:02.633477Z"
    },
    {
      "id": "Z1KJC2M60DB3ZJXKVQ7KZFPYJ8",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD022",
      "name": "Bluetooth Printer",
      "description": "Mobile Bluetooth receipt printer",
      "category": "Electronics",
      "priceCurrency": "USD",
      "referencePrice": 119.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1585123334904-845d60e97b29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:27:01.793966Z",
      "updatedAt": "2025-10-30T11:27:01.793966Z"
    },
    {
      "id": "8R4Y1JE5HE2BDXTG0DJK43WC02",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD043",
      "name": "Cable Management Box",
      "description": "Cable management box for desktop organization",
      "category": "Office Supplies",
      "priceCurrency": "USD",
      "referencePrice": 29.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1595526114035-0d45edc8818b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:27:08.687111Z",
      "updatedAt": "2025-10-30T11:27:08.687111Z"
    },
    {
      "id": "1RXBDVRRN1ASZGAVVJCEJHA94X",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD027",
      "name": "Commercial Coffee Machine",
      "description": "Commercial espresso machine for offices",
      "category": "Equipment",
      "priceCurrency": "USD",
      "referencePrice": 1799.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1522992319-0365e7f9e0c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:27:03.841458Z",
      "updatedAt": "2025-10-30T11:27:03.841458Z"
    },
    {
      "id": "TV3BEGW1NVMEQW7WRH2JTD1PSD",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD015",
      "name": "Commercial Dishwasher",
      "description": "Undercounter commercial dishwasher",
      "category": "Equipment",
      "priceCurrency": "USD",
      "referencePrice": 2199.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1513506905905-eb73e3d1ab4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:26:59.448119Z",
      "updatedAt": "2025-10-30T11:26:59.448119Z"
    },
    {
      "id": "H3E1RHAE84HGJKDAPK2HSN0DAW",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD007",
      "name": "Commercial Oven",
      "description": "Convection commercial oven for restaurants",
      "category": "Equipment",
      "priceCurrency": "USD",
      "referencePrice": 3299.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:26:56.479269Z",
      "updatedAt": "2025-10-30T11:26:56.479269Z"
    },
    {
      "id": "SSDY865QQHNS3GDR3RFNSYVE6S",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD002",
      "name": "Commercial Refrigerator",
      "description": "Stainless steel commercial refrigerator with dual zones",
      "category": "Equipment",
      "priceCurrency": "USD",
      "referencePrice": 2499.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1580477667091-7d04c2c59b65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:26:54.802041Z",
      "updatedAt": "2025-10-30T11:26:54.802041Z"
    },
    {
      "id": "N94P5VZ34NBA1DMQFDHKVBTYES",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD042",
      "name": "Conference Phone",
      "description": "Speakerphone for conference rooms",
      "category": "Audio Equipment",
      "priceCurrency": "USD",
      "referencePrice": 249.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:27:08.400597Z",
      "updatedAt": "2025-10-30T11:27:08.400597Z"
    },
    {
      "id": "8Z3YJWTE3G6S9TQWR7GM2CRVQK",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD010",
      "name": "Conference Room Table",
      "description": "Large rectangular conference room table",
      "category": "Furniture",
      "priceCurrency": "USD",
      "referencePrice": 799.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:26:57.604878Z",
      "updatedAt": "2025-10-30T11:26:57.604878Z"
    },
    {
      "id": "SBZ0QQK6KNZ8CGD6XC5RD626AP",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD040",
      "name": "Desk Organizer",
      "description": "Modular desk organizer for office supplies",
      "category": "Office Supplies",
      "priceCurrency": "USD",
      "referencePrice": 39.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1595526114035-0d45edc8818b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:27:07.820598Z",
      "updatedAt": "2025-10-30T11:27:07.820598Z"
    },
    {
      "id": "7G4BWVG65SR8ZY8C72WARD8V6Y",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD029",
      "name": "Desktop Computer Workstation",
      "description": "High-performance desktop workstation",
      "category": "Electronics",
      "priceCurrency": "USD",
      "referencePrice": 1499.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1499933374294-4584851497cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:27:04.590677Z",
      "updatedAt": "2025-10-30T11:27:04.590677Z"
    },
    {
      "id": "WE2W0RHF54JX1NWC98SV9PMWJ6",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD050",
      "name": "Digital Caliper",
      "description": "Digital caliper with metric/imperial conversion",
      "category": "Measurement",
      "priceCurrency": "USD",
      "referencePrice": 39.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:27:10.422683Z",
      "updatedAt": "2025-10-30T11:27:10.422683Z"
    },
    {
      "id": "Q5FS43R7CGF43Q1K33H0Y3MDCV",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD020",
      "name": "Document Scanner",
      "description": "High-speed document scanner for office",
      "category": "Office Equipment",
      "priceCurrency": "USD",
      "referencePrice": 399.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:27:01.142622Z",
      "updatedAt": "2025-10-30T11:27:01.142622Z"
    },
    {
      "id": "RYGX7H17G3NE46ACQGVYXA03ZN",
      "vendorId": "5HT308EWX077R2YZ7H09GWYH66",
      "sku": "PROD041",
      "name": "Document Shredder",
      "description": "Strip-cut document shredder P-2 level",
      "category": "Office Equipment",
      "priceCurrency": "USD",
      "referencePrice": 129.99,
      "mediaUrls": [
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      ],
      "attributes": {},
      "isActive": true,
      "createdAt": "2025-10-30T11:27:08.11142Z",
      "updatedAt": "2025-10-30T11:27:08.11142Z"
    }
  ]
}
✓ Expected status 200 received

Found 349 products
6. Getting product detail...
[GET] http://localhost:8080/products/01K9CHADBVC9ZF1XNKSMQM9B9K
Status Code: 200
Response: {
  "id": "01K9CHADBVC9ZF1XNKSMQM9B9K",
  "vendorId": "01K9CHACB6M3JE9M6DSSJAAD40",
  "sku": "TEST-PROD-8390",
  "name": "Test Product for E2E",
  "description": "Test product for end-to-end testing",
  "category": "test",
  "priceCurrency": "USD",
  "referencePrice": 99.99,
  "mediaUrls": null,
  "attributes": null,
  "isActive": true,
  "createdAt": "2025-11-06T12:12:33.676496Z",
  "updatedAt": "2025-11-06T12:12:33.676496Z"
}
✓ Expected status 200 received

7. Authenticating buyer user...
✗ Buyer login failed: 403
Response: {"timestamp":"2025-11-06T12:12:35.987+00:00","status":403,"error":"Forbidden","path":"/auth/login"}
  Creating fallback buyer user...
[POST] http://localhost:8080/vendors
Payload: {
  "name": "Fallback Buyer Org 1282"
}
Status Code: 201
Response: {
  "id": "01K9CHAFY0PJGYCAMV16R333ZF",
  "name": "Fallback Buyer Org 1282",
  "role": "vendor"
}
✓ Expected status 201 received

Buyer token: eyJhbGciOi...
8. Creating RFQ...
[POST] http://localhost:8080/rfqs
Payload: {
  "title": "Test RFQ for E2E 9198",
  "notes": "Testing end-to-end flow"
}
Status Code: 201
Response: {
  "id": "01K9CHAJAQKQ35EECBD8D5MANF",
  "buyerId": "01K9CHAFY0PJGYCAMV16R333ZF",
  "title": "Test RFQ for E2E 9198",
  "description": null,
  "notes": "Testing end-to-end flow",
  "status": "draft",
  "attachments": [],
  "lines": []
}
✓ Expected status 201 received

Created RFQ ID: 01K9CHAJAQKQ35EECBD8D5MANF
9. Adding RFQ line...
[POST] http://localhost:8080/rfqs/01K9CHAJAQKQ35EECBD8D5MANF/lines
Payload: {
  "productId": "01K9CHADBVC9ZF1XNKSMQM9B9K",
  "description": "Test product line",
  "quantity": 10,
  "uom": "EA",
  "targetPrice": 100.0
}
Status Code: 201
Response: {
  "id": "01K9CHAK1RDMTAG6AM124GKCK5",
  "productId": "01K9CHADBVC9ZF1XNKSMQM9B9K",
  "description": "Test product line",
  "quantity": 10,
  "uom": "EA",
  "targetPrice": 100.0
}
✓ Expected status 201 received

Created RFQ line ID: 01K9CHAK1RDMTAG6AM124GKCK5
10. Issuing the RFQ...
[POST] http://localhost:8080/rfqs/01K9CHAJAQKQ35EECBD8D5MANF/issue
Status Code: 200
Response: 
✓ Expected status 200 received

RFQ issued successfully
11. Authenticating vendor user...
✗ Vendor login failed: 403
Creating vendor user for organization 01K9CHACB6M3JE9M6DSSJAAD40...
Vendor token: eyJhbGciOi...
12. Submitting quote for the RFQ...
[POST] http://localhost:8080/rfqs/01K9CHAJAQKQ35EECBD8D5MANF/quotes
Payload: {
  "vendorId": "01K9CHACB6M3JE9M6DSSJAAD40",
  "currency": "USD",
  "validUntil": "2025-12-06T12:12:42.313703+00:00",
  "notes": "Test quote for E2E",
  "lines": [
    {
      "rfqLineId": "01K9CHAK1RDMTAG6AM124GKCK5",
      "productId": "01K9CHADBVC9ZF1XNKSMQM9B9K",
      "description": "Test product quote",
      "quantity": 10,
      "uom": "EA",
      "unitPrice": 95.0,
      "moq": 5,
      "leadTimeDays": 14
    }
  ]
}
Status Code: 201
Response: {
  "id": "01K9CHAQ6FY0RFGRD62R285S85",
  "rfqId": "01K9CHAJAQKQ35EECBD8D5MANF",
  "vendorId": "01K9CHACB6M3JE9M6DSSJAAD40",
  "currency": "USD",
  "validUntil": "2025-12-06T12:12:42.313703Z",
  "status": "submitted",
  "subtotal": 950.0,
  "taxTotal": 0,
  "grandTotal": 950.0,
  "notes": null,
  "lines": [
    {
      "id": "01K9CHAQ6FJEWYC9H0WXJBDJS2",
      "rfqLineId": "01K9CHAK1RDMTAG6AM124GKCK5",
      "productId": "01K9CHADBVC9ZF1XNKSMQM9B9K",
      "description": "Test product quote",
      "quantity": 10,
      "uom": "EA",
      "unitPrice": 95.0,
      "lineTotal": 950.0,
      "moq": 5,
      "leadTimeDays": 14
    }
  ]
}
✓ Expected status 201 received

Created quote ID: 01K9CHAQ6FY0RFGRD62R285S85
13. Listing quotes for the RFQ...
[GET] http://localhost:8080/rfqs/01K9CHAJAQKQ35EECBD8D5MANF/quotes
Status Code: 200
Response: [
  {
    "id": "01K9CHAQ6FY0RFGRD62R285S85",
    "rfqId": "01K9CHAJAQKQ35EECBD8D5MANF",
    "vendorId": "01K9CHACB6M3JE9M6DSSJAAD40",
    "currency": "USD",
    "validUntil": "2025-12-06T12:12:42.313703Z",
    "status": "submitted",
    "subtotal": 950.0,
    "taxTotal": 0.0,
    "grandTotal": 950.0,
    "notes": "Test quote for E2E",
    "lines": [
      {
        "id": "01K9CHAQ6FJEWYC9H0WXJBDJS2",
        "rfqLineId": "01K9CHAK1RDMTAG6AM124GKCK5",
        "productId": "01K9CHADBVC9ZF1XNKSMQM9B9K",
        "description": "Test product quote",
        "quantity": 10.0,
        "uom": "EA",
        "unitPrice": 95.0,
        "lineTotal": 950.0,
        "moq": 5.0,
        "leadTimeDays": 14
      }
    ]
  }
]
✓ Expected status 200 received

Found 1 quote(s)
14. Accepting the quote...
[POST] http://localhost:8080/rfqs/01K9CHAJAQKQ35EECBD8D5MANF/quotes/01K9CHAQ6FY0RFGRD62R285S85/accept
Status Code: 200
Response: 
✓ Expected status 200 received

Quote accepted successfully
15. Creating order from accepted quote...
[POST] http://localhost:8080/orders
Payload: {
  "quoteId": "01K9CHAQ6FY0RFGRD62R285S85"
}
Status Code: 201
Response: {
  "id": "01K9CHATQ2468WWKSQ1S7M69BY",
  "status": "placed",
  "currency": "USD",
  "subtotal": 950.0,
  "createdAt": "2025-11-06T14:12:47.3484706+02:00",
  "updatedAt": "2025-11-06T14:12:47.3484706+02:00",
  "buyerId": "01K9CHAFY0PJGYCAMV16R333ZF",
  "quoteId": "01K9CHAQ6FY0RFGRD62R285S85",
  "taxTotal": 0.0,
  "grandTotal": 950.0
}
✓ Expected status 201 received

Created order ID: 01K9CHATQ2468WWKSQ1S7M69BY
16. Getting order details...
[GET] http://localhost:8080/orders/01K9CHATQ2468WWKSQ1S7M69BY
Status Code: 200
Response: {
  "id": "01K9CHATQ2468WWKSQ1S7M69BY",
  "status": "placed",
  "currency": "USD",
  "subtotal": 950.0,
  "createdAt": "2025-11-06T12:12:47.348471Z",
  "updatedAt": "2025-11-06T12:12:47.348471Z",
  "buyerId": "01K9CHAFY0PJGYCAMV16R333ZF",
  "quoteId": "01K9CHAQ6FY0RFGRD62R285S85",
  "taxTotal": 0.0,
  "grandTotal": 950.0
}
✓ Expected status 200 received

17. Finding buyer's organization ID...
[GET] http://localhost:8080/users/me
Status Code: 200
Response: {
  "id": "01K9CHAH4PN8JKNQMPSQV91RFK",
  "orgId": "01K9CHAFY0PJGYCAMV16R333ZF",
  "email": "auto_buyer_1762431156@example.com",
  "fullName": "Auto Buyer User",
  "role": "vendor",
  "passwordHash": "$2a$10$97p0umZrGIYHVFidTMtYEupRyW/MoDzcodDspRJzK1TaVranGl6B.",
  "isActive": true,
  "createdAt": "2025-11-06T12:12:37.672361Z",
  "updatedAt": "2025-11-06T12:12:37.672361Z",
  "enabled": true,
  "authorities": [
    {
      "authority": "ROLE_vendor"
    }
  ],
  "username": "auto_buyer_1762431156@example.com",
  "accountNonLocked": true,
  "password": "$2a$10$97p0umZrGIYHVFidTMtYEupRyW/MoDzcodDspRJzK1TaVranGl6B.",
  "accountNonExpired": true,
  "credentialsNonExpired": true
}
✓ Expected status 200 received

Buyer organization ID: 01K9CHAFY0PJGYCAMV16R333ZF
18. Getting buyer wallet balance...
[GET] http://localhost:8080/wallets/01K9CHAFY0PJGYCAMV16R333ZF
Status Code: 200
Response: {
  "id": "01K9CHAWQQ4ARTS0H6NK0QTFP7",
  "orgId": "01K9CHAFY0PJGYCAMV16R333ZF",
  "currency": "USD",
  "balance": 0
}
✓ Expected status 200 received

Wallet ID: 01K9CHAWQQ4ARTS0H6NK0QTFP7, Balance: 0
19. Topping up wallet...
[POST] http://localhost:8080/wallets/01K9CHAWQQ4ARTS0H6NK0QTFP7/topups
Payload: {
  "amount": 1000.0,
  "currency": "USD"
}
Status Code: 404
Response: {
  "detail": "The specified organization does not exist",
  "type": "https://api.example.com/errors/organization-not-found",
  "title": "Organization not found",
  "status": 404,
  "timestamp": "2025-11-06T12:12:50.225300100Z"
}
X Expected status 201, got 404