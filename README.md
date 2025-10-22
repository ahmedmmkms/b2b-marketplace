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
├── tests/                   # Test files directory
├── .github/                 # GitHub configuration
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

## Project Structure

The repository is organized as follows:

- `backend/`: Contains the Spring Boot 3 application with domain modules
- `frontend/`: Contains the Angular 18 application built with Nx
- `docs/`: Contains architecture, guides, and operational runbooks
- `scripts/`: Utility scripts for various operations
- `tests/`: Acceptance and integration tests
- `.github/`: GitHub workflows and configuration
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

## Development Notes

This project follows a modular architecture pattern with separate modules for each business domain. The project is organized in sprints with incremental delivery approach. The current implementation includes core modules for catalog management, user authentication, and basic RFQ functionality, with plans to expand to full marketplace capabilities including payments, invoicing, and loyalty programs.

For all GitHub commits and pushes, the contributor is "Ahmed Mahmoud", "ahmedmmkms@hotmail.com".