@echo off
echo =======================================
echo Seeding MongoDB Database...
echo =======================================
cd /d "%~dp0luxe-backend"

echo Running Prisma Seed Script...
call npx ts-node prisma/seed.ts

echo.
echo =======================================
echo DONE! If there are no red errors above,
echo all 17 products have been pushed to MongoDB.
echo =======================================
pause
