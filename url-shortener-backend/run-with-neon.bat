@echo off
echo ========================================
echo Starting Linklytics Backend with Neon Database
echo ========================================
echo.

REM Set JAVA_HOME
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.0.36-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

REM Set environment variables for Neon PostgreSQL
set SPRING_DATABASE_URL=jdbc:postgresql://ep-summer-rain-aigtzdpg.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
set SPRING_DATABASE_URL_USERNAME=neondb_owner
set SPRING_DATABASE_URL_PASSWORD=npg_fRCpNQ8aov7I
set JWT_SECRET=L4FpnevPLSMYGhOQKc86keL6WukbjutpHUlM056Ns15pr86JjhiLwDseG6LBBc2GwSBfoHRBXEzr7BOHp6rWaS
set JWT_EXPIRATION=72800000
set FRONTEND_URL=http://localhost:5173

echo Environment variables set successfully
echo.
echo JAVA_HOME: %JAVA_HOME%
echo Database: Neon PostgreSQL
echo Host: ep-summer-rain-aigtzdpg.c-4.us-east-1.aws.neon.tech
echo Database: neondb
echo.
echo Starting Spring Boot application...
echo This may take 30-60 seconds...
echo.

REM Run the application
call mvnw.cmd spring-boot:run

pause
