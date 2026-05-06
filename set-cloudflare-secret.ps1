$ErrorActionPreference = "Stop"

if (-not $env:CLOUDFLARE_API_TOKEN) {
  Write-Host "CLOUDFLARE_API_TOKEN is not set."
  Write-Host "Create a Cloudflare API token, then run:"
  Write-Host '$env:CLOUDFLARE_API_TOKEN="your_cloudflare_api_token"'
  Write-Host ".\set-cloudflare-secret.ps1"
  exit 1
}

Write-Host "This stores OPENAI_API_KEY as a Cloudflare Worker secret."
Write-Host "Paste the API key when Wrangler asks for the secret value."
npx wrangler secret put OPENAI_API_KEY
if ($LASTEXITCODE -ne 0) {
  throw "Wrangler secret put failed with exit code $LASTEXITCODE."
}
