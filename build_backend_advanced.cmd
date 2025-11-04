@echo off
setlocal EnableDelayedExpansion

REM Navigate to backend directory
cd /d "D:\Projects\b2b-marketplace\backend"

echo Starting Maven build...
echo.

REM Save current directory
set "CURRENT_DIR=%CD%"

REM Set environment variables
set "MAVEN_PROJECTBASEDIR=%CURRENT_DIR%"
set "WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain"

REM Get JAVA_HOME from java command
for /f "usebackq tokens=*" %%j in (`java -XshowSettings:properties 2^>^&1 ^| findstr "java.home"`) do (
  set "JAVA_HOME_LINE=%%j"
  goto :gotJavaHome
)

:gotJavaHome
REM Extract the path from the line (remove "java.home = ")
for /f "tokens=3" %%p in ("!JAVA_HOME_LINE!") do set "JAVA_HOME=%%p"

REM Remove quotes if present
set "JAVA_HOME=!JAVA_HOME:"=!"

echo JAVA_HOME determined as: !JAVA_HOME!
echo.

REM Now run Maven build
"!JAVA_HOME!\bin\java.exe" ^
  -classpath "!WRAPPER_JAR!" ^
  "-Dmaven.multiModuleProjectDirectory=!MAVEN_PROJECTBASEDIR!" ^
  "!WRAPPER_LAUNCHER!" clean compile

if !ERRORLEVEL! EQU 0 (
  echo.
  echo Backend build completed successfully!
) else (
  echo.
  echo Backend build failed!
  exit /b !ERRORLEVEL!
)

endlocal