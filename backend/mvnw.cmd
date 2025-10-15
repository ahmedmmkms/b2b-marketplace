@echo off
setlocal

set ORIGINAL_DIR=%CD%
set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"

set MAVEN_CMD=%SCRIPT_DIR%mvn.cmd

if exist "%MAVEN_CMD%" (
  call "%MAVEN_CMD%" %*
) else (
  echo Apache Maven is not found. Please install Maven and ensure it's in your PATH.
  exit /b 1
)

cd /d "%ORIGINAL_DIR%"