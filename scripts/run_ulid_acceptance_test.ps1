# ULID Production Acceptance Test Runner (PowerShell)
# This script runs the ULID acceptance tests against the Azure deployment

Write-Host "Running ULID Production Acceptance Tests..." -ForegroundColor Green
Write-Host ""

# Check if Python is available
try {
    $pythonVersion = python --version 2>&1
    Write-Host "Python found: $pythonVersion"
} 
catch {
    Write-Host "Error: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.7 or higher" -ForegroundColor Red
    exit 1
}

# Check if required packages are installed
try {
    python -c "import requests" 2>&1 > $null
    Write-Host "Requests library is available"
}
catch {
    Write-Host "Installing required packages..." -ForegroundColor Yellow
    pip install -r requirements.txt
}

Write-Host ""
Write-Host "Starting ULID acceptance tests..." -ForegroundColor Green
Write-Host ""

# Run the acceptance test
python test_ulid_acceptance.py

Write-Host ""
Write-Host "ULID acceptance tests completed." -ForegroundColor Green
Read-Host "Press Enter to continue"