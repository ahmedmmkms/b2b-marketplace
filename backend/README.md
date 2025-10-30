# B2B Marketplace Backend

This is the Spring Boot 3 backend application for the P4 B2B Marketplace, targeting the GCC/MENA region.

## Technology Stack
- Java 21
- Spring Boot 3
- PostgreSQL 16
- Redis
- Maven

## Getting Started

### Prerequisites
- Java 21
- Maven

### Running the Application
```bash
./mvnw spring-boot:run
```

### Health Check
The application provides health check endpoints:
- `/actuator/health` - Overall health status
- `/actuator/health/liveness` - Liveness probe
- `/actuator/health/readiness` - Readiness probe

## Modules
- `catalog` - Product catalog management
- `identity` - Authentication and authorization
- `orders` - Order processing
- `rfq` - Request for Quotation
- `payments` - Payment processing
- `wallet` - Corporate wallet
- `invoicing` - VAT-compliant invoice generation
- `loyalty` - Loyalty and rewards system