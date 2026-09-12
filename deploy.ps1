Write-Host "Packaging and deploying client build to gh-pages branch..." -ForegroundColor Cyan
$tempDir = Join-Path $env:TEMP "gh-pages-deploy"
if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }
New-Item -ItemType Directory -Path $tempDir | Out-Null
Copy-Item -Recurse -Force "client\dist\*" $tempDir
Push-Location $tempDir
git init
git checkout -b gh-pages
git config user.name "TusharKhot42"
git config user.email "tusharkhot63@gmail.com"
git add -A
git commit -m "Deploy TradeLens live client build"
git remote add origin https://github.com/TusharKhot42/TradeLens.git
git push -f origin gh-pages
Pop-Location
Remove-Item -Recurse -Force $tempDir
Write-Host "Deployment to gh-pages branch complete!" -ForegroundColor Green
