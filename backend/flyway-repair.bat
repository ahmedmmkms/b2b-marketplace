@echo off
REM Batch file to repair flyway migrations in the P4 Backend

REM Required environment variables for production
set DB_URL=jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech:5432/neondb?sslmode=require
set DB_USERNAME=neondb_owner
set DB_PASSWORD=npg_QTE70VJgbcdp

REM Change to the backend directory
cd /d "%~dp0"

echo Repairing Flyway Migrations...
echo.

echo Current environment variables:
echo DB_URL: %DB_URL%
echo DB_USERNAME: %DB_USERNAME%
echo.

REM Check if Maven wrapper exists, otherwise use mvn command
if exist "mvnw.cmd" (
    echo Using Maven wrapper to repair flyway...
    call mvnw.cmd flyway:repair -Dflyway.url=%DB_URL% -Dflyway.user=%DB_USERNAME% -Dflyway.password=%DB_PASSWORD%
) else (
    echo Using mvn command to repair flyway...
    call mvn flyway:repair -Dflyway.url=%DB_URL% -Dflyway.user=%DB_USERNAME% -Dflyway.password=%DB_PASSWORD%
)

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo An error occurred while repairing flyway migrations.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Flyway repair completed.
pause