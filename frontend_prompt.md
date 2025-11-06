You are a senior Frontend Architect. Generate a complete, production-ready Next.js 14 + TypeScript app from scratch that consumes the attached OpenAPI spec at ./doc/openapi.yaml.

## ROLE
Act as a meticulous implementer. Output only files (paths + full contents). No explanations.

## CONTRACT (from ./doc/openapi.yaml)
- Base server: https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net with JWT bearer security. Public health route is open. (See servers/security & /actuator/health). 
- Identity: POST /auth/login, POST /auth/register, GET /users/me. 
- Ops/Flags: GET /flags for feature flags. 
- Catalog: GET /products (q, category, page, pageSize), GET /products/{id}.
- RFQ: POST /rfqs, GET /rfqs/{rfqId}, POST /rfqs/{rfqId}/lines, POST /rfqs/{rfqId}/issue.
- Quotes: POST /rfqs/{rfqId}/quotes, GET /rfqs/{rfqId}/quotes, POST /rfqs/{rfqId}/quotes/{quoteId}/accept (idempotent).
- Orders/Wallet: POST /orders, GET /orders/{orderId}, POST /orders/{orderId}/pay/wallet.

## STACK
- Next.js 14 App Router + TypeScript
- Tailwind + shadcn/ui (Radix)
- next-intl (EN/AR) with full RTL: <html lang={lng} dir={lng==='ar'?'rtl':'ltr'}>
- TanStack Query for server state; Zustand for light client state
- React Hook Form + Zod
- Axios with interceptors
- openapi-typescript + orval to generate typed clients & React Query hooks from ./doc/openapi.yaml

## BRAND
- B2B provider marketplace (MENA). Tokens: primary #2363EB, accent #00B894, semantic (success/warn/danger), gray scale.
- Fonts: Inter (latin) + Cairo (arabic). Dark mode (media).

## ROUTES & FEATURES (gate via feature flags)
Public:
- /[lng]  (hero + value props)
- /[lng]/catalog  (list with search & filters; hide search if search.enabled=false)
- /[lng]/product/[id]
Private (buyer):
- /[lng]/rfq, /[lng]/rfq/new  (create → add lines → issue)
- /[lng]/quotes  (received; compare & accept)
- /[lng]/orders, /[lng]/orders/[orderId]
- /[lng]/wallet
Private (supplier):
- /[lng]/supplier/quotes/inbox  (submit quote)
Admin:
- /[lng]/admin/dashboard, /users, /feature-flags

## CODEGEN
- Add script `pnpm gen:api`:
  1) `openapi-typescript ./doc/openapi.yaml -o libs/api/types.ts`
  2) `orval --config libs/api/orval.config.ts` to emit React Query hooks:
     useLogin, useRegister, useMe, useFeatureFlags,
     useProducts, useProduct,
     useCreateRfq, useGetRfq, useAddRfqLine, useIssueRfq,
     useCreateQuote, useListQuotes, useAcceptQuote,
     useCreateOrder, useGetOrder, usePayOrderWithWallet

## HTTP CLIENT
- Axios base from env `NEXT_PUBLIC_API_BASE_URL` (defaults to https://api.example.com).
- Interceptors:
  - Inject JWT (HttpOnly cookie preferred; localStorage fallback + X-CSRF header).
  - 401 → redirect to /auth/signin (skippable per-request).
  - 5xx → global toast.
  - Map RFC7807 to ApiError for forms.

## i18n & RTL
- next-intl with [lng] segment, /messages/{en,ar}.json.
- Runtime dir flip and Cairo/Inter font swap.
- Localize dates/numbers; Zod + server errors translated.

## COMPONENTS
- AppShell (TopNav with LanguageSwitcher, SideNav with role-aware items)
- PageHeader (title, breadcrumbs, actions)
- DataTable (server pagination + CSV export)
- EmptyState, ConfirmDialog, Toast, KPI Stat Cards
- QuoteCompare table (vendor, unit price, lead time, shipping, total) with Accept action

## PROJECT TREE
frontend/
  app/
    [lng]/
      layout.tsx
      page.tsx
      catalog/page.tsx
      product/[id]/page.tsx
      rfq/{page.tsx,new/page.tsx}
      quotes/page.tsx
      orders/{page.tsx,[orderId]/page.tsx}
      supplier/quotes/inbox/page.tsx
      wallet/page.tsx
      admin/{dashboard/page.tsx,users/page.tsx,feature-flags/page.tsx}
      auth/{signin/page.tsx,register/page.tsx}
    providers.tsx
    query-provider.tsx
  libs/
    api/ (generated)
    i18n/
    config/
    store/
    utils/
  components/
    common/ (AppShell, PageHeader, LanguageSwitcher, DataTable, EmptyState, ConfirmDialog, Toast)
    ui/
  messages/{en,ar}.json
  styles/{globals.css,tokens.css}
  public/brand

## WIRED EXAMPLES (must compile)
- Catalog page uses useProducts; Product detail uses useProduct.
- RFQ create flow: useCreateRfq → useAddRfqLine (repeat) → useIssueRfq.
- Quotes: supplier submits with useCreateQuote; buyer lists with useListQuotes; accept via useAcceptQuote.
- Orders: useCreateOrder from accepted quote; detail via useGetOrder; pay with usePayOrderWithWallet.
- Flags: useFeatureFlags gating catalog.publicBrowse, search.enabled, rfq.enabled, wallet.basic.

## TESTS
- Vitest unit tests: auth hooks, catalog list query, RFQ form validation.
- Playwright E2E: login → create RFQ → add lines → issue → supplier submits quote → buyer accepts → create order → wallet pay.

## SCRIPTS
- dev, build, start
- lint, format, typecheck
- gen:api
- test:unit, test:e2e

## ACCEPTANCE
- `pnpm i && pnpm gen:api && pnpm dev` runs clean.
- EN/AR switch flips layout & content; dir toggles correctly.
- Auth flow works; private routes protected.
- Catalog list/detail, RFQ→Quote→Accept→Order→WalletPay all work against generated hooks.

## OUTPUT FORMAT
Return files (paths + full contents) in ./frontend folder. Include libs/api/orval.config.ts and realistic example pages wired to the hooks. If any endpoint is not yet present, scaffold UI behind a feature flag with mocked data and clear TODOs.
