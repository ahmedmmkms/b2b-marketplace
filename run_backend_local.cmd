@echo off
setlocal

REM Set environment variables for backend application
set SPRING_PROFILES_ACTIVE=prod
set SPRING_DATASOURCE_URL=jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
set SPRING_DATASOURCE_USERNAME=neondb_owner
set SPRING_DATASOURCE_PASSWORD=npg_QTE70VJgbcdp

echo Starting backend with the following environment variables:
echo SPRING_PROFILES_ACTIVE=%SPRING_PROFILES_ACTIVE%
echo SPRING_DATASOURCE_URL=%SPRING_DATASOURCE_URL%
echo SPRING_DATASOURCE_USERNAME=%SPRING_DATASOURCE_USERNAME%
echo SPRING_DATASOURCE_PASSWORD=***[HIDDEN]***

REM Navigate to the backend directory
cd /d "%~dp0backend"

REM Run the Spring Boot application using Maven
echo.
echo Starting the backend application...
call ..\mvnw spring-boot:run

if %ERRORLEVEL% neq 0 (
    echo Failed to start the backend application
    pause
    exit /b %ERRORLEVEL%
)

echo Backend application started successfully
pause