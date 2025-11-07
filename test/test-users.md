# Test Users

This document lists reusable credentials for exercising the API under different personas. The JSON block at the end is consumed by automated tests.

| Role | Email | Password | Description |
| ---- | ----- | -------- | ----------- |
| admin | admin@admin.com | 112233445566 | Platform administrator with full access |
| buyer | buyer@test.example | 112233445566 | Buyer profile for RFQ flows (auto-fallback seeds disposable account if login blocked) |
| vendor | vendor@test.example | 112233445566 | Vendor profile used for catalog authoring |
| support | support@test.example | 112233445566 | Support operations account for read-only checks |

```json
{
  "admin": {
    "email": "admin@admin.com",
    "password": "112233445566",
    "description": "Platform administrator with full access"
  },
  "buyer": {
    "email": "buyer@test.example",
    "password": "112233445566",
    "description": "Buyer profile for RFQ flows (tests auto-provision a fallback account if login fails)"
  },
  "vendor": {
    "email": "vendor@test.example",
    "password": "112233445566",
    "description": "Vendor profile used for catalog authoring"
  },
  "support": {
    "email": "support@test.example",
    "password": "112233445566",
    "description": "Support operations account for read-only checks"
  }
}
```
