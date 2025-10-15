# Development Setup Guide

This guide explains how to set up your development environment for the P4 B2B Marketplace project.

## Prerequisites

- Java 21 (for backend development)
- Node.js 18+ (for frontend development)
- PostgreSQL 16 (for local development)
- Redis (for caching and rate limiting)
- Git
- Maven (should be included with Java installation)

## Repository Structure

The repository follows a modular monolith architecture:

```
b2b-marketplace/
├── backend/                 # Java/Spring Boot application
├── frontend/                # Angular/Nx application
├── docs/                    # Documentation
├── scripts/                 # Utility scripts
└── README.md
```

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies (if needed) and run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

3. The application will start on `http://localhost:8080`

## Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   ng serve
   ```

4. The application will be available at `http://localhost:4200`

## Environment Configuration

The application requires the following environment variables to be set:

### Backend
```
SPRING_PROFILES_ACTIVE=dev
DB_URL=jdbc:postgresql://localhost:5432/p4_dev
DB_USERNAME=postgres
DB_PASSWORD=postgres
REDIS_URL=redis://localhost:6379
B2_ACCOUNT_ID=your_b2_account_id
B2_APPLICATION_KEY_ID=your_b2_application_key_id
B2_APPLICATION_KEY=your_b2_application_key
B2_BUCKET=your_b2_bucket_name
B2_ENDPOINT_URL=https://your_b2_endpoint_url
```

### Frontend
```
API_BASE_URL=http://localhost:8080
ENV_NAME=development
FEATURE_FLAGS_SOURCE=backend
```

## Database Migrations

The backend uses Flyway for database migrations. Migration files are located in `backend/src/main/resources/db/migration`. When running the application, migrations will be applied automatically.

For development, you can also manually run migrations using the scripts in the `scripts/` directory:
```bash
cd scripts
python execute_migrations.py
```

## Internationalization

The application supports both English and Arabic with proper RTL (right-to-left) layout for Arabic. Translation files are located in the `frontend/i18n/` directory.

## Feature Flags

The application uses feature flags to control functionality rollout. Flags can be configured in the `application.yml` files or via environment variables. Key features include:
- `catalog.publicBrowse` - Public catalog browsing
- `search.enabled` - Product search functionality
- `rfq.enabled` - RFQ creation
- `orders.checkout` - Order checkout process
- And more...

## Running Tests

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Useful Scripts

Several utility scripts are available in the `scripts/` directory:
- `seed_db.py` - Populate the database with sample data
- `migrate_db.py` - Run database migrations
- `verify_seeding.py` - Verify database content after seeding
- And more...

## Troubleshooting

1. If the backend fails to connect to the database, ensure PostgreSQL is running and credentials are correct
2. If frontend build fails, try clearing Node.js cache: `npm cache clean --force`
3. For Redis connection issues, ensure Redis server is running on the configured host/port