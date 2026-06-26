@echo off
echo =======================================
echo Building Android App...
echo =======================================
cd /d "%~dp0"

echo 1. Building React Frontend...
call npm run build

echo.
echo 2. Syncing Capacitor...
call npx cap sync

echo.
echo 3. Setting JAVA_HOME...
set JAVA_HOME=%~dp0java21\jdk-21.0.2+13

echo.
echo 4. Compiling Android APK...
cd android
call gradlew assembleDebug

echo.
echo =======================================
echo DONE! If there are no red errors above,
echo your APK is ready at:
echo android\app\build\outputs\apk\debug\app-debug.apk
echo =======================================
pause
