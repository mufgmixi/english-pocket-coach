$ErrorActionPreference = "Stop"

if (-not $env:CLOUDFLARE_API_TOKEN) {
  Write-Host "CLOUDFLARE_API_TOKEN is not set."
  Write-Host "Create a Cloudflare API token, then run:"
  Write-Host '$env:CLOUDFLARE_API_TOKEN="your_cloudflare_api_token"'
  Write-Host ".\deploy-cloudflare.ps1"
  exit 1
}

Write-Host "Deploying Cloudflare Worker..."
npx wrangler deploy
if ($LASTEXITCODE -ne 0) {
  throw "Wrangler deploy failed with exit code $LASTEXITCODE."
}

Write-Host "Cloudflare Worker deployed."
