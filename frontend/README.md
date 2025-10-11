# P4 - GCC/MENA B2B Marketplace Frontend

This is the frontend for the P4 B2B Marketplace, a VAT-ready, multi-vendor marketplace designed for the GCC/MENA region.

## Technology Stack

- **Framework**: Next.js 14 (App Router) with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS with RTL support via tailwindcss-rtl, shadcn/ui components
- **State Management**: TanStack Query (server caching), Zustand (light client state), Zod (schema validation)
- **i18n/RTL**: next-intl with locales en, ar; automatic dir switching and number/date formatting
- **Forms**: React Hook Form + Zod resolver
- **Dates**: Day.js with locales (en, ar)
- **Auth**: JWT/OAuth2 bearer support compatible with Spring Security
- **API Integration**: OpenAPI clients per backend module

## Directory Structure

```
frontend/
  app/                      # Next.js App Router
    (public)/
      catalog/[…slug]/page.tsx
      product/[id]/page.tsx
    account/…
    rfq/…
    quotes/…
    orders/…
    payments/…
    invoices/…
    wallet/…
    loyalty/…
    admin/…
    layout.tsx
    page.tsx
  components/               # Shared React components
  features/                 # Per-domain feature folders
  libs/                     # Shared libraries
    api/                    # OpenAPI-generated clients per module
    i18n/                   # i18n config, messages
    ui/                     # Shared UI widgets
    config/                 # Configuration files
    providers/              # React context providers
    store/                  # Zustand stores
    validation/             # Zod schemas
  public/                   # Static assets
  styles/                   # Global styles
  tests/                    # Test utilities
  e2e/                      # End-to-end tests
  scripts/                  # Build scripts
  next.config.mjs           # Next.js configuration
  tailwind.config.ts        # Tailwind CSS configuration
  package.json              # Project dependencies and scripts
  tsconfig.json             # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 20+ (recommended: use Node.js 22)
- pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd p4-frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env.local` file in the `frontend/` directory with the following content:
   ```env
   # Backend API Base URL (all API endpoints will be constructed from this base)
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8080

   # Feature flags (optional, can be overridden by environment)
   FEATURE_CATALOG_PUBLICBROWSE=true
   FEATURE_SEARCH_ENABLED=true
   FEATURE_RFQ_ENABLED=true
   FEATURE_QUOTE_VENDORCONSOLE=false
   FEATURE_ORDERS_CHECKOUT=false
   FEATURE_PAYMENTS_GATEWAY1=false
   FEATURE_WALLET_BASIC=true
   FEATURE_INVOICE_VAT=false
   FEATURE_LOYALTY_CORE=true
   FEATURE_CREDIT_CONTROLS=false
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Available Scripts

In the `frontend/` directory, you can run:

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm test` - Run unit tests in watch mode
- `pnpm test:run` - Run unit tests once
- `pnpm test:ui` - Run unit tests with UI
- `pnpm e2e` - Run end-to-end tests
- `pnpm api:generate` - Generate OpenAPI clients

## Internationalization (i18n)

The application supports Arabic and English languages with full RTL support:

- Translation files are located in the `messages/` directory
- Translation keys are organized by namespace (HomePage, Navigation, etc.)
- The LanguageSwitcher component allows users to switch between languages
- All components automatically handle RTL layout for Arabic
- Dates and numbers are formatted according to the selected locale

## Feature Flags

This application uses a feature flag system to enable/disable functionality:

- Configuration is in `libs/config/featureFlags.ts`
- Flags can be controlled via environment variables
- Use `useFeatureFlag` hook to check if a feature is enabled
- Use `FeatureFlaggedComponent` to conditionally render UI elements

Available flags:
- `catalog.publicBrowse` - Enable public catalog browsing
- `search.enabled` - Enable search functionality
- `rfq.enabled` - Enable RFQ features
- `quote.vendorConsole` - Enable vendor quote console
- `orders.checkout` - Enable order checkout
- `payments.gateway1` - Enable payment gateway 1
- `wallet.basic` - Enable basic wallet features
- `invoice.vat` - Enable VAT invoicing
- `loyalty.core` - Enable core loyalty features
- `credit.controls` - Enable credit controls

