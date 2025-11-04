@echo off
setlocal enabledelayedexpansion

REM Change to backend directory
cd /d "D:\Projects\b2b-marketplace\backend"

REM Run Maven clean compile
echo Building backend...
call mvnw.cmd clean compile

if %ERRORLEVEL% EQU 0 (
  echo Backend build completed successfully!
) else (
  echo Backend build failed!
  exit /b %ERRORLEVEL%
)