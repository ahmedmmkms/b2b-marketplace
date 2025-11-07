# P4 B2B Marketplace

A comprehensive B2B marketplace targeting the GCC/MENA region, built with Java 21/Spring Boot 3 (backend) and Angular 18/Nx (frontend).

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Feature Flags](#feature-flags)
- [Deployment](#deployment)
- [Environment Configuration](#environment-configuration)

## Project Overview

This is a comprehensive B2B marketplace project targeting the GCC/MENA region, designed with an incremental delivery approach. The project aims to launch a VAT-ready, multi-vendor B2B marketplace featuring RFQ→Quote→PO flows, invoicing, wallets/credit limits, and tiered loyalty programs.

## Architecture Overview

This repository contains a well-organized modular monolith application with the following structure:

```
b2b-marketplace/
├── .github/                 # GitHub workflows and configuration
│   ├── workflows/           # CI/CD workflows
│   └── ISSUE_TEMPLATE/      # Issue templates
├── backend/                 # Java 21/Spring Boot 3 application
│   ├── src/main/java/com/p4/backend/
│   │   ├── catalog/         # Product catalog management
│   │   ├── identity/        # Authentication and authorization
│   │   ├── invoicing/       # VAT-compliant invoice generation
│   │   ├── loyalty/         # Loyalty and rewards system
│   │   ├── orders/          # Order processing
│   │   ├── payments/        # Payment processing
│   │   ├── rfq/             # Request for Quotation
│   │   ├── search/          # Product search
│   │   ├── shared/          # Shared components
│   │   ├── wallet/          # Corporate wallet
│   │   ├── common/          # Common utilities
│   │   └── config/          # Configuration classes
│   ├── src/test/            # Backend tests
│   ├── src/main/resources/  # Backend resources
│   ├── pom.xml              # Maven build configuration
│   └── README.md            # Backend-specific documentation
├── frontend/                # Angular 18/Nx application
│   ├── app/                 # Application components
│   ├── features/            # Feature modules
│   ├── components/          # Shared components
│   ├── i18n/                # Internationalization files
│   ├── e2e/                 # End-to-end tests
│   ├── public/              # Public assets
│   ├── styles/              # Styles and themes
│   ├── package.json         # Frontend dependencies
│   └── README.md            # Frontend-specific documentation
├── docs/                    # Documentation
│   ├── architecture/        # Architecture documentation
│   ├── runbooks/            # Deployment and operations runbooks
│   ├── guides/              # Development guides
│   └── api/                 # API documentation
├── scripts/                 # Utility scripts
│   ├── build/               # Build scripts
│   ├── deploy/              # Deployment scripts
│   ├── config/              # Configuration scripts
│   ├── db/                  # Database scripts
│   └── utils/               # Utility scripts
├── tests/                   # Test files directory
│   ├── e2e/                 # End-to-end tests
│   └── integration/         # Integration tests
├── seed/                    # Data seeding scripts and files
│   ├── data/                # Seed data files
│   └── scripts/             # Seed scripts
├── tools/                   # Development tools
├── config/                  # Configuration files
│   ├── dev/                 # Development config
│   ├── staging/             # Staging config
│   └── prod/                # Production config
├── docker/                  # Docker-related files
│   ├── backend/             # Backend Dockerfile
│   └── frontend/            # Frontend Dockerfile
├── .gitignore               # Git ignore patterns
├── .gitattributes           # Git attributes
├── README.md                # Main project documentation
└── LICENSE                  # License information
```

## Technology Stack

### Backend
- **Language**: Java 21
- **Framework**: Spring Boot 3
- **Database**: PostgreSQL 16 (Neon)
- **Cache**: Redis (Upstash)
- **Object Storage**: Backblaze B2
- **Build Tool**: Maven

### Frontend
- **Framework**: Angular 18
- **Architecture**: Nx monorepo
- **UI Libraries**: Angular Material + NG-ZORRO
- **I18N**: English/Arabic with RTL support

## Project Structure

The repository is organized as follows:

- `.github/`: GitHub workflows and configuration
- `backend/`: Contains the Spring Boot 3 application with domain modules
- `frontend/`: Contains the Angular 18 application built with Nx
- `docs/`: Contains architecture, guides, and operational runbooks
- `scripts/`: Utility scripts for various operations (build, deploy, config, db, utils)
- `tests/`: Acceptance and integration tests
- `seed/`: Data seeding scripts and files
- `tools/`: Development tools
- `config/`: Configuration files for different environments
- `docker/`: Docker configuration files
- Root directory: Core configuration files and primary documentation

## Getting Started

### Backend Setup
1. Navigate to the `backend` directory
2. Configure your environment variables
3. Run `./mvnw spring-boot:run`

### Frontend Setup
1. Navigate to the `frontend` directory
2. Install dependencies: `npm install`
3. Run the development server: `ng serve`

## Documentation

- [Architecture Dossier](docs/architecture/P4_Dossier.md)
- [Implementation Plan](docs/architecture/plan2.md)
- [Sprint Runbooks](docs/runbooks/)
- [Development Guides](docs/guides/)

## Feature Flags

The application uses feature flags to control functionality rollout:
- `catalog.publicBrowse` - Public catalog browsing
- `search.enabled` - Product search functionality
- `rfq.enabled` - RFQ creation
- `orders.checkout` - Order checkout process
- `payments.gateway1` - Payment gateway integration
- `wallet.basic` - Corporate wallet functionality
- `invoice.vat` - VAT invoice generation
- `loyalty.core` - Loyalty program
- `credit.controls` - Credit limit controls

## Deployment

Frontend is deployed on Cloudflare Pages, and backend is deployed on Koyeb with a PostgreSQL database on Neon and Redis on Upstash.

## Environment Configuration

The application is configured with the following environment variables:

```
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:postgresql://<your-postgres-url>
DB_USERNAME=<your-db-username>
DB_PASSWORD=<your-db-password>
REDIS_URL=redis://<your-redis-url>
B2_ACCOUNT_ID=<your-b2-account-id>
B2_APPLICATION_KEY_ID=<your-b2-application-key-id>
B2_APPLICATION_KEY=<your-b2-application-key>
B2_BUCKET=<your-b2-bucket>
B2_ENDPOINT_URL=https://s3.<your-region>.backblazeb2.com
API_URL_BASE=<your-api-url-base>
APP_CORS_ALLOWED_ORIGINS=https://b2b-marketplace.pages.dev,http://localhost:3000
```

## Development Notes

This project follows a modular architecture pattern with separate modules for each business domain. The project is organized in sprints with incremental delivery approach. The current implementation includes core modules for catalog management, user authentication, and basic RFQ functionality, with plans to expand to full marketplace capabilities including payments, invoicing, and loyalty programs.

For all GitHub commits and pushes, the contributor is "Ahmed Mahmoud", "ahmedmmkms@hotmail.com".
