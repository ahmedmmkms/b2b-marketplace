# P4 GCC/MENA B2B Marketplace - Frontend

The frontend for the P4 GCC/MENA B2B Marketplace, built with Angular 18 and Nx. This is a comprehensive B2B marketplace targeting the GCC/MENA region with features like RFQ→Quote→PO flows, invoicing, wallets/credit limits, and tiered loyalty programs.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [Testing](#testing)
- [Internationalization (i18n)](#internationalization-i18n)
- [Feature Flags](#feature-flags)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Features

- **Bilingual Support**: Full English/Arabic with RTL layout
- **Modular Architecture**: Nx workspace with feature libraries
- **Feature Flags**: Runtime-configurable features
- **Enterprise Branding**: Desert sunrise to royal blue color palette
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG AA compliant
- **Performance Optimized**: Lazy loading, code splitting, caching
- **Type Safety**: Strict TypeScript configuration
- **Security**: HTTP-only tokens, CSRF protection
- **Performance Monitoring**: Core Web Vitals tracking

## Architecture

The frontend follows a modular monolith pattern with:
- `apps/landing` - Public-facing landing application
- `libs/ui` - Shared UI components (header, footer, etc.)
- `libs/data-access` - API services, models, and authentication
- `libs/feature-*` - Domain-specific feature libraries
- `libs/util` - Utility functions for date, currency, collation
- `libs/styles` - Global styles, tokens, and mixins

## Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Angular CLI

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
pnpm install
# OR if using npm
npm install
```

3. Set up environment variables (copy `.env.example` to `.env` and update values)

## Development

To start the development server:

```bash
pnpm start
# OR
npm start
```

This will start the landing application on `http://localhost:4200`.

### Development Commands

- `pnpm start` - Start development server
- `pnpm build` - Build the application
- `pnpm test` - Run unit tests
- `pnpm lint` - Run linting
- `pnpm nx serve landing` - Serve specific app
- `pnpm nx build landing` - Build specific app

## Build

To create a production build:

```bash
pnpm build
```

The build artifacts will be stored in the `dist/apps/landing` directory.

### Production Build with Specific Configuration

```bash
pnpm nx build landing --configuration=production
```

## Testing

### Unit Tests

Run unit tests with:

```bash
pnpm test
```

Or for a specific project:

```bash
pnpm nx test landing
```

### End-to-End Tests

TODO: Add e2e testing setup using Playwright

### Linting

Run linting checks:

```bash
pnpm lint
```

## Internationalization (i18n)

The application supports English and Arabic with RTL layout.

### Available Languages

- English (en) - default
- Arabic (ar) - with RTL support

### Switching Languages

Language can be switched at runtime using the language switcher in the header. The application will:
- Update the `lang` attribute on the HTML element
- Update RTL direction (`dir` attribute)
- Update Ng-Zorro locale
- Update Angular Material directionality
- Preserve language in localStorage and URL

### Adding New Translations

1. Add new keys to `apps/landing/src/assets/i18n/en.json`
2. Add corresponding translations to `apps/landing/src/assets/i18n/ar.json`
3. Use in templates: `{{ 'key.name' | translate }}`

## Feature Flags

The application uses a feature flag system to control functionality:

### Available Flags

- `catalog.publicBrowse` - Public catalog browsing
- `search.enabled` - Search functionality
- `rfq.enabled` - RFQ creation and management
- `quote.vendorConsole` - Vendor quote management
- `orders.checkout` - Order checkout process
- `payments.gateway1` - Payment gateway integration
- `wallet.basic` - Wallet and credit features
- `invoice.vat` - VAT invoicing system
- `loyalty.core` - Loyalty program features
- `credit.controls` - Credit limit management

### Using Feature Flags

In templates:
```html
<a *p4FfIf="'rfq.enabled'" routerLink="/rfq">RFQ</a>
```

In routes:
```typescript
{
  path: 'rfq',
  canActivate: [FeatureFlagGuard],
  data: { feature: 'rfq.enabled' },
  loadChildren: () => import('@p4/frontend/feature-rfq').then(m => m.RFQ_ROUTES)
}
```

### Runtime Configuration

Feature flags can be configured at:
1. Build time via environment variables
2. Runtime via `/assets/flags.json`
3. URL parameters: `?ff=rfq.enabled:on,search.enabled:off`

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
API_BASE_URL=https://your-api-url.com
LOCALE_DEFAULT=en
FF_JSON_URL=/assets/flags.json
SENTRY_DSN=your-sentry-dsn
APP_BRAND_NAME=Your Brand Name
```

## Deployment

### Cloudflare Pages Deployment

The application is configured for deployment to Cloudflare Pages:

1. Connect your GitHub repository to Cloudflare Pages
2. Set build configuration:
   - Build command: `npm run build`
   - Build output directory: `dist/apps/landing/browser`
   - Root directory: `/frontend` (if deployed from this subdirectory)

### Environment-Specific Builds

```bash
# Production build
npm run build -- --configuration=production

# Development build
npm run build -- --configuration=development
```

## Troubleshooting

### Common Issues

#### 1. Language Switching Not Working
- Check that `LanguageService` is properly injected
- Verify locale data is registered in `main.ts`
- Ensure `LOCALE_ID` is provided in app config

#### 2. Feature Flags Not Working
- Verify the flag name matches exactly
- Check that `FeatureFlagGuard` is applied to routes
- Ensure `FfIfDirective` is imported in the module/component

#### 3. RTL Layout Issues
- Check that `dir` attribute is set on HTML element
- Ensure CSS logical properties are used instead of physical ones
- Verify RTL-specific overrides are in place

#### 4. Build Errors
- Ensure all dependencies are installed
- Check TypeScript configuration
- Verify path mappings in `tsconfig.base.json`

### Development Tools

- Angular DevTools for debugging components
- Network tab for API request inspection
- Console for feature flag and i18n debugging

### Performance Monitoring

- Lighthouse scores (aim for Performance ≥90, Accessibility ≥95)
- Core Web Vitals monitoring
- Bundle size analysis with `npm run build -- --stats-json`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with appropriate tests
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.