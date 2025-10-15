# Task 1.2 Acceptance Test: Database Configuration and Flyway Migrations

## Objective
Verify that the application connects to the PostgreSQL database and successfully runs the baseline migration.

## Pre-requisites
- PostgreSQL database server accessible
- Environment variables properly configured:
  - DB_URL
  - DB_USERNAME
  - DB_PASSWORD

## Test Steps
1. Ensure the application.yml contains proper database configuration for both development and production profiles
2. Verify that Flyway is properly configured with:
   - flyway.enabled: true
   - flyway.baseline-on-migrate: true
   - flyway.validate-on-migrate: true
3. Verify the migration file exists at `src/main/resources/db/migration/V1__baseline_schema.sql`
4. Start the application with proper database connection parameters
5. Confirm that Flyway successfully applies the baseline migration
6. Verify that all tables from the migration file are created in the database

## Expected Results
- Application starts without database connectivity errors
- Flyway baseline migration executes successfully
- All tables defined in the baseline migration are created in the database
- No errors related to database connectivity or schema application

## Validation Commands

### Local Validation:
```bash
# Set environment variables (replace with actual values for your environment)
export DB_URL="jdbc:postgresql://localhost:5432/p4_dev"
export DB_USERNAME="postgres"
export DB_PASSWORD="postgres"

# Build the application
cd backend
./mvnw clean package -DskipTests

# Start the application
java -jar target/p4-backend-0.0.1-SNAPSHOT.jar
```

### Check logs for successful migration:
```
flyway-core.* INFO .*\[.*\] - Successfully applied 1 migration to schema "public"
```

### Production Validation:
```bash
# Set production environment variables
export DB_URL="jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
export DB_USERNAME="neondb_owner"
export DB_PASSWORD="npg_QTE70VJgbcdp"

# Start application with production profile
java -jar target/p4-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

## Success Criteria
- [ ] Application starts without database connectivity errors
- [ ] Flyway logs show successful migration execution
- [ ] All expected tables are created in the database
- [ ] No Flyway-related exceptions in logs

## Post-Test Verification
Connect to the database and verify that all tables from the V1__baseline_schema.sql file have been created:

```sql
-- Connect to the database and run:
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see all the tables defined in the baseline migration:
- account
- user
- vendor
- product_category
- product
- product_attribute
- product_attribute_value
- product_media
- rfq
- rfq_line
- quote
- quote_line
- "order"
- order_line
- payment
- wallet
- wallet_transaction
- credit_limit
- tax_reg
- sequence_registry
- invoice
- invoice_line
- loyalty_program
- loyalty_tier
- loyalty_reward
- loyalty_txn
- audit_log