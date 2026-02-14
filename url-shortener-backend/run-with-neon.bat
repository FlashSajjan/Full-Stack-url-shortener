@echo off
echo ========================================
echo Starting Linklytics Backend with Neon Database
echo ========================================
echo.

REM Set JAVA_HOME
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.0.36-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

REM Set environment variables for Neon PostgreSQL
set SPRING_DATABASE_URL=
set SPRING_DATABASE_URL_USERNAME=
set SPRING_DATABASE_URL_PASSWORD=
set JWT_SECRET=
set JWT_EXPIRATION=72800000
set FRONTEND_URL=http://localhost:5173

echo Environment variables set successfully
echo.
echo JAVA_HOME: %JAVA_HOME%
echo Database: Neon PostgreSQL
echo Host: 
echo Database: 
echo.
echo Starting Spring Boot application...
echo This may take 30-60 seconds...
echo.

REM Run the application
call mvnw.cmd spring-boot:run

pause
