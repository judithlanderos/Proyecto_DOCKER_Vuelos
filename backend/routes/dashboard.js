// Rutas del Dashboard — estadísticas generales
// Seguridad: verificarSesion protege el acceso al dashboard
const express = require("express");
const router = express.Router();
const { obtenerEstadisticas } = require("../controllers/dashboardController");
const { verificarSesion } = require("../middlewares/auth");

// GET /api/dashboard — obtener estadísticas generales
router.get("/", verificarSesion, obtenerEstadisticas);

module.exports = router;
