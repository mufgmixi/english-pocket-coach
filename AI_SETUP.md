# AI setup

The GitHub Pages version is static, so it cannot safely store an OpenAI API key.
Use `server.js` as a local proxy when you want the AI conversation coach.

## Run locally

PowerShell:

```powershell
$env:OPENAI_API_KEY="your_api_key_here"
node server.js
```

Then open:

```text
http://127.0.0.1:8765/
```

Optional model override:

```powershell
$env:OPENAI_MODEL="gpt-5.2"
node server.js
```

AI mode uses the OpenAI Responses API and will consume tokens.

## Practice style

The coach is designed for mixed input:

```text
I was very 疲れた after work, but I want to practice English.
```

It should replace the Japanese part, explain the useful words, and continue the conversation in easy English.

## Smartphone / PWA setup

The frontend can be installed like an app from GitHub Pages:

1. Upload `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, `sw.js`, and `icon.svg`.
2. Open the GitHub Pages URL on your phone.
3. iPhone Safari: Share -> Add to Home Screen.
4. Android Chrome: menu -> Add to Home screen / Install app.

For AI mode on mobile, deploy `server.js` to a backend host and put that backend URL into the app's `AI server URL` field.

## Cloudflare Workers

For a low-cost mobile backend, use `cloudflare-worker.js`.

1. Create a Cloudflare account.
2. Go to Workers & Pages.
3. Create a Worker.
4. Replace the starter code with the contents of `cloudflare-worker.js`.
5. Deploy.
6. Open the Worker settings.
7. Add a Secret named `OPENAI_API_KEY`.
8. Paste your OpenAI API key as the value.
9. Deploy again if Cloudflare asks.
10. Copy the Worker URL, for example `https://english-pocket-coach.yourname.workers.dev`.
11. Paste that URL into the app's `AI server URL` field.

Do not put your OpenAI API key into `index.html`, `app.js`, GitHub Pages, or any public file.
