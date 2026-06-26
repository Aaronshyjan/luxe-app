@echo off
echo =======================================
echo Pushing changes to GitHub...
echo =======================================
cd /d "%~dp0"
call git add .
call git commit -m "Dynamic backend migration and seeding"
call git push
echo.
echo =======================================
echo DONE! Your code is pushed to GitHub.
echo Go to Render and watch the deployment!
echo =======================================
pause
