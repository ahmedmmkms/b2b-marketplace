# P4 — GCC/MENA B2B Marketplace Project Context

## Project Overview

This is a comprehensive B2B marketplace project targeting the GCC/MENA region, designed with an incremental delivery approach. The project aims to launch a VAT-ready, multi-vendor B2B marketplace featuring RFQ→Quote→PO flows, invoicing, wallets/credit limits, and tiered loyalty programs.

### Key Technologies
- **Backend:** Java 21, Spring Boot 3, PostgreSQL 16 (Neon), Redis (Upstash), S3-compatible object storage (Backblaze B2)
- **Frontend:** Angular 18 + Nx, Angular Material + NG-ZORRO, i18n (EN/AR), RTL support
- **Hosting (free tiers):** 
  - Frontend: Cloudflare Pages (GitHub auto-deploy, PR previews)
  - Backend: Koyeb free instance (GitHub auto-deploy)
  - Database: Neon Free (Postgres)
  - Cache/Rate-limit: Upstash Redis Free
  - Object Storage: Backblaze B2

### Architecture
- **Pattern:** Modular monolith (hexagonal architecture) with domains as modules with ports/adapters; planned to split later if needed
- **Domains/Modules:** Catalog, Search (FTS), RFQ/Quote, Orders, Payments, Invoicing/VAT, Wallet/Credit, Loyalty, Identity/Access, Ops/Audit, Shared-Kernel

## Project Structure & Files

The project contains both frontend and backend code:
- `frontend/p4-frontend/`: Angular 18 application with Nx workspace
- `backend/`: Spring Boot 3 application with Java 21
- Planning and specification documents like `P4_Dossier.md`, `Sprint0_Runbook.md`, and `Tasks_Index.md`

## Sprint Planning

The project is organized into multiple sprints:

### Sprint 0 — Setup, Wiring & Scaffolding (Day-0 Live)
Objective: Public site live; CI/CD wired; environments ready; telemetry baseline; feature flags configured.

### Sprint 1 — Foundations & Catalog (2 weeks)
Objective: Domain scaffolds; public read-only catalog browse; vendor onboarding.

### Sprint 2 — RFQ → Quote (2 weeks)
Objective: Buyer registration & company profile; RFQ creation; vendor quotes; quote compare.

### Sprint 3 — Orders & Payments (2 weeks)
Objective: Convert accepted quote to PO/Order; payment gateway; basic Corporate Wallet.

### Sprint 4 — VAT Invoicing (2 weeks)
Objective: VAT engine, invoice sequencing per tax establishment, PDF/exports.

### Sprint 5 — Loyalty & Credit Controls (2 weeks)
Objective: Points earn/burn, tier engine, credit limits & dunning.

### Sprint 6 — Hardening & Open Beta (2 weeks)
Objective: Performance, accessibility/RTL polish, security review, widen access.

## Key Features

### Core Functionality
- Multi-vendor catalog with attributes and media
- Search (Postgres FTS initially; Elasticsearch later)
- RFQ → Vendor Quotes → Compare → PO/Order
- Payments and Corporate Wallet
- VAT invoices & credit notes; finance export
- Tiered loyalty (earn/burn, tier evaluation)
- Arabic/English support with full RTL

### Non-Functional Requirements
- Availability: ≥99.9% monthly
- Performance: Search p95 < 500 ms, Checkout median < 2 s
- Security: OWASP ASVS L2 mindset, RBAC/ABAC, audit logs
- i18n/RTL: All user-facing surfaces dual language + correct collation/sorting
- Observability: Health/ready endpoints, metrics, traces, structured logs

### Data Model
Key entities include:
- Accounts: account, user, role, permission, cost_center
- Catalog: product, product_attr, price_list, inventory_snapshot, media_asset, vendor
- Negotiation: rfq, rfq_line, quote, quote_line, attachment, message_thread
- Orders: order, order_line, tax_breakdown, payment, shipment_stub
- Invoicing: invoice, invoice_line, credit_note, tax_reg, sequence_registry
- Wallet/Credit: wallet, wallet_txn, credit_limit
- Loyalty: loyalty_program, tier, rule, loyalty_txn, reward, coupon

## Building and Running

### Backend (Spring Boot)
- Java 21 with Spring Boot 3
- Maven build system (pom.xml)
- Run with: `./mvnw spring-boot:run` or `java -jar target/p4-backend-0.0.1-SNAPSHOT.jar`
- Environment-specific configurations via application-*.yml profiles
- Database migrations via Flyway

### Frontend (Angular)
- Angular 18 + Nx workspace
- Build with: `ng build` or `nx build landing`
- Development server with: `ng serve` or `nx serve landing`
- Tests with: `ng test` or `nx test landing`

### Development Workflow
1. Clone frontend and backend repositories separately
2. Set up environment variables and secrets as specified in runbooks
3. Follow sprint-specific task lists in the Dossier
4. Use the feature flag system to control functionality rollout

## Development Conventions

### API Principles
- REST/JSON APIs with RFC7807 error responses
- Idempotency keys on payment/order endpoints
- Cursor/keyset pagination using ULIDs
- OpenAPI per module with client SDK generation for Angular

### Naming Conventions
- IDs: ULID strings (sortable)
- Database: snake_case tables/columns; singular tables for entities
- Services/modules: catalog, rfq, quotes, orders, payments, invoicing, wallet, loyalty, identity, shared-kernel

### Feature Flags
Initial feature flag register includes: `catalog.publicBrowse`, `search.enabled`, `rfq.enabled`, `quote.vendorConsole`, `orders.checkout`, `payments.gateway1`, `wallet.basic`, `invoice.vat`, `loyalty.core`, `credit.controls`.

## Key Files and Documentation

- `P4_Dossier.md`: The complete project specification document with detailed requirements, architecture, and sprint plans
- `Sprint0_Runbook.md`: Practical guide for setting up the initial infrastructure and CI/CD
- `Tasks_Index.md`: Reference for all task IDs across sprints

## Current Status

The project is currently in the implementation phase, with Sprint 0 already completed as indicated by the checked items in `Sprint0_Runbook.md`. Both frontend and backend repositories have been set up with basic configurations and dependency structures in place.

## Special Considerations

- The project is designed to operate on free tiers initially while maintaining production readiness
- Strong emphasis on Arabic/English bilingual support and RTL layouts
- VAT compliance requirements for GCC markets
- Modular architecture to allow for future scaling and microservice decomposition
- Comprehensive observability and monitoring requirements from day one
- Object storage using Backblaze B2 with credentials stored in environment variables: B2_ENDPOINT_URL, B2_BUCKET, B2_APPLICATION_KEY, B2_APPLICATION_KEY_ID, B2_ACCOUNT_ID

For all github commits and push, I am the sole contributer "Ahmed Mahmoud", "ahmedmmkms@hotmail.com"