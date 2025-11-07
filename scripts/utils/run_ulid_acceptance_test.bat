@echo off
REM ULID Production Acceptance Test Runner
REM This script runs the ULID acceptance tests against the Azure deployment

echo Running ULID Production Acceptance Tests...
echo.

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.7 or higher
    exit /b 1
)

REM Check if required packages are installed
python -c "import requests" >nul 2>&1
if errorlevel 1 (
    echo Installing required packages...
    pip install -r requirements.txt
)

echo.
echo Starting ULID acceptance tests...
echo.

REM Run the acceptance test
python test_ulid_acceptance.py

echo.
echo ULID acceptance tests completed.
pause