# AI Agent Task Plan – Mini‑MVP (3 Sprints)
**Source of truth:**  
- DB schema: `/docs/db_schema.md`  
- API contract: `/docs/openapi.yaml`  
- Sprint scope: `/doc/sprints_plan.md`

**Conventions for every task**
- Keep code style default (no lint changes).  
- No new deps unless explicitly stated.  
- Add small unit tests where noted.  
- All endpoints must match `openapi.yaml` exactly.  
- Use ULIDs as strings; no DB-generated IDs.  
- Return RFC7807 error bodies for 4xx/5xx.
- Mention if any env variables or secrets are required to be added at deployment 

---

## Sprint 1 — Public Catalog Teaser

### T1. Create DB migrations (Catalog + Orgs + Flags)
**Context:** PostgreSQL migrations folder.  
**Inputs:** `db_schema.md` sections: organizations, users, products, feature_flags, helpers (ulid domain & updated_at trigger).  
**Steps:**
1) Add migration `V001__core.sql` with the exact SQL for domains, trigger, organizations, users.  
2) Add `V002__catalog.sql` with products table + indexes + trigger.  
3) Add `V003__feature_flags.sql` with table + trigger.  
**DoD:** Migrations apply cleanly on empty DB; `psql \dt` shows 4 tables + domain + triggers.

### T2. Boot app skeleton + health
**Inputs:** None.  
**Steps:** Initialize Spring Boot app; enable `/actuator/health` (readiness + liveness).  
**DoD:** `GET /actuator/health` returns `{"status":"UP"}`.

### T3. FeatureFlag repository + controller (read-only)
**Inputs:** `openapi.yaml` `/flags` GET.  
**Steps:** JPA entity for `feature_flags` (`key`, `value` JSONB), repository, controller `GET /flags`.  
**DoD:** `GET /flags` returns an array; empty OK.

### T4. Seed scripts: vendor + products
**Inputs:** CSV path `seed/products.csv`.  
**Steps:** CLI runner reads CSV, creates one vendor org, inserts ≤50 products with media URL placeholders.  
**DoD:** Running seeder creates 1 vendor + ≥50 products idempotently.

### T5. Catalog browse endpoint
**Inputs:** `openapi.yaml` `/products` GET.  
**Steps:** Implement paging, optional `q`, `category`. Use `name ILIKE` and JSONB attributes contains for facets.  
**DoD:** `GET /products?page=1&pageSize=20` returns list with `total`; empty search works.

### T6. Catalog detail endpoint
**Inputs:** `/products/{id}` GET.  
**Steps:** Fetch by ULID; 404 with RFC7807 if missing.  
**DoD:** Returns full product JSON schema-compliant.

### T7. Admin create vendor
**Inputs:** `/vendors` POST.  
**Steps:** Minimal payload `{name}`; create organization with role `vendor`.  
**DoD:** 201 with created vendor JSON.

### T8. Admin create product
**Inputs:** `/products` POST.  
**Steps:** Validate `vendorId`, `sku`, `name`; upsert on same `(vendorId, sku)` is rejected with 409.  
**DoD:** 201 with product JSON; 409 on duplicate.

### T9. React public catalog page
**Inputs:** T5/T6.  
**Steps:** Build `CatalogListComponent` (grid, search input); `CatalogDetailComponent`.  
**DoD:** List renders cards; detail route shows fields from API.

### T10. Toggle exposure via flags
**Inputs:** Flags `catalog.publicBrowse`, `search.enabled`.  
**Steps:** Add server middleware to check flags and allow/deny `/products*`; FE hides search if `search.enabled=false`.  
**DoD:** Disabling flag hides/breaks route with friendly message.

---

## Sprint 2 — RFQ → Quote

### T11. DB migrations (RFQs, RFQ lines, Quotes, Quote lines, View)
**Inputs:** `db_schema.md` RFQ/Quotes + `rfq_quote_summary` view.  
**Steps:** Add `V004__rfq_and_quotes.sql` for 4 tables + indexes + triggers + view.  
**DoD:** Migrations apply on Sprint‑1 DB; `\d rfqs` etc. exist.

### T12. RFQ create + get
**Inputs:** `/rfqs` POST, `/rfqs/{rfqId}` GET.  
**Steps:** Entities/DTOs; create in `draft`; attach buyer/user from JWT claims.  
**DoD:** 201 returns RFQ with empty `lines`; 200 fetch by id.

