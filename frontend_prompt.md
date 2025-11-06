You are a senior Frontend Architect. Generate a complete, production-ready Next.js 14 + TypeScript app that consumes the attached OpenAPI spec at ./openapi.yaml.

## ROLE
Act as a meticulous implementer. Output only files (paths + full contents). No explanations.

## BACKEND CONTRACT (from ./docs/openapi.yaml)
- API name & scope: “Mini-MVP API” with JWT bearer security; public health and some public catalog allowed. Base server: https://api.example.com. :contentReference[oaicite:0]{index=0}
- Health & flags:
  - GET /actuator/health (no auth). :contentReference[oaicite:1]{index=1}
  - GET /flags (feature flags). :contentReference[oaicite:2]{index=2}
- Identity:
  - POST /auth/login → JwtResponse; 401 on invalid. :contentReference[oaicite:3]{index=3}
  - POST /auth/register → JwtResponse; 409 on duplicate. :contentReference[oaicite:4]{index=4}
  - GET /users/me → User (auth required). :contentReference[oaicite:5]{index=5}
- Catalog (public + flagged):
  - GET /products (pagination; q, category). (Scope described in plan; implement list view.) :contentReference[oaicite:6]{index=6}
  - GET /products/{id} (detail). :contentReference[oaicite:7]{index=7}
- RFQ → Quotes:
  - POST /rfqs (create), GET /rfqs/{rfqId} (get). :contentReference[oaicite:8]{index=8}
  - POST /rfqs/{rfqId}/lines (add line). :contentReference[oaicite:9]{index=9}
  - POST /rfqs/{rfqId}/issue (issue draft). :contentReference[oaicite:10]{index=10}
  - Vendor: POST /rfqs/{rfqId}/quotes (create quote). Buyer: GET /rfqs/{rfqId}/quotes (list). Accept: POST /rfqs/{rfqId}/quotes/{quoteId}/accept. :contentReference[oaicite:11]{index=11} :contentReference[oaicite:12]{index=12} :contentReference[oaicite:13]{index=13}
- Orders → Wallet Pay:
  - POST /orders (from accepted quote). GET /orders/{orderId}. POST /orders/{orderId}/pay/wallet. :contentReference[oaicite:14]{index=14} :contentReference[oaicite:15]{index=15} :contentReference[oaicite:16]{index=16}
- Wallets (if present in spec; else feature-flag and mock):
  - GET /wallets/{orgId} (balance), POST /wallets/{orgId}/topups (top up). (From project plan; implement behind flag if missing in spec.) :contentReference[oaicite:17]{index=17}

## TECH STACK
- Next.js 14 (App Router) + TypeScript
- Tailwind + shadcn/ui (Radix)
- next-intl for i18n (EN/AR), full RTL (mirror icons where needed)
- TanStack Query for server state; Zustand for light client state
- React Hook Form + Zod; Axios with interceptors
- openapi-typescript + orval to generate typed clients & React Query hooks from ./openapi.yaml

## BRAND & RTL
- Brand for a B2B provider marketplace (MENA). Color tokens: primary #2363EB, accent #00B894, semantic (success/warn/danger), gray scale.
- Typography: Inter (latin) + Cairo (arabic). Apply `<html lang={lng} dir={isRTL ? 'rtl' : 'ltr'}>` with logical CSS and icon mirroring.
- Dark mode via media query; accessible contrasts.

## PROJECT SCAFFOLD
Create a single `frontend/` app:
frontend/
  app/
    [lng]/
      layout.tsx
      page.tsx                 # Home (value props, CTA)
      catalog/
        page.tsx               # Product list (search, filters, pagination)
      product/[id]/page.tsx    # Product detail
      rfq/                     # Buyer
        page.tsx               # RFQ list
        new/page.tsx           # Create RFQ (multi-line)
      quotes/                  # Buyer (received)
        page.tsx               # Compare & accept
      supplier/quotes/inbox/page.tsx  # Vendor inbox
      orders/
        page.tsx
        [orderId]/page.tsx
      wallet/page.tsx
      auth/
        signin/page.tsx
        register/page.tsx
      admin/
        dashboard/page.tsx
        users/page.tsx
        feature-flags/page.tsx
    providers.tsx
    query-provider.tsx
  libs/
    api/                       # generated types & hooks
    i18n/
    config/
    store/
    utils/
  components/
    common/ (AppShell, PageHeader, DataTable, EmptyState, LanguageSwitcher, ConfirmDialog, Toast)
    ui/ (shadcn exports)
  messages/{en,ar}.json
  styles/{globals.css,tokens.css}
  public/{brand-logos}

## CODEGEN (must run & compile)
- Add script `pnpm gen:api` to:
  1) `openapi-typescript ./docs/openapi.yaml -o libs/api/types.ts`
  2) `orval --config libs/api/orval.config.ts`
- Configure orval to emit **React Query hooks per endpoint** (e.g., `useLogin`, `useProducts`, `useProduct`, `useCreateRfq`, `useAddRfqLine`, `useIssueRfq`, `useCreateQuote`, `useListQuotes`, `useAcceptQuote`, `useCreateOrder`, `useGetOrder`, `usePayOrderWithWallet`, `useFeatureFlags`, `useMe`).

