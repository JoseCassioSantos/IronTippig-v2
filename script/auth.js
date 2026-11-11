/* ============================================================
   Iron Tipping — Google Login (Google Identity Services)
   Configuração obrigatória: defina GOOGLE_CLIENT_ID abaixo.
   ============================================================ */

// ⚠️ Substitua pelo Client ID do seu projeto no Google Cloud Console.
// Como obter: console.cloud.google.com > APIs e Serviços > Credenciais
//             > Criar credenciais > ID do cliente OAuth 2.0 (Aplicativo da web)
const GOOGLE_CLIENT_ID = "120517140208-65aa09eauf6tikprod7iciptntk2rm0u.apps.googleusercontent.com";
const GOOGLE_REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob";

const TOKEN_KEY = "it_google_token";
const PROFILE_KEY = "it_google_profile";

const loginScreen = document.getElementById("login-screen");
const app = document.getElementById("app");
const googleBtn = document.getElementById("google-login");
const loginError = document.getElementById("login-error");
const userArea = document.getElementById("user-area");
const userAvatar = document.getElementById("user-avatar");
const userName = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout-btn");
const footerVersion = document.getElementById("footer-version");
const appVersion = document.getElementById("app-version");

let isInitialized = false;

/* ---------- utilitários ---------- */
function showError(msg) {
  if (!loginError) return;
  loginError.textContent = msg;
  loginError.style.display = msg ? "block" : "none";
}

function b64urlDecode(str) {
  let s = str.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return decodeURIComponent(
    atob(s).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
  );
}

function decodeJwtPayload(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(b64urlDecode(parts[1]));
  } catch (e) {
    return null;
  }
}

function setSession(token, profile) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PROFILE_KEY);
}

function getStoredProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
  } catch (e) {
    return null;
  }
}

function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY) || null;
}

/* ---------- UI ---------- */
function showApp() {
  if (loginScreen) loginScreen.classList.add("hidden");
  if (app) app.classList.remove("hidden");
}

function showLogin() {
  if (app) app.classList.add("hidden");
  if (loginScreen) loginScreen.classList.remove("hidden");
}

function renderUser(profile) {
  if (!userArea || !userAvatar || !userName) return;
  const name = profile.name || profile.email || "Usuário";
  const picture = profile.picture || "";
  userName.textContent = name;
  userAvatar.src = picture || "src/icons/perfil.jpg";
  userAvatar.onerror = () => {
    userAvatar.src = "src/icons/perfil.jpg";
  };
  userArea.classList.remove("hidden");
}

function setVersions(v) {
  if (footerVersion) footerVersion.textContent = v;
  if (appVersion) appVersion.textContent = v;
}

/* ---------- Google login via OAuth 2.0 popup (Electron) ---------- */
window.signInWithGoogle = async function () {
  showError("");

  if (!window.electronAPI || typeof window.electronAPI.googleAuth !== "function") {
    showError("API do Electron não disponível. Reinicie o aplicativo.");
    return;
  }

  try {
    // 1. Abre a popup nativa do Electron e obtém o código de autorização
    const code = await window.electronAPI.googleAuth();

    // 2. Troca o código pelo token no endpoint do Google
    const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: code,
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResp.ok) {
      const errText = await tokenResp.text().catch(() => "");
      throw new Error(`Falha ao trocar código por token (${tokenResp.status}): ${errText}`);
    }

    const tokenData = await tokenResp.json();
    const idToken = tokenData.id_token;

    if (!idToken) throw new Error("ID token não retornado pelo Google.");

    // 3. Decodifica o ID token para obter o perfil do usuário
    const profile = decodeJwtPayload(idToken);
    if (!profile) throw new Error("Token inválido");

    // Verifica se o emissor é realmente o Google
    if (profile.iss !== "https://accounts.google.com") throw new Error("Emissor não confiável");

    // 4. Salva a sessão e entra no app
    setSession(idToken, profile);
    renderUser(profile);
    showApp();
    showError("");
  } catch (err) {
    console.error("[IronTipping] Falha no login Google:", err);
    showError(err.message || "Não foi possível iniciar o login com o Google.");
  }
};

window.signOut = function () {
  clearSession();
  if (userArea) userArea.classList.add("hidden");
  if (userName) userName.textContent = "Usuário";
  if (userAvatar) userAvatar.src = "";
  showLogin();
};

/* ---------- Inicialização ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // Versão do app via Electron
  if (window.electronAPI && typeof window.electronAPI.getVersion === "function") {
    window.electronAPI.getVersion().then(setVersions).catch(() => setVersions("3.0.0"));
  } else {
    setVersions("3.0.0");
  }

  // Aplicação já está visível (sem login)
  showApp();
});

/* ---------- Controles de janela (Electron) ---------- */
window.toggleMaximize = function () {
  if (!window.electronAPI) return;
  // O handler do Electron já alterna entre maximizar e restaurar.
  window.electronAPI.maximize();
};
