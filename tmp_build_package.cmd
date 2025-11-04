@echo off
setlocal EnableDelayedExpansion

REM Navigate to backend directory
cd /d "D:\Projects\b2b-marketplace\backend"

echo Starting Maven package build...
echo.

REM Set environment variables
set "MAVEN_PROJECTBASEDIR=%CD%"
set "WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain"

REM Get JAVA_HOME from java command
REM (We know from previous output that JAVA_HOME is already set or detected properly)
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.8.9-hotspot\"

echo JAVA_HOME: !JAVA_HOME!
echo.

REM Quote the JAVA_HOME path to handle spaces
"!JAVA_HOME!\bin\java.exe" ^
  -classpath "!WRAPPER_JAR!" ^
  "-Dmaven.multiModuleProjectDirectory=!MAVEN_PROJECTBASEDIR!" ^
  "!WRAPPER_LAUNCHER!" clean package -DskipTests

if !ERRORLEVEL! EQU 0 (
  echo.
  echo Backend packaging completed successfully!
) else (
  echo.
  echo Backend packaging failed!
  exit /b !ERRORLEVEL!
)

endlocal