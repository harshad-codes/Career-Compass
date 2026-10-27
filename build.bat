@echo off
cd /d "%~dp0"
echo Building CAREER COMPASS production bundle...
set PATH=%~dp0.tools\node;%PATH%
call npm run build
pause
