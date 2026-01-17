@echo off
REM Docker build script for UniPath
REM Make sure to set your environment variables in .env file first

echo Building Docker image for UniPath...

REM Load environment variables from .env file if it exists
if exist .env (
    echo Loading environment variables from .env file...
    for /f "usebackq tokens=1,* delims==" %%a in (".env") do (
        set "%%a=%%b"
    )
) else (
    echo Warning: .env file not found. Please create one from .env.example
    pause
    exit /b 1
)

REM Build the Docker image
docker build ^
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=%NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY% ^
  --build-arg CLERK_SECRET_KEY=%CLERK_SECRET_KEY% ^
  --build-arg DATABASE_URL=%DATABASE_URL% ^
  -t unipath .

if %errorlevel% equ 0 (
    echo.
    echo Build successful!
    echo.
    echo To run the container, use:
    echo docker run -p 3000:3000 unipath
    echo.
    echo Or run docker-run.bat
) else (
    echo.
    echo Build failed!
)

pause
