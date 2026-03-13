# Shopify AI Assistant – Whiskers

An AI-powered assistant for managing your Shopify store. Uses Claude to analyze products, suggest improvements, and push updates.

## How Keys Work (No Keys in Repo)

**This repo never contains API keys or secrets.** They are provided at runtime:

| What | Where It Comes From |
|------|---------------------|
| Anthropic API Key | User enters in the app’s setup screen (stored in browser session only) |
| Shopify Client ID | User enters in setup screen |
| Shopify Client Secret | User enters in setup screen |
| Token exchange (OAuth) | Server env vars: `SHOPIFY_CLIENT_ID`, `SHOPIFY_CLIENT_SECRET` |

## Setup

### 1. Deploy the token API (Vercel)

The OAuth token exchange runs as a serverless function. Deploy to Vercel and set env vars there:

1. Connect this repo to [Vercel](https://vercel.com)
2. In Project Settings → Environment Variables, add:
   - `SHOPIFY_CLIENT_ID` — from Shopify Dev Dashboard → Your App → Client credentials
   - `SHOPIFY_CLIENT_SECRET` — from the same page (click to reveal)
3. Redeploy so the new env vars are applied

### 2. Update the token URL (if not using default)

The app calls `https://shopify-assistant-xi.vercel.app/api/token` by default. If you use a different deployment, update the `fetch` URL in `index.html` (search for `shopify-assistant-xi.vercel.app`).

### 3. Host the frontend

- **GitHub Pages:** Push to `main` and enable Pages; the repo URL should match `REDIRECT_URI` in `index.html`
- **Local:** Open `index.html` in a browser (OAuth redirect may require a hosted URL)

### 4. First run

Open the app → enter your Anthropic key and Shopify credentials → complete OAuth. Keys stay in your browser session and are never saved to disk or the repo.
