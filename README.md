# منصة الشراء المركزي — Centralized Procurement Platform

![License](https://img.shields.io/github/license/ahmedmmkms/b2b-marketplace?style=for-the-badge) ![CI/CD](https://img.shields.io/github/actions/workflow/status/ahmedmmkms/b2b-marketplace/master_b2b-marketplace.yml?label=CI%2FCD&style=for-the-badge) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge) ![Java](https://img.shields.io/badge/Java-ED8B00?logo=openjdk&logoColor=fff&style=for-the-badge) ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff&style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&style=for-the-badge) ![React](https://img.shields.io/badge/React-149ECA?logo=react&style=for-the-badge) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-38BDF8?logo=tailwindcss&logoColor=fff&style=for-the-badge) ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?style=for-the-badge) ![React Query](https://img.shields.io/badge/React%20Query-FF4154?logo=reactquery&logoColor=fff&style=for-the-badge) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=springboot&logoColor=fff&style=for-the-badge) ![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?logo=openapiinitiative&logoColor=fff&style=for-the-badge) ![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?logo=cloudflare&logoColor=fff&style=for-the-badge) ![Azure](https://img.shields.io/badge/Azure_App_Service-0078D4?logo=microsoftazure&logoColor=fff&style=for-the-badge) 

## Table of Contents
- [Overview](#overview)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [API Docs](#api-docs)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Scripts](#scripts)
- [CI/CD](#cicd)
- [Security & Quality](#security--quality)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Overview
Centralized Procurement Platform is a bilingual B2B marketplace that lets enterprise buyers browse catalog data, issue RFQs, compare supplier quotes, convert to orders, and settle wallets/payments through one cohesive workflow. The Next.js 14 frontend ships on Cloudflare Pages for edge-localized RTL/LTR rendering, while a Spring Boot 3 API on Azure App Service orchestrates catalog, RFQ, wallet, and admin capabilities exposed via OpenAPI. Feature flags, JWT auth, and modular services make the solution production-ready while still in pilot/alpha rollout.  

م  
**Live Demo:** [<DEPLOY_URL>](https://b2b-marketplace.pages.dev/en)

## Screenshots
<p align="center">
  <img src="site_screenshots/landing_en.png" width="49%" alt="Landing page (English)">
  <img src="site_screenshots/landing_ar.png" width="49%" alt="Landing page (Arabic RTL)">
</p>
<p align="center"><sub>Hero experience highlighting buyers vs. suppliers in both LTR and RTL layouts.</sub></p>
<p align="center">
  <img src="site_screenshots/catalog_en.png" width="49%" alt="Catalog browsing">
</p>
<p align="center"><sub>Catalog & search workspace with feature-flagged RFQ entry points.</sub></p>

## Architecture
```mermaid
flowchart LR
  User[(Buyer / Supplier / Admin)]
  UI[Next.js App<br/>shadcn/ui · React Query · Zustand · next-intl]
  Edge[Cloudflare Pages/Workers<br/>Routing · Caching · Edge Functions]
  API[Spring Boot API<br/>OpenAPI / Swagger]
  SVC1[Catalog Service]
  SVC2[RFQ & Orders Service]
  SVC3[Payments & Wallets]
  AUTH[AuthN/Z · JWT · Spring Security]
  DB[(PostgreSQL + Flyway)]
  OBJ[(Backblaze B2 Storage)]
  MQ[(Async Tasks / Redis Streams)]
  EXT[[3rd Parties<br/>Payments · Email · SMS]]
  User --> UI --> Edge --> API
  API --> AUTH
  API --> SVC1 --> DB
  API --> SVC2 --> DB
  API --> SVC3 --> DB
  API --> OBJ
  API --> MQ
  API --> EXT
```

```mermaid
graph TD
  repo[/b2b-marketplace/]
  frontend[/frontend<br/>app · features · libs · stores · tests/]
  backend[/backend<br/>src/main · src/test · config/]
  docs[/docs<br/>openapi · plans/]
  scripts[/scripts & seed<br/>python tooling/]
  repo --> frontend
  repo --> backend
  repo --> docs
  repo --> scripts
```

## API Docs
**Swagger/OpenAPI:** <SWAGGER_URL> (spec in [docs/openapi.yaml](docs/openapi.yaml))  
Regenerate client hooks via `pnpm gen:api` (Next.js) and refresh server contracts with `./mvnw verify` (Spring Boot).

## Features
- Role-aware navigation for buyers, suppliers, and admins with JWT session storage and feature flags.
- Catalog browsing, deep product attributes, debounced search, and public/preview gating via `catalog.publicBrowse`.
- RFQ → quote → order workflow, including supplier inbox, quote comparison, approvals, and wallet-backed checkout.
- Wallet balances, payments integration (`wallet.basic`, `payments.gateway1`), and invoice/VAT/credit controls toggled at runtime.
- next-intl localization + Tailwind RTL utilities provide instant Arabic ↔ English switching with accessible typography.
- Responsive shadcn/ui system, toast-driven UX, and React Query caching for offline-friendly interactions.

## Tech Stack
| Frontend | Backend & Infra |
| --- | --- |
| Next.js 14.2.5, React 18.3, TypeScript 5.4, shadcn/ui, Tailwind CSS 3.4, React Query 5, Zustand 4, next-intl, pnpm 8, Vitest, Playwright, ESLint + Prettier | Spring Boot 3.2, Java 21, Maven Wrapper, Spring Security/JWT, Micrometer + Prometheus, Flyway, PostgreSQL, Redis/Upstash, Backblaze B2, OpenAPI 3, Docker, Cloudflare Pages, Azure App Service |

## Quick Start
### Prerequisites
- Node.js 18.17+ (CI runs on 22.x) with `corepack enable` or pnpm ≥ 8.15
- Java 21 + Maven Wrapper (`./mvnw`)
- PostgreSQL 15+ (or Neon/Cloud DB) and Redis (optional, feature-flag friendly)
- Python 3.11+ for database seed scripts

### Frontend (Cloudflare-ready Next.js)
```bash
cd frontend
pnpm install
pnpm dev   # http://localhost:3000/en
pnpm lint && pnpm typecheck && pnpm test:unit && pnpm e2e
```

### Backend (Spring Boot API)
```bash
cd backend
./mvnw flyway:migrate
./mvnw spring-boot:run  # API at http://localhost:8080
```

## Scripts
| Target | Command | Purpose |
| --- | --- | --- |
| Frontend | `pnpm dev` | Next.js dev server with locale + feature-flag bootstrap |
| Frontend | `pnpm build` / `pnpm start` | Production build + preview (Cloudflare Pages output) |
| Frontend | `pnpm lint`, `pnpm typecheck`, `pnpm test:unit`, `pnpm e2e` | Quality gates (ESLint, TS, Vitest, Playwright) |
| Frontend | `pnpm gen:api` | Regenerate typed API clients & React Query hooks from OpenAPI |
| Backend | `./mvnw spring-boot:run` | Run API with hot reload |
| Backend | `./mvnw verify` | Unit + integration tests, Flyway validation |
| Tooling | `python3 seed/scripts/seed_data.py` | Bootstrap database + feature flags |

## CI/CD
- **ci-cd.yml** — pnpm lint/typecheck/test/build, Playwright e2e, and Cloudflare Pages deployment.
- **monorepo.yml** — Full-stack pipeline with Postgres service, Maven verify, frontend lint/tests, and Azure-ready deploy artifact.
- **flyway-repair.yml** — Manual Neon DB repair guardrail.
- **master_b2b-marketplace.yml** — Build + deploy the Spring Boot JAR to Azure App Service.

## Security & Quality
- Spring Security + JWT, request filtering by feature flag (catalog/search/RFQ) and strict CORS.
- Secrets isolated via GitHub Actions + Cloudflare secrets; object storage handled through Backblaze B2 credentials.
- Micrometer/Actuator expose metrics for Prometheus; CI enforces ESLint, TypeScript, Vitest, Playwright, and Maven verify.
- Run local accessibility/performance audits with `pnpm dlx @lhci/cli autorun` (update Lighthouse baselines before PRs).
- Coding standards: Prettier, ESLint strict config, and imperative commit subjects per repository guidelines.

## Roadmap
- Vendor onboarding wizard with document verification and SLA policies.
- Advanced federated search (semantic filters, saved views, Arabic morphology tweaks).
- Quote negotiation threads with notifications (email/SMS) and audit trails.
- Order orchestration with split shipments, partial invoices, and credit approval workflows.
- Analytics dashboards (spend, supplier KPIs) plus export to BI tools.
- In-app announcements + feature flag rollout console surfaced to admins.
- Payment gateway expansion (Stripe, HyperPay) and multi-currency wallets.
- Compliance automation: e-invoicing, tax codes, and retention policies.

## License
Released under the [MIT License](LICENSE).

---
By Ahmed Mahmoud — [![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin&style=for-the-badge)](https://www.linkedin.com/in/ahmedmmkms/) · 