## HTTP CLIENT
- Axios base uses env `NEXT_PUBLIC_API_BASE_URL` (default to `https://api.example.com`). Inject JWT from HttpOnly cookie (prefer) or localStorage fallback; add CSRF header if using localStorage.
- Interceptor behavior:
  - 401 → redirect to /auth/signin (unless `skipAuthRedirect`).
  - 5xx → global toast.
  - Map RFC7807 errors into `ApiError` for forms (show field errors).

## ROUTING & GUARDS
- Public routes: `/[lng]`, `/[lng]/catalog`, `/[lng]/product/[id]` (but hide/deny if `catalog.publicBrowse=false`). :contentReference[oaicite:18]{index=18}
- Protected routes require JWT; role-aware side nav (buyer vs supplier vs admin).
- Feature flags integrated from GET /flags: `catalog.publicBrowse`, `search.enabled`, `rfq.enabled`, `wallet.basic`, etc. :contentReference[oaicite:19]{index=19}

## PAGES → API HOOKS (exact wiring)

### Auth
- Sign in form → POST /auth/login → store token; then GET /users/me to seed user store. :contentReference[oaicite:20]{index=20} :contentReference[oaicite:21]{index=21}
- Sign up form → POST /auth/register (handle 409). :contentReference[oaicite:22]{index=22}

### Catalog
- Catalog list: GET /products with `page`, `pageSize`, `q`, `category`. Debounced search; gate search by `search.enabled`. :contentReference[oaicite:23]{index=23}
- Product detail: GET /products/{id}. :contentReference[oaicite:24]{index=24}

### RFQ (Buyer)
- Create RFQ: POST /rfqs → returns rfq; then POST /rfqs/{rfqId}/lines (repeatable); finally POST /rfqs/{rfqId}/issue. Show RFC7807 errors. :contentReference[oaicite:25]{index=25}
- RFQ details page uses GET /rfqs/{rfqId}.

### Quotes
- Vendor inbox: POST /rfqs/{rfqId}/quotes to submit; prevent duplicate per vendor; show totals. :contentReference[oaicite:26]{index=26}
- Buyer view: GET /rfqs/{rfqId}/quotes (sort by grand_total asc); Accept: POST /rfqs/{rfqId}/quotes/{quoteId}/accept (idempotent). :contentReference[oaicite:27]{index=27} :contentReference[oaicite:28]{index=28} :contentReference[oaicite:29]{index=29}

### Orders & Payments
- Create order from accepted quote: POST /orders → 201 + Order. View order: GET /orders/{orderId}. Wallet pay: POST /orders/{orderId}/pay/wallet. :contentReference[oaicite:30]{index=30} :contentReference[oaicite:31]{index=31} :contentReference[oaicite:32]{index=32}

### Wallet (if present in spec; else mock behind `wallet.basic`)
- Balance: GET /wallets/{orgId}; Top up: POST /wallets/{orgId}/topups. If not in current OpenAPI, generate mocked service toggled by flag. :contentReference[oaicite:33]{index=33}

## i18n & RTL
- Use next-intl with `[lng]` segment; provide `/messages/en.json` and `/messages/ar.json`.
- At runtime, set `<html lang={lng} dir={lng==='ar'?'rtl':'ltr'}`. Use Cairo for `ar`, Inter for `en`.
- Localize dates/numbers; translate Zod & server errors.

## COMPONENTS TO BUILD
- AppShell (TopNav with language switcher + SideNav with role-based items)
- PageHeader (title, breadcrumbs, primary/secondary actions)
- DataTable (server pagination, selection, CSV export)
- EmptyState (icon, title, description, action)
- ConfirmDialog, Toast, Badge, KPI Stat Cards
- QuoteCompare table (vendor, unit price, lead time, shipping, total) with Accept action

## TESTS (must pass)
- Unit: auth hooks, catalog list query, RFQ form validation.
- E2E (Playwright): login → create RFQ → add lines → issue → vendor submits quote → buyer accepts → create order → wallet pay (happy-path aligns with endpoints above).

## SCRIPTS
- package.json:
  - dev, build, start
  - lint, format, typecheck
  - gen:api (as above)
  - test:unit (Vitest), test:e2e (Playwright)

## ACCEPTANCE CRITERIA
- `pnpm i && pnpm gen:api && pnpm dev` runs clean.
- EN/AR switch flips layout & loads localized strings.
- Auth flow works against /auth/* and /users/me; private routes protected. :contentReference[oaicite:34]{index=34} :contentReference[oaicite:35]{index=35}
- Catalog list/detail fetch real data; search toggle respects `search.enabled`; public browse respects `catalog.publicBrowse`. :contentReference[oaicite:36]{index=36}
- RFQ→Quote→Accept→Order→WalletPay works via the exact endpoints named above (idempotent accept). :contentReference[oaicite:37]{index=37} :contentReference[oaicite:38]{index=38} :contentReference[oaicite:39]{index=39}
- Add READMEs: setup, codegen, i18n/RTL, feature flags, env (.env.example with NEXT_PUBLIC_API_BASE_URL).

## OUTPUT FORMAT
Return files with paths and full contents. Include:
- the current frontend folder is ./frontend
- libs/api/orval.config.ts configured to emit React Query hooks named after the paths above.
- Example pages wired to real hooks, plus a small mocked wallet module behind `wallet.basic` if wallet endpoints are not in ./openapi.yaml yet.
