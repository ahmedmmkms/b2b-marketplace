# ADR 001: Project Structure

## Status
Accepted

## Context
The P4 B2B Marketplace project needed a well-organized repository structure to support its modular monolith architecture and facilitate development across multiple teams. The initial structure was disorganized with files scattered across the repository.

## Decision
We have organized the repository following industry best practices for a modular monolith with separate frontend and backend applications:

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
│   └── README.md
├── frontend/                # Angular 18/Nx application
│   ├── app/                 # Application components
│   ├── features/            # Feature modules
│   ├── components/          # Shared components
│   ├── i18n/                # Internationalization files
│   └── README.md
├── docs/                    # Documentation
│   ├── architecture/        # Architecture documentation
│   ├── runbooks/            # Deployment and operations runbooks
│   └── guides/              # Development guides
├── scripts/                 # Utility scripts
└── README.md                # Root documentation
```

## Consequences
- Improved developer onboarding experience
- Clear separation of concerns between frontend and backend
- Easier maintenance and scaling of individual modules
- Better organization of documentation and runbooks
- Simplified CI/CD pipeline configuration