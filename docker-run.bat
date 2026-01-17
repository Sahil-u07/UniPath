@echo off
REM Docker run script for UniPath

echo Starting UniPath container...

docker run -p 3000:3000 --name unipath-app unipath

if %errorlevel% neq 0 (
    echo.
    echo Failed to start container!
    echo If container already exists, try: docker rm unipath-app
)

pause
