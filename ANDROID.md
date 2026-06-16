# Android APK — Setup Guide

Same login page as the website, packaged as an Android app via **Capacitor**.

| | Website | Android APK |
|---|---|---|
| UI | Same HTML/CSS | Same (bundled in APK) |
| Google Sign-In | Web button (GIS) | Native Google Sign-In |
| Package name | — | `com.eightchalo.login` |

---

## 1. Install tools (one time)

- **Node.js** 18+ — [nodejs.org](https://nodejs.org)
- **Android Studio** — [developer.android.com/studio](https://developer.android.com/studio)
- **JDK 17** (Android Studio usually bundles this)

---

## 2. Google Cloud — Android OAuth client

Web client alone is not enough for the APK. You need an **Android** OAuth client.

### Get SHA-1 fingerprint (debug build)

After installing Android Studio, run:

```bash
keytool -list -v \
  -keystore ~/.android/debug.keystore \
  -alias androiddebugkey \
  -storepass android -keypass android
```

Copy the **SHA-1** line (looks like `AA:BB:CC:...`).

### Create Android client in Google Cloud

1. [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. **Create credentials → OAuth client ID**
3. Application type: **Android**
4. Package name: `com.eightchalo.login`
5. SHA-1: paste from above
6. Save

Keep your existing **Web client** — the app uses it as `webClientId`.

### Test user (if app is in Testing mode)

OAuth consent screen → **Audience → Test users** → add your Gmail (`hsst005@gmail.com`).

---

## 3. Build & run

```bash
npm install
npm run android          # opens Android Studio
```

In Android Studio: **Run** (green play) on a device or emulator.

### Build APK from terminal

```bash
npm run build:apk
```

APK output:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

Install on phone: copy the APK and open it (enable “Install unknown apps” if asked).

---

## 4. Website locally

```bash
npm run dev
```

Opens Vite dev server (usually `http://localhost:5173`). Add that origin in Google Cloud **Authorized JavaScript origins**.

For production website, deploy the `www/` folder after `npm run build`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `invalid_request` on web | Add exact origin (`http://localhost:5173`) + test user |
| Sign-in fails on APK | Android OAuth client missing or wrong SHA-1 / package name |
| Button does nothing on APK | Device must have a Google account in Settings |
| `JAVA_HOME` error | Install JDK 17 via Android Studio → Settings → Build Tools |
