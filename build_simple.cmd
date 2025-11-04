@echo off

REM Change to backend directory
cd /d "D:\Projects\b2b-marketplace\backend"

REM Try building with mvnw using a different approach
set "JAVA_OPTS=-Dmaven.multiModuleProjectDirectory=%CD%"
echo Attempting to build with Maven...

REM Run the Maven wrapper with explicit parameters
java -Dmaven.multiModuleProjectDirectory=%CD% -jar .mvn\wrapper\maven-wrapper.jar clean compile

if %ERRORLEVEL% EQU 0 (
  echo Build completed successfully!
) else (
  echo Build failed!
  exit /b %ERRORLEVEL%
)