@echo off
setlocal

REM Save original path
set "ORIGINAL_PATH=%PATH%"

REM Try to set JAVA_HOME to the current Java location
for /f "tokens=3" %%a in ('java -XshowSettings:properties -version ^| findstr java.home') do set "JAVA_HOME=%%a"
echo Using JAVA_HOME: %JAVA_HOME%

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