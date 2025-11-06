# B2B Marketplace Project Context

## Project Overview

The P4 B2B Marketplace is a comprehensive B2B marketplace targeting the GCC/MENA region, built with Java 21/Spring Boot 3 (backend) and Next.js (frontend), contrary to what's mentioned in the README which states Angular 18/Nx. The project uses a modular monolith architecture with an incremental delivery approach to launch a VAT-ready, multi-vendor B2B marketplace featuring RFQ→Quote→PO flows, invoicing, wallets/credit limits, and tiered loyalty programs.

## Architecture & Technology Stack

### Backend
- **Language**: Java 21
- **Framework**: Spring Boot 3 (version 3.2.0)
- **Database**: PostgreSQL 16 with ULID identifiers
- **Cache**: Redis
- **Object Storage**: Backblaze B2
- **Build Tool**: Maven
- **Security**: Spring Security with JWT Authentication
- **Monitoring**: Micrometer with Prometheus metrics
- **Database Migration**: Flyway

### Frontend
- **Framework**: Next.js (contrary to README documentation)
- **Language**: TypeScript
- **State Management**: Jotai, Zustand
- **UI Components**: Radix UI, Lucide React, shadcn/ui
- **Styling**: Tailwind CSS with RTL support
- **API Client**: TanStack Query
- **Forms**: React Hook Form with Zod validation

## Project Structure

```
b2b-marketplace/
├── backend/                 # Java 21/Spring Boot 3 application
│   ├── src/main/java/com/p4/backend/
│   │   ├── catalog/         # Product catalog management
│   │   ├── identity/        # Authentication and authorization
│   │   ├── orders/          # Order processing
│   │   ├── quotes/          # Quote management (note: separate from rfq)
│   │   ├── rfq/             # Request for Quotation
│   │   ├── wallet/          # Corporate wallet
│   │   ├── common/          # Shared components
│   │   └── config/          # Configuration classes
│   ├── src/main/resources/  # Backend resources
│   ├── pom.xml              # Maven build configuration
│   └── README.md            # Backend-specific documentation
├── frontend/                # Next.js application
│   ├── pages/               # Next.js pages
│   ├── components/          # React components
│   ├── lib/                 # Business logic and utilities
│   ├── public/              # Public assets
│   ├── styles/              # Global styles
│   ├── package.json         # Frontend dependencies
│   └── README.md            # Frontend-specific documentation
├── docs/                    # Documentation
│   ├── sprints_plan.md      # Sprint planning and user stories
│   ├── db_schema.md         # Database schema documentation
│   └── openapi.yaml         # API specification
├── scripts/                 # Utility scripts
├── docker/                  # Docker configuration files
├── config/                  # Configuration files for different environments
├── e2e_tests/               # End-to-end tests
└── tests/                   # Unit and integration tests
```

## Key Features & Modules

### Core Business Domains:
1. **Catalog**: Product catalog management with search and faceting
2. **Identity**: Authentication and authorization with JWT
3. **RFQ**: Request for Quotation functionality
4. **Quotes**: Quote submission and management
5. **Orders**: Order processing system
6. **Wallet**: Corporate wallet for payments
7. **Search**: Product search capabilities
8. **Invoicing**: VAT-compliant invoice generation
9. **Loyalty**: Loyalty and rewards system
10. **Payments**: Payment processing system

### API Structure (OpenAPI 3.0):
- `/auth/*` - Authentication endpoints
- `/users/me` - User profile management
- `/products/*` - Product catalog
- `/rfqs/*` - Request for Quotation
- `/quotes/*` - Quote management
- `/orders/*` - Order processing
- `/wallets/*` - Wallet functionality
- `/payments/*` - Payment processing
- `/actuator/*` - Health and monitoring endpoints

## Database Schema

The database uses PostgreSQL 16+ with ULIDs (Universally Unique Lexicographically Sortable Identifiers) as primary keys. Key tables include:

- `organizations` - Buyers and vendors
- `users` - User accounts
- `products` - Product catalog
- `rfqs` and `rfq_lines` - Request for Quotations
- `quotes` and `quote_lines` - Quotes
- `orders` and `order_lines` - Orders
- `wallets` and `wallet_transactions` - Wallet system
- `payments` - Payment records
- `feature_flags` - Feature flag configuration

## Development Workflow

### Backend Setup:
1. Navigate to `backend/` directory
2. Ensure Java 21 and Maven are installed
3. Run `./mvnw spring-boot:run`

### Frontend Setup:
1. Navigate to `frontend/` directory
2. Ensure Node.js 20+ is installed
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start development server

### Feature Flag Strategy
The application uses feature flags for incremental rollout:
- `catalog.publicBrowse` - Public catalog browsing
- `search.enabled` - Product search functionality
- `rfq.enabled` - RFQ creation
- `orders.checkout` - Order checkout process
- `payments.gateway1` - Payment gateway integration
- `wallet.basic` - Corporate wallet functionality
- `invoice.vat` - VAT invoice generation
- `loyalty.core` - Loyalty program
- `credit.controls` - Credit limit controls

## Testing & CI/CD

- Unit and integration tests in `src/test/` for backend
- E2E tests in `e2e_tests/` and `tests/` directories
- Vitest for frontend testing
- Playwright for frontend E2E testing

## Sprint Planning Context

The project follows an iterative sprint approach with the following planned releases:

**Gate A** - Public Browse: catalog list/detail reachable, performance baseline captured
**Gate B** - RFQ→Quote: buyer can create RFQ, vendor submits quote, buyer accepts
**Gate C** - Order→Wallet Pay: accepted quote converts to order and is paid via wallet

## Key Conventions

1. **ID Generation**: ULIDs stored as `char(26)` with Crockford base32 encoding
2. **Timestamps**: All tables have `created_at` and `updated_at` fields with triggers
3. **Soft Delete**: Implemented where needed using `deleted_at` field
4. **Currency**: USD as default with multi-currency support in business logic
5. **Authentication**: JWT-based with Bearer token pattern
6. **Internationalization**: English/Arabic support with RTL layout for Arabic

## Operational Considerations

- Health checks via Spring Boot Actuator
- Metrics collection with Micrometer and Prometheus
- Structured JSON logging with correlation IDs
- Database migrations managed by Flyway
- Feature flags for safe rollouts
- Object storage for media files

## Future Expansion Points

- VAT/e-invoicing
- Loyalty/credits system
- Complex shipping/returns
- Multi-gateway payment routing
- Contract pricing
- Advanced vendor self-service features