## API Integration

OpenAPI clients are generated for each backend module:
- Catalog: `/libs/api/catalog/`
- RFQ: `/libs/api/rfq/`
- Quotes: `/libs/api/quotes/`
- Orders: `/libs/api/orders/`
- Payments: `/libs/api/payments/`
- Invoicing: `/libs/api/invoicing/`
- Wallet: `/libs/api/wallet/`
- Loyalty: `/libs/api/loyalty/`
- Identity: `/libs/api/identity/`

To regenerate clients, run:
```bash
pnpm api:generate
```

## Testing

### Unit Tests
Unit tests are written with Vitest and React Testing Library. Place tests in `__tests__` directories alongside components.

Run unit tests:
```bash
pnpm test
```

### End-to-End Tests
E2E tests are written with Playwright. Place tests in the `e2e/` directory.

Run E2E tests:
```bash
pnpm e2e
```

## Deployment

The application is configured for deployment on Cloudflare Pages:

1. Connect your GitHub repository to Cloudflare Pages
2. Set the build configuration:
   - Build command: `cd frontend && pnpm build`
   - Build output directory: `frontend/out`
3. Set environment variables in the Cloudflare dashboard as described above
4. The GitHub Actions workflow will automatically deploy when changes are pushed to main

## Angular → React Migration Notes

This project represents a migration from an Angular 18 + Nx frontend to a React stack. Here's what changed:

### Architecture Changes
- Replaced Angular modules with Next.js App Router structure
- Replaced Angular services with React hooks and Zustand stores
- Replaced Angular components with React components and shadcn/ui
- Replaced Angular dependency injection with React Context API and hooks

### Feature Mappings
- Angular `feature-catalog` → Next.js `/catalog` routes and components
- Angular `feature-rfq` → Next.js `/rfq` routes and components
- Angular `feature-quotes` → Next.js `/quotes` routes and components
- Angular `feature-orders` → Next.js `/orders` routes and components
- Angular `feature-invoicing` → Next.js `/invoices` routes and components
- Angular `feature-wallet` → Next.js `/wallet` routes and components
- Angular `feature-loyalty` → Next.js `/loyalty` routes and components
- Angular `feature-identity` → Next.js `/account` routes and components

### Internationalization Changes
- Replaced Angular i18n with next-intl
- Translation files moved from `assets/i18n/*.json` to `messages/*.json`
- Translation functions changed from `TranslateService` to `useTranslations` hook

### Styling Changes
- Replaced Angular Material with shadcn/ui and Tailwind CSS
- Replaced SCSS with Tailwind utility classes
- Added RTL support using logical properties

### API Integration Changes
- Replaced Angular HttpClient with React Query and fetch APIs
- Replaced Angular services with custom React hooks
- Added OpenAPI client generation for type safety

### Running Both Ends Locally
To run both frontend and backend locally:
1. Start the backend: `cd backend && ./mvnw spring-boot:run`
2. Start the frontend: `cd frontend && pnpm dev`
3. Access the frontend at `http://localhost:3000`
4. The backend APIs are available at `http://localhost:8080`

## Environment Variables

### Required
- `NEXT_PUBLIC_BACKEND_URL` - Base URL for all backend API endpoints

### Optional
- `NEXT_PUBLIC_ENVIRONMENT` - Current environment (development, staging, production)
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN for error tracking
- Feature flag environment variables (see above)

## Performance & Observability

- The application includes performance tracking for key metrics
- Build SHA and commit links are exposed in a diagnostics page
- Feature flags are logged for debugging
- API request/response metadata is logged for observability

## Security Considerations

- All API calls use HTTPS in production
- JWT tokens are stored securely in httpOnly cookies where possible
- Input validation is implemented with Zod schemas
- OWASP ASVS L2 principles are followed

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Run `pnpm lint` and `pnpm typecheck` to ensure code quality
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## License

This project is licensed under the MIT License.