### T13. RFQ add line
**Inputs:** `/rfqs/{rfqId}/lines` POST.  
**Steps:** Validate `quantity>0`, `uom` nonempty; link to RFQ.  
**DoD:** 201 with created line; RFQ GET shows lines array including new line.

### T14. RFQ issue
**Inputs:** `/rfqs/{rfqId}/issue` POST.  
**Steps:** Transition `draft→issued`; forbid if no lines.  
**DoD:** 200 on success; 409 RFC7807 if invalid state.

### T15. Submit quote
**Inputs:** `/rfqs/{rfqId}/quotes` POST.  
**Steps:** Validate vendor auth; create quote with lines; compute `line_total`, `subtotal`, `grand_total`.  
**DoD:** 201 with computed totals; re‑POST same vendor returns 409 (one quote per vendor/RFQ).

### T16. List quotes for RFQ (buyer)
**Inputs:** `/rfqs/{rfqId}/quotes` GET.  
**Steps:** Query quotes + lines; include totals; sort by `grand_total asc`.  
**DoD:** 200 array; empty OK.

### T17. Accept quote
**Inputs:** `/rfqs/{rfqId}/quotes/{quoteId}/accept` POST.  
**Steps:** Mark quote `accepted`; others `rejected`; RFQ → `awarded`.  
**DoD:** 200; idempotent (re‑call keeps state).

### T18. React RFQ create
**Inputs:** T12/T13/T14.  
**Steps:** Form: title, notes; add line(s); issue.  
**DoD:** RFQ issued shows success; validation errors surfaced.

### T19. React Quotes view & accept
**Inputs:** T15/T16/T17.  
**Steps:** Table compares price, MOQ, lead time; action to accept.  
**DoD:** Accept updates UI to “Awarded: Vendor X”.

### T20. Flags
**Inputs:** `rfq.enabled`, `quote.vendorConsole`.  
**Steps:** Guard backend controllers + FE routes.  
**DoD:** With flags off, route hidden and API returns 404/403 (choose one consistently).

---

## Sprint 3 — Order + Wallet Pay

### T21. DB migrations (Orders, Order lines, Wallets, Wallet tx, Payments)
**Inputs:** `db_schema.md` Orders + Wallets + Payments.  
**Steps:** Add `V005__orders_wallets_payments.sql`.  
**DoD:** Tables exist; constraints enforced.

### T22. Create order from accepted quote
**Inputs:** `/orders` POST.  
**Steps:** Validate quote `accepted`; create order + order_lines from quote_lines; copy totals; status `placed`.  
**DoD:** 201 returns order; unique constraint prevents duplicates per quote.

### T23. Get order
**Inputs:** `/orders/{orderId}` GET.  
**Steps:** Basic fetch.  
**DoD:** 200 returns schema-compliant order JSON; 404 if missing.

### T24. Wallet API – get balance
**Inputs:** `/wallets/{orgId}` GET.  
**Steps:** Create wallet if absent (zero balance).  
**DoD:** 200 with balance number.

### T25. Wallet API – top-up
**Inputs:** `/wallets/{orgId}/topups` POST.  
**Steps:** Insert `wallet_transactions` type `topup`; update balance (transactionally); create `payments` row optional.  
**DoD:** 201 returns tx; balance increases exactly by amount.

### T26. Pay order with wallet (idempotent)
**Inputs:** `/orders/{orderId}/pay/wallet` POST with `idempotencyKey`.  
**Steps:** If key exists for same order, return previous response. Otherwise: check balance≥amount; create `payments` row, debit wallet, set order `confirmed`.  
**DoD:** 200 succeeded or 409 insufficient funds; second call with same key returns same result.

### T27. React – checkout page
**Inputs:** T22–T26.  
**Steps:** Show order summary; wallet balance; pay button; error states.  
**DoD:** End‑to‑end demo: accept quote → create order → top‑up → pay → success screen.

### T28. Observability hardening
**Inputs:** Micrometer + logging.  
**Steps:** Add structured logs for each write op; counters for success/fail; timer for endpoints.  
**DoD:** Metrics visible; correlation ID in logs.

### T29. E2E happy‑path test script
**Inputs:** curl or Postman collection.  
**Steps:** Script covering: seed → browse → RFQ → quote → accept → order → top‑up → pay.  
**DoD:** Single command executes flow with 0 failures.

---

## Notes for Agents
- For all 404/409/422 cases, return RFC7807 with `type`, `title`, `status`, `detail`.  
- Keep controllers thin; move calculations (totals, idempotency) into services.  
- Add minimal unit tests for totals math and idempotent pay.
