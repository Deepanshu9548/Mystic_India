
@echo off
echo.
echo ╭──────────────────────────────────────────────╮
echo │                                              │
echo │           🏮  MYSTIC INDIA  🏮              │
echo │                                              │
echo │     Journey Through India's Rich Heritage    │
echo │                                              │
echo ╰──────────────────────────────────────────────╯
echo.

:: Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo npm is not installed. Please install npm first.
    exit /b 1
)

:: Print system info
echo System Information:
echo • Node.js: %node -v%
echo • npm: %npm -v%
echo • OS: Windows
echo.

:: Install dependencies if node_modules doesn't exist
if not exist "node_modules\" (
    echo Installing dependencies... This might take a minute ⏳
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install dependencies. Please check your internet connection and try again.
        exit /b 1
    )
    echo Dependencies installed successfully! ✅
) else (
    echo Dependencies already installed ✅
)

:: Start the development server
echo.
echo Starting Mystic India application...
echo The app will be available at http://localhost:8080/
echo Press Ctrl+C to stop the server
echo.

call npm run dev

exit /b 0
