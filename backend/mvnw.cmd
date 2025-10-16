@echo off
REM ----------------------------------------------------------------------------
REM Licensed to the Apache Software Foundation (ASF) under one
REM or more contributor license agreements.  See the NOTICE file
REM distributed with this work for additional information
REM regarding copyright ownership.  The ASF licenses this file
REM to you under the Apache License, Version 2.0 (the
REM "License"); you may not use this file except in compliance
REM with the License.  You may obtain a copy of the License at
REM
REM    http://www.apache.org/licenses/LICENSE-2.0
REM
REM Unless required by applicable law or agreed to in writing,
REM software distributed under the License is distributed on an
REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
REM KIND, either express or implied.  See the License for the
REM specific language governing permissions and limitations
REM under the License.
REM ----------------------------------------------------------------------------

REM Maven Start Up Script
REM Run mvnw instead of mvn to use this script

SET ORIGINAL_DIR=%CD%
SET SCRIPT_DIR=%~dp0

CD /d "%SCRIPT_DIR%"

REM Check if the wrapper jar file is present, if not, download it
IF NOT EXIST ".mvn\wrapper\maven-wrapper.jar" (
  echo Downloading Maven Wrapper
  REM Create the directory if it doesn't exist
  IF NOT EXIST ".mvn\wrapper" MKDIR ".mvn\wrapper"
  
  REM Download the wrapper jar
  powershell -Command "& {Invoke-WebRequest -Uri https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar -OutFile .mvn\wrapper\maven-wrapper.jar}"
)

REM Check if JAVA_HOME is set
IF "%JAVA_HOME%"=="" (
    echo JAVA_HOME is not set. Please set JAVA_HOME to point to your Java installation.
    CD /d "%ORIGINAL_DIR%"
    exit /b 1
)

REM Set up the classpath to include the wrapper jar
SET MAVEN_WRAPPER_JAR=.mvn\wrapper\maven-wrapper.jar
SET MAVEN_WRAPPER_MAIN=org.apache.maven.wrapper.MavenWrapperMain

REM Set up the command to run Maven
SET "MVN_CMD=%JAVA_HOME%\bin\java.exe"
SET MVN_OPTS=%MAVEN_OPTS%

REM Check if debug flag is set
IF "%MVN_DEBUG%"=="true" (
    SET MVN_DEBUG_OPTS=-Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
)

REM Run Maven
"%MVN_CMD%" %MVN_OPTS% %MVN_DEBUG_OPTS% -Dmaven.multiModuleProjectDirectory=%CD% -classpath "%MAVEN_WRAPPER_JAR%" "%MAVEN_WRAPPER_MAIN%" %*

CD /d "%ORIGINAL_DIR%"