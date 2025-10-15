# P4 — GCC/MENA B2B Marketplace: Sprint 4-6 Planned Tasks

## Sprint 4 — VAT Invoicing (2 weeks)
**Objective:** VAT engine (config tables), invoice sequencing per tax establishment, PDF/exports.

### Original Tasks
- **P4-S4-T001** — VAT config tables (country, classes, rates, rounding)
- **P4-S4-T002** — Invoice & credit-note generation; sequential numbering per establishment
- **P4-S4-T003** — PDF render (store to R2, signed access)
- **P4-S4-T004** — Finance exports (CSV/JSON daily journal)
- **P4-S4-T005** — Flags: `invoice.vat` + role gating (finance only initially)
- **P4-S4-T006** — Dashboards: invoice errors, generation latency
- **P4-S4-T007** — Synthetic "generate invoice" job (stg): validates template

### Additional Tasks
- **P4-S4-T008** — VAT calculation engine integration with orders
- **P4-S4-T009** — Invoice email notifications to customers
- **P4-S4-T010** — Invoice search and filtering functionality for finance team
- **P4-S4-T011** — VAT reporting dashboard for finance users

---

## Sprint 5 — Loyalty & Credit Controls (2 weeks)
**Objective:** Points earn/burn, tier engine (nightly), credit limits & dunning.

### Original Tasks
- **P4-S5-T001** — Entities: loyalty_program, tier, rule, loyalty_txn, reward
- **P4-S5-T002** — Earn on net eligible spend (exclude taxes/shipping/discounts)
- **P4-S5-T003** — Burn at checkout (discount line, cap/eligibility rules)
- **P4-S5-T004** — Tier evaluation job (scheduled via GH Actions cron in free tier)
- **P4-S5-T005** — Credit limits per company + cost-center sub-limits; soft lock & dunning emails
- **P4-S5-T006** — Angular: loyalty dashboard widgets + credit limit banners
- **P4-S5-T007** — Flags: `loyalty.core`, `credit.controls`
- **P4-S5-T008** — Telemetry: earn/burn ratio, breakage

### Additional Tasks
- **P4-S5-T009** — Loyalty program configuration UI for marketplace ops
- **P4-S5-T010** — Customer loyalty history and transaction view
- **P4-S5-T011** — Credit limit approval workflow for marketplace ops
- **P4-S5-T012** — Automated credit limit adjustment based on payment history

---

## Sprint 6 — Hardening & Open Beta (2 weeks)
**Objective:** Perf, a11y/RTL polish, security review, widen access.

### Original Tasks
- **P4-S6-T001** — Search tuning; cache headers; DB indexes review
- **P4-S6-T002** — A11y audit (contrast, focus, keyboard, AR language tags)
- **P4-S6-T003** — Security sweep (headers, rate-limits, secrets rotation)
- **P4-S6-T004** — Error budget dashboards + alerts; SLO gates for deploy
- **P4-S6-T005** — Public API docs (OpenAPI) + client SDK publish
- **P4-S6-T006** — Lift flags to beta cohort; vendor onboarding outside pilot
- **P4-S6-T007** — Run restore drill (Neon), object restore from R2

### Additional Tasks
- **P4-S6-T008** — Frontend complete redesign and rebuild with elegant landing page and catchy theme
- **P4-S6-T009** — Implement advanced search features with faceted filtering
- **P4-S6-T010** — Performance optimization and bundle size reduction
- **P4-S6-T011** — Integration testing for all major user flows
- **P4-S6-T012** — Comprehensive end-to-end testing automation

---

### Frontend Complete Redesign & Rebuild Requirements (P4-S6-T008)
**Objective:** Redesign and rebuild the frontend from scratch with a fancy, elegant landing page and a catchy theme.

- Implement modern UI/UX design principles with focus on user experience
- Create an elegant, professional landing page with compelling value proposition
- Develop a catchy and consistent theme throughout the application
- Implement responsive design for all device sizes
- Enhance accessibility (a11y) compliance for all UI components
- Optimize page load times and performance metrics
- Implement RTL (right-to-left) support for Arabic language
- Integrate with the existing backend APIs
- Ensure consistent design language across all pages and components
- Create reusable UI components library
- Implement smooth animations and transitions
- Add interactive elements to improve user engagement
- Ensure brand consistency across all touchpoints