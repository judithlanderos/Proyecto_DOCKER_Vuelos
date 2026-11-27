import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import axios from "axios";

// Bootstrap + AdminLTE
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "admin-lte/dist/css/adminlte.min.css";

// SweetAlert z-index fix global
const style = document.createElement("style");
style.textContent =
  ".swal2-container.swal-on-top { z-index: 99999 !important; }";
document.head.appendChild(style);

// ─── Interceptor global — maneja sesión expirada ─────────────
axios.interceptors.response.use(
  (response) => {
    reiniciarTemporizador();
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      clearTimeout(sessionTimer);
      localStorage.removeItem("usuario");
      localStorage.setItem("sessionExpired", "true");
      router.push("/login");
    }
    return Promise.reject(error);
  },
);

// ─── Temporizador de sesión (5 minutos) ──────────────────────
let sessionTimer = null;
let avisoTimer = null;

const iniciarTemporizador = () => {
  clearTimeout(sessionTimer);
  clearTimeout(avisoTimer);
  iniciarContador();

  // Aviso a los 4 minutos
  avisoTimer = setTimeout(
    () => {
      if (localStorage.getItem("usuario")) {
        window.Swal.fire({
          icon: "warning",
          title: "Sesión por expirar",
          text: "Tu sesión expirará en 1 minuto. Interactúa para mantenerla activa.",
          background: "#1a0c10",
          color: "#f0e8e0",
          confirmButtonColor: "#c9a84c",
          confirmButtonText: "Continuar",
          timer: 60000,
          timerProgressBar: true,
        });
      }
    },
    4 * 60 * 1000,
  );

  // Cierre a los 5 minutos
  sessionTimer = setTimeout(
    () => {
      if (localStorage.getItem("usuario")) {
        clearTimeout(avisoTimer);
        localStorage.removeItem("usuario");
        localStorage.setItem("sessionExpired", "true");
        router.push("/login");
      }
    },
    5 * 60 * 1000,
  );
};

const reiniciarTemporizador = () => {
  if (localStorage.getItem("usuario")) {
    iniciarTemporizador();
  }
};

// ─── Contador visual de tiempo restante ──────────────────────
let contadorInterval = null;
export const tiempoRestante = { valor: "5:00" };

export const iniciarContador = () => {
  clearInterval(contadorInterval);
  let segundos = 5 * 60;
  contadorInterval = setInterval(() => {
    if (!localStorage.getItem("usuario")) {
      clearInterval(contadorInterval);
      return;
    }
    segundos--;
    if (segundos < 0) segundos = 0;
    const m = Math.floor(segundos / 60);
    const s = segundos % 60;
    tiempoRestante.valor = `${m}:${String(s).padStart(2, "0")}`;
    window.dispatchEvent(
      new CustomEvent("session-timer", { detail: tiempoRestante.valor }),
    );
  }, 1000);
};

// ─── Obtener CSRF token del backend ──────────────────────────
export const obtenerCsrfToken = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/auth/csrf-token`,
      { withCredentials: true },
    );
    axios.defaults.headers.common["x-csrf-token"] = res.data.csrfToken;
  } catch (e) {
    console.error("Error obteniendo CSRF token", e);
  }
};

// ─── Exportar iniciarTemporizador para usarlo desde Login ────
export { iniciarTemporizador };

// ─── Eventos que reinician el temporizador ───────────────────
window.addEventListener("mousemove", reiniciarTemporizador);
window.addEventListener("keydown", reiniciarTemporizador);
window.addEventListener("click", reiniciarTemporizador);

// ─── Si ya hay sesión activa al cargar la app ─────────────────
if (localStorage.getItem("usuario")) {
  iniciarTemporizador();
  obtenerCsrfToken();
}

const app = createApp(App);
app.use(router);
app.mount("#app");
