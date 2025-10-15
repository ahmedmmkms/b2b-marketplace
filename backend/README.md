# P4 B2B Marketplace Backend

This is the backend service for the P4 B2B marketplace, built with Java 21 and Spring Boot 3.

## Architecture

The backend follows a modular monolith architecture with the following main modules:
- **Catalog**: Product catalog management
- **Identity**: User authentication and authorization
- **Invoicing**: VAT-compliant invoice generation
- **Loyalty**: Loyalty and rewards system
- **Orders**: Order processing
- **Payments**: Payment processing integration
- **RFQ**: Request for Quotation functionality
- **Search**: Product search capabilities
- **Shared**: Shared utilities and components
- **Wallet**: Corporate wallet and credit functionality

## Running the Application

### Prerequisites
- Java 21
- Maven 3.8+

### Environment Configuration
The application uses the following environment variables:

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
```

### Running locally
```bash
./mvnw spring-boot:run
```

### Building the application
```bash
./mvnw clean package
```

## Database Migrations

The application uses Flyway for database migrations. Migration files are located in `src/main/resources/db/migration`.

## API Documentation

API documentation is available at `/swagger-ui.html` when the application is running.