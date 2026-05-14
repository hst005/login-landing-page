// Decode a JWT payload (display only — verify server-side in production)
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

// Called by Google after a successful sign-in (referenced declaratively in index.html)
window.handleCredentialResponse = function (response) {
  const profile = decodeJwt(response.credential);
  if (!profile) return;

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
};

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
