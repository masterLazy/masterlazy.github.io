@echo off
chcp 65001 >nul

set mainPath=%~dp0
set buildPath=%~dp0../masterlazy.github.io-build

set /p message=输入更新信息：


echo.
echo * Task: 提交源分支更改
for /f %%i in ('git rev-parse HEAD') do set "mainLastCommit=%%i"
call git add . || goto :error
call git commit -m "%message%" || goto :error
call git push --force-with-lease || goto :rollbackMain
echo 已推送源分支

echo.
echo * Task: 构建 Docusaurus
call yarn build || goto :rollbackMain
echo 构建完成

echo.
echo * Task: 更新构建分支
call robocopy "build" "%buildPath%/docs" /MIR /NFL /NDL /NJH
:: robocopy 的返回值比较奇葩
if %errorlevel% geq 4 (
    goto :rollbackMain
)
echo 已更新构建分支

cd "%buildPath%"

echo.
echo * Task: 提交构建分支更改
for /f %%i in ('git rev-parse HEAD') do set "buildLastCommit=%%i"
call git add . || goto :rollbackMain
call git commit -m "%message%" || goto :rollbackMain
call git push --force-with-lease || goto :rollbackBoth
echo 已推送构建分支

goto :success

:rollbackBoth
echo.
echo * Compensate: 回滚构建分支更改
cd "%buildPath%"
call git reset --soft %buildLastCommit% || goto :rollbackMain
echo 已回滚到 %buildLastCommit%

:rollbackMain
echo.
echo * Compensate: 回滚主分支更改
cd "%mainPath%"
call git reset --soft %mainLastCommit% || goto :error
echo 已回滚到 %mainLastCommit%
goto :error

:success
echo.
echo 任务完成
cd "%mainPath%"
pause
exit /b

:error
echo.
echo 任务异常结束
cd "%mainPath%"
pause
exit /b