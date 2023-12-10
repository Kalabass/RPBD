@echo off
cd /d %~dp0

cd Backend
echo "Running npm install in Backend"
call npm install --verbose
echo "Running npm run dev in Backend"
start call npm run dev
cd ..

cd RPPDIP
echo "Running npm install in fRONT"
call npm install
echo "Running npm run dev in fRONT "
start  call npm run dev

start http://localhost:5173/auth

pause