# P4 — GCC/MENA B2B Marketplace (Java + Spring Boot, Angular)
**Delivery Dossier (for Coding Agent)**  
**Date:** 02 Oct 2025 (Africa/Cairo)  
**Mode:** Incremental delivery with **Day-0 live** site on **free tiers** + GitHub CI/CD

---

## 0. Executive Summary
- **Goal:** Launch a VAT-ready, multi-vendor **B2B marketplace** with RFQ→Quote→PO flows, invoicing, wallets/credit limits, and tiered loyalty—**delivered in sprints**, production visible from **Day 0**.
- **Backend:** Java 21, **Spring Boot 3**, PostgreSQL 16 (Neon), Redis (Upstash), S3-compatible object storage (Cloudflare **R2**).  
- **Frontend:** **Angular 18 + Nx**, Angular Material + NG-ZORRO, i18n (EN/AR), RTL.  
- **Hosting (free tiers):**  
  - Frontend: **Cloudflare Pages** (GitHub auto-deploy, PR previews)  
  - Backend: **Koyeb** free instance (GitHub auto-deploy)  
  - Database: **Neon** Free (Postgres)  
  - Cache/Rate-limit: **Upstash Redis** Free  
  - Object Storage: **Backblaze B2**
- **Day-0:** Public landing, status, health checks, telemetry baseline, feature-flag framework wired.

---

