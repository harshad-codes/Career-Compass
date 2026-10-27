@echo off
cd /d "%~dp0"
echo Starting CAREER COMPASS development server...
set PATH=%~dp0.tools\node;%PATH%
call npm run dev
pause
