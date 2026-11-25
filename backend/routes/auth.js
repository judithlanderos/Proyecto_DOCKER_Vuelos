// Principio SOLID - Single Responsibility: este archivo solo define rutas de autenticacion
// Principio SOLID - Open/Closed: nuevas rutas se agregan sin modificar las existentes
// Patron de diseño - Chain of Responsibility: middlewares encadenados antes de llegar al controlador
// Clean Code: rutas claras y descriptivas, middlewares aplicados por ruta segun necesidad

const express = require("express");
const router = express.Router();
const {
  registro,
  login,
  logout,
  verificarSesion,
} = require("../controllers/authController");
const { limiterAuth, verificarCaptcha } = require("../middlewares/seguridad");
const { validarRegistro, validarLogin } = require("../utils/validadores");

// POST /api/auth/registro
router.post("/registro", verificarCaptcha, validarRegistro, registro);

// POST /api/auth/login
router.post("/login", limiterAuth, verificarCaptcha, validarLogin, login);

// POST /api/auth/logout
router.post("/logout", logout);

// GET /api/auth/sesion
router.get("/sesion", verificarSesion);

// GET /api/auth/csrf-token
router.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: "dev-token" });
});

// GET /api/auth/ping — renueva la sesión activa
const { verificarSesion: authMiddleware } = require("../middlewares/auth");
router.get("/ping", authMiddleware, (req, res) => {
    res.json({ ok: true });
});

module.exports = router;