## 1. Product Scope
### 1.1 In-Scope (MVP)
- Multi-vendor catalog (attributes, media, approvals)
- Search (Postgres FTS initially; ES later)
- RFQ → Vendor Quotes → Compare → PO/Order
- Payments (gateway #1 sandbox) + Corporate Wallet (basic)
- VAT invoices & credit notes; finance export
- Tiered loyalty (earn/burn, tier evaluation)
- Arabic/English, full **RTL**
- Ops/KYC light, audit trail

### 1.2 Out-of-Scope (MVP)
- Advanced contract pricing engines
- Government e-invoicing submission (bridge later)
- Complex shipment/returns (stub statuses only)

### 1.3 Personas & Roles
Buyer Admin, Buyer Member, Vendor Admin, Vendor Sales, Finance (buyer/vendor), Marketplace Ops.

---

## 2. Non-Functional Requirements
- **Availability:** ≥99.9% monthly
- **Performance Budgets:**  
  - Search p95 < 500 ms  
  - Checkout median < 2 s (warm path)  
  - Cached TTFB < 300 ms for public pages
- **Security/Privacy:** OWASP ASVS L2 mindset, RBAC/ABAC, audit logs, PII encryption at rest, signed URLs
- **Observability:** Health/ready endpoints, metrics, traces, structured logs, synthetic checks
- **i18n/RTL:** All user-facing surfaces dual language + correct collation/sorting
- **Data Retention:** Finance docs immutable; append-only corrections

---

## 3. Architecture Overview
### 3.1 High-Level
- **Modular monolith** (hexagonal): domains as modules with ports/adapters; split later if needed.
- **Domains/Modules:** Catalog, Search (FTS), RFQ/Quote, Orders, Payments, Invoicing/VAT, Wallet/Credit, Loyalty, Identity/Access, Ops/Audit, Shared-Kernel.

### 3.2 Technology
- **Backend:** Spring Web, Spring Data JPA (Hibernate), Validation, Security + OIDC, Cache, Batch; Flyway; ULID IDs; Micrometer; OpenAPI.  
- **Data:** Postgres (Neon), Redis (Upstash), S3 API (R2).  
- **Frontend:** Angular 18 + Nx; Angular Material + NG-ZORRO; ngx-translate; state via signals + query libs.

---

## 4. Data Model (First Cut)
- **Accounts:** account, user, role, permission, cost_center  
- **Catalog:** product, product_attr, price_list, inventory_snapshot, media_asset, vendor  
- **Negotiation:** rfq, rfq_line, quote, quote_line, attachment, message_thread  
- **Orders:** order, order_line, tax_breakdown, payment, shipment_stub  
- **Invoicing:** invoice, invoice_line, credit_note, tax_reg, sequence_registry  
- **Wallet/Credit:** wallet, wallet_txn, credit_limit  
- **Loyalty:** loyalty_program, tier, rule, loyalty_txn, reward, coupon  
- **Value Objects:** Money (currency, amount), TaxLine (jurisdiction, rate, base, amount)

---

## 5. API Principles
- REST/JSON; **RFC7807** errors; ETags/optimistic locking where relevant
- Idempotency keys on payment/order endpoints
- Cursor/keyset pagination (ULID)
- OpenAPI per module; client SDK generation (Angular)

---

## 6. Environments & Free-Tier Map
- **Prod:** `app.p4.yourdomain.com` (Pages); `api.p4.yourdomain.com` (Koyeb)  
- **Staging:** `stg.p4...` (same stack)  
- **Preview:** per PR (Pages preview + Koyeb preview envs)  
- **Secrets:** Koyeb env store, GitHub repo secrets, Pages build vars

---

## 7. Feature Flags (initial register)
- `catalog.publicBrowse`, `search.enabled`, `rfq.enabled`,  
  `quote.vendorConsole`, `orders.checkout`, `payments.gateway1`,  
  `wallet.basic`, `invoice.vat`, `loyalty.core`, `credit.controls`.

---

## 8. KPIs & Telemetry
- **Commercial:** RFQ→Order %, repeat purchase rate, GMV  
- **UX:** search p95, quote turnaround, checkout drop-off  
- **Finance:** invoice generation errors/rejects  
- **Loyalty:** earn/burn ratio, tier distribution, breakage  
- **Ops:** error budget burn, on-call pages/week

---

## 9. Risks & Mitigations
- **Free-tier limits** → keep single API instance; schedule jobs via GH Actions; move to paid only on need.
- **Arabic search quality** → curated synonyms; later ES/OpenSearch.
- **Gateway constraints** → start with sandbox; Wallet/COD path as fallback.
- **Complex pricing pressure** → phased templates; defer.

---

## 10. Definitions
- **DoR (Ready):** Persona, problem, acceptance criteria, UX states, i18n copy, flags, analytics events defined.  
- **DoD (Done):** Tests (unit/integration/e2e) green, accessibility pass (EN/AR), security checks, dashboards & alerts wired, runbook updated, changelog entry.

---

# 11. Sprint Plan (with Task IDs)

> **ID format:** `P4-S{SPRINT}-T{###}` (globally unique)

## **Sprint 0 — Setup, Wiring & Scaffolding (Day-0 Live)**
**Objective:** Public site live; CI/CD wired; environments ready; telemetry baseline; coding agent can start.

### 0.1 Accounts & Projects
- **P4-S0-T001** — Create GitHub org/repos: `p4-frontend`, `p4-backend` (public for free minutes)  
- **P4-S0-T002** — Configure protected branches: `main`, `release/*`; require PR + checks  
- **P4-S0-T003** — Create Cloudflare account (Pages + R2); add custom domain DNS  
- **P4-S0-T004** — Create Koyeb account; link to GitHub org  
- **P4-S0-T005** — Create Neon Postgres project + dev/prod branches  
- **P4-S0-T006** — Create Upstash Redis database (single region close to users)

### 0.2 Frontend (Pages) scaffolding
- **P4-S0-T007** — Initialize Angular 18 + Nx workspace (app: `landing`, libs: `ui`, `i18n`)  
- **P4-S0-T008** — Add Angular Material + NG-ZORRO; set base theme tokens (light/dark)  
- **P4-S0-T009** — Add ngx-translate (EN/AR) + **RTL** strategy; stub copy files  
- **P4-S0-T010** — Wire Cloudflare Pages GitHub integration (auto-deploy; PR previews)  
- **P4-S0-T011** — Create landing + roadmap + status placeholders; “Coming Soon” signup form (stores to R2 JSON or Neon table)  
- **P4-S0-T012** — Configure Pages environment vars: `API_BASE_URL`, `ENV_NAME`, `FLAG_SOURCE`

### 0.3 Backend (Koyeb) scaffolding
- **P4-S0-T013** — Initialize Spring Boot 3 (Java 21) project structure (modules folders, no domain code yet)  
- **P4-S0-T014** — Add starters: web, validation, data-jpa, security, cache, batch, actuator, flyway  
- **P4-S0-T015** — Configure `application-*.yaml` profiles (dev, stg, prod) with env fallbacks  
- **P4-S0-T016** — Define health/ready endpoints (`/actuator/health`, `/actuator/ready`)  
- **P4-S0-T017** — Connect Koyeb app to GitHub; enable auto-deploy on `main`; PR previews on branches  
- **P4-S0-T018** — Provision Neon DB; create users/roles; store DSN as Koyeb secret  
- **P4-S0-T019** — Provision Upstash Redis; store URL/token as Koyeb secret  
- **P4-S0-T020** — Provision R2 bucket; create API token; store keys as Koyeb secret  
- **P4-S0-T021** — Add Flyway baseline migration (empty schema version) to verify DB connectivity  
- **P4-S0-T022** — Add CORS policy for Pages domain (stg/prod)  
- **P4-S0-T023** — Add `/info` endpoint exposing build+git metadata

### 0.4 CI/CD & Quality Gates
- **P4-S0-T024** — GitHub Actions (frontend): lint, type-check, build, upload artifact (Pages auto-publish)  
- **P4-S0-T025** — GitHub Actions (backend): unit tests (JUnit), package, Buildpack/Docker build, deploy to Koyeb, post-deploy smoke (`/actuator/health`)  
- **P4-S0-T026** — Synthetic checks (UptimeRobot/Pingdom) for landing & API health  
- **P4-S0-T027** — Configure Dependabot/SCA; basic SAST step (e.g., CodeQL)

### 0.5 Observability & Ops
- **P4-S0-T028** — Micrometer default metrics; structured JSON logs; request IDs correlation  
- **P4-S0-T029** — OTel tracer stub (exporter can be no-op on free tier)  
- **P4-S0-T030** — Public **status page** (simple static page for now) + incident playbook link  
- **P4-S0-T031** — On-call runbook v0 (how to rollback, rotate secrets, pause deploys)

### 0.6 Feature Flags & Governance
- **P4-S0-T032** — Choose flag source: simple DB table or JSON in R2 for MVP; SDK shims in FE/BE  
- **P4-S0-T033** — Register initial flags (Section 7) and default OFF in prod  
- **P4-S0-T034** — Changelog page auto-update hook (post-deploy job writes version stamp)

**Sprint-0 Acceptance:**  
Live landing at Pages domain; API health “UP” at Koyeb; CI/CD green on push; secrets stored; synthetic checks green; flags available; runbook present.

---

## **Sprint 1 — Foundations & Catalog (2 weeks)**
**Objective:** Domain scaffolds; public **read-only** catalog browse (teaser); vendor onboarding (Ops-only).

- **P4-S1-T001** — Domain skeletons: catalog, search, identity, shared-kernel packages  
- **P4-S1-T002** — DB schemas (Flyway): product, vendor, media_asset, attribute sets  
- **P4-S1-T003** — Batch CSV import (catalog) — staging only; role-gated  
- **P4-S1-T004** — Media uploads to R2; signed URL read; size/type validation  
- **P4-S1-T005** — Public catalog browse API (no price) with Postgres FTS search  
- **P4-S1-T006** — Angular: catalog browse pages (grid/list, facets, pagination, RTL)  
- **P4-S1-T007** — Vendor onboarding (Ops console): KYC-lite forms, approval queue  
- **P4-S1-T008** — Feature flags: `catalog.publicBrowse`, `search.enabled`—rollout plan  
- **P4-S1-T009** — Performance smoke: search p95 under 500 ms on seed dataset  
- **P4-S1-T010** — Analytics events: search queries, filters usage

**Acceptance:** Ops can onboard a vendor + import sample catalog; public users can browse catalog; search returns relevant items; flags control exposure.

---

## **Sprint 2 — RFQ → Quote (2 weeks)**
**Objective:** Buyer registration & company profile; RFQ creation; vendor quotes; quote compare (pilot only).

- **P4-S2-T001** — Auth strategy: OIDC (Keycloak hosted dev **or** email-OTP fallback)  
- **P4-S2-T002** — Entities: rfq, rfq_line, quote, quote_line, message_thread  
- **P4-S2-T003** — RFQ create (attachments to R2); vendor shortlist; validity dates  
- **P4-S2-T004** — Vendor console: submit/edit quote; constraints/moq/expiry  
- **P4-S2-T005** — Buyer quote compare view; accept/decline; audit trail  
- **P4-S2-T006** — Angular: RFQ/Quotes UIs (buyer/vendor) with i18n/RTL  
- **P4-S2-T007** — Flags: `rfq.enabled`, `quote.vendorConsole`  
- **P4-S2-T008** — Audit log append-only for RFQ/Quote actions  
- **P4-S2-T009** — Smoke tests e2e (staging) + synthetic “submit RFQ” probe

**Acceptance:** Pilot buyer can RFQ → receive a vendor quote → compare → accept (no order yet); everything gated via flags.

---

## **Sprint 3 — Orders & Payments (2 weeks)**
**Objective:** Convert accepted quote to **PO/Order**; gateway #1 sandbox; **Wallet basic** path.

- **P4-S3-T001** — Entities: order/order_line, tax_breakdown, payment  
- **P4-S3-T002** — Flow: Accepted Quote → PO → Order statuses (Placed/Confirmed)  
- **P4-S3-T003** — Payment adapter #1 (sandbox) with idempotency keys + webhooks  
- **P4-S3-T004** — Corporate Wallet (basic): manual top-up by Ops; debit at checkout  
- **P4-S3-T005** — Angular: checkout flow (wallet or gateway)  
- **P4-S3-T006** — Flags: `orders.checkout`, `payments.gateway1`, `wallet.basic`  
- **P4-S3-T007** — Synthetic “dry checkout” probe (stg)  
- **P4-S3-T008** — Post-payment order confirmation page + email stubs

**Acceptance:** Pilot buyer places a paid order in prod via gateway #1 or wallet; idempotent payment; webhooks processed.

---

## **Sprint 4 — VAT Invoicing (2 weeks)**
**Objective:** VAT engine (config tables), invoice sequencing per tax establishment, PDF/exports.

- **P4-S4-T001** — VAT config tables (country, classes, rates, rounding)  
- **P4-S4-T002** — Invoice & credit-note generation; sequential numbering per establishment  
- **P4-S4-T003** — PDF render (store to R2, signed access)  
- **P4-S4-T004** — Finance exports (CSV/JSON daily journal)  
- **P4-S4-T005** — Flags: `invoice.vat` + role gating (finance only initially)  
- **P4-S4-T006** — Dashboards: invoice errors, generation latency  
- **P4-S4-T007** — Synthetic “generate invoice” job (stg): validates template

**Acceptance:** Real order → VAT invoice PDF produced and downloadable; finance can export journal.

---

## **Sprint 5 — Loyalty & Credit Controls (2 weeks)**
**Objective:** Points earn/burn, tier engine (nightly), credit limits & dunning.

- **P4-S5-T001** — Entities: loyalty_program, tier, rule, loyalty_txn, reward  
- **P4-S5-T002** — Earn on net eligible spend (exclude taxes/shipping/discounts)  
- **P4-S5-T003** — Burn at checkout (discount line, cap/eligibility rules)  
- **P4-S5-T004** — Tier evaluation job (scheduled via GH Actions cron in free tier)  
- **P4-S5-T005** — Credit limits per company + cost-center sub-limits; soft lock & dunning emails  
- **P4-S5-T006** — Angular: loyalty dashboard widgets + credit limit banners  
- **P4-S5-T007** — Flags: `loyalty.core`, `credit.controls`  
- **P4-S5-T008** — Telemetry: earn/burn ratio, breakage

**Acceptance:** Pilot buyer earns points on orders; sees tier; can redeem at checkout; credit soft locks function.

---

## **Sprint 6 — Hardening & Open Beta (2 weeks)**
**Objective:** Perf, a11y/RTL polish, security review, widen access.

- **P4-S6-T001** — Search tuning; cache headers; DB indexes review  
- **P4-S6-T002** — A11y audit (contrast, focus, keyboard, AR language tags)  
- **P4-S6-T003** — Security sweep (headers, rate-limits, secrets rotation)  
- **P4-S6-T004** — Error budget dashboards + alerts; SLO gates for deploy  
- **P4-S6-T005** — Public API docs (OpenAPI) + client SDK publish  
- **P4-S6-T006** — Lift flags to beta cohort; vendor onboarding outside pilot  
- **P4-S6-T007** — Run restore drill (Neon), object restore from R2

**Acceptance:** SLOs met; open beta enabled; documentation and observability ready.

---

## 12. Detailed Sprint-0 Guide (Runbook for Coding Agent)

### A. GitHub & Repos
1. Create two **public** repos: `p4-frontend`, `p4-backend`.  
2. Branches: `main` (staging), `release/prod` (production).  
3. Protections: require PR, 1 approval, CI green, no direct push to protected.

### B. Cloudflare Pages (Frontend)
1. Connect `p4-frontend` to Pages (GitHub integration).  
2. Build settings: Framework = Angular; Output dir = `dist/apps/landing` (to be aligned after scaffold).  
3. Env vars:  
   - `API_BASE_URL=https://<koyeb-app>.koyeb.app` (staging/prod per env)  
   - `ENV_NAME=stg|prod`  
   - `FLAG_SOURCE=r2://p4-flags/flags.json` (or static JSON)  
4. PR Previews: **ON**.  
5. Custom domain + HTTPS (after DNS ready).

### C. Koyeb (Backend)
1. Create new app from `p4-backend` GitHub repo; choose **Buildpack** or Dockerfile.  
2. Set service to **free instance** (512 MB / ~0.1 vCPU).  
3. Env/Secrets:  
   - `DB_URL=postgres://...` (Neon)  
   - `REDIS_URL=rediss://...` (Upstash)  
   - `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`  
   - `SPRING_PROFILES_ACTIVE=prod`  
   - `SERVER_PORT=8080`  
4. Health checks: `/actuator/health` (startup), `/actuator/ready` (ready).  
5. Auto-deploy on push to `main`; manual promote to `release/prod`.

### D. Neon (Postgres)
1. Create project + branch `prod`.  
2. Create roles: `app_writer`, `app_reader`.  
3. Parameters: UTC timezone; `statement_timeout` conservative (avoid runaway queries).  
4. Store DSN in Koyeb secrets.

### E. Upstash (Redis)
1. Single database nearest to key user region.  
2. TLS URL; set rate-limit budgets to stay under free commands.

### F. Backblaze B2 (Object Storage)
1. Create bucket `p4-prod-assets`.  
2. Create API token (read/write limited to bucket).  
3. Organize prefixes: `/media/`, `/invoices/`, `/flags/`.

### G. CI/CD Blueprints (no code—just pipeline shape)
- **Frontend workflow:** on PR + push to `main`/`release/prod`  
  Steps: `npm ci` → lint → typecheck → build → upload artifact → Pages auto-publish (CF handles)  
- **Backend workflow:** on PR + push to `main`/`release/prod`  
  Steps: setup JDK 21 → `./gradlew test build` → build container (Buildpack) → push (if needed) → trigger Koyeb deploy → poll health endpoint → mark success/fail  
- **Scheduled workflows:** nightly at 02:00 Cairo (cron) — placeholder for tier evaluation/exports until worker exists.

### H. Observability
- Actuator enabled; info endpoint exposes build/git metadata.  
- Structured logs (JSON) with trace IDs; pass `X-Request-ID` from FE.  
- Synthetic checks:  
  - Landing GET 200 < 300 ms TTFB (cache)  
  - API health 200 with `status: UP`

### I. Governance & Docs
- `/docs` folder in both repos: ADRs, runbooks, checklists.  
- Public **changelog** page (Pages) updated on each prod deploy (post-deploy step writes version and PR links).  
- Incident playbook: who/what/when, comms template.

---

## 13. Backlog by Domain (Post-MVP seeds)
- **Search upgrade:** ES/OpenSearch with Arabic analyzer + curated synonyms
- **Payments:** Gateway #2 (local provider), partial captures/refunds
- **Shipments:** carrier webhooks, delivery status
- **Contracts:** price lists per account; negotiated bundles
- **Disputes:** workflow + SLAs
- **E-invoicing:** adapters (ZATCA/ETA/UAE) behind P5 hub

---

## 14. Acceptance Gates by Release
- **Public Browse GA:** search p95 < 500 ms, zero P1 incidents in a week
- **Transactions GA:** idempotent payments, failed-payment < 1% on sandbox
- **VAT GA:** invoice PDF rate-limit safe, zero generation errors on 1k sample
- **Loyalty GA:** points reconciliation variance < 0.1% in audit sample

---

## 15. Open Questions (decide before Sprint 2)
1. Auth: Keycloak dev vs email OTP for MVP?  
2. First payment gateway sandbox?  
3. Initial VAT market (KSA or UAE) for config defaults?  
4. Loyalty thresholds (earn rate, tier cutoffs)?  
5. Data residency hard requirements?

---

### Appendix A — Naming Conventions
- IDs: ULID strings (sortable)  
- Database: snake_case tables/columns; singular tables for entities  
- Services/modules: `catalog`, `rfq`, `quotes`, `orders`, `payments`, `invoicing`, `wallet`, `loyalty`, `identity`, `shared-kernel`

### Appendix B — Environment Variables (summary)
- **Frontend (Pages):** `API_BASE_URL`, `ENV_NAME`, `FLAG_SOURCE`  
- **Backend (Koyeb):** `SPRING_PROFILES_ACTIVE`, `DB_URL`, `REDIS_URL`, `R2_*`, `APP_BASE_URL`, `CORS_ORIGINS`

---

## How to Use This Dossier
1. **Sprint 0**: follow the runbook verbatim—end with a live landing and green CI/CD.  
2. **Coding Agent**: pick tasks by **ID** in priority order per sprint; each task maps to an issue in GitHub with acceptance criteria from this dossier.  
3. Keep all deltas as **ADRs** in `/docs/adr/` and update the changelog on every release.
