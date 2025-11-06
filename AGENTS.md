# Repository Guidelines

## Project Structure & Module Organization
The monorepo is split into `backend/` (Spring Boot 3 service under `src/main/java/com/p4/backend/...`) and `frontend/` (Next.js app in `app/` and `features/`). Shared documentation lives in `docs/`, automation in `scripts/`, environment configs in `config/`, and seed datasets under `seed/`. Tests outside app-specific directories reside in `tests/` and `e2e_tests/` for cross-cutting suites.

## Build, Test & Development Commands
- `cd backend && ./mvnw spring-boot:run` - start the API with hot reload and profile detection.
- `cd backend && ./mvnw verify` - compile, run unit/integration tests, and enforce package-level checks.
- `cd frontend && npm install` - sync React/Next dependencies after pulls.
- `cd frontend && npm run dev` - launch the Next.js dev server on :3000 with internationalization enabled.
- `cd frontend && npm run test` - execute Vitest unit suites; prefer `npm run test:run` in CI for fail-fast runs.
- `cd frontend && npm run e2e` - execute Playwright journeys stored in `frontend/e2e/`.

## Coding Style & Naming Conventions
Backend Java follows 4-space indentation, package-per-domain under `com.p4.backend`, and uses Lombok sparingly inside `common/`. Keep REST controllers named `*Controller`, orchestrating services `*Service`, and DTOs in `shared/dto`. Frontend TypeScript relies on ESLint/Prettier; React components live in `frontend/app/**` and `frontend/features/**` with PascalCase filenames, hooks in `frontend/utils/**` prefixed `use`. Tailwind utility classes stay within `.tsx` files; surface shared tokens via `frontend/styles/`.

## Testing Guidelines
Author backend tests with JUnit 5 in `backend/src/test/java`, mirroring package structure and suffixing classes with `Tests`. Mock external systems through Spring `@MockBean` and seed fixtures from `seed/data`. Frontend unit tests co-locate with components as `*.test.tsx`. Playwright specs live in `frontend/e2e/` and should tag storefront flows via `test.describe`. Target >80% line coverage for catalog, orders, and payments modules, and gate PRs with `./mvnw verify` plus `npm run test:run`.

## Commit & Pull Request Guidelines
Use concise, imperative commit subjects (`Remove log files`, `Add wallet support`). Split backend and frontend commits when the diff is substantial. Every PR should outline intent, link the relevant issue, attach UI screenshots or recordings, enumerate touched feature flags, and list the commands run locally. Request review from both backend and frontend maintainers when shared contracts change.

## Security & Configuration Tips
Do not commit `.env` secrets or environment files beneath `config/**`; rely on checked-in samples. Rotate credentials documented in `docs/runbooks/` after each release and record updates. When enabling new feature flags, set fallbacks in `config/dev/` and describe rollout steps in the PR.
