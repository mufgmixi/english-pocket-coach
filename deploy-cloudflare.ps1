$ErrorActionPreference = "Stop"

Write-Host "Deploying Cloudflare Worker..."
npx wrangler deploy

Write-Host "Cloudflare Worker deployed."
