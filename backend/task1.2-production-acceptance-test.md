# Task 1.2 Production Deployment Acceptance Test

## Objective
Verify that the database configuration and Flyway migrations work correctly in the production environment.

## Pre-requisites
- Production database server (Neon PostgreSQL) is accessible
- Production environment variables are set:
  - `DB_URL`: `jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
  - `DB_USERNAME`: `neondb_owner`
  - `DB_PASSWORD`: `npg_QTE70VJgbcdp`
  - `SPRING_PROFILES_ACTIVE`: `prod`

## Test Steps

### 1. Build the Application
```bash
cd backend
./mvnw clean package -DskipTests
```

### 2. Set Production Environment Variables
```bash
export SPRING_PROFILES_ACTIVE=prod
export DB_URL="jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
export DB_USERNAME="neondb_owner"
export DB_PASSWORD="npg_QTE70VJgbcdp"
```

### 3. Deploy and Start the Application
```bash
java -jar target/p4-backend-0.0.1-SNAPSHOT.jar
```

### 4. Verify Successful Database Connection
- Monitor the application logs for successful startup
- Look for these specific log entries:
  ```
  HikariPool-1 - Starting...
  HikariPool-1 - Added connection
  Flyway Community Edition ...
  Successfully applied 1 migration to schema "public"
  ```

### 5. Verify Migration Execution
- Connect to the production database using a database client
- Verify that all tables from V1__baseline_schema.sql are created
- Verify that Flyway metadata table (`flyway_schema_history`) exists and contains the applied migration

### 6. Test Database Operations
- Verify that the application can perform basic database operations
- Test creating and reading a simple record (if possible via API endpoints)

## Expected Results
- Application starts successfully with no database connection errors
- Connection pool is properly initialized with HikariCP
- Flyway successfully applies the baseline migration
- All database tables are created as defined in the migration file
- Database connection pool operates correctly with the specified parameters

## Success Criteria
- [ ] Application starts without errors
- [ ] Database connection is established successfully
- [ ] Connection pool is properly configured and operational
- [ ] Flyway migration completes successfully
- [ ] All expected tables are created in the production database
- [ ] Application health endpoints return healthy status
- [ ] Database operations are responsive

## Production Validation
Once deployed to production at `https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net`:

1. Check the health endpoint:
```bash
curl -X GET https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/actuator/health
```

2. Verify application is running:
```bash
curl -X GET https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/actuator/info
```

3. Check the logs via Azure portal to confirm:
   - No database connection errors
   - Successful Flyway migration execution
   - Connection pool properly initialized

## Troubleshooting
If issues occur:
- Verify environment variables are correctly set
- Check if the production database is accessible
- Verify that the database credentials are correct
- Ensure the database security settings allow connections from the deployment environment
- Check if any firewall rules are blocking the connection