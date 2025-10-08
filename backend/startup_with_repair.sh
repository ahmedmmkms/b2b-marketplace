#!/bin/bash
# Script to repair Flyway migrations for the P4 B2B Marketplace on Azure

# The Spring Boot application with Flyway auto-configuration should handle the repair
# when repair-on-migration-validation-error is set to true in the configuration.

# Set the necessary environment variables for database connection
if [ -z "$DB_URL" ]; then
    echo "Error: DB_URL environment variable is not set"
    exit 1
fi

if [ -z "$DB_USERNAME" ]; then
    echo "Error: DB_USERNAME environment variable is not set"
    exit 1
fi

if [ -z "$DB_PASSWORD" ]; then
    echo "Error: DB_PASSWORD environment variable is not set"
    exit 1
fi

echo "Starting P4 B2B Marketplace with Flyway auto-repair enabled..."

# Start the application with production profile
# The application.yaml has repair-on-migration-validation-error: true
# which will automatically repair mismatched checksums during startup
java -Dserver.port="$PORT" -jar app.jar --spring.profiles.active=prod