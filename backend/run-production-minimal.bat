@echo off
REM Batch file to run a minimal version of the P4 Backend without invoicing module to avoid circular dependency

REM Required environment variables for production
REM Set these to your production values
set DB_URL=jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech:5432/neondb?sslmode=require
set DB_USERNAME=neondb_owner
set DB_PASSWORD=npg_QTE70VJgbcdp
set B2_ACCOUNT_ID=43f8cd5d949d
set B2_APPLICATION_KEY_ID=00543f8cd5d949d0000000001
set B2_APPLICATION_KEY=K000iS73v7srQkqax39ZRy3ZJ/Yth+w
set B2_BUCKET=64735f483c0da5ed9994091d
set B2_ENDPOINT_URL=https://s3.us-east-005.backblazeb2.com

REM Additional feature flags for production (set to true to enable, false to disable)
set FEATURE_CATALOG_PUBLIC_BROWSE=true
set FEATURE_SEARCH_ENABLED=true
set FEATURE_RFQ_ENABLED=true
set FEATURE_ORDERS_CHECKOUT=true
set FEATURE_PAYMENTS_GATEWAY1=true
set FEATURE_INVOICE_VAT=false
set FEATURE_LOYALTY_CORE=true
set FEATURE_CREDIT_CONTROLS=true

REM Disable database seeding for production
set SEED_ENABLED=false

REM Mail configuration for production
set SPRING_MAIL_HOST=smtp.gmail.com
set SPRING_MAIL_PORT=587
set SPRING_MAIL_USERNAME=your_email@gmail.com
set SPRING_MAIL_PASSWORD=your_app_password
set SPRING_MAIL_PROPERTIES_MAIL_SMTP_AUTH=true
set SPRING_MAIL_PROPERTIES_MAIL_SMTP_STARTTLS_ENABLE=true

REM Allow circular references to resolve dependency issue
set SPRING_MAIN_ALLOW_CIRCULAR_REFERENCES=true

REM Allow bean definition overriding to resolve duplicate repository definitions
set SPRING_MAIN_ALLOW_BEAN_DEFINITION_OVERRIDING=true

REM Change to the backend directory
cd /d "%~dp0"

echo Running Minimal P4 Backend in Production Mode (without invoicing module)...
echo.

echo Current environment variables:
echo DB_URL: %DB_URL%
echo DB_USERNAME: %DB_USERNAME%
echo B2_BUCKET: %B2_BUCKET%
echo FEATURE_INVOICE_VAT: %FEATURE_INVOICE_VAT%
echo.

REM Check if Maven wrapper exists, otherwise use mvn command
if exist "mvnw.cmd" (
    echo Using Maven wrapper...
    call mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=prod -Dspring-boot.run.main-class=com.p4.backend.MinimalP4BackendApplication
) else (
    echo Using mvn command...
    call mvn spring-boot:run -Dspring-boot.run.profiles=prod -Dspring-boot.run.main-class=com.p4.backend.MinimalP4BackendApplication
)

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo An error occurred while running the application.
    echo Make sure you have Maven installed and all required environment variables set.
    echo This minimal version excludes the invoicing module to avoid circular dependency issues.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Application stopped.
pause