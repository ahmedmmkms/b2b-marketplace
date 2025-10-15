# P4 B2B Marketplace Frontend Technical Description

## Purpose and Scope
This document explains how the GCC/MENA B2B Marketplace frontend is structured, how it behaves at runtime, and how to extend or operate it safely. It targets engineers who already understand modern TypeScript and Next.js, and need a canonical reference for this repository.

## Stack Snapshot
- **Framework**: Next.js 14 App Router running on React 18 with server components plus client islands (`app/layout.tsx`, `app/[lng]/layout.tsx`).
- **Language**: TypeScript with strict mode enforced (`tsconfig.json`).
- **Styling**: Tailwind CSS 3 with shadcn/ui primitives and RTL mirroring (`tailwind.config.js`, `styles/globals.css`).
- **State & Data**: TanStack Query for async server state, Zustand for lightweight client state, Zod for validation (`app/query-provider.tsx`, `libs/store/*`, `libs/validation/schemas.ts`).
- **Internationalization**: next-intl with locale-aware routing, middleware, and message catalogs (`middleware.ts`, `app/[lng]/layout.tsx`, `messages/*.json`).
- **Tooling**: Vitest + Testing Library for unit tests, Playwright for E2E smoke, pnpm workspace scripts, and Cloudflare Pages static export (`vitest.config.ts`, `playwright.config.ts`, `next.config.mjs`).

## Application Architecture
### Routing and Layout
- The entry route (`app/page.tsx`) is a language chooser that links to `/en` and `/ar`.
- Locale-specific routing lives under `app/[lng]/`. The layout renders navigation, providers, and switches `dir="rtl"` when the locale is `ar` (`app/[lng]/layout.tsx`).
- `generateStaticParams` in both `app/layout.tsx` and `app/[lng]/layout.tsx` prebuilds static language variants for export compatibility.
- Domain routes (catalog, RFQ, quotes, orders, invoices, wallet, loyalty, admin) sit under each locale folder, keeping server components localized by default.

### Providers and Cross-Cutting Concerns
- `app/client-provider.tsx` wraps all client components with:
  - `A11yProvider` for accessibility preferences (`libs/providers/A11yProvider.tsx`).
  - `FeatureFlagProvider` for runtime toggles (`libs/providers/FeatureFlagProvider.tsx`).
  - `QueryProvider` to share a TanStack Query client with sensible cache defaults (`app/query-provider.tsx`).
  - `NextIntlClientProvider` to hydrate translations on the client.
- Providers guard against double-render during SSR hydration by delaying mount until `useEffect` runs.

### Directory Layout Highlights
```
app/               -> Next.js App Router hierarchy
components/        -> Shared UI blocks (e.g., NavigationHeader)
libs/              -> Cross-cutting libraries (API, i18n, stores, providers, validation, a11y, UI)
messages/          -> Locale message catalogs
scripts/           -> Tooling such as OpenAPI client scaffolding
styles/            -> Tailwind base styles and accessibility utilities
```

## User Interface System
- Tailwind tokens and shadcn/ui mixins define visual primitives; see `libs/ui/button.tsx` for a canonical example using `class-variance-authority` and `tailwind-merge`.
- Global CSS (`styles/globals.css`) wires dark mode variables, high-contrast toggles, reduced-motion fallbacks, and keyboard focus indicators.
- `NavigationHeader` (`components/NavigationHeader.tsx`) demonstrates localized navigation, button use, and responsive layout. Unit coverage resides in `components/__tests__/NavigationHeader.test.tsx`.

## State Management Strategy
- Server state is fetched through React Query hooks exposed in `libs/api/*/service.ts`. Each file co-locates REST helpers, error handling, and TanStack wrappers, returning mock data when the backend is unavailable to keep previews functional.
- Client state uses small Zustand stores, e.g. `libs/store/useCartStore.ts` for cart items and totals, and `libs/store/useUserStore.ts` for authentication status. Stores expose plain functions that can be memoized in React components without context providers.
- `FeatureFlagProvider` holds an in-memory copy of all toggles with environment overrides (`libs/config/featureFlags.ts`). The helper component `components/FeatureFlaggedComponent.tsx` hides sections behind a flag without branching logic in callers.

## Data Layer and Validation
- `libs/config/api.ts` centralizes module endpoints based on `NEXT_PUBLIC_BACKEND_URL`, keeping fetch helpers aligned with backend routing.
- Zod schemas in `libs/validation/schemas.ts` define domain contracts (products, RFQs, quotes, orders, invoices, wallet, loyalty). API hooks should parse server responses through these schemas before exposing them to UI code.
- The `scripts/generate-api-clients.mjs` script scaffolds OpenAPI client placeholders under `libs/api/<module>/index.ts`. Replace the placeholders with generated code from your OpenAPI definitions when the backend is ready.

