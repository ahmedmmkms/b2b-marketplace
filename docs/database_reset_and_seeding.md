# Complete Database Reset and Seeding for P4 B2B Marketplace

This document provides comprehensive instructions for completely resetting the P4 B2B Marketplace database and seeding it with significant amounts of data. This process recreates the database schema from scratch and populates all tables with realistic data.

## Important Warnings

⚠️ **CRITICAL**: This process will **permanently delete all existing data** in the target database. 
- Only perform this operation on development or staging environments
- For production environments, extensive planning and approval are required
- Always ensure you have recent backups before proceeding

## Prerequisites

- Python 3.8+
- PostgreSQL client libraries
- Database credentials for the target environment
- Sufficient disk space and time for the operation

## Files Included

This package includes the following scripts:

1. `db_reset_complete.py` - Complete script to drop all tables and recreate the schema
2. `db_seed_extensive_fixed.py` - Comprehensive seeding script with significant data
3. Migration files in `backend/src/main/resources/db/migration/`:
   - `V8__Complete_schema_for_all_tasks.sql` - Complete database schema

## Step-by-Step Process

### 1. Environment Setup

1. Set up your environment variables for database access:

```bash
export DB_URL="postgresql://username:password@host:port/database_name"
# Or use individual variables:
export DB_HOST=your_host
export DB_PORT=5432
export DB_NAME=your_database
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
```

2. Install required Python packages:

```bash
pip install psycopg2-binary faker
```

### 2. Database Reset

1. Run the reset script:
```bash
python db_reset_complete.py
```

2. When prompted, type `YES` to confirm the operation.

This will:
- Drop all existing tables (except Flyway history)
- Recreate the complete schema from scratch
- Create all necessary indexes and triggers

### 3. Data Seeding

After the schema is created, run the seeding script:

```bash
python db_seed_extensive_fixed.py
```

This will populate all tables with significant amounts of realistic data:
- 100 feature flags
- 150 permissions
- 50 roles
- 500 accounts
- 600 users
- 200 vendors
- 100 product attributes
- 1500 products
- 800 RFQs with corresponding lines
- 600 quotes with corresponding lines
- 1000 orders with corresponding lines
- And much more data for all other tables

### 4. Production Application Process

⚠️ **IMPORTANT**: The following steps should only be performed on production after thorough review and approval:

1. **Schedule Maintenance Window**: 
   - Plan for system downtime
   - Notify all stakeholders in advance
   - Ensure you have rollback procedures in place

2. **Create Full Backup**:
   ```bash
   pg_dump -h your_host -U your_username -W -F t your_database_name > backup_$(date +%Y%m%d_%H%M%S).tar
   ```

3. **Review Changes**:
   - Have the database reset and schema changes reviewed by your database administrator
   - Verify the migration scripts with your development team
   - Test the entire process in a staging environment that mirrors production

4. **Execute Safely**:
   - During the maintenance window, follow the same steps as in development
   - Monitor the process closely
   - Have immediate access to your rollback procedures

5. **Post-Reset Verification**:
   - Verify data integrity
   - Run smoke tests on critical functionality
   - Validate that all services can connect and function properly

## Migration Through Flyway

If you prefer to use Flyway for schema management (recommended for production), you can also integrate the schema creation as a new migration:

1. Remove all previous migration files from `backend/src/main/resources/db/migration/`
2. Copy `V8__Complete_schema_for_all_tasks.sql` to the migration directory as `V1__Initial_Schema.sql`
3. Run the application, which will apply the migration through Flyway

## Data Volumes Summary

The extensive seeding script creates the following amounts of data:

- **Feature Flags**: 100 records
- **Permissions**: 150 records
- **Roles**: 50 records
- **Accounts**: 500 records
- **Users**: 600 records
- **Vendors**: 200 records
- **Product Attributes**: 100 records
- **Products**: 1,500 records
- **RFQs**: 800 records with 2,400+ lines
- **Quotes**: 600 records with 1,800+ lines
- **Orders**: 1,000 records with 5,000+ lines
- **Tax Registrations**: 3 records
- **Loyalty Programs**: 1 program with 5 tiers
- **Wallets**: 300 records
- **Media Assets**: 1,000 records
- **Payments**: 700 records
- **Invoices**: 600 records with 4,000+ lines
- **Loyalty Transactions**: 2,000 records (10 per account for 200 accounts)

## Rollback Procedure

If issues occur during or after the reset:

1. Stop the application immediately
2. Restore from the backup created in step 1
3. Re-run the old migration scripts to rebuild the original schema
4. Verify system functionality

## Performance Considerations

- The seeding process may take 15-30 minutes depending on system resources
- Ensure adequate memory and disk space
- Consider temporarily increasing database connection limits during the operation

## Troubleshooting

If issues occur:

1. Verify database connectivity and credentials
2. Check that the database user has sufficient privileges (DROP, CREATE permissions)
3. Ensure there are no active connections to the database that might block table drops
4. Check the database logs for specific error messages

## Post-Operation Tasks

After successful reset and seeding:

1. Update any external system configurations that depend on specific record IDs
2. Reconcile any data dependencies with other systems
3. Update documentation with the new database state
4. Run comprehensive tests to ensure all functionality works as expected

## Support

For issues with this process, contact your database administrator or the development team that created these scripts.