# P4 Frontend

This is the frontend application for the P4 B2B marketplace, built with Angular 18 and Nx.

## Architecture

The frontend follows an Nx monorepo architecture with the following main features:
- **Landing**: Main landing page
- **Catalog**: Product browsing and search
- **RFQ**: Request for Quotation forms
- **Orders**: Order management
- **Account**: User account management
- **Shared**: Shared UI components and utilities
- **I18N**: Internationalization support (EN/AR)

## Running the Application

### Prerequisites
- Node.js 18+
- npm or yarn

### Environment Configuration
The application uses the following environment variables:

```
API_BASE_URL=https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net
ENV_NAME=development
FEATURE_FLAGS_SOURCE=backend
```

### Installing dependencies
```bash
npm install
```

### Running locally
```bash
ng serve
```

### Building the application
```bash
ng build
```

### Running tests
```bash
ng test
```

## Internationalization (i18n)

The application supports English and Arabic with proper RTL layout for Arabic.

## UI Components

The UI uses Angular Material and NG-ZORRO components with a consistent design system.