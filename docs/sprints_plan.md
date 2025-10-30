# Mini‑MVP Sprint Plan (3 Sprints, ≤3 Stories Each)

**Scope:** Catalog → RFQ → Quote → Order → Wallet Pay (feature‑flagged exposure)  
**Stack:** Spring Boot 3 (Java 21), Postgres, Redis, R2/B2 object storage, Angular 18, JWT, ULIDs, Micrometer.  
**Principles:** ruthless scope control, one happy path per flow, observable from day 1, flags everywhere.

---

## Release Gates
- **Gate A – Public Browse**: catalog list/detail reachable, performance baseline captured.
- **Gate B – RFQ→Quote**: buyer can create RFQ, vendor submits quote, buyer accepts.
- **Gate C – Order→Wallet Pay**: accepted quote converts to order and is paid via wallet.

---

## Sprint 1 — Public Catalog Teaser (2 weeks)
**Goal:** Live, searchable, read‑only catalog to prove the pipe and seed data.

**User Stories (≤3)**
1. *Browse & search:* As a visitor I can browse a product grid with basic search & facets.
2. *Seed products:* As Ops I can onboard a vendor and import seed products (CSV + media to object storage).
3. *Ops visibility:* As an engineer I can view health/metrics and toggle exposure via feature flags.

**Acceptance**
- `/products` returns paginated items; `/products/{id}` returns details.
- Seed script/endpoint imports ≥50 SKUs with media.
- Actuator health, Micrometer metrics visible; `catalog.publicBrowse`, `search.enabled` flags in place.

**Flags**
- `catalog.publicBrowse`, `search.enabled`

**Endpoints (new/minimal)**
- `GET /products`, `GET /products/{id}`
- `POST /vendors`, `POST /products` (seed path only)
- `GET /actuator/health`, `GET /flags`

**Data**
- `organizations` (vendor), `products` seeded; `feature_flags` populated.

**Risks/Blockers**
- Media upload/signing path; search perf (PG trigram) under seed volume.

**Demo**
- Public browse from a fresh environment; metrics dashboard; toggle flag on/off live.

---

## Sprint 2 — RFQ → Quote (2 weeks)
**Goal:** Registered buyer creates RFQ; invited vendor submits quote; buyer accepts one.

**User Stories (≤3)**
1. *Create RFQ:* As a buyer I can create an RFQ with lines and attachments.
2. *Submit quote:* As a vendor I can submit a quote to an RFQ with prices/MOQs/lead‑times.
3. *Accept quote:* As a buyer I can compare quotes and accept one.

**Acceptance**
- RFQ lifecycle: `draft → issued`.
- At least one quote submitted and visible to buyer.
- Buyer can accept a single quote (RFQ becomes awarded).

**Flags**
- `rfq.enabled`, `quote.vendorConsole`

**Endpoints**
- `POST /rfqs`, `GET /rfqs/{rfqId}`
- `POST /rfqs/{rfqId}/lines`, `POST /rfqs/{rfqId}/issue`
- `GET /rfqs/{rfqId}/quotes`, `POST /rfqs/{rfqId}/quotes`
- `POST /rfqs/{rfqId}/quotes/{quoteId}/accept`

**Data**
- `rfqs`, `rfq_lines`, `quotes`, `quote_lines` working; `rfq_quote_summary` view for compare UI.

**Risks/Blockers**
- Quote math correctness (totals/validity); vendor invitation/auth boundary.

**Demo**
- Buyer creates RFQ; vendor submits quote; buyer accepts; summary view shows winning quote.

---

## Sprint 3 — Convert to Order + Wallet Payment (2 weeks)
**Goal:** Convert accepted quote to order and pay via corporate wallet (single happy path).

**User Stories (≤3)**
1. *Create order:* As a buyer I can convert an accepted quote into an order.
2. *Wallet balance:* As Finance/Ops I can top‑up the buyer wallet; buyer sees balance.
3. *Pay with wallet:* As a buyer I can pay an order using wallet with idempotency key.

**Acceptance**
- Order created one‑to‑one from accepted quote; status `placed/confirmed` path validated.
- Wallet top‑up and debit persisted; payment record created.
- Idempotent wallet pay (retries don’t double‑charge).

**Flags**
- `orders.checkout`, `wallet.basic`

**Endpoints**
- `POST /orders`, `GET /orders/{orderId}`
- `GET /wallets/{orgId}`, `POST /wallets/{orgId}/topups`
- `POST /orders/{orderId}/pay/wallet`

**Data**
- `orders`, `order_lines`, `wallets`, `wallet_transactions`, `payments` minimal set live.

**Risks/Blockers**
- Currency consistency; order/quote integrity; idempotency across replicas.

**Demo**
- Walkthrough: accept quote → create order → wallet top‑up → pay → order confirmed.

---

## Out of Scope for MVP (explicitly parked)
- VAT/e‑invoicing, loyalty/credits, complex shipping/returns, multi‑gateway routing, contract pricing.
- Non‑wallet payments (gateway1 sandbox can be added later behind flag).

---

## Operational Readiness (all sprints)
- Logs: structured JSON; correlation IDs.
- Metrics: request rate, errors, latency (P50/P95), DB QPS, cache hit ratio, wallet balance drift = 0.
- Alerts: health down, error rate spikes, payment failure ratio.

---

## Success Metrics
- Sprint 1: p95 `/products` < 250ms @ 50 RPS seed; crawlable catalog.
- Sprint 2: ≥1 complete RFQ→Quote→Accept path; quote compare view loads < 400ms.
- Sprint 3: 100% idempotent wallet payments; order placement < 1s end‑to‑end (backend).

---

## RACI (MVP thin)
- **Eng**: endpoints, data, tests; **FE**: catalog/RFQ/checkout pages; **Ops**: seed, flags, env; **PM**: scope/acceptance; **QA**: e2e happy‑path.

---

## Definition of Done
- Feature behind flag, API contract in OpenAPI, DB migration applied, unit/integration tests passing, e2e happy‑path recorded, dashboard updated, demo script merged.

---

## Backlog After MVP
- Card gateway (gateway1) GA, shipments/returns, taxation rules, buyer org roles, vendor catalog self‑service.
