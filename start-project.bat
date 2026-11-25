@echo off
title G S Modern English School Launcher
echo ==============================================================
echo    G S MODERN ENGLISH SCHOOL TAMSA - STARTING SYSTEM
echo ==============================================================
echo.

cd /d "%~dp0"

echo 1. Starting Backend API Server (Port 5000)...
start "G S Modern School - Backend API" cmd /k "cd /d ""%~dp0backend"" && npm start"

echo.
echo 2. Starting Frontend Web App (Port 5173)...
start "G S Modern School - Frontend Web" cmd /k "cd /d ""%~dp0frontend"" && npm run dev"

echo.
echo ==============================================================
echo Both servers are launching in separate windows!
echo Please keep those two terminal windows open.
echo.
echo Open your browser at:
echo    http://localhost:5173
echo ==============================================================
timeout /t 5
start http://localhost:5173
