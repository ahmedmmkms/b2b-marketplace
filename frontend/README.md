# Frontend (Next.js 14)

A production-ready Next.js 14 + TypeScript application for the B2B marketplace Mini-MVP API. It supports full i18n (EN/AR), role-aware navigation, RFQ/Quote/Order flows, and wallet management.

## Getting Started

```bash
pnpm install
pnpm gen:api
pnpm dev
```

- App runs on http://localhost:3000.
- Backend base URL defaults to `https://api.example.com`. Override via `NEXT_PUBLIC_API_BASE_URL`.

## Code Generation

`pnpm gen:api` runs:

1. `openapi-typescript ../docs/openapi.yaml -o libs/api/types.ts`
2. `orval --config libs/api/orval.config.ts`

Generated code lives under `libs/api`. Always re-run after backend contract changes.

## Development Commands

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `pnpm dev`         | Launch Next.js dev server                |
| `pnpm build`       | Build for production                     |
| `pnpm start`       | Start production server                  |
| `pnpm test:unit`   | Vitest unit tests                        |
| `pnpm test:e2e`    | Playwright happy-path journey            |
| `pnpm typecheck`   | TypeScript type checking                 |
| `pnpm lint`        | ESLint                                   |
| `pnpm format`      | Prettier format                          |

## Architecture Highlights

- **App Router** with `[lng]` locale segment, `next-intl` for messaging and routing.
- **TanStack Query** for server state, **Zustand** for auth & feature flags.
- **Axios** client with interceptors, RFC7807 error mapping, and session persistence via `/api/session`.
- **Tailwind CSS + shadcn/ui** components themed for a MENA B2B marketplace.
- **Feature Flags** hydrated on layout load and accessible via store selectors.
- **RTL Support** using logical CSS, mirrored icons, and Cairo font.

## Testing

- Unit tests cover auth hooks, catalog query helpers, and RFQ form validation.
- Playwright E2E script outlines the buyer/supplier happy path (login → RFQ → quote → order → wallet pay).
- Configure `E2E_BASE_URL` to point at a running dev server before launching Playwright.

## Internationalization & RTL

See `docs/i18n.md` for translation workflows, message organization, and RTL conventions. English (LTR) and Arabic (RTL) bundles reside in `messages/`.

## Feature Flags

Flags are fetched from `/flags` and stored in Zustand. Refer to `docs/feature-flags.md` for naming, defaults, and rollout guidance.

## Environment

Copy `.env.example` to `.env.local` and adjust values per environment. Never commit secrets; use environment configuration tooling.

## Directory Structure

```
frontend/
  app/            # App router pages & layouts
  components/     # Shared UI & layout primitives
  features/       # Domain-specific UI/logic
  libs/           # API clients, stores, utilities
  messages/       # next-intl message bundles
  styles/         # Tailwind & design tokens
```
