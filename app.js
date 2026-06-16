import { Capacitor } from "@capacitor/core";
import { SocialLogin } from "@capgo/capacitor-social-login";

const GOOGLE_CLIENT_ID =
  "633990564665-g3ng4rome4kpqkomr69ihij26r399i5f.apps.googleusercontent.com";

const isNative = Capacitor.isNativePlatform();

function decodeJwt(token) {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function showWelcome(profile) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-name").textContent =
    profile.given_name || profile.name || "friend";
  document.getElementById("modal-email").textContent = profile.email || "";

  const avatar = document.getElementById("modal-avatar");
  if (profile.picture) {
    avatar.src = profile.picture;
    avatar.alt = profile.name || "Profile picture";
    avatar.style.display = "inline-block";
  } else {
    avatar.style.display = "none";
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

// Web: called by Google Identity Services (index.html data-callback)
window.handleCredentialResponse = function (response) {
  const profile = decodeJwt(response.credential);
  if (profile) showWelcome(profile);
};

async function initNativeSignIn() {
  document.getElementById("web-signin").hidden = true;
  document.getElementById("native-signin").hidden = false;

  await SocialLogin.initialize({
    google: {
      webClientId: GOOGLE_CLIENT_ID,
      mode: "online",
    },
  });

  document.getElementById("native-google-btn")?.addEventListener("click", async () => {
    try {
      const response = await SocialLogin.login({
        provider: "google",
        options: { scopes: ["email", "profile"] },
      });

      if (response.provider !== "google") return;

      const result = response.result;
      if (result.responseType !== "online") return;

      const profile = result.profile;
      showWelcome({
        given_name: profile.givenName,
        name: profile.name,
        email: profile.email,
        picture: profile.imageUrl,
      });
    } catch (err) {
      console.error("Google sign-in failed:", err);
      alert("Sign-in failed. Check Google Cloud Android OAuth setup (SHA-1 + package name).");
    }
  });
}

if (isNative) {
  initNativeSignIn();
}

const modal = document.getElementById("modal");

document.getElementById("modal-close")?.addEventListener("click", () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
});

modal?.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
});