## Domain Modules
- **Catalog**: `app/[lng]/catalog/page.tsx` renders product cards using translations and placeholder products. A Vitest suite (`app/[lng]/catalog/__tests__/CatalogPage.test.tsx`) verifies the HTML contract. Detailed product pages live under `app/[lng]/product/[id]/page.tsx` with `generateStaticParams` for static export.
- **RFQ & Quotes**: `app/[lng]/rfq/page.tsx` and `app/[lng]/quotes/page.tsx` render tabular RFQ/quote workflows. Buttons are stubbed for future interactivity; feature-flag wrappers can gate vendor console access.
- **Orders & Invoices**: List views in `app/[lng]/orders/page.tsx` and `app/[lng]/invoices/page.tsx` summarize history, statuses, VAT amounts, and actions. They are primed for React Query data once endpoints are live.
- **Wallet & Loyalty**: Grid summaries at `app/[lng]/wallet/page.tsx` and `app/[lng]/loyalty/page.tsx` highlight corporate balances, recent transactions, points, and tier progress.
- **Admin**: `app/[lng]/admin/page.tsx` demonstrates operator tooling by surfacing feature flags with read-only toggles.
- All domain screens currently hydrate with mocked arrays so that static export and story-driven development remain possible without a backend.

## Internationalization & RTL Support
- `middleware.ts` intercepts requests and injects locale prefixes automatically (`localePrefix: 'as-needed'` keeps English at `/` while placing Arabic under `/ar`).
- The next-intl request config (`i18n.ts`, `i18n-request-config.ts`, `src/i18n/request.ts`) loads `messages/en.json` or `messages/ar.json` and raises `notFound()` for unsupported locales.
- Layouts toggle the `dir` attribute and `<html lang>` meta to inform browsers and assistive tech of the writing direction.
- `LanguageSwitcher` inside `libs/i18n/LanguageSwitcher.tsx` uses `useRouter` and `usePathname` to swap locales without a reload.
- When adding new namespaces, extend `libs/i18n/settings.ts` and supply the translations in both JSON catalogs.

## Accessibility & Compliance
- `libs/providers/A11yProvider.tsx` tracks reduce-motion, high-contrast, and font size preferences, applying CSS utility classes globally. This enables future UI components to surface accessibility toggles in settings panels.
- `libs/a11y/utils.ts` offers helpers for focus trapping, focus-visible detection, screen reader announcements, and color contrast checks. Use them inside dialogs or custom widgets to retain WCAG compliance.
- Tailwind layers define reusable `sr-only`, keyboard navigation outlines, and reduced-motion fallbacks.

## Testing & Quality Gates
- **Unit/Component**: Vitest with the React plugin runs JSDOM-based tests. Configuration resides in `vitest.config.ts`, pointing to `tests/setup.ts` for Next.js and next-intl mocks. Run `pnpm test` for watch mode or `pnpm test:run` for CI-friendly execution.
- **E2E**: Playwright scripts in `e2e/example.spec.ts` cover smoke navigation (front page, catalog, locale switch). The Playwright config starts `pnpm dev` automatically and runs cross-browser suites. Invoke with `pnpm e2e`.
- **Static Analysis**: `pnpm lint` and `pnpm typecheck` enforce style and type discipline. ESLint extends `next/core-web-vitals` to catch React-specific anti-patterns.

## Build & Deployment Pipeline
- The app targets static export (`output: 'export'` and `trailingSlash: true` in `next.config.mjs`) so it can run on Cloudflare Pages without a Node server. Images are marked `unoptimized` to satisfy static hosting constraints.
- `cloudflare-pages.config` captures the Pages build command, output directory (`frontend/out`), and critical environment variables. Configure the same values inside the Cloudflare dashboard.
- Deployment flow: `pnpm install` -> `pnpm build` (Next export) -> upload `out/` to Pages. Because translations are pre-generated, ensure `messages/*.json` exist for every locale before building.

## Environment Configuration
Set these variables (locally in `.env.local`, in CI secrets, and in Cloudflare):
- `NEXT_PUBLIC_BACKEND_URL` - REST gateway base URL.
- Optional flags such as `FEATURE_CATALOG_PUBLICBROWSE`, `FEATURE_RFQ_ENABLED`, etc., mirroring keys in `libs/config/featureFlags.ts`.
- Optional telemetry such as `NEXT_PUBLIC_SENTRY_DSN` and `NEXT_PUBLIC_ENVIRONMENT`.

## Developer Workflow Tips
1. Install dependencies with `pnpm install`.
2. Start the dev server via `pnpm dev`; Next.js will serve localized routes at `http://localhost:3000/<locale>`.
3. Use `pnpm api:generate` to refresh placeholder OpenAPI clients whenever backend contracts change.
4. Pair UI development with Vitest (`pnpm test`) to keep coverage tight, and run `pnpm e2e` before releases to smoke-test navigation.
5. When adding a domain module, create Zod schemas first, expose React Query hooks, and hydrate page components with schema-safe data to avoid runtime drift.

## Extension Guidelines
- Respect localized routing: create new screens inside `app/[lng]/<feature>/` and surface translations in every namespace.
- Wrap new client components that need asynchronous data in `use client` modules and prefer React Query hooks over ad-hoc fetch calls.
- Gate experimental features behind the feature flag context so they can be toggled per environment without redeploying.
- For RTL readiness, rely on logical CSS properties or Tailwind utilities rather than manual `margin-left`/`right` declarations.

## Outstanding Integration Points
- API services currently return mock data on fetch failures. Replace mocks with schema parsing (Zod) and real endpoints once the Spring backend stabilizes.
- Authentication flows should wire `useCurrentUser`, `useLogin`, and `useUserStore` together, persisting tokens via cookies or secure storage.
- Payment, invoicing, and loyalty views are ready for React Query queries and mutations once their APIs are exposed.

The codebase is designed so that adding real data sources, expanding locales, or layering in advanced UI remains predictable. Follow the patterns above to keep the frontend maintainable and production-ready.


