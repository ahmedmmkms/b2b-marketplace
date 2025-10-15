# P4 B2B Marketplace

A comprehensive B2B marketplace targeting the GCC/MENA region, built with Java 21/Spring Boot 3 (backend) and Angular 18/Nx (frontend).

## Architecture Overview

This repository contains a modular monolith application with the following structure:

```
b2b-marketplace/
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
│   └── README.md            # Backend-specific documentation
├── frontend/                # Angular 18/Nx application
│   ├── app/                 # Application components
│   ├── features/            # Feature modules
│   ├── components/          # Shared components
│   ├── i18n/                # Internationalization files
│   └── README.md            # Frontend-specific documentation
├── docs/                    # Documentation
│   ├── architecture/        # Architecture documentation
│   ├── runbooks/            # Deployment and operations runbooks
│   └── guides/              # Development guides
├── scripts/                 # Utility scripts
└── README.md                # This file
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
DB_URL=jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
DB_USERNAME=neondb_owner
DB_PASSWORD=npg_QTE70VJgbcdp
REDIS_URL=redis://default:AUUnAAIncDI1ZWRkMmFkMDE2ZjA0MmYxYmEyNWVlYzM1Y2ExODMxNHAyMTc3MDM@adjusted-sunbird-17703.upstash.io:6379
B2_ACCOUNT_ID=43f8cd5d949d
B2_APPLICATION_KEY_ID=00543f8cd5d949d0000000001
B2_APPLICATION_KEY=K005iS73v7srQkqax39ZRy3ZJ/Yth+w
B2_BUCKET=64735f483c0da5ed9994091d
B2_ENDPOINT_URL=https://s3.us-east-005.backblazeb2.com
API_URL_BASE=https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net
```