$ErrorActionPreference = "Stop"

$files = @(
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "sw.js",
  "icon.svg",
  "AI_SETUP.md",
  "cloudflare-worker.js",
  "wrangler.toml",
  "deploy-cloudflare.ps1",
  "set-cloudflare-secret.ps1",
  "deploy.ps1",
  ".gitignore"
)

git add -- $files

git diff --cached --quiet
$hasChanges = $LASTEXITCODE -ne 0
if (-not $hasChanges) {
  Write-Host "No deploy changes to commit."
  exit 0
}

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Update English coach app $timestamp"
git push

Write-Host "Deploy pushed to GitHub."
