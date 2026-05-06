$ErrorActionPreference = "Stop"

Write-Host "This stores OPENAI_API_KEY as a Cloudflare Worker secret."
Write-Host "Paste the API key when Wrangler asks for the secret value."
npx wrangler secret put OPENAI_API_KEY
