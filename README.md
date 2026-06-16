# Login Landing Page + Android APK

Minimal **Continue with Google** page — same UI on **website** and **Android app**.

- **Web**: Google Identity Services button
- **Android**: Native Google Sign-In (Capacitor + `@capgo/capacitor-social-login`)

Repo: <https://github.com/hst005/login-landing-page>

## Quick start (website)

```bash
npm install
npm run dev
```

Open the URL shown (e.g. `http://localhost:5173`).

## Quick start (Android APK)

See **[ANDROID.md](./ANDROID.md)** for Google Cloud Android setup (SHA-1 + package name).

```bash
npm install
npm run android    # open in Android Studio → Run
# or
npm run build:apk  # outputs debug APK
```

APK path: `android/app/build/outputs/apk/debug/app-debug.apk`

## Google Cloud setup

### Web client (already created)

Client ID is in `index.html` / `app.js`. Add **Authorized JavaScript origins**:

- `http://localhost:5173` (Vite dev)
- `http://localhost:8000` (if using `python3 -m http.server` on built `www/`)
- Your production URL

### Android client (required for APK)

- Package: `com.eightchalo.login`
- SHA-1 from debug keystore (see ANDROID.md)

### Testing mode

Add your Gmail under OAuth consent screen → **Test users**.

## Project structure

```
index.html, styles.css, app.js   # source (edited by you)
www/                             # built output (vite build)
android/                         # Capacitor Android project
capacitor.config.json
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server (web) |
| `npm run build` | Build to `www/` |
| `npm run sync` | Build + sync to Android |
| `npm run android` | Open Android Studio |
| `npm run build:apk` | Build debug APK |

## Production notes

- Verify Google JWT on a backend before trusting identity
- For Play Store: create a **release** keystore, add its SHA-1 to Google Cloud, sign the APK/AAB
