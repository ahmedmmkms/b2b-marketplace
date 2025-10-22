# P4 GCC/MENA B2B Marketplace

This is a comprehensive B2B marketplace platform targeting the GCC/MENA region, designed with an incremental delivery approach. The project aims to launch a VAT-ready, multi-vendor B2B marketplace featuring RFQ→Quote→PO flows, invoicing, wallets/credit limits, and tiered loyalty programs.

## Repository Structure

The repository is organized as follows:

```
├── backend/              # Spring Boot 3 application (Java 21)
├── frontend/             # Angular 18 application with Nx workspace
├── docs/                 # Documentation files
│   ├── api/              # API design and endpoint documentation
│   ├── architecture/     # Architecture documents and plans
│   ├── guides/           # Implementation guides
│   ├── runbooks/         # Deployment and operations runbooks
│   ├── tasks/            # Task-specific documentation
│   ├── implementation-status/  # Implementation status tracking
│   └── adr/              # Architecture Decision Records
├── scripts/              # Various scripts for operations
│   ├── db/               # Database setup and management scripts
│   ├── config/           # Configuration files
│   └── utils/            # Utility scripts
├── tests/                # Test files organized by module
│   ├── core/             # Core components tests
│   ├── identity/         # Identity management tests
│   ├── catalog/          # Catalog functionality tests
│   ├── rfq/              # RFQ functionality tests
│   ├── orders/           # Order management tests
│   └── shared/           # Shared components and infrastructure tests
├── logs/                 # Log files
└── ...
```

## Project Components

### Backend
- **Technology:** Java 21, Spring Boot 3
- **Database:** PostgreSQL 16 (Neon)
- **Cache:** Redis 
- **Object Storage:** Backblaze B2

### Frontend
- **Technology:** Angular 18 + Nx
- **Styling:** Angular Material + NG-ZORRO
- **i18n:** English/Arabic with RTL support

### Architecture
- **Pattern:** Modular monolith (hexagonal architecture)
- **Modules:** Identity, Catalog, RFQ/Quote, Orders, Payments, Invoicing, Wallet, Loyalty

## Current Implementation Status

The project follows an incremental delivery approach with tasks defined in the `docs/architecture/plan2.md`. As of the latest update:

- ✅ **Implemented:** Tasks 1.1 through 4.4
  - Core infrastructure and configuration
  - Common components and utilities
  - Shared kernel components
  - Identity and access management (accounts, users, authentication, RBAC)

- ❌ **Pending:** Tasks 5.1 through 14.3
  - Catalog and search functionality
  - RFQ and quote management
  - Order processing
  - Payment systems
  - Wallet and credit controls
  - Invoicing and VAT
  - Loyalty program
  - Advanced monitoring and operations

## Development Setup

### Backend
1. Navigate to `backend/` directory
2. Run `./mvnw spring-boot:run` to start the application

### Frontend
1. Navigate to `frontend/` directory  
2. Run `npm install` to install dependencies
3. Run `ng serve` to start the development server

## Documentation

- **Architecture:** Detailed plans in `docs/architecture/`
- **API Design:** Available in `docs/api/`
- **Implementation Status:** Tracking in `docs/implementation-status/`
- **Deployment:** Runbooks in `docs/runbooks/`

## Testing

Test files are organized by module in the `tests/` directory:
- Core components: `tests/core/`
- Identity management: `tests/identity/`
- Catalog functionality: `tests/catalog/`
- RFQ functionality: `tests/rfq/`
- Order management: `tests/orders/`
- Shared components: `tests/shared/`

## Database Management

Database scripts are located in `scripts/db/`:
- Setup and initialization scripts
- Migration scripts
- Seeding scripts
- Utility scripts

## Contributing

Please follow the task-based development approach outlined in `docs/architecture/plan2.md`. Each task has acceptance tests that should be run against the Azure deployment.