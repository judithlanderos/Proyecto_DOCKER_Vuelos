import { createRouter, createWebHistory } from "vue-router";

// Importar vistas
import LandingPage from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Registro from "../views/Registro.vue";
import Dashboard from "../views/Dashboard.vue";
import Vuelos from "../views/Vuelos.vue";
import Pasajeros from "../views/Pasajeros.vue";
import Reservas from "../views/Reservas.vue";
import Tripulacion from "../views/Tripulacion.vue";
import NotFound from "../views/NotFound.vue";
import Aviones from "../views/Aviones.vue";
import Rutas from "../views/Rutas.vue";
import Grupos from "../views/Grupos.vue";

const routes = [
  // ─── Rutas públicas ───────────────────────────────────────
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registro",
    name: "Registro",
    component: Registro,
  },

  // ─── Rutas protegidas (requieren sesión) ──────────────────
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/vuelos",
    name: "Vuelos",
    component: Vuelos,
    meta: { requiresAuth: true },
  },
  {
    path: "/pasajeros",
    name: "Pasajeros",
    component: Pasajeros,
    meta: { requiresAuth: true },
  },
  {
    path: "/reservas",
    name: "Reservas",
    component: Reservas,
    meta: { requiresAuth: true },
  },
  {
    path: "/tripulacion",
    name: "Tripulacion",
    component: Tripulacion,
    meta: { requiresAuth: true },
  },
  {
    path: "/aviones",
    name: "Aviones",
    component: Aviones,
    meta: { requiresAuth: true },
  },
  {
    path: "/rutas",
    name: "Rutas",
    component: Rutas,
    meta: { requiresAuth: true },
  },
  {
    path: "/grupos",
    name: "Grupos",
    component: Grupos,
    meta: { requiresAuth: true },
  },

  // ─── Ruta 404 — cualquier ruta no encontrada ──────────────
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ─── Guard global — protege rutas que requieren autenticación
// Seguridad: redirige al login si no hay sesión activa
router.beforeEach((to, from, next) => {
  const usuario = localStorage.getItem("usuario");
  const requiereAuth = to.meta.requiresAuth;

  if (requiereAuth && !usuario) {
    // No autenticado — redirige al login
    next("/login");
  } else if ((to.path === "/login" || to.path === "/registro") && usuario) {
    // Ya autenticado — redirige al dashboard
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
