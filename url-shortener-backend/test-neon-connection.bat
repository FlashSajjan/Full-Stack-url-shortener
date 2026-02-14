@echo off
echo ========================================
echo Testing Neon Database Connection
echo ========================================
echo.

REM Set JAVA_HOME
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.0.36-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

REM Set environment variables
set SPRING_DATABASE_URL=
set SPRING_DATABASE_URL_USERNAME=
set SPRING_DATABASE_URL_PASSWORD=
set JWT_SECRET=
set JWT_EXPIRATION=72800000
set FRONTEND_URL=http://localhost:5173

echo Step 1: Checking Java version...
java -version
echo.

echo Step 2: Checking Maven wrapper...
call mvnw.cmd --version
echo.

echo Step 3: Cleaning and compiling...
call mvnw.cmd clean compile
echo.

if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo Compilation successful!
    echo ========================================
    echo.
    echo Step 4: Starting application...
    echo Watch for these success messages:
    echo   - HikariPool-1 - Starting...
    echo   - HikariPool-1 - Start completed.
    echo   - Started UrlShortenerSbApplication
    echo.
    echo Press Ctrl+C to stop the application
    echo.
    call mvnw.cmd spring-boot:run
) else (
    echo ========================================
    echo Compilation failed!
    echo ========================================
    echo Please check the error messages above
)

pause
