@echo off
echo ========================================
echo Mini Shop Africa Backend Setup
echo ========================================
echo.

echo [1/4] Installing backend dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Creating uploads directory...
if not exist "uploads" mkdir uploads

echo.
echo [3/4] Checking MongoDB connection...
echo Please ensure MongoDB is running on your system
echo Default connection: mongodb://localhost:27017/minishopa-kenya
echo.

echo [4/4] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Start MongoDB service
echo 2. Run: npm run seed (to populate test data)
echo 3. Run: npm run dev (to start development server)
echo.
echo Backend will be available at: http://localhost:5000
echo API Health check: http://localhost:5000/api/health
echo ========================================
echo.
pause
