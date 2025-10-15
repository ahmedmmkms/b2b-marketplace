# Repository Guidelines

## Project Structure & Module Organization
- `backend/`: Spring Boot API with domain code in `src/main/java`, config in `src/main/resources`, and tests in `src/test`. Use the Maven wrapper (`mvnw`, `mvnw.cmd`) for consistent tooling.
- `frontend/`: Next.js 14 TypeScript app; shared atoms live in `components/`, feature flows in `features/`, translations in `i18n/`, and Playwright specs in `e2e/`.
- `src/`: Legacy Angular localization assets; avoid changes unless decommissioning that client.
- Root Python utilities (`seed_db.py`, `execute_migrations.py`, `verify_seeding.py`) manage migrations; run them from the repository root.

## Build, Test, and Development Commands
- Backend: `cd backend && ./mvnw spring-boot:run -Dspring.profiles.active=dev` starts the API (`./mvnw.cmd` on Windows). Run `./mvnw clean verify` before every PR.
- Frontend: `cd frontend && pnpm install` once, then `pnpm dev` for local work. Use `pnpm build && pnpm start` to exercise the production bundle.
- Data: `python execute_migrations.py` applies Flyway migrations; `python seed_db.py --env dev` and `python verify_seeding.py` prepare and validate sample data.

## Coding Style & Naming Conventions
- Java: 4-space indentation, `PascalCase` classes, `camelCase` members, and packages that mirror the directory tree (`com.marketplace.*`). Keep DTOs and mappers in dedicated subpackages and prefer constructor injection.
- TypeScript/React: `PascalCase` component files (`CompanyCard.tsx`) and `camelCase` hooks/utilities. Co-locate slice-specific helpers under the relevant `features/*` folder.
- Frontend formatting: run `pnpm lint` and `pnpm typecheck` before committing; use `pnpm exec prettier --write .` for Tailwind-heavy files.

## Testing Guidelines
- Backend: place unit/integration tests in `backend/src/test/java`, mirror package paths, and suffix classes with `Tests`. Execute via `./mvnw test`.
- Frontend: use Vitest + Testing Library with specs named `*.test.ts(x)`; `pnpm test` watches locally, `pnpm test:run` matches CI, and `pnpm e2e --reporter=list` runs Playwright after `pnpm exec playwright install`.
- Extend coverage whenever adding service methods or async flows; keep HTTP mocks in `frontend/tests/` fixtures.

## Commit & Pull Request Guidelines
- Keep commits imperative (`Fix`, `Add`) and prefix the module (`frontend:`) when helpful; reference issues with `#123`.
- PRs should show results for `./mvnw clean verify`, `pnpm lint`, and `pnpm test:run`. Provide a concise summary, UI screenshots when relevant, and flag any migration or seeding scripts that must rerun. Tag reviewers for each module touched.

## Environment & Configuration Tips
- Copy the provided `.env.example` files for local secrets and keep credentials out of Git. Review `PRODUCTION_SETUP.md` and `frontend.md` before altering deployment settings.
- Use `python debug_url.py` to confirm database access; run `python flyway_repair.py` when migrations need repair.
