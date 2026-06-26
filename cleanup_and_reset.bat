@echo off
echo ==================================================
echo Cleaning up unwanted files and resetting Git...
echo ==================================================
cd /d "%~dp0"

echo 1. Deleting obsolete files and folders...
if exist "java" rmdir /s /q "java"
if exist "build_app.ps1" del /f /q "build_app.ps1"
if exist "android\build_apk.bat" del /f /q "android\build_apk.bat"
if exist "New folder" rmdir /s /q "New folder"
if exist "push_to_github.bat" del /f /q "push_to_github.bat"

echo.
echo 2. Deleting corrupted Git history...
if exist ".git" rmdir /s /q ".git"
if exist "luxe-backend\.git" rmdir /s /q "luxe-backend\.git"

echo.
echo 3. Initializing fresh Git repository...
git init
git add .
git commit -m "Initial clean commit (frontend + backend)"

echo.
echo ==================================================
echo DONE! The project is completely clean.
echo.
echo Next steps:
echo 1. Create a NEW repository on GitHub
echo 2. Copy the "git remote add origin..." command GitHub gives you
echo 3. Run that command in your terminal
echo 4. Run: git push -u origin master
echo ==================================================
pause
