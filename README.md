# Lumen — Landing page with Google Sign-In

A small, modern, dependency-free landing page with **Sign in with Google**
powered by [Google Identity Services](https://developers.google.com/identity/gsi/web).

No backend, no build step — just three static files.

## Files

- `index.html` — markup and the Google Sign-In button
- `styles.css` — dark, modern styling
- `app.js` — handles the Google credential callback

## 1. Get a Google OAuth Client ID

Google needs to know which website is requesting sign-in.

1. Go to <https://console.cloud.google.com/apis/credentials>
2. **Create credentials → OAuth client ID**
3. Application type: **Web application**
4. Under **Authorized JavaScript origins** add the origin you'll serve
   the site from, for example:
   - `http://localhost:5173`
   - `http://localhost:8000`
   - `https://your-domain.com`
5. Copy the generated **Client ID** (it ends in `.apps.googleusercontent.com`).

## 2. Wire up the Client ID

Open `index.html` and replace the placeholder:

```html
data-client_id="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
```

with your real Client ID.

## 3. Run it locally

Google Identity Services requires an `http(s)://` origin — opening the file
directly with `file://` will not work. Serve the folder with any static
server, for example:

```bash
# Python 3
python3 -m http.server 8000

# or, Node
npx serve .
```

Then open <http://localhost:8000> and click **Continue with Google**.

## How it works

- The Google script (`https://accounts.google.com/gsi/client`) renders the
  Sign-In button.
- On success, Google calls `handleCredentialResponse(response)` with a
  signed JWT (`response.credential`).
- `app.js` decodes the JWT payload locally to show a welcome modal.

## Production note

The JWT decode in `app.js` is **for display only** — it does not verify the
signature. In a real app, send `response.credential` to your backend and
verify it against Google's public keys (or use a library like
`google-auth-library` for Node) before trusting the user's identity.
